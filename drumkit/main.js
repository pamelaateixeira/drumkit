'use strict';

const sons = {
    '1': 'birds.crdownload',
    '2': 'bittersuit.crdownload',
    '3': 'xiriro.crdownload',
    '4': 'greast.crdownload',
    '5': 'flow.crdownload',
    '6': 'diner.crdownload',
}

let audioAtual = null; // Variável para armazenar o áudio atual

const criarDiv = (texto) => {
    const div = document.createElement('div');
    div.classList.add('key');
    div.textContent = texto;
    div.id = texto;
    document.getElementById('container').appendChild(div);
}

const exibir = (sons) => Object.keys(sons).forEach(criarDiv);

const tocarSom = (letra) => {
    // Se houver um áudio tocando, pausa-o antes de tocar o próximo
    if (audioAtual) {
        audioAtual.pause();
        audioAtual.currentTime = 0; // Reseta o tempo do áudio
    }
    
    // Cria e toca o novo áudio
    const audio = new Audio(`./sounds/${sons[letra]}`);
    audio.play();
    
    // Armazena a referência do áudio atual
    audioAtual = audio;
}

const adicionarEfeito = (letra) => document.getElementById(letra)
                                           .classList.toggle('active');

const removerEfeito = (letra) => {
    const div = document.getElementById(letra);
    const removeActive = () => div.classList.remove('active');
    div.addEventListener('transitionend', removeActive);
};

const ativarDiv = (evento) => {
    const letra = evento.type == 'click' ? evento.target.id : evento.key.toUpperCase();
    
    const letraPermitida = sons.hasOwnProperty(letra);
    if (letraPermitida){
        adicionarEfeito(letra);
        tocarSom(letra);
        removerEfeito(letra);
    }
}

exibir(sons);
document.getElementById('container')
        .addEventListener('click', ativarDiv);

window.addEventListener('keyup', ativarDiv);
