FROM node:latest
WORKDIR /app 
ADD . . 
RUN npm install 
CMD ["node", "index.js"]
# difference between run and cmd