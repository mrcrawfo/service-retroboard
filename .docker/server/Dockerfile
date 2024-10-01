FROM node:18

WORKDIR /server

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

ENV GRAPHQL_PORT=4000
ENV VITE_APP_API_URL=http://localhost:4000/graphql
ENV CONNECTION_STRING=postgresql://postgres:postgres@postgres:5432/service-retroboard-db
ENV TOKEN_SECRET=secret

EXPOSE 4000

CMD ["npm", "run", "docker:server"]
