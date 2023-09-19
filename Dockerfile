
FROM node:18
# Create app directory
WORKDIR /usr/src/app/
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
EXPOSE 8080
# Add a health check for the container
# Health check will attempt HTTP GET on port 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1
CMD [ "node", "server.js" ]
