# Pull from a base image
FROM node:12-alpine

# Copy the files from the current directory to app/
COPY . /app

# Use app as the working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Build production app
RUN npm run build

# Listen on the specified port
EXPOSE 3000

# Set node server
ENTRYPOINT npm run start
