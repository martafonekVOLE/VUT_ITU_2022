
function getNewTimer(minutes, name) {
    if(document.getElementById("timer")){
        return;
    }
    const newTimer = document.createElement("div");
    newTimer.classList.add("timer");
    newTimer.id = "timer";
    newTimer.textContent = "Timer: " + name + "  ";

    const quitButton = document.createElement("button");
    quitButton.textContent = "End";
    quitButton.addEventListener('click', () => {
        quitButton.parentElement.parentElement.removeChild(newTimer);
        clearTimeout(downloadTimer)
    });
    quitButton.classList.add("timer_quit_button");
    newTimer.appendChild(quitButton);


    const timerRemaining = document.createElement("div");
    timerRemaining.classList.add("timer_remaining");
    timerRemaining.id = "timer_remaining";
    newTimer.appendChild(timerRemaining);



    //find parent and append
    const parentElement = document.getElementById("timer_container");
    parentElement.appendChild(newTimer);

    let seconds = 0;
    const downloadTimer = setInterval(function function1(){
        document.getElementById("timer_remaining").innerHTML = minutes + ":" + seconds + " left";
        if(seconds === 0){
            minutes--;
            seconds+=60;
        }
        seconds--;
        let timerParent;
        if (minutes <= 0) {
            clearInterval(downloadTimer);
            timerParent = document.getElementById("timer_remaining");
            timerParent.innerHTML = "Time is up!";
            timerParent.parentElement.style.background = "#ea9292";
            var audio = new Audio('ding.wav');
            audio.play();
        }
    }, 1000);
}

