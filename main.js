'use strict'

let textInput = document.querySelector('.textInput');
let lengthWOblank = document.querySelector('.lengthWOblank');
let lengthWblank = document.querySelector('.lengthWblank');
let words = document.querySelector('.words');
let readingTime = document.querySelector('.readingTime');
let wordCount = 0;

// let lengthValue = 0;

const slider = document.querySelector(".slider");
const cpmPara = document.querySelector(".cpm")
const cpmPara2 = document.querySelector(".cpm2")
const speedPara = document.querySelector(".speed");
// const customizedCPM = 

let textInput2 = document.querySelector('.textInput2');

let readingTimeValue =0;
let cpm = 0;
const radioBtn = document.getElementsByName('checking');
// console.log(radioBtn[0].checked);
// console.log(radioBtn[1].checked);


let seconds = 20;

let numberOfPPT = document.querySelector('.numberOfPPT');
let termOfPPT = document.querySelector('.termOfPPT');
let materialTime = document.querySelector('.materialTime');
let pptTime=0;

// keyup과 input 
// keyup은 right-click & paste일 때는 event되지 않는다.

textInput.addEventListener(('input'), ()=>{
    // let inputText = e.target.value;
    textInput.value
    // 예외처리. 글자가 있었다가 지워지면, 빈 array로 남게되어, 글자/단어가 1로 취급됨.
    if (textInput.value == "") {
        words.innerHTML = "0 개";
        lengthWblank.innerHTML ="0 자 / 0 Byte";
        lengthWOblank.innerHTML= "0 자 / 0 Byte";
    } else {
        // console.log(`입력한 글자는 ${inputText} 입니다.`);
        // console.log(`글자수는 ${inputText.length}입니다.`);
        
        // 글자수세기(공백포함)
        lengthWblank.innerHTML = `${textInput.value.length} 자 / ${byteCounter(textInput.value,1)} Byte`;

        // 글자수세기(공백미포함)
        lengthWOblank.innerHTML = `${textInput.value.replace(/\s+/g, "").length} 자 / ${byteCounter(textInput.value.replace(/\s+/g,""),0)} Byte`;
        
        // 단어수세기
        countWords(textInput.value);
    }
    calPTtime()
})

let sliderContainer = document.querySelector('.sliderContainer')
let customizeContainer = document.querySelector('.customizeContainer')

radioBtn[0].onclick = function () {
    sliderContainer.style.backgroundColor = "var(--color-second)";
    customizeContainer.style.backgroundColor = "transparent";
    calPTtime()
}

radioBtn[1].onclick = function () {
    sliderContainer.style.backgroundColor = "transparent";
    customizeContainer.style.backgroundColor = "var(--color-second)";
    calPTtime()
}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    calPTtime()
}
numberOfPPT.oninput = function() {
    calPTtime()
}
termOfPPT.oninput = function() {
    calPTtime()
}
materialTime.oninput = function() {
    calPTtime()
}
textInput2.oninput = function() {
    calPTtime()
}

function calPTtime() {
    if (radioBtn[0].checked) {
        cpm = slider.value
        cpmPara.innerHTML = `${slider.value} CPM (Character/Minute)`;
        cpmPara2.innerHTML = ` (${slider.value} CPM)`;
        pptTime=0;
        
    } else {        
        if (textInput2.value=="") {
            readingTime.innerHTML = "Please, Customize"
            cpmPara2.innerHTML = ""
            return;
        }
        cpm = Math.round((textInput2.value.trim().replace(/\s+/g, " ").length/seconds)*60)
        cpmPara2.innerHTML = ` (${cpm} CPM)`;
        
        if (numberOfPPT.value=="" || numberOfPPT.value <0) {
            numberOfPPT.value=0
        }
        if (termOfPPT.value=="" || termOfPPT.value <0) {
            termOfPPT.value=0
        }
        if (materialTime.value=="" || materialTime.value <0) {
            materialTime.value=0
        }
        if (numberOfPPT.value <= 1) {
            pptTime = parseFloat(materialTime.value);
        } else {
            pptTime = (parseFloat(numberOfPPT.value)-1)*parseFloat(termOfPPT.value)+parseFloat(materialTime.value);
        }
    }    
    readingTimeValue= pptTime+(textInput.value.trim().replace(/\s+/g, " ").length/cpm)*60;
    if (readingTimeValue <=60) {
        readingTime.innerHTML = `${Math.round(readingTimeValue)}초`
    } else {
        readingTime.innerHTML = `${Math.floor(readingTimeValue/60)}분 ${Math.round(readingTimeValue-(Math.floor(readingTimeValue/60))*60)}초`
    }
    
}

