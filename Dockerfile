# Init database for the first time.
FROM postgres:latest
COPY init.sql /docker-entrypoint-initdb.d/

# Check out https://hub.docker.com/_/node to select a new base image
FROM node:14.11.0

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Install app dependencies & setup.
COPY --chown=node package.json /home/node/app
RUN yarn install

# Bundle app source code
COPY --chown=node . .
