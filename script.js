/* ============================================================
   CONFIGURACIÓN PRINCIPAL
============================================================ */

const CONFIG = {

    /* --------------------------------------------------------
       FECHA DEL EVENTO
    -------------------------------------------------------- */

    eventDate: "2026-11-21T19:00:00-06:00",


    /* --------------------------------------------------------
       RESULTADO REAL DE LA REVELACIÓN

       Cambia solamente este valor:

       "niño"
       o
       "niña"
    -------------------------------------------------------- */

    revelation: "niña",


    /* --------------------------------------------------------
       DATOS DEL EVENTO
    -------------------------------------------------------- */

    address:
        "Av. de los Sueños #125, Monterrey, Nuevo León",

    whatsapp:
        "528445550198",

    whatsappMessage:
        "Hola, quiero confirmar mi asistencia a la revelación de bebé. ¡Muchas gracias!",


    /* --------------------------------------------------------
       JUEGO
    -------------------------------------------------------- */

    gameTarget: 5,

    gameTime: 20,

    totalBalloons: 10
};


/* ============================================================
   DOM READY
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();

    initWelcome();

    initNavigation();

    initHeader();

    initCountdown();

    initVoting();

    initGame();

    initLocations();

    initGallery();

    initMusic();

    initReveal();

    initWhatsApp();

    initBackToTop();

    initRevealAnimations();

    initCopyProtection();

    setCurrentYear();

});


/* ============================================================
   PRELOADER
============================================================ */

function initPreloader() {

    const preloader =
        document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("hidden");

        }, 500);

    });

}


/* ============================================================
   SOBRE DE BIENVENIDA
============================================================ */

function initWelcome() {

    const overlay =
        document.getElementById("welcomeOverlay");

    const button =
        document.getElementById("openInvitation");

    const envelope =
        document.getElementById("envelope");

    if (!overlay || !button || !envelope) {
        return;
    }

    document.body.classList.add("no-scroll");


    let opened = false;


    function openInvitation() {

        if (opened) {
            return;
        }

        opened = true;

        envelope.classList.add("open");

        setTimeout(() => {

            overlay.classList.add("open");

            document.body.classList.remove("no-scroll");

            tryStartMusic();

        }, 700);

    }


    button.addEventListener(
        "click",
        openInvitation
    );


    envelope.addEventListener(
        "click",
        openInvitation
    );


    envelope.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openInvitation();

            }

        }
    );

}


/* ============================================================
   NAVEGACIÓN
============================================================ */

function initNavigation() {

    const menuToggle =
        document.getElementById("menuToggle");

    const nav =
        document.getElementById("mainNav");

    if (!menuToggle || !nav) {
        return;
    }

    menuToggle.addEventListener(
        "click",
        () => {

            nav.classList.toggle("open");

        }
    );


    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove("open");

            }
        );

    });

}


/* ============================================================
   HEADER
============================================================ */

