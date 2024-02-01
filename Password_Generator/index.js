const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "1234567890";
const symbolSet = "~`!@#$%^&*()_-+=<>?/[]{},.:;'|";

const copy_button = document.querySelector(".copy-button");

const copy_msg = document.querySelector(".copy-msg");


// Fetching all input parameters

const slider = document.querySelector("#slider");
const upperCase = document.querySelector("#uppercase");
const lowerCase = document.querySelector("#lowercase");
const number = document.querySelector("#numbers");
const symbol = document.querySelector("#symbols");

const pass_length = document.querySelector(".pass-length");

const passBox = document.querySelector(".pass-box");

const generateBtn = document.querySelector(".generate-button");

// Slider

let passwordLength = 10;
handleSlider();

function handleSlider(){
    slider.value = passwordLength;
    pass_length.innerText = passwordLength;
}

slider.addEventListener("input",function(event){
    passwordLength = event.target.value;
    handleSlider();
});


// generating the password characters

const getRandomData = (dataSet) => {
    return dataSet[Math.floor(Math.random() * dataSet.length)]
};


const generatePassword = (password = "") => {
    if (upperCase.checked) {
        password += getRandomData(upperSet)
    }
    if (lowerCase.checked) {
        password += getRandomData(lowerSet)
    }
    if (number.checked) {
        password += getRandomData(numberSet)
    }
    if (symbol.checked) {
        password += getRandomData(symbolSet)
    }
    
    if(password.length < pass_length.value){
        return getRandomData(password);
    };
    
    passBox.value += truncateString(password,pass_length.value);
    
};

generatePassword();

generateBtn.addEventListener("click",function(){
    generatePassword();
});



function truncateString(str, num) {
    if (str.length > num) {
        let subStr = str.substring(0, num);
        return subStr;
    } else {
        return str;
    }
}



// copy button

async function copy_content(){
    try{
        await navigator.clipboard.writeText(passBox.value);
        copy_msg.innerText = "copied";
        passBox.value="";
    }
    catch(e){
        copy_msg.innerText = "failed";
    };

    copy_msg.style.cssText = "opacity:1";

    setTimeout(function(){
        copy_msg.style.cssText = "opacity:0";

    }, 2000);
};


copy_button.addEventListener("click",function(){
    if(passBox.value){
        copy_content();
    }
})
