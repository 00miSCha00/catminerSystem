--
-- PostgreSQL database dump
--

-- Dumped from database version 12.10
-- Dumped by pg_dump version 12.10

-- Started on 2022-12-07 15:03:15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 207 (class 1259 OID 18124)
-- Name: alumno; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alumno (
    coalumno smallint NOT NULL,
    copersona smallint,
    celular character varying(10),
    correo character varying(150),
    esalumno smallint,
    esregistro smallint,
    usucrea character varying(20),
    fecrea date,
    ipcrea character varying(15),
    usumodi character varying(20),
    femodi date,
    ipmodi character varying(15)
);


ALTER TABLE public.alumno OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 18144)
-- Name: alumnocarrera; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alumnocarrera (
    coalumnocarrera smallint NOT NULL,
    coalumno smallint,
    cocarrera smallint,
    esdescuento smallint,
    porcedesc smallint,
    montodesc double precision,
    costototal double precision,
    observacion character varying(500),
    esregistro smallint,
    usucrea character varying(20),
    fecrea date,
    ipcrea character varying(15),
    usumodi character varying(20),
    femodi date,
    ipmodi character varying(15)
);


ALTER TABLE public.alumnocarrera OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 18119)
-- Name: banco; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.banco (
    cobanco smallint NOT NULL,
    nobanco character varying(200),
    nucuenta character varying(30),
    esregistro smallint,
    usucrea character varying(20),
    fecrea date,
    ipcrea character varying(15),
    usumodi character varying(20),
    femodi date,
    ipmodi character varying(15)
);


ALTER TABLE public.banco OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 18129)
-- Name: carrera; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carrera (
    cocarrera smallint NOT NULL,
    cotipocarrera smallint,
    decarrera character varying(150),
    esregistro smallint,
    usucrea character varying(20),
    fecrea date,
    ipcrea character varying(15),
    usumodi character varying(20),
    femodi date,
    ipmodi character varying(15)
);


ALTER TABLE public.carrera OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 18139)
-- Name: configuracionpagos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.configuracionpagos (
    coconfiguracionpagos smallint NOT NULL,
    cocarrera smallint,
    nuduracion integer,
    costototal double precision,
    costounit double precision,
    esregistro smallint,
    usucrea character varying(20),
    fecrea date,
    ipcrea character varying(15),
    usumodi character varying(20),
    femodi date,
    ipmodi character varying(15)
);


ALTER TABLE public.configuracionpagos OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 18134)
-- Name: contacto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacto (
    cocontacto smallint NOT NULL,
    coalumno smallint,
    copersona smallint,
    esregistro smallint,
    usucrea character varying(20),
    fecrea date,
    ipcrea character varying(15),
    usumodi character varying(20),
    femodi date,
    ipmodi character varying(15)
);


ALTER TABLE public.contacto OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 18152)
-- Name: pagoalumnocarrera; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pagoalumnocarrera (
    copagoalumnocarrera smallint NOT NULL,
    cotipopago smallint,
    coalumnocarrera smallint,
    cobanco smallint,
    nutransaccion smallint,
    monto double precision,
    fepago date,
    observacion character varying(500),
    esregistro smallint,
    usucrea character varying(20),
    fecrea date,
    ipcrea character varying(15),
    usumodi character varying(20),
    femodi date,
    ipmodi character varying(15)
);


ALTER TABLE public.pagoalumnocarrera OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 18099)
-- Name: persona; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.persona (
    copersona smallint NOT NULL,
    tipodocumento smallint,
    numerodocumento character varying(12),
    apepaterno character varying(100),
    apematerno character varying(100),
    nombres character varying(100),
    sexo smallint,
    fechanacimiento character varying(10),
    esregistro smallint,
    usucrea character varying(20),
    fecrea date,
    ipcrea character varying(15),
    usumodi character varying(20),
    femodi date,
    ipmodi character varying(15)
);


ALTER TABLE public.persona OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 18104)
-- Name: sede; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sede (
    cosede smallint NOT NULL,
    desede character varying(200),
    esregistro smallint,
    usucrea character varying(20),
    fecrea date,
    ipcrea character varying(15),
    usumodi character varying(20),
    femodi date,
    ipmodi character varying(15)
);


ALTER TABLE public.sede OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 18109)
-- Name: tipocarrera; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipocarrera (
    cotipocarrera smallint NOT NULL,
    detipocarrera character varying(200),
    esregistro smallint,
    usucrea character varying(20),
    fecrea date,
    ipcrea character varying(15),
    usumodi character varying(20),
    femodi date,
    ipmodi character varying(15)
);


ALTER TABLE public.tipocarrera OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 18114)
-- Name: tipopago; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipopago (
    cotipopago smallint NOT NULL,
    detipopago character varying(200),
    esregistro smallint,
    usucrea character varying(20),
    fecrea date,
    ipcrea character varying(15),
    usumodi character varying(20),
    femodi date,
    ipmodi character varying(15)
);


ALTER TABLE public.tipopago OWNER TO postgres;

--
-- TOC entry 2880 (class 0 OID 18124)
-- Dependencies: 207
-- Data for Name: alumno; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alumno (coalumno, copersona, celular, correo, esalumno, esregistro, usucrea, fecrea, ipcrea, usumodi, femodi, ipmodi) FROM stdin;
\.


--
-- TOC entry 2884 (class 0 OID 18144)
-- Dependencies: 211
-- Data for Name: alumnocarrera; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alumnocarrera (coalumnocarrera, coalumno, cocarrera, esdescuento, porcedesc, montodesc, costototal, observacion, esregistro, usucrea, fecrea, ipcrea, usumodi, femodi, ipmodi) FROM stdin;
\.


