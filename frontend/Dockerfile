FROM node:20

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos de la app
COPY . .

EXPOSE 5173

# Comando para correr Vite en modo desarrollo
CMD ["npm", "run", "dev"]