function initHeader() {

    const header =
        document.getElementById("mainHeader");

    const backToTop =
        document.getElementById("backToTop");


    function updateHeader() {

        const scroll =
            window.scrollY;

        if (scroll > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }


        if (scroll > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();

}


/* ============================================================
   COUNTDOWN
============================================================ */

function initCountdown() {

    const days =
        document.getElementById("countDays");

    const hours =
        document.getElementById("countHours");

    const minutes =
        document.getElementById("countMinutes");

    const seconds =
        document.getElementById("countSeconds");


    function updateCountdown() {

        const target =
            new Date(CONFIG.eventDate).getTime();

        const now =
            Date.now();

        const difference =
            target - now;


        if (difference <= 0) {

            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";

            return;

        }


        const totalSeconds =
            Math.floor(
                difference / 1000
            );


        const d =
            Math.floor(
                totalSeconds / 86400
            );

        const h =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );

        const m =
            Math.floor(
                (totalSeconds % 3600) / 60
            );

        const s =
            totalSeconds % 60;


        days.textContent =
            String(d).padStart(2, "0");

        hours.textContent =
            String(h).padStart(2, "0");

        minutes.textContent =
            String(m).padStart(2, "0");

        seconds.textContent =
            String(s).padStart(2, "0");

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );

}


/* ============================================================
   VOTACIÓN
============================================================ */

/*
   IMPORTANTE:

   Estas cifras NO representan personas reales.

   Se utilizan como "predicciones simuladas" para crear
   una experiencia visual dinámica.

   Para tener votos reales necesitaríamos un backend,
   Firebase, Supabase, PHP/MySQL, etc.
*/

function initVoting() {

    const boyVotes =
        document.getElementById("boyVotes");

    const girlVotes =
        document.getElementById("girlVotes");

    const boyProgress =
        document.getElementById("boyProgress");

    const girlProgress =
        document.getElementById("girlProgress");

    const boyPercentage =
        document.getElementById("boyPercentage");

    const girlPercentage =
        document.getElementById("girlPercentage");

    const message =
        document.getElementById("voteMessage");


    if (
        !boyVotes ||
        !girlVotes
    ) {
        return;
    }


    /*
       Generamos una cantidad inicial.

       El objetivo es que parezca una sección viva,
       pero siempre se muestra que son predicciones.
    */

    let simulatedBoy =
        randomNumber(38, 65);

    let simulatedGirl =
        randomNumber(42, 72);


    let userVote =
        localStorage.getItem(
            "babyPrediction"
        );


    function renderVotes() {

        const total =
            simulatedBoy +
            simulatedGirl;


        const boyPercent =
            Math.round(
                simulatedBoy / total * 100
            );


        const girlPercent =
            100 - boyPercent;


        boyVotes.textContent =
            simulatedBoy;

        girlVotes.textContent =
            simulatedGirl;


        boyPercentage.textContent =
            `${boyPercent}%`;

        girlPercentage.textContent =
            `${girlPercent}%`;


        boyProgress.style.width =
            `${boyPercent}%`;

        girlProgress.style.width =
            `${girlPercent}%`;

    }


    renderVotes();


    /*
       Actualizamos las predicciones cada cierto tiempo.

       No aumentamos constantemente demasiado rápido
       para que la animación se sienta natural.
    */

    function scheduleSimulation() {

        const delay =
            randomNumber(
                7000,
                13000
            );


        setTimeout(() => {

            /*
               De vez en cuando aumenta Niño.
            */

            if (Math.random() > .45) {

                simulatedBoy +=
                    randomNumber(1, 3);

            }


            /*
               De vez en cuando aumenta Niña.
            */

            if (Math.random() > .45) {

                simulatedGirl +=
                    randomNumber(1, 3);

            }


            renderVotes();

            scheduleSimulation();

        }, delay);

    }


    scheduleSimulation();


    /*
       BOTONES
    */

    document
        .querySelectorAll(".vote-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const team =
                        button.dataset.team;


                    /*
                       Si ya votó.
                    */

                    if (userVote) {

                        showToast(
                            `Ya registraste tu predicción: ${capitalize(userVote)}.`
                        );

                        return;

                    }


                    userVote =
                        team;


                    localStorage.setItem(
                        "babyPrediction",
                        team
                    );


                    /*
                       Se suma solamente la predicción
                       del usuario.

                       Se mantiene diferenciada de la
                       simulación visual.
                    */

                    if (team === "niño") {

                        simulatedBoy += 1;

                    } else {

                        simulatedGirl += 1;

                    }


                    renderVotes();


                    document
                        .querySelectorAll(".vote-button")
                        .forEach(btn => {

                            btn.disabled = true;

                        });


                    message.innerHTML =
                        `
                        <i class="fa-solid fa-heart"></i>
                        Tu predicción quedó registrada:
                        <strong>${capitalize(team)}</strong>.
                        `;


                    showToast(
                        `Tu predicción fue: ${capitalize(team)} 💗`
                    );

                }
            );

        });


    /*
       Si ya había votado anteriormente.
    */

    if (userVote) {

        document
            .querySelectorAll(".vote-button")
            .forEach(button => {

                button.disabled = true;

            });


        message.innerHTML =
            `
            <i class="fa-solid fa-check"></i>
            Ya registraste tu predicción:
            <strong>${capitalize(userVote)}</strong>.
            `;

    }

}


/* ============================================================
   JUEGO DE GLOBOS
============================================================ */