--
-- TOC entry 2879 (class 0 OID 18119)
-- Dependencies: 206
-- Data for Name: banco; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.banco (cobanco, nobanco, nucuenta, esregistro, usucrea, fecrea, ipcrea, usumodi, femodi, ipmodi) FROM stdin;
\.


--
-- TOC entry 2881 (class 0 OID 18129)
-- Dependencies: 208
-- Data for Name: carrera; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carrera (cocarrera, cotipocarrera, decarrera, esregistro, usucrea, fecrea, ipcrea, usumodi, femodi, ipmodi) FROM stdin;
\.


--
-- TOC entry 2883 (class 0 OID 18139)
-- Dependencies: 210
-- Data for Name: configuracionpagos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.configuracionpagos (coconfiguracionpagos, cocarrera, nuduracion, costototal, costounit, esregistro, usucrea, fecrea, ipcrea, usumodi, femodi, ipmodi) FROM stdin;
\.


--
-- TOC entry 2882 (class 0 OID 18134)
-- Dependencies: 209
-- Data for Name: contacto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacto (cocontacto, coalumno, copersona, esregistro, usucrea, fecrea, ipcrea, usumodi, femodi, ipmodi) FROM stdin;
\.


--
-- TOC entry 2885 (class 0 OID 18152)
-- Dependencies: 212
-- Data for Name: pagoalumnocarrera; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pagoalumnocarrera (copagoalumnocarrera, cotipopago, coalumnocarrera, cobanco, nutransaccion, monto, fepago, observacion, esregistro, usucrea, fecrea, ipcrea, usumodi, femodi, ipmodi) FROM stdin;
\.


--
-- TOC entry 2875 (class 0 OID 18099)
-- Dependencies: 202
-- Data for Name: persona; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.persona (copersona, tipodocumento, numerodocumento, apepaterno, apematerno, nombres, sexo, fechanacimiento, esregistro, usucrea, fecrea, ipcrea, usumodi, femodi, ipmodi) FROM stdin;
\.


--
-- TOC entry 2876 (class 0 OID 18104)
-- Dependencies: 203
-- Data for Name: sede; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sede (cosede, desede, esregistro, usucrea, fecrea, ipcrea, usumodi, femodi, ipmodi) FROM stdin;
\.


--
-- TOC entry 2877 (class 0 OID 18109)
-- Dependencies: 204
-- Data for Name: tipocarrera; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipocarrera (cotipocarrera, detipocarrera, esregistro, usucrea, fecrea, ipcrea, usumodi, femodi, ipmodi) FROM stdin;
\.


--
-- TOC entry 2878 (class 0 OID 18114)
-- Dependencies: 205
-- Data for Name: tipopago; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipopago (cotipopago, detipopago, esregistro, usucrea, fecrea, ipcrea, usumodi, femodi, ipmodi) FROM stdin;
\.


--
-- TOC entry 2738 (class 2606 OID 18128)
-- Name: alumno pk_alumno; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alumno
    ADD CONSTRAINT pk_alumno PRIMARY KEY (coalumno);


--
-- TOC entry 2746 (class 2606 OID 18151)
-- Name: alumnocarrera pk_alumnocarrera; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alumnocarrera
    ADD CONSTRAINT pk_alumnocarrera PRIMARY KEY (coalumnocarrera);


--
-- TOC entry 2736 (class 2606 OID 18123)
-- Name: banco pk_banco; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banco
    ADD CONSTRAINT pk_banco PRIMARY KEY (cobanco);


--
-- TOC entry 2740 (class 2606 OID 18133)
-- Name: carrera pk_carrera; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carrera
    ADD CONSTRAINT pk_carrera PRIMARY KEY (cocarrera);


--
-- TOC entry 2744 (class 2606 OID 18143)
-- Name: configuracionpagos pk_configuracionpagos; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuracionpagos
    ADD CONSTRAINT pk_configuracionpagos PRIMARY KEY (coconfiguracionpagos);


--
-- TOC entry 2742 (class 2606 OID 18138)
-- Name: contacto pk_contacto; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacto
    ADD CONSTRAINT pk_contacto PRIMARY KEY (cocontacto);


--
-- TOC entry 2748 (class 2606 OID 18159)
-- Name: pagoalumnocarrera pk_pagoalumnocarrera; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagoalumnocarrera
    ADD CONSTRAINT pk_pagoalumnocarrera PRIMARY KEY (copagoalumnocarrera);


--
-- TOC entry 2728 (class 2606 OID 18103)
-- Name: persona pk_persona; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.persona
    ADD CONSTRAINT pk_persona PRIMARY KEY (copersona);


--
-- TOC entry 2730 (class 2606 OID 18108)
-- Name: sede pk_sede; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sede
    ADD CONSTRAINT pk_sede PRIMARY KEY (cosede);


--
-- TOC entry 2732 (class 2606 OID 18113)
-- Name: tipocarrera pk_tipocarrera; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipocarrera
    ADD CONSTRAINT pk_tipocarrera PRIMARY KEY (cotipocarrera);


--
-- TOC entry 2734 (class 2606 OID 18118)
-- Name: tipopago pk_tipopago; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipopago
    ADD CONSTRAINT pk_tipopago PRIMARY KEY (cotipopago);


-- Completed on 2022-12-07 15:03:15

--
-- PostgreSQL database dump complete
--

