const audioFileInput = document.getElementById("audioFileInput");
audioFileInput.value = "";
audioFileInput.addEventListener("change", getAudio);
const volumeInput = document.getElementById("volumeInput");
const playBtn = document.getElementById("playButton");
let pattern = "patternOne";
let color = "colorOne";

const patternRadioGroup = document.querySelectorAll(".patternRadio");
for (let i = 0; i < patternRadioGroup.length; i++) {
  patternRadioGroup[i].addEventListener("change", () => {
    pattern = patternRadioGroup[i].value;
  });
}

const colorRadioGroup = document.querySelectorAll(".colorRadio");
for (let i = 0; i < colorRadioGroup.length; i++) {
  colorRadioGroup[i].addEventListener("change", () => {
    color = colorRadioGroup[i].value;
  });
}

let paused = true;
let audioFile;
let fft;
let frequencyAmplitude;
let pixelLocation;

// Used for centering the cells vertically
let startY;
let endY;

const cellsArrWidth = 1024;
const cellsArrHeight = 400;
const pixelXDistance = 8;
const pixelYDistance = 4;
const numFrequencyBands = 128;

volumeInput.addEventListener("input", () => {
  if (audioFile) {
    audioFile.setVolume(parseFloat(volumeInput.value));
  }
});

function getAudio(event) {
  if (audioFile) {
    audioFile.stop();
    playBtn.classList.remove("paused");
  }
  audioFile = loadSound(event.target.files[0], () => {
    if (!playBtn.hasEventListener) {
      playBtn.addEventListener("click", () => {
        if (playBtn.classList.contains("paused")) {
          audioFile.pause();
        } else {
          audioFile.play();
        }
        playBtn.classList.toggle("paused");
      });
      playBtn.hasEventListener = true;
    }
    fft.setInput(audioFile);
  });
}

function setup() {
  let canvas = createCanvas(cellsArrWidth, cellsArrHeight);
  canvas.parent("canvasContainer");
  fft = new p5.FFT();
  noFill();
  background(0);
  loadPixels();
}

// Uses the greatest of the 4 adjacent pixels to the current pixel to determine the color of the current pixel
function patternOne() {
  // Decay all pixels
  for (let i = 0; i < cellsArrWidth; i++) {
    for (let j = 0; j < cellsArrHeight; j++) {
      pixelLocation = 4 * (cellsArrWidth * j + i);
      pixels[pixelLocation] = Math.max(0, pixels[pixelLocation] - 5);
      pixels[pixelLocation + 1] = Math.max(0, pixels[pixelLocation + 1] - 5);
      pixels[pixelLocation + 2] = Math.max(0, pixels[pixelLocation + 2] - 5);
    }
  }

  for (let i = 1; i < cellsArrWidth - 1; i++) {
    for (let j = 1; j < cellsArrHeight - 1; j++) {
      pixelLocation = 4 * (cellsArrWidth * j + i);
      pixels[pixelLocation] =
        Math.max(
          pixels[pixelLocation - 4],
          pixels[pixelLocation + 4],
          pixels[pixelLocation - 4 * cellsArrWidth],
          pixels[pixelLocation + 4 * cellsArrWidth]
        ) - 5;
      pixels[pixelLocation + 1] =
        Math.max(
          pixels[pixelLocation - 4 + 1],
          pixels[pixelLocation + 4 + 1],
          pixels[pixelLocation - 4 * cellsArrWidth + 1],
          pixels[pixelLocation + 4 * cellsArrWidth + 1]
        ) - 5;
      pixels[pixelLocation + 2] =
        Math.max(
          pixels[pixelLocation - 4 + 2],
          pixels[pixelLocation + 4 + 2],
          pixels[pixelLocation - 4 * cellsArrWidth + 2],
          pixels[pixelLocation + 4 * cellsArrWidth + 2]
        ) - 5;
    }
  }
}

