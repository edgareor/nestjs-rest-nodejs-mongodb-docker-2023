# Usar imagenes nodejs Alpine ya que son como 800MB aprox. mas livianas
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
# Compilar app nestjs creara el directorio dist/main
RUN npm run build
EXPOSE 8184
# "start:prod" ejecuta el archivo "main" del directorio "dist/main"
CMD ["npm", "run", "start:prod"]