# shop-api

## TODO
logger for requests
Add order entity,
   add order crud
   add order validation
   add relations in db
   migrations config

## DONE
error handling
user - validation
logger

## Docker-compose

Aby podnieść środowisku niezbędny jest docker-compose.
Poniej kilka komend pozwalających kontrolować środowisko (naley być w katalogu w którym znajduje się plik `docker-compose.yaml`):
- `docker-compose up -d` - uruchamia środowisko w trybie usługi tzn. po uruchomieniu środowiska moecie dalej korzystać z terminala
- `docker-compose up -d --build` - uruchamia środowisko w trybie usługi budując wszystkie kontenery od nowa. Obecnie zostanie przebudowany wyłącznie kontener `ts-node-docker`. Przebudowanie kontenera pozwala zainstalować wszystkie niezbędne liby z nodejs znajdujące się w pliku `package.json`
- `docker-compose down` - wyłącza kontenery bez usuwania danych
- `docker-compose down -v` - wyłącza kontenery oraz usuwa dane (voluminy dockera np. z bazy danych) 
- `docker-compose exec ts-node-docker bash` - uruchamia powłokę w kontenerze. Dzięki temu moecie doinstalować nowe liby. Plik `package.json` na hoście zostanie zaktualizowany automatycznie.
- `docker attach container-id` - stdout kontenera jest podgladniete w apce

Alternatywą do ostatniego polecenia jest uzycie kontenera monitorującego:
```docker run --rm -ti   --name=ctop   --volume /var/run/docker.sock:/var/run/docker.sock:ro   quay.io/vektorlab/ctop:latest```
Dzięki niemu mozecie bez problemu odpalić bash na kontenerach gdzie jest to mozliwe poprzez wybranie odpowiedniego kontenera, klik enter, exec shell
