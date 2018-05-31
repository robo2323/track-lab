# TrackLab

TrackLab was my attempt to create an in-browser music creation platform that would allow real-time collaboration. The scope of this project was far too big for one weeks work so this is an imperfect but working proof of concept.

## [Live Demo](https://robo2323.github.io/track-lab)

## Installation
Clone the repo<br>
Install Parcel:<br>
`npm install -g parcel-bundler`<br>
run:<br> 
`npm install`<br>
`npm run dev`<br>
build:<br>
`npm run build`

## Features
* Real-Time collaboration, synth settings and notes are updated in real time from different users
* **Add notes to each track pattern by clicking, change the pitch of the note using the mouse wheel whilst hovering over the step you want to change**
* Multiple tracks with different instruments. The synths have editable settings (**click the circular button at the start of the track to open the synth view**)

## Technical Description
I'm not sure I will continue with this project but I can definitely take some concepts and use them in a future project. Specifically the modular nature in which it was built. Each element you see is a reusable **React** component. The idea is to build each synth UI and each UI piece of the software up in a highly modular fashion, this fits well with the modularity of the **ToneJS library** which allows you to construct instruments and other things like transport controls from their basic elements (such as oscillators, filters, envelopes etc) plugging or chaining these smaller elements together to create the desired instrument.

ToneJS is great however there currently seems to be some issues with the library, using some deprecated methods of the WebAudio API. I believe this is why I could not get the playback to be timed accurately.

## Technologies Used
* React
* Tone.js
* Firebase (firestore database)
* Parcel for the build process

## Acknowledgements
A big thanks to Joel, John and Theo at GA.

## License
Licensed under MIT.