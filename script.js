let playBtn = 
document.querySelector(".play-btn");
const audioPlayer = document.querySelector(".audio-player");

const playIcon = 
playBtn.querySelector("i");

const progressBar = document.querySelector(".progress-bar");

const currentTime = document.querySelector(".current-time");

const duration = document.querySelector(".duration");

const songTitle = document.querySelector(".song-title");

const songImage = document.querySelector(".song-image");

const volumeBar = document.querySelector(".volume-bar");

const volumeIcon = document.querySelector(".volume-icon");

const likeBtn = document.querySelector(".like-btn");

const likeIcon = likeBtn.querySelector(".like-icon");

const repeatBtn = document.querySelector(".repeat-btn");

const repeatIcon = document.querySelector(".repeat-icon");

const repeatOne = document.querySelector(".repeat-one");

const playlistBtn = document.querySelector(".playlist-btn");

const playlist = document.querySelector(".playlist");

const songs = [
  {
    name: "أنشودة 1",
    audio: "song-1.mp3",
    image: "song-1.jpg"
  },

  {
    name: "أنشودة 2",
    audio: "song-2.mp3",
    image: "song-2.jpg"
  },

  {
    name: "أنشودة 3",
    audio: "song-3.mp3",
    image: "song-3.jpg"
  }
];

let currentSong = 0;
let isRepeat = false;

const nextBtn = document.querySelector(".next-btn");

const previousBtn = document.querySelector(".previous-btn");

progressBar.addEventListener("input", function() {
  audioPlayer.currentTime = progressBar.value;
  
});

audioPlayer.addEventListener("timeupdate", function() {
  progressBar.max = audioPlayer.duration;
  progressBar.value = audioPlayer.currentTime;
  const minutes = Math.floor(audioPlayer.currentTime / 60);
  const seconds = Math.floor(audioPlayer.currentTime % 60);
  let formattedSeconds ;
  if (seconds < 10) {
     formattedSeconds = "0" + seconds;
    
  }else {
     formattedSeconds = seconds;
  }
  
  currentTime.textContent = minutes + ":" + formattedSeconds;
  
});

audioPlayer.addEventListener("loadedmetadata", function() {
  const durationMinutes = Math.floor(audioPlayer.duration / 60);
  const durationSeconds = Math.floor(audioPlayer.duration % 60);
  let formattedDurationSeconds;
  if (durationSeconds < 10 ) {
    formattedDurationSeconds = "0" + durationSeconds;
  }else {
    formattedDurationSeconds = durationSeconds;
  }
  
duration.textContent = durationMinutes + ":" + formattedDurationSeconds;
});


playBtn.addEventListener("click", function() {
  
  if (audioPlayer.paused) {
  audioPlayer.play();
  playIcon.classList.remove("fa-play");
playIcon.classList.add("fa-pause");
} else {
  audioPlayer.pause();
  playIcon.classList.remove("fa-pause");
playIcon.classList.add("fa-play");
}
  
});


nextBtn.addEventListener("click", function() {
  currentSong++;
  if (currentSong > songs.length - 1) {
    currentSong = 0;
}

  audioPlayer.src = songs[currentSong].audio;
  audioPlayer.play();
  songTitle.textContent = songs[currentSong].name;
  songImage.src = songs[currentSong].image;
  document.querySelectorAll(".song-item").forEach(function(item, index) {
  if (index === currentSong) {
    item.classList.add("active");
  } else {
    item.classList.remove("active");
  }
});
});



previousBtn.addEventListener("click", function() {
  currentSong--;
  if (currentSong < 0) {
    currentSong = songs.length - 1;
}
  audioPlayer.src = songs[currentSong].audio;
  audioPlayer.play();
  songTitle.textContent = songs[currentSong].name;
  songImage.src = songs[currentSong].image;
  document.querySelectorAll(".song-item").forEach(function(item, index) {
  if (index === currentSong) {
    item.classList.add("active");
  } else {
    item.classList.remove("active");
  }
});
});


audioPlayer.addEventListener("ended", function() {
  if (isRepeat) {
  audioPlayer.currentTime = 0;
  audioPlayer.play();
}else {
    currentSong++;
    if (currentSong > songs.length - 1) {
        currentSong = 0;
    }
    
    audioPlayer.src = songs[currentSong].audio;
  songTitle.textContent = songs[currentSong].name;
  songImage.src = songs[currentSong].image;
  audioPlayer.play();
  document.querySelectorAll(".song-item").forEach(function(item, index) {
  if (index === currentSong) {
    item.classList.add("active");
  } else {
    item.classList.remove("active");
  }
});
}
});


volumeBar.addEventListener("input", function() {
  audioPlayer.volume = volumeBar.value;
  if (volumeBar.value === "0") {
volumeIcon.classList.remove("fa-volume-high");
volumeIcon.classList.add("fa-volume-xmark");
}else {
  volumeIcon.classList.remove("fa-volume-xmark");
  volumeIcon.classList.add("fa-volume-high");
}

});

likeBtn.addEventListener("click", function() {
  if (likeIcon.classList.contains("fa-regular")) {
  likeIcon.classList.remove("fa-regular");
likeIcon.classList.add("fa-solid");
likeIcon.style.color = "red";
}else {
  likeIcon.classList.remove("fa-solid");
likeIcon.classList.add("fa-regular");
likeIcon.style.color = "";
}
});


repeatBtn.addEventListener("click", function() {
  isRepeat = !isRepeat;
  if (isRepeat) {
  repeatOne.style.display = "block";
} else {
  repeatOne.style.display = "none";
}
});

playlistBtn.addEventListener("click", function() {
  if (playlist.style.display === "none") {
    playlist.style.display = "block";
  } else {
    playlist.style.display = "none";
  }
});


songs.forEach(function(song, index) {
    const songItem = document.createElement("div");
    songItem.classList.add("song-item");
    songItem.textContent = song.name;
    playlist.appendChild(songItem);
    songItem.addEventListener("click", function() {
      currentSong = index;
      audioPlayer.src = song.audio;
      audioPlayer.play();
      songTitle.textContent = song.name;
      songImage.src = song.image;
      document.querySelectorAll(".song-item").forEach(function(item) {
  item.classList.remove("active");
});
      songItem.classList.add("active");
      console.log(songItem.classList);
});
});