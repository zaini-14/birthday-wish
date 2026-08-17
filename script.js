/* =========================================================
   BABA BIRTHDAY WEBSITE
   COMPLETE JAVASCRIPT
   Works with the current HTML
========================================================= */

"use strict";


/* =========================================================
   1. HELPER
========================================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);


/* =========================================================
   2. OPENING SCREEN
========================================================= */

const home = $("#home");
const openSurpriseBtn = $("#openSurpriseBtn");

if (openSurpriseBtn) {

    openSurpriseBtn.addEventListener("click", () => {

        openSurpriseBtn.classList.add("clicked");

        setTimeout(() => {

            if (home) {
                home.classList.add("opened");
                home.classList.add("hidden");
            }

            document.body.classList.remove("no-scroll");

            const birthday = $("#birthday");

            if (birthday) {
                birthday.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        }, 400);

    });

}


/* =========================================================
   3. MOBILE NAVIGATION
========================================================= */

const mobileMenuBtn = $("#mobileMenuBtn");
const navMenu = $("#navMenu");

if (mobileMenuBtn && navMenu) {

    mobileMenuBtn.addEventListener("click", () => {

        const opened =
            navMenu.classList.toggle("open");

        mobileMenuBtn.classList.toggle(
            "active",
            opened
        );

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            String(opened)
        );

    });

}


/* =========================================================
   4. NAVIGATION LINKS
========================================================= */

const navLinks = $$(".nav-link");

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetID =
            link.getAttribute("href");

        if (
            !targetID ||
            !targetID.startsWith("#")
        ) {
            return;
        }

        const target =
            $(targetID);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        if (navMenu) {
            navMenu.classList.remove("open");
        }

        if (mobileMenuBtn) {

            mobileMenuBtn.classList.remove(
                "active"
            );

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});


/* =========================================================
   5. VIEW FULL PROFILE
========================================================= */

const profileBtn = $("#profileBtn");

if (profileBtn) {

    profileBtn.addEventListener("click", () => {

        const gallery =
            $("#gallery");

        if (gallery) {

            gallery.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

}


/* =========================================================
   6. MAKE A WISH
========================================================= */

const wishBtn = $("#wishBtn");
const wishMessage = $("#wishMessage");

if (wishBtn) {

    wishBtn.addEventListener("click", () => {

        if (wishMessage) {

            wishMessage.classList.add(
                "show"
            );

        }

        wishBtn.classList.add(
            "wish-made"
        );

        wishBtn.innerHTML =
            "✨ Wish Made!";

        createConfetti(45);

        showToast(
            "May every wish you make find its way to you. 🤍"
        );

    });

}


/* =========================================================
   7. TOAST
========================================================= */

function showToast(message) {

    const toast = $("#toast");

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(
        window.toastTimer
    );

    window.toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3500);

}


/* =========================================================
   8. CONFETTI
========================================================= */

function createConfetti(amount = 40) {

    let container =
        $("#finalConfettiContainer");

    if (!container) {

        container =
            document.createElement("div");

        container.id =
            "temporaryConfetti";

        container.className =
            "final-confetti-container";

        document.body.appendChild(
            container
        );

    }

    const colors = [
        "#d6b56d",
        "#f0d99a",
        "#fffaf0",
        "#a98547"
    ];

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement("span");

        piece.className =
            "confetti-piece";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        piece.style.animationDuration =
            (1.5 + Math.random() * 2) + "s";

        piece.style.animationDelay =
            Math.random() * 0.4 + "s";

        piece.style.setProperty(
            "--x",
            ((Math.random() - 0.5) * 500) + "px"
        );

        piece.style.setProperty(
            "--rotate",
            (Math.random() * 720 - 360) + "deg"
        );

        container.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 4000);

    }

}


/* =========================================================
   9. SCROLL REVEAL
========================================================= */

const revealElements =
    $$(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

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

                });

            },
            {
                threshold: 0.1
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(
            element
        );

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add(
            "visible"
        );

    });

}


/* =========================================================
   10. BACKGROUND PARTICLES
========================================================= */

const particlesContainer =
    $("#particlesContainer");


function createParticles() {

    if (!particlesContainer) {
        return;
    }

    const amount =
        window.innerWidth < 600
            ? 20
            : 35;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.className =
            "background-particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        particle.style.animationDelay =
            Math.random() * 5 + "s";

        particle.style.animationDuration =
            (4 + Math.random() * 6) + "s";

        const size =
            1 + Math.random() * 3;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";

        particlesContainer.appendChild(
            particle
        );

    }

}

