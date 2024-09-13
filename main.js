let varH1 = document.querySelector('h1');
let varP = document.querySelector('.texto__paragrafo');
let input = document.querySelector('.container__input');
let botaoReiniciar = document.getElementById('reiniciar');

let numerosecreto;
let tentativa = 1;
const maxTentativas = 10;

function limpaInput()
{
    document.querySelector('input').value = ''; // Limpa o input corretamente
}

function iniciarJogo() 
{
    numerosecreto = Math.floor(Math.random() * 100) + 1;
    tentativa = 0;
    limpaInput();
    varH1.innerHTML = 'Siribet Secrets';
    varP.innerHTML = 'Bem-Vindo ao Siriema Bet, Adivinhe o número e ganhe até 1 milhão de reais!!!!!!';
    botaoReiniciar.setAttribute('disabled', 'true'); // Desabilita o botão até o jogo terminar
    responsiveVoice.speak('Konnichiwa Pobre, Bem vindo ao Siribet', "Japanese Female", { pitch: 1 });
}

function verificarChute() 
{
    let guess = parseInt(input.value, 10);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        varP.innerHTML = 'SABE LER NÃO CARAI, É UM NÚMERO ENTRE 1 A 100 ANIMAL.';
        responsiveVoice.speak('Sabe lee não, carai', "Japanese Female", { pitch: 1 });
        return;
    }

    tentativa++;
    limpaInput();
    let tentativasRestantes = maxTentativas - tentativa;

    if (numerosecreto === guess) 
        {
        varH1.innerHTML = 'Você venceu!';
        let word_tentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        varP.innerHTML = `O número secreto era ${numerosecreto}. Você acertou em ${tentativa} tentativas. Voce ganhou 1 milhão de reais. Agora para receber seu prêmio mande foto do cartão frente e verso!`;

        botaoReiniciar.removeAttribute('disabled');
        input.setAttribute('disabled', 'true');

        responsiveVoice.speak('Para benes, Pobre, voce ganiou, manda photo do, card', "Japanese Female", { pitch: 1 });
    
        // 2. Depois de 3 segundos, faz o download do arquivo
        setTimeout(() => {
            let blob = new Blob([''], { type: 'text/plain' });
            let link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'virus_perigoso.txt'; // Nome do arquivo que será baixado
            link.click();
    
            // 3. Depois de mais 2 segundos, toca o áudio de vitória
            setTimeout(() => {
                let audioVitoria = document.getElementById('audioVitoria');
                audioVitoria.play();
            }, 1000); // Espera 1 segundo após o download para tocar o áudio
        }, 5000); // Espera 5 segundos após a fala para iniciar o download
    }
    
    else if (tentativa >= maxTentativas) 
    {
        varH1.innerHTML = 'Você perdeu Vacilão!';
        varP.innerHTML = `O número secreto era ${numerosecreto}. Você perdeu todas suas tentativas. E perdeu os 1 milhão de reias.`;
        botaoReiniciar.removeAttribute('disabled'); // Habilita o botão para reiniciar
        input.setAttribute('disabled', 'true');
        // Fala o texto de derrota
        responsiveVoice.speak('Voce per dew, Pobre Burro, Vai passar foome', "Japanese Female", { pitch: 1 });
    } 
    else 
    {
        if (guess < numerosecreto) {
            varP.innerHTML = `Tente novamente, o número é maior. (${tentativasRestantes} tentativas restantes)`;
        } else {
            varP.innerHTML = `Tente novamente, o número é menor. (${tentativasRestantes} tentativas restantes)`;
        }  
    }
}

botaoReiniciar.addEventListener('click', function() {
    iniciarJogo(); // Reinicia o jogo ao clicar
    botaoReiniciar.setAttribute('disabled', 'true'); // Desabilita novamente o botão
});

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        verificarChute();
    }
});

iniciarJogo();
