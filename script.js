const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist')
const music = document.querySelector('audio');
const progressContainer=document.getElementById('progress-container');
const progress=document.getElementById('progress');
const currentTimeEl=document.getElementById('current-time');
const durationEl=document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const songs = [
    {
        name:'mylist-1',
        displayName : 'Who Says',
        artist : 'Selena Gomez',
    },
    {
        name:'mylist-2',
        displayName: 'Magic Shop',
        artist:'BTS',
    },
    {
        name:'mylist-3',
        displayName: 'Fight Song',
        artist:'Rachel Platten',
    },
    {
        name:'mylist-4',
        displayName: 'Bezos I',
        artist:'Bo Burnham',
    }
];

//Check if playing
let isPlaying=false;

//Play
function playSong()
{
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','pause');
    music.play();
}

//Pause
function pauseSong()
{
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','play');
    music.pause();
}

//Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong(): playSong()));

//Update Dom
function loadSong(song) {
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    music.src=`music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`;
}
//Current song
let songIndex=0;

function prevSong(){
    songIndex= Math.abs((songIndex+3)%songs.length) ;
    loadSong(songs[songIndex]);  
    playSong();
}
function nextSong(){
    songIndex=(songIndex+1)%songs.length;
    loadSong(songs[songIndex]);  
    playSong();  
}

//Progress Bar
function progressBar(e){
    if(isPlaying){
        const { duration , currentTime }=e.srcElement;
        //update progress bar
        const progressPercent=(currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;
        //Total duration
        const durationMinutes=Math.floor(duration/60);
        let durationSeconds=Math.floor(duration%60);
        if(durationSeconds<10){
            durationSeconds=`0${durationSeconds}`;
        }
        if(durationSeconds){
            durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
        }
        //Current time update
        const currentMinutes=Math.floor(currentTime/60);
        let currentSeconds=Math.floor(currentTime%60);
        if(currentSeconds<10){
            currentSeconds=`0${currentSeconds}`;
        }
        currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const { duration }=music;
    music.currentTime = (clickX / width)*duration;
}

//On Load select first song
loadSong(songs[songIndex]);

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',progressBar);
music.addEventListener('ended',nextSong);
progressContainer.addEventListener('click',setProgressBar);