createParticles();


/* =========================================================
   11. PHOTO GALLERY
========================================================= */

const photoCards =
    $$(".photo-card");

const galleryImages =
    $$(".gallery-image");


const lightbox =
    $("#lightbox");

const lightboxImage =
    $("#lightboxImage");

const lightboxCaption =
    $("#lightboxCaption");

const lightboxClose =
    $("#lightboxClose");

const lightboxPrev =
    $("#lightboxPrev");

const lightboxNext =
    $("#lightboxNext");


let currentPhoto =
    0;


/* =========================================================
   12. IMAGE FALLBACK
========================================================= */

galleryImages.forEach((image) => {

    const placeholder =
        image.parentElement.querySelector(
            ".photo-placeholder"
        );


    image.addEventListener(
        "load",
        () => {

            image.classList.add(
                "loaded"
            );

            if (placeholder) {

                placeholder.classList.add(
                    "hidden"
                );

            }

        }
    );


    image.addEventListener(
        "error",
        () => {

            image.style.display =
                "none";

            if (placeholder) {

                placeholder.classList.remove(
                    "hidden"
                );

            }

            image.dataset.failed =
                "true";

        }
    );


    /*
     * Check immediately in case
     * the image failed before JS loaded.
     */

    if (
        image.complete &&
        image.naturalWidth === 0
    ) {

        image.dispatchEvent(
            new Event("error")
        );

    }

});


/* =========================================================
   13. OPEN LIGHTBOX
========================================================= */

function openLightbox(index) {

    if (!lightbox) {
        return;
    }


    const image =
        galleryImages[index];


    if (!image) {
        return;
    }


    if (
        image.dataset.failed ===
        "true"
    ) {

        showToast(
            "Add this photo first 📷"
        );

        return;

    }


    currentPhoto =
        index;


    updateLightbox();


    lightbox.classList.add(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "lightbox-open"
    );

}


/* =========================================================
   14. UPDATE LIGHTBOX
========================================================= */

function updateLightbox() {

    const image =
        galleryImages[currentPhoto];


    if (!image) {
        return;
    }


    if (lightboxImage) {

        lightboxImage.src =
            image.src;

        lightboxImage.alt =
            image.alt || "Baba memory";

    }


    if (lightboxCaption) {

        const card =
            photoCards[currentPhoto];

        const caption =
            card
                ?.querySelector(
                    ".photo-caption"
                );

        lightboxCaption.textContent =
            caption
                ? caption.textContent.trim()
                : "";

    }

}


/* =========================================================
   15. CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

    if (!lightbox) {
        return;
    }

    lightbox.classList.remove(
        "open"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "lightbox-open"
    );

}


/* =========================================================
   16. NEXT PHOTO
========================================================= */

function nextPhoto() {

    if (
        galleryImages.length === 0
    ) {
        return;
    }


    let next =
        currentPhoto + 1;


    /*
     * Find next available image.
     */

    for (
        let i = 0;
        i < galleryImages.length;
        i++
    ) {

        if (
            next >=
            galleryImages.length
        ) {
            next = 0;
        }


        if (
            galleryImages[next]
                .dataset.failed !==
            "true"
        ) {

            currentPhoto =
                next;

            updateLightbox();

            return;

        }


        next++;

    }

}


/* =========================================================
   17. PREVIOUS PHOTO
========================================================= */

function previousPhoto() {

    if (
        galleryImages.length === 0
    ) {
        return;
    }


    let previous =
        currentPhoto - 1;


    for (
        let i = 0;
        i < galleryImages.length;
        i++
    ) {

        if (previous < 0) {

            previous =
                galleryImages.length - 1;

        }


        if (
            galleryImages[previous]
                .dataset.failed !==
            "true"
        ) {

            currentPhoto =
                previous;

            updateLightbox();

            return;

        }


        previous--;

    }

}


/* =========================================================
   18. PHOTO CARD CLICK
========================================================= */

photoCards.forEach(
    (card, index) => {

        card.addEventListener(
            "click",
            () => {

                openLightbox(index);

            }
        );


        card.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key ===
                    "Enter"
                ) {

                    openLightbox(index);

                }

            }
        );

    }
);


/* =========================================================
   19. LIGHTBOX BUTTONS
========================================================= */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            nextPhoto();

        }
    );

}


if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            previousPhoto();

        }
    );

}


