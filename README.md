# Swipe Game
## Introduction

Generative AI is booming, and so is the creation of fakes and deep fakes. At the same time, there is a lack of fun and easy-to-use deep fake detection exercises in schools. This is where Fight Fakes comes in, developing a game environment where young people can playfully learn to evaluate information quickly and intuitively. 

The Swipe Game is part of Fight Fakes. The game presents a series of cards that the player can swipe to the right (true) or left (false). 

Fight Fakes is a project of the [ÖIAT (Austrian Institute for Applied Telecommunication)](https://oiat.at/) initiatitve [Saferinternet.at](https://saferinternet.at/) and was funded by [netidee](https://www.netidee.at/). More information about the project can be found here: [https://www.saferinternet.at/projekte/fight-fakes](https://www.saferinternet.at/projekte/fight-fakes)

## Configuration
### Design
The style of the game can be customised in the settings.json file. The following options are available:

- main-color `CSS Color`  
    background colour
- text-color `CSS Color`  
    text colour
- colorfeedbacktrue `CSS Color`  
    feedback color for correct answers
- colorfeedbackfalse `CSS Color`  
    feedback color for wrong answers
- welcome  
    splash screen: `banner` is optional, set to `false` to hide

The images, icons, and background music that are included in the game folder can be replaced with other files of the same format.

### Einstellungen
The game settings can also be customised in the settings.json file.

- randomizeQuestions `bool`  
  shows cards in random order
- questionwait `int`  
  time between two cards
- timer `bool`  
  activate time limit for cards
- questiontime `int`  
  time limit for cards in ms if timer `true`
- colorfeedback `bool`  
  displays coloured feedback for correct/incorrect answers 
- showscore `bool`  
  displays the score in the game
- truebutton / falsebutton `string`  
  emoji for correct/incorrect buttons 
- penalty `bool`  
  wrong answers will result in penalty points
- maxquestions `int`  
  displays a maximum of x cards. Only useful in conjunction with randomizeQuestions.
- mute `bool`  
  deactivates the background music

### Questions and answers
The cards can be configured using the questions.json file.
The file contains a 'questions' object which can contain any number of card objects. Structure of a card object:

```
{
  "question": "Pixelshakes is the coolest thing ever",
  "img": "D0C4F3E7-CDA6-492A-9494-37D7ED09182A.png",
  "feedback": {
    "true": {
      "text": "Heck yeah it is!"
    },
    "false": {
      "text": "Oh... well, to each their own..."
    }
  },
  "points": 100,
  "correct": true
}
```

- question `string`  
  text on the card
- img `string` *optional*   
  Image on the card. Ignored if video is set
- vid `string` *optional*  
  video on the card
- feedback `object` *optional*  
  displays feedback depending on whether the question was answered correctly or incorrectly. can contain `text` and/or `img` 
- points `int`  
  points for this card
- correct `bool`  
  card should be swiped to the right (correct)

## Credits
The Swipe Game was developed by [bytewood](https://bytewood.com/) and uses [jQuery](https://jquery.com) and [HammerJS](https://hammerjs.github.io/).