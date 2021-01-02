const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'jacinto-1',
        title: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        title: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        title: 'Good night, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        title: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
];

// Check if Playing
let isPlaying = false;

// Play
playSong = () => {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
loadSong = song => {
    title.textContent = song.title;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Previous song
prevSong = () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    //console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
nextSong = () => {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    //console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select first song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
updateProgressBar = e => {
    if (isPlaying) {
        //console.log(e);
        const {currentTime, duration} = e.srcElement;
        //console.log(currentTime, duration);
        // Update Progress Bar Width
        const progressPercent = (currentTime / duration) * 100;
        //console.log(progressPercent);
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        //console.log('minutes', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        //console.log('seconds', durationSeconds);
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        //console.log('minutes', currentMinutes);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        //console.log('seconds', currentSeconds);
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
setProgressBar = e => {
    //console.log(e);
    //const width = this.clientWidth;
    const width = e.srcElement.clientWidth;
    //console.log('width', width);
    const clickX = e.offsetX;
    //console.log('click', clickX);

    // pull the duration from the audio element
    const {duration} = music;
    //console.log(duration);
    //console.log(clickX / width);
    //console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);