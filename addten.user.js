// ==UserScript==
// @name         Add Ten
// @namespace    https://github.com/ChekinNooget
// @version      0.1
// @description  Add Ten QoL
// @author       Chekin Nooget
// @match        https://beastacademy.com/all-ten
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

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
    navigator.clipboard.writeText(fullText);
  };
})();
