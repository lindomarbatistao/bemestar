README - INICIAR EMULADOR ANDROID VIA PROMPT DE COMANDO (CMD)
==============================================================

Este guia ensina como iniciar um emulador Android diretamente pelo terminal no Windows,
sem usar o Android Studio.

------------------------------------------------------------
PRÉ-REQUISITOS
------------------------------------------------------------

- Android Studio instalado (ou apenas o Android SDK)
- Variáveis de ambiente corretamente configuradas
- Pelo menos um AVD (Android Virtual Device) já criado

------------------------------------------------------------
VARIÁVEIS DE AMBIENTE NECESSÁRIAS
------------------------------------------------------------

1. Adicione estas pastas do Android SDK à variável PATH:

   Exemplo de caminhos padrão:
   - C:\Users\SeuUsuario\AppData\Local\Android\Sdk\emulator
   - C:\Users\SeuUsuario\AppData\Local\Android\Sdk\platform-tools
   - C:\Users\SeuUsuario\AppData\Local\Android\Sdk\tools (se existir)

2. Para configurar:
   - Clique com o botão direito em "Este Computador" ou "Meu Computador"
   - Selecione "Propriedades" > "Configurações Avançadas do Sistema"
   - Clique em "Variáveis de Ambiente"
   - Encontre a variável "Path" e adicione os caminhos acima

3. Reinicie o terminal após salvar as alterações

------------------------------------------------------------
LISTAR EMULADORES DISPONÍVEIS
------------------------------------------------------------

No terminal, digite:

    emulator -list-avds

Exemplo de saída:

    Pixel_4_API_31
    Nexus_5X_API_30

Cada linha representa um emulador configurado no AVD Manager.

------------------------------------------------------------
INICIAR UM EMULADOR ESPECÍFICO
------------------------------------------------------------

Use o comando abaixo, substituindo pelo nome do AVD listado:

    emulator -avd NOME_DO_EMULADOR

Exemplo:

    emulator -avd Pixel_4_API_31

O terminal exibirá logs de inicialização e o emulador abrirá em uma janela separada.

------------------------------------------------------------
DICAS OPCIONAIS
------------------------------------------------------------

- Iniciar em modo "sem áudio" e "sem janela" (útil para testes):

    emulator -avd NOME_DO_EMULADOR -no-audio -no-window

- Aumentar performance com GPU host:

    emulator -avd NOME_DO_EMULADOR -gpu host

- Forçar arquitetura x86_64:

    emulator -avd NOME_DO_EMULADOR -verbose -qemu -m 2048

------------------------------------------------------------
EXEMPLO COMPLETO
------------------------------------------------------------

    cd C:\Users\SeuUsuario\AppData\Local\Android\Sdk\emulator
    emulator -avd Pixel_4_API_31

------------------------------------------------------------
ERROS COMUNS
------------------------------------------------------------

- "emulator: command not found"
  → Verifique se o caminho do SDK/emulator está no PATH corretamente.

- "PANIC: Missing emulator engine program for 'x86' CPU."
  → O emulador pode estar corrompido ou faltando componentes.

- "HAXM is not installed or not working"
  → Instale o Intel HAXM no Android Studio SDK Manager ou ative a virtualização na BIOS.


README - INSTALAÇÃO DO NPM NO WINDOWS
=====================================

Este guia explica como instalar o npm (Node Package Manager) no Windows.
O npm é instalado automaticamente junto com o Node.js.

------------------------------------------------------------
PRÉ-REQUISITOS
------------------------------------------------------------

- Windows 10 ou superior (recomendado)
- Acesso à internet
- Permissão para instalar programas no computador

------------------------------------------------------------
PASSO A PASSO PARA INSTALAR O NODE.JS E NPM
------------------------------------------------------------

1. Baixar o Node.js:
   - Acesse: https://nodejs.org/
   - Clique na versão "LTS" (recomendada)
   - O download do instalador (.msi) será iniciado

2. Instalar o Node.js:
   - Dê duplo clique no arquivo .msi baixado
   - Siga as instruções:
     - Aceite os termos
     - Mantenha os caminhos padrão
     - (Opcional) Marque a opção "Automatically install the necessary tools"
     - Finalize a instalação

