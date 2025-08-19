FROM node:24-alpine

WORKDIR /app

# RUN npm init -y

# RUN npm install express mongoose body-parser nodemon 

COPY package-lock.json .
COPY package.json .
COPY server.js .
RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "start"]
