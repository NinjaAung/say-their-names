FROM node:latest
ENV PORT 80

WORKDIR /app
COPY . /app 

RUN npm install

CMD ["npm", "run", "serve"]