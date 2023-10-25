let select_From=document.getElementById("select_language_From");

let select_To=document.getElementById("select_language_to");

let select_box=document.querySelectorAll("select");

let translate_From=document.getElementById("translate__from");

let translate_To=document.getElementById("translate__to");

let exchange=document.querySelector(".exchange");

let copyIcons=document.querySelectorAll(".copy");
let speakerIcons=document.querySelectorAll(".speacker");

let translatBtn=document.getElementById("translate");

select_box.forEach((box) => {
    for(const country_code in countries) {
        box.innerHTML+=`
            <option value="${countries[country_code]}">${countries[country_code]}</option>
        `;
        // Set default value of boxes
        select_From.value="English";
        select_To.value="Arabic";
    }
});

// Swapping Function
exchange.addEventListener('click', function () {
    // Swapping The Select Box Value
    let temp=select_From.value;
    select_From.value=select_To.value;
    select_To.value=temp;

    // Swapping The Text
    let tempText=translate_From.value;
    translate_From.value=translate_To.value;
    translate_To.value=tempText;
});




translatBtn.onclick=function () {
    let text=translate_From.value;
    console.log(select_From.value, select_To.value, text);

    let apiURL=`https://api.mymemory.translated.net/get?q=${text}&langpair=${select_From.value}|${select_To.value}`;
    fetch(apiURL).then((response) => response.json()).then((data) => {
        console.log(data);

        translate_To.value=data.responseData.translatedText;
        console.log(data.responseData);
    });
};


copyIcons.forEach((copyIcon) => {
    copyIcon.addEventListener("click", function (e) {
        if(e.target.classList.contains("copy")) {
            if(e.target.id=="from") {
                navigator.clipboard.writeText(translate_From.value);
            } else {
                navigator.clipboard.writeText(translate_To.value);
            }
        } else {
            console.log("speaker");
        }
    });
});


speakerIcons.forEach((speacker) => {
    speacker.addEventListener('click', function (e) {
        if(e.target.classList.contains("speacker")) {
            let utlarance;
            if(e.target.id=="from") {
                // SpeechSynthesisUtterance represent speech request
                utlarance=new SpeechSynthesisUtterance(translate_From.value);
            } else {
                utlarance=new SpeechSynthesisUtterance(translate_To.value);
            }
            // Speak the passer utlarance
            speechSynthesis.speak(utlarance);
        }
    });
});