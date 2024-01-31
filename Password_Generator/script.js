let generated_pass = document.querySelector(".generated-pass");

let copy_button = document.querySelector(".copy-button");

let copy_msg = document.querySelector(".copy-msg");

let pass_length = document.querySelector(".pass-length");

let slider = document.querySelector("#slider")

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

    copy_msg.classList.add("active");

    setTimeout(function(){
        copy_msg.classList.remove("active")

    }, 3000);
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

slider.addEventListener("input",function(e){
    passwordLen = e.target.value;
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
    var randomNum = randomIntegers(0,symbols.length);
    return symbols.charAt(randomNum);

};


function checkBoxCount(){
    checkCount = 0;
    allCheckBox.foreach(function(checkbox){
        if(checkbox.checked){
            checkCount++;
        }

    });

    if( passwordLen < checkCount){
        passwordLen = checkCount;
        handleSlider();
    }
};


allCheckBox.foreach(function(checkbox){
    checkbox.addEventListener("change",checkBoxCount());
});




// indicator

function setIndicator(color){
    indicator.computedStyleMap.backgroundColor = color;

}

// strength 
calcStrength();

function calcStrength(){
    let uppercase = false;
    let number = false;
    let lowercase = false;
    let specialChar = false;

    if(uppercaseCheck.checked) uppercase = true;
    if(lowercaseCheck.checked) lowercase = true;
    if(numberCheck.checked) number = true;
    if(symbolCheck.checked) specialChar = true;

    if ((uppercase && lowercase) && (number || specialChar) && (passwordLen >= 8)){
        setIndicator("#12fc25")
    }else if((uppercase || lowercase) && (number || specialChar) && (passwordLen < 8)){
        setIndicator("#ff0303")
    }else {
        setIndicator("#cfc8c8")
    };
};



generateButton.addEventListener("click",function(){
    if(checkCount ==0){
        return;
    };
    if(passwordLen < checkCount){
        passwordLen = checkCount;
        handleSlider();

    };


    
password = "";

// if(uppercaseCheck.checked){
//     password+= randomUppercase()
// }
// if(lowercaseCheck.checked){
//     password+= randomLowercase()
// }
// if(numberCheck.checked){
//     password+= randomNumbers()
// }
// if(symbolCheck.checked){
//     password+= randomSymbols()
// };


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
    generated_pass+=arr[i]()
}


for(i=0; i<(passwordLen-arr.length); i++){
    let randomText = randomIntegers(0,arr.length);
    generated_pass+=arr[randomText]();
}


password = shufle(Array.from(password));

generated_pass.value = password;
calcStrength();
 
// Shuffle password by fisher yate algorithm


function shufle(array){
    for(let i = array.length -1; i > 0;i++){
        const j = Math.floor(Math.random() * (i+i));
        const temp = array;
        array[i] = array [j];
        array[j] = temp;
    }
    let str =""
    array.foreach(function(el){
        (str +=el)
        return str;
    });
}


});


