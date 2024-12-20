var settings, questions;
var score = 0;
var questioncounter = 0;
var timerhelper;
var currentCard = null;
var maxquestions;
var eventVars = {
    gameState: "gameOver",
    score: 0,
    done: false,
    timer: 0
    };

$(document).ready(function(){
    initGame();
});

async function initGame() {
  try {
      settings = await fetchJSON('settings.json');
      customizeGame(settings);
      questions = await fetchQuestions();
      preparecards(questions);
      startGame();
  } catch (error) {
      console.error(error);
  }
}

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`An error occurred: ${response.status}`);
  return response.json();
}

async function fetchQuestions() {
  const data = await fetchJSON('questions.json');
  return settings.randomizeQuestions ? shuffleArray(data.questions) : data.questions;
}

function customizeGame(settings) {
  $(':root').css('--main-color', settings['main-color']);
  $(':root').css('--text-color', settings['text-color']);
  $(':root').css('--feedback-true', settings['colorfeedbacktrue']);
  $(':root').css('--feedback-false', settings['colorfeedbackfalse']);
  $(':root').css('--timer', settings['questiontime']+"ms");
  $(".bottom-bar .button.true").text(settings['truebutton']);
  $(".bottom-bar .button.false").text(settings['falsebutton']);
  $('.app-container').hide();

  $('.intro h1').text(settings["welcome"]["title"]);
  if(settings["welcome"]["banner"]){
    $('.intro-banner img').attr("src","c_intro-rectangle_1.png");
  }else{
    $('.intro-banner img').hide();
  }
  $('.intro p').text(settings["welcome"]["message"]);
  $('.startbtn').text(settings["welcome"]["startbtn"]);
  $('.startbtn').off('click').on('click', startQuestions);
  if(settings["showscore"]){
    $("#score-counter").show();
  }else{
    $("#score-counter").hide();
  }
}

function startGame() {
  setTimeout( function(){
    document.getElementById("splashscreen").style.display = "none";
    if (!settings["mute"]){
      document.getElementById("backgroundmusic").muted = false;
    }
    document.getElementById("backgroundmusic").play();
  },2000);
}

function startQuestions() {
  $('.intro-wrapper').hide();
  $('.app-container').show();
  $(".bottom-bar .button.true").off("click").on("click",function(event){
    $(".bottom-bar .button.true").off("click");
    event.preventDefault();
    handleSwipe($(".card.newcard"),true);
  });
  $(".bottom-bar .button.false").off("click").on("click",function(event){
    $(".bottom-bar .button.false").off("click");
    event.preventDefault();
    handleSwipe($(".card.newcard"),false);
  });
  nextCard();
}

