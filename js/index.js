const RANDOM_QUESTION_URL = "http://jservice.io/api/random";
let answerNode = null;
let numCorrect = 0;


document.addEventListener("DOMContentLoaded", function() {
  fetchTrivia();
  function fetchTrivia() {
    fetch(RANDOM_QUESTION_URL)
      .then(function(res) {
        return res.json();
      })
      .then(function(json) {
        publishTrivia(json[0]);
      });
  }
  
  function publishTrivia(trivia) {
    //   console.log(trivia)
    const questionNode = document.querySelector(".card-text");
    questionNode.textContent = trivia.question;
    const categoryNode = document.querySelector(".card-title");
    categoryNode.textContent = trivia.category.title;
    //   const answerNode = document.querySelector(
    //   "#answer .card-body .card-text"
    //   );
    //   console.log(answerNode);
    answerNode = document.querySelector("#answer");
    answerNode.querySelector(".card-text").textContent = trivia.answer;
    const checker = document.createElement('div')
    let correctCheck = document.createElement('p');
    correctCheck.innerHTML = "<br><b>Did you get it right?</b>";
    checker.appendChild(correctCheck)
    const yesButton = document.createElement('button')
    yesButton.id = 'yes'
    yesButton.textContent = "YES! HA."
    checker.appendChild(yesButton);
    const noButton = document.createElement('button')
    noButton.id = 'no'
    noButton.textContent = "No :("
    checker.appendChild(noButton);
    answerNode.querySelector(".card-text").appendChild(checker)

    document.getElementById('yes').addEventListener("click", function(){
      if (!numCorrect){
        numCorrect = 1;
      } else {
        numCorrect ++;
      }
      updateCount(numCorrect)
      checker.style.display = 'none'
    })

    document.getElementById('no').addEventListener("click", function(){
      checker.style.display = 'none'
    })
  }


  let correctCount = document.createElement('div')
    correctCount.id = 'counter'
    correctCount.textContent = `Number of Questions Answered Correctly Thus Far: ${numCorrect}`
    document.querySelector(".container").appendChild(correctCount)

  document
    .getElementById("answer-button")
    .addEventListener("click", function() {
      answerNode.style.display = "block";
      console.log("hello");
    });
  document.getElementById("next-button").addEventListener("click", function() {
    answerNode.style.display = "none";
    fetchTrivia();
  });

  function updateCount(numCorrect){
    let newCount = document.createElement('div')
    newCount.textContent = `Number of Questions Answered Correctly Thus Far: ${numCorrect}`
    let x = document.getElementById("counter")
    x.parentNode.replaceChild(newCount, x);
    newCount.id = "counter"
  }

})

//YOUR CODE HERE
