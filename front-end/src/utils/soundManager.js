import { Howl } from "howler";
import clickCardWAV from "../assets/clickCard.wav";
import startRoundMP3 from "../assets/startRound.wav";
import wrongAnsMP3 from "../assets/wrongAns.mp3";
import correctAnsMP3 from "../assets/correctAns.mp3";
import winGameWAV from "../assets/winGame.wav";
import loseGameWAV from "../assets/loseGame.wav";

// Âm thanh khi click thẻ
export const clickCardSound = new Howl({
  src: [clickCardWAV],
  volume: 0.5,
  autoplay: false,
});

// Âm thanh khi bắt đầu round
export const startRoundSound = new Howl({
  src: [startRoundMP3],
  volume: 0.5,
  autoplay: false,
});

// Âm thanh khi trả lời sai
export const wrongAnswerSound = new Howl({
  src: [wrongAnsMP3],
  volume: 0.6,
  autoplay: false,
});

// Âm thanh khi trả lời đúng
export const correctAnswerSound = new Howl({
  src: [correctAnsMP3],
  volume: 0.6,
  autoplay: false,
});

// Âm thanh khi win game
export const winGameSound = new Howl({
  src: [winGameWAV],
  volume: 0.7,
  autoplay: false,
});

// Âm thanh khi lose game
export const loseGameSound = new Howl({
  src: [loseGameWAV],
  volume: 0.7,
  autoplay: false,
});

// Hàm play âm thanh click thẻ
export const playClickCardSound = () => {
  clickCardSound.play();
};

// Hàm play âm thanh bắt đầu round
export const playStartRoundSound = () => {
  startRoundSound.play();
};

// Hàm play âm thanh trả lời sai
export const playWrongAnswerSound = () => {
  wrongAnswerSound.play();
};

// Hàm play âm thanh trả lời đúng
export const playCorrectAnswerSound = () => {
  correctAnswerSound.play();
};

// Hàm play âm thanh win game
export const playWinGameSound = () => {
  winGameSound.play();
};

// Hàm play âm thanh lose game
export const playLoseGameSound = () => {
  loseGameSound.play();
};
