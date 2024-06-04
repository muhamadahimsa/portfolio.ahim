gsap.registerPlugin(ScrollTrigger);

const splitTypes = document.querySelectorAll('.hero-paragraph-text')

const initLenis = () => {
    lenis = new Lenis({
        smoothWheel: true,
        smoothTouch: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    lenis.scrollTo(0, { immediate: true });
    initScrollTrigger();
}

const initScrollTrigger = () => {
    const images = document.querySelectorAll('.hero-background-image');

    gsap.utils.toArray(images).forEach((image) => {
        gsap.set(image, { scale: 1.2 });

        const imageRect = image.getBoundingClientRect();
        const heightDifference = imageRect.height - image.parentElement.offsetHeight;

        gsap.fromTo(
            image, 
            {
                y: -heightDifference,
            },
            {
                scrollTrigger: {
                    trigger: image,
                    start: 'top center+=20%',
                    end: 'bottom+=10% top',
                    scrub: true,
                },
                y: heightDifference,
                ease: 'none'
            }
        );
    })

    splitTypes.forEach((char,i) => {
        const text = new SplitType(char, { types: 'chars,words'})
        
        gsap.from(text.chars, {
            scrollTrigger: {
                trigger: char,
                start: 'top 90%',
                end: 'bottom 80%',
                scrub: true,
                markers: false,
            },
            opacity: 0.1,
            stagger: 0.2,
        })
    })
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

window.addEventListener('DOMContentLoaded', () => {
    initMenu();
    addEventListeners();
})

window.onload = () => {
    initLenis();
};

// Transition
function transition() {
    gsap.to('.transition', {
        y: '-100%',
        delay: .3,
        duration: 1.4,
        ease: 'expo.out',
    })
    gsap.to('.transition', {
        delay: 1.4,
        display: 'none',
        opacity: 0
    },)
}

transition();