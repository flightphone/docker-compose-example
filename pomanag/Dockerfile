FROM node:8.12

#Clone the repo
RUN git clone https://github.com/flightphone/pomanager.git pomanager

# Change working directory
WORKDIR /pomanager

RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production


EXPOSE 2000
CMD [ "node", "App.js" ]
