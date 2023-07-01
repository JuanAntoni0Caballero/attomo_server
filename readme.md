# Server-Attomo-Proyect

## Descripción
Este es el servidor del proyecto Attomo. Proporciona una API para gestionar usuarios y juegos.


## Instalación

1. Clona el repositorio: `git clone https://github.com/JuanAntoni0Caballero/attomo_server`
2. Navega al directorio del proyecto: `cd attomo_server`
3. Instala las dependencias: `npm install`

## Configuración del archivo .env

El proyecto utiliza el archivo `.env` para almacenar variables de entorno. Asegúrate de crear un archivo `.env` en el directorio raíz del proyecto y configura las siguientes variables:

- `TOKEN_SECRET`: Secret key utilizada para firmar los tokens JWT.
- `MONGODB_URI`: Conexión a la Base de Datos.
- `PORT`: Puerto del Servidor.
- `ORIGIN`: Puerto del Front end.



## Uso

- Ejecuta el servidor en modo de desarrollo: `npm run dev`
- Ejecuta el servidor en modo de producción: `npm start`