/* =========================================================
   20. CLOSE LIGHTBOX BY BACKGROUND
========================================================= */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


/* =========================================================
   21. KEYBOARD GALLERY CONTROLS
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !lightbox ||
            !lightbox.classList.contains(
                "open"
            )
        ) {
            return;
        }


        if (
            event.key ===
            "Escape"
        ) {

            closeLightbox();

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            nextPhoto();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousPhoto();

        }

    }
);


/* =========================================================
   22. MOBILE PHOTO SWIPE
========================================================= */

let touchStartX = 0;
let touchEndX = 0;


if (lightbox) {

    lightbox.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

        },
        {
            passive: true
        }
    );


    lightbox.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0]
                    .screenX;


            const difference =
                touchEndX -
                touchStartX;


            if (
                Math.abs(difference) <
                50
            ) {
                return;
            }


            if (difference < 0) {

                nextPhoto();

            } else {

                previousPhoto();

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   23. THINGS WE DON'T SAY ENOUGH
========================================================= */

const thingCards =
    $$(".thing-card");


thingCards.forEach((card) => {

    card.addEventListener(
        "click",
        () => {

            card.classList.toggle(
                "active"
            );

        }
    );


    card.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key ===
                "Enter"
            ) {

                card.classList.toggle(
                    "active"
                );

            }

        }
    );

});


/* =========================================================
   24. BABA STARTER PACK
========================================================= */

const starterCards =
    $$(".starter-card");


const starterMessages = [

    "Because Baba + chai = perfect combination. ☕",

    "The phone is never far away. 📱",

    "Breaking news must be investigated. 📰",

    "Nobody escapes the legendary question. 😂",

    "Baba advice: usually correct, always confident. 😎",

    "Family first. Always. ❤️"

];


starterCards.forEach(
    (card, index) => {

        card.addEventListener(
            "click",
            () => {

                showToast(
                    starterMessages[index]
                );

                card.classList.add(
                    "selected"
                );


                setTimeout(() => {

                    card.classList.remove(
                        "selected"
                    );

                }, 1000);

            }
        );

    }
);


/* =========================================================
   25. MUSIC PLAYER
========================================================= */

const audio =
    $("#birthdayAudio");

const musicPlayBtn =
    $("#musicPlayBtn");

const playIcon =
    $("#playIcon");

const pauseIcon =
    $("#pauseIcon");

const musicStatus =
    $("#musicStatus");

const progressTrack =
    $("#progressTrack");

const progressBar =
    $("#progressBar");

const currentTime =
    $("#currentTime");

const duration =
    $("#duration");


