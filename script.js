// DATE & TIME
// Website ke navigation me current date aur time show karne ke liye.

function updateDateTime(){

    const el = document.getElementById('datetime');

    if(!el) return;

    const d = new Date();

    el.textContent = d.toLocaleString('en-IN', {
        weekday:'short',
        day:'2-digit',
        month:'short',
        year:'numeric',
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit'
    });

}

setInterval(updateDateTime, 1000);

updateDateTime();


// MOBILE MENU
// Zoom-in, tablet aur mobile screens par hamburger menu open/close karne ke liye.
// Desktop/zoom-out par menu automatic normal single-line mode me aa jata hai.

const btn = document.querySelector('.menu-btn');

const nav = document.querySelector('.nav');

if(btn && nav){

    btn.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    document.querySelectorAll('.nav a').forEach((link) => {

        link.addEventListener('click', () => {
            nav.classList.remove('show');
        });

    });

    window.addEventListener('resize', () => {

        if(window.innerWidth > 1380){
            nav.classList.remove('show');
        }

    });

}


// ACTIVE NAV LINK
// Jo page open hai, uska menu item active orange color me show karne ke liye.

const page = location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav a').forEach((a) => {

    if(a.getAttribute('href') === page){
        a.classList.add('active');
    }

});


// HERO SLIDESHOW
// Homepage ke hero section me images automatic change karne ke liye.

const slides = document.querySelectorAll('.hero-slideshow .slide');

let currentSlide = 0;

function showSlide(index){

    slides.forEach((slide) => {
        slide.classList.remove('active');
    });

    if(slides[index]){
        slides[index].classList.add('active');
    }

}

if(slides.length > 0){

    setInterval(() => {

        currentSlide++;

        if(currentSlide >= slides.length){
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }, 3000);

}


// GALLERY
// Gallery page me tabs ke hisaab se images load karne ke liye.

const galleryData = {
    "Center/Activities/Celebration/Counsellings/Events": [
        { image: "assets/images/center/finalcenter1.jpg" },
        { image: "assets/images/center/finalcenter2.jpg" },
        { image: "assets/images/center/finalcenter3.jpg" },
        { image: "assets/images/center/finalcenter4.jpg" },
        { image: "assets/images/center/finalcenter5.jpg" },
        { image: "assets/images/center/finalcenter6.jpg" },

        { image: "assets/images/activites/finalactivity1.jpg" },
        { image: "assets/images/activites/finalactivity2.jpg" },
        { image: "assets/images/activites/finalactivity3.jpg" },
        { image: "assets/images/activites/finalactivity4.jpg" },
        { image: "assets/images/activites/finalactivity5.jpg" },
        { image: "assets/images/activites/finalactivity6.jpg" },

        { image: "assets/images/counselling/finalcounselling1.jpg" },
        { image: "assets/images/counselling/finalcounselling2.jpg" },
        { image: "assets/images/counselling/finalcounselling3.jpg" },
        { image: "assets/images/counselling/finalcounselling4.jpg" },
        { image: "assets/images/counselling/finalcounselling5.jpg" },

        { image: "assets/images/events/finalevent1.jpg" },
        { image: "assets/images/events/finalevent2.jpg" },
        { image: "assets/images/events/finalevent3.jpg" },
        { image: "assets/images/events/finalevent4.jpg" },
        { image: "assets/images/events/finalevent5.jpg" },
        { image: "assets/images/events/finalevent6.jpg" },
        { image: "assets/images/events/finalevent7.jpg" },
    ]
}; 

const tabButtons = document.querySelectorAll(".tabs button");

const galleryGrid = document.getElementById("galleryGrid");

if(galleryGrid && tabButtons.length > 0){

    function loadGallery(category){

        galleryGrid.innerHTML = "";

        galleryData[category].forEach((item) => {

            galleryGrid.innerHTML += `
                <div class="photo photo-gallery">

                    <img src="${item.image}" alt="Gallery Image">

                </div>
            `;

        });

    }

    tabButtons.forEach((button) => {

        button.addEventListener("click", () => {

            tabButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            loadGallery(button.dataset.category);

        });

    });

    loadGallery("Center/Activities/Celebration/Counsellings/Events");

}


// TYPING EFFECT
// Homepage heading me English/Hindi typing animation chalane ke liye.

const typingText = document.getElementById("typing-text");

if(typingText){

    const words = [
    "STEP TOWARDS CHANGE",
    "बदलाव की नई राह"
    ];

    let wordIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    function typingEffect(){

        const currentWord = words[wordIndex];

        typingText.textContent =
            currentWord.substring(0, letterIndex);

        if(!deleting){

            letterIndex++;

            if(letterIndex > currentWord.length){

                deleting = true;

                setTimeout(typingEffect, 1500);

                return;
            }

        }else{

            letterIndex--;

            if(letterIndex < 0){

                deleting = false;

                wordIndex++;

                if(wordIndex >= words.length){
                    wordIndex = 0;
                }

            }

        }

        setTimeout(
            typingEffect,
            deleting ? 60 : 120
        );

    }

    typingEffect();

}

// LOGO POPUP
// Logo par click karne par original size popup open/close karne ke liye.

function openLogoPopup(){

    document.getElementById("logoPopup").style.display = "flex";

}

function closeLogoPopup(){

    document.getElementById("logoPopup").style.display = "none";

}


// SCROLL BEHAVIOUR
// Scroll down par header/menu auto-hide, scroll up par wapas show.
// Scroll-to-top button page ke bottom se top par laane ke liye.
(function(){
    const topbar = document.querySelector('.topbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if(topbar){
            if(currentScrollY > lastScrollY && currentScrollY > 140 && !document.querySelector('.nav.show')){
                topbar.classList.add('hide-on-scroll');
            }else{
                topbar.classList.remove('hide-on-scroll');
            }
        }

        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    }, { passive:true });

    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.type = 'button';
    scrollBtn.setAttribute('aria-label', 'Back to top');
    scrollBtn.innerHTML = '↑';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('show', window.scrollY > 350);
    }, { passive:true });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top:0, behavior:'smooth' });
    });
})();
