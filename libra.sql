--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

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

--
-- Name: jenis_kelamin; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.jenis_kelamin AS ENUM (
    'Laki-laki',
    'Perempuan'
);


ALTER TYPE public.jenis_kelamin OWNER TO postgres;

--
-- Name: status_peminjaman; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status_peminjaman AS ENUM (
    'Tersedia',
    'Sedang dipinjam'
);


ALTER TYPE public.status_peminjaman OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: buku; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.buku (
    kode character varying(32) NOT NULL,
    nama character varying(128) NOT NULL,
    tahun_terbit integer NOT NULL,
    pengarang character varying(128) NOT NULL,
    genre character varying(64) NOT NULL,
    penerbit character varying(128) NOT NULL
);


ALTER TABLE public.buku OWNER TO postgres;

--
-- Name: peminjam; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.peminjam (
    id bigint NOT NULL,
    nama character varying(128) NOT NULL,
    jenis_kelamin public.jenis_kelamin NOT NULL,
    nomor_telepon bigint NOT NULL,
    alamat text NOT NULL
);


ALTER TABLE public.peminjam OWNER TO postgres;

--
-- Name: peminjam_id_pelanggan_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.peminjam_id_pelanggan_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.peminjam_id_pelanggan_seq OWNER TO postgres;

--
-- Name: peminjam_id_pelanggan_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.peminjam_id_pelanggan_seq OWNED BY public.peminjam.id;


--
-- Name: peminjaman; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.peminjaman (
    id bigint NOT NULL,
    kode_buku character varying(32) NOT NULL,
    id_peminjam bigint NOT NULL,
    tanggal_peminjaman date NOT NULL,
    tanggal_pengembalian date NOT NULL,
    status_peminjaman public.status_peminjaman NOT NULL
);


ALTER TABLE public.peminjaman OWNER TO postgres;

--
-- Name: peminjaman_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.peminjaman_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.peminjaman_id_seq OWNER TO postgres;

--
-- Name: peminjaman_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.peminjaman_id_seq OWNED BY public.peminjaman.id;


--
-- Name: peminjam id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peminjam ALTER COLUMN id SET DEFAULT nextval('public.peminjam_id_pelanggan_seq'::regclass);


--
-- Name: peminjaman id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peminjaman ALTER COLUMN id SET DEFAULT nextval('public.peminjaman_id_seq'::regclass);


--
-- Data for Name: buku; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.buku (kode, nama, tahun_terbit, pengarang, genre, penerbit) FROM stdin;
ADVE0001	Moby-Dick	1851	Herman Melville	Novel, adventure fiction	Richard Bentley
FANT0001	Harry Potter and the Philosophers Stone	1997	J. K. Rowling	Fantasy	Raincoast
ROMA0001	Fifty Shades of Grey	2011	E. L. James	Romance	Vintage Books
FICT0001	Negeri Para Bedebah	2012	Tere Liye	Fiction	Gramedia Pustaka Utama
FICT0002	Laskar Pelangi	2005	Andrea Hirata	Fiction	Bentang Pustaka
BIOG0001	Mein Kampf	1925	Adolf Hitler	Autobiography	Franz Eher N. GmbH
PHIL0001	Madilog	1943	Tan Malaka	Philosophy	 Penerbit Widjaya
RENO0001	Anna Karenin	1879	Leo Tolstoy	Realist novel	The Russian Messenger
RENO0003	Hell Let Loose	1984	Dimas Hamthadi	Action	Mizan
\.


--
-- Data for Name: peminjam; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.peminjam (id, nama, jenis_kelamin, nomor_telepon, alamat) FROM stdin;
2	Yosan herbertus	Laki-laki	86969693369	Jl. Raya Kayu Tinggi , Cakung Tim., Kec. Cakung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13910
3	Yanti Dhenza	Perempuan	21745909111	Jl. Cipinang Elok , Cipinang, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13420
1	Alikonas	Laki-laki	81134232312	Jl. Budi Mulia, Pademangan Bar., Kec. Pademangan, Kota Jakarta Utara, Daerah Khusus Ibukota Jakarta 14420
\.


--
-- Data for Name: peminjaman; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.peminjaman (id, kode_buku, id_peminjam, tanggal_peminjaman, tanggal_pengembalian, status_peminjaman) FROM stdin;
1	ROMA0001	1	2021-02-13	2021-02-14	Tersedia
2	BIOG0001	2	2021-03-05	2021-03-16	Sedang dipinjam
3	ADVE0001	3	2021-03-07	2021-03-20	Sedang dipinjam
7	FICT0001	3	2021-06-19	2021-06-19	Sedang dipinjam
4	RENO0001	1	2021-03-23	2021-04-23	Tersedia
\.


--
-- Name: peminjam_id_pelanggan_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.peminjam_id_pelanggan_seq', 6, true);


--
-- Name: peminjaman_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.peminjaman_id_seq', 9, true);


--
-- Name: buku buku_kode_primary; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buku
    ADD CONSTRAINT buku_kode_primary PRIMARY KEY (kode);


--
-- Name: buku buku_kode_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buku
    ADD CONSTRAINT buku_kode_unique UNIQUE (kode);


--
-- Name: peminjam peminjam_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peminjam
    ADD CONSTRAINT peminjam_id PRIMARY KEY (id);


--
-- Name: peminjaman peminjaman_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_pkey PRIMARY KEY (id);


--
-- Name: peminjaman peminjaman_id_peminjam_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_id_peminjam_fkey FOREIGN KEY (id_peminjam) REFERENCES public.peminjam(id) ON UPDATE SET DEFAULT ON DELETE CASCADE;


--
-- Name: peminjaman peminjaman_kode_buku_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_kode_buku_fkey FOREIGN KEY (kode_buku) REFERENCES public.buku(kode) ON UPDATE SET DEFAULT ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

