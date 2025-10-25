import { Howl, Howler } from "howler";

// Khởi tạo âm thanh nền
export const backgroundMusic = new Howl({
  src: [
    "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
  ],
  loop: true,
  volume: 0.3,
  autoplay: false,
});

// Âm thanh khi chọn ký tự
export const selectSound = new Howl({
  src: ["https://assets.mixkit.co/active_storage/sfx/2877/2877-preview.mp3"],
  volume: 0.5,
  autoplay: false,
});

// Âm thanh khi hoàn thành game
export const completeSound = new Howl({
  src: ["https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"],
  volume: 0.7,
  autoplay: false,
});

// Âm thanh khi chiến thắng
export const winSound = new Howl({
  src: ["https://assets.mixkit.co/active_storage/sfx/2058/2058-preview.mp3"],
  volume: 0.7,
  autoplay: false,
});

// Âm thanh khi thua
export const loseSound = new Howl({
  src: ["https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"],
  volume: 0.7,
  autoplay: false,
});

// Hàm play nhạc nền
export const playBackgroundMusic = () => {
  backgroundMusic.play();
};

// Hàm dừng nhạc nền
export const stopBackgroundMusic = () => {
  backgroundMusic.stop();
};

// Hàm điều chỉnh âm lượng
export const setMusicVolume = (volume) => {
  Howler.volume(volume);
};
