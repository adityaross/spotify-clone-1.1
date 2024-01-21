
console.log("hellow aditya javascript has now started......!");

//  getting the songs from songs directory
function secondsToMinutesSeconds(seconds) {
    // Ensure input is a non-negative number
    seconds = Math.max(0, seconds);

    // Calculate minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Format the result with leading zeros
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    // Combine minutes and seconds with a colon
    const formattedTime = `${formattedMinutes}:${formattedSeconds}`;

    return formattedTime;
}

let currentsong = new Audio();
 async function getSongs(){
       let songs_container = await fetch("http://127.0.0.1:5500/songs/");
       let songs = await songs_container.text();
       let div = document.createElement("div");
        div.innerHTML = songs;
        let links = div.getElementsByTagName("a");
        let myPlaylist = [];
        for (let index = 0; index < links.length; index++) {
          const element = links[index];
           if(element.href.endsWith(".mp3")){
               myPlaylist.push(element.href.split("/songs/")[1].replaceAll("%20"," "));
           }
          
        }

        return myPlaylist;
 }

   const playMusic =(track)=>{
        //   currentSong= new Audio("/songs/"+track);
          currentsong.src = "/songs/"+track;
          currentsong.play();
          play.src="pause.svg";
          document.querySelector(".songInfo").innerHTML=track;
          document.querySelector(".songTime").innerHTML = "00:00";
   }

 async function main(){
    
     let songs = await getSongs();
     // console.log(songs);
  console.log(songs)
      let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
      for (const song of songs) {
           songUl.innerHTML =songUl.innerHTML+`
           <li class="song-item">
                            <div class="song-icon">
                                <img src="music.svg" class="invert" alt="">
                            </div>
                            <div class="song-info">
                                <div class="song">${song}</div>
                                <div class="singer">Shubh</div>
                            </div>
                            <div class="song-play">
                                <span>Play Now</span>
                                <img src="play.svg" alt="play-btn" class="invert">
                            </div>
                        </li>
           `;
           //Attach event listener to each li item

            Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e)=>{
                
                e.addEventListener("click",element=>{
                    console.log( e.querySelector(".song-info").firstElementChild.innerHTML);
                    e.querySelector(".song-info").firstElementChild.innerHTML;
                    playMusic( e.querySelector(".song-info").firstElementChild.innerHTML.trim());
                })
            })
            
            
      }

       
                        
 }

 play.addEventListener("click",()=>{
    if(currentsong.paused){
       currentsong.play();
       play.src="pause.svg";
    }else{
      play.src="play.svg"
      currentsong.pause();
       
    }
})

// listen for current time and duration of song 

  currentsong.addEventListener("timeupdate",()=>{
      console.log(currentsong.currentTime,currentsong.duration);
       document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%";
  })

   // event listener on seekbar

     document.querySelector(".seekBar").addEventListener("click",(e)=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
           document.querySelector(".circle").style.left=percent+"%";
           currentsong.currentTime = ((currentsong.duration)*percent)/100;
         
     })

     // hamburger slider

       let ham=document.querySelector(".ham");
       ham.addEventListener("click",()=>{
            let left = document.querySelector(".left");
            left.style.left="0";
       })

       let cross = document.querySelector(".cross");
       cross.addEventListener("click",()=>{
        let left = document.querySelector(".left");
        left.style.left="-120%";
       })
                 
         // next and previous btn event listener
          
        //  previous.addEventListener("click",()=>{})

 main();