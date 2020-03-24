# covid19
Coronavirus (covid19) information for UK residents.

# Building
`sudo docker build -t myimage .`

# Running
`docker run -d --name mycontainer -p 80:80 myimage`

# Debugging
Logs: `docker container mycontainer logs`

Stopping:
`sudo docker container stop mycontainer`
`sudo docker container rm mycontainer`

Getting a shell on the docker container:
`sudo docker exec -it mycontainer /bin/bash`