"use client";
// app/admin/page.tsx
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";

// ── Change these to your own credentials ─────────────────────
const ADMIN_USER = "admin";
const ADMIN_PASS = "123";
// ─────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed,  setAuthed]  = useState(false);
  const [checked, setChecked] = useState(false);
  const [user,    setUser]    = useState("");
  const [pass,    setPass]    = useState("");
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [show,    setShow]    = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("pem_admin") === "1") setAuthed(true);
    setChecked(true);
  }, []);

  const login = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem("pem_admin", "1");
      setAuthed(true);
    } else {
      setError("Incorrect username or password");
    }
    setLoading(false);
  };

  const logout = () => {
    sessionStorage.removeItem("pem_admin");
    setAuthed(false);
    setUser(""); setPass("");
  };

  if (!checked) return null;
  if (authed)   return <Dashboard onLogout={logout} />;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Sora',sans-serif}
        .lg{min-height:100vh;display:flex;align-items:center;justify-content:center;
            padding:20px;background:#0a0f1a;position:relative;overflow:hidden}
        .lg-bg{position:absolute;inset:0;
          background:radial-gradient(ellipse 60% 50% at 20% 20%,rgba(201,163,71,.07),transparent 60%),
                     radial-gradient(ellipse 50% 60% at 80% 80%,rgba(201,163,71,.04),transparent 60%)}
        .lg-grid{position:absolute;inset:0;
          background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),
                           linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);
          background-size:40px 40px}
        .lg-card{position:relative;z-index:1;width:100%;max-width:400px;
          background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);
          border-radius:20px;padding:40px 36px;backdrop-filter:blur(20px)}
        .lg-logo{display:flex;align-items:center;gap:10px;margin-bottom:28px}
        .lg-icon{width:38px;height:38px;border-radius:9px;
          background:rgba(201,163,71,.12);border:1px solid rgba(201,163,71,.25);
          display:flex;align-items:center;justify-content:center}
        .lg-icon svg{width:18px;height:18px;color:#c9a347}
        .lg-brand{font-size:14px;font-weight:700;color:#f5f0e8}
        .lg-brand-sub{font-size:10px;color:rgba(245,240,232,.35);letter-spacing:.1em;text-transform:uppercase;margin-top:1px}
        .lg-h1{font-size:24px;font-weight:800;color:#f5f0e8;margin-bottom:4px}
        .lg-p{font-size:12px;color:rgba(245,240,232,.4);margin-bottom:24px}
        .lg-err{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);
          color:#f87171;font-size:12px;padding:10px 13px;border-radius:8px;margin-bottom:12px}
        .lg-field{display:flex;flex-direction:column;gap:5px;margin-bottom:12px}
        .lg-label{font-size:10px;font-weight:600;letter-spacing:.12em;
          text-transform:uppercase;color:rgba(245,240,232,.4)}
        .lg-wrap{display:flex;align-items:center;
          background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
          border-radius:9px;overflow:hidden;transition:border-color .2s}
        .lg-wrap:focus-within{border-color:rgba(201,163,71,.5)}
        .lg-input{flex:1;background:transparent;border:none;outline:none;
          padding:11px 13px;font-size:13px;color:#f5f0e8;font-family:'Sora',sans-serif}
        .lg-input::placeholder{color:rgba(245,240,232,.2)}
        .lg-eye{padding:0 11px;background:none;border:none;cursor:pointer;
          color:rgba(245,240,232,.3);font-size:15px}
        .lg-btn{width:100%;padding:13px;background:#c9a347;color:#0a0f1a;border:none;
          border-radius:9px;font-family:'Sora',sans-serif;font-size:13px;font-weight:700;
          cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;
          margin-top:8px;transition:background .2s,transform .15s}
        .lg-btn:hover:not(:disabled){background:#e8c97a;transform:translateY(-1px)}
        .lg-btn:disabled{opacity:.55;cursor:not-allowed}
        .lg-hint{text-align:center;font-size:11px;color:rgba(245,240,232,.18);margin-top:14px}
        @keyframes spin{to{transform:rotate(360deg)}}
        .spin{width:15px;height:15px;border:2px solid rgba(10,15,26,.3);
          border-top-color:#0a0f1a;border-radius:50%;animation:spin .7s linear infinite}
      `}</style>

      <div className="lg">
        <div className="lg-bg" /><div className="lg-grid" />
        <div className="lg-card">

          <div className="lg-logo">
            <div className="lg-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0
                     002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <div>
              <div className="lg-brand">Paris Easy Move</div>
              <div className="lg-brand-sub">Admin Dashboard</div>
            </div>
          </div>

          <h1 className="lg-h1">Welcome back</h1>
          <p className="lg-p">Sign in to manage your reservation system</p>

          {error && <div className="lg-err">⚠ {error}</div>}

          <div className="lg-field">
            <label className="lg-label">Username</label>
            <div className="lg-wrap">
              <input className="lg-input" placeholder="admin" value={user}
                onChange={e => { setUser(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && login()} />
            </div>
          </div>

          <div className="lg-field">
            <label className="lg-label">Password</label>
            <div className="lg-wrap">
              <input className="lg-input" type={show ? "text" : "password"}
                placeholder="••••••••" value={pass}
                onChange={e => { setPass(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && login()} />
              <button className="lg-eye" onClick={() => setShow(s => !s)}>
                {show ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <button className="lg-btn" onClick={login}
            disabled={loading || !user || !pass}>
            {loading ? <div className="spin" /> : "Sign In"}
          </button>

          <div className="lg-hint">Default: admin / paris2024</div>
        </div>
      </div>
    </>
  );
}