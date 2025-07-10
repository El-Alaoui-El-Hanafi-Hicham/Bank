# 🏗️ Build Stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:alpine

# Copy Angular build output
COPY --from=build /app/dist/my-app/browser /usr/share/nginx/html

# 👇 Inject the env.js runtime config file
COPY ./src/assets/env.js /usr/share/nginx/html/assets/env.js

# Optional: custom nginx config (if needed)
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 🔁 Inject API_URL from Azure App Service ENV at container start
CMD ["/bin/sh", "-c", "sed -i 's|\\${API_URL}|'\"$API_URL\"'|g' /usr/share/nginx/html/assets/env.js && nginx -g 'daemon off;'"]