function formatTime(seconds) {

    if (
        !Number.isFinite(seconds)
    ) {
        return "0:00";
    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secs =
        Math.floor(
            seconds % 60
        );


    return (
        minutes +
        ":" +
        String(secs).padStart(
            2,
            "0"
        )
    );

}


/* Play / Pause */

if (
    audio &&
    musicPlayBtn
) {

    musicPlayBtn.addEventListener(
        "click",
        async () => {

            /*
             * If audio file doesn't exist,
             * don't crash the website.
             */

            if (
                audio.readyState === 0
            ) {

                showToast(
                    "Add audio/birthday-song.mp3 first 🎵"
                );

                return;

            }


            try {

                if (
                    audio.paused
                ) {

                    await audio.play();

                } else {

                    audio.pause();

                }

            } catch (error) {

                showToast(
                    "Music couldn't be played. Check your audio file."
                );

            }

        }
    );


    audio.addEventListener(
        "play",
        () => {

            musicPlayBtn.classList.add(
                "playing"
            );


            if (playIcon) {
                playIcon.style.display =
                    "none";
            }


            if (pauseIcon) {
                pauseIcon.style.display =
                    "inline";
            }


            if (musicStatus) {

                musicStatus.textContent =
                    "Now playing 🎵";

            }

        }
    );


    audio.addEventListener(
        "pause",
        () => {

            musicPlayBtn.classList.remove(
                "playing"
            );


            if (playIcon) {
                playIcon.style.display =
                    "inline";
            }


            if (pauseIcon) {
                pauseIcon.style.display =
                    "none";
            }


            if (musicStatus) {

                musicStatus.textContent =
                    "Press play when you're ready";

            }

        }
    );


    audio.addEventListener(
        "ended",
        () => {

            musicPlayBtn.classList.remove(
                "playing"
            );

            if (musicStatus) {

                musicStatus.textContent =
                    "Music finished ✨";

            }

        }
    );


    audio.addEventListener(
        "loadedmetadata",
        () => {

            if (duration) {

                duration.textContent =
                    formatTime(
                        audio.duration
                    );

            }

        }
    );


    audio.addEventListener(
        "timeupdate",
        () => {

            if (currentTime) {

                currentTime.textContent =
                    formatTime(
                        audio.currentTime
                    );

            }


            if (
                progressBar &&
                audio.duration
            ) {

                const percentage =
                    (
                        audio.currentTime /
                        audio.duration
                    ) * 100;


                progressBar.style.width =
                    percentage + "%";

            }

        }
    );


    /*
     * Click progress bar
     */

    if (progressTrack) {

        progressTrack.addEventListener(
            "click",
            (event) => {

                if (
                    !audio.duration
                ) {
                    return;
                }


                const rect =
                    progressTrack.getBoundingClientRect();


                const percentage =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width;


                audio.currentTime =
                    percentage *
                    audio.duration;

            }
        );

    }

}


/* =========================================================
   26. ENVELOPE
========================================================= */

const envelope =
    $("#envelope");

const envelopeHint =
    $("#envelopeHint");


function toggleEnvelope() {

    if (!envelope) {
        return;
    }


    const opened =
        envelope.classList.toggle(
            "open"
        );


    if (envelopeHint) {

        envelopeHint.textContent =
            opened
                ? "Tap again to close it 💌"
                : "Tap the envelope to open it 💌";

    }


    if (opened) {

        showToast(
            "A little message just for Baba 🤍"
        );

    }

}


if (envelope) {

    envelope.addEventListener(
        "click",
        toggleEnvelope
    );


    envelope.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key ===
                    "Enter" ||
                event.key ===
                    " "
            ) {

                event.preventDefault();

                toggleEnvelope();

            }

        }
    );

}


/* =========================================================
   27. FINAL GIFT
========================================================= */

const giftBoxWrapper =
    $("#giftBoxWrapper");

const giftBox =
    $("#giftBox");

const giftInstruction =
    $("#giftInstruction");

const finalReveal =
    $("#finalReveal");


let giftOpened = false;


function openFinalGift() {

    if (
        !giftBoxWrapper ||
        giftOpened
    ) {
        return;
    }


    giftOpened = true;


    giftBoxWrapper.classList.add(
        "opened"
    );


    if (giftBox) {

        giftBox.classList.add(
            "opened"
        );

    }


    if (giftInstruction) {

        giftInstruction.textContent =
            "✨ Your surprise is here!";

    }


    setTimeout(() => {

        if (finalReveal) {

            finalReveal.classList.add(
                "show"
            );

            finalReveal.setAttribute(
                "aria-hidden",
                "false"
            );

        }


        createConfetti(100);


        showToast(
            "Happy Birthday, Baba! 🎂❤️"
        );

    }, 700);

}


if (giftBoxWrapper) {

    giftBoxWrapper.addEventListener(
        "click",
        openFinalGift
    );


    giftBoxWrapper.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key ===
                    "Enter" ||
                event.key ===
                    " "
            ) {

                event.preventDefault();

                openFinalGift();

            }

        }
    );

}


/* =========================================================
   28. ACTIVE NAVIGATION WHILE SCROLLING
========================================================= */

const sections =
    $$("section[id]");


function updateActiveNav() {

    let current =
        "";


    const scrollPosition =
        window.scrollY + 200;


    sections.forEach((section) => {

        const top =
            section.offsetTop;

        const height =
            section.offsetHeight;


        if (
            scrollPosition >= top &&
            scrollPosition <
                top + height
        ) {

            current =
                section.id;

        }

    });


    navLinks.forEach((link) => {

        const href =
            link.getAttribute("href");


        link.classList.toggle(
            "active",
            href ===
                "#" + current
        );

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav,
    {
        passive: true
    }
);


/* =========================================================
   29. CLOSE LIGHTBOX WITH ESC
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key ===
            "Escape"
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   30. INITIAL SETUP
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateActiveNav();


        /*
         * Make sure pause icon is hidden
         * at the beginning.
         */

        if (pauseIcon) {

            pauseIcon.style.display =
                "none";

        }


        /*
         * Make sure final reveal
         * starts hidden.
         */

        if (finalReveal) {

            finalReveal.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    }
);


/* =========================================================
   JAVASCRIPT COMPLETE
========================================================= */
