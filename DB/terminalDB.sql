PGDMP  '    2                }         
   terminalDB    16.8    16.8 �   j           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            k           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            l           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            m           1262    42654 
   terminalDB    DATABASE     r   CREATE DATABASE "terminalDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es-MX';
    DROP DATABASE "terminalDB";
                postgres    false                       1255    42655    update_modified_column()    FUNCTION     �   CREATE FUNCTION public.update_modified_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;
 /   DROP FUNCTION public.update_modified_column();
       public          postgres    false            �            1259    42656    actaentregacab    TABLE     �  CREATE TABLE public.actaentregacab (
    ae_actaid integer NOT NULL,
    ae_correlativo integer,
    punto_recaud_id integer NOT NULL,
    ae_fecha date,
    ae_grupo character varying(200),
    ae_operador1erturno text,
    ae_operador2doturno text,
    ae_cambiobs numeric(18,2),
    ae_cajachicabs numeric(18,2),
    ae_llaves integer,
    ae_fechero integer,
    ae_tampo integer,
    ae_candados integer,
    ae_observacion text,
    ae_recaudaciontotalbs numeric(18,2),
    ae_usuario integer,
    ae_usuarioarqueo integer,
    ae_fecharegistro timestamp without time zone,
    ae_fechaarqueo timestamp without time zone,
    ae_estado character(1),
    arqueoid integer
);
 "   DROP TABLE public.actaentregacab;
       public         heap    postgres    false            �            1259    42661    actaentregacab_ae_actaid_seq    SEQUENCE     �   CREATE SEQUENCE public.actaentregacab_ae_actaid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.actaentregacab_ae_actaid_seq;
       public          postgres    false    215            n           0    0    actaentregacab_ae_actaid_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.actaentregacab_ae_actaid_seq OWNED BY public.actaentregacab.ae_actaid;
          public          postgres    false    216            �            1259    42662    actaentregadet    TABLE     W  CREATE TABLE public.actaentregadet (
    aed_actaid integer NOT NULL,
    ae_actaid integer,
    servicio_id integer NOT NULL,
    aed_desdenumero integer,
    aed_hastanumero integer,
    aed_vendidohasta integer,
    aed_cantidad integer,
    aed_importebs numeric(18,2),
    aed_estado character(1),
    aed_preciounitario numeric(18,2)
);
 "   DROP TABLE public.actaentregadet;
       public         heap    postgres    false            �            1259    42665    actaentregadet_aed_actaid_seq    SEQUENCE     �   CREATE SEQUENCE public.actaentregadet_aed_actaid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.actaentregadet_aed_actaid_seq;
       public          postgres    false    217            o           0    0    actaentregadet_aed_actaid_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.actaentregadet_aed_actaid_seq OWNED BY public.actaentregadet.aed_actaid;
          public          postgres    false    218            �            1259    42666 	   arqueocab    TABLE     �  CREATE TABLE public.arqueocab (
    arqueoid integer NOT NULL,
    arqueonumero integer NOT NULL,
    arqueofecha timestamp without time zone NOT NULL,
    arqueoturno character varying(200) NOT NULL,
    arqueohorainicio timestamp without time zone NOT NULL,
    arqueohorafin timestamp without time zone NOT NULL,
    arqueosupervisor character varying(200),
    arqueorealizadopor character varying(200),
    arqueorevisadopor character varying(200),
    arqueorecaudaciontotal double precision,
    arqueodiferencia double precision,
    arqueoobservacion text,
    arqueoestado character(1) DEFAULT 'A'::bpchar,
    arqueofecharegistro timestamp without time zone,
    arqueousuario integer,
    arqueodiferenciatipo character(1)
);
    DROP TABLE public.arqueocab;
       public         heap    postgres    false            p           0    0    TABLE arqueocab    COMMENT     .   COMMENT ON TABLE public.arqueocab IS 'TRIAL';
          public          postgres    false    219            q           0    0    COLUMN arqueocab.arqueoid    COMMENT     8   COMMENT ON COLUMN public.arqueocab.arqueoid IS 'TRIAL';
          public          postgres    false    219            r           0    0    COLUMN arqueocab.arqueonumero    COMMENT     <   COMMENT ON COLUMN public.arqueocab.arqueonumero IS 'TRIAL';
          public          postgres    false    219            s           0    0    COLUMN arqueocab.arqueofecha    COMMENT     ;   COMMENT ON COLUMN public.arqueocab.arqueofecha IS 'TRIAL';
          public          postgres    false    219            t           0    0    COLUMN arqueocab.arqueoturno    COMMENT     ;   COMMENT ON COLUMN public.arqueocab.arqueoturno IS 'TRIAL';
          public          postgres    false    219            u           0    0 !   COLUMN arqueocab.arqueohorainicio    COMMENT     @   COMMENT ON COLUMN public.arqueocab.arqueohorainicio IS 'TRIAL';
          public          postgres    false    219            v           0    0    COLUMN arqueocab.arqueohorafin    COMMENT     =   COMMENT ON COLUMN public.arqueocab.arqueohorafin IS 'TRIAL';
          public          postgres    false    219            w           0    0 !   COLUMN arqueocab.arqueosupervisor    COMMENT     @   COMMENT ON COLUMN public.arqueocab.arqueosupervisor IS 'TRIAL';
          public          postgres    false    219            x           0    0 #   COLUMN arqueocab.arqueorealizadopor    COMMENT     B   COMMENT ON COLUMN public.arqueocab.arqueorealizadopor IS 'TRIAL';
          public          postgres    false    219            y           0    0 "   COLUMN arqueocab.arqueorevisadopor    COMMENT     A   COMMENT ON COLUMN public.arqueocab.arqueorevisadopor IS 'TRIAL';
          public          postgres    false    219            z           0    0 '   COLUMN arqueocab.arqueorecaudaciontotal    COMMENT     F   COMMENT ON COLUMN public.arqueocab.arqueorecaudaciontotal IS 'TRIAL';
          public          postgres    false    219            {           0    0 !   COLUMN arqueocab.arqueodiferencia    COMMENT     @   COMMENT ON COLUMN public.arqueocab.arqueodiferencia IS 'TRIAL';
          public          postgres    false    219            |           0    0 "   COLUMN arqueocab.arqueoobservacion    COMMENT     A   COMMENT ON COLUMN public.arqueocab.arqueoobservacion IS 'TRIAL';
          public          postgres    false    219            }           0    0    COLUMN arqueocab.arqueoestado    COMMENT     <   COMMENT ON COLUMN public.arqueocab.arqueoestado IS 'TRIAL';
          public          postgres    false    219            ~           0    0 $   COLUMN arqueocab.arqueofecharegistro    COMMENT     C   COMMENT ON COLUMN public.arqueocab.arqueofecharegistro IS 'TRIAL';
          public          postgres    false    219                       0    0    COLUMN arqueocab.arqueousuario    COMMENT     =   COMMENT ON COLUMN public.arqueocab.arqueousuario IS 'TRIAL';
          public          postgres    false    219            �            1259    42672    arqueodetcortes    TABLE     �  CREATE TABLE public.arqueodetcortes (
    arqueodetcorteid integer NOT NULL,
    arqueoid integer,
    arqueocorte200_00 integer,
    arqueocorte100_00 integer,
    arqueocorte050_00 integer,
    arqueocorte020_00 integer,
    arqueocorte010_00 integer,
    arqueocorte005_00 integer,
    arqueocorte002_00 integer,
    arqueocorte001_00 integer,
    arqueocorte000_50 integer,
    arqueocorte000_20 integer,
    arqueocorte000_10 integer,
    arqueoestado character(1)
);
 #   DROP TABLE public.arqueodetcortes;
       public         heap    postgres    false            �           0    0    TABLE arqueodetcortes    COMMENT     4   COMMENT ON TABLE public.arqueodetcortes IS 'TRIAL';
          public          postgres    false    220            �           0    0 '   COLUMN arqueodetcortes.arqueodetcorteid    COMMENT     F   COMMENT ON COLUMN public.arqueodetcortes.arqueodetcorteid IS 'TRIAL';
          public          postgres    false    220            �           0    0    COLUMN arqueodetcortes.arqueoid    COMMENT     >   COMMENT ON COLUMN public.arqueodetcortes.arqueoid IS 'TRIAL';
          public          postgres    false    220            �           0    0 (   COLUMN arqueodetcortes.arqueocorte200_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte200_00 IS 'TRIAL';
          public          postgres    false    220            �           0    0 (   COLUMN arqueodetcortes.arqueocorte100_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte100_00 IS 'TRIAL';
          public          postgres    false    220            �           0    0 (   COLUMN arqueodetcortes.arqueocorte050_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte050_00 IS 'TRIAL';
          public          postgres    false    220            �           0    0 (   COLUMN arqueodetcortes.arqueocorte020_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte020_00 IS 'TRIAL';
          public          postgres    false    220            �           0    0 (   COLUMN arqueodetcortes.arqueocorte010_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte010_00 IS 'TRIAL';
          public          postgres    false    220            �           0    0 (   COLUMN arqueodetcortes.arqueocorte005_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte005_00 IS 'TRIAL';
          public          postgres    false    220            �           0    0 (   COLUMN arqueodetcortes.arqueocorte002_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte002_00 IS 'TRIAL';
          public          postgres    false    220            �           0    0 (   COLUMN arqueodetcortes.arqueocorte001_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte001_00 IS 'TRIAL';
          public          postgres    false    220            �           0    0 (   COLUMN arqueodetcortes.arqueocorte000_50    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte000_50 IS 'TRIAL';
          public          postgres    false    220            �           0    0 (   COLUMN arqueodetcortes.arqueocorte000_20    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte000_20 IS 'TRIAL';
          public          postgres    false    220            �           0    0 (   COLUMN arqueodetcortes.arqueocorte000_10    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte000_10 IS 'TRIAL';
          public          postgres    false    220            �           0    0 #   COLUMN arqueodetcortes.arqueoestado    COMMENT     B   COMMENT ON COLUMN public.arqueodetcortes.arqueoestado IS 'TRIAL';
          public          postgres    false    220            �            1259    42675    arqueorecaudacioncab    TABLE     �  CREATE TABLE public.arqueorecaudacioncab (
    arqueorecid integer NOT NULL,
    arqueocorrelativo integer,
    arqueofecha date NOT NULL,
    arqueoturno character(1),
    punto_recaud_id integer NOT NULL,
    arqueonombreoperador text,
    arqueousuario integer,
    arqueofecharegistro timestamp without time zone,
    arqueoid integer,
    arqueoestado character(1),
    arqueonombresupervisor text
);
 (   DROP TABLE public.arqueorecaudacioncab;
       public         heap    postgres    false            �            1259    42680 $   arqueorecaudacioncab_arqueorecid_seq    SEQUENCE     �   CREATE SEQUENCE public.arqueorecaudacioncab_arqueorecid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.arqueorecaudacioncab_arqueorecid_seq;
       public          postgres    false    221            �           0    0 $   arqueorecaudacioncab_arqueorecid_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.arqueorecaudacioncab_arqueorecid_seq OWNED BY public.arqueorecaudacioncab.arqueorecid;
          public          postgres    false    222            �            1259    42681    arqueorecaudaciondet    TABLE     :  CREATE TABLE public.arqueorecaudaciondet (
    arqueorecdetid integer NOT NULL,
    arqueorecid integer NOT NULL,
    servicio_id integer NOT NULL,
    arqueodetcantidad integer NOT NULL,
    arqueodettarifabs numeric(18,2) NOT NULL,
    arqueodetimportebs numeric(18,2) NOT NULL,
    arqueoestado character(1)
);
 (   DROP TABLE public.arqueorecaudaciondet;
       public         heap    postgres    false            �            1259    42684 '   arqueorecaudaciondet_arqueorecdetid_seq    SEQUENCE     �   CREATE SEQUENCE public.arqueorecaudaciondet_arqueorecdetid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public.arqueorecaudaciondet_arqueorecdetid_seq;
       public          postgres    false    223            �           0    0 '   arqueorecaudaciondet_arqueorecdetid_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public.arqueorecaudaciondet_arqueorecdetid_seq OWNED BY public.arqueorecaudaciondet.arqueorecdetid;
          public          postgres    false    224            �            1259    42685    audits    TABLE     �  CREATE TABLE public.audits (
    id bigint NOT NULL,
    user_type character varying(255),
    user_id bigint,
    event character varying(255) NOT NULL,
    auditable_type character varying(255) NOT NULL,
    auditable_id bigint NOT NULL,
    old_values text,
    new_values text,
    url text,
    ip_address inet,
    user_agent character varying(1023),
    tags character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
    DROP TABLE public.audits;
       public         heap    postgres    false            �            1259    42690    audits_id_seq    SEQUENCE     v   CREATE SEQUENCE public.audits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.audits_id_seq;
       public          postgres    false    225            �           0    0    audits_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.audits_id_seq OWNED BY public.audits.id;
          public          postgres    false    226            �            1259    42691    facturastmp    TABLE     Q  CREATE TABLE public.facturastmp (
    id integer NOT NULL,
    numero_registro integer,
    fecha_factura date,
    numero_factura character varying(50),
    codigo_autorizacion character varying(100),
    nit_ci character varying(30),
    complemento character varying(10),
    nombre_razon_social character varying(300),
    importe_total_venta numeric(12,2),
    importe_ice numeric(12,2),
    importe_iehd numeric(12,2),
    importe_ipj numeric(12,2),
    tasas numeric(12,2),
    otros_no_sujetos_iva numeric(12,2),
    exportaciones_operaciones_exentas numeric(12,2),
    ventas_gravadas_tasa_cero numeric(12,2),
    subtotal numeric(12,2),
    descuentos_bonificaciones_rebajas numeric(12,2),
    importe_gift_card numeric(12,2),
    importe_base_debito_fiscal numeric(12,2),
    debito_fiscal numeric(12,2),
    estado character varying(50),
    codigo_control character varying(100),
    tipo_venta character varying(150),
    derecho_credito_fiscal character varying(2),
    estado_consolidacion character varying(50),
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.facturastmp;
       public         heap    postgres    false            �            1259    42697    facturastmp_id_seq    SEQUENCE     �   CREATE SEQUENCE public.facturastmp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.facturastmp_id_seq;
       public          postgres    false    227            �           0    0    facturastmp_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.facturastmp_id_seq OWNED BY public.facturastmp.id;
          public          postgres    false    228            �            1259    42698    failed_jobs    TABLE     &  CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.failed_jobs;
       public         heap    postgres    false            �            1259    42704    failed_jobs_id_seq    SEQUENCE     {   CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.failed_jobs_id_seq;
       public          postgres    false    229            �           0    0    failed_jobs_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;
          public          postgres    false    230            �            1259    42705 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);
    DROP TABLE public.migrations;
       public         heap    postgres    false            �            1259    42708    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public          postgres    false    231            �           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public          postgres    false    232            �            1259    42709    oauth_access_tokens    TABLE     d  CREATE TABLE public.oauth_access_tokens (
    id character varying(100) NOT NULL,
    user_id bigint,
    client_id bigint NOT NULL,
    name character varying(255),
    scopes text,
    revoked boolean NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone
);
 '   DROP TABLE public.oauth_access_tokens;
       public         heap    postgres    false            �            1259    42714    oauth_auth_codes    TABLE     �   CREATE TABLE public.oauth_auth_codes (
    id character varying(100) NOT NULL,
    user_id bigint NOT NULL,
    client_id bigint NOT NULL,
    scopes text,
    revoked boolean NOT NULL,
    expires_at timestamp(0) without time zone
);
 $   DROP TABLE public.oauth_auth_codes;
       public         heap    postgres    false            �            1259    42719    oauth_clients    TABLE     �  CREATE TABLE public.oauth_clients (
    id bigint NOT NULL,
    user_id bigint,
    name character varying(255) NOT NULL,
    secret character varying(100),
    provider character varying(255),
    redirect text NOT NULL,
    personal_access_client boolean NOT NULL,
    password_client boolean NOT NULL,
    revoked boolean NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 !   DROP TABLE public.oauth_clients;
       public         heap    postgres    false            �            1259    42724    oauth_clients_id_seq    SEQUENCE     }   CREATE SEQUENCE public.oauth_clients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.oauth_clients_id_seq;
       public          postgres    false    235            �           0    0    oauth_clients_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.oauth_clients_id_seq OWNED BY public.oauth_clients.id;
          public          postgres    false    236            �            1259    42725    oauth_personal_access_clients    TABLE     �   CREATE TABLE public.oauth_personal_access_clients (
    id bigint NOT NULL,
    client_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 1   DROP TABLE public.oauth_personal_access_clients;
       public         heap    postgres    false            �            1259    42728 $   oauth_personal_access_clients_id_seq    SEQUENCE     �   CREATE SEQUENCE public.oauth_personal_access_clients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.oauth_personal_access_clients_id_seq;
       public          postgres    false    237            �           0    0 $   oauth_personal_access_clients_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.oauth_personal_access_clients_id_seq OWNED BY public.oauth_personal_access_clients.id;
          public          postgres    false    238            �            1259    42729    oauth_refresh_tokens    TABLE     �   CREATE TABLE public.oauth_refresh_tokens (
    id character varying(100) NOT NULL,
    access_token_id character varying(100) NOT NULL,
    revoked boolean NOT NULL,
    expires_at timestamp(0) without time zone
);
 (   DROP TABLE public.oauth_refresh_tokens;
       public         heap    postgres    false            �            1259    42732    password_reset_tokens    TABLE     �   CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);
 )   DROP TABLE public.password_reset_tokens;
       public         heap    postgres    false            �            1259    42737    personal_access_tokens    TABLE     �  CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 *   DROP TABLE public.personal_access_tokens;
       public         heap    postgres    false            �            1259    42742    personal_access_tokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.personal_access_tokens_id_seq;
       public          postgres    false    241            �           0    0    personal_access_tokens_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;
          public          postgres    false    242            �            1259    42743    roles    TABLE     �   CREATE TABLE public.roles (
    id integer NOT NULL,
    role_name character varying(255) NOT NULL,
    role_description text
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    42748    roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public          postgres    false    243            �           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
          public          postgres    false    244            �            1259    42749    tbl_arrendamientos    TABLE     �  CREATE TABLE public.tbl_arrendamientos (
    arrendamiento_id integer NOT NULL,
    ambiente_id integer,
    num_contrato character varying(255) NOT NULL,
    operador_nombre character varying(255) NOT NULL,
    arrendatario_nombre text NOT NULL,
    arrendatario_apellido_paterno character varying(255),
    arrendatario_apellido_materno character varying(255),
    arrendatario_ci character varying(255),
    arrendatario_nombre_comercial text NOT NULL,
    arrendatario_telefono character varying(20),
    arrendatario_celular character varying(20),
    ambiente_codigo character varying(255) NOT NULL,
    arrendamiento_fecha_inicio date NOT NULL,
    arrendamiento_fecha_fin date NOT NULL,
    arrendamiento_canon double precision NOT NULL,
    arrendamiento_funcion text,
    arrendamiento_forma_pago character varying(255) DEFAULT 'MENSUAL'::character varying,
    arrendamiento_estado character(1),
    arrendamiento_fecha timestamp with time zone
);
 &   DROP TABLE public.tbl_arrendamientos;
       public         heap    postgres    false            �           0    0    TABLE tbl_arrendamientos    COMMENT     7   COMMENT ON TABLE public.tbl_arrendamientos IS 'TRIAL';
          public          postgres    false    245            �           0    0 *   COLUMN tbl_arrendamientos.arrendamiento_id    COMMENT     I   COMMENT ON COLUMN public.tbl_arrendamientos.arrendamiento_id IS 'TRIAL';
          public          postgres    false    245            �           0    0 %   COLUMN tbl_arrendamientos.ambiente_id    COMMENT     D   COMMENT ON COLUMN public.tbl_arrendamientos.ambiente_id IS 'TRIAL';
          public          postgres    false    245            �           0    0 &   COLUMN tbl_arrendamientos.num_contrato    COMMENT     E   COMMENT ON COLUMN public.tbl_arrendamientos.num_contrato IS 'TRIAL';
          public          postgres    false    245            �           0    0 )   COLUMN tbl_arrendamientos.operador_nombre    COMMENT     H   COMMENT ON COLUMN public.tbl_arrendamientos.operador_nombre IS 'TRIAL';
          public          postgres    false    245            �           0    0 -   COLUMN tbl_arrendamientos.arrendatario_nombre    COMMENT     L   COMMENT ON COLUMN public.tbl_arrendamientos.arrendatario_nombre IS 'TRIAL';
          public          postgres    false    245            �           0    0 7   COLUMN tbl_arrendamientos.arrendatario_apellido_paterno    COMMENT     V   COMMENT ON COLUMN public.tbl_arrendamientos.arrendatario_apellido_paterno IS 'TRIAL';
          public          postgres    false    245            �           0    0 7   COLUMN tbl_arrendamientos.arrendatario_apellido_materno    COMMENT     V   COMMENT ON COLUMN public.tbl_arrendamientos.arrendatario_apellido_materno IS 'TRIAL';
          public          postgres    false    245            �           0    0 )   COLUMN tbl_arrendamientos.arrendatario_ci    COMMENT     H   COMMENT ON COLUMN public.tbl_arrendamientos.arrendatario_ci IS 'TRIAL';
          public          postgres    false    245            �           0    0 7   COLUMN tbl_arrendamientos.arrendatario_nombre_comercial    COMMENT     V   COMMENT ON COLUMN public.tbl_arrendamientos.arrendatario_nombre_comercial IS 'TRIAL';
          public          postgres    false    245            �           0    0 /   COLUMN tbl_arrendamientos.arrendatario_telefono    COMMENT     N   COMMENT ON COLUMN public.tbl_arrendamientos.arrendatario_telefono IS 'TRIAL';
          public          postgres    false    245            �           0    0 .   COLUMN tbl_arrendamientos.arrendatario_celular    COMMENT     M   COMMENT ON COLUMN public.tbl_arrendamientos.arrendatario_celular IS 'TRIAL';
          public          postgres    false    245            �           0    0 )   COLUMN tbl_arrendamientos.ambiente_codigo    COMMENT     H   COMMENT ON COLUMN public.tbl_arrendamientos.ambiente_codigo IS 'TRIAL';
          public          postgres    false    245            �           0    0 4   COLUMN tbl_arrendamientos.arrendamiento_fecha_inicio    COMMENT     S   COMMENT ON COLUMN public.tbl_arrendamientos.arrendamiento_fecha_inicio IS 'TRIAL';
          public          postgres    false    245            �           0    0 1   COLUMN tbl_arrendamientos.arrendamiento_fecha_fin    COMMENT     P   COMMENT ON COLUMN public.tbl_arrendamientos.arrendamiento_fecha_fin IS 'TRIAL';
          public          postgres    false    245            �           0    0 -   COLUMN tbl_arrendamientos.arrendamiento_canon    COMMENT     L   COMMENT ON COLUMN public.tbl_arrendamientos.arrendamiento_canon IS 'TRIAL';
          public          postgres    false    245            �           0    0 /   COLUMN tbl_arrendamientos.arrendamiento_funcion    COMMENT     N   COMMENT ON COLUMN public.tbl_arrendamientos.arrendamiento_funcion IS 'TRIAL';
          public          postgres    false    245            �           0    0 2   COLUMN tbl_arrendamientos.arrendamiento_forma_pago    COMMENT     Q   COMMENT ON COLUMN public.tbl_arrendamientos.arrendamiento_forma_pago IS 'TRIAL';
          public          postgres    false    245            �           0    0 .   COLUMN tbl_arrendamientos.arrendamiento_estado    COMMENT     M   COMMENT ON COLUMN public.tbl_arrendamientos.arrendamiento_estado IS 'TRIAL';
          public          postgres    false    245            �            1259    42755 '   tbl_arrendamientos_arrendamiento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_arrendamientos_arrendamiento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public.tbl_arrendamientos_arrendamiento_id_seq;
       public          postgres    false    245            �           0    0 '   tbl_arrendamientos_arrendamiento_id_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public.tbl_arrendamientos_arrendamiento_id_seq OWNED BY public.tbl_arrendamientos.arrendamiento_id;
          public          postgres    false    246            �            1259    42756    tbl_arrendamientos_documentos    TABLE     {  CREATE TABLE public.tbl_arrendamientos_documentos (
    documento_id integer NOT NULL,
    arrendamiento_id integer,
    documento_tipo character varying(50) NOT NULL,
    documento_nombre character varying(255) NOT NULL,
    documento_url text NOT NULL,
    documento_descripcion text NOT NULL,
    fecha_subida timestamp without time zone,
    documento_estado character(1)
);
 1   DROP TABLE public.tbl_arrendamientos_documentos;
       public         heap    postgres    false            �           0    0 #   TABLE tbl_arrendamientos_documentos    COMMENT     B   COMMENT ON TABLE public.tbl_arrendamientos_documentos IS 'TRIAL';
          public          postgres    false    247            �           0    0 1   COLUMN tbl_arrendamientos_documentos.documento_id    COMMENT     P   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.documento_id IS 'TRIAL';
          public          postgres    false    247            �           0    0 5   COLUMN tbl_arrendamientos_documentos.arrendamiento_id    COMMENT     T   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.arrendamiento_id IS 'TRIAL';
          public          postgres    false    247            �           0    0 3   COLUMN tbl_arrendamientos_documentos.documento_tipo    COMMENT     R   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.documento_tipo IS 'TRIAL';
          public          postgres    false    247            �           0    0 5   COLUMN tbl_arrendamientos_documentos.documento_nombre    COMMENT     T   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.documento_nombre IS 'TRIAL';
          public          postgres    false    247            �           0    0 2   COLUMN tbl_arrendamientos_documentos.documento_url    COMMENT     Q   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.documento_url IS 'TRIAL';
          public          postgres    false    247            �           0    0 :   COLUMN tbl_arrendamientos_documentos.documento_descripcion    COMMENT     Y   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.documento_descripcion IS 'TRIAL';
          public          postgres    false    247            �           0    0 1   COLUMN tbl_arrendamientos_documentos.fecha_subida    COMMENT     P   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.fecha_subida IS 'TRIAL';
          public          postgres    false    247            �           0    0 5   COLUMN tbl_arrendamientos_documentos.documento_estado    COMMENT     T   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.documento_estado IS 'TRIAL';
          public          postgres    false    247            �            1259    42761 .   tbl_arrendamientos_documentos_documento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_arrendamientos_documentos_documento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 E   DROP SEQUENCE public.tbl_arrendamientos_documentos_documento_id_seq;
       public          postgres    false    247            �           0    0 .   tbl_arrendamientos_documentos_documento_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.tbl_arrendamientos_documentos_documento_id_seq OWNED BY public.tbl_arrendamientos_documentos.documento_id;
          public          postgres    false    248            �            1259    42762    tbl_depositos    TABLE     �  CREATE TABLE public.tbl_depositos (
    deposito_id integer NOT NULL,
    codigo character varying(50),
    fecha_recaudacion date NOT NULL,
    fecha_deposito_1 date,
    numero_deposito_1 character varying(50),
    efectivo_1 numeric(15,2),
    fecha_deposito_2 date,
    numero_deposito_2 character varying(50),
    efectivo_2 numeric(15,2),
    total_efectivo numeric(15,2),
    depositantes text,
    observacion text
);
 !   DROP TABLE public.tbl_depositos;
       public         heap    postgres    false            �            1259    42767    tbl_depositos_deposito_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_depositos_deposito_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.tbl_depositos_deposito_id_seq;
       public          postgres    false    249            �           0    0    tbl_depositos_deposito_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.tbl_depositos_deposito_id_seq OWNED BY public.tbl_depositos.deposito_id;
          public          postgres    false    250            �            1259    42768    tbl_edificio    TABLE     �   CREATE TABLE public.tbl_edificio (
    edificio_id integer NOT NULL,
    edificio_nombre text NOT NULL,
    edificio_direccion text NOT NULL
);
     DROP TABLE public.tbl_edificio;
       public         heap    postgres    false            �           0    0    TABLE tbl_edificio    COMMENT     1   COMMENT ON TABLE public.tbl_edificio IS 'TRIAL';
          public          postgres    false    251            �           0    0    COLUMN tbl_edificio.edificio_id    COMMENT     >   COMMENT ON COLUMN public.tbl_edificio.edificio_id IS 'TRIAL';
          public          postgres    false    251            �           0    0 #   COLUMN tbl_edificio.edificio_nombre    COMMENT     B   COMMENT ON COLUMN public.tbl_edificio.edificio_nombre IS 'TRIAL';
          public          postgres    false    251            �           0    0 &   COLUMN tbl_edificio.edificio_direccion    COMMENT     E   COMMENT ON COLUMN public.tbl_edificio.edificio_direccion IS 'TRIAL';
          public          postgres    false    251            �            1259    42773    tbl_edificio_ambiente    TABLE     �  CREATE TABLE public.tbl_edificio_ambiente (
    ambiente_id integer NOT NULL,
    edificio_id integer NOT NULL,
    nivel_id integer NOT NULL,
    seccion_id integer NOT NULL,
    ambiente_nombre text NOT NULL,
    ambiente_tamano numeric,
    ambiente_tipo_uso text,
    ambiente_precio_alquiler numeric,
    ambiente_codigo_interno text,
    ambiente_superficie_m2 numeric,
    ambiente_estado character(1) NOT NULL
);
 )   DROP TABLE public.tbl_edificio_ambiente;
       public         heap    postgres    false            �            1259    42778 %   tbl_edificio_ambiente_ambiente_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_edificio_ambiente_ambiente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.tbl_edificio_ambiente_ambiente_id_seq;
       public          postgres    false    252            �           0    0 %   tbl_edificio_ambiente_ambiente_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.tbl_edificio_ambiente_ambiente_id_seq OWNED BY public.tbl_edificio_ambiente.ambiente_id;
          public          postgres    false    253            �            1259    42779    tbl_edificio_edificio_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_edificio_edificio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.tbl_edificio_edificio_id_seq;
       public          postgres    false    251            �           0    0    tbl_edificio_edificio_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.tbl_edificio_edificio_id_seq OWNED BY public.tbl_edificio.edificio_id;
          public          postgres    false    254            �            1259    42780    tbl_edificio_nivel    TABLE     �   CREATE TABLE public.tbl_edificio_nivel (
    nivel_id integer NOT NULL,
    nivel_nombre text NOT NULL,
    nivel_estado character(1) NOT NULL
);
 &   DROP TABLE public.tbl_edificio_nivel;
       public         heap    postgres    false            �           0    0    TABLE tbl_edificio_nivel    COMMENT     7   COMMENT ON TABLE public.tbl_edificio_nivel IS 'TRIAL';
          public          postgres    false    255            �           0    0 "   COLUMN tbl_edificio_nivel.nivel_id    COMMENT     A   COMMENT ON COLUMN public.tbl_edificio_nivel.nivel_id IS 'TRIAL';
          public          postgres    false    255            �           0    0 &   COLUMN tbl_edificio_nivel.nivel_nombre    COMMENT     E   COMMENT ON COLUMN public.tbl_edificio_nivel.nivel_nombre IS 'TRIAL';
          public          postgres    false    255            �           0    0 &   COLUMN tbl_edificio_nivel.nivel_estado    COMMENT     E   COMMENT ON COLUMN public.tbl_edificio_nivel.nivel_estado IS 'TRIAL';
          public          postgres    false    255                        1259    42785    tbl_edificio_nivel_nivel_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_edificio_nivel_nivel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.tbl_edificio_nivel_nivel_id_seq;
       public          postgres    false    255            �           0    0    tbl_edificio_nivel_nivel_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.tbl_edificio_nivel_nivel_id_seq OWNED BY public.tbl_edificio_nivel.nivel_id;
          public          postgres    false    256                       1259    42786    tbl_edificio_seccion    TABLE     �   CREATE TABLE public.tbl_edificio_seccion (
    seccion_id integer NOT NULL,
    seccion_nombre text NOT NULL,
    seccion_estado character(1) NOT NULL
);
 (   DROP TABLE public.tbl_edificio_seccion;
       public         heap    postgres    false            �           0    0    TABLE tbl_edificio_seccion    COMMENT     9   COMMENT ON TABLE public.tbl_edificio_seccion IS 'TRIAL';
          public          postgres    false    257            �           0    0 &   COLUMN tbl_edificio_seccion.seccion_id    COMMENT     E   COMMENT ON COLUMN public.tbl_edificio_seccion.seccion_id IS 'TRIAL';
          public          postgres    false    257            �           0    0 *   COLUMN tbl_edificio_seccion.seccion_nombre    COMMENT     I   COMMENT ON COLUMN public.tbl_edificio_seccion.seccion_nombre IS 'TRIAL';
          public          postgres    false    257            �           0    0 *   COLUMN tbl_edificio_seccion.seccion_estado    COMMENT     I   COMMENT ON COLUMN public.tbl_edificio_seccion.seccion_estado IS 'TRIAL';
          public          postgres    false    257                       1259    42791 #   tbl_edificio_seccion_seccion_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_edificio_seccion_seccion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.tbl_edificio_seccion_seccion_id_seq;
       public          postgres    false    257            �           0    0 #   tbl_edificio_seccion_seccion_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.tbl_edificio_seccion_seccion_id_seq OWNED BY public.tbl_edificio_seccion.seccion_id;
          public          postgres    false    258                       1259    42792    tbl_factura_detalle    TABLE     �  CREATE TABLE public.tbl_factura_detalle (
    detalle_id integer NOT NULL,
    factura_id integer,
    arrendamiento_id integer,
    fact_detalle_periodo_pago text NOT NULL,
    fact_detalle_canon_alquiler double precision NOT NULL,
    fact_detalle_morosidad_penalidad double precision DEFAULT 0,
    fact_detalle_dias_morosidad integer DEFAULT 0,
    fact_detalle_total_mora double precision DEFAULT 0,
    fact_detalle_importe_bs double precision NOT NULL,
    fact_detalle_observaciones text
);
 '   DROP TABLE public.tbl_factura_detalle;
       public         heap    postgres    false            �           0    0    TABLE tbl_factura_detalle    COMMENT     8   COMMENT ON TABLE public.tbl_factura_detalle IS 'TRIAL';
          public          postgres    false    259            �           0    0 %   COLUMN tbl_factura_detalle.detalle_id    COMMENT     D   COMMENT ON COLUMN public.tbl_factura_detalle.detalle_id IS 'TRIAL';
          public          postgres    false    259            �           0    0 %   COLUMN tbl_factura_detalle.factura_id    COMMENT     D   COMMENT ON COLUMN public.tbl_factura_detalle.factura_id IS 'TRIAL';
          public          postgres    false    259            �           0    0 +   COLUMN tbl_factura_detalle.arrendamiento_id    COMMENT     J   COMMENT ON COLUMN public.tbl_factura_detalle.arrendamiento_id IS 'TRIAL';
          public          postgres    false    259            �           0    0 4   COLUMN tbl_factura_detalle.fact_detalle_periodo_pago    COMMENT     S   COMMENT ON COLUMN public.tbl_factura_detalle.fact_detalle_periodo_pago IS 'TRIAL';
          public          postgres    false    259            �           0    0 6   COLUMN tbl_factura_detalle.fact_detalle_canon_alquiler    COMMENT     U   COMMENT ON COLUMN public.tbl_factura_detalle.fact_detalle_canon_alquiler IS 'TRIAL';
          public          postgres    false    259            �           0    0 ;   COLUMN tbl_factura_detalle.fact_detalle_morosidad_penalidad    COMMENT     Z   COMMENT ON COLUMN public.tbl_factura_detalle.fact_detalle_morosidad_penalidad IS 'TRIAL';
          public          postgres    false    259            �           0    0 6   COLUMN tbl_factura_detalle.fact_detalle_dias_morosidad    COMMENT     U   COMMENT ON COLUMN public.tbl_factura_detalle.fact_detalle_dias_morosidad IS 'TRIAL';
          public          postgres    false    259            �           0    0 2   COLUMN tbl_factura_detalle.fact_detalle_total_mora    COMMENT     Q   COMMENT ON COLUMN public.tbl_factura_detalle.fact_detalle_total_mora IS 'TRIAL';
          public          postgres    false    259            �           0    0 2   COLUMN tbl_factura_detalle.fact_detalle_importe_bs    COMMENT     Q   COMMENT ON COLUMN public.tbl_factura_detalle.fact_detalle_importe_bs IS 'TRIAL';
          public          postgres    false    259            �           0    0 5   COLUMN tbl_factura_detalle.fact_detalle_observaciones    COMMENT     T   COMMENT ON COLUMN public.tbl_factura_detalle.fact_detalle_observaciones IS 'TRIAL';
          public          postgres    false    259                       1259    42800 "   tbl_factura_detalle_detalle_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_factura_detalle_detalle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.tbl_factura_detalle_detalle_id_seq;
       public          postgres    false    259            �           0    0 "   tbl_factura_detalle_detalle_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.tbl_factura_detalle_detalle_id_seq OWNED BY public.tbl_factura_detalle.detalle_id;
          public          postgres    false    260                       1259    42801    tbl_facturas    TABLE     �  CREATE TABLE public.tbl_facturas (
    factura_id integer NOT NULL,
    arrendatario_nombre text NOT NULL,
    arrendatario_ci character varying(100) NOT NULL,
    factura_numero text NOT NULL,
    factura_fecha_emision timestamp without time zone,
    factura_total double precision NOT NULL,
    factura_fecha_pago timestamp without time zone,
    factura_estado character(1) DEFAULT 'P'::bpchar
);
     DROP TABLE public.tbl_facturas;
       public         heap    postgres    false            �           0    0    TABLE tbl_facturas    COMMENT     1   COMMENT ON TABLE public.tbl_facturas IS 'TRIAL';
          public          postgres    false    261            �           0    0    COLUMN tbl_facturas.factura_id    COMMENT     =   COMMENT ON COLUMN public.tbl_facturas.factura_id IS 'TRIAL';
          public          postgres    false    261            �           0    0 '   COLUMN tbl_facturas.arrendatario_nombre    COMMENT     F   COMMENT ON COLUMN public.tbl_facturas.arrendatario_nombre IS 'TRIAL';
          public          postgres    false    261            �           0    0 #   COLUMN tbl_facturas.arrendatario_ci    COMMENT     B   COMMENT ON COLUMN public.tbl_facturas.arrendatario_ci IS 'TRIAL';
          public          postgres    false    261            �           0    0 "   COLUMN tbl_facturas.factura_numero    COMMENT     A   COMMENT ON COLUMN public.tbl_facturas.factura_numero IS 'TRIAL';
          public          postgres    false    261            �           0    0 )   COLUMN tbl_facturas.factura_fecha_emision    COMMENT     H   COMMENT ON COLUMN public.tbl_facturas.factura_fecha_emision IS 'TRIAL';
          public          postgres    false    261            �           0    0 !   COLUMN tbl_facturas.factura_total    COMMENT     @   COMMENT ON COLUMN public.tbl_facturas.factura_total IS 'TRIAL';
          public          postgres    false    261            �           0    0 &   COLUMN tbl_facturas.factura_fecha_pago    COMMENT     E   COMMENT ON COLUMN public.tbl_facturas.factura_fecha_pago IS 'TRIAL';
          public          postgres    false    261            �           0    0 "   COLUMN tbl_facturas.factura_estado    COMMENT     A   COMMENT ON COLUMN public.tbl_facturas.factura_estado IS 'TRIAL';
          public          postgres    false    261                       1259    42807    tbl_facturas_factura_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_facturas_factura_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.tbl_facturas_factura_id_seq;
       public          postgres    false    261            �           0    0    tbl_facturas_factura_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.tbl_facturas_factura_id_seq OWNED BY public.tbl_facturas.factura_id;
          public          postgres    false    262                       1259    42808    tbl_operadores    TABLE     �   CREATE TABLE public.tbl_operadores (
    operador_id integer NOT NULL,
    per_id integer,
    operador_estado character(1) NOT NULL
);
 "   DROP TABLE public.tbl_operadores;
       public         heap    postgres    false            �           0    0    TABLE tbl_operadores    COMMENT     3   COMMENT ON TABLE public.tbl_operadores IS 'TRIAL';
          public          postgres    false    263            �           0    0 !   COLUMN tbl_operadores.operador_id    COMMENT     @   COMMENT ON COLUMN public.tbl_operadores.operador_id IS 'TRIAL';
          public          postgres    false    263            �           0    0    COLUMN tbl_operadores.per_id    COMMENT     ;   COMMENT ON COLUMN public.tbl_operadores.per_id IS 'TRIAL';
          public          postgres    false    263            �           0    0 %   COLUMN tbl_operadores.operador_estado    COMMENT     D   COMMENT ON COLUMN public.tbl_operadores.operador_estado IS 'TRIAL';
          public          postgres    false    263                       1259    42811    tbl_operadores_operador_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_operadores_operador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.tbl_operadores_operador_id_seq;
       public          postgres    false    263            �           0    0    tbl_operadores_operador_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.tbl_operadores_operador_id_seq OWNED BY public.tbl_operadores.operador_id;
          public          postgres    false    264            	           1259    42812    tbl_pagos_arrendamientos    TABLE     �   CREATE TABLE public.tbl_pagos_arrendamientos (
    pago_arrendamiento_id integer NOT NULL,
    arrendamiento_id integer,
    pago_monto double precision NOT NULL,
    pago_fecha timestamp without time zone,
    pago_estado character(1)
);
 ,   DROP TABLE public.tbl_pagos_arrendamientos;
       public         heap    postgres    false            �           0    0    TABLE tbl_pagos_arrendamientos    COMMENT     =   COMMENT ON TABLE public.tbl_pagos_arrendamientos IS 'TRIAL';
          public          postgres    false    265            �           0    0 5   COLUMN tbl_pagos_arrendamientos.pago_arrendamiento_id    COMMENT     T   COMMENT ON COLUMN public.tbl_pagos_arrendamientos.pago_arrendamiento_id IS 'TRIAL';
          public          postgres    false    265            �           0    0 0   COLUMN tbl_pagos_arrendamientos.arrendamiento_id    COMMENT     O   COMMENT ON COLUMN public.tbl_pagos_arrendamientos.arrendamiento_id IS 'TRIAL';
          public          postgres    false    265            �           0    0 *   COLUMN tbl_pagos_arrendamientos.pago_monto    COMMENT     I   COMMENT ON COLUMN public.tbl_pagos_arrendamientos.pago_monto IS 'TRIAL';
          public          postgres    false    265            �           0    0 *   COLUMN tbl_pagos_arrendamientos.pago_fecha    COMMENT     I   COMMENT ON COLUMN public.tbl_pagos_arrendamientos.pago_fecha IS 'TRIAL';
          public          postgres    false    265            �           0    0 +   COLUMN tbl_pagos_arrendamientos.pago_estado    COMMENT     J   COMMENT ON COLUMN public.tbl_pagos_arrendamientos.pago_estado IS 'TRIAL';
          public          postgres    false    265            
           1259    42815 2   tbl_pagos_arrendamientos_pago_arrendamiento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_pagos_arrendamientos_pago_arrendamiento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 I   DROP SEQUENCE public.tbl_pagos_arrendamientos_pago_arrendamiento_id_seq;
       public          postgres    false    265            �           0    0 2   tbl_pagos_arrendamientos_pago_arrendamiento_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.tbl_pagos_arrendamientos_pago_arrendamiento_id_seq OWNED BY public.tbl_pagos_arrendamientos.pago_arrendamiento_id;
          public          postgres    false    266                       1259    42816    tbl_pagos_parquimetro    TABLE     �   CREATE TABLE public.tbl_pagos_parquimetro (
    pago_parquimetro_id integer NOT NULL,
    parquimetro_id integer,
    pago_monto numeric(10,2) NOT NULL,
    pago_fecha date
);
 )   DROP TABLE public.tbl_pagos_parquimetro;
       public         heap    postgres    false            �           0    0    TABLE tbl_pagos_parquimetro    COMMENT     :   COMMENT ON TABLE public.tbl_pagos_parquimetro IS 'TRIAL';
          public          postgres    false    267            �           0    0 0   COLUMN tbl_pagos_parquimetro.pago_parquimetro_id    COMMENT     O   COMMENT ON COLUMN public.tbl_pagos_parquimetro.pago_parquimetro_id IS 'TRIAL';
          public          postgres    false    267            �           0    0 +   COLUMN tbl_pagos_parquimetro.parquimetro_id    COMMENT     J   COMMENT ON COLUMN public.tbl_pagos_parquimetro.parquimetro_id IS 'TRIAL';
          public          postgres    false    267            �           0    0 '   COLUMN tbl_pagos_parquimetro.pago_monto    COMMENT     F   COMMENT ON COLUMN public.tbl_pagos_parquimetro.pago_monto IS 'TRIAL';
          public          postgres    false    267            �           0    0 '   COLUMN tbl_pagos_parquimetro.pago_fecha    COMMENT     F   COMMENT ON COLUMN public.tbl_pagos_parquimetro.pago_fecha IS 'TRIAL';
          public          postgres    false    267                       1259    42819 -   tbl_pagos_parquimetro_pago_parquimetro_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_pagos_parquimetro_pago_parquimetro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 D   DROP SEQUENCE public.tbl_pagos_parquimetro_pago_parquimetro_id_seq;
       public          postgres    false    267            �           0    0 -   tbl_pagos_parquimetro_pago_parquimetro_id_seq    SEQUENCE OWNED BY        ALTER SEQUENCE public.tbl_pagos_parquimetro_pago_parquimetro_id_seq OWNED BY public.tbl_pagos_parquimetro.pago_parquimetro_id;
          public          postgres    false    268                       1259    42820    tbl_parquimetros    TABLE     5  CREATE TABLE public.tbl_parquimetros (
    parquimetro_id integer NOT NULL,
    vehiculo_id integer,
    punto_servicio_id integer,
    parquimetro_hora_inicio timestamp without time zone NOT NULL,
    parquimetro_hora_fin timestamp without time zone NOT NULL,
    parquimetro_monto numeric(10,2) NOT NULL
);
 $   DROP TABLE public.tbl_parquimetros;
       public         heap    postgres    false            �           0    0    TABLE tbl_parquimetros    COMMENT     5   COMMENT ON TABLE public.tbl_parquimetros IS 'TRIAL';
          public          postgres    false    269            �           0    0 &   COLUMN tbl_parquimetros.parquimetro_id    COMMENT     E   COMMENT ON COLUMN public.tbl_parquimetros.parquimetro_id IS 'TRIAL';
          public          postgres    false    269            �           0    0 #   COLUMN tbl_parquimetros.vehiculo_id    COMMENT     B   COMMENT ON COLUMN public.tbl_parquimetros.vehiculo_id IS 'TRIAL';
          public          postgres    false    269            �           0    0 )   COLUMN tbl_parquimetros.punto_servicio_id    COMMENT     H   COMMENT ON COLUMN public.tbl_parquimetros.punto_servicio_id IS 'TRIAL';
          public          postgres    false    269            �           0    0 /   COLUMN tbl_parquimetros.parquimetro_hora_inicio    COMMENT     N   COMMENT ON COLUMN public.tbl_parquimetros.parquimetro_hora_inicio IS 'TRIAL';
          public          postgres    false    269            �           0    0 ,   COLUMN tbl_parquimetros.parquimetro_hora_fin    COMMENT     K   COMMENT ON COLUMN public.tbl_parquimetros.parquimetro_hora_fin IS 'TRIAL';
          public          postgres    false    269            �           0    0 )   COLUMN tbl_parquimetros.parquimetro_monto    COMMENT     H   COMMENT ON COLUMN public.tbl_parquimetros.parquimetro_monto IS 'TRIAL';
          public          postgres    false    269                       1259    42823 #   tbl_parquimetros_parquimetro_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_parquimetros_parquimetro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.tbl_parquimetros_parquimetro_id_seq;
       public          postgres    false    269            �           0    0 #   tbl_parquimetros_parquimetro_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.tbl_parquimetros_parquimetro_id_seq OWNED BY public.tbl_parquimetros.parquimetro_id;
          public          postgres    false    270                       1259    42824    tbl_prorroga_solicitudes    TABLE     q  CREATE TABLE public.tbl_prorroga_solicitudes (
    prorroga_id integer NOT NULL,
    arrendatario_id integer,
    prorroga_solicitud_solicitud_fecha timestamp without time zone,
    prorroga_solicitud_fecha_propuesta_pago timestamp without time zone NOT NULL,
    prorroga_solicitud_observaciones text,
    prorroga_solicitud_estado character(1) DEFAULT 'P'::bpchar
);
 ,   DROP TABLE public.tbl_prorroga_solicitudes;
       public         heap    postgres    false            �           0    0    TABLE tbl_prorroga_solicitudes    COMMENT     =   COMMENT ON TABLE public.tbl_prorroga_solicitudes IS 'TRIAL';
          public          postgres    false    271            �           0    0 +   COLUMN tbl_prorroga_solicitudes.prorroga_id    COMMENT     J   COMMENT ON COLUMN public.tbl_prorroga_solicitudes.prorroga_id IS 'TRIAL';
          public          postgres    false    271            �           0    0 /   COLUMN tbl_prorroga_solicitudes.arrendatario_id    COMMENT     N   COMMENT ON COLUMN public.tbl_prorroga_solicitudes.arrendatario_id IS 'TRIAL';
          public          postgres    false    271            �           0    0 B   COLUMN tbl_prorroga_solicitudes.prorroga_solicitud_solicitud_fecha    COMMENT     a   COMMENT ON COLUMN public.tbl_prorroga_solicitudes.prorroga_solicitud_solicitud_fecha IS 'TRIAL';
          public          postgres    false    271            �           0    0 G   COLUMN tbl_prorroga_solicitudes.prorroga_solicitud_fecha_propuesta_pago    COMMENT     f   COMMENT ON COLUMN public.tbl_prorroga_solicitudes.prorroga_solicitud_fecha_propuesta_pago IS 'TRIAL';
          public          postgres    false    271            �           0    0 @   COLUMN tbl_prorroga_solicitudes.prorroga_solicitud_observaciones    COMMENT     _   COMMENT ON COLUMN public.tbl_prorroga_solicitudes.prorroga_solicitud_observaciones IS 'TRIAL';
          public          postgres    false    271            �           0    0 9   COLUMN tbl_prorroga_solicitudes.prorroga_solicitud_estado    COMMENT     X   COMMENT ON COLUMN public.tbl_prorroga_solicitudes.prorroga_solicitud_estado IS 'TRIAL';
          public          postgres    false    271                       1259    42830 (   tbl_prorroga_solicitudes_prorroga_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_prorroga_solicitudes_prorroga_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.tbl_prorroga_solicitudes_prorroga_id_seq;
       public          postgres    false    271            �           0    0 (   tbl_prorroga_solicitudes_prorroga_id_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.tbl_prorroga_solicitudes_prorroga_id_seq OWNED BY public.tbl_prorroga_solicitudes.prorroga_id;
          public          postgres    false    272                       1259    42831    tbl_puntos_recaudacion    TABLE     �   CREATE TABLE public.tbl_puntos_recaudacion (
    punto_recaud_id integer NOT NULL,
    puntorecaud_nombre text NOT NULL,
    puntorecaud_estado character(1)
);
 *   DROP TABLE public.tbl_puntos_recaudacion;
       public         heap    postgres    false                        0    0    TABLE tbl_puntos_recaudacion    COMMENT     ;   COMMENT ON TABLE public.tbl_puntos_recaudacion IS 'TRIAL';
          public          postgres    false    273                       0    0 -   COLUMN tbl_puntos_recaudacion.punto_recaud_id    COMMENT     L   COMMENT ON COLUMN public.tbl_puntos_recaudacion.punto_recaud_id IS 'TRIAL';
          public          postgres    false    273                       0    0 0   COLUMN tbl_puntos_recaudacion.puntorecaud_nombre    COMMENT     O   COMMENT ON COLUMN public.tbl_puntos_recaudacion.puntorecaud_nombre IS 'TRIAL';
          public          postgres    false    273                       0    0 0   COLUMN tbl_puntos_recaudacion.puntorecaud_estado    COMMENT     O   COMMENT ON COLUMN public.tbl_puntos_recaudacion.puntorecaud_estado IS 'TRIAL';
          public          postgres    false    273                       1259    42836 *   tbl_puntos_recaudacion_punto_recaud_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_puntos_recaudacion_punto_recaud_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 A   DROP SEQUENCE public.tbl_puntos_recaudacion_punto_recaud_id_seq;
       public          postgres    false    273                       0    0 *   tbl_puntos_recaudacion_punto_recaud_id_seq    SEQUENCE OWNED BY     y   ALTER SEQUENCE public.tbl_puntos_recaudacion_punto_recaud_id_seq OWNED BY public.tbl_puntos_recaudacion.punto_recaud_id;
          public          postgres    false    274                       1259    42999    tbl_seg_menu    TABLE     �  CREATE TABLE public.tbl_seg_menu (
    me_id integer NOT NULL,
    me_descripcion character varying(100),
    me_url character varying(255),
    me_icono character varying(255),
    me_id_padre integer,
    me_vista smallint,
    me_orden integer,
    me_estado character varying(3) NOT NULL,
    me_usuario_creacion integer NOT NULL,
    me_fecha_creacion timestamp without time zone NOT NULL
);
     DROP TABLE public.tbl_seg_menu;
       public         heap    postgres    false                       0    0    TABLE tbl_seg_menu    COMMENT     1   COMMENT ON TABLE public.tbl_seg_menu IS 'TRIAL';
          public          postgres    false    282                       0    0    COLUMN tbl_seg_menu.me_id    COMMENT     8   COMMENT ON COLUMN public.tbl_seg_menu.me_id IS 'TRIAL';
          public          postgres    false    282                       0    0 "   COLUMN tbl_seg_menu.me_descripcion    COMMENT     A   COMMENT ON COLUMN public.tbl_seg_menu.me_descripcion IS 'TRIAL';
          public          postgres    false    282                       0    0    COLUMN tbl_seg_menu.me_url    COMMENT     9   COMMENT ON COLUMN public.tbl_seg_menu.me_url IS 'TRIAL';
          public          postgres    false    282            	           0    0    COLUMN tbl_seg_menu.me_icono    COMMENT     ;   COMMENT ON COLUMN public.tbl_seg_menu.me_icono IS 'TRIAL';
          public          postgres    false    282            
           0    0    COLUMN tbl_seg_menu.me_id_padre    COMMENT     >   COMMENT ON COLUMN public.tbl_seg_menu.me_id_padre IS 'TRIAL';
          public          postgres    false    282                       0    0    COLUMN tbl_seg_menu.me_vista    COMMENT     ;   COMMENT ON COLUMN public.tbl_seg_menu.me_vista IS 'TRIAL';
          public          postgres    false    282                       0    0    COLUMN tbl_seg_menu.me_orden    COMMENT     ;   COMMENT ON COLUMN public.tbl_seg_menu.me_orden IS 'TRIAL';
          public          postgres    false    282                       0    0    COLUMN tbl_seg_menu.me_estado    COMMENT     <   COMMENT ON COLUMN public.tbl_seg_menu.me_estado IS 'TRIAL';
          public          postgres    false    282                       0    0 '   COLUMN tbl_seg_menu.me_usuario_creacion    COMMENT     F   COMMENT ON COLUMN public.tbl_seg_menu.me_usuario_creacion IS 'TRIAL';
          public          postgres    false    282                       0    0 %   COLUMN tbl_seg_menu.me_fecha_creacion    COMMENT     D   COMMENT ON COLUMN public.tbl_seg_menu.me_fecha_creacion IS 'TRIAL';
          public          postgres    false    282                       1259    42998    tbl_seg_menu_me_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_seg_menu_me_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.tbl_seg_menu_me_id_seq;
       public          postgres    false    282                       0    0    tbl_seg_menu_me_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.tbl_seg_menu_me_id_seq OWNED BY public.tbl_seg_menu.me_id;
          public          postgres    false    281                       1259    42837    tbl_servicios    TABLE       CREATE TABLE public.tbl_servicios (
    servicio_id integer NOT NULL,
    servicio_abreviatura character varying(10) NOT NULL,
    servicio_descripcion character varying(100) NOT NULL,
    servicio_precio_base numeric(10,2) NOT NULL,
    servicio_estado character(1)
);
 !   DROP TABLE public.tbl_servicios;
       public         heap    postgres    false                       0    0    TABLE tbl_servicios    COMMENT     2   COMMENT ON TABLE public.tbl_servicios IS 'TRIAL';
          public          postgres    false    275                       0    0     COLUMN tbl_servicios.servicio_id    COMMENT     ?   COMMENT ON COLUMN public.tbl_servicios.servicio_id IS 'TRIAL';
          public          postgres    false    275                       0    0 )   COLUMN tbl_servicios.servicio_abreviatura    COMMENT     H   COMMENT ON COLUMN public.tbl_servicios.servicio_abreviatura IS 'TRIAL';
          public          postgres    false    275                       0    0 )   COLUMN tbl_servicios.servicio_descripcion    COMMENT     H   COMMENT ON COLUMN public.tbl_servicios.servicio_descripcion IS 'TRIAL';
          public          postgres    false    275                       0    0 )   COLUMN tbl_servicios.servicio_precio_base    COMMENT     H   COMMENT ON COLUMN public.tbl_servicios.servicio_precio_base IS 'TRIAL';
          public          postgres    false    275                       0    0 $   COLUMN tbl_servicios.servicio_estado    COMMENT     C   COMMENT ON COLUMN public.tbl_servicios.servicio_estado IS 'TRIAL';
          public          postgres    false    275                       1259    42840    tbl_servicios_servicio_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_servicios_servicio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.tbl_servicios_servicio_id_seq;
       public          postgres    false    275                       0    0    tbl_servicios_servicio_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.tbl_servicios_servicio_id_seq OWNED BY public.tbl_servicios.servicio_id;
          public          postgres    false    276                       1259    42841    tbl_vehiculos    TABLE     �   CREATE TABLE public.tbl_vehiculos (
    vehiculo_id integer NOT NULL,
    vehiculo_nombre character varying(100) NOT NULL,
    vehiculo_celular character varying(15) NOT NULL,
    vehiculo_placa character varying(15) NOT NULL
);
 !   DROP TABLE public.tbl_vehiculos;
       public         heap    postgres    false                       0    0    TABLE tbl_vehiculos    COMMENT     2   COMMENT ON TABLE public.tbl_vehiculos IS 'TRIAL';
          public          postgres    false    277                       0    0     COLUMN tbl_vehiculos.vehiculo_id    COMMENT     ?   COMMENT ON COLUMN public.tbl_vehiculos.vehiculo_id IS 'TRIAL';
          public          postgres    false    277                       0    0 $   COLUMN tbl_vehiculos.vehiculo_nombre    COMMENT     C   COMMENT ON COLUMN public.tbl_vehiculos.vehiculo_nombre IS 'TRIAL';
          public          postgres    false    277                       0    0 %   COLUMN tbl_vehiculos.vehiculo_celular    COMMENT     D   COMMENT ON COLUMN public.tbl_vehiculos.vehiculo_celular IS 'TRIAL';
          public          postgres    false    277                       0    0 #   COLUMN tbl_vehiculos.vehiculo_placa    COMMENT     B   COMMENT ON COLUMN public.tbl_vehiculos.vehiculo_placa IS 'TRIAL';
          public          postgres    false    277                       1259    42844    tbl_vehiculos_vehiculo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_vehiculos_vehiculo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.tbl_vehiculos_vehiculo_id_seq;
       public          postgres    false    277                       0    0    tbl_vehiculos_vehiculo_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.tbl_vehiculos_vehiculo_id_seq OWNED BY public.tbl_vehiculos.vehiculo_id;
          public          postgres    false    278                       1259    42845    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    photo character varying(255),
    role_id integer,
    account_status character varying(50) DEFAULT 'Active'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users;
       public         heap    postgres    false                       1259    42853    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    279                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    280            �           2604    42854    actaentregacab ae_actaid    DEFAULT     �   ALTER TABLE ONLY public.actaentregacab ALTER COLUMN ae_actaid SET DEFAULT nextval('public.actaentregacab_ae_actaid_seq'::regclass);
 G   ALTER TABLE public.actaentregacab ALTER COLUMN ae_actaid DROP DEFAULT;
       public          postgres    false    216    215                        2604    42855    actaentregadet aed_actaid    DEFAULT     �   ALTER TABLE ONLY public.actaentregadet ALTER COLUMN aed_actaid SET DEFAULT nextval('public.actaentregadet_aed_actaid_seq'::regclass);
 H   ALTER TABLE public.actaentregadet ALTER COLUMN aed_actaid DROP DEFAULT;
       public          postgres    false    218    217                       2604    42856     arqueorecaudacioncab arqueorecid    DEFAULT     �   ALTER TABLE ONLY public.arqueorecaudacioncab ALTER COLUMN arqueorecid SET DEFAULT nextval('public.arqueorecaudacioncab_arqueorecid_seq'::regclass);
 O   ALTER TABLE public.arqueorecaudacioncab ALTER COLUMN arqueorecid DROP DEFAULT;
       public          postgres    false    222    221                       2604    42857 #   arqueorecaudaciondet arqueorecdetid    DEFAULT     �   ALTER TABLE ONLY public.arqueorecaudaciondet ALTER COLUMN arqueorecdetid SET DEFAULT nextval('public.arqueorecaudaciondet_arqueorecdetid_seq'::regclass);
 R   ALTER TABLE public.arqueorecaudaciondet ALTER COLUMN arqueorecdetid DROP DEFAULT;
       public          postgres    false    224    223                       2604    42858 	   audits id    DEFAULT     f   ALTER TABLE ONLY public.audits ALTER COLUMN id SET DEFAULT nextval('public.audits_id_seq'::regclass);
 8   ALTER TABLE public.audits ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225                       2604    42859    facturastmp id    DEFAULT     p   ALTER TABLE ONLY public.facturastmp ALTER COLUMN id SET DEFAULT nextval('public.facturastmp_id_seq'::regclass);
 =   ALTER TABLE public.facturastmp ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227                       2604    42860    failed_jobs id    DEFAULT     p   ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);
 =   ALTER TABLE public.failed_jobs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229            	           2604    42861    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231            
           2604    42862    oauth_clients id    DEFAULT     t   ALTER TABLE ONLY public.oauth_clients ALTER COLUMN id SET DEFAULT nextval('public.oauth_clients_id_seq'::regclass);
 ?   ALTER TABLE public.oauth_clients ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    235                       2604    42863     oauth_personal_access_clients id    DEFAULT     �   ALTER TABLE ONLY public.oauth_personal_access_clients ALTER COLUMN id SET DEFAULT nextval('public.oauth_personal_access_clients_id_seq'::regclass);
 O   ALTER TABLE public.oauth_personal_access_clients ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    237                       2604    42864    personal_access_tokens id    DEFAULT     �   ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);
 H   ALTER TABLE public.personal_access_tokens ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    242    241                       2604    42865    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243                       2604    42866 #   tbl_arrendamientos arrendamiento_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_arrendamientos ALTER COLUMN arrendamiento_id SET DEFAULT nextval('public.tbl_arrendamientos_arrendamiento_id_seq'::regclass);
 R   ALTER TABLE public.tbl_arrendamientos ALTER COLUMN arrendamiento_id DROP DEFAULT;
       public          postgres    false    246    245                       2604    42867 *   tbl_arrendamientos_documentos documento_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_arrendamientos_documentos ALTER COLUMN documento_id SET DEFAULT nextval('public.tbl_arrendamientos_documentos_documento_id_seq'::regclass);
 Y   ALTER TABLE public.tbl_arrendamientos_documentos ALTER COLUMN documento_id DROP DEFAULT;
       public          postgres    false    248    247                       2604    42868    tbl_depositos deposito_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_depositos ALTER COLUMN deposito_id SET DEFAULT nextval('public.tbl_depositos_deposito_id_seq'::regclass);
 H   ALTER TABLE public.tbl_depositos ALTER COLUMN deposito_id DROP DEFAULT;
       public          postgres    false    250    249                       2604    42869    tbl_edificio edificio_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_edificio ALTER COLUMN edificio_id SET DEFAULT nextval('public.tbl_edificio_edificio_id_seq'::regclass);
 G   ALTER TABLE public.tbl_edificio ALTER COLUMN edificio_id DROP DEFAULT;
       public          postgres    false    254    251                       2604    42870 !   tbl_edificio_ambiente ambiente_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_edificio_ambiente ALTER COLUMN ambiente_id SET DEFAULT nextval('public.tbl_edificio_ambiente_ambiente_id_seq'::regclass);
 P   ALTER TABLE public.tbl_edificio_ambiente ALTER COLUMN ambiente_id DROP DEFAULT;
       public          postgres    false    253    252                       2604    42871    tbl_edificio_nivel nivel_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_edificio_nivel ALTER COLUMN nivel_id SET DEFAULT nextval('public.tbl_edificio_nivel_nivel_id_seq'::regclass);
 J   ALTER TABLE public.tbl_edificio_nivel ALTER COLUMN nivel_id DROP DEFAULT;
       public          postgres    false    256    255                       2604    42872    tbl_edificio_seccion seccion_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_edificio_seccion ALTER COLUMN seccion_id SET DEFAULT nextval('public.tbl_edificio_seccion_seccion_id_seq'::regclass);
 N   ALTER TABLE public.tbl_edificio_seccion ALTER COLUMN seccion_id DROP DEFAULT;
       public          postgres    false    258    257                       2604    42873    tbl_factura_detalle detalle_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_factura_detalle ALTER COLUMN detalle_id SET DEFAULT nextval('public.tbl_factura_detalle_detalle_id_seq'::regclass);
 M   ALTER TABLE public.tbl_factura_detalle ALTER COLUMN detalle_id DROP DEFAULT;
       public          postgres    false    260    259                       2604    42874    tbl_facturas factura_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_facturas ALTER COLUMN factura_id SET DEFAULT nextval('public.tbl_facturas_factura_id_seq'::regclass);
 F   ALTER TABLE public.tbl_facturas ALTER COLUMN factura_id DROP DEFAULT;
       public          postgres    false    262    261                       2604    42875    tbl_operadores operador_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_operadores ALTER COLUMN operador_id SET DEFAULT nextval('public.tbl_operadores_operador_id_seq'::regclass);
 I   ALTER TABLE public.tbl_operadores ALTER COLUMN operador_id DROP DEFAULT;
       public          postgres    false    264    263                       2604    42876 .   tbl_pagos_arrendamientos pago_arrendamiento_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_pagos_arrendamientos ALTER COLUMN pago_arrendamiento_id SET DEFAULT nextval('public.tbl_pagos_arrendamientos_pago_arrendamiento_id_seq'::regclass);
 ]   ALTER TABLE public.tbl_pagos_arrendamientos ALTER COLUMN pago_arrendamiento_id DROP DEFAULT;
       public          postgres    false    266    265                       2604    42877 )   tbl_pagos_parquimetro pago_parquimetro_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_pagos_parquimetro ALTER COLUMN pago_parquimetro_id SET DEFAULT nextval('public.tbl_pagos_parquimetro_pago_parquimetro_id_seq'::regclass);
 X   ALTER TABLE public.tbl_pagos_parquimetro ALTER COLUMN pago_parquimetro_id DROP DEFAULT;
       public          postgres    false    268    267                       2604    42878    tbl_parquimetros parquimetro_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_parquimetros ALTER COLUMN parquimetro_id SET DEFAULT nextval('public.tbl_parquimetros_parquimetro_id_seq'::regclass);
 N   ALTER TABLE public.tbl_parquimetros ALTER COLUMN parquimetro_id DROP DEFAULT;
       public          postgres    false    270    269                        2604    42879 $   tbl_prorroga_solicitudes prorroga_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_prorroga_solicitudes ALTER COLUMN prorroga_id SET DEFAULT nextval('public.tbl_prorroga_solicitudes_prorroga_id_seq'::regclass);
 S   ALTER TABLE public.tbl_prorroga_solicitudes ALTER COLUMN prorroga_id DROP DEFAULT;
       public          postgres    false    272    271            "           2604    42880 &   tbl_puntos_recaudacion punto_recaud_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_puntos_recaudacion ALTER COLUMN punto_recaud_id SET DEFAULT nextval('public.tbl_puntos_recaudacion_punto_recaud_id_seq'::regclass);
 U   ALTER TABLE public.tbl_puntos_recaudacion ALTER COLUMN punto_recaud_id DROP DEFAULT;
       public          postgres    false    274    273            )           2604    43002    tbl_seg_menu me_id    DEFAULT     x   ALTER TABLE ONLY public.tbl_seg_menu ALTER COLUMN me_id SET DEFAULT nextval('public.tbl_seg_menu_me_id_seq'::regclass);
 A   ALTER TABLE public.tbl_seg_menu ALTER COLUMN me_id DROP DEFAULT;
       public          postgres    false    282    281    282            #           2604    42881    tbl_servicios servicio_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_servicios ALTER COLUMN servicio_id SET DEFAULT nextval('public.tbl_servicios_servicio_id_seq'::regclass);
 H   ALTER TABLE public.tbl_servicios ALTER COLUMN servicio_id DROP DEFAULT;
       public          postgres    false    276    275            $           2604    42882    tbl_vehiculos vehiculo_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_vehiculos ALTER COLUMN vehiculo_id SET DEFAULT nextval('public.tbl_vehiculos_vehiculo_id_seq'::regclass);
 H   ALTER TABLE public.tbl_vehiculos ALTER COLUMN vehiculo_id DROP DEFAULT;
       public          postgres    false    278    277            %           2604    42883    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    280    279            $          0    42656    actaentregacab 
   TABLE DATA           Y  COPY public.actaentregacab (ae_actaid, ae_correlativo, punto_recaud_id, ae_fecha, ae_grupo, ae_operador1erturno, ae_operador2doturno, ae_cambiobs, ae_cajachicabs, ae_llaves, ae_fechero, ae_tampo, ae_candados, ae_observacion, ae_recaudaciontotalbs, ae_usuario, ae_usuarioarqueo, ae_fecharegistro, ae_fechaarqueo, ae_estado, arqueoid) FROM stdin;
    public          postgres    false    215   ��      &          0    42662    actaentregadet 
   TABLE DATA           �   COPY public.actaentregadet (aed_actaid, ae_actaid, servicio_id, aed_desdenumero, aed_hastanumero, aed_vendidohasta, aed_cantidad, aed_importebs, aed_estado, aed_preciounitario) FROM stdin;
    public          postgres    false    217   ��      (          0    42666 	   arqueocab 
   TABLE DATA           4  COPY public.arqueocab (arqueoid, arqueonumero, arqueofecha, arqueoturno, arqueohorainicio, arqueohorafin, arqueosupervisor, arqueorealizadopor, arqueorevisadopor, arqueorecaudaciontotal, arqueodiferencia, arqueoobservacion, arqueoestado, arqueofecharegistro, arqueousuario, arqueodiferenciatipo) FROM stdin;
    public          postgres    false    219   �      )          0    42672    arqueodetcortes 
   TABLE DATA           $  COPY public.arqueodetcortes (arqueodetcorteid, arqueoid, arqueocorte200_00, arqueocorte100_00, arqueocorte050_00, arqueocorte020_00, arqueocorte010_00, arqueocorte005_00, arqueocorte002_00, arqueocorte001_00, arqueocorte000_50, arqueocorte000_20, arqueocorte000_10, arqueoestado) FROM stdin;
    public          postgres    false    220   �      *          0    42675    arqueorecaudacioncab 
   TABLE DATA           �   COPY public.arqueorecaudacioncab (arqueorecid, arqueocorrelativo, arqueofecha, arqueoturno, punto_recaud_id, arqueonombreoperador, arqueousuario, arqueofecharegistro, arqueoid, arqueoestado, arqueonombresupervisor) FROM stdin;
    public          postgres    false    221   ��      ,          0    42681    arqueorecaudaciondet 
   TABLE DATA           �   COPY public.arqueorecaudaciondet (arqueorecdetid, arqueorecid, servicio_id, arqueodetcantidad, arqueodettarifabs, arqueodetimportebs, arqueoestado) FROM stdin;
    public          postgres    false    223   
�      .          0    42685    audits 
   TABLE DATA           �   COPY public.audits (id, user_type, user_id, event, auditable_type, auditable_id, old_values, new_values, url, ip_address, user_agent, tags, created_at, updated_at) FROM stdin;
    public          postgres    false    225   I�      0          0    42691    facturastmp 
   TABLE DATA           �  COPY public.facturastmp (id, numero_registro, fecha_factura, numero_factura, codigo_autorizacion, nit_ci, complemento, nombre_razon_social, importe_total_venta, importe_ice, importe_iehd, importe_ipj, tasas, otros_no_sujetos_iva, exportaciones_operaciones_exentas, ventas_gravadas_tasa_cero, subtotal, descuentos_bonificaciones_rebajas, importe_gift_card, importe_base_debito_fiscal, debito_fiscal, estado, codigo_control, tipo_venta, derecho_credito_fiscal, estado_consolidacion, fecha_registro) FROM stdin;
    public          postgres    false    227   f�      2          0    42698    failed_jobs 
   TABLE DATA           a   COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
    public          postgres    false    229   ��      4          0    42705 
   migrations 
   TABLE DATA           :   COPY public.migrations (id, migration, batch) FROM stdin;
    public          postgres    false    231   ��      6          0    42709    oauth_access_tokens 
   TABLE DATA           �   COPY public.oauth_access_tokens (id, user_id, client_id, name, scopes, revoked, created_at, updated_at, expires_at) FROM stdin;
    public          postgres    false    233   Y�      7          0    42714    oauth_auth_codes 
   TABLE DATA           _   COPY public.oauth_auth_codes (id, user_id, client_id, scopes, revoked, expires_at) FROM stdin;
    public          postgres    false    234   f      8          0    42719    oauth_clients 
   TABLE DATA           �   COPY public.oauth_clients (id, user_id, name, secret, provider, redirect, personal_access_client, password_client, revoked, created_at, updated_at) FROM stdin;
    public          postgres    false    235   �      :          0    42725    oauth_personal_access_clients 
   TABLE DATA           ^   COPY public.oauth_personal_access_clients (id, client_id, created_at, updated_at) FROM stdin;
    public          postgres    false    237         <          0    42729    oauth_refresh_tokens 
   TABLE DATA           X   COPY public.oauth_refresh_tokens (id, access_token_id, revoked, expires_at) FROM stdin;
    public          postgres    false    239   ^      =          0    42732    password_reset_tokens 
   TABLE DATA           I   COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
    public          postgres    false    240   {      >          0    42737    personal_access_tokens 
   TABLE DATA           �   COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
    public          postgres    false    241   �      @          0    42743    roles 
   TABLE DATA           @   COPY public.roles (id, role_name, role_description) FROM stdin;
    public          postgres    false    243   �      B          0    42749    tbl_arrendamientos 
   TABLE DATA           �  COPY public.tbl_arrendamientos (arrendamiento_id, ambiente_id, num_contrato, operador_nombre, arrendatario_nombre, arrendatario_apellido_paterno, arrendatario_apellido_materno, arrendatario_ci, arrendatario_nombre_comercial, arrendatario_telefono, arrendatario_celular, ambiente_codigo, arrendamiento_fecha_inicio, arrendamiento_fecha_fin, arrendamiento_canon, arrendamiento_funcion, arrendamiento_forma_pago, arrendamiento_estado, arrendamiento_fecha) FROM stdin;
    public          postgres    false    245         D          0    42756    tbl_arrendamientos_documentos 
   TABLE DATA           �   COPY public.tbl_arrendamientos_documentos (documento_id, arrendamiento_id, documento_tipo, documento_nombre, documento_url, documento_descripcion, fecha_subida, documento_estado) FROM stdin;
    public          postgres    false    247   /      F          0    42762    tbl_depositos 
   TABLE DATA           �   COPY public.tbl_depositos (deposito_id, codigo, fecha_recaudacion, fecha_deposito_1, numero_deposito_1, efectivo_1, fecha_deposito_2, numero_deposito_2, efectivo_2, total_efectivo, depositantes, observacion) FROM stdin;
    public          postgres    false    249   L      H          0    42768    tbl_edificio 
   TABLE DATA           X   COPY public.tbl_edificio (edificio_id, edificio_nombre, edificio_direccion) FROM stdin;
    public          postgres    false    251   i      I          0    42773    tbl_edificio_ambiente 
   TABLE DATA           �   COPY public.tbl_edificio_ambiente (ambiente_id, edificio_id, nivel_id, seccion_id, ambiente_nombre, ambiente_tamano, ambiente_tipo_uso, ambiente_precio_alquiler, ambiente_codigo_interno, ambiente_superficie_m2, ambiente_estado) FROM stdin;
    public          postgres    false    252   �      L          0    42780    tbl_edificio_nivel 
   TABLE DATA           R   COPY public.tbl_edificio_nivel (nivel_id, nivel_nombre, nivel_estado) FROM stdin;
    public          postgres    false    255   �      N          0    42786    tbl_edificio_seccion 
   TABLE DATA           Z   COPY public.tbl_edificio_seccion (seccion_id, seccion_nombre, seccion_estado) FROM stdin;
    public          postgres    false    257   �      P          0    42792    tbl_factura_detalle 
   TABLE DATA             COPY public.tbl_factura_detalle (detalle_id, factura_id, arrendamiento_id, fact_detalle_periodo_pago, fact_detalle_canon_alquiler, fact_detalle_morosidad_penalidad, fact_detalle_dias_morosidad, fact_detalle_total_mora, fact_detalle_importe_bs, fact_detalle_observaciones) FROM stdin;
    public          postgres    false    259   �      R          0    42801    tbl_facturas 
   TABLE DATA           �   COPY public.tbl_facturas (factura_id, arrendatario_nombre, arrendatario_ci, factura_numero, factura_fecha_emision, factura_total, factura_fecha_pago, factura_estado) FROM stdin;
    public          postgres    false    261   �      T          0    42808    tbl_operadores 
   TABLE DATA           N   COPY public.tbl_operadores (operador_id, per_id, operador_estado) FROM stdin;
    public          postgres    false    263         V          0    42812    tbl_pagos_arrendamientos 
   TABLE DATA           �   COPY public.tbl_pagos_arrendamientos (pago_arrendamiento_id, arrendamiento_id, pago_monto, pago_fecha, pago_estado) FROM stdin;
    public          postgres    false    265   \      X          0    42816    tbl_pagos_parquimetro 
   TABLE DATA           l   COPY public.tbl_pagos_parquimetro (pago_parquimetro_id, parquimetro_id, pago_monto, pago_fecha) FROM stdin;
    public          postgres    false    267   y      Z          0    42820    tbl_parquimetros 
   TABLE DATA           �   COPY public.tbl_parquimetros (parquimetro_id, vehiculo_id, punto_servicio_id, parquimetro_hora_inicio, parquimetro_hora_fin, parquimetro_monto) FROM stdin;
    public          postgres    false    269   �      \          0    42824    tbl_prorroga_solicitudes 
   TABLE DATA           �   COPY public.tbl_prorroga_solicitudes (prorroga_id, arrendatario_id, prorroga_solicitud_solicitud_fecha, prorroga_solicitud_fecha_propuesta_pago, prorroga_solicitud_observaciones, prorroga_solicitud_estado) FROM stdin;
    public          postgres    false    271   �      ^          0    42831    tbl_puntos_recaudacion 
   TABLE DATA           i   COPY public.tbl_puntos_recaudacion (punto_recaud_id, puntorecaud_nombre, puntorecaud_estado) FROM stdin;
    public          postgres    false    273   �      g          0    42999    tbl_seg_menu 
   TABLE DATA           �   COPY public.tbl_seg_menu (me_id, me_descripcion, me_url, me_icono, me_id_padre, me_vista, me_orden, me_estado, me_usuario_creacion, me_fecha_creacion) FROM stdin;
    public          postgres    false    282   �	      `          0    42837    tbl_servicios 
   TABLE DATA           �   COPY public.tbl_servicios (servicio_id, servicio_abreviatura, servicio_descripcion, servicio_precio_base, servicio_estado) FROM stdin;
    public          postgres    false    275   �	      b          0    42841    tbl_vehiculos 
   TABLE DATA           g   COPY public.tbl_vehiculos (vehiculo_id, vehiculo_nombre, vehiculo_celular, vehiculo_placa) FROM stdin;
    public          postgres    false    277   �
      d          0    42845    users 
   TABLE DATA           �   COPY public.users (id, username, email, password, firstname, lastname, photo, role_id, account_status, created_at, updated_at) FROM stdin;
    public          postgres    false    279   �
                 0    0    actaentregacab_ae_actaid_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.actaentregacab_ae_actaid_seq', 1, true);
          public          postgres    false    216                        0    0    actaentregadet_aed_actaid_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.actaentregadet_aed_actaid_seq', 1, true);
          public          postgres    false    218            !           0    0 $   arqueorecaudacioncab_arqueorecid_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.arqueorecaudacioncab_arqueorecid_seq', 5, true);
          public          postgres    false    222            "           0    0 '   arqueorecaudaciondet_arqueorecdetid_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.arqueorecaudaciondet_arqueorecdetid_seq', 4, true);
          public          postgres    false    224            #           0    0    audits_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.audits_id_seq', 1, false);
          public          postgres    false    226            $           0    0    facturastmp_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.facturastmp_id_seq', 1, false);
          public          postgres    false    228            %           0    0    failed_jobs_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);
          public          postgres    false    230            &           0    0    migrations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.migrations_id_seq', 8, true);
          public          postgres    false    232            '           0    0    oauth_clients_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.oauth_clients_id_seq', 6, true);
          public          postgres    false    236            (           0    0 $   oauth_personal_access_clients_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.oauth_personal_access_clients_id_seq', 3, true);
          public          postgres    false    238            )           0    0    personal_access_tokens_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 1, false);
          public          postgres    false    242            *           0    0    roles_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.roles_id_seq', 2, true);
          public          postgres    false    244            +           0    0 '   tbl_arrendamientos_arrendamiento_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public.tbl_arrendamientos_arrendamiento_id_seq', 1, false);
          public          postgres    false    246            ,           0    0 .   tbl_arrendamientos_documentos_documento_id_seq    SEQUENCE SET     ]   SELECT pg_catalog.setval('public.tbl_arrendamientos_documentos_documento_id_seq', 1, false);
          public          postgres    false    248            -           0    0    tbl_depositos_deposito_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.tbl_depositos_deposito_id_seq', 1, false);
          public          postgres    false    250            .           0    0 %   tbl_edificio_ambiente_ambiente_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.tbl_edificio_ambiente_ambiente_id_seq', 1, false);
          public          postgres    false    253            /           0    0    tbl_edificio_edificio_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.tbl_edificio_edificio_id_seq', 1, false);
          public          postgres    false    254            0           0    0    tbl_edificio_nivel_nivel_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.tbl_edificio_nivel_nivel_id_seq', 1, false);
          public          postgres    false    256            1           0    0 #   tbl_edificio_seccion_seccion_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.tbl_edificio_seccion_seccion_id_seq', 1, false);
          public          postgres    false    258            2           0    0 "   tbl_factura_detalle_detalle_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.tbl_factura_detalle_detalle_id_seq', 1, false);
          public          postgres    false    260            3           0    0    tbl_facturas_factura_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.tbl_facturas_factura_id_seq', 1, false);
          public          postgres    false    262            4           0    0    tbl_operadores_operador_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.tbl_operadores_operador_id_seq', 10, true);
          public          postgres    false    264            5           0    0 2   tbl_pagos_arrendamientos_pago_arrendamiento_id_seq    SEQUENCE SET     a   SELECT pg_catalog.setval('public.tbl_pagos_arrendamientos_pago_arrendamiento_id_seq', 1, false);
          public          postgres    false    266            6           0    0 -   tbl_pagos_parquimetro_pago_parquimetro_id_seq    SEQUENCE SET     \   SELECT pg_catalog.setval('public.tbl_pagos_parquimetro_pago_parquimetro_id_seq', 1, false);
          public          postgres    false    268            7           0    0 #   tbl_parquimetros_parquimetro_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.tbl_parquimetros_parquimetro_id_seq', 1, false);
          public          postgres    false    270            8           0    0 (   tbl_prorroga_solicitudes_prorroga_id_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.tbl_prorroga_solicitudes_prorroga_id_seq', 1, false);
          public          postgres    false    272            9           0    0 *   tbl_puntos_recaudacion_punto_recaud_id_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public.tbl_puntos_recaudacion_punto_recaud_id_seq', 15, true);
          public          postgres    false    274            :           0    0    tbl_seg_menu_me_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.tbl_seg_menu_me_id_seq', 1, false);
          public          postgres    false    281            ;           0    0    tbl_servicios_servicio_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.tbl_servicios_servicio_id_seq', 10, true);
          public          postgres    false    276            <           0    0    tbl_vehiculos_vehiculo_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.tbl_vehiculos_vehiculo_id_seq', 1, false);
          public          postgres    false    278            =           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    280            +           2606    42885 "   actaentregacab actaentregacab_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.actaentregacab
    ADD CONSTRAINT actaentregacab_pkey PRIMARY KEY (ae_actaid);
 L   ALTER TABLE ONLY public.actaentregacab DROP CONSTRAINT actaentregacab_pkey;
       public            postgres    false    215            -           2606    42887 "   actaentregadet actaentregadet_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.actaentregadet
    ADD CONSTRAINT actaentregadet_pkey PRIMARY KEY (aed_actaid);
 L   ALTER TABLE ONLY public.actaentregadet DROP CONSTRAINT actaentregadet_pkey;
       public            postgres    false    217            4           2606    42889 .   arqueorecaudacioncab arqueorecaudacioncab_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.arqueorecaudacioncab
    ADD CONSTRAINT arqueorecaudacioncab_pkey PRIMARY KEY (arqueorecid);
 X   ALTER TABLE ONLY public.arqueorecaudacioncab DROP CONSTRAINT arqueorecaudacioncab_pkey;
       public            postgres    false    221            6           2606    42891 .   arqueorecaudaciondet arqueorecaudaciondet_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.arqueorecaudaciondet
    ADD CONSTRAINT arqueorecaudaciondet_pkey PRIMARY KEY (arqueorecdetid);
 X   ALTER TABLE ONLY public.arqueorecaudaciondet DROP CONSTRAINT arqueorecaudaciondet_pkey;
       public            postgres    false    223            9           2606    42893    audits audits_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.audits
    ADD CONSTRAINT audits_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.audits DROP CONSTRAINT audits_pkey;
       public            postgres    false    225            <           2606    42895    facturastmp facturastmp_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.facturastmp
    ADD CONSTRAINT facturastmp_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.facturastmp DROP CONSTRAINT facturastmp_pkey;
       public            postgres    false    227            >           2606    42897    failed_jobs failed_jobs_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_pkey;
       public            postgres    false    229            @           2606    42899 #   failed_jobs failed_jobs_uuid_unique 
   CONSTRAINT     ^   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);
 M   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_uuid_unique;
       public            postgres    false    229            B           2606    42901    migrations migrations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.migrations DROP CONSTRAINT migrations_pkey;
       public            postgres    false    231            D           2606    42903 ,   oauth_access_tokens oauth_access_tokens_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.oauth_access_tokens
    ADD CONSTRAINT oauth_access_tokens_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.oauth_access_tokens DROP CONSTRAINT oauth_access_tokens_pkey;
       public            postgres    false    233            G           2606    42905 &   oauth_auth_codes oauth_auth_codes_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.oauth_auth_codes
    ADD CONSTRAINT oauth_auth_codes_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.oauth_auth_codes DROP CONSTRAINT oauth_auth_codes_pkey;
       public            postgres    false    234            J           2606    42907     oauth_clients oauth_clients_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.oauth_clients DROP CONSTRAINT oauth_clients_pkey;
       public            postgres    false    235            M           2606    42909 @   oauth_personal_access_clients oauth_personal_access_clients_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.oauth_personal_access_clients
    ADD CONSTRAINT oauth_personal_access_clients_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.oauth_personal_access_clients DROP CONSTRAINT oauth_personal_access_clients_pkey;
       public            postgres    false    237            P           2606    42911 .   oauth_refresh_tokens oauth_refresh_tokens_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.oauth_refresh_tokens
    ADD CONSTRAINT oauth_refresh_tokens_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.oauth_refresh_tokens DROP CONSTRAINT oauth_refresh_tokens_pkey;
       public            postgres    false    239            R           2606    42913 0   password_reset_tokens password_reset_tokens_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);
 Z   ALTER TABLE ONLY public.password_reset_tokens DROP CONSTRAINT password_reset_tokens_pkey;
       public            postgres    false    240            T           2606    42915 2   personal_access_tokens personal_access_tokens_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_pkey;
       public            postgres    false    241            V           2606    42917 :   personal_access_tokens personal_access_tokens_token_unique 
   CONSTRAINT     v   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);
 d   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_token_unique;
       public            postgres    false    241            /           2606    42919    arqueocab pk_arqueocab 
   CONSTRAINT     Z   ALTER TABLE ONLY public.arqueocab
    ADD CONSTRAINT pk_arqueocab PRIMARY KEY (arqueoid);
 @   ALTER TABLE ONLY public.arqueocab DROP CONSTRAINT pk_arqueocab;
       public            postgres    false    219            2           2606    42921 "   arqueodetcortes pk_arqueodetcortes 
   CONSTRAINT     n   ALTER TABLE ONLY public.arqueodetcortes
    ADD CONSTRAINT pk_arqueodetcortes PRIMARY KEY (arqueodetcorteid);
 L   ALTER TABLE ONLY public.arqueodetcortes DROP CONSTRAINT pk_arqueodetcortes;
       public            postgres    false    220            ^           2606    42923 (   tbl_arrendamientos pk_tbl_arrendamientos 
   CONSTRAINT     t   ALTER TABLE ONLY public.tbl_arrendamientos
    ADD CONSTRAINT pk_tbl_arrendamientos PRIMARY KEY (arrendamiento_id);
 R   ALTER TABLE ONLY public.tbl_arrendamientos DROP CONSTRAINT pk_tbl_arrendamientos;
       public            postgres    false    245            a           2606    42925 >   tbl_arrendamientos_documentos pk_tbl_arrendamientos_documentos 
   CONSTRAINT     �   ALTER TABLE ONLY public.tbl_arrendamientos_documentos
    ADD CONSTRAINT pk_tbl_arrendamientos_documentos PRIMARY KEY (documento_id);
 h   ALTER TABLE ONLY public.tbl_arrendamientos_documentos DROP CONSTRAINT pk_tbl_arrendamientos_documentos;
       public            postgres    false    247            e           2606    42927    tbl_edificio pk_tbl_edificio 
   CONSTRAINT     c   ALTER TABLE ONLY public.tbl_edificio
    ADD CONSTRAINT pk_tbl_edificio PRIMARY KEY (edificio_id);
 F   ALTER TABLE ONLY public.tbl_edificio DROP CONSTRAINT pk_tbl_edificio;
       public            postgres    false    251            i           2606    42929 (   tbl_edificio_nivel pk_tbl_edificio_nivel 
   CONSTRAINT     l   ALTER TABLE ONLY public.tbl_edificio_nivel
    ADD CONSTRAINT pk_tbl_edificio_nivel PRIMARY KEY (nivel_id);
 R   ALTER TABLE ONLY public.tbl_edificio_nivel DROP CONSTRAINT pk_tbl_edificio_nivel;
       public            postgres    false    255            k           2606    42931 ,   tbl_edificio_seccion pk_tbl_edificio_seccion 
   CONSTRAINT     r   ALTER TABLE ONLY public.tbl_edificio_seccion
    ADD CONSTRAINT pk_tbl_edificio_seccion PRIMARY KEY (seccion_id);
 V   ALTER TABLE ONLY public.tbl_edificio_seccion DROP CONSTRAINT pk_tbl_edificio_seccion;
       public            postgres    false    257            o           2606    42933 *   tbl_factura_detalle pk_tbl_factura_detalle 
   CONSTRAINT     p   ALTER TABLE ONLY public.tbl_factura_detalle
    ADD CONSTRAINT pk_tbl_factura_detalle PRIMARY KEY (detalle_id);
 T   ALTER TABLE ONLY public.tbl_factura_detalle DROP CONSTRAINT pk_tbl_factura_detalle;
       public            postgres    false    259            q           2606    42935    tbl_facturas pk_tbl_facturas 
   CONSTRAINT     b   ALTER TABLE ONLY public.tbl_facturas
    ADD CONSTRAINT pk_tbl_facturas PRIMARY KEY (factura_id);
 F   ALTER TABLE ONLY public.tbl_facturas DROP CONSTRAINT pk_tbl_facturas;
       public            postgres    false    261            s           2606    42937     tbl_operadores pk_tbl_operadores 
   CONSTRAINT     g   ALTER TABLE ONLY public.tbl_operadores
    ADD CONSTRAINT pk_tbl_operadores PRIMARY KEY (operador_id);
 J   ALTER TABLE ONLY public.tbl_operadores DROP CONSTRAINT pk_tbl_operadores;
       public            postgres    false    263            v           2606    42939 4   tbl_pagos_arrendamientos pk_tbl_pagos_arrendamientos 
   CONSTRAINT     �   ALTER TABLE ONLY public.tbl_pagos_arrendamientos
    ADD CONSTRAINT pk_tbl_pagos_arrendamientos PRIMARY KEY (pago_arrendamiento_id);
 ^   ALTER TABLE ONLY public.tbl_pagos_arrendamientos DROP CONSTRAINT pk_tbl_pagos_arrendamientos;
       public            postgres    false    265            y           2606    42941 .   tbl_pagos_parquimetro pk_tbl_pagos_parquimetro 
   CONSTRAINT     }   ALTER TABLE ONLY public.tbl_pagos_parquimetro
    ADD CONSTRAINT pk_tbl_pagos_parquimetro PRIMARY KEY (pago_parquimetro_id);
 X   ALTER TABLE ONLY public.tbl_pagos_parquimetro DROP CONSTRAINT pk_tbl_pagos_parquimetro;
       public            postgres    false    267            }           2606    42943 $   tbl_parquimetros pk_tbl_parquimetros 
   CONSTRAINT     n   ALTER TABLE ONLY public.tbl_parquimetros
    ADD CONSTRAINT pk_tbl_parquimetros PRIMARY KEY (parquimetro_id);
 N   ALTER TABLE ONLY public.tbl_parquimetros DROP CONSTRAINT pk_tbl_parquimetros;
       public            postgres    false    269            �           2606    42945 4   tbl_prorroga_solicitudes pk_tbl_prorroga_solicitudes 
   CONSTRAINT     {   ALTER TABLE ONLY public.tbl_prorroga_solicitudes
    ADD CONSTRAINT pk_tbl_prorroga_solicitudes PRIMARY KEY (prorroga_id);
 ^   ALTER TABLE ONLY public.tbl_prorroga_solicitudes DROP CONSTRAINT pk_tbl_prorroga_solicitudes;
       public            postgres    false    271            �           2606    42947 0   tbl_puntos_recaudacion pk_tbl_puntos_recaudacion 
   CONSTRAINT     {   ALTER TABLE ONLY public.tbl_puntos_recaudacion
    ADD CONSTRAINT pk_tbl_puntos_recaudacion PRIMARY KEY (punto_recaud_id);
 Z   ALTER TABLE ONLY public.tbl_puntos_recaudacion DROP CONSTRAINT pk_tbl_puntos_recaudacion;
       public            postgres    false    273            �           2606    43006    tbl_seg_menu pk_tbl_seg_menu 
   CONSTRAINT     ]   ALTER TABLE ONLY public.tbl_seg_menu
    ADD CONSTRAINT pk_tbl_seg_menu PRIMARY KEY (me_id);
 F   ALTER TABLE ONLY public.tbl_seg_menu DROP CONSTRAINT pk_tbl_seg_menu;
       public            postgres    false    282            �           2606    42949    tbl_servicios pk_tbl_servicios 
   CONSTRAINT     e   ALTER TABLE ONLY public.tbl_servicios
    ADD CONSTRAINT pk_tbl_servicios PRIMARY KEY (servicio_id);
 H   ALTER TABLE ONLY public.tbl_servicios DROP CONSTRAINT pk_tbl_servicios;
       public            postgres    false    275            �           2606    42951    tbl_vehiculos pk_tbl_vehiculos 
   CONSTRAINT     e   ALTER TABLE ONLY public.tbl_vehiculos
    ADD CONSTRAINT pk_tbl_vehiculos PRIMARY KEY (vehiculo_id);
 H   ALTER TABLE ONLY public.tbl_vehiculos DROP CONSTRAINT pk_tbl_vehiculos;
       public            postgres    false    277            Y           2606    42953    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    243            [           2606    42955    roles roles_role_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);
 C   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_role_name_key;
       public            postgres    false    243            c           2606    42957     tbl_depositos tbl_depositos_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.tbl_depositos
    ADD CONSTRAINT tbl_depositos_pkey PRIMARY KEY (deposito_id);
 J   ALTER TABLE ONLY public.tbl_depositos DROP CONSTRAINT tbl_depositos_pkey;
       public            postgres    false    249            g           2606    42959 0   tbl_edificio_ambiente tbl_edificio_ambiente_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY public.tbl_edificio_ambiente
    ADD CONSTRAINT tbl_edificio_ambiente_pkey PRIMARY KEY (ambiente_id);
 Z   ALTER TABLE ONLY public.tbl_edificio_ambiente DROP CONSTRAINT tbl_edificio_ambiente_pkey;
       public            postgres    false    252            �           2606    42961    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    279            �           2606    42963    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    279            �           2606    42965    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    279            7           1259    42966 (   audits_auditable_type_auditable_id_index    INDEX     s   CREATE INDEX audits_auditable_type_auditable_id_index ON public.audits USING btree (auditable_type, auditable_id);
 <   DROP INDEX public.audits_auditable_type_auditable_id_index;
       public            postgres    false    225    225            :           1259    42967    audits_user_id_user_type_index    INDEX     _   CREATE INDEX audits_user_id_user_type_index ON public.audits USING btree (user_id, user_type);
 2   DROP INDEX public.audits_user_id_user_type_index;
       public            postgres    false    225    225            0           1259    42968    fk__arqueodet__arque__6e01572d    INDEX     ^   CREATE INDEX fk__arqueodet__arque__6e01572d ON public.arqueodetcortes USING btree (arqueoid);
 2   DROP INDEX public.fk__arqueodet__arque__6e01572d;
       public            postgres    false    220            \           1259    42969    fk__tbl_arren__ambie__300424b4    INDEX     d   CREATE INDEX fk__tbl_arren__ambie__300424b4 ON public.tbl_arrendamientos USING btree (ambiente_id);
 2   DROP INDEX public.fk__tbl_arren__ambie__300424b4;
       public            postgres    false    245            _           1259    42970    fk__tbl_arren__arren__33d4b598    INDEX     t   CREATE INDEX fk__tbl_arren__arren__33d4b598 ON public.tbl_arrendamientos_documentos USING btree (arrendamiento_id);
 2   DROP INDEX public.fk__tbl_arren__arren__33d4b598;
       public            postgres    false    247            l           1259    42971    fk__tbl_factu__arren__3d5e1fd2    INDEX     j   CREATE INDEX fk__tbl_factu__arren__3d5e1fd2 ON public.tbl_factura_detalle USING btree (arrendamiento_id);
 2   DROP INDEX public.fk__tbl_factu__arren__3d5e1fd2;
       public            postgres    false    259            m           1259    42972    fk__tbl_factu__factu__3c69fb99    INDEX     d   CREATE INDEX fk__tbl_factu__factu__3c69fb99 ON public.tbl_factura_detalle USING btree (factura_id);
 2   DROP INDEX public.fk__tbl_factu__factu__3c69fb99;
       public            postgres    false    259            t           1259    42973    fk__tbl_pagos__arren__48cfd27e    INDEX     o   CREATE INDEX fk__tbl_pagos__arren__48cfd27e ON public.tbl_pagos_arrendamientos USING btree (arrendamiento_id);
 2   DROP INDEX public.fk__tbl_pagos__arren__48cfd27e;
       public            postgres    false    265            w           1259    42974    fk__tbl_pagos__parqu__59fa5e80    INDEX     j   CREATE INDEX fk__tbl_pagos__parqu__59fa5e80 ON public.tbl_pagos_parquimetro USING btree (parquimetro_id);
 2   DROP INDEX public.fk__tbl_pagos__parqu__59fa5e80;
       public            postgres    false    267            z           1259    42975    fk__tbl_parqu__punto__5535a963    INDEX     h   CREATE INDEX fk__tbl_parqu__punto__5535a963 ON public.tbl_parquimetros USING btree (punto_servicio_id);
 2   DROP INDEX public.fk__tbl_parqu__punto__5535a963;
       public            postgres    false    269            {           1259    42976    fk__tbl_parqu__vehic__5441852a    INDEX     b   CREATE INDEX fk__tbl_parqu__vehic__5441852a ON public.tbl_parquimetros USING btree (vehiculo_id);
 2   DROP INDEX public.fk__tbl_parqu__vehic__5441852a;
       public            postgres    false    269            ~           1259    42977    fk__tbl_prorr__arren__440b1d61    INDEX     n   CREATE INDEX fk__tbl_prorr__arren__440b1d61 ON public.tbl_prorroga_solicitudes USING btree (arrendatario_id);
 2   DROP INDEX public.fk__tbl_prorr__arren__440b1d61;
       public            postgres    false    271            �           1259    42978    idx_users_email    INDEX     B   CREATE INDEX idx_users_email ON public.users USING btree (email);
 #   DROP INDEX public.idx_users_email;
       public            postgres    false    279            �           1259    42979    idx_users_username    INDEX     H   CREATE INDEX idx_users_username ON public.users USING btree (username);
 &   DROP INDEX public.idx_users_username;
       public            postgres    false    279            E           1259    42980 !   oauth_access_tokens_user_id_index    INDEX     d   CREATE INDEX oauth_access_tokens_user_id_index ON public.oauth_access_tokens USING btree (user_id);
 5   DROP INDEX public.oauth_access_tokens_user_id_index;
       public            postgres    false    233            H           1259    42981    oauth_auth_codes_user_id_index    INDEX     ^   CREATE INDEX oauth_auth_codes_user_id_index ON public.oauth_auth_codes USING btree (user_id);
 2   DROP INDEX public.oauth_auth_codes_user_id_index;
       public            postgres    false    234            K           1259    42982    oauth_clients_user_id_index    INDEX     X   CREATE INDEX oauth_clients_user_id_index ON public.oauth_clients USING btree (user_id);
 /   DROP INDEX public.oauth_clients_user_id_index;
       public            postgres    false    235            N           1259    42983 *   oauth_refresh_tokens_access_token_id_index    INDEX     v   CREATE INDEX oauth_refresh_tokens_access_token_id_index ON public.oauth_refresh_tokens USING btree (access_token_id);
 >   DROP INDEX public.oauth_refresh_tokens_access_token_id_index;
       public            postgres    false    239            W           1259    42984 8   personal_access_tokens_tokenable_type_tokenable_id_index    INDEX     �   CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);
 L   DROP INDEX public.personal_access_tokens_tokenable_type_tokenable_id_index;
       public            postgres    false    241    241            �           1259    42985    uq__tbl_vehi__8b90dfb27519bf00    INDEX     i   CREATE UNIQUE INDEX uq__tbl_vehi__8b90dfb27519bf00 ON public.tbl_vehiculos USING btree (vehiculo_placa);
 2   DROP INDEX public.uq__tbl_vehi__8b90dfb27519bf00;
       public            postgres    false    277            �           2620    42986    users update_users_modtime    TRIGGER     �   CREATE TRIGGER update_users_modtime BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();
 3   DROP TRIGGER update_users_modtime ON public.users;
       public          postgres    false    283    279            �           2606    42987 :   arqueorecaudaciondet arqueorecaudaciondet_arqueorecid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.arqueorecaudaciondet
    ADD CONSTRAINT arqueorecaudaciondet_arqueorecid_fkey FOREIGN KEY (arqueorecid) REFERENCES public.arqueorecaudacioncab(arqueorecid) NOT VALID;
 d   ALTER TABLE ONLY public.arqueorecaudaciondet DROP CONSTRAINT arqueorecaudaciondet_arqueorecid_fkey;
       public          postgres    false    221    223    4916            �           2606    42992    users users_role_id_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_role_id_fkey;
       public          postgres    false    279    4953    243            $   8   x�3�4B##S]c]C#0��¸0�F�
�fVF�V&&Xŀj�b���� W�      &      x�3�4D�zP�+F��� ?�
      (   �   x���=N1�k�)�َ�8�*D�M�aK
8'�
p12����ɳ��81AF���g9 ^�7�\��N���u��*��c�1�=�"�*Ɂ�A�{���f	8�F�?�P�֟��"A����Ì���:,�!Ђ����'Ȼ7��/��O��Σ[�t�9��+�0؂���.9����Ȗ�֔uų�]����o�I��o0���)@��F!���Kn�l�����_�ϋ�8��:�o}ڞ���W���      )   l   x�}���0�3�(jV����`���&�/Ld�կ��h�
�I8p���Q7W���*�E�\,3�\�i�Ro�k{�f<��O/c�1�oc0}�()�J�0!�'�5*      *   d   x���1� �Ṝ�`hv�N���R"��&��K�D�!"S���D4�����ȏ@}or�X�
��J�aH��y^�ϲ*���eeqΝ8�+�      ,   /   x�3�4�@=(�e�E��7�42c���2	���|�`� C��      .      x������ � �      0      x������ � �      2      x������ � �      4   �   x�e�]�  �g9����eI�X�CYv���! !}��?�H.B1>0u@�5���	<�AУ�F0a��N'.��',p�&L���,�1HT�Rks�q>f\J�UN�����@_�.;zr��נe�{,� >@��5g�Z���Ɣ>����UqòS��������      6   �  x���ˎ\���>O1/0)J�Tϑ]��� �$�O���uf�U��n�}�Ţ���6�"cE�)d��v�6Z*=�졆.��*��L/#�6�|O���wI9hn���M�������?�Z����|�߂���دA~��0{h}����K�`��X��[vͫǱ��l�&˳diSKi�VP߽��ԝw�SU�P�t����H��7슒ڌ���h������>�܇�YF_��
��g*�\=�݆������R__�G�W�߰�k�:�O���q���R�j��*jc�h��ZG���-Ě���rJ�J�\?��>L_a~î��ʦK+�>J�{ҷ�znAd'>�Yf����F�sYR��=�3��F��Z���ח�#�W�߰���ţw�koNia�8Z��=�a�f�E���Q���x'a����R�����%�������*�5��V�V4�譬�Z-[1�;�5��4�f��lm��-���c�E��g���+�o�UbH,�wq���y�.�����ϜRպ���k�Lu���8��jo*����v?x����7�J�.[�B�i5V��U��>�<,�Uu�^ ���d�k�˂�lj��>�
��S�����0�W{�C�ղ��=@���XBt�E�IX�j���9������B��U&ݣ����b~�{�v?߯�.�Z�8��hSeW���z2U�ng%�ݕ<Fc,)���o�1�Fu΃o���֔W�߰+׼}ic����!p�� ߬%�`;'�N�+C,0e��K�a�4�/�\�/��؛�ΡŇ�?�����s����X��r��
H3��V���(��=�H�PZ�qC��ŭ}�<{[�х�
�v�,iZ���G6XcF�����]ۨ�(��%�vc6�s�ҡ'�Fr�<P_���o��;�]h��2��`�P�)X�1Yr���Q>�����i��X�%�#��;��]z����{}����Z;�Uw����*C��َ��
�fW�9C��N)�p�n�� ��1���]}�x7����]��6�X
��7�&t������l[,� ��7�ӵ�x���m�V����qn�_a~î�Ig_K.�f�u�uH���e�|�X��ڙ͡,�����8��:�����ׇ���]�lI�p�^S[��m��Ԑ�k��[�m�G-A�v\��#���W������T^a~î�*�c�|u�9�`^;6�]�y�ѻ7���j��H�8�T����p�L�Ja̝>��>Bx����&�h_l��g6:��3b�,4��z�65����Te��Ԏ�ih�0Ŏ�����+�o�2��s_v�rpߗƆ?`:	�.!�zl+_�0clx?�x�k����З���vE-�,�,DЂk���&������?�	-���6��˔M��U�@�9�������+�o��;�	��	Nÿ��nV��iN8W��?:�ok'�%ƥ�4�����A}���
�vK8�q��M�Xw\�-H-�m�-��QʈPu<ys��r`>Z�J늎�v�2���{����8�ӱNu�q-�	t}�P2ɳ�0��L)�����1�-�w��:���"��}}��W�߰�*�:rє}aK+Y:�l����y&~Bh*u��jd��*!�q�Ra��JW_9�)�W�߰˘=o��ɘ��T20|,A�:���X'�Y�.����w�2y_��*���~�������w�
���Ԇmӎ`������G����k�Z|�~��;��"�1�;_^7���G�o�u�1� n��廢����?����c�W`q4�3����m3zr�@ә>��o��#�7��%5���y�pY�JǠ.8�b�Or�r�x
GRj/ˏ��2���j���
��
�v��K <���4acikn��r��Q��7���U��q��L� �+��~~�z|��G(�0�aWp,T���NS����쩮r2ҩ��D��LM�0Bev���hA�4?�Ϟ���v1V�ZBʊ�s�C
V�EV��>�IXf�;�s�s�]L��7{�ll^q���O���v�5��9Xdh:�wG�BX�m�d-2;�_� �eJ;:v��I�N����������{�P_a~��?
��4	� O������8��� ���qaP̚�;��)e,���0^?�/_����~�wLo�}=w��m�X��%M4�W�&�jJ1�͊̈e�	�X"F)��	=���8�aǊ��Շo��j�3�oإc�÷{3f���N�Q<��EU[?���e\u�DIv�Gi6tt<����wm��R�'���������IH����M2���?K<~�m�9��lÛ��.aH�GE�0|�����Ϙ߰�)���P\��䍦��c����Q����l�H��t+>lyZ=ax�$L�85������x����D���:-X�Y�~a�r���|����٫H行m�N��j�0�2��?����}���]�mo=/�O*j��c��-:�\�_X��mL���\
�ZH����Ksd��Q�ȇ_�O�)�����vEG���64��I�'��4΁x����\��de�d���S���1��A}�ɟ>c~î��r��ǹe��u���o�ILIي|��-,����M'{�Jr+��7t��/ɍ�~���]���
�ƭ�y�E�2�VK��uo�k��N���4���e2ԹT����w�Ň����߰+ȹr�v�D{sz�I�T��`;0S�g��Ui��.�Mú̡�&2�����������0�aW��C��A�L^�Y`wFّ`�wçx\�4o�fi!p;��RX�����������h$܌F$9���u$�����#�t�͟�������������G�?���=��7��9sv�\pF��;g+���ؑ=��"�zgO��F!�R=���� c��/�#�W�߰���/bl�9y?wQ�:V.��D2��K�M�m�d�M$�)�d��J�����]}�a�
���9���\Y԰��>��8�:k/�N��"���H�:?�������������<�V_a~î��庮�l�F      7      x������ � �      8   y  x����R�@��kx
^�ZA�.�TL)�� �v@w���>k���,��;{~�/Oa1�ܔ����t�Pʘ4#8-��[�i�g���~���a;��%���yF����Q�����&�I^1.p!;=�:�	@S��l����&f���4�qɿ,��m�"�-Q[9y/�C����È�4?�!�Q�f�c~s�O�P�r�M�֚8���@�Z�&,�\�܎��<���6�r�jpn&�/�i�w�j�}Zobŵ��"(\9}ǟ��N�[�T�6����Q�8���I��f��Ylo'	��͝m�5��<N�7^�Om:$�,Ah�O��s3Q���-����^��8Gc���R-�����,0��\:��24OW�(����      :   B   x�mɱ�0�ښ"��dr���� n�
�k2�9�J����ȿ+7�2��v����� ^�pW      <      x������ � �      =      x������ � �      >      x������ � �      @   M   x�3�LL����t���%E�%�E
�%
i�99
��ɩ��\F��ũE�A��9�E
 DQNfnfIj
L]� ��      B      x������ � �      D      x������ � �      F      x������ � �      H      x������ � �      I      x������ � �      L      x������ � �      N      x������ � �      P      x������ � �      R      x������ � �      T   5   x�Ź� ��XW���"�_Jv�ʍJ�F�����������C�L���xP�	�      V      x������ � �      X      x������ � �      Z      x������ � �      \      x������ � �      ^   �   x�mϱ�0�}�l�<u�wH5m�\��'vp��ܟĪ.��=BOcbԤ+��Hn�8!X�8�#JR���>��@SB%�J���]	N`_B+pP7�{� ]|�d'�����@��ت�r)f�a�ꫮ���뗶Q	ٟp>��k�vE�l|���h�߆N$      g      x������ � �      `   �   x�}�A��0е{���je��I<�G��8����ρ�26���?�|�pb�"$�}��(b�x!��L�~��I��-�4���\W�bn��dv!mbhb�R094t-�^�����n�p�K+�k���+�r��i<��AVJ��V���gtY�Pr�"��m��LD�uI���O4��j���{�u�J�QA      b      x������ � �      d   �   x�=�Ak�0���+z�|_���u���Q�L���4F��87�_�^xyx�t�w����6�7mO��ֈ�h):��p�Oy!����*��?�?�Kq�����C��x�v�|��qc�����n{7�R��(���Ԏv3m�!4H�$b���4[��?����$	�;�1㚦B)T�؎�X&�r��2	K��?+�?�     