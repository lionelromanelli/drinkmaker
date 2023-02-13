-- public.category definition

-- Drop table

-- DROP TABLE public.category;

CREATE TABLE public.category (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	CONSTRAINT category_pk PRIMARY KEY (id)
);


-- public.drink definition

-- Drop table

-- DROP TABLE public.drink;

CREATE TABLE public.drink (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	description varchar NULL,
	CONSTRAINT drink_pk PRIMARY KEY (id)
);


-- public.ingredient definition

-- Drop table

-- DROP TABLE public.ingredient;

CREATE TABLE public.ingredient (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	category_id int8 NOT NULL,
	"name" varchar NOT NULL,
	description varchar NULL,
	CONSTRAINT ingredient_pk PRIMARY KEY (id),
	CONSTRAINT ingredient_fk FOREIGN KEY (category_id) REFERENCES public.category(id)
);


-- public.drink_ingredient definition

-- Drop table

-- DROP TABLE public.drink_ingredient;

CREATE TABLE public.drink_ingredient (
	drink_id int8 NOT NULL,
	ingredient_id int8 NOT NULL,
	quantity numeric NULL,
	CONSTRAINT drink_ingredient_pk PRIMARY KEY (drink_id, ingredient_id),
	CONSTRAINT drink_ingredient_fk FOREIGN KEY (drink_id) REFERENCES public.drink(id),
	CONSTRAINT drink_ingredient_fk_1 FOREIGN KEY (ingredient_id) REFERENCES public.ingredient(id)
);

INSERT INTO public.category ("name") VALUES
	 ('Bebidas alcoholicas'),
	 ('Bebidas sin alcohol'),
	 ('Frutas');
	 
INSERT INTO public.ingredient (category_id,"name",description) VALUES
	 (1,'Ron','Bebida alcohólica que se obtiene por fermentación y destilación del jugo de la caña de azúcar o de melaza'),
	 (1,'Gin','La ginebra o gin es una bebida alcohólica destilada que posee un sabor predominante a nebrinas, los frutos del enebro (Juniperus communis)'),
	 (1,'Vodka','Bebida alcoholica que se produce generalmente a través de la fermentación de granos y otras plantas ricas en almidón, como el centeno, trigo, patata o remolacha'),
	 (2,'Agua tonica','Bebida gaseosa'),
	 (3,'Lima','Citrico'),
	 (2,'Coca Cola','Bebida gaseosa'),
	 (2,'Sprite','Bebida gaseosa'),
	 (2,'Jugo de naranja','Jugo de fruta natural'),
	 (1,'Fernet','El fernet es una bebida alcohólica de la familia de los amaros italianos elaborada a partir de la maceración de varios tipos de hierbas (mirra, ruibarbo, manzanilla, cardamomo, orégano y azafrán, entre otras)1​ en alcohol obtenido de la fermentación de la vid.');
	 
INSERT INTO public.drink ("name",description) VALUES
	 ('Destornillador','Mezclar 1 parte de Vodka con 3 partes de Jugo de naranja'),
	 ('Gin tonic','Mezclar 1 parte de Gin con 3 partes de Agua tonica'),
	 ('Fernet con coca','Mezclar 1 parte de Fernet con 3 partes de Coca Cola');
	 
INSERT INTO public.drink_ingredient (drink_id,ingredient_id,quantity) VALUES
	 (1,3,1),
	 (1,13,3),
	 (2,2,1),
	 (2,9,3),
	 (3,14,1),
	 (3,11,3);
	 
	 
