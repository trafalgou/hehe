// ✅ Select Elements
const rat = document.getElementById("rat");
const flower = document.getElementById("flower");
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const nextButton = document.getElementById("next-button");

let ratX = 175, ratY = 175;
const speed = 50;
const gameSize = 400;
let score = 5;

// ✅ Messages List
const messages = [
    "collect it baby girl",
    "you are so cool",
    "you are so funny",
    "i appreciate you a lot",
    "youre sexy?",
    "ok phew thought u might not finish it"
];

// ✅ Load Sound
const scurrySound = new Audio("rat.mp3");
scurrySound.volume = 1.0;
scurrySound.playbackRate = 2.5;

function playScurrySound() {
    let newSound = scurrySound.cloneNode(); 
    newSound.volume = 1.0;
    newSound.play().catch(e => console.error("Sound error:", e));
}


document.addEventListener("DOMContentLoaded", function () {
    let noButton = document.getElementById("no-button");
    let yesButton = document.getElementById("yes-button");
    let message = document.getElementById("valentine-message");
    let noClickCount = 0; // Track "No" clicks

    noButton.addEventListener("click", function () {
        noClickCount++;

        if (noClickCount < 5) {
            let newSize = Math.max(5, parseFloat(window.getComputedStyle(noButton).fontSize) * 0.7);
            noButton.style.fontSize = `${newSize}px`;
            noButton.style.padding = `${newSize / 2}px ${newSize}px`; 
        } else {
            // 💔 After 5 clicks → Show sad alert & hide buttons
            alert("🥺 Okay... I understand... 💔");
            noButton.style.display = "none"; // Hide No button
            yesButton.style.display = "none"; // Hide Yes button
        }
    });

    yesButton.addEventListener("click", function () {
        alert("YAYYYYY!!! 😍🎉"); // ✅ Show YAYYYY Alert
        let song = new Audio("https://trafalgou.github.io/hehe/yay.mp3");  
        song.loop = true; // 🎵 Loop the music
        song.volume = 0.8; // 🔊 Adjust volume (0.0 - 1.0)

        // ✅ Force Play After User Interaction
        song.play().then(() => {
            console.log("Music playing!");
        }).catch(error => {
            console.error("Music failed to play:", error);
            alert("Click the page again to play music!");
        });
        
        document.body.innerHTML = `<img src="HAPPY.jpeg" class="final-image">`;
    });
});


// ✅ Position Rat and Flower
rat.style.left = `${ratX}px`;
rat.style.top = `${ratY}px`;

function respawnFlower() {
    if (score > 0) {
        let flowerX = Math.floor(Math.random() * (gameSize - 50));
        let flowerY = Math.floor(Math.random() * (gameSize - 50));
        flower.style.left = `${flowerX}px`;
        flower.style.top = `${flowerY}px`;
    } else {
        flower.style.display = "none";
        nextButton.style.display = "block"; // Show Next Button
    }
}

// ✅ Move Rat Function
function moveRat(direction) {
    if (direction === "ArrowUp" && ratY > 0) ratY -= speed;
    if (direction === "ArrowDown" && ratY < gameSize - 50) ratY += speed;
    if (direction === "ArrowLeft" && ratX > 0) ratX -= speed;
    if (direction === "ArrowRight" && ratX < gameSize - 50) ratX += speed;

    rat.style.left = `${ratX}px`;
    rat.style.top = `${ratY}px`;

    // ✅ Add Animation
    rat.classList.add("scurry");
    setTimeout(() => rat.classList.remove("scurry"), 100);

    playScurrySound();
    checkCollision();
}

// ✅ Check Collision with Flower
function checkCollision() {
    let ratRect = rat.getBoundingClientRect();
    let flowerRect = flower.getBoundingClientRect();

    if (
        ratRect.left < flowerRect.right &&
        ratRect.right > flowerRect.left &&
        ratRect.top < flowerRect.bottom &&
        ratRect.bottom > flowerRect.top
    ) {
        score--;
        scoreDisplay.innerText = `Flowers Left: ${score}`;
        message.innerText = messages[5 - score]; // Update Message

        if (score === 0) {
            message.innerText = messages[5];
        }

        respawnFlower();
    }
}

// ✅ Key Events
document.addEventListener("keydown", (event) => {
    moveRat(event.key);
});

// ✅ Function to Redirect
function goToValentinePage() {
    window.location.href = "valentine.html";
}
let noClickCount = 0;

function sayYes() {
    document.body.innerHTML = `
        <div class="valentine-container">
            <h1>YAY!! ❤️🐭💘</h1>
            <p>You're the best, my Valentine! 🎉</p>
            <img class="final-image" src="HAPPY.jpeg" alt="HAPPY">
        </div>
    `;
}

function shrinkNo() {
    let noButton = document.getElementById("no-button");
    let yesButton = document.getElementById("yes-button");

    noClickCount++;

    // Keep shrinking "No" button until it disappears
    let newSize = 5 - noClickCount;  // Every click reduces the font size
    if (newSize <= 1) {
        noButton.style.display = "none"; // Hides button when too small
    } else {
        noButton.style.fontSize = newSize + "vw";
        noButton.style.padding = (newSize / 2) + "px " + (newSize * 2) + "px";
    }

    // Increase "Yes" button size
    yesButton.style.fontSize = (5 + noClickCount) + "vw";
    yesButton.style.padding = (10 + noClickCount * 2) + "px " + (20 + noClickCount * 4) + "px";
}

// ✅ Initial Flower Placement
respawnFlower();
