const RANDOM_QUESTION_URL = "http://jservice.io/api/random";
let answerNode = null;
let currentQ = null;
let numCorrect = 0;
// let showAns = document.createElement('button')
// showAns.className = "btn btn-primary";
// showAns.textContent = "Show Answer"
let submission = null;
// let nextQ = document.createElement('button')
// nextQ.className = "btn btn-primary";
// nextQ.textContent = "Next Question"

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
  currentQ = trivia
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
}


document.addEventListener("DOMContentLoaded", function() {
  fetchTrivia();
  
  const submission = document.getElementById('input');
  submission.addEventListener("submit", function(event){
    event.preventDefault();
    const guess = event.target.guess.value.toLowerCase();
    const response = document.getElementById("checker").querySelector(".response")
      if (guess == currentQ.answer.toLowerCase()) {
        response.textContent = "Yahoo! You got it!"
        //and up the counter thing below
        if (!numCorrect){
          numCorrect = 1;
        } else {
          numCorrect ++;
        }
        updateCount(numCorrect)
        // nextQ.addEventListener("click", function(){
        //   answerNode.style.display = "none";
        //   formSubmit.style.display = "block";
        //   submission.removeChild(answerChecker)
        //   fetchTrivia();})
      } else {
        response.textContent = "You are INCORRECT, sir"
      }
      submission.style.display = "none";
      document.querySelector('.submission-response').style.display = "block";
      document.getElementById('next-move').style.display = "block";
      event.target.guess.value = ''
  })
  
    
/*
    document.getElementById('no').addEventListener("click", function(){
      checker.style.display = 'none'
    })
  }
*/

  let correctCount = document.createElement('div')
    correctCount.id = 'counter'
    correctCount.textContent = `Number of Questions Answered Correctly Thus Far: ${numCorrect}`
    document.querySelector(".container").appendChild(correctCount)

  document.getElementById("next-button").addEventListener("click", function() {
    answerNode.style.display = "none";
    document.querySelector('.submission-response').style.display = "none";
    document.getElementById('next-move').style.display = "none";
    document.getElementById('input').style.display = "block";
    fetchTrivia();
    document.getElementById('show-ans-button').style.display = "block";
  });

  document.getElementById("show-ans-button").addEventListener("click", function() {
      answerNode.style.display = "block";
      document.querySelector('.submission-response').style.display = "none";
      document.getElementById('show-ans-button').style.display = "none";
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
