FROM node
RUN npm install -g create-react-app
RUN mkdir /app
WORKDIR /app
ADD . /app
