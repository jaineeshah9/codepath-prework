# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Jainee Shah

Time spent: 5 hours spent in total

Link to project: https://glitch.com/edit/#!/thirsty-shrouded-paprika

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [ ] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [ ] Buttons use a pitch (frequency) other than the ones in the tutorial
* [ ] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [ ] List anything else that you can get done to improve the app!

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
![codepath](https://user-images.githubusercontent.com/95950518/160331223-c6d9cd71-c5bf-4fad-ac34-554aae17cb59.gif)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
I used W3Schools to research the CSS for adding buttons to the images. I also asked my sister to help me debug a problem. 

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
I encountered a challenge when I was working on the time limit feature with setTimeout and clearTimeout - the time on the screen kept changing even after the game was over, and glitched by showing very different times (first it would show 00:50, then it would show 00:13, and go back to 00:49). I made sure that I was calling clearTimeout, but I couldn't understand why it was glitching like that. I asked my sister to help me to see if we could figure out what was going on. I first explained the code to her, and she asked me how setInterval and clearInterval worked and how I was using them. I expained them to her - how setInterval called a given function every X milliseconds, and clearInterval stops interval's execution and takes an argument of the ID of the interval. While explaining this to her, I realized that every time I call setInterval or reset the timer, I have to clear the previous one. To confirm, I added some console.log statements inside startTimer() and eventually realized that startTimer() kept creating new intervals because I did not call clearTimeout before startTimer() in playClueSequence. So, I called clearTimeout and the timer started to work. Explaining how my project worked to my sister helped me figure it out :)

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
I am curious about how the setInterval and clearInterval functions work internally - how does JavaScript know when 1000 milliseconds have passed? Does it internally execute some function every millisecond that then executes the function I passed for every 1000th millisecond? 
Is it better to structure functions like "function .." or "var x = function..."? What's the difference and why would one option be preferred over the other?

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
I would add the feature of having different "levels" to the game - for example, if you pass 4 easy rounds, then the user goes to "level 2" and must pass 4 more challenging rounds (and so on). I would increase the length of the pattern as the user plays more rounds.  

I would also add a reward system where the user could collect points for each game they won (depending on the difficulty of that round) and buy extra "tries" or be able to skip a round and advance to the next by spending the reward. 

I would also allow the user to add sounds they like and randomize the sounds assigned to the buttons, and also randomize the number of button.


## Interview Recording URL Link

[My 5-minute Interview Recording](your-link-here)


## License

    Copyright Jainee Shah

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
