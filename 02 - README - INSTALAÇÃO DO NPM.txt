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












