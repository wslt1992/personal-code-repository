FROM nginx:1.18.0

COPY default.conf /etc/nginx/conf.d
COPY upstream.conf /etc/nginx/conf.d

COPY dist/ /usr/share/nginx/html/
