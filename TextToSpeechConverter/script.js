let speeech = new SpeechSynthesisUtterance();

let voices= [];

let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speeech.voice = voices[0];

    voices.forEach((voice,i)=>(voiceSelect.options[i] = new Option(voice.name,i)));
};

voiceSelect.addEventListener("change", ()=>{
    speeech.voice= voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click",()=>{
    speeech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speeech);
});