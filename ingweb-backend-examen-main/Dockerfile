FROM node:18

WORKDIR /app/backend

COPY ./backend/index.js .
COPY ./backend/package.json .
COPY ./backend/src ./src
COPY ./backend/.env .

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]