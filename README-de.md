# Swipe Game

[Englische Version](README.md)

## Einführung

Generative KI boomt und mit ihr die Erstellung von Fakes und Deep Fakes. Gleichzeitig fehlt es an kurzweiligen und leicht in der Schule einsetzbaren Übungen zum Thema Deep Fake-Erkennung. Hier setzt das Projekt Fight Fakes an, bei dem eine Gameumgebung entwickelt wurde, in der Jugendliche spielerisch lernen können, Informationen schnell und intuitiv zu bewerten. 

Das Swipe Game ist Teil von Fight Fakes. Das Spiel präsentiert nacheinander Karten, die die Spieler:innen nach rechts (richtig) oder links (falsch) swipen können. 

Das Projekt Fight Fakes ist ein Projekt der [ÖIAT (Austrian Institute for Applied Telecommunication)](https://oiat.at/)-Initiatitve [Saferinternet.at](https://saferinternet.at/) und wurde durch eine [netidee](https://www.netidee.at/)-Förderung ermöglicht. Hier finden Sie weitere Informationen zum Projekt: [https://www.saferinternet.at/projekte/fight-fakes](https://www.saferinternet.at/projekte/fight-fakes)

## Konfiguration
### Design
In der Datei setings.json kann der Style des Games angepasst werden. Folgende Einstellungen stehen zur Verfügung:

- main-color `CSS Color`  
    Farbe des Hintergrunds
- text-color `CSS Color`  
    Textfarbe
- colorfeedbacktrue `CSS Color`  
    Feedbackfarbe für richtige Antworten
- colorfeedbackfalse `CSS Color`  
    Feedbackfarbe für falsche Antworten
- welcome  
    Inhalt des Startbildschirm. `banner` ist optional, zum Ausblenden auf `false` setzen.

Die im Spielordner enthaltenen Bilder, Icons und Hintergrundmusik können durch andere Dateien im selben Format ersetzt werden.

### Einstellungen
In der Datei settings.json können ebenfalls die Einstellungen des Spiels angepastt werden.

- randomizeQuestions `bool`  
  Zeigt die Karten in zufäliger Reihenfolge an
- questionwait `int`  
  Zeit zwischen 2 Karten
- timer `bool`  
  Zeitlimit für Karten aktivieren
- questiontime `int`  
  Zeitlimit für Karten in ms wenn timer `true`
- colorfeedback `bool`  
  Zeigt farbiges Feedback für richtige/falsche Antworten
- showscore `bool`  
  Zeigt den Punktestand im Spiel an
- truebutton / falsebutton `string`  
  Emoji für die Buttons richtig/falsch
- penalty `bool`  
  Falsche Antworten sorgen für Punktabzug
- maxquestions `int`  
  Zeigt maximal x Karten an. nur in Verbindung mit randomizeQuestions sinnvoll
- mute `bool`  
  deaktiviert die Hintergrundmusik

### Fragen und Antworten
Die Karten können über die Datei questions.json konfiguriert werden.
Die Datei enthält ein object "questions" das beliebig viele Karten-Objekte enthalten kann. Struktur eines Kartenobjekts:

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
  Text auf der Karte
- img `string` *optional*   
  Bild auf der Karte. Wird ignoriert falls Video gesetzt wird
- vid `string` *optional*  
  Video auf der Karte
- feedback `object` *optional*  
  Blendet Feedback ein, je nachdem ob die Frage richtig oder falsch beantwortet wurde. kann `text` und/oder `img` enthalten
- points `int`  
  Punkte für diese Karte
- correct `bool`  
  Karte soll nach rechts (richtig) geswipt werden

## Credits
Das Swipe Game wurde von [bytewood](https://bytewood.com/) entwickelt und nutzt [jQuery](https://jquery.com) und [HammerJS](https://hammerjs.github.io/).