function initGame() {

    const field =
        document.getElementById("balloonField");

    const startButton =
        document.getElementById("startGame");

    const restartButton =
        document.getElementById("restartGame");

    const playAgainButton =
        document.getElementById("playAgain");

    const startMessage =
        document.getElementById("gameStartMessage");

    const result =
        document.getElementById("gameResult");

    const scoreElement =
        document.getElementById("gameScore");

    const targetElement =
        document.getElementById("gameTarget");

    const timerElement =
        document.getElementById("gameTimer");

    const pointsElement =
        document.getElementById("gamePoints");

    const comboElement =
        document.getElementById("gameCombo");

    const progressElement =
        document.getElementById("gameProgress");

    const resultIcon =
        document.getElementById("gameResultIcon");

    const resultTitle =
        document.getElementById("gameResultTitle");

    const resultText =
        document.getElementById("gameResultText");

    const finalPoints =
        document.getElementById("finalGamePoints");


    if (!field) {
        return;
    }


    const TARGET =
        CONFIG.gameTarget;

    const GAME_TIME =
        CONFIG.gameTime;

    const TOTAL_BALLOONS =
        CONFIG.totalBalloons;


    targetElement.textContent =
        TARGET;


    let score = 0;
    let points = 0;
    let combo = 1;
    let timeLeft = GAME_TIME;

    let gameRunning = false;

    let timer = null;

    let lastHitTime = 0;


    function resetGame() {

        clearInterval(timer);

        gameRunning = false;

        score = 0;

        points = 0;

        combo = 1;

        timeLeft = GAME_TIME;

        lastHitTime = 0;


        scoreElement.textContent =
            "0";

        pointsElement.textContent =
            "0";

        comboElement.textContent =
            "x1";

        timerElement.textContent =
            GAME_TIME;

        progressElement.style.width =
            "0%";


        result.classList.remove("show");

        startMessage.style.display =
            "flex";


        field
            .querySelectorAll(".balloon")
            .forEach(balloon => {

                balloon.remove();

            });


        field
            .querySelectorAll(".particle")
            .forEach(particle => {

                particle.remove();

            });

    }


    function startGame() {

        resetGame();

        startMessage.style.display =
            "none";

        gameRunning = true;

        createBalloons();


        timer = setInterval(
            () => {

                timeLeft--;

                timerElement.textContent =
                    timeLeft;


                const progress =
                    ((GAME_TIME - timeLeft) /
                        GAME_TIME) *
                    100;


                progressElement.style.width =
                    `${progress}%`;


                if (timeLeft <= 0) {

                    finishGame(false);

                }

            },
            1000
        );

    }


    function createBalloons() {

        const positions =
            generateBalloonPositions(
                TOTAL_BALLOONS
            );


        for (
            let i = 0;
            i < TOTAL_BALLOONS;
            i++
        ) {

            const balloon =
                document.createElement("button");


            balloon.type = "button";

            balloon.className =
                "balloon";


            /*
               3 tipos principales
            */

            const type =
                Math.random();


            if (type < .38) {

                balloon.classList.add(
                    "balloon-blue"
                );

            } else if (type < .76) {

                balloon.classList.add(
                    "balloon-pink"
                );

            } else {

                balloon.classList.add(
                    "balloon-gold",
                    "balloon-special"
                );

            }


            /*
               Posición
            */

            balloon.style.left =
                `${positions[i].x}%`;

            balloon.style.top =
                `${positions[i].y}%`;


            balloon.style.animationDelay =
                `${Math.random() * 1.5}s`;


            balloon.style.setProperty(
                "--string-rotation",
                `${randomNumber(-8, 8)}deg`
            );


            balloon.setAttribute(
                "aria-label",
                "Globo"
            );


            balloon.addEventListener(
                "click",
                () => {

                    popBalloon(balloon);

                }
            );


            field.appendChild(
                balloon
            );

        }

    }


    function popBalloon(balloon) {

        if (!gameRunning) {
            return;
        }


        if (
            balloon.classList.contains(
                "popped"
            )
        ) {
            return;
        }


        const now =
            Date.now();


        /*
           Si explotas varios globos
           rápidamente aumenta el combo.
        */

        if (
            now - lastHitTime <
            1800
        ) {

            combo++;

        } else {

            combo = 1;

        }


        lastHitTime = now;


        let earnedPoints = 10;


        if (
            balloon.classList.contains(
                "balloon-special"
            )
        ) {

            earnedPoints = 30;

            showToast(
                "¡Globo dorado! +30 puntos ✨"
            );

        }


        earnedPoints *= combo;


        points += earnedPoints;

        score++;


        scoreElement.textContent =
            score;

        pointsElement.textContent =
            points;

        comboElement.textContent =
            `x${combo}`;


        balloon.classList.add(
            "popped"
        );


        createParticles(
            balloon
        );


        if (score >= TARGET) {

            finishGame(true);

        }

    }


    function finishGame(won) {

        if (!gameRunning) {
            return;
        }


        gameRunning = false;

        clearInterval(timer);


        setTimeout(() => {

            result.classList.add(
                "show"
            );


            finalPoints.textContent =
                points;


            if (won) {

                resultIcon.textContent =
                    "👑";

                resultTitle.textContent =
                    "¡Lo lograste!";

                resultText.textContent =
                    "Encontraste todos los globos mágicos. ¡Eres oficialmente parte de la misión secreta!";

            } else {

                resultIcon.textContent =
                    "🎈";

                resultTitle.textContent =
                    "¡Casi lo logras!";

                resultText.textContent =
                    `Encontraste ${score} de ${TARGET} globos. ¡Inténtalo nuevamente!`;

            }

        }, 400);

    }


    function createParticles(balloon) {

        const rect =
            balloon.getBoundingClientRect();

        const fieldRect =
            field.getBoundingClientRect();


        const centerX =
            rect.left -
            fieldRect.left +
            rect.width / 2;

        const centerY =
            rect.top -
            fieldRect.top +
            rect.height / 2;


        for (
            let i = 0;
            i < 12;
            i++
        ) {

            const particle =
                document.createElement("span");


            particle.className =
                "particle";


            particle.style.left =
                `${centerX}px`;

            particle.style.top =
                `${centerY}px`;


            particle.style.background =
                randomParticleColor();


            particle.style.setProperty(
                "--x",
                `${randomNumber(-80, 80)}px`
            );

            particle.style.setProperty(
                "--y",
                `${randomNumber(-80, 80)}px`
            );


            field.appendChild(
                particle
            );


            setTimeout(() => {

                particle.remove();

            }, 800);

        }

    }


    function generateBalloonPositions(
        amount
    ) {

        const positions = [];


        const safeZones = [

            { x: 10, y: 15 },
            { x: 28, y: 25 },
            { x: 50, y: 12 },
            { x: 72, y: 22 },
            { x: 87, y: 15 },

            { x: 15, y: 55 },
            { x: 38, y: 48 },
            { x: 60, y: 55 },
            { x: 82, y: 50 },

            { x: 25, y: 75 },
            { x: 55, y: 76 },
            { x: 78, y: 75 }

        ];


        const shuffled =
            [...safeZones]
                .sort(
                    () =>
                        Math.random() - .5
                );


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            positions.push(
                shuffled[i]
            );

        }


        return positions;

    }


    function randomParticleColor() {

        const colors = [

            "#e7a7b9",
            "#8db9d9",
            "#c9a45b",
            "#ffffff"

        ];


        return colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];

    }


    startButton.addEventListener(
        "click",
        startGame
    );


    restartButton.addEventListener(
        "click",
        startGame
    );


    playAgainButton.addEventListener(
        "click",
        startGame
    );


    resetGame();

}


