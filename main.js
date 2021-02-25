'use strict'

let textInput = document.querySelector('.textInput');
let lengthWOblank = document.querySelector('.lengthWOblank');
let lengthWblank = document.querySelector('.lengthWblank');
let words = document.querySelector('.words');
let readingTime = document.querySelector('.readingTime');


textInput.addEventListener(('keyup'), (e)=>{
    // console.log("텍스트가 입력되었습니다.");
    // console.log(textInput.value);
    let inputText = e.target.value;
    
    console.log(`입력한 글자는 ${inputText} 입니다.`);
    console.log(`글자수는 ${inputText.length}입니다.`);
    
    lengthWblank.innerHTML = inputText.length;
    // = inputText.length;
    wordCounter(inputText);
})

// text.replace(/[^_0-9a-zA-Z]/g, " ").trim().split(/\s+/).length

// 1. 띄어쓰기는 1번을 단어 하나로 취급
// 2. 마지막 글자는 띄어쓰기 되지 않을 것. -> +1 단어.
// 3. 줄바꿈을 인식시키자
// 뭐야 정규식 /\s+/를 쓰면 해결되잖아.. - 만능인가 ??ㄴㅋ
// console.log(/s+/);

function wordCounter(text) {
    
    let wordCount = 0;

    // 정규식
    wordCount=text.replace(/[^_0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g, " ").trim().split(/\s+/).length;
    console.log(text.replace(/[^_0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g, " ").trim().split(/\s+/));
    // for (let i = 0; i <= text.length; i++) {
    //   if (text.charAt(i) === /s+/) {
    //     wordCount++;
    //   }
    // }
    
    words.innerHTML = wordCount;
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