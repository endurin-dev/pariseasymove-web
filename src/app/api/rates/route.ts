// app/api/rates/route.ts — v2 with vehicle_id
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

const shape = (r: any) => ({
  id:          r.id,
  fromLocId:   r.from_loc_id,
  toLocId:     r.to_loc_id,
  vehicleId:   r.vehicle_id,
  fromLocName: r.from_loc_name,
  toLocName:   r.to_loc_name,
  vehicleName: r.vehicle_name,
  price:       r.price,
  onDemand:    r.on_demand,
  active:      r.active,
});

const JOIN = `
  SELECT r.*,
    fl.name AS from_loc_name,
    tl.name AS to_loc_name,
    v.name  AS vehicle_name
  FROM rates r
  JOIN locations fl ON r.from_loc_id = fl.id
  JOIN locations tl ON r.to_loc_id   = tl.id
  JOIN vehicles   v ON r.vehicle_id  = v.id
`;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fromId    = searchParams.get("from");
  const toId      = searchParams.get("to");
  const vehicleId = searchParams.get("vehicle");

  let q = JOIN + " WHERE 1=1";
  const params: any[] = [];
  if (fromId)    { params.push(fromId);    q += ` AND r.from_loc_id=$${params.length}`; }
  if (toId)      { params.push(toId);      q += ` AND r.to_loc_id=$${params.length}`; }
  if (vehicleId) { params.push(vehicleId); q += ` AND r.vehicle_id=$${params.length}`; }
  q += " ORDER BY fl.name, tl.name, v.name";

  const { rows } = await pool.query(q, params);
  return NextResponse.json(rows.map(shape));
}

export async function POST(req: NextRequest) {
  const b = await req.json();
  const { rows } = await pool.query(
    `INSERT INTO rates (id, from_loc_id, to_loc_id, vehicle_id, price, on_demand, active)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     ON CONFLICT (from_loc_id, to_loc_id, vehicle_id) DO UPDATE
       SET price=$5, on_demand=$6, active=$7
     RETURNING id`,
    [b.id, b.fromLocId, b.toLocId, b.vehicleId,
     b.onDemand ? null : (b.price || null),
     b.onDemand ?? false, b.active ?? true]
  );
  const { rows: full } = await pool.query(JOIN + " WHERE r.id=$1", [rows[0].id]);
  return NextResponse.json(shape(full[0]));
}

export async function PUT(req: NextRequest) {
  const b = await req.json();
  await pool.query(
    `UPDATE rates SET from_loc_id=$2, to_loc_id=$3, vehicle_id=$4,
     price=$5, on_demand=$6, active=$7 WHERE id=$1`,
    [b.id, b.fromLocId, b.toLocId, b.vehicleId,
     b.onDemand ? null : (b.price || null),
     b.onDemand ?? false, b.active ?? true]
  );
  const { rows } = await pool.query(JOIN + " WHERE r.id=$1", [b.id]);
  return NextResponse.json(shape(rows[0]));
}

export async function DELETE(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");
  await pool.query("DELETE FROM rates WHERE id=$1", [id]);
  return NextResponse.json({ success: true });
}