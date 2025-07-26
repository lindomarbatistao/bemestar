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


