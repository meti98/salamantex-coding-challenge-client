FROM nginx:1.13.12-alpine
COPY ./build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf 
EXPOSE 80
