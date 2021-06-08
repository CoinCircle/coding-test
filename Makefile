CONTAINER_WEB := $(shell docker-compose ps -q web)

## start server
serve:
	docker exec -it ${CONTAINER_WEB} npm start

## start docker shell
shell:
	docker exec -it ${CONTAINER_WEB} /bin/bash