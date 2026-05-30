let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US";   // fixed language
    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    let day = new Date();
    let hours = day.getHours();

    if(hours >= 0 && hours < 12){
        speak("Good Morning Sir");
    }
    else if(hours >= 12 && hours < 16){
        speak("Good Afternoon Sir");
    }
    else{
        speak("Good Evening Sir");
    }
}

window.addEventListener('load', ()=>{
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event)=>{
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;

    content.innerText = transcript;

    takeCommand(transcript.toLowerCase());
};

recognition.onend = ()=>{
    btn.classList.remove('hidden');
    voice.classList.remove('voice-visible');
    voice.classList.add('voice-hidden');
};

btn.addEventListener("click", ()=>{
    recognition.start();
    btn.classList.add('hidden');
    voice.classList.remove('voice-hidden');
    voice.classList.add('voice-visible');
});

function takeCommand(message){

    btn.classList.remove('hidden');
    voice.classList.remove('voice-visible');
    voice.classList.add('voice-hidden');

    if(message.includes("hello") || message.includes("hey")){
        speak("Hello Sir, What can I help you?");
    }

    else if(message.includes("who are you")){
        speak("I am a Virtual Assistant created by Manoj Sir");
    }

    else if(message.includes("open youtube")){
        speak("Opening YouTube");
        window.open("https://www.youtube.com","_blank");
    }

    else if(message.includes("open google")){
        speak("Opening Google");
        window.open("https://www.google.com","_blank");
    }

    else if(message.includes("open facebook")){
        speak("Opening Facebook");
        window.open("https://www.facebook.com","_blank");
    }

    else if(message.includes("open instagram")){
        speak("Opening Instagram");
        window.open("https://www.instagram.com","_blank");
    }

    else if(message.includes("open calculator")){
        speak("Opening Calculator");
        window.open("calculator://");
    }

    else if(message.includes("open whatsapp")){
        speak("Opening Whatsapp");
        window.open("whatsapp://");
    }

    else if(message.includes("time")){
        let time = new Date().toLocaleTimeString();
        speak("The time is " + time);
    }

    else if(message.includes("date")){
        let date = new Date().toLocaleDateString(undefined,{
            day:"numeric",
            month:"short",
            year:"numeric"
        });
        speak("Today's date is " + date);
    }

    else{
        speak("This is what I found on the internet regarding " + message);
        window.open(`https://www.google.com/search?q=${message}`,"_blank");
    }
}
