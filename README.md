Es un servicio REST elaborado con el framework NestJS para NodeJS y MongoDB, tiene seguridad jwt, swagger, validaciones, manejo de variables de entorno, seguridad Helmet y CORS habilitado. 

Para ocuparlo seguir los siguientes pasos:

1. Verificar que la BD en MongoDB Atlas con credenciales GMAIL este operativa.

    URL: https://account.mongodb.com/account/login

2. Realizar un clone del proyecto desde GitHub.

3. Acceder al directorio del proyecto e instalar los modulos necesarios:

    $ npm i 

4. Ubicar las credenciales y otras variables de entorno como la url de mongo, se encuentran en mongoDB Atlas, en Cluster, Connect your Application, Drivers. La password se ubica en Database Access, Edit User. Sustituir estos datos en el archivo .env:

    URL_MONGODB=mongodb+srv://{username}:{password}@{cluster}.mongodb.net/{database}?retryWrites=true&w=majority

5. Ejecutar el proyecto NestJS:

    $ npm run start:dev

6. Podemos observar la documentacion Swagger del API en la ruta:

    http://localhost:8184/open-api

7. El API tiene seguridad basica token JWT generada con los modulos @nestjs/jwt, @nestjs/passport, entre otros, solo para efectos de prueba. Para obtener el token ocupar el metodo:

  POST - http://localhost:8184/oauth2/token

  Body -> "x-www-form-urlencoded":

  client_id:clientld
  client_secret:clientSecret
  scope:api/personas
  grant_type:client_credentials

8. Utilizar los servicios configurados en el puerto 8184:

GET - http://localhost:8184/api -   No tiene seguridad, para validar funcionamiento de la API.
GET - http://localhost:8184/api/personas/util/{id}?query1=valor1&query2=valor2
GET - http://localhost:8184/api/personas
GET - http://localhost:8184/api/personas/60761a6dc8b4b265edf65deb
POST - http://localhost:8184/api/personas
{
  "nombre": "Ibrayn",
  "age": 17,
  "estado": true
}

PUT - http://localhost:3000/api/personas/6073b49a5893e105ec417c96
{
    "nombre": "Nombre",
    "age": 28,
    "estado": true
}

    NOTA: El PUT funciona para cualquier campo individual si se desea enviarlo asi.

DELETE - http://localhost:3000/api/personas/607a38d365968f7c2c836a43

9. Incluye Dockerfile para construir nuestra imagen Docker. Posicionarnos dentro del directorio del proyecto NestJS al nivel del archivo Dockerfile y ejecutar el comando:

    $ docker build -t nestjs-rest-nodejs-mongodb-docker-2023 .
    
 Una vez construida la imagen levantar el contenedor con el comando:
 
    $ docker run -p 8184:8184 nestjs-rest-nodejs-mongodb-docker-2023

10. Incluye Kubernetes.yml para desplegar nuestra imagen sobre Kubernetes, tiene HPA(Autoscaling), Service y Deployment. Clonar proyecto posicionarse a nivel donde se encuentre el archivo, modificar el nombre de la imagen de nuestro respositorio personal y ejecutar el comando:

    $ kubectl apply -f Kubernetes.yml

  Luego el se debe consumir el servicio por el puerto 5153, se modifico para pruebas de diferenciacion.

  NOTA: Si se quiere destruir los recursos creados es con: $ kubectl delete -f Kubernetes.yml
