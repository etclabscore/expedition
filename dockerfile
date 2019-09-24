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

FROM alpine:latest  
RUN \
    apk --no-cache add ca-certificates npm && \
    npm install -g node-static
WORKDIR /root/
COPY --from=builder /root/jade-explorer .
WORKDIR /root/jade-explorer
EXPOSE 8080
CMD ["static", "-a", "0.0.0.0", "build"]
