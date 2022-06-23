(function () {
  // Functions
  function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `You got ${numCorrect} out of ${myQuestions.length} !`;
  }
  //A function for displaying the slides to the dom
  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "Who is the starring actor in the Tv-Series 'Game of Thrones'?",
      answers: {
        a: "Kit Harington",
        b: "Emilia Clarke",
        c: "Peter Dinklage",
      },
      correctAnswer: "a",
    },
    {
      question:
        "Which of the following characters is most loved by fans of the Walking Dead?",
      answers: {
        a: "Daryl Dixon",
        b: "Rick Grimes",
        c: "Negan",
      },
      correctAnswer: "a",
    },
    {
      question: "Which year was the first episode of Friends aired?",
      answers: {
        a: "1994",
        b: "2001",
        c: "1991",
        d: "1999",
      },
      correctAnswer: "a",
    },
    {
      question: "What was the best soundtrack of Attack on Titans?",
      answers: {
        a: "Rumbling",
        b: "Red Swan",
        c: "Great Escape",
        d: "Jiyuu No Tsubasa",
      },
      correctAnswer: "b",
    },
    {
      question: "Who was Chuck at 'Supernatural'?",
      answers: {
        a: "Samara",
        b: "Lucifer",
        c: "Prophet",
        d: "God",
      },
      correctAnswer: "d",
    },
    {
      question: "Where was the prison that Jim was in , on 'Stranger things'?",
      answers: {
        a: "Germany",
        b: "Russia",
        c: "Lithuania",
        d: "Alaska",
      },
      correctAnswer: "b",
    },
    {
      question: "How Ragnar Lothbrok was killed in 'Vigings'?",
      answers: {
        a: "In battle",
        b: "By a bear",
        c: "By his Sons",
        d: "Snake Pit",
      },
      correctAnswer: "d",
    },
    {
      question:
        "Did Penny wanted to have a kid with Leonard on 'The Big Bang Theory'?",
      answers: {
        a: "No",
        b: "Yes",
        c: "Maybe",
        d: "They didn't mention it",
      },
      correctAnswer: "a",
    },
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  const restart_game = document.querySelector(".restart");

  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  restart_game.addEventListener("click", function () {
    location.reload();
  });
})();
