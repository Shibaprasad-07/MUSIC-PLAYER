let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'faded.png',
        name : 'Stay',
        artist : 'Zedd',
        music : 'faded.mp3'
    },
    {
        img : 'fallingdown.jpg',
        name : 'Falling Down',
        artist : 'Wid Cards',
        music : 'fallingdown.mp3'
    },
    {
        img : 'stay.png',
        name : 'Faded',
        artist : 'Alan Walker',
        music : 'stay.mp3'
    },
    {
        img : 'ratherbe.jpg',
        name : 'Rather Be',
        artist : 'Clean Bandit',
        music : 'ratherbe.mp3'
    },
    {
        img : 'mylife.jpg',
        name : 'My Life in This Town',
        artist : 'Anirudh Ravichander',
        music : 'music 2.mp3'
    },
    {
        img : 'vidya.jpg',
        name : 'Vidyamuruchi',
        artist : 'Vidya Sagar',
        music : 'music1.mp3'
    },
    {
        img : 'rolex.jpg',
        name : 'Vikram Rolex',
        artist : 'Anirudh Ravichander',
        music : 'music3.mp3'
    },
    {
        img : 'running.png',
        name : 'Running Up That Hill',
        artist : 'Kate Bush',
        music : 'music4.mp3'
    },
    {
        img: 'flowers.jpg',
        name: 'Flowers',
        artist: 'Miley Cyrus',
        music: 'music6.mp3'
    },
    {
        img: 'bye.jpg',
        name: 'Bye Bye Bye',
        artist: 'NSYNC',
        music: 'music5.mp3'
    },
    {
        img: 'nightchanges.jpg',
        name: 'Night Changes',
        artist: 'One Direction',
        music: 'music7.mp3'
    },
    {
        img: 'shape.jpg',
        name: 'Shape of You',
        artist: 'Ed Sheeran',
        music: 'music8.mp3'
    },
    {
        img: 'perfect.jpg',
        name: 'Perfect',
        artist: 'Ed Sheeran',
        music: 'music9.mp3'
    },
    {
        img: 'hope.jpg',
        name: 'Hope',
        artist: 'XXXTentacion',
        music: 'music10.mp3'
    },
    {
        img: 'skyfall.jpg',
        name: 'Skyfall',
        artist: 'Adele',
        music: 'music11.mp3'
    },
    {
        img: 'diewith.jpg',
        name: 'Die with a Smile',
        artist: 'Bruno Mars',
        music: 'music12.mp3'
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
