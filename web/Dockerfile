# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build:prod

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist/my-app /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