function showSpeed(speed) {
    if (speed > 480) {
        speedPara.innerHTML = ""
    } else if (speed> 460) {
        speedPara.innerHTML = ""
    } else if (speed > 410) {
        speedPara.innerHTML = ""
    } else if (speed > 390) {
        speedPara.innerHTML = ""
    } else {
        speedPara.innerHTML = ""
    }   
    // 
}


// stop watch
var stTime = 0
var endTime = 0
var timerStart
var min
var sec
var milisec
var startBtn = document.getElementById('testStartBtn')
var stopBtn = document.getElementById('testStopBtn')
// var recordList = document.getElementById('testRecordList')

startBtn.addEventListener('click', function() {
    if(!stTime) {
        stTime = Date.now() // 최초 START
    } else if (this.innerText === "RESTART"){
        stopBtn.innerText = 'STOP';
        this.innerText ="START";
        stTime += (Date.now() - endTime) // RESTART
    } else if (this.innerText==="START") {
        return;
    }

    timerStart = setInterval(function() {
        var nowTime = new Date(Date.now() - stTime)
        min = addZero(nowTime.getMinutes())
        sec = addZero(nowTime.getSeconds())
        milisec = addZero(Math.floor(nowTime.getMilliseconds() / 10))
        document.getElementById('postTestMin').innerText = min
        document.getElementById('postTestSec').innerText = sec
        document.getElementById('postTestMilisec').innerText = milisec
    }, 1)
})

stopBtn.addEventListener('click', function() {
    if(timerStart) {
        clearInterval(timerStart) // STOP
        
        if(this.innerText == 'STOP') {
            endTime = Date.now()
            this.innerText = 'RESET'
            startBtn.innerText = 'RESTART'
        } else { // RESET
            stTime = 0
            min = 0
            sec = 0
            milisec = 0
            document.getElementById('postTestMin').innerText = '00'
            document.getElementById('postTestSec').innerText = '00'
            document.getElementById('postTestMilisec').innerText = '00'
            startBtn.innerText = 'START'
            this.innerText = 'STOP'
            timerStart = null
        }
    }
})

function addZero(num) {
return (num < 10 ? '0'+num : ''+num)
}




// 출처: https://im-developer.tistory.com/53 [Code Playground]
// text.replace(/[^_0-9a-zA-Z]/g, " ").trim().split(/\s+/).length

// 1. 띄어쓰기는 1번을 단어 하나로 취급
// 2. 마지막 글자는 띄어쓰기 되지 않을 것. -> +1 단어.
// 3. 줄바꿈을 인식시키자
// 뭐야 정규식 /\s+/를 쓰면 해결되잖아.. - 만능인가 ??
// console.log(/s+/);

function countWords(text) {
    
    let arr = text.trim().split(/\s+/);
    wordCount=0;

    for (let i=0; i<arr.length; i++) {
        if (isWord(arr[i])) {
            wordCount++
        }
    };

    // 문제점 : gytks4@naver.com / 010-1234-5678 / Mr. / 2.4 등을 2개 이상의 단어로 취급

    // 정규식
    // wordCount=text.replace(/[^_0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g, " ").trim().split(/\s+/).length;
    // console.log(text.replace(/[^_0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g, " ").trim().split(/\s+/));

    // for (let i = 0; i <= text.length; i++) {
    //   if (text.charAt(i) === /s+/) {
    //     wordCount++;
    //   }
    // }
    words.innerHTML = `${wordCount} 개`;
  }

function byteCounter(text, blank=0) {
    // blank = 0 -> 공백 미포함  ,  blank = 1 -> 공백 포함
    let byte = 0;
    if (blank=0) {
        text = text.replace(/\s+/g,"");
    } 
        
    for(let i=0; i<text.length;i++) {
        if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(text[i])) {
            byte = byte+2
        } else {
            byte++
        }
    }
    return byte
}

// function byteWOblankCounter (text) {
//     text = text.replace(/\s+/,"");


// }


// console.log(isWord("b"));
// const b= "010"
// console.log(/[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/.test(b));

function isWord(str) {
    let alphaNumericFound = false;
    for (let i = 0; i < str.length; i++) {
        if (/[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/.test(str[i])) {
            alphaNumericFound = true;
            return alphaNumericFound
        }
    }
    return alphaNumericFound;
}


// cpmPara.innerHTML = slider.value; // Display the default slider value




// let box1p = document.querySelector('.box1 p:nth-child(1)')
// console.log(slider.style.width);
// console.log(box1p.style.wordSpacing);
// box1p.style.wordSpacing = slider.style.width;


//     const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
// korean.test(string);


// 공백제거 정규식
//   $str = preg_replace("/\s+/", "", $str);

//   공백일때 : /\s/
//   공백 2개 이상일때 : /[ ]{2,}/ 또는 /\s{2,}/
//   공백이 2개일때 : /\s\s/
//   모든 공백을 없앨 때 : /\s+/



// function countWords() {
//     textInput
// }