/* ============================================================
   MAPAS
============================================================ */

function initLocations() {

    const encodedAddress =
        encodeURIComponent(
            CONFIG.address
        );


    const googleMaps =
        `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;


    const waze =
        `https://www.waze.com/ul?q=${encodedAddress}&navigate=yes`;


    const elements = {

        mapsCeremony:
            document.getElementById(
                "mapsCeremony"
            ),

        wazeCeremony:
            document.getElementById(
                "wazeCeremony"
            ),

        mapsReception:
            document.getElementById(
                "mapsReception"
            ),

        wazeReception:
            document.getElementById(
                "wazeReception"
            )

    };


    Object.values(elements)
        .forEach(element => {

            if (!element) {
                return;
            }

        });


    if (elements.mapsCeremony) {

        elements.mapsCeremony.href =
            googleMaps;

    }


    if (elements.wazeCeremony) {

        elements.wazeCeremony.href =
            waze;

    }


    if (elements.mapsReception) {

        elements.mapsReception.href =
            googleMaps;

    }


    if (elements.wazeReception) {

        elements.wazeReception.href =
            waze;

    }

}


/* ============================================================
   GALERÍA
============================================================ */

function initGallery() {

    const modal =
        document.getElementById(
            "galleryModal"
        );

    const modalImage =
        document.getElementById(
            "galleryModalImage"
        );

    const close =
        document.getElementById(
            "galleryClose"
        );


    document
        .querySelectorAll(".gallery-item")
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    const image =
                        item.dataset.image;


                    modalImage.src =
                        image;


                    modal.classList.add(
                        "open"
                    );


                    modal.setAttribute(
                        "aria-hidden",
                        "false"
                    );


                    document.body.classList.add(
                        "no-scroll"
                    );

                }
            );

        });


    function closeGallery() {

        modal.classList.remove(
            "open"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "no-scroll"
        );


        setTimeout(() => {

            modalImage.src = "";

        }, 300);

    }


    close.addEventListener(
        "click",
        closeGallery
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeGallery();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeGallery();

            }

        }
    );

}


