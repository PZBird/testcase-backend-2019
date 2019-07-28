FROM node:10.15.3-alpine

WORKDIR /opt/app

RUN mkdir -p /opt/app &&\
    addgroup app &&\
    adduser -D -G app app

COPY ./package.json /opt/app/package.json
COPY ./package-lock.json /opt/app/package-lock.json

RUN chown -R app:app /opt/app &&\
    npm install

COPY ./src /opt/app/src
COPY ./config/prod.yaml /opt/app/config/default.yaml

USER app

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
