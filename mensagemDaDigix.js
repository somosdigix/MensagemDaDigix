export class MensagemDaDigix {
  constructor() {
    this.chave = 'mensagemDaDigix';
    this.caminhoDaImagem = '';
  }

  iniciarMensagemDaDigix() {
    fetch('https://raw.githubusercontent.com/somosdigix/MensagemDaDigix/master/mensagem-suporte.png')
      .then(resposta => {
        if (resposta.ok) {
          resposta.blob().then(arquivo => {
            this.caminhoDaImagem = URL.createObjectURL(arquivo);
            this.executar();
          });
        }
      });
  }

  executar() {
    this.removerStorageExpirado();
    let exibiuMensagem = this.obterLocalStorage();
    if (!exibiuMensagem.value) {
      this.construirOsElementos();
      this.inserirLocalStorage(true, 24);
    }
  }

  construirOsElementos() {
    let body = document.querySelector('body');
    let telaDeBloqueio = this.obterElementoDaTelaDeBloqueio();
    let imagem = this.obterElementoDaImagem();
    let botaoDeFechar = this.obterElementoDoBotaoDeFechar();
    body.appendChild(botaoDeFechar);
    body.appendChild(telaDeBloqueio);
    body.appendChild(imagem);
  }

  obterElementoDoBotaoDeFechar() {
    let botao = document.createElement('button');
    botao.textContent = 'X';
    botao.title = 'Fechar';
    botao.classList.add('mensagemDaDigix');
    botao.onclick = () => this.fecharMensagemDaDigix();

    let estilo = botao.style;
    estilo.zIndex = 9999;
    estilo.backgroundColor = 'whitesmoke';
    estilo.position = 'fixed';
    estilo.cursor = 'pointer';
    estilo.top = '0';
    estilo.right = '0';
    estilo.width = '30px';
    estilo.height = '30px';
    estilo.border = '1px solid grey';
    estilo.borderRadius = '50%';

    return botao;
  }

  obterElementoDaImagem() {
    let imagem = document.createElement('img');
    imagem.classList.add('mensagemDaDigix');
    imagem.src = this.caminhoDaImagem;
    imagem.alt = 'Mensagem da Digix';
    imagem.width = '820';
    imagem.height = '520';
    imagem.onerror = () => this.fecharMensagemDaDigix();

    let estilo = imagem.style;
    estilo.zIndex = 9998;
    estilo.position = 'fixed';
    estilo.top = '50%';
    estilo.left = '50%';
    estilo.marginTop = `-${imagem.height / 2}px`;
    estilo.marginLeft = `-${imagem.width / 2}px`;

    return imagem;
  }

  obterElementoDaTelaDeBloqueio() {
    let telaDeBloqueio = document.createElement('div');
    telaDeBloqueio.classList.add('mensagemDaDigix');

    let estilo = telaDeBloqueio.style;
    estilo.backgroundColor = 'gray';
    estilo.position = 'fixed';
    estilo.width = '100%';
    estilo.height = '100%';
    estilo.zIndex = 9997;
    estilo.top = '0';
    estilo.left = '0';
    estilo.opacity = 0.6;

    return telaDeBloqueio;
  }

  fecharMensagemDaDigix() {
    const elementos = document.getElementsByClassName('mensagemDaDigix');
    while (elementos.length > 0) {
      elementos[0].remove();
    }
  }

  inserirLocalStorage(valor, horas) {
    let expirarEm = (new Date().getTime()) + (3600000 * horas);

    localStorage.setItem(this.chave, JSON.stringify({
      'value': valor,
      'expires': expirarEm
    }));
  }

  obterLocalStorage() {
    let item = localStorage[this.chave];
    if (item && /^\{(.*?)\}$/.test(item)) {
      let mensagemDaDigix = JSON.parse(item);
      return mensagemDaDigix;
    }

    return { value: false, expires: 0 };
  }

  removerStorageExpirado() {
    let dataAtual = new Date().getTime();
    let mensagemDaDigix = this.obterLocalStorage(this.chave);

    if (mensagemDaDigix.expires && mensagemDaDigix.expires <= dataAtual) {
      localStorage.removeItem(this.chave);
    }
  }
}