/* ============================================================
   MÚSICA
============================================================ */

let musicInitialized = false;


function initMusic() {

    const music =
        document.getElementById(
            "backgroundMusic"
        );

    const button =
        document.getElementById(
            "musicButton"
        );


    if (!music || !button) {
        return;
    }


    button.addEventListener(
        "click",
        async () => {

            if (
                music.paused
            ) {

                try {

                    await music.play();

                    button.classList.add(
                        "playing"
                    );

                    button.innerHTML =
                        '<i class="fa-solid fa-pause"></i>';

                    musicInitialized = true;

                } catch (error) {

                    showToast(
                        "No fue posible reproducir la música."
                    );

                }

            } else {

                music.pause();

                button.classList.remove(
                    "playing"
                );

                button.innerHTML =
                    '<i class="fa-solid fa-music"></i>';

            }

        }
    );


    music.addEventListener(
        "ended",
        () => {

            button.classList.remove(
                "playing"
            );

        }
    );

}


async function tryStartMusic() {

    const music =
        document.getElementById(
            "backgroundMusic"
        );

    const button =
        document.getElementById(
            "musicButton"
        );


    if (!music || !button) {
        return;
    }


    try {

        await music.play();

        button.classList.add(
            "playing"
        );

        button.innerHTML =
            '<i class="fa-solid fa-pause"></i>';

        musicInitialized = true;

    } catch (error) {

        /*
           Algunos navegadores pueden bloquear
           el autoplay.

           No hacemos nada porque el botón
           manual de música seguirá funcionando.
        */

    }

}


/* ============================================================
   REVELACIÓN FINAL
============================================================ */

function initReveal() {

    const box =
        document.getElementById(
            "revealBox"
        );

    const button =
        document.getElementById(
            "revealButton"
        );

    const result =
        document.getElementById(
            "revelationResult"
        );

    const title =
        document.getElementById(
            "revelationTitle"
        );

    const text =
        document.getElementById(
            "revelationText"
        );

    const icon =
        document.getElementById(
            "revelationIcon"
        );


    if (
        !box ||
        !button ||
        !result
    ) {
        return;
    }


    let revealed = false;


    function revealBaby() {

        if (revealed) {
            return;
        }


        revealed = true;


        box.classList.add(
            "open"
        );


        button.disabled = true;

        button.style.opacity =
            ".5";


        setTimeout(() => {

            result.classList.add(
                "show"
            );


            if (
                CONFIG.revelation === "niña"
            ) {

                result.classList.add(
                    "girl"
                );

                title.textContent =
                    "¡Es una niña!";

                text.textContent =
                    "Nuestro pequeño sueño viene acompañado de mucha ternura, amor y magia. 💗";

                icon.textContent =
                    "🎀";


                createConfetti(
                    "girl"
                );


            } else {

                result.classList.add(
                    "boy"
                );

                title.textContent =
                    "¡Es un niño!";

                text.textContent =
                    "Nuestro pequeño sueño viene acompañado de mucha alegría, amor y aventuras. 💙";

                icon.textContent =
                    "🧸";


                createConfetti(
                    "boy"
                );

            }

        }, 1000);

    }


    button.addEventListener(
        "click",
        revealBaby
    );


    box.addEventListener(
        "click",
        revealBaby
    );

}


