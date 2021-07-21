# club-finder-api

## TODO
1. validation
2. error handling
3. logger

## Docker-compose

Repozytorium zostało rozszezone o kontenery dokera. Cały konfig znajduje się w plikach `docker-compose.yaml` oraz `Dockerfile`.
Przygotowana konfiguracja ma za zadanie ułatwić pracę developerą i ułatwić pracę. W przypadku problemów ze środowiskiem proszę o kontakt z Kamil Jarosiński (kamil.jarosinski@gmail.com, 579522937).

Lab składa się z 3 kontenerów:
1. ts-node-docker - kontener zawiera środowisko uruchomieniowe nodejs. Aplikacja jest dostępna na porcie 5000. Niezbędne biblioteki są instalowane podczas procesu budowana (Patrz dalej). Do prawidłowego działa niezbędne są pliki/katalogi `package.json`, `src`, `tsconfig.json`. Zmiany kodu na hoście przeładują automatycznie serwer.
2. postgres - kontener z bazą danych prostgres z gałęzi 12. Kontener wymaga pliku `/database/7643516185162004449initial_tables.sql` na podstawie którego budowana jest struktóra bazy w chwili uruchomienia kontenera. Po wyłączeniu konterera dane nie są usuwane. Baza wystaiona na porcie 5432. Dane logowania i nazwa bazy znajdują się w pliku `docker-compose.yaml`. Uruchomienie samej bazy trwa kilka chwil pomimo tego ze kontener jest aktywyny.
3. pgadmin - interfejs do łatwiejszego przeglądania bazy danych dostępny na porcie 8080. Kontener jest wystawiony na porcie 8080. Dane logowania znajdują się w pliku `docker-compose.yaml`. Po poprawnym zalogowaniu naley dodać bazę podając niezbędne dane. Host - `postgres` (nazwa kontenera z bazą).

Aby podnieść środowisku niezbędny jest docker-compose.
Poniej kilka komend pozwalających kontrolować środowisko (naley być w katalogu w którym znajduje się plik `docker-compose.yaml`):
- `docker-compose up -d` - uruchamia środowisko w trybie usługi tzn. po uruchomieniu środowiska moecie dalej korzystać z terminala
- `docker-compose up -d --build` - uruchamia środowisko w trybie usługi budując wszystkie kontenery od nowa. Obecnie zostanie przebudowany wyłącznie kontener `ts-node-docker`. Przebudowanie kontenera pozwala zainstalować wszystkie niezbędne liby z nodejs znajdujące się w pliku `package.json`
- `docker-compose down` - wyłącza kontenery bez usuwania danych
- `docker-compose down -v` - wyłącza kontenery oraz usuwa dane (voluminy dockera np. z bazy danych) 
- `ddocker-compose exec ts-node-docker bash` - uruchamia powłokę w kontenerze. Dzięki temu moecie doinstalować nowe liby. Plik `package.json` na hoście zostanie zaktualizowany automatycznie.

Alternatywą do ostatniego polecenia jest uzycie kontenera monitorującego:
```docker run --rm -ti   --name=ctop   --volume /var/run/docker.sock:/var/run/docker.sock:ro   quay.io/vektorlab/ctop:latest```
Dzięki niemu mozecie bez problemu odpalić bash na kontenerach gdzie jest to mozliwe poprzez wybranie odpowiedniego kontenera, klik enter, exec shell
