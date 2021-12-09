let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');

let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');


let etapaAtual = 0;
let numero = '';
let brancoVoto = false;

const comecarEtapa = () =>{
    let etapa = etapas[etapaAtual];
    let numeroHTML = '';
    brancoVoto = false;

     for(let i = 0;  i< etapa.numeros; i++){

        if(i === 0){
            numeroHTML += '<div class="numero pisca"></div>';
        }else{
            numeroHTML += '<div class="numero"></div>';
        }
     }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

const atualizaInterface = () =>{
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) =>{
        if(item.numero === numero){
            return true;
        }
        else
        {
            return false;
        }
    })

    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} </br>Partido: ${candidato.partido} </br> `;

        let fotosHTML = '';

        for(let i in candidato.fotos){

            if(candidato.fotos[i].small){
                fotosHTML += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="" /> ${candidato.fotos[i].legenda} </div>`
            } else {
                fotosHTML += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="" /> ${candidato.fotos[i].legenda} </div>`
            }
            
        }

        lateral.innerHTML = fotosHTML;
    } else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO </div>';
    }
}

const clicou = (n) =>{
        let elNumero = document.querySelector('.numero.pisca');
        if(elNumero !== null){
            elNumero.innerHTML = n;
            numero =`${numero}${n}`;

            elNumero.classList.remove('pisca');
            if(elNumero.nextElementSibling !== null){
                elNumero.nextElementSibling.classList.add('pisca');
            } else {
                atualizaInterface();
            }
        }
}

const branco = () =>{
    if(numero === ''){
        brancoVoto = true;
        seuVotoPara.style.display =  'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO </div>';
        document.querySelector('.aviso--grande.pisca').style.fontSize = '30px';
    }
}

const corrige = () =>{
    numero = '';
    comecarEtapa();
}

const confirma = () =>{
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(brancoVoto === true){
        votoConfirmado = true;
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            numero = '';
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM </div>';
        }
    }
}


comecarEtapa();