# Engagement backend - NodeJS

Este proyecto se basa en el manejo de datos relacionados con la medición en tiempo real del engagement estudiantil. Maneja logueo de usuarios y registro de datos en tiempo real que los estudiantes envian durante una sesión de clase.

- [Instalación](#instalación)
- [Arquitectura](#arquitectura)
- [Configuración](#configuración)
- [Licencia](#licencia)

## Instalación

1. Hacer fork de este proyecto en tu espacio personal
2. Clonar el repositorio desde tu espacio personal en tu computadora
3. Crea en la raiz del proyecto el archivo dev.env, basate en el archivo .env.example, rellena todos los campos.
4. Instalar dependencias, con el comando `npm install`
5. Iniciar mongo con Docker, con el comando, o cada vez que necesitemos desplegar el entorno de desarrollo `docker-compose up -d mongodb`
6. Cargar datos iniciales, con el comando `npm run seed:random`
7. Comprobar ambiente de desarrollo, con el comando `npm run dev`
8. Probar endpoints con Postman o Insomnia.

## Arquitectura
Basamos la arquitectura del proyecto en CLEAN ARCHITECTURE
![Image Clean Achitecture](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*0R0r00uF1RyRFxkxo3HVDg.png)
```
└── Frameworks, Web: Frontend en Angular
  ├── Controllers: routes, middlewares
    ├─── Use Cases: services
      ├─── Entities: entities
 
```
- Entities: Enterprise Business Rules. Entidades bases de todo nuestro negocio. Ejm: Poll, Question, User, etc.
- Uses Cases: Application Business Rules. Tenemos todo lo relacionado con la lógica del negocio.
- Controllers: Interfaces Adapters. Son los que brindan acceso.
- Web: Framewroks and Drivers. 

Esta arquitectura en forma de capas tendría el siguiente esquema:

Controllers (Routes, Middlewares) <-> Services <-> Libs(Models)

### Flujo de Trabajo 

#### Controladores: Encontramos los routes y middlewares.
- Los controladores acceden a la capa de servicios.

#### Servicios: donde se encuentra la lógica de negocio
- Los servicios usan las librerías.

- Las librerías se encargan de contactarse a la capa de entidades
- Las librerías se contactan a otras fuentes de datos: API externa o base de datos.

#### Middlewares
El flujo de los middlewares es: 
Request -> Middlewares -> Response

### Entidades

- User: Colección de usuarios
- Poll: Colección de encuestas.
- Question: Colección de preguntas de encuestas.
- Record-Activity: Colección de actividades que realiza el usuario durante la clase.
- Room: Colección de salas creadas para los usuarios.

## Configuración

El proyecto ya viene con una configuración por defecto, de la siguiente manera:

```
.
├── README.md
├── dataset
├── docker-compose.yml
├── makefile
├── node_modules
├── package-lock.json
├── package.json
├── scripts
└── src
  ├── app.js
  ├── index.js
  ├── config
  ├── database
  ├── dtos
  ├── helpers
  ├── middlewares
  ├── routes
  ├── services
  └── socketio
```

### Scripts

- El comando `npm run start` inicia el servidor de node en modo producción.
- El comando `npm run dev` inicia un servidor con livereload.
- El comando `npm run seed:random` corre un carga de datos aleatorios inicial.


## Licencia

Este proyecto se lanza bajo la licencia [MIT](https://opensource.org/licenses/MIT).
