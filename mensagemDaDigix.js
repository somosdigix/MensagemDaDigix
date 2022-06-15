class MensagemDaDigix {
  constructor(caminhoDaImagem, sistemas = []) {
    this.chave = 'mensagemDaDigix';
    this.sistemas = sistemas;
    this.caminhoDaImagem = caminhoDaImagem;
    this.classDosElementos = 'mensagemDaDigix';
    document.onkeydown = (evento) => this.fecharMensagemComEsc(evento);
  }

  iniciar() {
    fetch(this.caminhoDaImagem)
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
      const sistemas = this.sistemas;

      if (sistemas.length > 0) {
        sistemas.forEach(sistema => {
          if(sistema === window.location.host) {
            this.construirOsElementos();
            this.inserirLocalStorage();
          }
        });
        return;
      } 
        
      this.construirOsElementos();
      this.inserirLocalStorage();
    }
  }

  construirOsElementos() {
    let body = document.querySelector('body');
    let telaDeBloqueio = this.obterElementoDaTelaDeBloqueio();
    let imagem = this.obterElementoDaImagem();
    body.appendChild(telaDeBloqueio);
    body.appendChild(imagem);
  }

  obterElementoDaImagem() {
    let imagem = document.createElement('img');
    imagem.classList.add(this.classDosElementos);
    imagem.src = this.caminhoDaImagem;
    imagem.alt = 'Mensagem da Digix';
    imagem.width = '640';
    imagem.onclick = () => this.fecharMensagemDaDigix();
    imagem.onerror = () => this.fecharMensagemDaDigix();

    let estilo = imagem.style;
    estilo.zIndex = 9998;
    estilo.position = 'fixed';
    estilo.cursor = 'pointer'
    estilo.top = '50%';
    estilo.left = '50%';
    estilo.width = '640px';
    estilo.maxWidth = '100%'
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

const sistema = {
   cheffescolar: 'cheffescolar.sed.ms.gov.br',
   habix: 'habix.agehab.ms.gov.br',
   humani: 'humani.ms.gov.br',
   nexxus: 'nexxus.sed.ms.gov.br',
   papelzero: 'papelzero.sed.ms.gov.br', 
   papelzeroagehab: 'papelzero.agehab.ms.gov.br',
   papelzerosefaz: 'papelzero.sefaz.ms.gov.br'
}

const sistemasComMensagemHabilitada = [
  sistema.nexxus
]

const caminhoDaImagem = 'https://somosdigix.github.io/MensagemDaDigix/mensagem-suporte.png';
//new MensagemDaDigix(caminhoDaImagem, sistemasComMensagemHabilitada).iniciar();
