let generated_pass = document.querySelector(".generated-pass");

let copy_button = document.querySelector(".copy-button");

let copy_msg = document.querySelector(".copy-msg");

let pass_length = document.querySelector(".pass-length");

let slider = document.querySelector("#slider");

let symbols = "~`!@#$%^&*()_-+=<>?/[]{},.:;'|";

let numberCheck = document.querySelector("#numbers");

let uppercaseCheck = document.querySelector("#uppercase");

let lowercaseCheck = document.querySelector("#lowercase");

let symbolCheck = document.querySelector("#symbols");

let indicator = document.querySelector(".indicator");

let allCheckBox = document.querySelector("input[type=checkbox]");

let generateButton = document.querySelector(".generate-button")

let password = "";

let checkCount = 0;




// copy button function 

async function copy_content(){
    try{
        await navigator.clipboard.writeText(generated_pass.value);
        copy_msg.innerText = "copied";
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
    if(generated_pass.value){
        copy_content();
    }
})



// slider 

let passwordLen = 8;

handleSlider();

function handleSlider(){
    slider.value = passwordLen;
    pass_length.innerText = passwordLen;

}

slider.addEventListener("input",function(event){
    passwordLen = event.target.value;
    handleSlider();
});



// checkbox 

function randomIntegers(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
};

function randomNumbers(){
    return randomIntegers(0,9);
};

function randomUppercase(){
    return String.fromCharCode(randomIntegers(65,91));
};

function randomLowercase(){
    return String.fromCharCode(randomIntegers(97,123));
};

function randomSymbols(){
    const randomNum = randomIntegers(0,symbols.length);
    return symbols.charAt(randomNum);

};



// checkbox count 


function checkBoxChangeCount(){
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    if( passwordLen < checkCount){
        passwordLen = checkCount;
        handleSlider();
    };

};

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener("change",checkBoxChangeCount)
    
});


// indicator

function setIndicator(color){
    indicator.style.backgroundColor = color;

}


// calculating strength 


function calcStrength(){
    let uppercase = false;
    let number = false;
    let lowercase = false;
    let specialChar = false;

    if(uppercaseCheck.checked) uppercase = true;
    if(lowercaseCheck.checked) lowercase = true;
    if(numberCheck.checked) number = true;
    if(symbolCheck.checked) specialChar = true;

    if ((uppercase && lowercase) && (number || specialChar) && passwordLen >= 8){
        return setIndicator("#12fc25")
    }else if((uppercase || lowercase) && (number || specialChar) && passwordLen >=6){
        return setIndicator("#ff0303")
    }else {
        return setIndicator("#cfc8c8")
    };
};



// Shuffle password by fisher yate algorithm


function shuffle(array){
    for(let i = array.length - 1; i > 0;i--){
        const j = Math.floor(Math.random() * (i+i));
        const temp = array[i];
        array[i] = array [j];
        array[j] = temp;
    }
    let str =""
    array.foreach((el) => (str += el));
    return str;
};




// Generate button


generateButton.addEventListener("click",function(){
    if(checkCount ==0) return;
        
    if(passwordLen < checkCount){
        passwordLen = checkCount;
        handleSlider();

    };
    
    password = "";
    
    let arr = [];
    
    if(uppercaseCheck.checked){
            arr.push(randomUppercase())
        }
    if(lowercaseCheck.checked){
            arr.push(randomLowercase())
        }
    if(numberCheck.checked){
            arr.push(randomNumbers())
        }
    if(symbolCheck.checked){
            arr.push(randomSymbols())
        }
    
    
    for(let i = 0; i<arr.length; i++){
        password+=arr[i]();
    }
    
    
    for(let i=0; i<passwordLen-arr.length; i++){
        let randomIndex = randomIntegers(0,arr.length);
        password+=arr[randomIndex]();
    }
    
    // password = shuffle();
    
    password = shuffle(Array.from(password));
    
    generated_pass.value = password;
    calcStrength();

});


