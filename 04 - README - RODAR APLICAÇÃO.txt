README - RODAR APLICAÇÃO
======================================

Este guia explica como rodar aplicação no computador.

------------------------------------------------------------
PRÉ-REQUISITOS
------------------------------------------------------------

- Node.js e npm
- Yarn
- Android Studio com pelo menos 1 emulador
- Visual Studio Code ou um editor compatível 
- Git
- Python
- Windows 10 ou superior (recomendado)
- Acesso à internet
- Permissão para instalar programas no computador


------------------------------------------------------------
REPOSITÓRIO
------------------------------------------------------------
Para clonar o repositório você deve criar uma pasta em um local confiável, acessá-la e aplicar o seguinte comando:

- git clone https://github.com/lindomarbatistao/bemestar.git

Acesse a pasta principal:
- cd bemestar

O conteúdo da pasta é:
- app (aplicação para rodar no celular)
- back (back-end DJango Rest Framework)

Para acessar o código basta aplicar o comando:
- code .

------------------------------------------------------------
INICIAR EMULADOR
------------------------------------------------------------

Abrir terminal
- CTRL+J

Para visualizar os emuladores instalados:
* emulator -list-avds

Para iniciar um emulador:
* emulator -avd NOME_DO_EMULADOR


------------------------------------------------------------
INICIAR BACK END
------------------------------------------------------------

Acesse a pasta back:
* cd back

Crie o ambiente virtual:
* py -m venv env

Ative o novo ambiente:
* env\scripts\activate

Instale os pacotes em que já deixei registrados:
* pip install -r requirements.txt

Observação importante:
Para iniciar o servidor, como é uma aplicação de celular e iremos executa-lo no desktop, deve-se encontrar o IP utilizado no momento:

* ipconfig

Coloque esse IP encontrado em todo código onde estiver 192.168.15.6 que é o que utilizei, por isso o comando para iniciar o servidor é:

* py manage.py runserver 192.168.15.6:8000


------------------------------------------------------------
INICIAR FRONT END
------------------------------------------------------------

Acesse a pasta "app":
* cd app

Instale os pacotes:
* yarn

Inicie o Front:
* yarn start



------------------------------------------------------------
Conclusão
------------------------------------------------------------

Se você seguiu corretamente todos os passos então agora verá todo o funcionamento do projeto.

Espero que goste!


Caso tenha alguma dúvida pode me enviar mensagem por Whatsapp (19) 98779-7862.
 
Att












