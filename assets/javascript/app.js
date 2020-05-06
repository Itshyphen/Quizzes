var quizzes = {
	correct: 0,
	incorrect: 0,
	missed: 0,
	questionNumber: 0,
    questions:
		[
			{
				question: 'What percent of a circle is 75 degrees?',
				answerA: '75%',
				answerB: '25.23%',
				answerC: '21.73%',
				answerD: '20.83%',
				correct: '20.83%',
				img: 'nosolution.gif'

			},
			{
				question: 'If the original price of a house is $185,000 and it falls to $160,000, what is the percent decrease?',
				answerA: '13.51%',
				answerB: '12.73%',
				answerC: '11.47%',
				answerD: '11.59%',
				correct: '13.51%',
				img: 'nosolution.gif'
			},
			{
				question: 'A man is climbing up a mountain which is inclined. He has to travel 100 km to reach top of mountain. Every day He climbs up 2 km forward in day time. Exhausted, he then takes rest there at night time. At night, while he is asleep, he slips down 1 km backward because mountain is inclined.\n' +
					'Then how many days does it take him to reach mountain top ????',
				answerA: '200',
				answerB: '99',
				answerC: '50',
				answerD: '98',
				correct: '99',
				img: 'climb.jpg'
			},
			{
				question: 'For Rs.1 You get 40 Bananas.\n' +
					'For Rs.3 you get 1 Mango.\n' +
					'For RS.5 you get 1 Apple.Now you want to get 100 fruits for Rs.100.So, How many Bananas, Mangoes and Apples will you buy ??',
				answerA: '19 apple,21 mango,60 banana',
				answerB: '19 apple,2 mango,1 banana',
				answerC: '18 apple,12 mango,70 banana',
				answerD: '19 apple,1 mango,80 banana',
				correct: '19 apple,1 mango,80 banana',
				img: 'mango.JPG'
			},
			{
				question: 'A merchant can place 8 large boxes or 10 small boxes ' +
					'into a carton for shipping. In one shipment, he sent a total of' +
					' 96 boxes. If there are more large boxes than small boxes, how many' +
					' cartons did he ship?',
				answerA: '11',
				answerB: '12',
				answerC: '13',
				answerD: '14',
				correct: '11',
				img: 'boxes.jpg'
			},
			{
				question: 'If 9999 = 4, 8888 = 8, 1816 = 6, 1212 = 0, then 1919 =?',
				answerA: '12',
				answerB: '1',
				answerC: '2',
				answerD: '8',
				correct: '2',
				img: '9999.JPG'
			}
		],

	beginCountdown: function(time) {
		$('.timer').html('Time Remaining: ' + time);
		counter = setInterval(function () {
			time--;
			$('.timer').html('Time Remaining: ' + time);

			if(time === 0) {

				quizzes.missed++;
				quizzes.results('missed');
			}
		},1000);
	},

	//Stop countdowns between questions
	stopCountdown: function() {
		clearInterval(counter);
	},

	//Show questions
	game: function() {
		if (quizzes.questionNumber < quizzes.questions.length) {

			quizzes.beginCountdown(30);
			number = quizzes.questionNumber;

			normalNumber = number + 1;

			$('.show-question').append('<h2 class="question question-' + normalNumber + '">' + normalNumber + ') ' + quizzes.questions[number].question + '</h2>');

			$('.show-question').append('<div class="answer question-' + normalNumber + ' answerA" data-answer="' + quizzes.questions[number].answerA + '">A) ' + quizzes.questions[number].answerA + '</div>');
			$('.show-question').append('<div class="answer question-' + normalNumber + ' answerB" data-answer="' + quizzes.questions[number].answerB + '">B) ' + quizzes.questions[number].answerB + '</div>');
			$('.show-question').append('<div class="answer question-' + normalNumber + ' answerC" data-answer="' + quizzes.questions[number].answerC + '">C) ' + quizzes.questions[number].answerC + '</div>');
			$('.show-question').append('<div class="answer question-' + normalNumber + ' answerD" data-answer="' + quizzes.questions[number].answerD + '">D) ' + quizzes.questions[number].answerD + '</div>');

			$('.answer').click(function() {
				answer = $(this).data('answer');

				if (answer == quizzes.questions[number].correct) {
					quizzes.correct++;
					quizzes.results('correct');
				}
				else {
					quizzes.incorrect++;
					quizzes.results('incorrect');
				}
			});
		}

		else {
			quizzes.endGame();
		}
	},

	results: function(result) {
		//Stop previous countdown
		quizzes.stopCountdown();

		$('.show-question, .timer').empty();

		if (result == 'correct') {
			$('.show-question').append('<h2>Correct!</h2>');
		}
		else if (result == 'incorrect') {
			$('.show-question').append('<h2>Incorrect!</h2>');
		}
		else if (result == 'missed') {
			$('.show-question').append('<h2>You took too long!</h2>');
		}

		$('.show-question').append('<div style="text-align: center;">Correct answer is ' + quizzes.questions[number].correct + '.</div><br>');
		$('.show-question').append('<div class="results-img"><img src="assets/images/' + quizzes.questions[number].img + '" alt="' + quizzes.questions[number].correct + '"></div>');

		setTimeout(quizzes.nextQuestion,3000);
	},

	nextQuestion: function() {
		quizzes.stopCountdown();
		$('.show-question').empty();
		quizzes.questionNumber++;
		quizzes.game();
	},


	endGame: function() {
		$('.timer').empty();
		$('.show-question').append('<h2>The End! How\'d You Do?</h2>');
		$('.show-question').append('<h3>Correct: ' + quizzes.correct + '</h3>');
		$('.show-question').append('<h3>Incorrect: ' + quizzes.incorrect + '</h3>');
		$('.show-question').append('<h3>Missed: ' + quizzes.missed + '</h3>');
		$('.button').html('<div class="reset-game"><button type="button" class="btn btn-danger" id="reset-game">Play Again?</button></div>');

		$('#reset-game').click(function() {
			quizzes.resetGame();
		});
	},

	resetGame: function() {
		//Reset variables
		quizzes.correct = 0;
		quizzes.incorrect = 0;
		quizzes.missed = 0;
		quizzes.questionNumber = 0;

		$('.show-question, .button').empty();
		quizzes.game();
	}
};

window.onload = function(){
	$('#start-game').on('click', function() {
		quizzes.game();

		$('#start-game').remove();
	});
};