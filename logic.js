const appleContainer = document.querySelector(".spawnarea");
const newtonContainer = document.querySelector(".newtonarea");
var apple=document.querySelector(".spawnarea .apple");
const newton = document.querySelector(".newtonarea .newton");
var scoreVal=0;
var lifeVal=3;
const scoreTxt = document.querySelector(".score");
const lifeTxt = document.querySelector(".lifes");
const gameOverPage = document.querySelector(".over");
const restartBtn = document.querySelector(".restart");
const playBtn = document.querySelector(".play");
const startPage = document.querySelector(".start");

const crashSound = document.querySelector(".crash");
const catchSound = document.querySelector(".catchFruit");

var div;



const appleRespawn=()=>{
    const top = Math.floor(Math.random() * (appleContainer.clientHeight));
    const left = Math.floor(Math.random()*(appleContainer.clientWidth));

    div = document.createElement("div");
    appleContainer.appendChild(div);
    div.style.top = `${top}px`
    div.style.left = `${left}px`

    div.style.width='60px';
    div.style.height='60px';
    div.style.position='absolute';
    div.style.backgroundImage='url("img/apple.png")';
    div.style.backgroundPosition ='center';
    div.style.backgroundRepeat='no-repeat';
    div.style.backgroundSize='cover';
    div.style.zIndex=2;
    div.className='apple lastSpawned';
    div.style.display='initial';
    div.style.animation='drop 6s steps(15)';

    newton.style.left=div.style.left;   

    apple=div;
    // apple.style.border='2px solid green';

    
    console.log(div.style.top);

    div.addEventListener('click',(brrr)=>{
    let playSound2 = catchSound;
    playSound2.play();
    scoreVal++;
    scoreTxt.innerHTML='SCORE:'+scoreVal;
    appleRespawn();
    brrr.target.style.display='none';

});
}


apple.addEventListener('click',(e)=>{

    let playSound1 = catchSound;
    playSound1.play();
    scoreVal++;
    scoreTxt.innerHTML='SCORE:'+scoreVal;
    appleRespawn();
    e.target.style.display='none';
});


function decreasePoint()
{
    // console.log(apple.getBoundingClientRect().top);
    // console.log(newton.getBoundingClientRect().top);
    var hardness=0;
    if(scoreVal>10 && hardness<5)
    {
    hardness = parseInt(6-(scoreVal/10));
    div.style.animation='drop '+hardness+'s steps(15)';
    }

    if(apple.getBoundingClientRect().top>newton.getBoundingClientRect().top)
    {
        crashSound.play();
        lifeVal--;
        scoreTxt.innerHTML='SCORE:'+scoreVal;
        lifeTxt.innerHTML='LIFES:'+lifeVal;
        console.log('here');
        apple.style.display='none';
        if(lifeVal==0)
        {

            setTimeout(() => {
            gameOverPage.style.opacity = "1";
            gameOverPage.style.display = "initial";
            }, 100)
        return;
        }
        appleRespawn();
    }
}

setInterval(()=> {
    decreasePoint()
},1);

restartBtn.addEventListener('click',()=>{
    location.reload();
});

playBtn.addEventListener('click',()=>{
    startPage.style.opacity = "0";
    setTimeout(() => {
        startPage.style.display = "none";
    }, 100)
    appleRespawn();
});