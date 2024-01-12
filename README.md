# PET CLINIC

Pet Clinic es un sistema integral diseñado para gestionar las operaciones diarias de una clínica veterinaria. Desde el registro de dueños y mascotas hasta la programación de citas y la asignación de médicos, este proyecto se enfoca en proporcionar una experiencia fluida y organizada para la administración de la clínica.

## Tecnologías Utilizadas

* Node.js y Express: Desarrollado en el entorno de ejecución Node.js y utilizando el marco Express para construir la aplicación web del backend.

* Sequelize: Seleccionado como ORM para interactuar con la base de datos relacional PostgreSQL, facilitando las operaciones de la base de datos y asegurando una estructura de datos coherente.

* PostgreSQL: Se eligió como sistema de gestión de base de datos relacional para almacenar datos de manera estructurada y eficiente.

* Axios: Utilizado para realizar llamadas HTTP al backend externo necesario para el funcionamiento adecuado de VETERI-CLINIC.


## Funcionalidades Principales

* Registro de Dueños y Mascotas:
Permite a los dueños registrar su información personal.
Facilita el registro de mascotas asociadas a cada dueño, incluyendo detalles como nombre, especie y edad.


* Gestión de Citas:
Permite la programación de citas para las mascotas, indicando la fecha y la hora deseadas.
Proporciona una visión general de las citas programadas.

* Registro de Médicos:
Facilita el registro de médicos veterinarios, incluyendo detalles como nombre, especialidad y horario de disponibilidad.

* Autenticación Segura:
Implementado con JSON Web Tokens (JWT) para asegurar la autenticación de usuarios, especialmente en el acceso a información sensible.

* Protección de Contraseñas:
Utiliza Bcrypt para garantizar la seguridad de las contraseñas almacenadas en la base de datos.

* Subida de Archivos con Firebase:
Ofrece la capacidad de cargar archivos, como imágenes de las mascotas, utilizando Firebase Storage para un almacenamiento eficiente y escalable.

* Identificadores Únicos con UUID:
Utiliza UUID para generar identificadores únicos, garantizando la singularidad en las rutas y la gestión efectiva de los elementos.

* Manejo de Errores Efectivo:
Incorpora un sistema robusto de manejo de errores para proporcionar mensajes claros y soluciones adecuadas cuando surgen problemas durante la ejecución.
Validación de Entrada con Zod:

* Implementa Zod para validar la entrada de datos y asegurar la consistencia y validez de los datos proporcionados por los usuarios.

* Integración con Backend Externo:
Utiliza Axios para realizar llamadas HTTP al backend externo necesario para el correcto funcionamiento de VETERI-CLINIC.


## Pasos para ejecutar este backend

1. Clona el repositorio: git clone [Pet Clinic backend](https://github.com/Samuel33d/pet-clinic)

2. Instalar dependencias con el siguiente comando:

```
npm install
```

3. Se deberá crear una base de datos, puede crearla de manera local o utilizar https://www.elephantsql.com/

4. Clonar el archivo `.env.template` y renombrarlo a `.env` y agregar los valores de las variables de entorno.

5. ejecutar el comando:

```
npm run start:dev
```
