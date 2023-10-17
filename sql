create table bairros (
   codigo serial not null primary key,
   nome varchar (40) not null
);

create table acontecimentos (
   codigo serial not null primary key,
   descricao text,
   endereco text not null,
   numero_rua integer,
   check (quantidade_estoque >= 0),
   data_acontecido date not null,
   bairro integer not null,
   foreign key (bairro) references bairros (codigo)
);

CREATE TABLE usuarios (
    email character varying(50) NOT NULL,
    senha character varying(20) NOT NULL,
    tipo character(1) NOT NULL,
    telefone character varying(14) NOT NULL,
    nome character varying(50) NOT NULL,
    CONSTRAINT usuarios_tipo_check CHECK (((tipo = 'T'::bpchar) OR (tipo = 'A'::bpchar) OR (tipo = 'U'::bpchar)))
);
