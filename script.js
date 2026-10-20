const questionPage = document.getElementById("questionPage");
const surprisePage = document.getElementById("surprisePage");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const buttonArea = document.getElementById("buttonArea");
const hint = document.getElementById("hint");

const heartsContainer = document.getElementById("hearts");

const heartButton = document.getElementById("heartButton");
const finalExtra = document.getElementById("finalExtra");

let accepted = false;
let noAttempts = 0;


// Messages kapag sinusubukang pindutin ang NO.

const noMessages = [
    "Hoyyy, bakit NO? 😭",
    "Bby naman ohhh 🥺",
    "Are you sure, love? 💗",
    "Hala, ang bilis mo naman HAHAHA 😭",
    "Isa pang chance, bby? 🥹",
    "Hindi ka pa rin ba bati? 🥺💕",
    "Sige naaaa, please? 💗"
];


// Iwas NO button.

function moveNoButton() {
    if (accepted) {
        return;
    }

    noAttempts++;

    const messageIndex = Math.min(
        noAttempts - 1,
        noMessages.length - 1
    );

    hint.textContent = noMessages[messageIndex];

    const area = buttonArea.getBoundingClientRect();
    const button = noButton.getBoundingClientRect();

    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    // Panatilihin ang NO sa kanang side para
    // hindi nito matakpan ang YES button.

    const minX = area.width * 0.55;

    const maxX = Math.max(
        minX,
        area.width - buttonWidth
    );

    const maxY = Math.max(
        0,
        buttonArea.clientHeight - buttonHeight
    );

    const randomX =
        minX + Math.random() * (maxX - minX);

    const randomY =
        Math.random() * maxY;

    noButton.style.position = "absolute";
    noButton.style.left = randomX + "px";
    noButton.style.right = "auto";
    noButton.style.top = randomY + "px";
}


// Kapag nilapitan ng mouse ang NO,
// lilipat ito sa ibang position.

noButton.addEventListener("pointerenter", function (event) {
    if (event.pointerType === "mouse") {
        moveNoButton();
    }
});


// Para sa touchscreens, lilipat ang NO kapag tinap.

noButton.addEventListener("click", function () {
    moveNoButton();
});


// YES button: bubuksan ang surprise page.

yesButton.addEventListener("click", function () {
    if (accepted) {
        return;
    }

    accepted = true;

    questionPage.classList.add("hidden");
    surprisePage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    hint.textContent = "YAYYYYY! 💗";

    createHeartBurst(35);
});


// Floating hearts sa background.

function createFloatingHeart() {
    const heart = document.createElement("span");

    heart.classList.add("floating-heart");

    const heartSymbols = ["♡", "♥", "💕", "💗"];

    heart.textContent =
        heartSymbols[
            Math.floor(Math.random() * heartSymbols.length)
        ];

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize =
        (12 + Math.random() * 18) + "px";

    const duration = 6 + Math.random() * 6;

    heart.style.animationDuration = duration + "s";

    heartsContainer.appendChild(heart);

    setTimeout(function () {
        heart.remove();
    }, duration * 1000);
}


// Gumawa ng hearts sa paligid ng screen.

function createHeartBurst(amount) {
    for (let i = 0; i < amount; i++) {
        setTimeout(function () {
            createFloatingHeart();
        }, i * 100);
    }
}


// Regular na floating hearts.

setInterval(function () {
    if (document.hidden) {
        return;
    }

    createFloatingHeart();
}, 650);


// Final button: extra sweet message.

heartButton.addEventListener("click", function () {
    finalExtra.classList.remove("hidden");

    heartButton.textContent = "A little more love for you 💗";

    createHeartBurst(18);

    heartButton.disabled = true;

    heartButton.style.opacity = "0.8";
});