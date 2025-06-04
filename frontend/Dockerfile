FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

ENV VITE_BACKEND_URL "http://api:3000"
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
