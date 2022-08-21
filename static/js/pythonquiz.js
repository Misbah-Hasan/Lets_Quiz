(function () {

      var questions = [
      {
        question: "Is Python case sensitive when dealing with identifiers?",
        choices: ['Yes', 'No', 'Platform dependent', 'None of the mentioned'],
        correctAnswer: 0
    },
    {
        question: "If a function doesn’t have a return statement, which of the following does the function return?",
        choices: ['void', 'null', 'none', 'An exception is thrown without the return statement'],
        correctAnswer: 2
    },{
        question: "How many keyword arguments can be passed to a function in a single function call?",
        choices: ['Zero', 'One', 'Zero or more', 'One or more'],
        correctAnswer: 2
    },{
        question: "Suppose tuple is tup1 = (‘j’,’a’,’v’,’a’) what are the count of objects are created internally?",
        choices: [5, 6, 1, 4],
        correctAnswer: 3
    },
    {
        question: "As what datatype are the *args stored, when passed into a function?",
        choices: ['int', 'tuple', 'function', 'keyword args'],
        correctAnswer: 1
    },
    {
        question: "The output of the code : print(type(10 / 2)) will be ?",
        choices: ['none', 'int', 'type', 'float'],
        correctAnswer: 3
    },
    {
        question: "What is the return type of function id?",
        choices: ['int', 'None', 'bool', 'dict'],
        correctAnswer: 0
    },
    {
        question: "Which of the following  is used to give comments in Python?",
        choices: ['//', '#', "Triple Quotes (''' ''')", 'Both B and C'],
        correctAnswer: 1
    },{
        question: "Suppose list1 is [3, 33, 13, 23, 43], What is list1[:-1]?",
        choices: ['[3, 33, 13, 23]', 'Error', '43', '[43, 23, 13, 33, 3]' ],
        correctAnswer: 0
    },{
        question: "Which of the following statements is used to create an empty set in Python?",
        choices: ['()', '[]', '{}', 'None Of The Mentioned'],
        correctAnswer: 3
    },
    ];

    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object

    // Display initial question
    displayNext();

    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
        e.preventDefault();

        // Suspend click listener during fade animation
        if (quiz.is(':animated')) {
            return false;
        }
        choose();

        // If no user selection, progress is stopped
        if (isNaN(selections[questionCounter])) {
            alert('Please make a selection!');
        } else {
            questionCounter++;
            displayNext();
        }
    });

    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });

    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
        $(this).removeClass('active');
    });

    // Creates and returns the div that contains the questions and
    // the answer selections
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }

    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += ' ' + questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // Reads the user selection and pushes the value to an array
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    // Displays next requested element
    function displayNext() {
        quiz.fadeOut(function () {
            $('#question').remove();

            if (questionCounter < questions.length) {
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }

                // Controls display of 'prev' button
                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {

                    $('#prev').hide();
                    $('#next').show();
                }
            } else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }

    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
        var score = $('<p>', {id: 'question'});

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }

        score.append('You got ' + numCorrect + ' questions out of ' +
            questions.length + ' right!!!');
        return score;
    }
})();
