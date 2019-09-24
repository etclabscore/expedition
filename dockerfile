FROM node:10 AS builder
RUN \ 
    apt-get update && apt-get upgrade -q -y && \
    apt-get install -y ca-certificates git node-gyp make
WORKDIR /root/
RUN git clone https://github.com/etclabscore/jade-explorer.git
WORKDIR /root/jade-explorer/
RUN \
    npm install && \
    npm run build    

FROM httpd:2.4-alpine
COPY --from=builder /root/jade-explorer/build/ /usr/local/apache2/htdocs/
