PGDMP  &                     }            edtmeacajas    16.4    16.4 �   B           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            C           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            D           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            E           1262    54262    edtmeacajas    DATABASE     �   CREATE DATABASE edtmeacajas WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Bolivia.utf8';
    DROP DATABASE edtmeacajas;
                postgres    false                       1255    54263    update_modified_column()    FUNCTION     �   CREATE FUNCTION public.update_modified_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;
 /   DROP FUNCTION public.update_modified_column();
       public          postgres    false                       1259    54578    actaentregacab    TABLE     �  CREATE TABLE public.actaentregacab (
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
       public         heap    postgres    false                       1259    54577    actaentregacab_ae_actaid_seq    SEQUENCE     �   CREATE SEQUENCE public.actaentregacab_ae_actaid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.actaentregacab_ae_actaid_seq;
       public          postgres    false    270            F           0    0    actaentregacab_ae_actaid_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.actaentregacab_ae_actaid_seq OWNED BY public.actaentregacab.ae_actaid;
          public          postgres    false    269                       1259    54571    actaentregadet    TABLE     W  CREATE TABLE public.actaentregadet (
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
       public         heap    postgres    false                       1259    54570    actaentregadet_aed_actaid_seq    SEQUENCE     �   CREATE SEQUENCE public.actaentregadet_aed_actaid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.actaentregadet_aed_actaid_seq;
       public          postgres    false    268            G           0    0    actaentregadet_aed_actaid_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.actaentregadet_aed_actaid_seq OWNED BY public.actaentregadet.aed_actaid;
          public          postgres    false    267            �            1259    54272 	   arqueocab    TABLE     �  CREATE TABLE public.arqueocab (
    arqueoid integer NOT NULL,
    arqueonumero integer NOT NULL,
    arqueofecha timestamp without time zone NOT NULL,
    arqueoturno character varying(200) NOT NULL,
    arqueohorainicio timestamp without time zone NOT NULL,
    arqueohorafin timestamp without time zone NOT NULL,
    arqueosupervisor integer,
    arqueorealizadopor integer,
    arqueorevisadopor integer,
    arqueorecaudaciontotal double precision,
    arqueodiferencia double precision,
    arqueoobservacion text,
    arqueoestado character(1) DEFAULT 'A'::bpchar,
    arqueofecharegistro timestamp without time zone,
    arqueousuario integer
);
    DROP TABLE public.arqueocab;
       public         heap    postgres    false            H           0    0    TABLE arqueocab    COMMENT     .   COMMENT ON TABLE public.arqueocab IS 'TRIAL';
          public          postgres    false    215            I           0    0    COLUMN arqueocab.arqueoid    COMMENT     8   COMMENT ON COLUMN public.arqueocab.arqueoid IS 'TRIAL';
          public          postgres    false    215            J           0    0    COLUMN arqueocab.arqueonumero    COMMENT     <   COMMENT ON COLUMN public.arqueocab.arqueonumero IS 'TRIAL';
          public          postgres    false    215            K           0    0    COLUMN arqueocab.arqueofecha    COMMENT     ;   COMMENT ON COLUMN public.arqueocab.arqueofecha IS 'TRIAL';
          public          postgres    false    215            L           0    0    COLUMN arqueocab.arqueoturno    COMMENT     ;   COMMENT ON COLUMN public.arqueocab.arqueoturno IS 'TRIAL';
          public          postgres    false    215            M           0    0 !   COLUMN arqueocab.arqueohorainicio    COMMENT     @   COMMENT ON COLUMN public.arqueocab.arqueohorainicio IS 'TRIAL';
          public          postgres    false    215            N           0    0    COLUMN arqueocab.arqueohorafin    COMMENT     =   COMMENT ON COLUMN public.arqueocab.arqueohorafin IS 'TRIAL';
          public          postgres    false    215            O           0    0 !   COLUMN arqueocab.arqueosupervisor    COMMENT     @   COMMENT ON COLUMN public.arqueocab.arqueosupervisor IS 'TRIAL';
          public          postgres    false    215            P           0    0 #   COLUMN arqueocab.arqueorealizadopor    COMMENT     B   COMMENT ON COLUMN public.arqueocab.arqueorealizadopor IS 'TRIAL';
          public          postgres    false    215            Q           0    0 "   COLUMN arqueocab.arqueorevisadopor    COMMENT     A   COMMENT ON COLUMN public.arqueocab.arqueorevisadopor IS 'TRIAL';
          public          postgres    false    215            R           0    0 '   COLUMN arqueocab.arqueorecaudaciontotal    COMMENT     F   COMMENT ON COLUMN public.arqueocab.arqueorecaudaciontotal IS 'TRIAL';
          public          postgres    false    215            S           0    0 !   COLUMN arqueocab.arqueodiferencia    COMMENT     @   COMMENT ON COLUMN public.arqueocab.arqueodiferencia IS 'TRIAL';
          public          postgres    false    215            T           0    0 "   COLUMN arqueocab.arqueoobservacion    COMMENT     A   COMMENT ON COLUMN public.arqueocab.arqueoobservacion IS 'TRIAL';
          public          postgres    false    215            U           0    0    COLUMN arqueocab.arqueoestado    COMMENT     <   COMMENT ON COLUMN public.arqueocab.arqueoestado IS 'TRIAL';
          public          postgres    false    215            V           0    0 $   COLUMN arqueocab.arqueofecharegistro    COMMENT     C   COMMENT ON COLUMN public.arqueocab.arqueofecharegistro IS 'TRIAL';
          public          postgres    false    215            W           0    0    COLUMN arqueocab.arqueousuario    COMMENT     =   COMMENT ON COLUMN public.arqueocab.arqueousuario IS 'TRIAL';
          public          postgres    false    215            �            1259    54278    arqueodetcortes    TABLE     �  CREATE TABLE public.arqueodetcortes (
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
       public         heap    postgres    false            X           0    0    TABLE arqueodetcortes    COMMENT     4   COMMENT ON TABLE public.arqueodetcortes IS 'TRIAL';
          public          postgres    false    216            Y           0    0 '   COLUMN arqueodetcortes.arqueodetcorteid    COMMENT     F   COMMENT ON COLUMN public.arqueodetcortes.arqueodetcorteid IS 'TRIAL';
          public          postgres    false    216            Z           0    0    COLUMN arqueodetcortes.arqueoid    COMMENT     >   COMMENT ON COLUMN public.arqueodetcortes.arqueoid IS 'TRIAL';
          public          postgres    false    216            [           0    0 (   COLUMN arqueodetcortes.arqueocorte200_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte200_00 IS 'TRIAL';
          public          postgres    false    216            \           0    0 (   COLUMN arqueodetcortes.arqueocorte100_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte100_00 IS 'TRIAL';
          public          postgres    false    216            ]           0    0 (   COLUMN arqueodetcortes.arqueocorte050_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte050_00 IS 'TRIAL';
          public          postgres    false    216            ^           0    0 (   COLUMN arqueodetcortes.arqueocorte020_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte020_00 IS 'TRIAL';
          public          postgres    false    216            _           0    0 (   COLUMN arqueodetcortes.arqueocorte010_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte010_00 IS 'TRIAL';
          public          postgres    false    216            `           0    0 (   COLUMN arqueodetcortes.arqueocorte005_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte005_00 IS 'TRIAL';
          public          postgres    false    216            a           0    0 (   COLUMN arqueodetcortes.arqueocorte002_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte002_00 IS 'TRIAL';
          public          postgres    false    216            b           0    0 (   COLUMN arqueodetcortes.arqueocorte001_00    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte001_00 IS 'TRIAL';
          public          postgres    false    216            c           0    0 (   COLUMN arqueodetcortes.arqueocorte000_50    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte000_50 IS 'TRIAL';
          public          postgres    false    216            d           0    0 (   COLUMN arqueodetcortes.arqueocorte000_20    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte000_20 IS 'TRIAL';
          public          postgres    false    216            e           0    0 (   COLUMN arqueodetcortes.arqueocorte000_10    COMMENT     G   COMMENT ON COLUMN public.arqueodetcortes.arqueocorte000_10 IS 'TRIAL';
          public          postgres    false    216            f           0    0 #   COLUMN arqueodetcortes.arqueoestado    COMMENT     B   COMMENT ON COLUMN public.arqueodetcortes.arqueoestado IS 'TRIAL';
          public          postgres    false    216                       1259    54587    arqueorecaudacioncab    TABLE     u  CREATE TABLE public.arqueorecaudacioncab (
    arqueorecid integer NOT NULL,
    arqueocorrelativo integer,
    arqueofecha date NOT NULL,
    arqueoturno character(1),
    punto_recaud_id integer NOT NULL,
    arqueonombreoperador text,
    arqueousuario integer,
    arqueofecharegistro timestamp without time zone,
    arqueoid integer,
    arqueoestado character(1)
);
 (   DROP TABLE public.arqueorecaudacioncab;
       public         heap    postgres    false                       1259    54586 $   arqueorecaudacioncab_arqueorecid_seq    SEQUENCE     �   CREATE SEQUENCE public.arqueorecaudacioncab_arqueorecid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.arqueorecaudacioncab_arqueorecid_seq;
       public          postgres    false    272            g           0    0 $   arqueorecaudacioncab_arqueorecid_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.arqueorecaudacioncab_arqueorecid_seq OWNED BY public.arqueorecaudacioncab.arqueorecid;
          public          postgres    false    271                       1259    54596    arqueorecaudaciondet    TABLE     :  CREATE TABLE public.arqueorecaudaciondet (
    arqueorecdetid integer NOT NULL,
    arqueorecid integer NOT NULL,
    servicio_id integer NOT NULL,
    arqueodetcantidad integer NOT NULL,
    arqueodettarifabs numeric(18,2) NOT NULL,
    arqueodetimportebs numeric(18,2) NOT NULL,
    arqueoestado character(1)
);
 (   DROP TABLE public.arqueorecaudaciondet;
       public         heap    postgres    false                       1259    54595 '   arqueorecaudaciondet_arqueorecdetid_seq    SEQUENCE     �   CREATE SEQUENCE public.arqueorecaudaciondet_arqueorecdetid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public.arqueorecaudaciondet_arqueorecdetid_seq;
       public          postgres    false    274            h           0    0 '   arqueorecaudaciondet_arqueorecdetid_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public.arqueorecaudaciondet_arqueorecdetid_seq OWNED BY public.arqueorecaudaciondet.arqueorecdetid;
          public          postgres    false    273            �            1259    54284    failed_jobs    TABLE     &  CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.failed_jobs;
       public         heap    postgres    false            �            1259    54290    failed_jobs_id_seq    SEQUENCE     {   CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.failed_jobs_id_seq;
       public          postgres    false    217            i           0    0    failed_jobs_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;
          public          postgres    false    218            �            1259    54291 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);
    DROP TABLE public.migrations;
       public         heap    postgres    false            �            1259    54294    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public          postgres    false    219            j           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public          postgres    false    220            �            1259    54295    oauth_access_tokens    TABLE     d  CREATE TABLE public.oauth_access_tokens (
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
       public         heap    postgres    false            �            1259    54300    oauth_auth_codes    TABLE     �   CREATE TABLE public.oauth_auth_codes (
    id character varying(100) NOT NULL,
    user_id bigint NOT NULL,
    client_id bigint NOT NULL,
    scopes text,
    revoked boolean NOT NULL,
    expires_at timestamp(0) without time zone
);
 $   DROP TABLE public.oauth_auth_codes;
       public         heap    postgres    false            �            1259    54305    oauth_clients    TABLE     �  CREATE TABLE public.oauth_clients (
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
       public         heap    postgres    false            �            1259    54310    oauth_clients_id_seq    SEQUENCE     }   CREATE SEQUENCE public.oauth_clients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.oauth_clients_id_seq;
       public          postgres    false    223            k           0    0    oauth_clients_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.oauth_clients_id_seq OWNED BY public.oauth_clients.id;
          public          postgres    false    224            �            1259    54311    oauth_personal_access_clients    TABLE     �   CREATE TABLE public.oauth_personal_access_clients (
    id bigint NOT NULL,
    client_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 1   DROP TABLE public.oauth_personal_access_clients;
       public         heap    postgres    false            �            1259    54314 $   oauth_personal_access_clients_id_seq    SEQUENCE     �   CREATE SEQUENCE public.oauth_personal_access_clients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.oauth_personal_access_clients_id_seq;
       public          postgres    false    225            l           0    0 $   oauth_personal_access_clients_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.oauth_personal_access_clients_id_seq OWNED BY public.oauth_personal_access_clients.id;
          public          postgres    false    226            �            1259    54315    oauth_refresh_tokens    TABLE     �   CREATE TABLE public.oauth_refresh_tokens (
    id character varying(100) NOT NULL,
    access_token_id character varying(100) NOT NULL,
    revoked boolean NOT NULL,
    expires_at timestamp(0) without time zone
);
 (   DROP TABLE public.oauth_refresh_tokens;
       public         heap    postgres    false            �            1259    54318    password_reset_tokens    TABLE     �   CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);
 )   DROP TABLE public.password_reset_tokens;
       public         heap    postgres    false            �            1259    54323    personal_access_tokens    TABLE     �  CREATE TABLE public.personal_access_tokens (
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
       public         heap    postgres    false            �            1259    54328    personal_access_tokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.personal_access_tokens_id_seq;
       public          postgres    false    229            m           0    0    personal_access_tokens_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;
          public          postgres    false    230            �            1259    54329    roles    TABLE     �   CREATE TABLE public.roles (
    id integer NOT NULL,
    role_name character varying(255) NOT NULL,
    role_description text
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    54334    roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public          postgres    false    231            n           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
          public          postgres    false    232            �            1259    54335    tbl_arrendamientos    TABLE     �  CREATE TABLE public.tbl_arrendamientos (
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
    arrendamiento_fecha_inicio timestamp without time zone NOT NULL,
    arrendamiento_fecha_fin timestamp without time zone NOT NULL,
    arrendamiento_canon double precision NOT NULL,
    arrendamiento_funcion text,
    arrendamiento_forma_pago character varying(255) DEFAULT 'MENSUAL'::character varying,
    arrendamiento_estado character(1)
);
 &   DROP TABLE public.tbl_arrendamientos;
       public         heap    postgres    false            o           0    0    TABLE tbl_arrendamientos    COMMENT     7   COMMENT ON TABLE public.tbl_arrendamientos IS 'TRIAL';
          public          postgres    false    233            p           0    0 *   COLUMN tbl_arrendamientos.arrendamiento_id    COMMENT     I   COMMENT ON COLUMN public.tbl_arrendamientos.arrendamiento_id IS 'TRIAL';
          public          postgres    false    233            q           0    0 %   COLUMN tbl_arrendamientos.ambiente_id    COMMENT     D   COMMENT ON COLUMN public.tbl_arrendamientos.ambiente_id IS 'TRIAL';
          public          postgres    false    233            r           0    0 &   COLUMN tbl_arrendamientos.num_contrato    COMMENT     E   COMMENT ON COLUMN public.tbl_arrendamientos.num_contrato IS 'TRIAL';
          public          postgres    false    233            s           0    0 )   COLUMN tbl_arrendamientos.operador_nombre    COMMENT     H   COMMENT ON COLUMN public.tbl_arrendamientos.operador_nombre IS 'TRIAL';
          public          postgres    false    233            t           0    0 -   COLUMN tbl_arrendamientos.arrendatario_nombre    COMMENT     L   COMMENT ON COLUMN public.tbl_arrendamientos.arrendatario_nombre IS 'TRIAL';
          public          postgres    false    233            u           0    0 7   COLUMN tbl_arrendamientos.arrendatario_apellido_paterno    COMMENT     V   COMMENT ON COLUMN public.tbl_arrendamientos.arrendatario_apellido_paterno IS 'TRIAL';
          public          postgres    false    233            v           0    0 7   COLUMN tbl_arrendamientos.arrendatario_apellido_materno    COMMENT     V   COMMENT ON COLUMN public.tbl_arrendamientos.arrendatario_apellido_materno IS 'TRIAL';
          public          postgres    false    233            w           0    0 )   COLUMN tbl_arrendamientos.arrendatario_ci    COMMENT     H   COMMENT ON COLUMN public.tbl_arrendamientos.arrendatario_ci IS 'TRIAL';
          public          postgres    false    233            x           0    0 7   COLUMN tbl_arrendamientos.arrendatario_nombre_comercial    COMMENT     V   COMMENT ON COLUMN public.tbl_arrendamientos.arrendatario_nombre_comercial IS 'TRIAL';
          public          postgres    false    233            y           0    0 /   COLUMN tbl_arrendamientos.arrendatario_telefono    COMMENT     N   COMMENT ON COLUMN public.tbl_arrendamientos.arrendatario_telefono IS 'TRIAL';
          public          postgres    false    233            z           0    0 .   COLUMN tbl_arrendamientos.arrendatario_celular    COMMENT     M   COMMENT ON COLUMN public.tbl_arrendamientos.arrendatario_celular IS 'TRIAL';
          public          postgres    false    233            {           0    0 )   COLUMN tbl_arrendamientos.ambiente_codigo    COMMENT     H   COMMENT ON COLUMN public.tbl_arrendamientos.ambiente_codigo IS 'TRIAL';
          public          postgres    false    233            |           0    0 4   COLUMN tbl_arrendamientos.arrendamiento_fecha_inicio    COMMENT     S   COMMENT ON COLUMN public.tbl_arrendamientos.arrendamiento_fecha_inicio IS 'TRIAL';
          public          postgres    false    233            }           0    0 1   COLUMN tbl_arrendamientos.arrendamiento_fecha_fin    COMMENT     P   COMMENT ON COLUMN public.tbl_arrendamientos.arrendamiento_fecha_fin IS 'TRIAL';
          public          postgres    false    233            ~           0    0 -   COLUMN tbl_arrendamientos.arrendamiento_canon    COMMENT     L   COMMENT ON COLUMN public.tbl_arrendamientos.arrendamiento_canon IS 'TRIAL';
          public          postgres    false    233                       0    0 /   COLUMN tbl_arrendamientos.arrendamiento_funcion    COMMENT     N   COMMENT ON COLUMN public.tbl_arrendamientos.arrendamiento_funcion IS 'TRIAL';
          public          postgres    false    233            �           0    0 2   COLUMN tbl_arrendamientos.arrendamiento_forma_pago    COMMENT     Q   COMMENT ON COLUMN public.tbl_arrendamientos.arrendamiento_forma_pago IS 'TRIAL';
          public          postgres    false    233            �           0    0 .   COLUMN tbl_arrendamientos.arrendamiento_estado    COMMENT     M   COMMENT ON COLUMN public.tbl_arrendamientos.arrendamiento_estado IS 'TRIAL';
          public          postgres    false    233            �            1259    54341 '   tbl_arrendamientos_arrendamiento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_arrendamientos_arrendamiento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public.tbl_arrendamientos_arrendamiento_id_seq;
       public          postgres    false    233            �           0    0 '   tbl_arrendamientos_arrendamiento_id_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public.tbl_arrendamientos_arrendamiento_id_seq OWNED BY public.tbl_arrendamientos.arrendamiento_id;
          public          postgres    false    234            �            1259    54342    tbl_arrendamientos_documentos    TABLE     {  CREATE TABLE public.tbl_arrendamientos_documentos (
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
          public          postgres    false    235            �           0    0 1   COLUMN tbl_arrendamientos_documentos.documento_id    COMMENT     P   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.documento_id IS 'TRIAL';
          public          postgres    false    235            �           0    0 5   COLUMN tbl_arrendamientos_documentos.arrendamiento_id    COMMENT     T   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.arrendamiento_id IS 'TRIAL';
          public          postgres    false    235            �           0    0 3   COLUMN tbl_arrendamientos_documentos.documento_tipo    COMMENT     R   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.documento_tipo IS 'TRIAL';
          public          postgres    false    235            �           0    0 5   COLUMN tbl_arrendamientos_documentos.documento_nombre    COMMENT     T   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.documento_nombre IS 'TRIAL';
          public          postgres    false    235            �           0    0 2   COLUMN tbl_arrendamientos_documentos.documento_url    COMMENT     Q   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.documento_url IS 'TRIAL';
          public          postgres    false    235            �           0    0 :   COLUMN tbl_arrendamientos_documentos.documento_descripcion    COMMENT     Y   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.documento_descripcion IS 'TRIAL';
          public          postgres    false    235            �           0    0 1   COLUMN tbl_arrendamientos_documentos.fecha_subida    COMMENT     P   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.fecha_subida IS 'TRIAL';
          public          postgres    false    235            �           0    0 5   COLUMN tbl_arrendamientos_documentos.documento_estado    COMMENT     T   COMMENT ON COLUMN public.tbl_arrendamientos_documentos.documento_estado IS 'TRIAL';
          public          postgres    false    235            �            1259    54347 .   tbl_arrendamientos_documentos_documento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_arrendamientos_documentos_documento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 E   DROP SEQUENCE public.tbl_arrendamientos_documentos_documento_id_seq;
       public          postgres    false    235            �           0    0 .   tbl_arrendamientos_documentos_documento_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.tbl_arrendamientos_documentos_documento_id_seq OWNED BY public.tbl_arrendamientos_documentos.documento_id;
          public          postgres    false    236            �            1259    54348    tbl_edificio    TABLE     �   CREATE TABLE public.tbl_edificio (
    edificio_id integer NOT NULL,
    edificio_nombre text NOT NULL,
    edificio_direccion text NOT NULL
);
     DROP TABLE public.tbl_edificio;
       public         heap    postgres    false            �           0    0    TABLE tbl_edificio    COMMENT     1   COMMENT ON TABLE public.tbl_edificio IS 'TRIAL';
          public          postgres    false    237            �           0    0    COLUMN tbl_edificio.edificio_id    COMMENT     >   COMMENT ON COLUMN public.tbl_edificio.edificio_id IS 'TRIAL';
          public          postgres    false    237            �           0    0 #   COLUMN tbl_edificio.edificio_nombre    COMMENT     B   COMMENT ON COLUMN public.tbl_edificio.edificio_nombre IS 'TRIAL';
          public          postgres    false    237            �           0    0 &   COLUMN tbl_edificio.edificio_direccion    COMMENT     E   COMMENT ON COLUMN public.tbl_edificio.edificio_direccion IS 'TRIAL';
          public          postgres    false    237            �            1259    54353    tbl_edificio_ambiente    TABLE     v  CREATE TABLE public.tbl_edificio_ambiente (
    ambiente_id integer NOT NULL,
    seccion_id integer,
    ambiente_nombre text NOT NULL,
    ambiente_tamano double precision,
    ambiente_tipo_uso text,
    ambiente_precio_alquiler double precision,
    ambiente_codigo_interno text,
    ambiente_superficie_m2 double precision,
    ambiente_estado character(1) NOT NULL
);
 )   DROP TABLE public.tbl_edificio_ambiente;
       public         heap    postgres    false            �           0    0    TABLE tbl_edificio_ambiente    COMMENT     :   COMMENT ON TABLE public.tbl_edificio_ambiente IS 'TRIAL';
          public          postgres    false    238            �           0    0 (   COLUMN tbl_edificio_ambiente.ambiente_id    COMMENT     G   COMMENT ON COLUMN public.tbl_edificio_ambiente.ambiente_id IS 'TRIAL';
          public          postgres    false    238            �           0    0 '   COLUMN tbl_edificio_ambiente.seccion_id    COMMENT     F   COMMENT ON COLUMN public.tbl_edificio_ambiente.seccion_id IS 'TRIAL';
          public          postgres    false    238            �           0    0 ,   COLUMN tbl_edificio_ambiente.ambiente_nombre    COMMENT     K   COMMENT ON COLUMN public.tbl_edificio_ambiente.ambiente_nombre IS 'TRIAL';
          public          postgres    false    238            �           0    0 ,   COLUMN tbl_edificio_ambiente.ambiente_tamano    COMMENT     K   COMMENT ON COLUMN public.tbl_edificio_ambiente.ambiente_tamano IS 'TRIAL';
          public          postgres    false    238            �           0    0 .   COLUMN tbl_edificio_ambiente.ambiente_tipo_uso    COMMENT     M   COMMENT ON COLUMN public.tbl_edificio_ambiente.ambiente_tipo_uso IS 'TRIAL';
          public          postgres    false    238            �           0    0 5   COLUMN tbl_edificio_ambiente.ambiente_precio_alquiler    COMMENT     T   COMMENT ON COLUMN public.tbl_edificio_ambiente.ambiente_precio_alquiler IS 'TRIAL';
          public          postgres    false    238            �           0    0 4   COLUMN tbl_edificio_ambiente.ambiente_codigo_interno    COMMENT     S   COMMENT ON COLUMN public.tbl_edificio_ambiente.ambiente_codigo_interno IS 'TRIAL';
          public          postgres    false    238            �           0    0 3   COLUMN tbl_edificio_ambiente.ambiente_superficie_m2    COMMENT     R   COMMENT ON COLUMN public.tbl_edificio_ambiente.ambiente_superficie_m2 IS 'TRIAL';
          public          postgres    false    238            �           0    0 ,   COLUMN tbl_edificio_ambiente.ambiente_estado    COMMENT     K   COMMENT ON COLUMN public.tbl_edificio_ambiente.ambiente_estado IS 'TRIAL';
          public          postgres    false    238            �            1259    54358 %   tbl_edificio_ambiente_ambiente_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_edificio_ambiente_ambiente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.tbl_edificio_ambiente_ambiente_id_seq;
       public          postgres    false    238            �           0    0 %   tbl_edificio_ambiente_ambiente_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.tbl_edificio_ambiente_ambiente_id_seq OWNED BY public.tbl_edificio_ambiente.ambiente_id;
          public          postgres    false    239            �            1259    54359    tbl_edificio_edificio_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_edificio_edificio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.tbl_edificio_edificio_id_seq;
       public          postgres    false    237            �           0    0    tbl_edificio_edificio_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.tbl_edificio_edificio_id_seq OWNED BY public.tbl_edificio.edificio_id;
          public          postgres    false    240            �            1259    54360    tbl_edificio_nivel    TABLE     �   CREATE TABLE public.tbl_edificio_nivel (
    nivel_id integer NOT NULL,
    edificio_id integer,
    nivel_nombre text NOT NULL,
    nivel_estado character(1) NOT NULL
);
 &   DROP TABLE public.tbl_edificio_nivel;
       public         heap    postgres    false            �           0    0    TABLE tbl_edificio_nivel    COMMENT     7   COMMENT ON TABLE public.tbl_edificio_nivel IS 'TRIAL';
          public          postgres    false    241            �           0    0 "   COLUMN tbl_edificio_nivel.nivel_id    COMMENT     A   COMMENT ON COLUMN public.tbl_edificio_nivel.nivel_id IS 'TRIAL';
          public          postgres    false    241            �           0    0 %   COLUMN tbl_edificio_nivel.edificio_id    COMMENT     D   COMMENT ON COLUMN public.tbl_edificio_nivel.edificio_id IS 'TRIAL';
          public          postgres    false    241            �           0    0 &   COLUMN tbl_edificio_nivel.nivel_nombre    COMMENT     E   COMMENT ON COLUMN public.tbl_edificio_nivel.nivel_nombre IS 'TRIAL';
          public          postgres    false    241            �           0    0 &   COLUMN tbl_edificio_nivel.nivel_estado    COMMENT     E   COMMENT ON COLUMN public.tbl_edificio_nivel.nivel_estado IS 'TRIAL';
          public          postgres    false    241            �            1259    54365    tbl_edificio_nivel_nivel_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_edificio_nivel_nivel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.tbl_edificio_nivel_nivel_id_seq;
       public          postgres    false    241            �           0    0    tbl_edificio_nivel_nivel_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.tbl_edificio_nivel_nivel_id_seq OWNED BY public.tbl_edificio_nivel.nivel_id;
          public          postgres    false    242            �            1259    54366    tbl_edificio_seccion    TABLE     �   CREATE TABLE public.tbl_edificio_seccion (
    seccion_id integer NOT NULL,
    nivel_id integer,
    seccion_nombre text NOT NULL,
    seccion_estado character(1) NOT NULL
);
 (   DROP TABLE public.tbl_edificio_seccion;
       public         heap    postgres    false            �           0    0    TABLE tbl_edificio_seccion    COMMENT     9   COMMENT ON TABLE public.tbl_edificio_seccion IS 'TRIAL';
          public          postgres    false    243            �           0    0 &   COLUMN tbl_edificio_seccion.seccion_id    COMMENT     E   COMMENT ON COLUMN public.tbl_edificio_seccion.seccion_id IS 'TRIAL';
          public          postgres    false    243            �           0    0 $   COLUMN tbl_edificio_seccion.nivel_id    COMMENT     C   COMMENT ON COLUMN public.tbl_edificio_seccion.nivel_id IS 'TRIAL';
          public          postgres    false    243            �           0    0 *   COLUMN tbl_edificio_seccion.seccion_nombre    COMMENT     I   COMMENT ON COLUMN public.tbl_edificio_seccion.seccion_nombre IS 'TRIAL';
          public          postgres    false    243            �           0    0 *   COLUMN tbl_edificio_seccion.seccion_estado    COMMENT     I   COMMENT ON COLUMN public.tbl_edificio_seccion.seccion_estado IS 'TRIAL';
          public          postgres    false    243            �            1259    54371 #   tbl_edificio_seccion_seccion_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_edificio_seccion_seccion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.tbl_edificio_seccion_seccion_id_seq;
       public          postgres    false    243            �           0    0 #   tbl_edificio_seccion_seccion_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.tbl_edificio_seccion_seccion_id_seq OWNED BY public.tbl_edificio_seccion.seccion_id;
          public          postgres    false    244            �            1259    54372    tbl_factura_detalle    TABLE     �  CREATE TABLE public.tbl_factura_detalle (
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
          public          postgres    false    245            �           0    0 %   COLUMN tbl_factura_detalle.detalle_id    COMMENT     D   COMMENT ON COLUMN public.tbl_factura_detalle.detalle_id IS 'TRIAL';
          public          postgres    false    245            �           0    0 %   COLUMN tbl_factura_detalle.factura_id    COMMENT     D   COMMENT ON COLUMN public.tbl_factura_detalle.factura_id IS 'TRIAL';
          public          postgres    false    245            �           0    0 +   COLUMN tbl_factura_detalle.arrendamiento_id    COMMENT     J   COMMENT ON COLUMN public.tbl_factura_detalle.arrendamiento_id IS 'TRIAL';
          public          postgres    false    245            �           0    0 4   COLUMN tbl_factura_detalle.fact_detalle_periodo_pago    COMMENT     S   COMMENT ON COLUMN public.tbl_factura_detalle.fact_detalle_periodo_pago IS 'TRIAL';
          public          postgres    false    245            �           0    0 6   COLUMN tbl_factura_detalle.fact_detalle_canon_alquiler    COMMENT     U   COMMENT ON COLUMN public.tbl_factura_detalle.fact_detalle_canon_alquiler IS 'TRIAL';
          public          postgres    false    245            �           0    0 ;   COLUMN tbl_factura_detalle.fact_detalle_morosidad_penalidad    COMMENT     Z   COMMENT ON COLUMN public.tbl_factura_detalle.fact_detalle_morosidad_penalidad IS 'TRIAL';
          public          postgres    false    245            �           0    0 6   COLUMN tbl_factura_detalle.fact_detalle_dias_morosidad    COMMENT     U   COMMENT ON COLUMN public.tbl_factura_detalle.fact_detalle_dias_morosidad IS 'TRIAL';
          public          postgres    false    245            �           0    0 2   COLUMN tbl_factura_detalle.fact_detalle_total_mora    COMMENT     Q   COMMENT ON COLUMN public.tbl_factura_detalle.fact_detalle_total_mora IS 'TRIAL';
          public          postgres    false    245            �           0    0 2   COLUMN tbl_factura_detalle.fact_detalle_importe_bs    COMMENT     Q   COMMENT ON COLUMN public.tbl_factura_detalle.fact_detalle_importe_bs IS 'TRIAL';
          public          postgres    false    245            �           0    0 5   COLUMN tbl_factura_detalle.fact_detalle_observaciones    COMMENT     T   COMMENT ON COLUMN public.tbl_factura_detalle.fact_detalle_observaciones IS 'TRIAL';
          public          postgres    false    245            �            1259    54380 "   tbl_factura_detalle_detalle_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_factura_detalle_detalle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.tbl_factura_detalle_detalle_id_seq;
       public          postgres    false    245            �           0    0 "   tbl_factura_detalle_detalle_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.tbl_factura_detalle_detalle_id_seq OWNED BY public.tbl_factura_detalle.detalle_id;
          public          postgres    false    246            �            1259    54381    tbl_facturas    TABLE     �  CREATE TABLE public.tbl_facturas (
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
          public          postgres    false    247            �           0    0    COLUMN tbl_facturas.factura_id    COMMENT     =   COMMENT ON COLUMN public.tbl_facturas.factura_id IS 'TRIAL';
          public          postgres    false    247            �           0    0 '   COLUMN tbl_facturas.arrendatario_nombre    COMMENT     F   COMMENT ON COLUMN public.tbl_facturas.arrendatario_nombre IS 'TRIAL';
          public          postgres    false    247            �           0    0 #   COLUMN tbl_facturas.arrendatario_ci    COMMENT     B   COMMENT ON COLUMN public.tbl_facturas.arrendatario_ci IS 'TRIAL';
          public          postgres    false    247            �           0    0 "   COLUMN tbl_facturas.factura_numero    COMMENT     A   COMMENT ON COLUMN public.tbl_facturas.factura_numero IS 'TRIAL';
          public          postgres    false    247            �           0    0 )   COLUMN tbl_facturas.factura_fecha_emision    COMMENT     H   COMMENT ON COLUMN public.tbl_facturas.factura_fecha_emision IS 'TRIAL';
          public          postgres    false    247            �           0    0 !   COLUMN tbl_facturas.factura_total    COMMENT     @   COMMENT ON COLUMN public.tbl_facturas.factura_total IS 'TRIAL';
          public          postgres    false    247            �           0    0 &   COLUMN tbl_facturas.factura_fecha_pago    COMMENT     E   COMMENT ON COLUMN public.tbl_facturas.factura_fecha_pago IS 'TRIAL';
          public          postgres    false    247            �           0    0 "   COLUMN tbl_facturas.factura_estado    COMMENT     A   COMMENT ON COLUMN public.tbl_facturas.factura_estado IS 'TRIAL';
          public          postgres    false    247            �            1259    54387    tbl_facturas_factura_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_facturas_factura_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.tbl_facturas_factura_id_seq;
       public          postgres    false    247            �           0    0    tbl_facturas_factura_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.tbl_facturas_factura_id_seq OWNED BY public.tbl_facturas.factura_id;
          public          postgres    false    248            �            1259    54388    tbl_operadores    TABLE     �   CREATE TABLE public.tbl_operadores (
    operador_id integer NOT NULL,
    per_id integer,
    operador_estado character(1) NOT NULL
);
 "   DROP TABLE public.tbl_operadores;
       public         heap    postgres    false            �           0    0    TABLE tbl_operadores    COMMENT     3   COMMENT ON TABLE public.tbl_operadores IS 'TRIAL';
          public          postgres    false    249            �           0    0 !   COLUMN tbl_operadores.operador_id    COMMENT     @   COMMENT ON COLUMN public.tbl_operadores.operador_id IS 'TRIAL';
          public          postgres    false    249            �           0    0    COLUMN tbl_operadores.per_id    COMMENT     ;   COMMENT ON COLUMN public.tbl_operadores.per_id IS 'TRIAL';
          public          postgres    false    249            �           0    0 %   COLUMN tbl_operadores.operador_estado    COMMENT     D   COMMENT ON COLUMN public.tbl_operadores.operador_estado IS 'TRIAL';
          public          postgres    false    249            �            1259    54391    tbl_operadores_operador_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_operadores_operador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.tbl_operadores_operador_id_seq;
       public          postgres    false    249            �           0    0    tbl_operadores_operador_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.tbl_operadores_operador_id_seq OWNED BY public.tbl_operadores.operador_id;
          public          postgres    false    250            �            1259    54392    tbl_pagos_arrendamientos    TABLE     �   CREATE TABLE public.tbl_pagos_arrendamientos (
    pago_arrendamiento_id integer NOT NULL,
    arrendamiento_id integer,
    pago_monto double precision NOT NULL,
    pago_fecha timestamp without time zone,
    pago_estado character(1)
);
 ,   DROP TABLE public.tbl_pagos_arrendamientos;
       public         heap    postgres    false            �           0    0    TABLE tbl_pagos_arrendamientos    COMMENT     =   COMMENT ON TABLE public.tbl_pagos_arrendamientos IS 'TRIAL';
          public          postgres    false    251            �           0    0 5   COLUMN tbl_pagos_arrendamientos.pago_arrendamiento_id    COMMENT     T   COMMENT ON COLUMN public.tbl_pagos_arrendamientos.pago_arrendamiento_id IS 'TRIAL';
          public          postgres    false    251            �           0    0 0   COLUMN tbl_pagos_arrendamientos.arrendamiento_id    COMMENT     O   COMMENT ON COLUMN public.tbl_pagos_arrendamientos.arrendamiento_id IS 'TRIAL';
          public          postgres    false    251            �           0    0 *   COLUMN tbl_pagos_arrendamientos.pago_monto    COMMENT     I   COMMENT ON COLUMN public.tbl_pagos_arrendamientos.pago_monto IS 'TRIAL';
          public          postgres    false    251            �           0    0 *   COLUMN tbl_pagos_arrendamientos.pago_fecha    COMMENT     I   COMMENT ON COLUMN public.tbl_pagos_arrendamientos.pago_fecha IS 'TRIAL';
          public          postgres    false    251            �           0    0 +   COLUMN tbl_pagos_arrendamientos.pago_estado    COMMENT     J   COMMENT ON COLUMN public.tbl_pagos_arrendamientos.pago_estado IS 'TRIAL';
          public          postgres    false    251            �            1259    54395 2   tbl_pagos_arrendamientos_pago_arrendamiento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_pagos_arrendamientos_pago_arrendamiento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 I   DROP SEQUENCE public.tbl_pagos_arrendamientos_pago_arrendamiento_id_seq;
       public          postgres    false    251            �           0    0 2   tbl_pagos_arrendamientos_pago_arrendamiento_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.tbl_pagos_arrendamientos_pago_arrendamiento_id_seq OWNED BY public.tbl_pagos_arrendamientos.pago_arrendamiento_id;
          public          postgres    false    252            �            1259    54396    tbl_pagos_parquimetro    TABLE     �   CREATE TABLE public.tbl_pagos_parquimetro (
    pago_parquimetro_id integer NOT NULL,
    parquimetro_id integer,
    pago_monto numeric(10,2) NOT NULL,
    pago_fecha date
);
 )   DROP TABLE public.tbl_pagos_parquimetro;
       public         heap    postgres    false            �           0    0    TABLE tbl_pagos_parquimetro    COMMENT     :   COMMENT ON TABLE public.tbl_pagos_parquimetro IS 'TRIAL';
          public          postgres    false    253            �           0    0 0   COLUMN tbl_pagos_parquimetro.pago_parquimetro_id    COMMENT     O   COMMENT ON COLUMN public.tbl_pagos_parquimetro.pago_parquimetro_id IS 'TRIAL';
          public          postgres    false    253            �           0    0 +   COLUMN tbl_pagos_parquimetro.parquimetro_id    COMMENT     J   COMMENT ON COLUMN public.tbl_pagos_parquimetro.parquimetro_id IS 'TRIAL';
          public          postgres    false    253            �           0    0 '   COLUMN tbl_pagos_parquimetro.pago_monto    COMMENT     F   COMMENT ON COLUMN public.tbl_pagos_parquimetro.pago_monto IS 'TRIAL';
          public          postgres    false    253            �           0    0 '   COLUMN tbl_pagos_parquimetro.pago_fecha    COMMENT     F   COMMENT ON COLUMN public.tbl_pagos_parquimetro.pago_fecha IS 'TRIAL';
          public          postgres    false    253            �            1259    54399 -   tbl_pagos_parquimetro_pago_parquimetro_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_pagos_parquimetro_pago_parquimetro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 D   DROP SEQUENCE public.tbl_pagos_parquimetro_pago_parquimetro_id_seq;
       public          postgres    false    253            �           0    0 -   tbl_pagos_parquimetro_pago_parquimetro_id_seq    SEQUENCE OWNED BY        ALTER SEQUENCE public.tbl_pagos_parquimetro_pago_parquimetro_id_seq OWNED BY public.tbl_pagos_parquimetro.pago_parquimetro_id;
          public          postgres    false    254            �            1259    54400    tbl_parquimetros    TABLE     5  CREATE TABLE public.tbl_parquimetros (
    parquimetro_id integer NOT NULL,
    vehiculo_id integer,
    punto_servicio_id integer,
    parquimetro_hora_inicio timestamp without time zone NOT NULL,
    parquimetro_hora_fin timestamp without time zone NOT NULL,
    parquimetro_monto numeric(10,2) NOT NULL
);
 $   DROP TABLE public.tbl_parquimetros;
       public         heap    postgres    false            �           0    0    TABLE tbl_parquimetros    COMMENT     5   COMMENT ON TABLE public.tbl_parquimetros IS 'TRIAL';
          public          postgres    false    255            �           0    0 &   COLUMN tbl_parquimetros.parquimetro_id    COMMENT     E   COMMENT ON COLUMN public.tbl_parquimetros.parquimetro_id IS 'TRIAL';
          public          postgres    false    255            �           0    0 #   COLUMN tbl_parquimetros.vehiculo_id    COMMENT     B   COMMENT ON COLUMN public.tbl_parquimetros.vehiculo_id IS 'TRIAL';
          public          postgres    false    255            �           0    0 )   COLUMN tbl_parquimetros.punto_servicio_id    COMMENT     H   COMMENT ON COLUMN public.tbl_parquimetros.punto_servicio_id IS 'TRIAL';
          public          postgres    false    255            �           0    0 /   COLUMN tbl_parquimetros.parquimetro_hora_inicio    COMMENT     N   COMMENT ON COLUMN public.tbl_parquimetros.parquimetro_hora_inicio IS 'TRIAL';
          public          postgres    false    255            �           0    0 ,   COLUMN tbl_parquimetros.parquimetro_hora_fin    COMMENT     K   COMMENT ON COLUMN public.tbl_parquimetros.parquimetro_hora_fin IS 'TRIAL';
          public          postgres    false    255            �           0    0 )   COLUMN tbl_parquimetros.parquimetro_monto    COMMENT     H   COMMENT ON COLUMN public.tbl_parquimetros.parquimetro_monto IS 'TRIAL';
          public          postgres    false    255                        1259    54403 #   tbl_parquimetros_parquimetro_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_parquimetros_parquimetro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.tbl_parquimetros_parquimetro_id_seq;
       public          postgres    false    255            �           0    0 #   tbl_parquimetros_parquimetro_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.tbl_parquimetros_parquimetro_id_seq OWNED BY public.tbl_parquimetros.parquimetro_id;
          public          postgres    false    256                       1259    54404    tbl_prorroga_solicitudes    TABLE     q  CREATE TABLE public.tbl_prorroga_solicitudes (
    prorroga_id integer NOT NULL,
    arrendatario_id integer,
    prorroga_solicitud_solicitud_fecha timestamp without time zone,
    prorroga_solicitud_fecha_propuesta_pago timestamp without time zone NOT NULL,
    prorroga_solicitud_observaciones text,
    prorroga_solicitud_estado character(1) DEFAULT 'P'::bpchar
);
 ,   DROP TABLE public.tbl_prorroga_solicitudes;
       public         heap    postgres    false            �           0    0    TABLE tbl_prorroga_solicitudes    COMMENT     =   COMMENT ON TABLE public.tbl_prorroga_solicitudes IS 'TRIAL';
          public          postgres    false    257            �           0    0 +   COLUMN tbl_prorroga_solicitudes.prorroga_id    COMMENT     J   COMMENT ON COLUMN public.tbl_prorroga_solicitudes.prorroga_id IS 'TRIAL';
          public          postgres    false    257            �           0    0 /   COLUMN tbl_prorroga_solicitudes.arrendatario_id    COMMENT     N   COMMENT ON COLUMN public.tbl_prorroga_solicitudes.arrendatario_id IS 'TRIAL';
          public          postgres    false    257            �           0    0 B   COLUMN tbl_prorroga_solicitudes.prorroga_solicitud_solicitud_fecha    COMMENT     a   COMMENT ON COLUMN public.tbl_prorroga_solicitudes.prorroga_solicitud_solicitud_fecha IS 'TRIAL';
          public          postgres    false    257            �           0    0 G   COLUMN tbl_prorroga_solicitudes.prorroga_solicitud_fecha_propuesta_pago    COMMENT     f   COMMENT ON COLUMN public.tbl_prorroga_solicitudes.prorroga_solicitud_fecha_propuesta_pago IS 'TRIAL';
          public          postgres    false    257            �           0    0 @   COLUMN tbl_prorroga_solicitudes.prorroga_solicitud_observaciones    COMMENT     _   COMMENT ON COLUMN public.tbl_prorroga_solicitudes.prorroga_solicitud_observaciones IS 'TRIAL';
          public          postgres    false    257            �           0    0 9   COLUMN tbl_prorroga_solicitudes.prorroga_solicitud_estado    COMMENT     X   COMMENT ON COLUMN public.tbl_prorroga_solicitudes.prorroga_solicitud_estado IS 'TRIAL';
          public          postgres    false    257                       1259    54410 (   tbl_prorroga_solicitudes_prorroga_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_prorroga_solicitudes_prorroga_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.tbl_prorroga_solicitudes_prorroga_id_seq;
       public          postgres    false    257            �           0    0 (   tbl_prorroga_solicitudes_prorroga_id_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.tbl_prorroga_solicitudes_prorroga_id_seq OWNED BY public.tbl_prorroga_solicitudes.prorroga_id;
          public          postgres    false    258                       1259    54411    tbl_puntos_recaudacion    TABLE     �   CREATE TABLE public.tbl_puntos_recaudacion (
    punto_recaud_id integer NOT NULL,
    puntorecaud_nombre text NOT NULL,
    puntorecaud_estado character(1)
);
 *   DROP TABLE public.tbl_puntos_recaudacion;
       public         heap    postgres    false            �           0    0    TABLE tbl_puntos_recaudacion    COMMENT     ;   COMMENT ON TABLE public.tbl_puntos_recaudacion IS 'TRIAL';
          public          postgres    false    259            �           0    0 -   COLUMN tbl_puntos_recaudacion.punto_recaud_id    COMMENT     L   COMMENT ON COLUMN public.tbl_puntos_recaudacion.punto_recaud_id IS 'TRIAL';
          public          postgres    false    259            �           0    0 0   COLUMN tbl_puntos_recaudacion.puntorecaud_nombre    COMMENT     O   COMMENT ON COLUMN public.tbl_puntos_recaudacion.puntorecaud_nombre IS 'TRIAL';
          public          postgres    false    259            �           0    0 0   COLUMN tbl_puntos_recaudacion.puntorecaud_estado    COMMENT     O   COMMENT ON COLUMN public.tbl_puntos_recaudacion.puntorecaud_estado IS 'TRIAL';
          public          postgres    false    259                       1259    54416 *   tbl_puntos_recaudacion_punto_recaud_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_puntos_recaudacion_punto_recaud_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 A   DROP SEQUENCE public.tbl_puntos_recaudacion_punto_recaud_id_seq;
       public          postgres    false    259            �           0    0 *   tbl_puntos_recaudacion_punto_recaud_id_seq    SEQUENCE OWNED BY     y   ALTER SEQUENCE public.tbl_puntos_recaudacion_punto_recaud_id_seq OWNED BY public.tbl_puntos_recaudacion.punto_recaud_id;
          public          postgres    false    260                       1259    54417    tbl_servicios    TABLE       CREATE TABLE public.tbl_servicios (
    servicio_id integer NOT NULL,
    servicio_abreviatura character varying(10) NOT NULL,
    servicio_descripcion character varying(100) NOT NULL,
    servicio_precio_base numeric(10,2) NOT NULL,
    servicio_estado character(1)
);
 !   DROP TABLE public.tbl_servicios;
       public         heap    postgres    false            �           0    0    TABLE tbl_servicios    COMMENT     2   COMMENT ON TABLE public.tbl_servicios IS 'TRIAL';
          public          postgres    false    261            �           0    0     COLUMN tbl_servicios.servicio_id    COMMENT     ?   COMMENT ON COLUMN public.tbl_servicios.servicio_id IS 'TRIAL';
          public          postgres    false    261            �           0    0 )   COLUMN tbl_servicios.servicio_abreviatura    COMMENT     H   COMMENT ON COLUMN public.tbl_servicios.servicio_abreviatura IS 'TRIAL';
          public          postgres    false    261            �           0    0 )   COLUMN tbl_servicios.servicio_descripcion    COMMENT     H   COMMENT ON COLUMN public.tbl_servicios.servicio_descripcion IS 'TRIAL';
          public          postgres    false    261            �           0    0 )   COLUMN tbl_servicios.servicio_precio_base    COMMENT     H   COMMENT ON COLUMN public.tbl_servicios.servicio_precio_base IS 'TRIAL';
          public          postgres    false    261            �           0    0 $   COLUMN tbl_servicios.servicio_estado    COMMENT     C   COMMENT ON COLUMN public.tbl_servicios.servicio_estado IS 'TRIAL';
          public          postgres    false    261                       1259    54420    tbl_servicios_servicio_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_servicios_servicio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.tbl_servicios_servicio_id_seq;
       public          postgres    false    261            �           0    0    tbl_servicios_servicio_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.tbl_servicios_servicio_id_seq OWNED BY public.tbl_servicios.servicio_id;
          public          postgres    false    262                       1259    54421    tbl_vehiculos    TABLE     �   CREATE TABLE public.tbl_vehiculos (
    vehiculo_id integer NOT NULL,
    vehiculo_nombre character varying(100) NOT NULL,
    vehiculo_celular character varying(15) NOT NULL,
    vehiculo_placa character varying(15) NOT NULL
);
 !   DROP TABLE public.tbl_vehiculos;
       public         heap    postgres    false            �           0    0    TABLE tbl_vehiculos    COMMENT     2   COMMENT ON TABLE public.tbl_vehiculos IS 'TRIAL';
          public          postgres    false    263            �           0    0     COLUMN tbl_vehiculos.vehiculo_id    COMMENT     ?   COMMENT ON COLUMN public.tbl_vehiculos.vehiculo_id IS 'TRIAL';
          public          postgres    false    263            �           0    0 $   COLUMN tbl_vehiculos.vehiculo_nombre    COMMENT     C   COMMENT ON COLUMN public.tbl_vehiculos.vehiculo_nombre IS 'TRIAL';
          public          postgres    false    263            �           0    0 %   COLUMN tbl_vehiculos.vehiculo_celular    COMMENT     D   COMMENT ON COLUMN public.tbl_vehiculos.vehiculo_celular IS 'TRIAL';
          public          postgres    false    263            �           0    0 #   COLUMN tbl_vehiculos.vehiculo_placa    COMMENT     B   COMMENT ON COLUMN public.tbl_vehiculos.vehiculo_placa IS 'TRIAL';
          public          postgres    false    263                       1259    54424    tbl_vehiculos_vehiculo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_vehiculos_vehiculo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.tbl_vehiculos_vehiculo_id_seq;
       public          postgres    false    263            �           0    0    tbl_vehiculos_vehiculo_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.tbl_vehiculos_vehiculo_id_seq OWNED BY public.tbl_vehiculos.vehiculo_id;
          public          postgres    false    264            	           1259    54425    users    TABLE       CREATE TABLE public.users (
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
       public         heap    postgres    false            
           1259    54433    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    265            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    266                       2604    54581    actaentregacab ae_actaid    DEFAULT     �   ALTER TABLE ONLY public.actaentregacab ALTER COLUMN ae_actaid SET DEFAULT nextval('public.actaentregacab_ae_actaid_seq'::regclass);
 G   ALTER TABLE public.actaentregacab ALTER COLUMN ae_actaid DROP DEFAULT;
       public          postgres    false    269    270    270                       2604    54574    actaentregadet aed_actaid    DEFAULT     �   ALTER TABLE ONLY public.actaentregadet ALTER COLUMN aed_actaid SET DEFAULT nextval('public.actaentregadet_aed_actaid_seq'::regclass);
 H   ALTER TABLE public.actaentregadet ALTER COLUMN aed_actaid DROP DEFAULT;
       public          postgres    false    268    267    268                       2604    54590     arqueorecaudacioncab arqueorecid    DEFAULT     �   ALTER TABLE ONLY public.arqueorecaudacioncab ALTER COLUMN arqueorecid SET DEFAULT nextval('public.arqueorecaudacioncab_arqueorecid_seq'::regclass);
 O   ALTER TABLE public.arqueorecaudacioncab ALTER COLUMN arqueorecid DROP DEFAULT;
       public          postgres    false    271    272    272                       2604    54599 #   arqueorecaudaciondet arqueorecdetid    DEFAULT     �   ALTER TABLE ONLY public.arqueorecaudaciondet ALTER COLUMN arqueorecdetid SET DEFAULT nextval('public.arqueorecaudaciondet_arqueorecdetid_seq'::regclass);
 R   ALTER TABLE public.arqueorecaudaciondet ALTER COLUMN arqueorecdetid DROP DEFAULT;
       public          postgres    false    273    274    274            �           2604    54434    failed_jobs id    DEFAULT     p   ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);
 =   ALTER TABLE public.failed_jobs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            �           2604    54435    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            �           2604    54436    oauth_clients id    DEFAULT     t   ALTER TABLE ONLY public.oauth_clients ALTER COLUMN id SET DEFAULT nextval('public.oauth_clients_id_seq'::regclass);
 ?   ALTER TABLE public.oauth_clients ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223            �           2604    54437     oauth_personal_access_clients id    DEFAULT     �   ALTER TABLE ONLY public.oauth_personal_access_clients ALTER COLUMN id SET DEFAULT nextval('public.oauth_personal_access_clients_id_seq'::regclass);
 O   ALTER TABLE public.oauth_personal_access_clients ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225            �           2604    54438    personal_access_tokens id    DEFAULT     �   ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);
 H   ALTER TABLE public.personal_access_tokens ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229            �           2604    54439    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231            �           2604    54440 #   tbl_arrendamientos arrendamiento_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_arrendamientos ALTER COLUMN arrendamiento_id SET DEFAULT nextval('public.tbl_arrendamientos_arrendamiento_id_seq'::regclass);
 R   ALTER TABLE public.tbl_arrendamientos ALTER COLUMN arrendamiento_id DROP DEFAULT;
       public          postgres    false    234    233            �           2604    54441 *   tbl_arrendamientos_documentos documento_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_arrendamientos_documentos ALTER COLUMN documento_id SET DEFAULT nextval('public.tbl_arrendamientos_documentos_documento_id_seq'::regclass);
 Y   ALTER TABLE public.tbl_arrendamientos_documentos ALTER COLUMN documento_id DROP DEFAULT;
       public          postgres    false    236    235            �           2604    54442    tbl_edificio edificio_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_edificio ALTER COLUMN edificio_id SET DEFAULT nextval('public.tbl_edificio_edificio_id_seq'::regclass);
 G   ALTER TABLE public.tbl_edificio ALTER COLUMN edificio_id DROP DEFAULT;
       public          postgres    false    240    237            �           2604    54443 !   tbl_edificio_ambiente ambiente_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_edificio_ambiente ALTER COLUMN ambiente_id SET DEFAULT nextval('public.tbl_edificio_ambiente_ambiente_id_seq'::regclass);
 P   ALTER TABLE public.tbl_edificio_ambiente ALTER COLUMN ambiente_id DROP DEFAULT;
       public          postgres    false    239    238            �           2604    54444    tbl_edificio_nivel nivel_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_edificio_nivel ALTER COLUMN nivel_id SET DEFAULT nextval('public.tbl_edificio_nivel_nivel_id_seq'::regclass);
 J   ALTER TABLE public.tbl_edificio_nivel ALTER COLUMN nivel_id DROP DEFAULT;
       public          postgres    false    242    241            �           2604    54445    tbl_edificio_seccion seccion_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_edificio_seccion ALTER COLUMN seccion_id SET DEFAULT nextval('public.tbl_edificio_seccion_seccion_id_seq'::regclass);
 N   ALTER TABLE public.tbl_edificio_seccion ALTER COLUMN seccion_id DROP DEFAULT;
       public          postgres    false    244    243            �           2604    54446    tbl_factura_detalle detalle_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_factura_detalle ALTER COLUMN detalle_id SET DEFAULT nextval('public.tbl_factura_detalle_detalle_id_seq'::regclass);
 M   ALTER TABLE public.tbl_factura_detalle ALTER COLUMN detalle_id DROP DEFAULT;
       public          postgres    false    246    245            �           2604    54447    tbl_facturas factura_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_facturas ALTER COLUMN factura_id SET DEFAULT nextval('public.tbl_facturas_factura_id_seq'::regclass);
 F   ALTER TABLE public.tbl_facturas ALTER COLUMN factura_id DROP DEFAULT;
       public          postgres    false    248    247                        2604    54448    tbl_operadores operador_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_operadores ALTER COLUMN operador_id SET DEFAULT nextval('public.tbl_operadores_operador_id_seq'::regclass);
 I   ALTER TABLE public.tbl_operadores ALTER COLUMN operador_id DROP DEFAULT;
       public          postgres    false    250    249                       2604    54449 .   tbl_pagos_arrendamientos pago_arrendamiento_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_pagos_arrendamientos ALTER COLUMN pago_arrendamiento_id SET DEFAULT nextval('public.tbl_pagos_arrendamientos_pago_arrendamiento_id_seq'::regclass);
 ]   ALTER TABLE public.tbl_pagos_arrendamientos ALTER COLUMN pago_arrendamiento_id DROP DEFAULT;
       public          postgres    false    252    251                       2604    54450 )   tbl_pagos_parquimetro pago_parquimetro_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_pagos_parquimetro ALTER COLUMN pago_parquimetro_id SET DEFAULT nextval('public.tbl_pagos_parquimetro_pago_parquimetro_id_seq'::regclass);
 X   ALTER TABLE public.tbl_pagos_parquimetro ALTER COLUMN pago_parquimetro_id DROP DEFAULT;
       public          postgres    false    254    253                       2604    54451    tbl_parquimetros parquimetro_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_parquimetros ALTER COLUMN parquimetro_id SET DEFAULT nextval('public.tbl_parquimetros_parquimetro_id_seq'::regclass);
 N   ALTER TABLE public.tbl_parquimetros ALTER COLUMN parquimetro_id DROP DEFAULT;
       public          postgres    false    256    255                       2604    54452 $   tbl_prorroga_solicitudes prorroga_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_prorroga_solicitudes ALTER COLUMN prorroga_id SET DEFAULT nextval('public.tbl_prorroga_solicitudes_prorroga_id_seq'::regclass);
 S   ALTER TABLE public.tbl_prorroga_solicitudes ALTER COLUMN prorroga_id DROP DEFAULT;
       public          postgres    false    258    257                       2604    54453 &   tbl_puntos_recaudacion punto_recaud_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_puntos_recaudacion ALTER COLUMN punto_recaud_id SET DEFAULT nextval('public.tbl_puntos_recaudacion_punto_recaud_id_seq'::regclass);
 U   ALTER TABLE public.tbl_puntos_recaudacion ALTER COLUMN punto_recaud_id DROP DEFAULT;
       public          postgres    false    260    259                       2604    54454    tbl_servicios servicio_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_servicios ALTER COLUMN servicio_id SET DEFAULT nextval('public.tbl_servicios_servicio_id_seq'::regclass);
 H   ALTER TABLE public.tbl_servicios ALTER COLUMN servicio_id DROP DEFAULT;
       public          postgres    false    262    261                       2604    54455    tbl_vehiculos vehiculo_id    DEFAULT     �   ALTER TABLE ONLY public.tbl_vehiculos ALTER COLUMN vehiculo_id SET DEFAULT nextval('public.tbl_vehiculos_vehiculo_id_seq'::regclass);
 H   ALTER TABLE public.tbl_vehiculos ALTER COLUMN vehiculo_id DROP DEFAULT;
       public          postgres    false    264    263            	           2604    54456    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    266    265            ;          0    54578    actaentregacab 
   TABLE DATA           Y  COPY public.actaentregacab (ae_actaid, ae_correlativo, punto_recaud_id, ae_fecha, ae_grupo, ae_operador1erturno, ae_operador2doturno, ae_cambiobs, ae_cajachicabs, ae_llaves, ae_fechero, ae_tampo, ae_candados, ae_observacion, ae_recaudaciontotalbs, ae_usuario, ae_usuarioarqueo, ae_fecharegistro, ae_fechaarqueo, ae_estado, arqueoid) FROM stdin;
    public          postgres    false    270   %�      9          0    54571    actaentregadet 
   TABLE DATA           �   COPY public.actaentregadet (aed_actaid, ae_actaid, servicio_id, aed_desdenumero, aed_hastanumero, aed_vendidohasta, aed_cantidad, aed_importebs, aed_estado, aed_preciounitario) FROM stdin;
    public          postgres    false    268   m�                0    54272 	   arqueocab 
   TABLE DATA             COPY public.arqueocab (arqueoid, arqueonumero, arqueofecha, arqueoturno, arqueohorainicio, arqueohorafin, arqueosupervisor, arqueorealizadopor, arqueorevisadopor, arqueorecaudaciontotal, arqueodiferencia, arqueoobservacion, arqueoestado, arqueofecharegistro, arqueousuario) FROM stdin;
    public          postgres    false    215   ��                0    54278    arqueodetcortes 
   TABLE DATA           $  COPY public.arqueodetcortes (arqueodetcorteid, arqueoid, arqueocorte200_00, arqueocorte100_00, arqueocorte050_00, arqueocorte020_00, arqueocorte010_00, arqueocorte005_00, arqueocorte002_00, arqueocorte001_00, arqueocorte000_50, arqueocorte000_20, arqueocorte000_10, arqueoestado) FROM stdin;
    public          postgres    false    216   ��      =          0    54587    arqueorecaudacioncab 
   TABLE DATA           �   COPY public.arqueorecaudacioncab (arqueorecid, arqueocorrelativo, arqueofecha, arqueoturno, punto_recaud_id, arqueonombreoperador, arqueousuario, arqueofecharegistro, arqueoid, arqueoestado) FROM stdin;
    public          postgres    false    272   �      ?          0    54596    arqueorecaudaciondet 
   TABLE DATA           �   COPY public.arqueorecaudaciondet (arqueorecdetid, arqueorecid, servicio_id, arqueodetcantidad, arqueodettarifabs, arqueodetimportebs, arqueoestado) FROM stdin;
    public          postgres    false    274   \�                0    54284    failed_jobs 
   TABLE DATA           a   COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
    public          postgres    false    217   ��                0    54291 
   migrations 
   TABLE DATA           :   COPY public.migrations (id, migration, batch) FROM stdin;
    public          postgres    false    219   ��      
          0    54295    oauth_access_tokens 
   TABLE DATA           �   COPY public.oauth_access_tokens (id, user_id, client_id, name, scopes, revoked, created_at, updated_at, expires_at) FROM stdin;
    public          postgres    false    221   \�                0    54300    oauth_auth_codes 
   TABLE DATA           _   COPY public.oauth_auth_codes (id, user_id, client_id, scopes, revoked, expires_at) FROM stdin;
    public          postgres    false    222   �                0    54305    oauth_clients 
   TABLE DATA           �   COPY public.oauth_clients (id, user_id, name, secret, provider, redirect, personal_access_client, password_client, revoked, created_at, updated_at) FROM stdin;
    public          postgres    false    223   !�                0    54311    oauth_personal_access_clients 
   TABLE DATA           ^   COPY public.oauth_personal_access_clients (id, client_id, created_at, updated_at) FROM stdin;
    public          postgres    false    225   ��                0    54315    oauth_refresh_tokens 
   TABLE DATA           X   COPY public.oauth_refresh_tokens (id, access_token_id, revoked, expires_at) FROM stdin;
    public          postgres    false    227   ��                0    54318    password_reset_tokens 
   TABLE DATA           I   COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
    public          postgres    false    228   �                0    54323    personal_access_tokens 
   TABLE DATA           �   COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
    public          postgres    false    229   6�                0    54329    roles 
   TABLE DATA           @   COPY public.roles (id, role_name, role_description) FROM stdin;
    public          postgres    false    231   S�                0    54335    tbl_arrendamientos 
   TABLE DATA           �  COPY public.tbl_arrendamientos (arrendamiento_id, ambiente_id, num_contrato, operador_nombre, arrendatario_nombre, arrendatario_apellido_paterno, arrendatario_apellido_materno, arrendatario_ci, arrendatario_nombre_comercial, arrendatario_telefono, arrendatario_celular, ambiente_codigo, arrendamiento_fecha_inicio, arrendamiento_fecha_fin, arrendamiento_canon, arrendamiento_funcion, arrendamiento_forma_pago, arrendamiento_estado) FROM stdin;
    public          postgres    false    233   ��                0    54342    tbl_arrendamientos_documentos 
   TABLE DATA           �   COPY public.tbl_arrendamientos_documentos (documento_id, arrendamiento_id, documento_tipo, documento_nombre, documento_url, documento_descripcion, fecha_subida, documento_estado) FROM stdin;
    public          postgres    false    235   ��                0    54348    tbl_edificio 
   TABLE DATA           X   COPY public.tbl_edificio (edificio_id, edificio_nombre, edificio_direccion) FROM stdin;
    public          postgres    false    237   ��                0    54353    tbl_edificio_ambiente 
   TABLE DATA           �   COPY public.tbl_edificio_ambiente (ambiente_id, seccion_id, ambiente_nombre, ambiente_tamano, ambiente_tipo_uso, ambiente_precio_alquiler, ambiente_codigo_interno, ambiente_superficie_m2, ambiente_estado) FROM stdin;
    public          postgres    false    238   �                0    54360    tbl_edificio_nivel 
   TABLE DATA           _   COPY public.tbl_edificio_nivel (nivel_id, edificio_id, nivel_nombre, nivel_estado) FROM stdin;
    public          postgres    false    241   $�                 0    54366    tbl_edificio_seccion 
   TABLE DATA           d   COPY public.tbl_edificio_seccion (seccion_id, nivel_id, seccion_nombre, seccion_estado) FROM stdin;
    public          postgres    false    243   A�      "          0    54372    tbl_factura_detalle 
   TABLE DATA             COPY public.tbl_factura_detalle (detalle_id, factura_id, arrendamiento_id, fact_detalle_periodo_pago, fact_detalle_canon_alquiler, fact_detalle_morosidad_penalidad, fact_detalle_dias_morosidad, fact_detalle_total_mora, fact_detalle_importe_bs, fact_detalle_observaciones) FROM stdin;
    public          postgres    false    245   ^�      $          0    54381    tbl_facturas 
   TABLE DATA           �   COPY public.tbl_facturas (factura_id, arrendatario_nombre, arrendatario_ci, factura_numero, factura_fecha_emision, factura_total, factura_fecha_pago, factura_estado) FROM stdin;
    public          postgres    false    247   {�      &          0    54388    tbl_operadores 
   TABLE DATA           N   COPY public.tbl_operadores (operador_id, per_id, operador_estado) FROM stdin;
    public          postgres    false    249   ��      (          0    54392    tbl_pagos_arrendamientos 
   TABLE DATA           �   COPY public.tbl_pagos_arrendamientos (pago_arrendamiento_id, arrendamiento_id, pago_monto, pago_fecha, pago_estado) FROM stdin;
    public          postgres    false    251   ��      *          0    54396    tbl_pagos_parquimetro 
   TABLE DATA           l   COPY public.tbl_pagos_parquimetro (pago_parquimetro_id, parquimetro_id, pago_monto, pago_fecha) FROM stdin;
    public          postgres    false    253   ��      ,          0    54400    tbl_parquimetros 
   TABLE DATA           �   COPY public.tbl_parquimetros (parquimetro_id, vehiculo_id, punto_servicio_id, parquimetro_hora_inicio, parquimetro_hora_fin, parquimetro_monto) FROM stdin;
    public          postgres    false    255   �      .          0    54404    tbl_prorroga_solicitudes 
   TABLE DATA           �   COPY public.tbl_prorroga_solicitudes (prorroga_id, arrendatario_id, prorroga_solicitud_solicitud_fecha, prorroga_solicitud_fecha_propuesta_pago, prorroga_solicitud_observaciones, prorroga_solicitud_estado) FROM stdin;
    public          postgres    false    257   4�      0          0    54411    tbl_puntos_recaudacion 
   TABLE DATA           i   COPY public.tbl_puntos_recaudacion (punto_recaud_id, puntorecaud_nombre, puntorecaud_estado) FROM stdin;
    public          postgres    false    259   Q�      2          0    54417    tbl_servicios 
   TABLE DATA           �   COPY public.tbl_servicios (servicio_id, servicio_abreviatura, servicio_descripcion, servicio_precio_base, servicio_estado) FROM stdin;
    public          postgres    false    261   �      4          0    54421    tbl_vehiculos 
   TABLE DATA           g   COPY public.tbl_vehiculos (vehiculo_id, vehiculo_nombre, vehiculo_celular, vehiculo_placa) FROM stdin;
    public          postgres    false    263   ��      6          0    54425    users 
   TABLE DATA           �   COPY public.users (id, username, email, password, firstname, lastname, photo, role_id, account_status, created_at, updated_at) FROM stdin;
    public          postgres    false    265   �      �           0    0    actaentregacab_ae_actaid_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.actaentregacab_ae_actaid_seq', 1, true);
          public          postgres    false    269            �           0    0    actaentregadet_aed_actaid_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.actaentregadet_aed_actaid_seq', 1, true);
          public          postgres    false    267            �           0    0 $   arqueorecaudacioncab_arqueorecid_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.arqueorecaudacioncab_arqueorecid_seq', 2, true);
          public          postgres    false    271            �           0    0 '   arqueorecaudaciondet_arqueorecdetid_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.arqueorecaudaciondet_arqueorecdetid_seq', 2, true);
          public          postgres    false    273            �           0    0    failed_jobs_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);
          public          postgres    false    218            �           0    0    migrations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.migrations_id_seq', 8, true);
          public          postgres    false    220            �           0    0    oauth_clients_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.oauth_clients_id_seq', 6, true);
          public          postgres    false    224            �           0    0 $   oauth_personal_access_clients_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.oauth_personal_access_clients_id_seq', 3, true);
          public          postgres    false    226            �           0    0    personal_access_tokens_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 1, false);
          public          postgres    false    230            �           0    0    roles_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.roles_id_seq', 2, true);
          public          postgres    false    232            �           0    0 '   tbl_arrendamientos_arrendamiento_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public.tbl_arrendamientos_arrendamiento_id_seq', 1, false);
          public          postgres    false    234            �           0    0 .   tbl_arrendamientos_documentos_documento_id_seq    SEQUENCE SET     ]   SELECT pg_catalog.setval('public.tbl_arrendamientos_documentos_documento_id_seq', 1, false);
          public          postgres    false    236                        0    0 %   tbl_edificio_ambiente_ambiente_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.tbl_edificio_ambiente_ambiente_id_seq', 1, false);
          public          postgres    false    239                       0    0    tbl_edificio_edificio_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.tbl_edificio_edificio_id_seq', 1, false);
          public          postgres    false    240                       0    0    tbl_edificio_nivel_nivel_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.tbl_edificio_nivel_nivel_id_seq', 1, false);
          public          postgres    false    242                       0    0 #   tbl_edificio_seccion_seccion_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.tbl_edificio_seccion_seccion_id_seq', 1, false);
          public          postgres    false    244                       0    0 "   tbl_factura_detalle_detalle_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.tbl_factura_detalle_detalle_id_seq', 1, false);
          public          postgres    false    246                       0    0    tbl_facturas_factura_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.tbl_facturas_factura_id_seq', 1, false);
          public          postgres    false    248                       0    0    tbl_operadores_operador_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.tbl_operadores_operador_id_seq', 10, true);
          public          postgres    false    250                       0    0 2   tbl_pagos_arrendamientos_pago_arrendamiento_id_seq    SEQUENCE SET     a   SELECT pg_catalog.setval('public.tbl_pagos_arrendamientos_pago_arrendamiento_id_seq', 1, false);
          public          postgres    false    252                       0    0 -   tbl_pagos_parquimetro_pago_parquimetro_id_seq    SEQUENCE SET     \   SELECT pg_catalog.setval('public.tbl_pagos_parquimetro_pago_parquimetro_id_seq', 1, false);
          public          postgres    false    254            	           0    0 #   tbl_parquimetros_parquimetro_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.tbl_parquimetros_parquimetro_id_seq', 1, false);
          public          postgres    false    256            
           0    0 (   tbl_prorroga_solicitudes_prorroga_id_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.tbl_prorroga_solicitudes_prorroga_id_seq', 1, false);
          public          postgres    false    258                       0    0 *   tbl_puntos_recaudacion_punto_recaud_id_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public.tbl_puntos_recaudacion_punto_recaud_id_seq', 15, true);
          public          postgres    false    260                       0    0    tbl_servicios_servicio_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.tbl_servicios_servicio_id_seq', 10, true);
          public          postgres    false    262                       0    0    tbl_vehiculos_vehiculo_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.tbl_vehiculos_vehiculo_id_seq', 1, false);
          public          postgres    false    264                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    266            m           2606    54585 "   actaentregacab actaentregacab_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.actaentregacab
    ADD CONSTRAINT actaentregacab_pkey PRIMARY KEY (ae_actaid);
 L   ALTER TABLE ONLY public.actaentregacab DROP CONSTRAINT actaentregacab_pkey;
       public            postgres    false    270            k           2606    54576 "   actaentregadet actaentregadet_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.actaentregadet
    ADD CONSTRAINT actaentregadet_pkey PRIMARY KEY (aed_actaid);
 L   ALTER TABLE ONLY public.actaentregadet DROP CONSTRAINT actaentregadet_pkey;
       public            postgres    false    268            o           2606    54594 .   arqueorecaudacioncab arqueorecaudacioncab_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.arqueorecaudacioncab
    ADD CONSTRAINT arqueorecaudacioncab_pkey PRIMARY KEY (arqueorecid);
 X   ALTER TABLE ONLY public.arqueorecaudacioncab DROP CONSTRAINT arqueorecaudacioncab_pkey;
       public            postgres    false    272            q           2606    54601 .   arqueorecaudaciondet arqueorecaudaciondet_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.arqueorecaudaciondet
    ADD CONSTRAINT arqueorecaudaciondet_pkey PRIMARY KEY (arqueorecdetid);
 X   ALTER TABLE ONLY public.arqueorecaudaciondet DROP CONSTRAINT arqueorecaudaciondet_pkey;
       public            postgres    false    274                       2606    54458    failed_jobs failed_jobs_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_pkey;
       public            postgres    false    217                       2606    54460 #   failed_jobs failed_jobs_uuid_unique 
   CONSTRAINT     ^   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);
 M   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_uuid_unique;
       public            postgres    false    217                       2606    54462    migrations migrations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.migrations DROP CONSTRAINT migrations_pkey;
       public            postgres    false    219                       2606    54464 ,   oauth_access_tokens oauth_access_tokens_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.oauth_access_tokens
    ADD CONSTRAINT oauth_access_tokens_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.oauth_access_tokens DROP CONSTRAINT oauth_access_tokens_pkey;
       public            postgres    false    221                        2606    54466 &   oauth_auth_codes oauth_auth_codes_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.oauth_auth_codes
    ADD CONSTRAINT oauth_auth_codes_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.oauth_auth_codes DROP CONSTRAINT oauth_auth_codes_pkey;
       public            postgres    false    222            #           2606    54468     oauth_clients oauth_clients_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.oauth_clients DROP CONSTRAINT oauth_clients_pkey;
       public            postgres    false    223            &           2606    54470 @   oauth_personal_access_clients oauth_personal_access_clients_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.oauth_personal_access_clients
    ADD CONSTRAINT oauth_personal_access_clients_pkey PRIMARY KEY (id);
 j   ALTER TABLE ONLY public.oauth_personal_access_clients DROP CONSTRAINT oauth_personal_access_clients_pkey;
       public            postgres    false    225            )           2606    54472 .   oauth_refresh_tokens oauth_refresh_tokens_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.oauth_refresh_tokens
    ADD CONSTRAINT oauth_refresh_tokens_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.oauth_refresh_tokens DROP CONSTRAINT oauth_refresh_tokens_pkey;
       public            postgres    false    227            +           2606    54474 0   password_reset_tokens password_reset_tokens_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);
 Z   ALTER TABLE ONLY public.password_reset_tokens DROP CONSTRAINT password_reset_tokens_pkey;
       public            postgres    false    228            -           2606    54476 2   personal_access_tokens personal_access_tokens_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_pkey;
       public            postgres    false    229            /           2606    54478 :   personal_access_tokens personal_access_tokens_token_unique 
   CONSTRAINT     v   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);
 d   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_token_unique;
       public            postgres    false    229                       2606    54484    arqueocab pk_arqueocab 
   CONSTRAINT     Z   ALTER TABLE ONLY public.arqueocab
    ADD CONSTRAINT pk_arqueocab PRIMARY KEY (arqueoid);
 @   ALTER TABLE ONLY public.arqueocab DROP CONSTRAINT pk_arqueocab;
       public            postgres    false    215                       2606    54486 "   arqueodetcortes pk_arqueodetcortes 
   CONSTRAINT     n   ALTER TABLE ONLY public.arqueodetcortes
    ADD CONSTRAINT pk_arqueodetcortes PRIMARY KEY (arqueodetcorteid);
 L   ALTER TABLE ONLY public.arqueodetcortes DROP CONSTRAINT pk_arqueodetcortes;
       public            postgres    false    216            7           2606    54490 (   tbl_arrendamientos pk_tbl_arrendamientos 
   CONSTRAINT     t   ALTER TABLE ONLY public.tbl_arrendamientos
    ADD CONSTRAINT pk_tbl_arrendamientos PRIMARY KEY (arrendamiento_id);
 R   ALTER TABLE ONLY public.tbl_arrendamientos DROP CONSTRAINT pk_tbl_arrendamientos;
       public            postgres    false    233            :           2606    54492 >   tbl_arrendamientos_documentos pk_tbl_arrendamientos_documentos 
   CONSTRAINT     �   ALTER TABLE ONLY public.tbl_arrendamientos_documentos
    ADD CONSTRAINT pk_tbl_arrendamientos_documentos PRIMARY KEY (documento_id);
 h   ALTER TABLE ONLY public.tbl_arrendamientos_documentos DROP CONSTRAINT pk_tbl_arrendamientos_documentos;
       public            postgres    false    235            <           2606    54494    tbl_edificio pk_tbl_edificio 
   CONSTRAINT     c   ALTER TABLE ONLY public.tbl_edificio
    ADD CONSTRAINT pk_tbl_edificio PRIMARY KEY (edificio_id);
 F   ALTER TABLE ONLY public.tbl_edificio DROP CONSTRAINT pk_tbl_edificio;
       public            postgres    false    237            ?           2606    54496 .   tbl_edificio_ambiente pk_tbl_edificio_ambiente 
   CONSTRAINT     u   ALTER TABLE ONLY public.tbl_edificio_ambiente
    ADD CONSTRAINT pk_tbl_edificio_ambiente PRIMARY KEY (ambiente_id);
 X   ALTER TABLE ONLY public.tbl_edificio_ambiente DROP CONSTRAINT pk_tbl_edificio_ambiente;
       public            postgres    false    238            B           2606    54498 (   tbl_edificio_nivel pk_tbl_edificio_nivel 
   CONSTRAINT     l   ALTER TABLE ONLY public.tbl_edificio_nivel
    ADD CONSTRAINT pk_tbl_edificio_nivel PRIMARY KEY (nivel_id);
 R   ALTER TABLE ONLY public.tbl_edificio_nivel DROP CONSTRAINT pk_tbl_edificio_nivel;
       public            postgres    false    241            E           2606    54500 ,   tbl_edificio_seccion pk_tbl_edificio_seccion 
   CONSTRAINT     r   ALTER TABLE ONLY public.tbl_edificio_seccion
    ADD CONSTRAINT pk_tbl_edificio_seccion PRIMARY KEY (seccion_id);
 V   ALTER TABLE ONLY public.tbl_edificio_seccion DROP CONSTRAINT pk_tbl_edificio_seccion;
       public            postgres    false    243            I           2606    54502 *   tbl_factura_detalle pk_tbl_factura_detalle 
   CONSTRAINT     p   ALTER TABLE ONLY public.tbl_factura_detalle
    ADD CONSTRAINT pk_tbl_factura_detalle PRIMARY KEY (detalle_id);
 T   ALTER TABLE ONLY public.tbl_factura_detalle DROP CONSTRAINT pk_tbl_factura_detalle;
       public            postgres    false    245            K           2606    54504    tbl_facturas pk_tbl_facturas 
   CONSTRAINT     b   ALTER TABLE ONLY public.tbl_facturas
    ADD CONSTRAINT pk_tbl_facturas PRIMARY KEY (factura_id);
 F   ALTER TABLE ONLY public.tbl_facturas DROP CONSTRAINT pk_tbl_facturas;
       public            postgres    false    247            M           2606    54506     tbl_operadores pk_tbl_operadores 
   CONSTRAINT     g   ALTER TABLE ONLY public.tbl_operadores
    ADD CONSTRAINT pk_tbl_operadores PRIMARY KEY (operador_id);
 J   ALTER TABLE ONLY public.tbl_operadores DROP CONSTRAINT pk_tbl_operadores;
       public            postgres    false    249            P           2606    54508 4   tbl_pagos_arrendamientos pk_tbl_pagos_arrendamientos 
   CONSTRAINT     �   ALTER TABLE ONLY public.tbl_pagos_arrendamientos
    ADD CONSTRAINT pk_tbl_pagos_arrendamientos PRIMARY KEY (pago_arrendamiento_id);
 ^   ALTER TABLE ONLY public.tbl_pagos_arrendamientos DROP CONSTRAINT pk_tbl_pagos_arrendamientos;
       public            postgres    false    251            S           2606    54510 .   tbl_pagos_parquimetro pk_tbl_pagos_parquimetro 
   CONSTRAINT     }   ALTER TABLE ONLY public.tbl_pagos_parquimetro
    ADD CONSTRAINT pk_tbl_pagos_parquimetro PRIMARY KEY (pago_parquimetro_id);
 X   ALTER TABLE ONLY public.tbl_pagos_parquimetro DROP CONSTRAINT pk_tbl_pagos_parquimetro;
       public            postgres    false    253            W           2606    54512 $   tbl_parquimetros pk_tbl_parquimetros 
   CONSTRAINT     n   ALTER TABLE ONLY public.tbl_parquimetros
    ADD CONSTRAINT pk_tbl_parquimetros PRIMARY KEY (parquimetro_id);
 N   ALTER TABLE ONLY public.tbl_parquimetros DROP CONSTRAINT pk_tbl_parquimetros;
       public            postgres    false    255            Z           2606    54514 4   tbl_prorroga_solicitudes pk_tbl_prorroga_solicitudes 
   CONSTRAINT     {   ALTER TABLE ONLY public.tbl_prorroga_solicitudes
    ADD CONSTRAINT pk_tbl_prorroga_solicitudes PRIMARY KEY (prorroga_id);
 ^   ALTER TABLE ONLY public.tbl_prorroga_solicitudes DROP CONSTRAINT pk_tbl_prorroga_solicitudes;
       public            postgres    false    257            \           2606    54516 0   tbl_puntos_recaudacion pk_tbl_puntos_recaudacion 
   CONSTRAINT     {   ALTER TABLE ONLY public.tbl_puntos_recaudacion
    ADD CONSTRAINT pk_tbl_puntos_recaudacion PRIMARY KEY (punto_recaud_id);
 Z   ALTER TABLE ONLY public.tbl_puntos_recaudacion DROP CONSTRAINT pk_tbl_puntos_recaudacion;
       public            postgres    false    259            ^           2606    54518    tbl_servicios pk_tbl_servicios 
   CONSTRAINT     e   ALTER TABLE ONLY public.tbl_servicios
    ADD CONSTRAINT pk_tbl_servicios PRIMARY KEY (servicio_id);
 H   ALTER TABLE ONLY public.tbl_servicios DROP CONSTRAINT pk_tbl_servicios;
       public            postgres    false    261            `           2606    54520    tbl_vehiculos pk_tbl_vehiculos 
   CONSTRAINT     e   ALTER TABLE ONLY public.tbl_vehiculos
    ADD CONSTRAINT pk_tbl_vehiculos PRIMARY KEY (vehiculo_id);
 H   ALTER TABLE ONLY public.tbl_vehiculos DROP CONSTRAINT pk_tbl_vehiculos;
       public            postgres    false    263            2           2606    54522    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    231            4           2606    54524    roles roles_role_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);
 C   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_role_name_key;
       public            postgres    false    231            e           2606    54526    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    265            g           2606    54528    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    265            i           2606    54530    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    265                       1259    54532    fk__arqueodet__arque__6e01572d    INDEX     ^   CREATE INDEX fk__arqueodet__arque__6e01572d ON public.arqueodetcortes USING btree (arqueoid);
 2   DROP INDEX public.fk__arqueodet__arque__6e01572d;
       public            postgres    false    216            5           1259    54533    fk__tbl_arren__ambie__300424b4    INDEX     d   CREATE INDEX fk__tbl_arren__ambie__300424b4 ON public.tbl_arrendamientos USING btree (ambiente_id);
 2   DROP INDEX public.fk__tbl_arren__ambie__300424b4;
       public            postgres    false    233            8           1259    54534    fk__tbl_arren__arren__33d4b598    INDEX     t   CREATE INDEX fk__tbl_arren__arren__33d4b598 ON public.tbl_arrendamientos_documentos USING btree (arrendamiento_id);
 2   DROP INDEX public.fk__tbl_arren__arren__33d4b598;
       public            postgres    false    235            @           1259    54535    fk__tbl_edifi__edifi__267aba7a    INDEX     d   CREATE INDEX fk__tbl_edifi__edifi__267aba7a ON public.tbl_edificio_nivel USING btree (edificio_id);
 2   DROP INDEX public.fk__tbl_edifi__edifi__267aba7a;
       public            postgres    false    241            C           1259    54536    fk__tbl_edifi__nivel__29572725    INDEX     c   CREATE INDEX fk__tbl_edifi__nivel__29572725 ON public.tbl_edificio_seccion USING btree (nivel_id);
 2   DROP INDEX public.fk__tbl_edifi__nivel__29572725;
       public            postgres    false    243            =           1259    54537    fk__tbl_edifi__secci__2d27b809    INDEX     f   CREATE INDEX fk__tbl_edifi__secci__2d27b809 ON public.tbl_edificio_ambiente USING btree (seccion_id);
 2   DROP INDEX public.fk__tbl_edifi__secci__2d27b809;
       public            postgres    false    238            F           1259    54538    fk__tbl_factu__arren__3d5e1fd2    INDEX     j   CREATE INDEX fk__tbl_factu__arren__3d5e1fd2 ON public.tbl_factura_detalle USING btree (arrendamiento_id);
 2   DROP INDEX public.fk__tbl_factu__arren__3d5e1fd2;
       public            postgres    false    245            G           1259    54539    fk__tbl_factu__factu__3c69fb99    INDEX     d   CREATE INDEX fk__tbl_factu__factu__3c69fb99 ON public.tbl_factura_detalle USING btree (factura_id);
 2   DROP INDEX public.fk__tbl_factu__factu__3c69fb99;
       public            postgres    false    245            N           1259    54540    fk__tbl_pagos__arren__48cfd27e    INDEX     o   CREATE INDEX fk__tbl_pagos__arren__48cfd27e ON public.tbl_pagos_arrendamientos USING btree (arrendamiento_id);
 2   DROP INDEX public.fk__tbl_pagos__arren__48cfd27e;
       public            postgres    false    251            Q           1259    54541    fk__tbl_pagos__parqu__59fa5e80    INDEX     j   CREATE INDEX fk__tbl_pagos__parqu__59fa5e80 ON public.tbl_pagos_parquimetro USING btree (parquimetro_id);
 2   DROP INDEX public.fk__tbl_pagos__parqu__59fa5e80;
       public            postgres    false    253            T           1259    54542    fk__tbl_parqu__punto__5535a963    INDEX     h   CREATE INDEX fk__tbl_parqu__punto__5535a963 ON public.tbl_parquimetros USING btree (punto_servicio_id);
 2   DROP INDEX public.fk__tbl_parqu__punto__5535a963;
       public            postgres    false    255            U           1259    54543    fk__tbl_parqu__vehic__5441852a    INDEX     b   CREATE INDEX fk__tbl_parqu__vehic__5441852a ON public.tbl_parquimetros USING btree (vehiculo_id);
 2   DROP INDEX public.fk__tbl_parqu__vehic__5441852a;
       public            postgres    false    255            X           1259    54544    fk__tbl_prorr__arren__440b1d61    INDEX     n   CREATE INDEX fk__tbl_prorr__arren__440b1d61 ON public.tbl_prorroga_solicitudes USING btree (arrendatario_id);
 2   DROP INDEX public.fk__tbl_prorr__arren__440b1d61;
       public            postgres    false    257            b           1259    54545    idx_users_email    INDEX     B   CREATE INDEX idx_users_email ON public.users USING btree (email);
 #   DROP INDEX public.idx_users_email;
       public            postgres    false    265            c           1259    54546    idx_users_username    INDEX     H   CREATE INDEX idx_users_username ON public.users USING btree (username);
 &   DROP INDEX public.idx_users_username;
       public            postgres    false    265                       1259    54547 !   oauth_access_tokens_user_id_index    INDEX     d   CREATE INDEX oauth_access_tokens_user_id_index ON public.oauth_access_tokens USING btree (user_id);
 5   DROP INDEX public.oauth_access_tokens_user_id_index;
       public            postgres    false    221            !           1259    54548    oauth_auth_codes_user_id_index    INDEX     ^   CREATE INDEX oauth_auth_codes_user_id_index ON public.oauth_auth_codes USING btree (user_id);
 2   DROP INDEX public.oauth_auth_codes_user_id_index;
       public            postgres    false    222            $           1259    54549    oauth_clients_user_id_index    INDEX     X   CREATE INDEX oauth_clients_user_id_index ON public.oauth_clients USING btree (user_id);
 /   DROP INDEX public.oauth_clients_user_id_index;
       public            postgres    false    223            '           1259    54550 *   oauth_refresh_tokens_access_token_id_index    INDEX     v   CREATE INDEX oauth_refresh_tokens_access_token_id_index ON public.oauth_refresh_tokens USING btree (access_token_id);
 >   DROP INDEX public.oauth_refresh_tokens_access_token_id_index;
       public            postgres    false    227            0           1259    54551 8   personal_access_tokens_tokenable_type_tokenable_id_index    INDEX     �   CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);
 L   DROP INDEX public.personal_access_tokens_tokenable_type_tokenable_id_index;
       public            postgres    false    229    229            a           1259    54552    uq__tbl_vehi__8b90dfb27519bf00    INDEX     i   CREATE UNIQUE INDEX uq__tbl_vehi__8b90dfb27519bf00 ON public.tbl_vehiculos USING btree (vehiculo_placa);
 2   DROP INDEX public.uq__tbl_vehi__8b90dfb27519bf00;
       public            postgres    false    263            t           2620    54553    users update_users_modtime    TRIGGER     �   CREATE TRIGGER update_users_modtime BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();
 3   DROP TRIGGER update_users_modtime ON public.users;
       public          postgres    false    275    265            s           2606    54608 :   arqueorecaudaciondet arqueorecaudaciondet_arqueorecid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.arqueorecaudaciondet
    ADD CONSTRAINT arqueorecaudaciondet_arqueorecid_fkey FOREIGN KEY (arqueorecid) REFERENCES public.arqueorecaudacioncab(arqueorecid) NOT VALID;
 d   ALTER TABLE ONLY public.arqueorecaudaciondet DROP CONSTRAINT arqueorecaudaciondet_arqueorecid_fkey;
       public          postgres    false    274    4975    272            r           2606    54554    users users_role_id_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_role_id_fkey;
       public          postgres    false    4914    265    231            ;   8   x�3�4B##S]c]C#0��¸0�F�
�fVF�V&&Xŀj�b���� W�      9      x�3�4D�zP�+F��� ?�
         �   x���MR�0���)z�x$Y�w�U�U7�	]��#p"� �)M�4����ɓ�>�A F���c�!ޜM�N���8~��SIv�F5�J�{8�� r}S�R��i,��h�>B?�+ĩ	�o�ia��6s��9�m}y{��u�]��j�ľ��	}6L�lM�0���?�3kD�D,��P�4};�0Of���J{��sigF��4�&��~D`�FHY��x|�{�)(2�*�æ�羝w�ιq�g         l   x�}���0�3�(jV����`���&�/Ld�կ��h�
�I8p���Q7W���*�E�\,3�\�i�Ro�k{�f<��O/c�1�oc0}�()�J�0!�'�5*      =   1   x�3�4�4202�50�52�A����������H�ˈH��1z\\\ Y�      ?      x�3�4�@=(�e�E,F��� �            x������ � �         �   x�e�]�  �g9����eI�X�CYv���! !}��?�H.B1>0u@�5���	<�AУ�F0a��N'.��',p�&L���,�1HT�Rks�q>f\J�UN�����@_�.;zr��נe�{,� >@��5g�Z���Ɣ>����UqòS��������      
   �
  x���K��E��Uxm�F0X�����_0`O�����*ۥ� ��R����O����rܚJ��v�m4��k�TS�����0�G��d�wRj�2�mגbi���#���?��˿����������� ���"�X_avî�9I��}J4)��y�!a�^U��ڌ�Mt�h�ב#u�]�f���T��A}���
�v�mf�}.Z5����m��̆�飯Ze%
���R���F��=���/�#�W�ݰ�j�qT����y���h	Ud�9sT�ƚY�S��S��r�"uZ8���\c��W_avîw�.�R�p�{ҷ�zi)���<�O��[ҡu.�#&����t�u�М�u���>͏�0�a���ݲuWj
o���Ny�:C����N�E���Q����&i�W���i������=�}��cvî�����uG�'�[��+��F+�bAs��Ê4Lf��\m��DÈ��=��O!<����]��rփ�i�3b�[Ȓ����YTk��=춖L��UMq�4_*��W\��}����
�v��=�V̩��V�=H�-��.C4-W���!��>��Z��$6�Dz�}����x�o��0�W��͢�a=A�a��SOt�e�8�*��Vck�{�s�k[���t����\�޿������v�2�B!��8|W��J5@��In7�1kI�6}f��d͍���<���+�n�UjY���1F����)1�"�o��Q�]T�3�U ���Ԟw�]��eV���y����-?���4�ߞ�f�i��Z����?T �4�,Ej�ω"_ݒ������ʍ,���*#��!���](�0�aW-A�x��VE`��iZЋZ뻶Q!�᝺��6�6�^ޡ'�&4�Y��>��˯��;�]hY>"�`��Ԕ�ИJ�E�Q>�����m��Hڞ���`��������>�>���]�x�]|�]3&i����v��s�W����.h�Á�q����.�0�咺�w��K�]}�����6����Л$ˉUJ:������dK���B��(���x���m��l����[,�0�a�Cz�s�^|�l���vA�0z�$�mK��vvsD�*����<R�u:�E`����C��^av�.x�5n�kƀ���m��lj(�G����-���)�p\DHF\���:�����0�aW��0}���R�0��-ϲ���[���j�u=�Qg�61��	��,Mcn����H�f7�$�}�����´3c�$5�J�x��W5�p�a�(�v4/��������y})<Ry����Af�c�A�6(0�}:6�Ӆ��hOe�c[�c��<����t<�i����>��o��;f7����;X�98��4�-�Z3��+��D&�d�"�mB?��M��U�@�}��}}�%�+�n��;�	��
���eY��a΄Ke�����K�8�/1��� xk��d�o��S��+�n�5l�����q�6cƺ�ZeAjim�o1t�'RF���ɛ;!lR������o��04��+�n���H@�c���Z�t}y�B���F2�*ٝ;`�[�����UL� �L��������]Rqx�Q<j��-�dm�r�1͆ϓ`'���%!I�B�SN	��˽:a������Ϗo��f7�v�ě��d��$#>)�u1	��h�°����vIM�'ߙ����\����~-�����]J���,G{�ڰ�AbG�HI5���G������1�?|��8���͗��w�����N|#&����lWT"�΁���Is���a�Wbq4����Ε�Y�p�@�S?��n���v�1���y�pY�JǠ.8�b�­��9�D9l<�#)����%��B�$����>G�^avî0�
���N�G�Қ����qԣ�M)��U��u3�xT�l� �WP��|������_avîdX�V�.FS�����Z���tjE"1�mfTL�����hA�4?�O����v�V��"e�y�C
��!3X���H�1�Y�[H��0yާ�������U>��<��g�nؕֈ�8��!Cӹ�;��t`���"��a�B"[��l��f2vzԍ%�����}�H�f7���-j��IqA�E�	?D�؈ P
�:.�YӻaKQ�����������\�O�'�⭾��2���+R�B1�W�&�F՜�ff�2t�$� �~nG��~%�)�ñ�w����Z�f7�c�÷{�f���V�(�b�1�~ԅ�\u�DIn�Gi6tt<��M��7�2����'���������)������0�՝�~:{>~�m�9��lÛ������������=cv�.Lg�W͆��$o4MK>��Ȉ�Y϶���%�[��+�'���<��[~������1�aW���:-X�I/~a�wd��l>\�S��U�wT���e#�ƞj�0`d]�}P�<����vl{�eA|��f��_e��f����.c2v�����B?/͑9�G!�~џ�GS����g�nؕ�g�V��6&y�$�u.��,'#�Q�B����	�$*��Li�����ʓ?}��]��V~^u��y�� J�ߊ'1i�*ʡg"0��-�ؾ69�b�G��w�ވ�}}n���v�K��[%�U$KݭzI����5�u��X�`����/����Ku�z?�������7�n���?_��?�c�S            x������ � �         y  x����R�@��kx
^�ZA�.�TL)�� �v@w���>k���,��;{~�/Oa1�ܔ����t�Pʘ4#8-��[�i�g���~���a;��%���yF����Q�����&�I^1.p!;=�:�	@S��l����&f���4�qɿ,��m�"�-Q[9y/�C����È�4?�!�Q�f�c~s�O�P�r�M�֚8���@�Z�&,�\�܎��<���6�r�jpn&�/�i�w�j�}Zobŵ��"(\9}ǟ��N�[�T�6����Q�8���I��f��Ylo'	��͝m�5��<N�7^�Om:$�,Ah�O��s3Q���-����^��8Gc���R-�����,0��\:��24OW�(����         B   x�mɱ�0�ښ"��dr���� n�
�k2�9�J����ȿ+7�2��v����� ^�pW            x������ � �            x������ � �            x������ � �         M   x�3�LL����t���%E�%�E
�%
i�99
��ɩ��\F��ũE�A��9�E
 DQNfnfIj
L]� ��            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �             x������ � �      "      x������ � �      $      x������ � �      &   5   x�Ź� ��XW���"�_Jv�ʍJ�F�����������C�L���xP�	�      (      x������ � �      *      x������ � �      ,      x������ � �      .      x������ � �      0   �   x�mϱ�0�}�l�<u�wH5m�\��'vp��ܟĪ.��=BOcbԤ+��Hn�8!X�8�#JR���>��@SB%�J���]	N`_B+pP7�{� ]|�d'�����@��ت�r)f�a�ꫮ���뗶Q	ٟp>��k�vE�l|���h�߆N$      2   �   x�}�A��0е{���je��I<�G��8����ρ�26���?�|�pb�"$�}��(b�x!��L�~��I��-�4���\W�bn��dv!mbhb�R094t-�^�����n�p�K+�k���+�r��i<��AVJ��V���gtY�Pr�"��m��LD�uI���O4��j���{�u�J�QA      4      x������ � �      6   �   x�=�Ak�0���+z�|_���u���Q�L���4F��87�_�^xyx�t�w����6�7mO��ֈ�h):��p�Oy!����*��?�?�Kq�����C��x�v�|��qc�����n{7�R��(���Ԏv3m�!4H�$b���4[��?����$	�;�1㚦B)T�؎�X&�r��2	K��?+�?�     