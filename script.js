console.log("hello");
let songIndex=0;
let audioElement=new Audio("song/1.mp3");
let masterPlay=document.getElementById('masterPlay');
let ProgressBar=document.getElementById('myProgressBar');
let masterSongName=document.getElementById('masterSongName')
let songItems=Array.from(document.getElementsByClassName('song'));

let songs=[
    {songName:"Jhuki Jhuki Nazar", filePath:"song/1.mp3" , coverPath:"covers/1.jpg" ,timeStamp:"5:23"},
    {songName:"Tum itna jo Muskura Rahe Ho", filePath:"song/2..mp3" , coverPath:"covers/1.jpg",timeStamp:"5:22"},
    {songName:"Hoshwalo Ko Khabar Kya", filePath:"song/3.mp3" , coverPath:"covers/1.jpg",timeStamp:"5:02"},
    {songName:"Ek Pyaar Ka Nagma Hai", filePath:"song/4.mp3" , coverPath:"covers/1.jpg",timeStamp:"4:56"},
    {songName:"Kahi Dur Jab Din Dhal Jaye", filePath:"song/5.mp3" , coverPath:"covers/1.jpg",timeStamp:"5:51"},
    {songName:"Sanson KI mala", filePath:"song/6.mp3" , coverPath:"covers/1.jpg",timeStamp:"13:31"},
    {songName:"Wakratunda Mahakaya", filePath:"song/1.mp4" , coverPath:"covers/1.jpg",timeStamp:"1:01"},

]

songItems.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songlistplay")[0].innerText=songs[i].songName;
    element.getElementsByClassName("timestamp")[0].firstChild.textContent=songs[i].timeStamp+" ";
})

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    progress=parseInt(audioElement.currentTime/audioElement.duration*100);
    // console.log(progress);
    ProgressBar.value=progress;
})

ProgressBar.addEventListener('input', ()=>{
    audioElement.currentTime = ProgressBar.value*audioElement.duration/100;
})

const MakeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        console.log(element);
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
        // console.log(e.target);
        MakeAllPlays();
        songIndex=parseInt(e.target.id);
        masterSongName.innerText=songs[songIndex-1].songName;
        gif.style.opacity=1;
        if(e.target.classList.contains('fa-play-circle')){
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src=`song/${songIndex}.mp3`;
            audioElement.currentTime=0;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else{
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');           
        }
    })
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=1){
        songIndex=7;
    }
    else{
        songIndex -=1;
    }
    audioElement.src=`song/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex-1].songName;
    gif.style.opacity=1;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7){
        songIndex=1;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`song/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex-1].songName;
    gif.style.opacity=1;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})