gsap.registerPlugin(ScrollTrigger);
let lenis;

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
}

const goToTop = document.querySelector('.--top')

const toTop = () => {
    goToTop.addEventListener('click', (e) => {
        e.preventDefault();

        lenis.scrollTo(0, { lerp: 0.05 });
    });
};

const cubeContainers = document.querySelectorAll('.cube-container');
const items = document.querySelectorAll('.item');
const projectNames = ['serene', 'aksara', 'bac', 'bali-wedding'];

function updateCubes(scrollY) {
    const yRotation = (scrollY / 2) % 360;
    const scrollOffset = scrollY * 0.25;

    cubeContainers.forEach((container, containerIndex) => {
        const cubes = container.querySelectorAll('.cube');

        cubes.forEach((cube, cubeIndex) => {
            let rotationDirection = cubeIndex % 2 === 0 ? 1 : -1;
            cube.style.transform = `translateZ(100px) rotateX(${yRotation * rotationDirection}deg)`;
        })
            const frontBackTextPosition = 50 + scrollOffset;
            const topBottomTextPosition = 50 - scrollOffset;

            container.querySelectorAll('.front p, .back p').forEach(p => {
                p.style.left = `${frontBackTextPosition}%`;
            });

            container.querySelectorAll('.top p, .bottom p').forEach(p => {
                p.style.left = `${topBottomTextPosition}%`;
            });
        })
}

function populateText() {
    items.forEach((item, itemIndex) => {
        const projectName = projectNames[itemIndex % projectNames.length];
        const sides = item.querySelectorAll('.side p');
        const textContent = Array(50).fill(projectName).join('&nbsp;&nbsp;&nbsp;&nbsp;');

        sides.forEach(side => {
            side.innerHTML = textContent;
        })
    })
}

window.onload = function() {
    populateText();
    updateCubes(window.scrollY);
}

let ticking = false;

document.addEventListener('scroll', function(e) {
    if(!ticking) {
        window.requestAnimationFrame(function() {
            updateCubes(window.scrollY);
            ticking = false;
        })

        ticking = true;
    }
})

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

// Background
window.addEventListener('DOMContentLoaded', () => {
    const blockContainer = document.getElementById('blocks');
    const blockSize = 50;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const numCols = Math.ceil(screenWidth / blockSize);
    const numRows = Math.ceil(screenHeight / blockSize);
    const numBlocks = numCols * numRows;

    function createBlocks() {
        for (let i = 0; i < numBlocks; i++) {
            const block = document.createElement('div');
            block.classList.add('block');
            block.dataset.index = i;
            block.addEventListener('mousemove', highlightRandomNeighbors);
            blockContainer.appendChild(block);
        }
    }

    function highlightRandomNeighbors() {
        const index = parseInt(this.dataset.index);
        const neighbors = [
            index - 1,
            index + 1,
            index - numCols,
            index + numCols,
            index - numCols - 1,
            index - numCols + 1,
            index + numCols - 1,
            index + numCols + 1,
        ].filter(
            (i) =>
                i >= 0 &&
                i < numBlocks &&
                Math.abs((i % numCols) - (index % numCols)) <= 1
        );

        this.classList.add('highlight');
        setTimeout(() => {
            this.classList.remove('highlight');
        }, 500);

        shuffleArray(neighbors)
        .slice(0, 1)
        .forEach((nIndex) => {
            const neighbor = blockContainer.children[nIndex];
            if (neighbor) {
                neighbor.classList.add('highlight');
                setTimeout(() => {
                    neighbor.classList.remove('highlight');
                }, 500)
            }
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    createBlocks();
});

window.onload = () => {
    initLenis();
    toTop();
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