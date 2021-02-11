import { miles_KMs, roundoff } from "./calculator";

const userInput = document.querySelector("#distanceMiles");
const submitID = document.querySelector("#submitID");
const answerID = document.querySelector("#answerID");


submitID.addEventListener("click", () => {
  // The value of your input
  let distanceMiles = userInput.value;

  // The results in kilometers after conversion
  let distanceKMs = miles_KMs(distanceMiles);

  // Writing answer into the dom
  let theAnswer = roundoff(distanceKMs, 3);

  if (theAnswer){
      answerID.style.color = "#28a745";
      answerID.innerHTML = `${theAnswer} kilometers`
  }else{
      answerID.style.color = 'red'
      answerID.innerHTML = `${distanceMiles} is not a valid number`;
  }
});

userInput.addEventListener('focus', () => {
    userInput.value = ''
})
