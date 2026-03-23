--
-- PostgreSQL database dump
--

\restrict OdA5SGPHkW9iiXZoeYZs1hwsQv0KFzD5JW8hXyp1nFScTl1AkYbWTn9oW0Smbgp

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id text NOT NULL,
    from_loc_id text,
    to_loc_id text,
    date text NOT NULL,
    "time" text NOT NULL,
    passengers integer DEFAULT 1 NOT NULL,
    kids integer DEFAULT 0 NOT NULL,
    bags integer DEFAULT 1 NOT NULL,
    vehicle_id text,
    name text NOT NULL,
    country text DEFAULT ''::text NOT NULL,
    whatsapp text DEFAULT ''::text NOT NULL,
    email text DEFAULT ''::text NOT NULL,
    notes text DEFAULT ''::text NOT NULL,
    status text DEFAULT 'new'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT bookings_status_check CHECK ((status = ANY (ARRAY['new'::text, 'confirmed'::text, 'cancelled'::text])))
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- Name: features; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.features (
    id text NOT NULL,
    text text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.features OWNER TO postgres;

--
-- Name: location_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location_categories (
    id text NOT NULL,
    name text NOT NULL,
    icon text DEFAULT '📍'::text NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.location_categories OWNER TO postgres;

--
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    id text NOT NULL,
    name text NOT NULL,
    category_id text,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- Name: rates; Type: TABLE; Schema: public; Owner: parisadmin
--

CREATE TABLE public.rates (
    id text NOT NULL,
    from_loc_id text NOT NULL,
    to_loc_id text NOT NULL,
    vehicle_id text NOT NULL,
    p1 integer,
    p2 integer,
    p3 integer,
    p4 integer,
    p5 integer,
    p6 integer,
    p7 integer,
    p8 integer,
    on_demand boolean DEFAULT false NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.rates OWNER TO parisadmin;

--
-- Name: vehicles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicles (
    id text NOT NULL,
    name text NOT NULL,
    model text NOT NULL,
    max_passengers integer DEFAULT 4 NOT NULL,
    max_luggage integer DEFAULT 4 NOT NULL,
    img text DEFAULT '/images/car.png'::text NOT NULL,
    price integer DEFAULT 80 NOT NULL,
    tag text DEFAULT ''::text NOT NULL,
    special text DEFAULT ''::text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.vehicles OWNER TO postgres;

--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (id, from_loc_id, to_loc_id, date, "time", passengers, kids, bags, vehicle_id, name, country, whatsapp, email, notes, status, created_at) FROM stdin;
b1	l1	l4	2026-03-25	14:30	2	1	3	sedan	Marie Dubois	France	+33612345678	marie@example.com	Flight AF1234	new	2026-03-21 00:54:50.141136+05:30
b2	l2	l5	2026-03-26	10:00	4	2	6	van	James Smith	United Kingdom	+447712345678	james@example.com		confirmed	2026-03-21 00:54:50.141136+05:30
b3	l4	l6	2026-03-24	09:00	2	0	1	suv	Ahmed Al-Rashid	United Arab Emirates	+97150123456	ahmed@example.com	VIP service requested	confirmed	2026-03-21 00:54:50.141136+05:30
b4	l1	l5	2026-03-27	07:45	5	3	8	van	Sarah Johnson	United States	+12025551234	sarah@example.com	Need 2 child seats	new	2026-03-21 00:54:50.141136+05:30
b5	l3	l4	2026-03-28	18:00	1	0	2	sedan	Luca Rossi	Italy	+393331234567	luca@example.com	Ryanair FR8802	new	2026-03-21 00:54:50.141136+05:30
b6	l2	l4	2026-03-22	11:30	3	1	4	sedan	Emma Wilson	Australia	+61412345678	emma@example.com		cancelled	2026-03-21 00:54:50.141136+05:30
b7	l1	l4	2026-03-29	06:00	8	2	10	minibus	Tour Group FR	France	+33698765432	tours@example.com	Corporate transfer	confirmed	2026-03-21 00:54:50.141136+05:30
b8	l4	l5	2026-03-30	08:30	2	2	2	sedan	Yuki Tanaka	Japan	+819012345678	yuki@example.com	First time at Disneyland	new	2026-03-21 00:54:50.141136+05:30
3p583bl	l1	l5	2026-03-26	12:59	2	0	1	minibus	Dhanushka Jayalath	Algeria	213123123213	danuhska@gmail.com	test booking	confirmed	2026-03-21 03:10:23.564959+05:30
n7c9pu4	l3	l5	2026-03-26	12:59	2	0	1	suv	Dan	Albania	adadsdasdsa	dan@gmail.com	test	confirmed	2026-03-21 01:58:57.372928+05:30
q9psjba	l1	l5	2026-12-31	12:59	3	0	1	van	Nuwan Perera	Australia	+6124244234234	nuwan@gmail.com		new	2026-03-23 01:00:11.276828+05:30
9ce2imu	l1	l5	2026-12-31	12:59	3	0	1	sedan	Kavitha Gayathri	Azerbaijan	+99423421342342	kavi@gmail.com	ROUND TRIP | Flight/Train: Test0001 | test request	confirmed	2026-03-23 01:34:27.090367+05:30
\.


--
-- Data for Name: features; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.features (id, text, active, sort_order, created_at) FROM stdin;
f1	Meet & Greet included	t	1	2026-03-21 00:07:36.538294+05:30
f2	Door-to-door	t	2	2026-03-21 00:07:36.538294+05:30
f3	Porter service	t	3	2026-03-21 00:07:36.538294+05:30
f4	Free child seats & boosters	t	4	2026-03-21 00:07:36.538294+05:30
f5	Flight tracking included	t	5	2026-03-21 00:07:36.538294+05:30
f6	Fixed price guaranteed	t	6	2026-03-21 00:07:36.538294+05:30
\.


--
-- Data for Name: location_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.location_categories (id, name, icon, sort_order, active, created_at) FROM stdin;
cat1	Airport	✈️	1	t	2026-03-21 00:07:36.538294+05:30
cat2	City	🏙️	2	t	2026-03-21 00:07:36.538294+05:30
cat3	Attraction	🎡	3	t	2026-03-21 00:07:36.538294+05:30
cat4	Hotel	🏨	4	t	2026-03-21 00:07:36.538294+05:30
cat5	Station	🚉	5	t	2026-03-21 00:07:36.538294+05:30
cat6	Other	📍	6	t	2026-03-21 00:07:36.538294+05:30
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locations (id, name, category_id, active, created_at) FROM stdin;
l1	Charles de Gaulle (CDG)	cat1	t	2026-03-21 00:07:36.538294+05:30
l2	Orly Airport	cat1	t	2026-03-21 00:07:36.538294+05:30
l3	Beauvais–Tillé Airport	cat1	t	2026-03-21 00:07:36.538294+05:30
l4	Paris City Centre	cat2	t	2026-03-21 00:07:36.538294+05:30
l5	Disneyland Paris	cat3	t	2026-03-21 00:07:36.538294+05:30
l6	Versailles Palace	cat3	t	2026-03-21 00:07:36.538294+05:30
l7	Montmartre	cat2	t	2026-03-21 00:07:36.538294+05:30
l8	Eiffel Tower Area	cat2	t	2026-03-21 00:07:36.538294+05:30
l9	Paris Gares (Train Stations)	cat5	t	2026-03-21 00:07:36.538294+05:30
l10	Paris Hotels & Apartments	cat4	t	2026-03-21 00:07:36.538294+05:30
l11	Parc Astérix	cat3	t	2026-03-21 00:07:36.538294+05:30
l12	Beauvais City	cat2	t	2026-03-21 00:07:36.538294+05:30
\.


--
-- Data for Name: rates; Type: TABLE DATA; Schema: public; Owner: parisadmin
--

COPY public.rates (id, from_loc_id, to_loc_id, vehicle_id, p1, p2, p3, p4, p5, p6, p7, p8, on_demand, active, created_at) FROM stdin;
r_l1_l10_sedan	l1	l10	sedan	80	80	80	85	90	95	100	110	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l10_van	l1	l10	van	95	95	95	100	105	110	115	130	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l10_suv	l1	l10	suv	110	110	110	115	120	125	130	145	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l10_minibus	l1	l10	minibus	150	150	150	155	160	165	170	190	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l5_van	l1	l5	van	90	90	90	95	100	105	110	120	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l5_suv	l1	l5	suv	100	100	100	105	110	115	120	135	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l5_minibus	l1	l5	minibus	150	150	150	155	160	165	170	190	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l2_sedan	l1	l2	sedan	100	100	100	110	110	120	120	140	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l2_van	l1	l2	van	120	120	120	130	130	140	140	160	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l2_suv	l1	l2	suv	135	135	135	145	145	155	155	175	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l2_minibus	l1	l2	minibus	185	185	185	195	195	205	205	225	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l3_sedan	l1	l3	sedan	140	140	140	150	150	160	170	180	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l3_van	l1	l3	van	165	165	165	175	175	185	195	210	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l3_suv	l1	l3	suv	190	190	190	200	200	210	220	240	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l3_minibus	l1	l3	minibus	260	260	260	270	270	280	290	310	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l9_sedan	l1	l9	sedan	80	80	80	85	90	95	100	110	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l9_van	l1	l9	van	95	95	95	100	105	110	115	130	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l9_suv	l1	l9	suv	110	110	110	115	120	125	130	145	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l9_minibus	l1	l9	minibus	150	150	150	155	160	165	170	190	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l11_sedan	l1	l11	sedan	80	80	80	90	90	100	100	110	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l11_van	l1	l11	van	95	95	95	105	105	115	115	130	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l11_suv	l1	l11	suv	110	110	110	120	120	130	130	145	f	t	2026-03-22 01:45:11.634724+05:30
r_l1_l11_minibus	l1	l11	minibus	150	150	150	160	160	170	170	190	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l1_sedan	l2	l1	sedan	100	100	100	110	110	120	120	140	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l1_van	l2	l1	van	120	120	120	130	130	140	140	160	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l1_suv	l2	l1	suv	135	135	135	145	145	155	155	175	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l1_minibus	l2	l1	minibus	185	185	185	195	195	205	205	225	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l10_sedan	l2	l10	sedan	75	75	75	80	85	90	95	100	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l10_van	l2	l10	van	90	90	90	95	100	105	110	120	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l10_suv	l2	l10	suv	100	100	100	105	110	115	120	135	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l10_minibus	l2	l10	minibus	140	140	140	145	150	155	160	175	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l5_sedan	l2	l5	sedan	75	75	75	80	85	90	90	100	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l5_van	l2	l5	van	90	90	90	95	100	105	105	120	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l5_suv	l2	l5	suv	105	105	105	110	115	120	120	135	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l5_minibus	l2	l5	minibus	155	155	155	160	165	170	170	190	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l3_sedan	l2	l3	sedan	170	170	170	180	180	190	190	200	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l3_van	l2	l3	van	200	200	200	210	210	220	220	240	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l3_suv	l2	l3	suv	230	230	230	240	240	250	250	270	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l3_minibus	l2	l3	minibus	315	315	315	325	325	335	335	355	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l11_sedan	l2	l11	sedan	100	100	100	110	110	120	120	130	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l11_van	l2	l11	van	120	120	120	130	130	140	140	155	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l11_suv	l2	l11	suv	135	135	135	145	145	155	155	170	f	t	2026-03-22 01:45:11.634724+05:30
r_l2_l11_minibus	l2	l11	minibus	185	185	185	195	195	205	205	225	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l1_sedan	l4	l1	sedan	80	80	80	85	90	95	100	110	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l1_van	l4	l1	van	95	95	95	100	105	110	115	130	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l1_suv	l4	l1	suv	110	110	110	115	120	125	130	145	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l1_minibus	l4	l1	minibus	150	150	150	155	160	165	170	190	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l2_sedan	l4	l2	sedan	75	75	75	80	85	90	95	100	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l2_van	l4	l2	van	90	90	90	95	100	105	110	120	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l2_suv	l4	l2	suv	100	100	100	105	110	115	120	135	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l2_minibus	l4	l2	minibus	140	140	140	145	150	155	160	175	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l5_sedan	l4	l5	sedan	80	80	80	85	85	90	95	105	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l5_van	l4	l5	van	95	95	95	100	100	105	110	120	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l5_suv	l4	l5	suv	110	110	110	115	115	120	125	140	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l5_minibus	l4	l5	minibus	150	150	150	155	155	160	165	185	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l3_sedan	l4	l3	sedan	150	150	150	160	160	170	170	180	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l3_van	l4	l3	van	175	175	175	185	185	195	195	210	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l3_suv	l4	l3	suv	200	200	200	210	210	220	220	240	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l3_minibus	l4	l3	minibus	280	280	280	290	290	300	300	320	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l6_sedan	l4	l6	sedan	80	80	80	90	90	100	100	110	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l6_van	l4	l6	van	95	95	95	105	105	115	115	130	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l6_suv	l4	l6	suv	110	110	110	120	120	130	130	145	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l6_minibus	l4	l6	minibus	150	150	150	160	160	170	170	190	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l11_sedan	l4	l11	sedan	80	80	80	90	90	100	100	110	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l11_van	l4	l11	van	95	95	95	105	105	115	115	130	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l11_suv	l4	l11	suv	110	110	110	120	120	130	130	145	f	t	2026-03-22 01:45:11.634724+05:30
r_l4_l11_minibus	l4	l11	minibus	150	150	150	160	160	170	170	190	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l2_sedan	l5	l2	sedan	75	75	75	80	85	90	90	100	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l2_van	l5	l2	van	90	90	90	95	100	105	105	120	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l2_suv	l5	l2	suv	105	105	105	110	115	120	120	135	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l2_minibus	l5	l2	minibus	155	155	155	160	165	170	170	190	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l1_sedan	l5	l1	sedan	75	75	75	80	80	85	90	100	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l1_van	l5	l1	van	90	90	90	95	95	100	105	120	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l1_suv	l5	l1	suv	105	105	105	110	110	115	120	135	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l1_minibus	l5	l1	minibus	155	155	155	160	160	165	170	190	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l3_sedan	l5	l3	sedan	150	150	150	160	160	170	170	180	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l3_van	l5	l3	van	175	175	175	185	185	195	195	210	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l3_suv	l5	l3	suv	200	200	200	210	210	220	220	240	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l3_minibus	l5	l3	minibus	280	280	280	290	290	300	300	320	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l4_sedan	l5	l4	sedan	80	80	80	85	85	90	95	105	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l4_van	l5	l4	van	95	95	95	100	100	105	110	120	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l4_suv	l5	l4	suv	110	110	110	115	115	120	125	140	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l4_minibus	l5	l4	minibus	150	150	150	155	155	160	165	185	f	t	2026-03-22 01:45:11.634724+05:30
r_l5_l11_sedan	l5	l11	sedan	\N	\N	\N	\N	\N	\N	\N	\N	t	t	2026-03-22 01:45:11.634724+05:30
r_l5_l11_van	l5	l11	van	\N	\N	\N	\N	\N	\N	\N	\N	t	t	2026-03-22 01:45:11.634724+05:30
r_l5_l11_suv	l5	l11	suv	\N	\N	\N	\N	\N	\N	\N	\N	t	t	2026-03-22 01:45:11.634724+05:30
r_l5_l11_minibus	l5	l11	minibus	\N	\N	\N	\N	\N	\N	\N	\N	t	t	2026-03-22 01:45:11.634724+05:30
r_l6_l4_sedan	l6	l4	sedan	80	80	80	90	90	100	100	110	f	t	2026-03-22 01:45:11.634724+05:30
r_l6_l4_van	l6	l4	van	95	95	95	105	105	115	115	130	f	t	2026-03-22 01:45:11.634724+05:30
r_l6_l4_suv	l6	l4	suv	110	110	110	120	120	130	130	145	f	t	2026-03-22 01:45:11.634724+05:30
r_l6_l4_minibus	l6	l4	minibus	150	150	150	160	160	170	170	190	f	t	2026-03-22 01:45:11.634724+05:30
r_l6_l1_sedan	l6	l1	sedan	130	130	130	140	140	150	150	160	f	t	2026-03-22 01:45:11.634724+05:30
r_l6_l1_van	l6	l1	van	155	155	155	165	165	175	175	195	f	t	2026-03-22 01:45:11.634724+05:30
r_l6_l1_suv	l6	l1	suv	175	175	175	185	185	195	195	215	f	t	2026-03-22 01:45:11.634724+05:30
r_l6_l1_minibus	l6	l1	minibus	240	240	240	250	250	260	260	285	f	t	2026-03-22 01:45:11.634724+05:30
r_l6_l2_sedan	l6	l2	sedan	80	80	80	90	90	100	100	110	f	t	2026-03-22 01:45:11.634724+05:30
r_l6_l2_van	l6	l2	van	95	95	95	105	105	115	115	130	f	t	2026-03-22 01:45:11.634724+05:30
r_l6_l2_suv	l6	l2	suv	110	110	110	120	120	130	130	145	f	t	2026-03-22 01:45:11.634724+05:30
r_l6_l2_minibus	l6	l2	minibus	150	150	150	160	160	170	170	190	f	t	2026-03-22 01:45:11.634724+05:30
r_l6_l11_sedan	l6	l11	sedan	\N	\N	\N	\N	\N	\N	\N	\N	t	t	2026-03-22 01:45:11.634724+05:30
r_l6_l11_van	l6	l11	van	\N	\N	\N	\N	\N	\N	\N	\N	t	t	2026-03-22 01:45:11.634724+05:30
r_l6_l11_suv	l6	l11	suv	\N	\N	\N	\N	\N	\N	\N	\N	t	t	2026-03-22 01:45:11.634724+05:30
r_l6_l11_minibus	l6	l11	minibus	\N	\N	\N	\N	\N	\N	\N	\N	t	t	2026-03-22 01:45:11.634724+05:30
r_l1_l5_sedan	l1	l5	sedan	50	50	50	60	70	80	90	100	f	t	2026-03-22 01:45:11.634724+05:30
\.


--
-- Data for Name: vehicles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehicles (id, name, model, max_passengers, max_luggage, img, price, tag, special, active, sort_order, created_at) FROM stdin;
sedan	BUSINESS CLASS CAR	Mercedes-Benz E-Class or similar	3	2	/images/car.png	80	Most Popular		t	1	2026-03-21 00:07:36.538294+05:30
van	BUSINESS CLASS VAN	Mercedes-Benz V-Class or similar	8	8	/images/car.png	80	Best for Groups	Can accommodate your stroller	t	2	2026-03-21 00:07:36.538294+05:30
suv	LUXURY SUV	Mercedes-Benz GLE or similar	5	5	/images/car.png	110	Premium		t	3	2026-03-21 00:07:36.538294+05:30
minibus	MINIBUS	Mercedes-Benz Sprinter or similar	16	16	/images/car.png	150	Large Groups	Can accommodate multiple strollers & wheelchairs	t	4	2026-03-21 00:07:36.538294+05:30
cjrtg42	test vehicle	test model	4	4	/images/car.png	80			t	4	2026-03-21 03:18:43.03147+05:30
\.


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- Name: features features_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.features
    ADD CONSTRAINT features_pkey PRIMARY KEY (id);


--
-- Name: location_categories location_categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location_categories
    ADD CONSTRAINT location_categories_name_key UNIQUE (name);


--
-- Name: location_categories location_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location_categories
    ADD CONSTRAINT location_categories_pkey PRIMARY KEY (id);


--
-- Name: locations locations_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_name_key UNIQUE (name);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: rates rates_from_loc_id_to_loc_id_vehicle_id_key; Type: CONSTRAINT; Schema: public; Owner: parisadmin
--

ALTER TABLE ONLY public.rates
    ADD CONSTRAINT rates_from_loc_id_to_loc_id_vehicle_id_key UNIQUE (from_loc_id, to_loc_id, vehicle_id);


--
-- Name: rates rates_pkey; Type: CONSTRAINT; Schema: public; Owner: parisadmin
--

ALTER TABLE ONLY public.rates
    ADD CONSTRAINT rates_pkey PRIMARY KEY (id);


--
-- Name: vehicles vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_pkey PRIMARY KEY (id);


--
-- Name: idx_bookings_created; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_bookings_created ON public.bookings USING btree (created_at DESC);


--
-- Name: idx_bookings_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_bookings_status ON public.bookings USING btree (status);


--
-- Name: idx_locations_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_locations_category ON public.locations USING btree (category_id);


--
-- Name: idx_rates_from; Type: INDEX; Schema: public; Owner: parisadmin
--

CREATE INDEX idx_rates_from ON public.rates USING btree (from_loc_id);


--
-- Name: idx_rates_to; Type: INDEX; Schema: public; Owner: parisadmin
--

CREATE INDEX idx_rates_to ON public.rates USING btree (to_loc_id);


--
-- Name: idx_rates_vehicle; Type: INDEX; Schema: public; Owner: parisadmin
--

CREATE INDEX idx_rates_vehicle ON public.rates USING btree (vehicle_id);


--
-- Name: bookings bookings_from_loc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_from_loc_id_fkey FOREIGN KEY (from_loc_id) REFERENCES public.locations(id) ON DELETE SET NULL;


--
-- Name: bookings bookings_to_loc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_to_loc_id_fkey FOREIGN KEY (to_loc_id) REFERENCES public.locations(id) ON DELETE SET NULL;


--
-- Name: bookings bookings_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE SET NULL;


--
-- Name: locations locations_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.location_categories(id) ON DELETE SET NULL;


--
-- Name: rates rates_from_loc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: parisadmin
--

ALTER TABLE ONLY public.rates
    ADD CONSTRAINT rates_from_loc_id_fkey FOREIGN KEY (from_loc_id) REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: rates rates_to_loc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: parisadmin
--

ALTER TABLE ONLY public.rates
    ADD CONSTRAINT rates_to_loc_id_fkey FOREIGN KEY (to_loc_id) REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: rates rates_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: parisadmin
--

ALTER TABLE ONLY public.rates
    ADD CONSTRAINT rates_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON DELETE CASCADE;


--
-- Name: TABLE bookings; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.bookings TO parisadmin;


--
-- Name: TABLE features; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.features TO parisadmin;


--
-- Name: TABLE location_categories; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.location_categories TO parisadmin;


--
-- Name: TABLE locations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.locations TO parisadmin;


--
-- Name: TABLE vehicles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.vehicles TO parisadmin;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: parisadmin
--

ALTER DEFAULT PRIVILEGES FOR ROLE parisadmin IN SCHEMA public GRANT ALL ON SEQUENCES TO parisadmin;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: parisadmin
--

ALTER DEFAULT PRIVILEGES FOR ROLE parisadmin IN SCHEMA public GRANT ALL ON TABLES TO parisadmin;


--
-- PostgreSQL database dump complete
--

\unrestrict OdA5SGPHkW9iiXZoeYZs1hwsQv0KFzD5JW8hXyp1nFScTl1AkYbWTn9oW0Smbgp

