# Quiz App
A guess the character game where you try and guess the film or tv-show of a Disney character.

Installation and Setup Instructions
Prerequisite
You will need node and npm installed globally on your machine.

## install dependencies
npm install

## to start server:
npm start

## to visit app:
localhost:3000

## to create a build of the app:
npm build

### Reflection
I chose to minimise time spent on the visuals and instead invest more time on the functionality. sI used React and Material UI.

Some of the challenges I faced were:

- Infinite rerender because of how I was setting the state.
- Duplicate of answers in the multiple choice options.

If I had more time I would implement additional features like:

- display a countdown timer each round, and assign a score of 0 if the time runs out and there was no answer
- reduce the points per round based on how long it takes a player to answer
