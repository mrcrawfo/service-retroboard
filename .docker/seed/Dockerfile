FROM node:18

WORKDIR /seed

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

ENV CONNECTION_STRING=postgresql://postgres:postgres@postgres:5432/service-retroboard-db

CMD ["npm", "run", "docker:seed"]