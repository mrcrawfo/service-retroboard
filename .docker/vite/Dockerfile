FROM node:18

WORKDIR /vite

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

ENV VITE_PORT=3000
ENV VITE_APP_API_URL=http://localhost:4000/graphql

EXPOSE 3000

CMD ["npm", "run", "docker:vite"]
