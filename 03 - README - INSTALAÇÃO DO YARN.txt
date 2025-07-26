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



