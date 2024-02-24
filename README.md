# Star_WARSAPP FrontEnd

## Introducción

Practica de consumo de Api SWAPI, muestra los objetos traidos en cards, el aplicativo tiene demora en traer las cards dado la cantidad de solicitudes que hace a la API para traer data completa y consolidada, ademas si la card tiene informacion a la que se puede acceder pinta el vinculo de otro color y al hacer click trae en una ventana emergente la data de este y para cerrar la card extra solo es dar click sobre ella.

Tiene parte para buscar cualquier objeto solo debes escribir la busqueda, oprimir buscar y te traera lo que consiga en todas las categorias.

Cuenta con el efecto especial para cabello de color blond.

Notas a tener en cuenta:
1. Recuperacion de contrasena solo es ilustrativo, pero puede probar la muestra de notificaciones, con los siguientes datos comprobara como correcta la solicitud:
```bash
jmaluendasbautista@gmail.com
```bash
1234567890
2. Respecto a la tarjeta flotante que se crea al hacer click sobre un nombre de pelicula, especie, etc. esta tarjeta se cierra haciendo click sobre la tarjeta.

El proyecto se puede ejecutar en ambiente produccion o transpilar y ejecutarlo en ambiente de desarrollo.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Licencia](#licencia)

## Instalación

El ambiente de desarrollo de STAR WARSAPP se debe guardar en una carpeta (`Star_WARSAPP`).

1. Desde la consola de Git Bash, accede a la carpeta `Star_WARSAPP` identificate y clona el repositorio con las siguientes instrucciónes:
   ```bash
   git clone https://github.com/JMaluendase/SWAPI_OsNet_JM.git
3. Acceder a la carpeta FrontEnd en la cual queda alojado el proyecto clonado.
   ```bash
   cd SWAPI_OsNet_JM
5. Realizar la installacion de Vite
   ```bash
   npm install vite --save-dev
7. Ya puede desplegar el proyecto en ambiente de desarrollo con:
   ```bash
   npm run dev

## Licencia

© JMaluendas 2024. Todos los derechos reservados.
