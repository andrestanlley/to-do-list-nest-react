# Etapa 1: Build
FROM node:18-alpine AS build

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Builda o projeto
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Remove a configuração default do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build do Vite para a pasta pública do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Opcional: adiciona uma configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Comando default
CMD ["nginx", "-g", "daemon off;"]
