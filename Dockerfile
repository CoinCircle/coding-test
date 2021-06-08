FROM node:12.18.3

RUN mkdir /app
WORKDIR /app
COPY . /app
EXPOSE 3000

CMD ["/bin/bash", "npm", "start"]