3. Verificar a instalação:
   - Abra o Prompt de Comando ou PowerShell
   - Digite os comandos:

     node -v
     npm -v

   - Se aparecerem os números de versão, está tudo certo.

------------------------------------------------------------
SE O COMANDO NÃO FOR RECONHECIDO: CONFIGURAR VARIÁVEIS DE AMBIENTE
------------------------------------------------------------

Caso os comandos "node" ou "npm" não sejam reconhecidos no terminal, siga os passos abaixo:

1. Descubra o caminho de instalação:
   - Normalmente é algo como:
     C:\Program Files\nodejs\

2. Abrir as Variáveis de Ambiente:
   - Clique com o botão direito em "Este Computador" (ou "Meu Computador")
   - Vá em "Propriedades"
   - Clique em "Configurações Avançadas do Sistema"
   - Clique em "Variáveis de Ambiente"

3. Editar a variável PATH:
   - Na seção "Variáveis do sistema", encontre a variável chamada "Path"
   - Clique em "Editar"
   - Clique em "Novo" e adicione o caminho:
     C:\Program Files\nodejs\
   - Clique em "OK" em todas as janelas

4. Reinicie o Prompt de Comando ou reinicie o computador

5. Teste novamente no terminal:
     node -v
     npm -v

------------------------------------------------------------
TESTE RÁPIDO
------------------------------------------------------------

1. Crie um diretório de teste:
     mkdir meu-projeto
     cd meu-projeto

2. Execute:
     npm init -y

   - Isso criará um arquivo package.json básico

------------------------------------------------------------
ATUALIZAR O NPM
------------------------------------------------------------

Para atualizar o npm para a versão mais recente:

    npm install -g npm



README - INSTALAÇÃO DO YARN NO WINDOWS
======================================

Este guia explica como instalar o Yarn (gerenciador de pacotes alternativo ao npm) no Windows.

------------------------------------------------------------
PRÉ-REQUISITOS
------------------------------------------------------------

- Node.js e npm instalados
- Windows 10 ou superior (recomendado)
- Acesso à internet
- Permissão para instalar programas

------------------------------------------------------------
PASSO A PASSO PARA INSTALAR O YARN
------------------------------------------------------------

1. Verifique se o Node.js e o npm estão instalados:
   Abra o Prompt de Comando ou PowerShell e digite:

     node -v
     npm -v

   Se as versões forem exibidas, prossiga.

2. Instalar o Yarn usando o npm:

     npm install --global yarn

   O `--global` garante que o Yarn esteja disponível em qualquer lugar do sistema.

3. Verificar se o Yarn foi instalado corretamente:

     yarn -v

   Se for exibido um número de versão, a instalação está OK.

------------------------------------------------------------
SE O COMANDO "YARN" NÃO FOR RECONHECIDO: VARIÁVEIS DE AMBIENTE
------------------------------------------------------------

Se o comando "yarn" não funcionar, adicione o caminho global do npm ao PATH:

1. Verifique onde o npm instalou o Yarn globalmente:

     npm prefix -g

   Exemplo de saída:
     C:\Users\SeuUsuario\AppData\Roaming\npm

2. Copie este caminho.

3. Abra as Variáveis de Ambiente:
   - Clique com o botão direito em "Este Computador" ou "Meu Computador"
   - Vá em "Propriedades"
   - Clique em "Configurações Avançadas do Sistema"
   - Clique em "Variáveis de Ambiente"

4. Editar a variável PATH:
   - Na seção "Variáveis do sistema", encontre "Path"
   - Clique em "Editar"
   - Clique em "Novo" e cole o caminho copiado (ex: C:\Users\SeuUsuario\AppData\Roaming\npm)
   - Clique em "OK" em todas as janelas

5. Feche e abra novamente o terminal

6. Teste novamente:

     yarn -v

------------------------------------------------------------
COMANDOS BÁSICOS DO YARN
------------------------------------------------------------

- Criar um novo projeto com Yarn:
     yarn init

- Instalar dependências de um projeto:
     yarn install

- Adicionar uma biblioteca:
     yarn add nome-do-pacote

- Remover uma biblioteca:
     yarn remove nome-do-pacote

- Atualizar dependências:
     yarn upgrade



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





















