const songs = [
  {
    name: "Lost in the City Lights",
    singer: "Cosmo Sheldrake",
    source: "resources/lost-in-city-lights-145038.mp3",
  },
  {
    name: "Forest Lullaby",
    singer: "Lesfm",
    source: "resources/forest-lullaby-110624.mp3",
  },
];

let currentSongIndex = 0;
let currentSongDuration;
let currentStateOfTheSong = "stopped";
let timerId;

const songNameEle = document.querySelector(".song-name");
const singerNameEle = document.querySelector(".singer-name");

const audioPlayerEle = document.getElementById("audio-player");

const timeElapsedEle = document.querySelector(".time-elapsed");
const totalTimeEle = document.querySelector(".total-time");
const progressEle = document.querySelector("progress");

const playPauseBtn = document.querySelector(".play-pause-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

playPauseBtn.addEventListener("click", function () {
  if (currentStateOfTheSong === "stopped") {
    currentStateOfTheSong = "playing";
    audioPlayerEle.play();
    return;
  }

  if (currentStateOfTheSong === "playing") {
    currentStateOfTheSong = "stopped";
    audioPlayerEle.pause();
    return;
  }
});

prevBtn.addEventListener("click", goToPreviousSong);

nextBtn.addEventListener("click", goToNextSong);

audioPlayerEle.addEventListener("ended", function () {
  reset();
});

audioPlayerEle.addEventListener("loadedmetadata", function (e) {
  currentSongDuration = Math.ceil(audioPlayerEle.duration);
  songNameEle.textContent = songs[currentSongIndex].name;
  singerNameEle.textContent = songs[currentSongIndex].singer;
  timeElapsedEle.textContent = "00:00";
  progressEle.value = 0;
  progressEle.max = currentSongDuration;
  totalTimeEle.textContent = getFormattedSongDuration();
});

progressEle.addEventListener("click", function (e) {
  // Calculate the click position relative to the progress bar
  const progressBarWidth = this.offsetWidth;
  // Position of the click relative to the target element
  const clickX = e.offsetX;

  const clickPercentage = clickX / progressBarWidth;

  const currentTime = Math.ceil(currentSongDuration * clickPercentage);
  audioPlayerEle.currentTime = currentTime;
  progressEle.value = currentTime;
  timeElapsedEle.textContent = getFormattedCurrentSongTime();
});

audioPlayerEle.addEventListener("timeupdate", function (e) {
  progressEle.value = Math.floor(audioPlayerEle.currentTime);
  timeElapsedEle.textContent = getFormattedCurrentSongTime();
});

function goToPreviousSong() {
  if (currentSongIndex > 0) {
    currentSongIndex--;
  } else {
    currentSongIndex = songs.length - 1;
  }

  setSongSource();
  reset();
}

function goToNextSong() {
  if (currentSongIndex < songs.length - 1) {
    currentSongIndex++;
  } else {
    currentSongIndex = 0;
  }

  setSongSource();
  reset();
}

function reset() {
  audioPlayerEle.pause();
  audioPlayerEle.currentTime = 0;
  timeElapsedEle.textContent = "00:00";
  progressEle.value = 0;
  currentStateOfTheSong = "stopped";
}

function getFormattedCurrentSongTime() {
  let currentTime = Math.ceil(audioPlayerEle.currentTime);
  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = currentTime % 60;

  let formattedCurrentMinutes = currentMinutes.toString().padStart(2, "0");
  let formattedCurrentSeconds = currentSeconds.toString().padStart(2, "0");

  return `${formattedCurrentMinutes}:${formattedCurrentSeconds}`;
}

function getFormattedSongDuration() {
  let minutes = Math.floor(currentSongDuration / 60);
  let seconds = currentSongDuration % 60;

  let formattedMinutes = `${minutes.toString().padStart(2, "0")}`;
  let formattedSeconds = `${seconds.toString().padStart(2, "0")}`;

  return `${formattedMinutes}:${formattedSeconds}`;
}

function setSongSource() {
  audioPlayerEle.src = songs[currentSongIndex].source;
}

setSongSource();