/* ============================================================
   CONFETTI
============================================================ */

function createConfetti(type) {

    const container =
        document.querySelector(
            ".revelation-confetti"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const colors =
        type === "girl"

            ? [
                "#e7a7b9",
                "#f4c5d2",
                "#fff",
                "#c9a45b"
            ]

            : [
                "#8db9d9",
                "#c7e2f2",
                "#fff",
                "#c9a45b"
            ];


    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const piece =
            document.createElement(
                "span"
            );


        piece.style.position =
            "absolute";

        piece.style.left =
            `${Math.random() * 100}%`;

        piece.style.top =
            `${Math.random() * 30}%`;

        piece.style.width =
            `${randomNumber(5, 10)}px`;

        piece.style.height =
            `${randomNumber(7, 15)}px`;

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        piece.style.opacity =
            ".9";

        piece.style.transform =
            `rotate(${randomNumber(0, 360)}deg)`;


        piece.animate(

            [
                {
                    transform:
                        `translateY(0) rotate(0deg)`,
                    opacity: 1
                },

                {
                    transform:
                        `translateY(500px) rotate(720deg)`,
                    opacity: 0
                }

            ],

            {
                duration:
                    randomNumber(
                        1800,
                        3200
                    ),

                delay:
                    Math.random() * 500,

                easing:
                    "cubic-bezier(.2,.7,.2,1)",

                fill:
                    "forwards"
            }

        );


        container.appendChild(
            piece
        );

    }

}


/* ============================================================
   WHATSAPP
============================================================ */

function initWhatsApp() {

    const button =
        document.getElementById(
            "whatsappRSVP"
        );


    if (!button) {
        return;
    }


    const message =
        encodeURIComponent(
            CONFIG.whatsappMessage
        );


    button.href =
        `https://wa.me/${CONFIG.whatsapp}?text=${message}`;

}


/* ============================================================
   BACK TO TOP
============================================================ */

function initBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* ============================================================
   ANIMACIONES AL HACER SCROLL
============================================================ */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element =>
                element.classList.add(
                    "visible"
                )
        );

        return;

    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: .12
            }

        );


    elements.forEach(
        element =>
            observer.observe(
                element
            )
    );

}


/* ============================================================
   PROTECCIÓN CONTRA COPIA CASUAL
============================================================ */

function initCopyProtection() {

    /*
       Esta protección solamente dificulta
       la copia casual.

       NO existe una manera de impedir
       técnicamente que una persona con
       conocimientos pueda inspeccionar
       una página web.

       No bloqueamos F12 ni DevTools.
    */


    document.addEventListener(
        "contextmenu",
        event => {

            event.preventDefault();

        }
    );


    document.addEventListener(
        "selectstart",
        event => {

            event.preventDefault();

        }
    );


    document.addEventListener(
        "dragstart",
        event => {

            if (
                event.target.tagName === "IMG"
            ) {

                event.preventDefault();

            }

        }
    );


    document.addEventListener(
        "copy",
        event => {

            event.preventDefault();

            showToast(
                "El contenido de esta invitación está protegido."
            );

        }
    );


    document.addEventListener(
        "cut",
        event => {

            event.preventDefault();

        }
    );


    document.addEventListener(
        "paste",
        event => {

            event.preventDefault();

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            const key =
                event.key.toLowerCase();


            const blocked =
                (
                    event.ctrlKey ||
                    event.metaKey
                ) &&
                [
                    "c",
                    "x",
                    "v",
                    "a",
                    "s",
                    "u",
                    "p"
                ].includes(key);


            if (blocked) {

                event.preventDefault();

                showToast(
                    "Esta acción está deshabilitada."
                );

            }

        }
    );

}


/* ============================================================
   TOAST
============================================================ */

let toastTimer = null;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2800);

}


/* ============================================================
   AÑO ACTUAL
============================================================ */

function setCurrentYear() {

    const year =
        document.getElementById(
            "currentYear"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* ============================================================
   FUNCIONES AUXILIARES
============================================================ */

function randomNumber(
    min,
    max
) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


function capitalize(text) {

    if (!text) {
        return "";
    }


    return text.charAt(0).toUpperCase() +
        text.slice(1);

}