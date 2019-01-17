# NodeJS API

Como parte practica del curso vamos a desarrollar una API para desarrollar una Pokedex. ¿Qué es una Pokedex?. Para esto primero hay que contar quñe es un "Pokemon".

## ¿Qué es un Pokemon?

Los pokémon son una clase de criaturas (monstruos) basadas en muchos casos en animales reales o criaturas míticas y mitológicas orientales. Otros se inspiran en cosas inanimadas y legendarias. Son capturados con un aditamento especial llamado Poké Ball (Pokebola en algunas traducciones)

## ¿Qué es la Pokedex?

El pokédex en el mundo ficticio de Pokémon, es un dispositivo electrónico que interviene en los videojuegos y la serie de anime. En los juegos, su función es registrar los datos de un pokémon.

# Base de Datos

Para realizar esta aplicación vamos a consumir toda la información de una Base de Datos `MongoJS`.

## Instalando MongoDB

En lugar de hacer una instalación local vamos a hacerlo mediante Docker. Para esto vamos a ejecutar el siguiente comando:

> docker run mongo --name mongo -d -p 27017:27017

Ya tenemos una instancia de Docker corriendo. Ahora solo nos queda restaurar la el dump de la base de datos

### Restaurando DB

Para esto debemos:

1. Copiar el dump al container
2. Restaurar la base

#### Copiar el dump

Copiamos la carpeta `db` al contenedor

> docker cp db mongo:/

De esta manera ya copiamos la carpeta `db` al contendor de `mongo`

#### Restaurar la base

Para esto debemos ingresar primero al contenedor

> docker exec -it /bin/bash

Ya estamos dentro del contenedor y sobre el root (`/`). Ahora tenemos que restaurar la db

> mongorestore db

Listo! Ya tenemos la base de datos

### Estructura de la DB

La Base de datos contiene las siguientes colecciones:

- pokemon
- types

Cada uno de los elementos tiene la siguiente estructuraa

#### pokemon

| Name            | Desription                                           | Type          |
| --------------- |:----------------------------------------------------:| -------------:|
| id              | Pokemon Id                                           | Integer       |
| name            | Nombre del Pokemon                                   | String        |
| base_experience | Experiencia base del Pokemon al ser capturado        | Integer       |
| height          | Altura del Pokemon en **decimetros**                 | Integer       |
| moves           | Lista de Movimientos                                 | Array<String> |
| types           | Lista de los tipos al que pertenece el Pokemon       | String        |
| weight          | Peso del Pokemon en **hectogramos**                  | Integer       |

#### types

| Name            | Desription                                           | Type          |
| --------------- |:----------------------------------------------------:| -------------:|
| id              | Pokemon Id                                           | Integer       |
| name            | Nombre del Type                                      | String        |

# Endpoints

A continuación se listaran los endpoints correspondientes

## GET /

Debera retornar **todos** los Pokemons páginados.

### Parametros

| Name        | Desription                           | Type    |
| ----------- |:------------------------------------:| -------:|
| limit       | La cantidad de Pokemons a traer      | Integer |
| offset      | El offset a aplicar                  | Integer |

### Respuesta

| Name        | Desription                           | Type    |
| ----------- |:------------------------------------:| -------:|
| results     | Lista de Pokemons                    | Array   |

#### Results

| Name            | Desription                                           | Type          |
| --------------- |:----------------------------------------------------:| -------------:|
| id              | Pokemon Id                                           | Integer       |
| name            | Nombre del Pokemon                                   | String        |
| base_experience | Experiencia base del Pokemon al ser capturado        | Integer       |
| height          | Altura del Pokemon en **centimetros**                | Integer       |
| moves           | Lista de Movimientos                                 | Array<String> |
| types           | Lista de los tipos al que pertenece el Pokemon       | String        |
| weight          | Peso del Pokemon en **gramos**                       | Integer       |


## GET /{id}

Debera retornar el **pokemon** con el id especifico

### Respuesta

| Name            | Desription                                           | Type          |
| --------------- |:----------------------------------------------------:| -------------:|
| id              | Pokemon Id                                           | Integer       |
| name            | Nombre del Pokemon                                   | String        |
| base_experience | Experiencia base del Pokemon al ser capturado        | Integer       |
| height          | Altura del Pokemon en **centimetros**                | Integer       |
| moves           | Lista de Movimientos                                 | Array<String> |
| types           | Lista de los tipos al que pertenece el Pokemon       | String        |
| weight          | Peso del Pokemon en **gramos**                       | Integer       |

## GET /types

Debera retornar **todos** tipos de Pokemons

### Respuesta

| Name        | Desription                           | Type    |
| ----------- |:------------------------------------:| -------:|
| results     | Lista de Pokemons                    | Array   |

#### Results

| Name            | Desription                                           | Type          |
| --------------- |:----------------------------------------------------:| -------------:|
| id              | Pokemon Id                                           | Integer       |
| name            | Nombre del Type                                      | String        |

### Respuesta

| Name        | Desription                           | Type    |
| ----------- |:------------------------------------:| -------:|
| results     | Lista de Pokemons                    | Array   |

## GET /types/{id}

Debera retornar el tipo de pokemon con el id especifico

### Respuesta

| Name            | Desription                                           | Type          |
| --------------- |:----------------------------------------------------:| -------------:|
| id              | Pokemon Id                                           | Integer       |
| name            | Nombre del Type                                      | String        |
