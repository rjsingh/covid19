# Stage 1 - the build process
FROM node:latest as build-deps
WORKDIR /usr/src/app
COPY ./react-corona-app/package.json ./react-corona-app/package-lock.json ./
RUN npm install
COPY react-corona-app ./
RUN npm run build

# Stage 2 - the production environment
FROM tiangolo/uwsgi-nginx-flask:python3.7

COPY requirements.txt /tmp
RUN pip install -r /tmp/requirements.txt
COPY ./corona.py /app/main.py
COPY --from=build-deps /usr/src/app/build /app
COPY ./uwsgi.ini /app