FROM node:alpine3.18
WORKDIR /app
COPY ./backend/package.json ./
RUN npm install
COPY . .
EXPOSE 5555
CMD [ "npm", "run", "start"]