# PROGRAMACION WEB AVANZADA
# PROYECTO FINAL CONTROL DE STOCK 

## Inicialización del proyecto

### Inicializar NPM:

npm init -y

## Instalacion de dependencias 

### De producción:

npm install express mongoose cors dotenv

### De desarrollo:

npm install -D typescript ts_node ts_node_dev nodemon @types/node @types/express @types/mongoose @types/cors @typescript-eslint/parser

## Configuración de TypeScript

### Inicializar TypeScript

npx tsc --init

### Modificar el archivo tsconfig.json

{
    "compilerOptions":{
        "outdir": "dist",
    },
    "include": ["src/**/**"]
}

## Scripts en package.json

"scripts":{
    "start": "nodemon  src/index.ts"
}

## Correr el servidor

npm start