// Uses the 4 diagonal pixels to the current pixel to determine the color of the current pixel
function patternTwo() {
  // Decay all pixels
  for (let i = 0; i < cellsArrWidth; i++) {
    for (let j = 0; j < cellsArrHeight; j++) {
      pixelLocation = 4 * (cellsArrWidth * j + i);
      pixels[pixelLocation] = Math.max(0, pixels[pixelLocation] - 5);
      pixels[pixelLocation + 1] = Math.max(0, pixels[pixelLocation + 1] - 5);
      pixels[pixelLocation + 2] = Math.max(0, pixels[pixelLocation + 2] - 5);
    }
  }

  for (let i = 1; i < cellsArrWidth - 1; i++) {
    for (let j = 1; j < cellsArrHeight - 1; j++) {
      pixelLocation = 4 * (cellsArrWidth * j + i);
      pixels[pixelLocation] =
        Math.max(
          pixels[pixelLocation - 4 - 4 * cellsArrWidth],
          pixels[pixelLocation + 4 - 4 * cellsArrWidth],
          pixels[pixelLocation - 4 + 4 * cellsArrWidth],
          pixels[pixelLocation + 4 + 4 * cellsArrWidth]
        ) - 5;
      pixels[pixelLocation + 1] =
        Math.max(
          pixels[pixelLocation - 4 - 4 * cellsArrWidth + 1],
          pixels[pixelLocation + 4 - 4 * cellsArrWidth + 1],
          pixels[pixelLocation - 4 + 4 * cellsArrWidth + 1],
          pixels[pixelLocation + 4 + 4 * cellsArrWidth + 1]
        ) - 5;
      pixels[pixelLocation + 2] =
        Math.max(
          pixels[pixelLocation - 4 - 4 * cellsArrWidth + 2],
          pixels[pixelLocation + 4 - 4 * cellsArrWidth + 2],
          pixels[pixelLocation - 4 + 4 * cellsArrWidth + 2],
          pixels[pixelLocation + 4 + 4 * cellsArrWidth + 2]
        ) - 5;
    }
  }
}

function patternThree() {
  // Decay all pixels
  for (let i = 0; i < cellsArrWidth; i++) {
    for (let j = 0; j < cellsArrHeight; j++) {
      pixelLocation = 4 * (cellsArrWidth * j + i);
      pixels[pixelLocation] = Math.max(0, pixels[pixelLocation] - 5);
      pixels[pixelLocation + 1] = Math.max(0, pixels[pixelLocation + 1] - 5);
      pixels[pixelLocation + 2] = Math.max(0, pixels[pixelLocation + 2] - 5);
    }
  }

  for (let i = 1; i < cellsArrWidth - 1; i++) {
    for (let j = 1; j < cellsArrHeight - 1; j++) {
      pixelLocation = 4 * (cellsArrWidth * j + i);
      pixels[pixelLocation] =
        Math.max(
          pixels[pixelLocation - 4],
          pixels[pixelLocation + 4 * cellsArrWidth]
        ) - 5;
      pixels[pixelLocation + 1] =
        Math.max(
          pixels[pixelLocation - 4 + 1],
          pixels[pixelLocation + 4 * cellsArrWidth + 1]
        ) - 5;
      pixels[pixelLocation + 2] =
        Math.max(
          pixels[pixelLocation - 4 + 2],
          pixels[pixelLocation + 4 * cellsArrWidth + 2]
        ) - 5;
    }
  }
}

function patternFour() {
  // Decay all pixels
  for (let i = 0; i < cellsArrWidth; i++) {
    for (let j = 0; j < cellsArrHeight; j++) {
      pixelLocation = 4 * (cellsArrWidth * j + i);
      pixels[pixelLocation] = Math.max(0, pixels[pixelLocation] - 5);
      pixels[pixelLocation + 1] = Math.max(0, pixels[pixelLocation + 1] - 5);
      pixels[pixelLocation + 2] = Math.max(0, pixels[pixelLocation + 2] - 5);
    }
  }

  // Every pixel becomes the highest of its neighbors minus 5 (exluding edges for performance)
  for (let i = 1; i < cellsArrWidth - 1; i++) {
    for (let j = 1; j < cellsArrHeight - 1; j++) {
      pixelLocation = 4 * (cellsArrWidth * j + i);
      pixels[pixelLocation] =
        Math.max(
          pixels[pixelLocation + 4],
          pixels[pixelLocation - 4 * cellsArrWidth]
        ) - 5;
      pixels[pixelLocation + 1] =
        Math.max(
          pixels[pixelLocation + 4 + 1],
          pixels[pixelLocation - 4 * cellsArrWidth + 1]
        ) - 5;
      pixels[pixelLocation + 2] =
        Math.max(
          pixels[pixelLocation + 4 + 2],
          pixels[pixelLocation - 4 * cellsArrWidth + 2]
        ) - 5;
    }
  }
}

