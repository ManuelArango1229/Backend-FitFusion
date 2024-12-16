# Usar la imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar los archivos de dependencias (package.json y package-lock.json)
COPY package*.json ./

# Instalar todas las dependencias (incluyendo dependencias de desarrollo)
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . /app

# Ejecutar la compilación
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Establecer el comando para iniciar la aplicación
CMD ["npm", "run", "start"]
