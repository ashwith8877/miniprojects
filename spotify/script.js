let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let playButton = document.getElementById('masterplay');
let progressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName: "Stranger", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Alone", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Despacito", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "On My Way", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Faded", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
];

songItems.forEach((element, i) => {
    if (songs[i]) { 
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    }
});


playButton.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        playButton.classList.remove('fa-circle-play');
        playButton.classList.add('fa-circle-pause');
        gif.style.opacity=1;

    } else {
        audioElement.pause();
        playButton.classList.remove('fa-circle-pause');
        playButton.classList.add('fa-circle-play');
         gif.style.opacity=0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    progressBar.value = progress;
});
progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let songIndex = parseInt(e.target.id);


        if (!audioElement.paused && songIndex === currentSongIndex) {
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            playButton.classList.remove('fa-circle-pause');
            playButton.classList.add('fa-circle-play');
        } 
        else {
            
            currentSongIndex = songIndex;
            makeAllPlays();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');

            audioElement.src = `songs/${songIndex + 1}.mp3`;
            mastersongname.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            playButton.classList.remove('fa-circle-play');
            playButton.classList.add('fa-circle-pause');
        }
    });
});

let currentSongIndex = -1;


document.getElementById("next").addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1
    }
        audioElement.src = `songs/${songIndex + 1}.mp3`; 
        mastersongname.innerText=songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        playButton.classList.remove('fa-circle-play');
        playButton.classList.add('fa-circle-pause');
})
document.getElementById("previous").addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1
    }
        audioElement.src = `songs/${songIndex + 1}.mp3`; 
        mastersongname.innerText=songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        playButton.classList.remove('fa-circle-play');
        playButton.classList.add('fa-circle-pause');
})