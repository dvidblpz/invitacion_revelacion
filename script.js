/* =========================================================
   XV AÑOS ISABELLA VALENTINA
   SCRIPT COMPLETO
========================================================= */


/* =========================================================
   DOM
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           ELEMENTOS
        ================================================= */

        const preloader =
            document.getElementById("preloader");

        const cover =
            document.getElementById("cover");

        const openInvitation =
            document.getElementById("openInvitation");

        const envelope =
            document.querySelector(".envelope");

        const music =
            document.getElementById("backgroundMusic");

        const musicToggle =
            document.getElementById("musicToggle");

        const musicIcon =
            document.getElementById("musicIcon");

        const mainNav =
            document.getElementById("mainNav");

        const menuButton =
            document.getElementById("menuButton");

        const navLinks =
            document.querySelector(".nav-links");

        const backToTop =
            document.getElementById("backToTop");

        const scrollProgress =
            document.getElementById("scrollProgress");


        /* =================================================
           PRELOADER
        ================================================= */

        window.addEventListener(
            "load",
            () => {

                setTimeout(
                    () => {

                        if (preloader) {

                            preloader.classList.add(
                                "hidden"
                            );

                        }

                    },
                    700
                );

            }
        );


        /* =================================================
           SOBRE
        ================================================= */

        let invitationOpened =
            false;


        function openInvitationFunction() {


            if (invitationOpened) {

                return;

            }


            invitationOpened =
                true;


            console.log(
                "✨ Invitación abierta."
            );


            /* -------------------------
               ABRIR SOBRE
            ------------------------- */

            if (envelope) {

                envelope.classList.add(
                    "is-open"
                );

            }


            /* -------------------------
               MÚSICA
            ------------------------- */

            if (music) {

                music.volume =
                    0.35;


                const playPromise =
                    music.play();


                if (
                    playPromise !== undefined
                ) {

                    playPromise
                        .then(
                            () => {

                                if (
                                    musicToggle
                                ) {

                                    musicToggle.classList.add(
                                        "playing"
                                    );

                                }

                            }
                        )
                        .catch(
                            () => {

                                console.log(
                                    "La música requiere activación manual."
                                );

                            }
                        );

                }

            }


            /* -------------------------
               CERRAR PORTADA
            ------------------------- */

            setTimeout(
                () => {


                    if (cover) {

                        cover.classList.add(
                            "cover-hidden"
                        );

                    }


                    document.body.classList.remove(
                        "lock-scroll"
                    );


                    if (mainNav) {

                        mainNav.classList.add(
                            "visible"
                        );

                    }


                    window.scrollTo(
                        {
                            top: 0,
                            behavior: "auto"
                        }
                    );


                },
                1100
            );

        }


        /* =================================================
           CLICK SOBRE
        ================================================= */

        if (openInvitation) {


            openInvitation.addEventListener(
                "click",
                openInvitationFunction
            );


            /* -------------------------
               TOUCH
            ------------------------- */

            openInvitation.addEventListener(
                "touchend",
                event => {

                    event.preventDefault();

                    openInvitationFunction();

                },
                {
                    passive: false
                }
            );

        }


        /* =================================================
           MÚSICA
        ================================================= */

        let musicPlaying =
            false;


        if (music) {


            music.addEventListener(
                "play",
                () => {

                    musicPlaying =
                        true;


                    if (musicToggle) {

                        musicToggle.classList.add(
                            "playing"
                        );

                    }


                    if (musicIcon) {

                        musicIcon.textContent =
                            "♫";

                    }

                }
            );


            music.addEventListener(
                "pause",
                () => {

                    musicPlaying =
                        false;


                    if (musicToggle) {

                        musicToggle.classList.remove(
                            "playing"
                        );

                    }


                    if (musicIcon) {

                        musicIcon.textContent =
                            "♪";

                    }

                }
            );

        }


        if (musicToggle) {


            musicToggle.addEventListener(
                "click",
                () => {


                    if (!music) {

                        return;

                    }


                    if (musicPlaying) {

                        music.pause();

                    } else {

                        music.volume =
                            0.35;


                        music.play()
                            .catch(
                                () => {

                                    alert(
                                        "No se pudo reproducir la música. Verifica que exista audio/musica.mp3."
                                    );

                                }
                            );

                    }

                }
            );

        }


        /* =================================================
           CUENTA REGRESIVA
        ================================================= */

        const eventDate =
            new Date(
                "2026-11-14T17:00:00-06:00"
            ).getTime();


        function updateCountdown() {


            const now =
                new Date().getTime();


            const distance =
                eventDate - now;


            const days =
                document.getElementById(
                    "days"
                );

            const hours =
                document.getElementById(
                    "hours"
                );

            const minutes =
                document.getElementById(
                    "minutes"
                );

            const seconds =
                document.getElementById(
                    "seconds"
                );


            if (distance <= 0) {


                if (days) {

                    days.textContent =
                        "00";

                }


                if (hours) {

                    hours.textContent =
                        "00";

                }


                if (minutes) {

                    minutes.textContent =
                        "00";

                }


                if (seconds) {

                    seconds.textContent =
                        "00";

                }


                return;

            }


            const daysValue =
                Math.floor(
                    distance /
                    (1000 * 60 * 60 * 24)
                );


            const hoursValue =
                Math.floor(
                    (
                        distance %
                        (1000 * 60 * 60 * 24)
                    ) /
                    (1000 * 60 * 60)
                );


            const minutesValue =
                Math.floor(
                    (
                        distance %
                        (1000 * 60 * 60)
                    ) /
                    (1000 * 60)
                );


            const secondsValue =
                Math.floor(
                    (
                        distance %
                        (1000 * 60)
                    ) /
                    1000
                );


            if (days) {

                days.textContent =
                    String(daysValue)
                        .padStart(2, "0");

            }


            if (hours) {

                hours.textContent =
                    String(hoursValue)
                        .padStart(2, "0");

            }


            if (minutes) {

                minutes.textContent =
                    String(minutesValue)
                        .padStart(2, "0");

            }


            if (seconds) {

                seconds.textContent =
                    String(secondsValue)
                        .padStart(2, "0");

            }

        }


        updateCountdown();


        setInterval(
            updateCountdown,
            1000
        );


        /* =================================================
           MENÚ
        ================================================= */

        if (
            menuButton &&
            navLinks
        ) {


            menuButton.addEventListener(
                "click",
                () => {

                    navLinks.classList.toggle(
                        "open"
                    );

                }
            );


            navLinks
                .querySelectorAll("a")
                .forEach(
                    link => {

                        link.addEventListener(
                            "click",
                            () => {

                                navLinks.classList.remove(
                                    "open"
                                );

                            }
                        );

                    }
                );

        }


        /* =================================================
           SCROLL
        ================================================= */

        function handleScroll() {


            const scrollTop =
                window.scrollY;


            const documentHeight =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;


            /* -------------------------
               NAVEGACIÓN
            ------------------------- */

            if (
                invitationOpened &&
                scrollTop > 150
            ) {

                if (mainNav) {

                    mainNav.classList.add(
                        "visible"
                    );

                }

            }


            /* -------------------------
               VOLVER ARRIBA
            ------------------------- */

            if (backToTop) {


                if (
                    scrollTop > 500
                ) {

                    backToTop.classList.add(
                        "visible"
                    );

                } else {

                    backToTop.classList.remove(
                        "visible"
                    );

                }

            }


            /* -------------------------
               PROGRESO
            ------------------------- */

            if (scrollProgress) {


                const percentage =
                    documentHeight > 0
                        ? (
                            scrollTop /
                            documentHeight
                        ) * 100
                        : 0;


                scrollProgress.style.width =
                    percentage + "%";

            }

        }


        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true
            }
        );


        /* =================================================
           VOLVER ARRIBA
        ================================================= */

        if (backToTop) {


            backToTop.addEventListener(
                "click",
                () => {

                    window.scrollTo(
                        {
                            top: 0,
                            behavior: "smooth"
                        }
                    );

                }
            );

        }


        /* =================================================
           REVEAL
        ================================================= */

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        const revealObserver =
            new IntersectionObserver(
                (
                    entries,
                    observer
                ) => {


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
                    threshold: .15
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );


        /* =================================================
           GALERÍA
        ================================================= */

        const galleryItems =
            document.querySelectorAll(
                ".gallery-item"
            );


        const lightbox =
            document.getElementById(
                "lightbox"
            );

        const lightboxImage =
            document.getElementById(
                "lightboxImage"
            );

        const closeLightbox =
            document.getElementById(
                "closeLightbox"
            );


        galleryItems.forEach(
            item => {


                item.addEventListener(
                    "click",
                    () => {


                        const image =
                            item.dataset.image;


                        if (!image) {

                            return;

                        }


                        if (
                            lightboxImage
                        ) {

                            lightboxImage.src =
                                image;

                        }


                        if (lightbox) {

                            lightbox.classList.add(
                                "active"
                            );

                            lightbox.setAttribute(
                                "aria-hidden",
                                "false"
                            );

                        }

                    }
                );

            }
        );


        function closeGallery() {


            if (lightbox) {

                lightbox.classList.remove(
                    "active"
                );

                lightbox.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }


            if (
                lightboxImage
            ) {

                setTimeout(
                    () => {

                        lightboxImage.src =
                            "";

                    },
                    300
                );

            }

        }


        if (closeLightbox) {

            closeLightbox.addEventListener(
                "click",
                closeGallery
            );

        }


        if (lightbox) {

            lightbox.addEventListener(
                "click",
                event => {


                    if (
                        event.target ===
                        lightbox
                    ) {

                        closeGallery();

                    }

                }
            );

        }


        /* =================================================
           ESC
        ================================================= */

        document.addEventListener(
            "keydown",
            event => {


                if (
                    event.key ===
                    "Escape"
                ) {

                    closeGallery();

                }

            }
        );


        /* =================================================
           JUEGO
        ================================================= */

        const gameScore =
            document.getElementById(
                "gameScore"
            );

        const gameMessage =
            document.getElementById(
                "gameMessage"
            );

        const gameWin =
            document.getElementById(
                "gameWin"
            );

        const resetGame =
            document.getElementById(
                "resetGame"
            );

        const magicStars =
            document.querySelectorAll(
                ".magic-star"
            );


        let foundStars = 0;


        /* -------------------------
           SCORE
        ------------------------- */

        function updateGameScore() {


            if (gameScore) {

                gameScore.textContent =
                    `${foundStars} / 3`;

            }

        }


        /* -------------------------
           ESTRELLAS
        ------------------------- */

        magicStars.forEach(
            star => {


                star.addEventListener(
                    "click",
                    () => {


                        if (
                            star.classList.contains(
                                "found"
                            )
                        ) {

                            return;

                        }


                        star.classList.add(
                            "found"
                        );


                        foundStars++;


                        updateGameScore();


                        /* -----------------
                           1 ESTRELLA
                        ----------------- */

                        if (
                            foundStars === 1
                        ) {


                            if (
                                gameMessage
                            ) {

                                gameMessage.innerHTML = `

                                    <span class="game-message-icon">
                                        ✨
                                    </span>

                                    <p>
                                        ¡Encontraste la primera estrella!
                                        Aún quedan dos...
                                    </p>

                                `;

                            }

                        }


                        /* -----------------
                           2 ESTRELLAS
                        ----------------- */

                        if (
                            foundStars === 2
                        ) {


                            if (
                                gameMessage
                            ) {

                                gameMessage.innerHTML = `

                                    <span class="game-message-icon">
                                        ✨
                                    </span>

                                    <p>
                                        ¡Excelente!
                                        Solo queda una estrella mágica.
                                    </p>

                                `;

                            }

                        }


                        /* -----------------
                           VICTORIA
                        ----------------- */

                        if (
                            foundStars === 3
                        ) {


                            setTimeout(
                                () => {


                                    if (
                                        gameMessage
                                    ) {

                                        gameMessage.style.display =
                                            "none";

                                    }


                                    if (
                                        gameWin
                                    ) {

                                        gameWin.classList.add(
                                            "active"
                                        );

                                    }


                                    try {

                                        localStorage.setItem(
                                            "isabellaGameCompleted",
                                            "true"
                                        );

                                    } catch (
                                        error
                                    ) {

                                        console.log(
                                            "No se pudo guardar el progreso."
                                        );

                                    }

                                },
                                500
                            );

                        }

                    }
                );

            }
        );


        /* =================================================
           REINICIAR
        ================================================= */

        if (resetGame) {


            resetGame.addEventListener(
                "click",
                () => {


                    foundStars =
                        0;


                    magicStars.forEach(
                        star => {

                            star.classList.remove(
                                "found"
                            );

                        }
                    );


                    updateGameScore();


                    if (gameWin) {

                        gameWin.classList.remove(
                            "active"
                        );

                    }


                    if (gameMessage) {


                        gameMessage.style.display =
                            "block";


                        gameMessage.innerHTML = `

                            <span class="game-message-icon">
                                ✨
                            </span>

                            <p>
                                Encuentra las tres estrellas
                                para completar la misión.
                            </p>

                        `;

                    }


                    try {

                        localStorage.removeItem(
                            "isabellaGameCompleted"
                        );

                    } catch (
                        error
                    ) {

                        console.log(
                            "No se pudo borrar el progreso."
                        );

                    }

                }
            );

        }


        /* =================================================
           RECUPERAR PROGRESO
        ================================================= */

        try {


            const completed =
                localStorage.getItem(
                    "isabellaGameCompleted"
                );


            if (
                completed ===
                "true"
            ) {


                foundStars =
                    3;


                updateGameScore();


                magicStars.forEach(
                    star => {

                        star.classList.add(
                            "found"
                        );

                    }
                );


                if (
                    gameMessage
                ) {

                    gameMessage.style.display =
                        "none";

                }


                if (
                    gameWin
                ) {

                    gameWin.classList.add(
                        "active"
                    );

                }

            }

        } catch (
            error
        ) {

            console.log(
                "No se pudo recuperar el progreso."
            );

        }


        /* =================================================
           PROTECCIÓN CONTRA COPIA
        ================================================= */

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
            "copy",
            event => {

                event.preventDefault();

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


        /* =================================================
           ATAJOS
        ================================================= */

        document.addEventListener(
            "keydown",
            event => {


                const key =
                    event.key.toLowerCase();


                const modifier =
                    event.ctrlKey ||
                    event.metaKey;


                if (!modifier) {

                    return;

                }


                const blockedKeys = [
                    "c",
                    "x",
                    "v",
                    "a",
                    "s",
                    "u",
                    "p"
                ];


                if (
                    blockedKeys.includes(
                        key
                    )
                ) {

                    event.preventDefault();

                }

            }
        );


        /* =================================================
           IMÁGENES
        ================================================= */

        document
            .querySelectorAll("img")
            .forEach(
                image => {


                    image.setAttribute(
                        "draggable",
                        "false"
                    );


                    image.addEventListener(
                        "dragstart",
                        event => {

                            event.preventDefault();

                        }
                    );


                    image.addEventListener(
                        "contextmenu",
                        event => {

                            event.preventDefault();

                        }
                    );

                }
            );


        /* =================================================
           MENSAJE FINAL
        ================================================= */

        console.log(
            "✨ Invitación de Isabella Valentina cargada correctamente."
        );


    }
);