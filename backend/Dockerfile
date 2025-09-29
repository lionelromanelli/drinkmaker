# Usa la imagen oficial de Bun
FROM oven/bun:latest

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos de dependencias primero (para aprovechar cache)
COPY package.json bun.lock* ./

# Instala las dependencias
RUN bun install

# Copia los archivos de tu proyecto
COPY . .

# Expone el puerto en el que corre tu app Hono
EXPOSE 3003

# Comando para correr la app
# CMD ["bun", "run", "start"]
COPY start.sh .
RUN chmod +x start.sh
CMD ["./start.sh"]