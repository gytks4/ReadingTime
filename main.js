'use strict'

let textInput = document.querySelector('.textInput');
let lengthWOblank = document.querySelector('.lengthWOblank');
let lengthWblank = document.querySelector('.lengthWblank');
let words = document.querySelector('.words');
let readingTime = document.querySelector('.readingTime');
let wordCount = 0;

let lengthValue = 0;

const slider = document.querySelector(".slider");
const cpm = document.querySelector(".cpm")

let readingTimeValue =0;

textInput.addEventListener(('keyup'), (e)=>{
    // console.log("텍스트가 입력되었습니다.");
    console.log(textInput.value);
    
    let inputText = e.target.value;
    
    // 예외처리. 글자가 있었다가 지워지면, 빈 array로 남게되어, 글자/단어가 1로 취급됨.
    if (inputText == "") {
        words.innerHTML = 0;
        lengthWblank.innerHTML =0;
        lengthWOblank.innerHTML=0;
    } else {
        // console.log(`입력한 글자는 ${inputText} 입니다.`);
        // console.log(`글자수는 ${inputText.length}입니다.`);
        
        // 글자수세기(공백포함)
        lengthWblank.innerHTML = `${inputText.length} 자 / ${byteCounter(inputText,1)} byte`;

        // 글자수세기(공백미포함)
        lengthWOblank.innerHTML = `${inputText.replace(/\s+/g, "").length} 자 / ${byteCounter(inputText.replace(/\s+/g,""),0)} byte`;
        
        // 단어수세기
        wordCounter(inputText);
    }
    lengthValue= inputText.length;
    
     readingTimeValue= (inputText.length/slider.value)*60;
     console.log(readingTimeValue);
     readingTime.innerHTML = `${Math.floor(readingTimeValue/60)}분 ${Math.round(readingTimeValue-(Math.floor(readingTimeValue/60))*60)}초`

})

// text.replace(/[^_0-9a-zA-Z]/g, " ").trim().split(/\s+/).length

// 1. 띄어쓰기는 1번을 단어 하나로 취급
// 2. 마지막 글자는 띄어쓰기 되지 않을 것. -> +1 단어.
// 3. 줄바꿈을 인식시키자
// 뭐야 정규식 /\s+/를 쓰면 해결되잖아.. - 만능인가 ??
// console.log(/s+/);

function wordCounter(text) {
    
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


// cpm.innerHTML = slider.value; // Display the default slider value

cpm.innerHTML = `${slider.value} Character / Minute`

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    if (textInput.value=="") {
        readingTime.innerHTML= 0;
    } else {
        readingTimeValue= (textInput.value.length/this.value)*60;
        readingTime.innerHTML = `${Math.floor(readingTimeValue/60)}분 ${Math.round(readingTimeValue-(Math.floor(readingTimeValue/60))*60)}초`
    }
    console.log(readingTimeValue);
    cpm.innerHTML = `${this.value} Character / Minute`;
}



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