function showfeedback(question, correct){
  if(correct){
    question.find(".feedback-true").fadeIn("slow");
    question.find(".feedback-content").fadeIn(2500);
  }else{
    question.find(".feedback-false").fadeIn("slow");
    question.find(".feedback-content").fadeIn(2500);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function handleSwipe(card, swiping) {
  let cardid = card.data('id');
  let correct = card.data('correct');
  let feedback = null;
  clearTimeout(timerhelper);
  $(".feedback-container").removeClass("hidden");
  $(".feedback-container .feedback-text.true #feedback"+cardid).css("visibility", "visible");
  $(".button.true").removeClass("highlight");
  $(".button.false").removeClass("highlight");
  card.addClass('answered');
  $("video").each(function(i,e){
    $(e)[0].pause();
  });
  if(swiping === true){
    card.addClass('swipe-right');
    card.removeClass('swipe-left');
  }else if(swiping === false){
    card.addClass('swipe-left');
    card.removeClass('swipe-right');
  }

  if (swiping === correct) {
    $(".overlay-container").removeClass("wrong");
    $(".overlay-container").addClass("correct");
    feedback = true;
    score += parseInt(card.data('score'));
  } else {
  //if false
    $(".overlay-container").addClass("wrong");
    $(".overlay-container").removeClass("correct");
    feedback = false;
    if(settings["penalty"]){
      score -= parseInt(card.data('score'));
    }
  }

  $("#scoreValue").text(parseInt(score));

  if(card.data("feedback")){
    $(".feedback-container > *").hide();
    if(card.data("feedbacktrue") && feedback){
      $(".feedback-container #feedback"+cardid).show().addClass("true");
      $(".feedbackwrapper").fadeIn(500);
    }else if(card.data("feedbackfalse") && !feedback){
      $(".feedback-container #feedback"+cardid).show().addClass("false");
      $(".feedbackwrapper").fadeIn(500);
    }
  }else{
    nextCard();
  }
}

function nextCard(){
  let card = $(".card-container .card.newcard");
  let newCard = getNextCard(card);
  let playallowed = true;
  questioncounter++;
  if(settings.maxquestions){
    playallowed = questioncounter <= settings.maxquestions;
  }
  if (newCard && playallowed) {
    $(".feedbackwrapper").fadeOut(500);
    setTimeout(function(){
      $(".overlay-container").removeClass("wrong correct");
      if(card.length){
        card.fadeOut(400,function(){
          card.removeClass("newcard");
          $(".bottom-bar .button.true").off("click").on("click",function(event){
            $(".bottom-bar .button.true").off("click");
            event.preventDefault();
            handleSwipe($(".card.newcard"),true);
          });
          $(".bottom-bar .button.false").off("click").on("click",function(event){
            $(".bottom-bar .button.false").off("click");
            event.preventDefault();
            handleSwipe($(".card.newcard"),false);
          });
          $(newCard).fadeIn(400).addClass("newcard");
          if(settings["timer"]){
            $(newCard).addClass("timed");
            clearTimeout(timerhelper);
            timerhelper = setTimeout(function(){handleSwipe($(".card-container .card.newcard"),null)}, settings["questiontime"]+1000);
          }
          $(newCard).find("video")[0].play();
        });
      }else{
        card.removeClass("newcard");  
        $(".bottom-bar .button.true").off("click").on("click",function(event){
          $(".bottom-bar .button.true").off("click");
          event.preventDefault();
          handleSwipe($(".card.newcard"),true);
        });

        $(".bottom-bar .button.false").off("click").on("click",function(event){
          $(".bottom-bar .button.false").off("click");
          event.preventDefault();
          handleSwipe($(".card.newcard"),false);
        });

        $(newCard).fadeIn(100).addClass("newcard");
        if(settings["timer"]){
          $(newCard).addClass("timed");
          clearTimeout(timerhelper);
          timerhelper = setTimeout(function(){handleSwipe($(".card-container .card.newcard"),null)}, settings["questiontime"]+1000);
        }
        $(newCard).find("video")[0].play();
      }
      $(".feedbackwrapper").off("click").on("click", function(event){
        $(".feedbackwrapper").off("click");
        event.preventDefault();
        nextCard();
      });
    },settings["questionwait"]);
  }else{
    $(".bottom-bar .button.true").off("click");
    $(".bottom-bar .button.false").off("click");
    $("video").each(function(i,e){
      $(e)[0].pause();
    });
    var eventVars = {
      gameState: "gameOver",
      score: parseInt(score),
      done: true,
      timer: 0
    };
    gameOverEvent =  new CustomEvent('gameOver', {detail: eventVars } );
    document.getElementById("backgroundmusic").muted = true;
    document.getElementById("backgroundmusic").pause();
    window.parent.document.dispatchEvent(gameOverEvent);
  }
}

function getNextCard(currentCard) {
  let nextSibling = null;
  if(currentCard.length){
    nextSibling = currentCard.next('.card');
  }else{
    nextSibling = $(".card-container .card").first();
  }
  return nextSibling.length ? nextSibling : null;
}

//Starts Hammer.JS
function initcardswipe(card) {
    let hammer = new Hammer(card[0]);

    hammer.on("panright panleft",function(event){
      let rot = 0;
      if(event.deltaX <= 200 && event.deltaX >= -200){
        rot = 20 * (event.deltaX/200);
      }else{
        rot = (event.deltaX > 0) ? 20 : -20;
      }
      if(event.deltaX > 0){
        $(".button.true").addClass("highlight");
        $(".button.false").removeClass("highlight");
      }else if(event.deltaX < 0){
        $(".button.false").addClass("highlight");
        $(".button.true").removeClass("highlight");
      }
      card[0].style.transform = 'translateX(' + event.deltaX + 'px) rotate('+rot+'deg)';
    });

    hammer.on("panend pancancel",function(event){
      card[0].style.transform = 'translateX(0px) rotate(0deg)';
      $(".button.true").removeClass("highlight");
      $(".button.false").removeClass("highlight");
    });

    hammer.on('swipeleft', () => {
        handleSwipe(card,false);
        hammer.destroy();
    });
    hammer.on('swiperight', () => {
        handleSwipe(card,true);
        hammer.destroy();
    });
}

function preparecards(c){
  let container = $("div.app-container div.card-container");
  let feedbackContainer = $("div.app-container div.feedback-container");
  c.forEach(element => {
    // gives feeback and the matching card a random ID
    let id = getRandomInt(9999999);
    let card = $("<div></div>",{"class":"card","id":"card"+id}).data("id",id);
    if(element.vid){
      card.append($("<div></div>",{"class":"img-box"}).append($("<video/>",{"src":element.vid,"loop":true})));
    }else if(element.img){
      card.append($("<div></div>",{"class":"img-box"}).append($("<img />",{"src":element.img})));
    }
    if(element.question){
    //inserts the questions
      card.append($("<div></div>",{"class":"question-wrapper"}).append($("<p></p>").text(element.question.toString().replace(/<br\s*[\/]?>/gi, "\n"))));
    }
    card.data('score',element.points);
    card.data('correct',element.correct);
    initcardswipe(card);
    container.append(card);
    //inserts the feedback text
    if(element.feedback){
      let feedback= $("<div></div>",{"class":"feedback","id":"feedback"+id});
      card.data("feedback",true);
      if(element.feedback.true){
        let feedbacktrue = $("<div></div>",{"class":"feedback-content true"});
        if(element.feedback.true.img){
          feedbacktrue.append($("<img/>",{"src":element.feedback.true.img}));
        }
        if(element.feedback.true.text){
          feedbacktrue.append($("<p></p>").text(element.feedback.true.text.toString().replace(/<br\s*[\/]?>/gi, "\n")));
        }
        feedback.append(feedbacktrue);
        card.data("feedbacktrue",true);
      }
      if(element.feedback.false){
        let feedbackfalse = $("<div></div>",{"class":"feedback-content false"});
        if(element.feedback.false.img){
          feedbackfalse.append($("<img/>",{"src":element.feedback.false.img}));
        }
        if(element.feedback.false.text){
          feedbackfalse.append($("<p></p>").text(element.feedback.false.text.toString().replace(/<br\s*[\/]?>/gi, "\n")));
        }
        feedback.append(feedbackfalse);
        card.data("feedbackfalse",true);
      }
      feedback.hide();
      feedbackContainer.append(feedback);
    }
  });
  $(".feedbackwrapper").hide();

  $(".feedbackwrapper").off("click").on("click", function(event){
    $(".feedbackwrapper").off("click");
    event.preventDefault();
    nextCard();
  });
}
function getRandomInt(max) {
  if(crypto){
    return crypto.randomUUID();
  }
  return Math.floor(Math.random() * max);
}
