class MensagemDaDigix {
  constructor() {
    this.caminhoDaImagem = '';
    this.chave = 'mensagemDaDigix';
    this.classDosElementos = 'mensagemDaDigix';
    this.mensagemDoSuporte = 'https://somosdigix.github.io/MensagemDaDigix/mensagem-suporte.png';
    document.onkeydown = (evento) => this.fecharMensagemComEsc(evento);
  }

  iniciar() {
    fetch(this.mensagemDoSuporte)
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
      this.inserirLocalStorage();
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
    botao.classList.add(this.classDosElementos);
    botao.onclick = () => this.fecharMensagemDaDigix();

    let estilo = botao.style;
    estilo.zIndex = 9999;
    estilo.backgroundColor = 'whitesmoke';
    estilo.position = 'fixed';
    estilo.cursor = 'pointer';
    estilo.top = '50%';
    estilo.right = '50%';
    estilo.transform = 'translate(390px, -246px)';
    estilo.width = '30px';
    estilo.height = '30px';
    estilo.border = '0';
    estilo.borderRadius = '50%';
    estilo.fontWeight = '900';
    estilo.textAlign = 'center'
    estilo.color = '#2b056b';

    return botao;
  }

  obterElementoDaImagem() {
    let imagem = document.createElement('img');
    imagem.classList.add(this.classDosElementos);
    imagem.src = this.caminhoDaImagem;
    imagem.alt = 'Mensagem da Digix';
    imagem.width = '800';
    imagem.onerror = () => this.fecharMensagemDaDigix();

    let estilo = imagem.style;
    estilo.zIndex = 9998;
    estilo.position = 'fixed';
    estilo.top = '50%';
    estilo.left = '50%';
    estilo.width = '820px';
    estilo.transform = 'translate(-50%, -50%)';

    return imagem;
  }

  obterElementoDaTelaDeBloqueio() {
    let telaDeBloqueio = document.createElement('div');
    telaDeBloqueio.classList.add(this.classDosElementos);
    telaDeBloqueio.onclick = () => this.fecharMensagemDaDigix();

    let estilo = telaDeBloqueio.style;
    estilo.backgroundColor = 'black';
    estilo.position = 'fixed';
    estilo.width = '100%';
    estilo.height = '100%';
    estilo.zIndex = 9997;
    estilo.top = '0';
    estilo.left = '0';
    estilo.opacity = 0.6;

    return telaDeBloqueio;
  }

  inserirLocalStorage() {
    let horas = 3600000 * 24;
    let expirarEm = (new Date().getTime()) + horas;

    localStorage.setItem(this.chave, JSON.stringify({
      'value': true,
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

  fecharMensagemDaDigix() {
    const elementos = document.getElementsByClassName(this.classDosElementos);
    while (elementos.length > 0) {
      elementos[0].remove();
    }
  }

  fecharMensagemComEsc(evento) {
    evento = evento || window.event;
    let esc = 27;
    if (evento.keyCode === esc) {
      this.fecharMensagemDaDigix();
    }
  }
}
