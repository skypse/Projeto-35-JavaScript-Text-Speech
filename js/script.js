// Seleciona os elementos do DOM
const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

// Inicializa a síntese de voz e define uma variável para controlar se está falando
let synth = speechSynthesis,
isSpeaking = true;

// Função para obter e exibir as vozes disponíveis
function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        // Cria uma string de opção HTML com o nome e idioma da voz, marcando a opção como selecionada se for a voz padrão
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        // Insere a opção criada no final da lista de seleção de vozes no HTML
          voiceList.insertAdjacentHTML("beforeend", option);
    }
}

// Evento para atualizar as vozes quando elas mudam
synth.addEventListener("voiceschanged", voices);

// Função para converter texto em voz
function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

// Evento do botão para iniciar ou pausar a fala
speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        // Verifica se o texto tem mais de 80 caracteres
        if(textarea.value.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            // Controla a pausa e o retorno da fala
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});
