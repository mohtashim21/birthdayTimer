let isDobOpen = false;
let dateOfBirth;
const settingCogEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");
const beforeTextEl = document.getElementById("beforeText");
const afterTextEl = document.getElementById("afterText");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");
const countdownEl = document.getElementById("countdown");
const remainingDaysEl = document.getElementById("remainingDays");
const remainingHoursEl = document.getElementById("remainingHours");
const remainingMinutesEl = document.getElementById("remainingMinutes");
const remainingSecondsEl = document.getElementById("remainingSeconds");
const birthdayMessageEl = document.getElementById("birthdayMessage");
const happyBirthdayButtonEl = document.getElementById("happyBirthdayButton");

const toggleDob = () => {
    if (isDobOpen) {
        settingContentEl.classList.add("hide");
    } else {
        settingContentEl.classList.remove("hide");
    }
    isDobOpen = !isDobOpen;
    console.log("Toggle", isDobOpen);
};

const updateCountdown = () => {
    const currentDate = new Date();
    const nextBirthday = new Date(currentDate.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate());

    if (currentDate > nextBirthday) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    const timeDiff = nextBirthday - currentDate;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    remainingDaysEl.textContent = days;
    remainingHoursEl.textContent = hours;
    remainingMinutesEl.textContent = minutes;
    remainingSecondsEl.textContent = seconds;

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
       
        birthdayMessageEl.classList.remove("hide");
        countdownEl.classList.add("hide");
        happyBirthdayButtonEl.classList.remove("hide");
    }
};

const setDOBHandler = () => {
    const dateString = dobInputEl.value;

    dateOfBirth = new Date(dateString);
    if (dateOfBirth) {
        beforeTextEl.classList.add("hide");
        afterTextEl.classList.remove("hide");
        updateCountdown();
        setInterval(updateCountdown, 1000);
    } else {
        afterTextEl.classList.add("hide");
        beforeTextEl.classList.remove("hide");
    }
};

const sayHappyBirthday = () => {
    
    document.querySelector(".background").style.display = "none";

    const birthdayContainer = document.createElement("div");
    birthdayContainer.id = "birthdayContainer";
    document.body.appendChild(birthdayContainer);

    const countdownElement = document.createElement("h1");
    countdownElement.id = "countdownElement";
    birthdayContainer.appendChild(countdownElement);

    let countdown = 5;
    const countdownInterval = setInterval(() => {
        countdownElement.textContent = countdown;
        countdownElement.style.fontFamily = "Arial, Helvetica, sans-serif";
        countdownElement.style.fontSize = "5.5rem";
        countdownElement.style.fontWeight = "bold";
        countdownElement.style.textAlign = "center";
        countdownElement.style.marginTop = "15rem";
        countdown--;

        if (countdown < 0) {
            countdownElement.style.display = "none";

            const happyBirthdayMessage = document.createElement("h1");
            happyBirthdayMessage.innerText = "Happy Birthday, pikachu";
            happyBirthdayMessage.style.textAlign = "center";
            happyBirthdayMessage.style.marginTop = "20rem";
            happyBirthdayMessage.style.fontSize = "3rem";
            happyBirthdayMessage.classList.add("happy-birthday-animation");
            birthdayContainer.appendChild(happyBirthdayMessage);

            clearInterval(countdownInterval);
        }
    }, 1000);
};

settingCogEl.addEventListener("click", toggleDob);
dobButtonEl.addEventListener("click", setDOBHandler);
happyBirthdayButtonEl.addEventListener("click", sayHappyBirthday);