function patternFive() {
  // Decay all pixels
  for (let i = 0; i < cellsArrWidth; i++) {
    for (let j = 0; j < cellsArrHeight; j++) {
      pixelLocation = 4 * (cellsArrWidth * j + i);
      pixels[pixelLocation] = Math.max(0, pixels[pixelLocation] - 2);
      pixels[pixelLocation + 1] = Math.max(0, pixels[pixelLocation + 1] - 2);
      pixels[pixelLocation + 2] = Math.max(0, pixels[pixelLocation + 2] - 2);
    }
  }

  for (let i = 1; i < cellsArrWidth - 1; i++) {
    for (let j = 1; j < cellsArrHeight - 1; j++) {
      pixelLocation = 4 * (cellsArrWidth * j + i);
      pixels[pixelLocation] =
        (pixels[pixelLocation - 4] +
          pixels[pixelLocation + 4] +
          pixels[pixelLocation - 4 * cellsArrWidth] +
          pixels[pixelLocation + 4 * cellsArrWidth]) /
        4;
      pixels[pixelLocation + 1] =
        (pixels[pixelLocation - 4 + 1] +
          pixels[pixelLocation + 4 + 1] +
          pixels[pixelLocation - 4 * cellsArrWidth + 1] +
          pixels[pixelLocation + 4 * cellsArrWidth + 1]) /
        4;
      pixels[pixelLocation + 2] =
        (pixels[pixelLocation - 4 + 2] +
          pixels[pixelLocation + 4 + 2] +
          pixels[pixelLocation - 4 * cellsArrWidth + 2] +
          pixels[pixelLocation + 4 * cellsArrWidth + 2]) /
        4;
    }
  }
}

function colorOne() {
  [
    pixels[pixelLocation],
    pixels[pixelLocation + 1],
    pixels[pixelLocation + 2],
  ] = [frequencyAmplitude, 128, frequencyAmplitude];
}

function colorTwo() {
  [
    pixels[pixelLocation],
    pixels[pixelLocation + 1],
    pixels[pixelLocation + 2],
  ] = [frequencyAmplitude, frequencyAmplitude, 128];
}

function colorThree() {
  [
    pixels[pixelLocation],
    pixels[pixelLocation + 1],
    pixels[pixelLocation + 2],
  ] = [128, frequencyAmplitude, frequencyAmplitude];
}

function colorFour() {
  [
    pixels[pixelLocation],
    pixels[pixelLocation + 1],
    pixels[pixelLocation + 2],
  ] = [
    ((((millis() / 5) % 255) + 20) / 255) * frequencyAmplitude,
    ((((millis() / 14) % 255) + 20) / 255) * frequencyAmplitude,
    ((((millis() / 9) % 255) + 20) / 255) * frequencyAmplitude,
  ];
}

// Places cells based on the audio spectrum
function placeCells(spectrum) {
  for (let i = 0; i < cellsArrWidth; i += pixelXDistance) {
    // Set number of cells based on the frequency amplitude
    frequencyAmplitude = map(
      spectrum[i / pixelXDistance],
      0,
      255,
      0,
      cellsArrHeight - 1
    );
    // Place cells centered vertically
    startY =
      Math.floor(cellsArrHeight / 2) - Math.floor(frequencyAmplitude / 2);
    endY = Math.floor(cellsArrHeight / 2) + Math.floor(frequencyAmplitude / 2);
    for (let j = startY; j < endY; j += pixelYDistance) {
      pixelLocation = 4 * (cellsArrWidth * j + i);
      window[color]();
    }
  }
}

function draw() {
  let spectrum = fft.analyze(numFrequencyBands);
  placeCells(spectrum);
  window[pattern]();
  updatePixels();
}
