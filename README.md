## Insira este script no HTML:

`<script src="https://somosdigix.github.io/MensagemDaDigix/mensagemDaDigix.js"></script>`

## Para publicar uma mensagem:

1 • Subir uma imagem com nome `mensagem-suporte.png`

2 • Inserir `new MensagemDaDigix(caminhoDaImagem).iniciar();` no final do código `mensagemDaDigix.js`

--- 

## Para publicar uma mensagem com uma imagem diferente:

1 • Subir uma imagem neste repositório ou em qualquer outro host

2 • Alterar o valor da variável `caminhoDaImagem` no final do código `mensagemDaDigix.js` com o caminho da imagem

---

## Para publicar uma mensagem específica para um ou mais sistemas:

1 • Adicionar um array como segundo parâmetro no construtor da mensagem `new MensagemDaDigix(caminhoDaImagem, [sistema.habix, sistema.papelzero]).iniciar();` contendo os sistemas que deseja exibir a mensagem.
