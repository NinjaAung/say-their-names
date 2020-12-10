FROM node:alpine
ENV PORT 80

WORKDIR /app/

COPY ./package*.json /server/
RUN npm install

COPY . /app/

EXPOSE 80
CMD ["npm", "run", "serve"]