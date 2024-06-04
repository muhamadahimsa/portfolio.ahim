gsap.registerPlugin(ScrollTrigger);
let lenis;
let percentage = 0;

const scrollInfo = document.querySelector('.section-col-scroll > span')

const initLenisHome = () => {
    lenis = new Lenis({
        duration: 1.2,
        infinite: true,
        smoothWheel: true,
    });

    lenis.on('scroll', ({scroll, limit})=> {
        percentage = (scroll / limit) * 100;
        scrollInfo.innerHTML = `${percentage.toFixed(0)}%`
    })

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    lenis.scrollTo(0, { immediate: true });

    // function raf(time) {
    //     lenis.raf(time);
    //     requestAnimationFrame(raf);
    // }
    // requestAnimationFrame(raf);
}

const menu = {
    element: document.querySelector('.menu'),
    pages: document.querySelectorAll('.menu-row-pages > a'),
    info: document.querySelectorAll('.menu-row-info > div > span, .menu-row-info > div > a'),
    title: document.querySelectorAll('.menu-row-title > h1'),
    media: document.querySelector('.menu-row-media'),
};
const button = {
    element: document.querySelector('.nav-menu-button'),
    text: document.querySelectorAll('.nav-menu-button-text > button'),
    open: document.querySelector('.--open-menu'),
    close: document.querySelector('.--close-menu'),
};
const clipPath = {
    init: 'inset(0% 0% 0% 0%)',
    bottom: 'inset(100% 0% 0% 0%)',
    top: 'inset(0% 0% 100% 0%)',
};
const tlMenu = gsap.timeline({
    paused: true,
    defaults: { duration: 1.2, ease: 'expo.inOut' },
});

let isEnabled = false;

const initMenu = () => {
    gsap.set(menu.element, { pointerEvents: 'none', clipPath: clipPath.bottom });
    gsap.set(menu.pages, { yPercent: 100, autoAlpha: 0 });
    gsap.set(menu.info, { yPercent: 100, autoAlpha: 0 });
    gsap.set(menu.title, { yPercent: 100, rotateY: 20, scale: 0.2 });
    gsap.set(menu.media, { clipPath: clipPath.bottom });

    animateInnerMenu();
}

const animateMenu = () => {
    if (!isEnabled) {
        gsap.to(menu.element, {
            duration: 1.2,
            pointerEvents: 'auto',
            clipPath: clipPath.init,
            ease: 'expo.inOut',
        });
    } else {
        gsap.to(menu.element, {
            duration: 1,
            clipPath: clipPath.top,
            ease: 'expo.inOut',
            onComplete: () => {
                gsap.set(menu.element, { pointerEvents: 'none', clipPath: clipPath.bottom });
            },
        });
    }
}

const animateInnerMenu = () => {
    tlMenu.to(
        menu.pages, 
        {
            yPercent: 0,
            autoAlpha: 1,
            stagger: 0.032,
        },
        0.24
    ).to(
        menu.info, 
        {
            yPercent: 0,
            autoAlpha: 1,
            stagger: 0.032,
        },
        0.24
    ).to(
        menu.title, 
        {
            yPercent: 0,
            rotateY: 0,
            scale: 1,
            stagger: 0.032,
        },
        0
    )
    .to(
        menu.media, 
        {
            clipPath: clipPath.init,
        },
        0
    ).to(
        '.nav-item', 
        {
            opacity: 0,
            display: 'none',
        },
        0
    )
    .to(
        '.nav-menu', 
        {
            opacity: 1,
            display: 'block',
        },
        0
    ).to(
        '.section-col-hidden', 
        {
            opacity: 0,
            display: 'none',
            duration: 0.5,
        },
        0
    )
}

const animateButton = (text) => {
    gsap.timeline()
        .to(button.element, {
            duration: 0.8,
            autoAlpha: 0,
            pointerEvents: 'none',
            onComplete: () => {
                button.text[0].textContent = text;
            },
        })
        .to(button.element, {
            duration: 0.8,
            autoAlpha: 1,
            pointerEvents: 'auto',
        })
}

const addEventListeners = () => {
    button.open.addEventListener('click', () => {
        if (!isEnabled) {
            animateButton('Close');
            animateMenu();
            tlMenu.play();
        } else {
            animateButton('Menu');
            animateMenu();
            tlMenu.reverse(2);
        }

        isEnabled = !isEnabled;
    })
}

// Img-Hover
const blocks = document.querySelectorAll('.block');
const resetDuration = 300;

blocks.forEach((block) => {
    let timeoutId;

    block.addEventListener('mouseover', () => {
        clearTimeout(timeoutId);
        block.classList.add('active');
        timeoutId = setTimeout(() => {
            block.classList.remove('active');
        }, resetDuration);
    })
})

window.addEventListener('DOMContentLoaded', () => {
    initMenu();
    addEventListeners();
})

initLenisHome();

// Hidden Gallery
const gallery = {
    container: document.querySelector('.hero-hidden'),
    medias: document.querySelectorAll('.hero-hidden-media-image'),
    button: document.getElementById('hidden-gallery'),
};

const showGallery = () => {
    const tlGallery = gsap.timeline({
        paused: true,
        defaults: {
            duration: 0.5,
            ease: 'power4.inOut'
        }
    })

    gsap.set(gallery.container, { autoAlpha: 0, pointerEvents: 'none' })
    gsap.set(gallery.medias, { zIndex: 0 });

    tlGallery
        .to(gallery.container, {
            autoAlpha: 1,
            pointerEvents: 'auto',
            zIndex: 100,
        }, 0)

    gsap.to(gallery.medias, {
        repeat: -1,
        zIndex: 1,
        stagger: 0.6,
    });

    gallery.button.addEventListener('mouseenter', ()=> tlGallery.play())
    gallery.button.addEventListener('mouseleave', ()=> tlGallery.reverse())
};

window.addEventListener('DOMContentLoaded', showGallery);

// Intro
function intro() {
    gsap.to('.intro', {
        y: '-100%',
        duration: 1.2,
        delay: 5.1,
        display: 'none',
        ease: 'expo.out',
    })

    gsap.from('.intro-text:nth-child(1)',{
        delay: .5,
        ease: 'power3.inOut',
        duration: 1,
        display: 'block',
        y: '150%',
    })
    
    gsap.to('.intro-text:nth-child(1)',{
        delay: 1.5,
        ease: 'power3.inOut',
        duration: 1,
        display: 'block',
        y: '-150%'
    })

    gsap.from('.intro-text:nth-child(2)',{
        delay: 1.5,
        ease: 'power3.inOut',
        duration: 1,
        display: 'block',
        y: '150%',
    })
    
    gsap.to('.intro-text:nth-child(2)',{
        delay: 2.5,
        ease: 'power3.inOut',
        duration: 1,
        display: 'block',
        y: '-150%'
    })

    gsap.from('.intro-text:nth-child(3)',{
        delay: 2.5,
        ease: 'power3.inOut',
        duration: 1,
        display: 'block',
        y: '150%',
    })
    
    gsap.to('.intro-text:nth-child(3)',{
        delay: 3.5,
        ease: 'power3.inOut',
        duration: 1,
        display: 'block',
        y: '-150%'
    })

    gsap.from('.intro-text:nth-child(4)',{
        delay: 3.5,
        ease: 'power3.inOut',
        duration: 1,
        display: 'block',
        y: '150%',
    })
    
    gsap.to('.intro-text:nth-child(4)',{
        delay: 4.5,
        ease: 'power3.inOut',
        duration: 1,
        display: 'block',
        y: '-150%'
    })
}

intro();