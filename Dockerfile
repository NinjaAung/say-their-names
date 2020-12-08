FROM node:current-alpine
ENV PORT 80

WORKDIR /app
COPY . /app 

RUN npm install

CMD ["npm", "run", "serve"]