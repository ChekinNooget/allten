// ==UserScript==
// @name         Add Ten
// @namespace    https://github.com/ChekinNooget
// @version      0.2
// @description  Add Ten QoL
// @author       Chekin Nooget
// @match        https://beastacademy.com/all-ten
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  //variable setup
  let [seconds, minutes, hours] = [0, 0, 0];
  //check current puzzle numbers
  let number = "c-ejvBir-hVkEDL-color-start";
  let tempNum = "";
  for (let i = 0; i < document.getElementsByClassName(number).length; i++) {
    tempNum += document.getElementsByClassName(number)[i].textContent;
  }
  if (localStorage.getItem("puzzleData") != tempNum) {
    resetTimer();
  }
  localStorage.setItem("puzzleData", tempNum);
  console.log(tempNum);

  //previous data
  let numCorrect = 0;
  if (localStorage.getItem("seconds") != null) {
    seconds = parseInt(localStorage.getItem("seconds"));
    minutes = parseInt(localStorage.getItem("minutes"));
    hours = parseInt(localStorage.getItem("hours"));
  }

  function resetTimer() {
    seconds = 0;
    minutes = 0;
    hours = 0;
    localStorage.setItem("seconds", 0);
    localStorage.setItem("minutes", 0);
    localStorage.setItem("hours", 0);
  }

  function displayTimer() {
    //check if puzzle already done
    var numDiv = document.getElementsByClassName("c-dbeeKY")[0];
    numCorrect = 0;
    for (let i = 0; i < numDiv.childElementCount; i++) {
      if (
        numDiv.childNodes[i].classList.contains("c-deVqUi-iGMBTS-done-true")
      ) {
        numCorrect++;
      }
    }
    if (numCorrect >= 10) {
      //if all ten complete then exit timer and set reset timer var
      clearInterval(timerInterval);
      localStorage.setItem("shouldReset", "true");
    } else {
      if (localStorage.getItem("shouldReset") == "true") {
        //if the puzzle is reset then restart timer
        localStorage.setItem("shouldReset", "false");
        resetTimer();
      }

      //otherwise count up
      seconds++;
      if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
          minutes = 0;
          hours++;
        }
      }
      //set timer to local storage
      localStorage.setItem("seconds", seconds.toString());
      localStorage.setItem("minutes", minutes.toString());
      localStorage.setItem("hours", hours.toString());
    }
  }
  let timerInterval = null;
  timerInterval = setInterval(displayTimer, 1000);

  document.getElementsByClassName("c-eIlzGH")[0].onclick = function () {
    var numDiv = document.getElementsByClassName("c-dbeeKY")[0];
    const textArr = [];
    var fullText = "";
    for (let i = 0; i < numDiv.childElementCount; i++) {
      textArr[i] = numDiv.childNodes[i].textContent + " ";
      if (
        numDiv.childNodes[i].classList.contains("c-deVqUi-iGMBTS-done-true")
      ) {
        textArr[i] = textArr[i] + "[color=#0f0][aops]q[/aops][/color] ";
      } else {
        textArr[i] = textArr[i] + "[color=#f00][aops]J[/aops][/color] ";
      }
    }
    for (let i = 0; i < textArr.length; i++) {
      fullText = fullText + textArr[i];
    }
    var copyElem = document.getElementById("3834033daa48");
    copyElem.querySelector(":nth-child(3)").textContent = fullText;
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    var temp = `${h}:${m}:${s}`;
    copyElem.querySelector(
      ":nth-child(4)"
    ).textContent = `[url]https://beastacademy.com/all-ten[/url]\n${temp}`;
  };
})();
