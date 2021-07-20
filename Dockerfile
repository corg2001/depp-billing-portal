FROM 457289674159.dkr.ecr.us-east-1.amazonaws.com/nginx-alpine:latest

LABEL Name="unify-contractor-portal Docker Image"
LABEL Version="1.0.0"

COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf
ADD ./dist/hwa-contractor /usr/share/nginx/html

RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 8080
