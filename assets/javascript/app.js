

//ARRAY OF OBJECTS, WHERE EVERY OBJECT INCLUDES THE CONTENT OF EACH QUESTION.
var allTheQuestions = [
  //Question 1
    {
      question:"What will happen if you fill a glass to the top with ice and water, and the ice melts?",
      options:["The glass will over flow.","The water level will drop.","The level of water will remain the same.","The ice will never melt."],
      answer:"The water level will drop.",
      answerIndex:1,
      correctText: "Correct! The density of ice is less than water, so the level of water will decrease!",
      wrongText:"Wrong... the water level will decrease because the density of ice is less than that of water!"
    },

  //Question 2
    {
      question:"What is the pH(power of hydrogen) of water?",
      options:["4","9","6","7"],
      answer:"7",
      answerIndex:3,
      correctText: "Correct! Pure water is a neutral solution, and thus it has a pH of 7.",
      wrongText:"Sorry... the right answer was pH 7."
    },

  //Question 3
    {
      question:"Which of these is a non-metal?",
      options:["Aluminum","Copper","Carbon","Lithium"],
      answer:"Carbon",
      answerIndex:2,
      correctText: "Correct! Carbon does not contain metallic bonds.",
      wrongText:"Sorry... the right answer was Carbon."
    },

  //Question 4
    {
      question:"What element has the chemical symbol Au?",
      options:["Aluminum","Gold","Arsenic","Silver"],
      answer:"Gold",
      answerIndex:1,
      correctText: "Correct! Au stands for Aurum, which means Gold!",
      wrongText:"Sorry... the right answer was Gold."
    },

  //Question 5
    {
      question:"If you add salt to a glass of water, salt is the:",
      options:["Solution","Solvent","Colloid","Solute"],
      answer:"Solute",
      answerIndex:3,
      correctText: "Correct! Salt would be the solute and water the solvent.",
      wrongText:"Sorry... the right answer was solute."
    },

  //Question 6
    {
      question:"What which of the following is acidic?",
      options:["Bleach","Coffee","Soapy Water","Baking Soda"],
      answer:"Coffee",
      answerIndex:1,
      correctText: "Correct! Black coffee can be highly acidic, up to a pH of 5.",
      wrongText:"Sorry... the right answer was Coffee."
    },

  //Question 7
    {
        question:"What city hosts the Nobel Prize every year?",
        options:["Prague","Copenhagen","Helsinki","Stockholm"],
        answer:"Stockholm",
        answerIndex:3,
        correctText: "Correct! Stockholm has been the host of the prestigious Noble Prize since 1895.",
        wrongText:"Sorry... the right answer was Stockholm, Sweden."
    },
  
  //Question 8
    {
        question:"Where will the 2020 Olympics take place?",
        options:["Tokyo","Seoul","Sydney","Kuala Lumpur"],
        answer:"Tokyo",
        answerIndex:0,
        correctText: "Correct! The next olympics are in Tokyo, Japan in 2020! ",
        wrongText:"Sorry... the right answer was Tokyo, Japan."
    }
]

// Variable Declaration
var i              = 0;
var isOptionChosen = false;
var counter        = 0;
var answerString   = '';
var correct        = 0;
var incorrect      = 0;
var intervalId;
var number         = 31;
var unAnswered     = 0;

//Function used to empty the prior question and display the new question + new options.
function reset()
{
    $(".question").empty();
    $(".options").empty();
    $(".answer").empty();
    $(answerString).empty(); 
    $(".image").empty();

    //INPUT NEW QUESTION
    if (i<allTheQuestions.length)
    {
        $(".question").html(allTheQuestions[i].question);

        //INPUT NEW OPTIONS
        for(j=0;j<4;j++)
            {
                $(".options").append("<div class='optns' id="+'optn'+j+">"+allTheQuestions[i].options[j]+"</div>");
            }

        //Setting the timer to 31 because it takes 1 second to display the number on the page.
        number = 31;

        //Runnning the timer every time a new question is displayed.
        run();

        //Enabling the options
        $(".optns").removeAttr("disable");

        //The #optn(number) id was created previously on line 107 for every option created.
        answerString = "#optn"+allTheQuestions[i].answerIndex;

        //Adding the 'right' attribute to the answerString. This will allow me to identify the right option based on its index.
        $(answerString).attr('right',allTheQuestions[i].answer);
    }

    //Calling the option click function below.

    optionClick();

    //Allows me to display results only once.
    if ($(".results").is(":hidden"))
    {
        results();
        playAgain();
    }


    //resetting the isOptionChosen variable.
    isOptionChosen = false;

    //resetting the counter variable
    counter = 0;
}


function optionClick(){

    $(".optns").on("click",function()
    {

        //Starts with isOptionChosen = false from the reset function.
        if (!isOptionChosen)
        {
            //This allows me to prevent the user from changing the option once is selected.
            isOptionChosen = true;
            $(".optns").attr("disable","disable");

            //Stopping the timer.
            stop();

            //Allowing 3 seconds to pass before going to the next question.
            postQuestionTime();

            if($(this).attr('right') == allTheQuestions[i].answer)
            {
                $(".answer").html(allTheQuestions[i].correctText);
                $(".image").html("<img src='assets/images/right.jpg' height='200px' width='300px'>");
                correct ++;
            }

            else 
            {
                $(".answer").html(allTheQuestions[i].wrongText)
                $(".image").html("<img src='assets/images/wrong.jpg' height='180px' width='300px'>");
                incorrect ++;
            }
        }
  
    })
}


function results()
{
    if (i>=allTheQuestions.length)
    {
        $(".results").append("<h2 class='resultsTitle'>RESULTS:</h2>");
        $(".results").append("<h4 class='resultsContent'>Correct Answers: " + correct);
        $(".results").append("<h4 class='resultsContent'   >Incorrect Answers: " + incorrect);
        $(".results").append("<h4 class='resultsContent'   >No Response: " + unAnswered);
        $(".results").show();
        $(".question").empty();
        $(".options").empty();
        $(".answer").empty();
        $(".image").empty();
        $(".image").html("<img src='assets/images/finish.gif' height='300px' width='500px'>");
        $(".image").append("<button class='playAgain'>Play Again!</button>");
        $(".time").empty();
    }
}

//The i++ in this function allows me to manually change the question after the time has passed. 
function postQuestionTime()
{
    setTimeout(function() 
    {
        i++;
        reset();
    }, 4000)
}

function run() 
{
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() 
{
    number--;

    $(".time").html("<h2>" + number + "</h2>");

    if (number === 0) 
    {

        stop();
    
        unAnswered ++
        $(".answer").html("<b>Time is up! Are you there?</b>");
        $(".image").html("<img src='assets/images/hello.gif' height='300px' width='400px'>");
        isOptionChosen = true;
        $(".optns").attr("disable","disable");
        postQuestionTime()
    }
}

function stop() 
{
    clearInterval(intervalId);
}

function playAgain()
{
    $(".playAgain").on("click",function()
    {
         i              = 0;
         isOptionChosen = false;
         counter        = 0;
         answerString   = '';
         correct        = 0;
         incorrect      = 0;
         intervalId;
         number         = 31;
         unAnswered     = 0;

         $(".results").empty();
         $(".results").hide();
         
         reset()
    })
}

//Start without showing the results. Calling the reset function for the first question.
$(".results").hide();
reset();