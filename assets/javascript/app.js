

//ARRAY OF OBJECTS, WHERE EVERY OBJECT INCLUDES THE CONTENT OF EACH QUESTION.
var allTheQuestions = [
    {
        question:"What will happen if you fill a glass to the top with ice and water, and the ice melts?",
        options:["The glass will over flow.","The water level will drop.","The level of water will remain the same.","The ice will never melt."],
        answer:"The water level will drop.",
        answerIndex:1,
        correctText: "Correct! The density of ice is less than water, so the level of water will decrease!",
        wrongText:"Wrong... the water level will decrease because the density of ice is less than that of water!"
    },

    {
      question:"What is the pH(power of hydrogen) of water?",
      options:["4","9","6","7"],
      answer:"7",
      answerIndex:3,
      correctText: "Correct! Pure water is a neutral solution, and thus it has a pH of 7.",
      wrongText:"Sorry... the right answer was pH 7."
    },

    {
      question:"Which of these is a non-metal?",
      options:["Aluminum","Copper","Carbon","Lithium"],
      answer:"Carbon",
      answerIndex:2,
      correctText: "Correct! Carbon does not contain metallic bonds.",
      wrongText:"Sorry... the right answer was Carbon."
  },

    {
        question:"What city hosts the Nobel Prize every year?",
        options:["Prague","Copenhagen","Helsinki","Stockholm"],
        answer:"Stockholm",
        answerIndex:3,
        correctText: "Correct! Stockholm has been the host of the prestigious Noble Prize since 1895.",
        wrongText:"Sorry... the right answer was Stockholm, Sweden."
    },

    {
        question:"Where will the 2020 Olympics take place?",
        options:["Tokyo","Seoul","Sydney","Kuala Lumpur"],
        answer:"Tokyo",
        answerIndex:0,
        correctText: "Correct! The next olympics are in Tokyo, Japan in 2020! ",
        wrongText:"Sorry... the right answer was Tokyo, Japan."
    }
]

//VARIABLES
var i=0;
var isOptionChosen = false;
var counter = 0;
var answerString = '';
var correct = 0;
var incorrect = 0;
var intervalId;
var number = 31;
var unAnswered = 0;
$(".results").hide();


//RESET FUNCTION
function reset(){
$(".question").empty();
$(".options").empty();
$(".answer").empty();
$(answerString).empty(); 
$(".image").empty();

//INPUT NEW QUESTION
if (i<allTheQuestions.length){
$(".question").html(allTheQuestions[i].question);

//INPUT NEW OPTIONS
for(j=0;j<4;j++){
$(".options").append("<div class='optns' id="+'optn'+j+">"+allTheQuestions[i].options[j]+"</div>")
}

number = 31;
run();
//Enabling the options
$(".optns").removeAttr("disable");

//Adding the 'right' attribute to the answerString
answerString = "#optn"+allTheQuestions[i].answerIndex;
$(answerString).attr('right',allTheQuestions[i].answer);
}

optionClick();
if ($(".results").is(":hidden")){
results();
}
//resetting the isOptionChosen variable
isOptionChosen = false;

//resetting the counter variable
counter = 0;
}

function optionClick(){
$(".optns").on("click",function(){

  if (!isOptionChosen){
    isOptionChosen = true;
    $(".optns").attr("disable","disable");
    stop();
    postQuestionTime();
      if($(this).attr('right') == allTheQuestions[i].answer){
          $(".answer").html(allTheQuestions[i].correctText);
          $(".image").html("<img src='assets/images/right.jpg' height='200px' width='300px'>");
          correct ++;
    }
      else {
         $(".answer").html(allTheQuestions[i].wrongText)
         $(".image").html("<img src='assets/images/wrong.jpg' height='180px' width='300px'>");
         incorrect ++;
      }
  }
  
  })
}

reset()

function results(){
if (i>=allTheQuestions.length){
    $(".results").append("<h2 class='resultsTitle'>RESULTS:</h2>");
    $(".results").append("<h4 class='resultsContent'>Correct Answers: " + correct);
    $(".results").append("<h4 class='resultsContent'   >Incorrect Answers: " + incorrect);
    $(".results").append("<h4 class='resultsContent'   >No Response: " + unAnswered);
    $(".results").show();
    $(".question").empty();
    $(".options").empty();
    $(".answer").empty();
    $(".image").empty();
    $(".time").empty();
}
}

function postQuestionTime(){
  setTimeout(function() {
    i++;
    reset();
  }, 3000)
}

function run() {
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
}

function decrement() {
  number--;
  $(".time").html("<h2>" + number + "</h2>");

  if (number === 0) {

    stop();
    
    unAnswered ++
    $(".answer").html("<b>Time is up! Are you there?</b>");
    $(".image").html("<img src='assets/images/hello.gif' height='300px' width='400px'>");
    isOptionChosen = true;
    $(".optns").attr("disable","disable");
    postQuestionTime()
  }
}

function stop() {
  clearInterval(intervalId);
}