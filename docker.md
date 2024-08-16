# Docker

***Tinotenda kurimwi 09/08/2024***

[docker playground](https://labs.play-with-docker.com/)

Host networking is also supported on Docker Desktop version 4.29 and later for Mac, Windows, and Linux as a [beta feature](https://docs.docker.com/network/drivers/host/).

## Docker vs VM
---

Virtual machines (windows/linux) - full copy of OS required   <br>
^<br>
hypervisor - tool used to create and manage virtual machines (virtualbox, vmware)<br>
^<br>
Physical Computer

---

Container - apps running in isolation, less resources<br>
^<br>
Docker - use whatever hose is provided<br>
^<br>
Physical Computer

---

## Docker Compose

`docker compose up`
this will compose the given image/images from the compose.yml file

`docker compose down --rmi all`
`--rmi` removes images, this will decommission your docker container and remove all dependencies defines in the docker-compose.yml file

`docker compose watch`
this will compose but link your terminal to the running containers such that you can see the updates

## Docker Run

`docker run -it <image>` this will run the image as an interactive terminal

## Docker General Commands

- list containers `docker container ls, docker container list, docker container ps, docker ps`
    - `.. -all` lists no active containers

## Docker file

Contains:
- A cut-down OS
    - Ubuntu
    - Debian
    - Alpine
    - Fedora
    - CentOS
- A runtime environment (eg Node)
- Application files
- Third-party libraries
- Environment variables

we are telling docker how to build the image so you must tell it what the folder needs to look like, each image will basically have it's own os, INSTRUCTIONS:

- Start with an OS - this will be the base image (official images) i.e. node/python
    - `node:alpine` , selecting base image and distribution of linux to run it on
    - apline is a very small linux distr. (small image)
- Install Node
- Copy app files
    - `COPY . /app`, copy all into app which is a directory we create
- Run node app.js
```
FROM node:alpine
COPY . /app
WORKDIR /app
CMD node app.js
```
## Commands 
- `--rm` removes container when it exits
- `-d` runs it in detached mode, i.e. in the background
- `-p` or `--publish` dest:docker-port
- `--network=host` uses host's network, needs to be activated on mac


## Docker Base Images

- [golang](https://hub.docker.com/_/golang/)
- [alpine](https://hub.docker.com/_/alpine/)
    - this is a very bare image and you need to install a lot of the dependencies that you need