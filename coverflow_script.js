/*
import gsap from 'https://cdn.skypack.dev/gsap@3.7.0'
import ScrollTrigger from 'https://cdn.skypack.dev/gsap@3.7.0/ScrollTrigger'
import Draggable from 'https://cdn.skypack.dev/gsap@3.7.0/Draggable'

*/
gsap.registerPlugin(ScrollTrigger)
// gsap.registerPlugin(Draggable)

gsap.set('.box', {
    yPercent: -50,
})

const STAGGER = 0.1
const DURATION = 1
const OFFSET = 0
const BOXES = gsap.utils.toArray('.box')

const LOOP = gsap.timeline({
    paused: true,
    repeat: 0,
    ease: 'none',
})

const SHIFTS = [...BOXES, ...BOXES, ...BOXES]
console.log(SHIFTS);

SHIFTS.forEach((BOX, index) =>
{
    // this callback is for every box
    const BOX_TL = gsap
        .timeline()
        .set(BOX, {
            xPercent: 250,
            rotateY: -50,
            opacity: 0,
            scale: 0.5,
        })
        // Opacity && Scale
        .to(
            BOX,
            {
                opacity: 1,
                scale: 1,
                duration: 0.1,
            },
            0
        )
        .to(
            BOX,
            {
                opacity: 0,
                scale: 0.5,
                duration: 0.1,
            },
            0.9
        )
        // Panning
        .fromTo(
            BOX,
            {
                xPercent: 250,
            },
            {
                xPercent: -350,
                duration: 1,
                immediateRender: false,
                ease: 'power1.inOut',
            },
            0
        )
        // Rotations
        .fromTo(
            BOX,
            {
                rotateY: -50,
            },
            {
                rotateY: 50,
                immediateRender: false,
                duration: 1,
                ease: 'power4.inOut',
            },
            0
        )
        // Scale && Z
        .to(
            BOX,
            {
                z: 100,
                scale: 1.25,
                duration: 0.1,
                repeat: 1,
                yoyo: true,
            },
            0.4
        )
        .fromTo(
            BOX,
            {
                zIndex: 1,
            },
            {
                zIndex: BOXES.length,
                repeat: 1,
                yoyo: true,
                ease: 'none',
                duration: 0.5,
                immediateRender: false,
            },
            0
        )
    LOOP.add(BOX_TL, index * STAGGER)

    BOX.addEventListener('mouseover', () => {
        const zIndex = window.getComputedStyle(BOX).getPropertyValue('z-index');
        console.log(zIndex, BOXES.length.toString())
        if (zIndex == BOXES.length.toString())
        {
            gsap.to(BOX.children[1], { opacity: 0.2, duration: 0.3 });
            BOX.style.cursor = "pointer";
            let active = false;
            BOX.addEventListener('click', () => {
                if (!active)
                {
                    let click_tl = gsap.timeline();
                    click_tl
                        .to(BOX,
                            { height: "50vmin", width: "50vmin", duration: 0.3 },
                            "start"
                        )
                        .to(BOX.getElementsByClassName("span-div")[0],
                            {
                                z: -10
                            }, "start")
                        .to(BOX.getElementsByClassName("projet-details")[0],
                            {
                                z: -5,
                            }, "start")
                        .to(BOX.children[1],
                            {
                                opacity: 0
                            }, "start");
                }
                else
                {
                    let unclick_tl = gsap.timeline();
                    unclick_tl
                        .to(BOX,
                            { height: "20vmin", width: "20vmin", duration: 0.3 },
                            "start"
                        )
                        .to(BOX.getElementsByClassName("span-div")[0],
                        {
                            z: -5
                        }, "start")
                        .to(BOX.getElementsByClassName("projet-details")[0],
                            {
                                z: -10,
                            }, "start")
                        .to(BOX.children[1],
                            {
                                opacity: 0.2
                            }, "start");
                }
                active = !active;
            })
        }
        BOX.addEventListener("scroll", () => {
            if (Math.ceil(parseFloat(zIndex)) !== BOXES.length)
            {
                gsap.to(BOX,
                    { height: "20vmin", width: "20vmin", duration: 0.3 })
            }
        })
    });

    BOX.addEventListener('mouseout', () => {
        const zIndex = window.getComputedStyle(BOX).getPropertyValue('z-index');
        if (zIndex == BOXES.length.toString())
        {
            gsap.to(BOX.children[1], { opacity: 1, duration: 0.3 });
            BOX.style.cursor = "auto";
        }
    });
})



const CYCLE_DURATION = STAGGER * BOXES.length
const START_TIME = CYCLE_DURATION + DURATION * 0.5 + OFFSET

const LOOP_HEAD = gsap.fromTo(
    LOOP,
    {
        totalTime: START_TIME,
    },
    {
        totalTime: `+=${CYCLE_DURATION}`,
        duration: 1,
        ease: 'none',
        repeat: 0,
        paused: true,
    }
)

const PLAYHEAD = {
    position: 0,
}

const POSITION_WRAP = gsap.utils.wrap(0, LOOP_HEAD.duration())

const SCRUB = gsap.to(PLAYHEAD, {
    position: 0,
    onUpdate: () => {
        LOOP_HEAD.totalTime(POSITION_WRAP(PLAYHEAD.position))
    },
    paused: true,
    duration: 0.25,
    ease: 'power3',
})


let iteration = 0
const TRIGGER = ScrollTrigger.create({
    start: 0,
    end: '+=2000',
    horizontal: false,
    pin: '.boxes',
    onUpdate: self => {
        // console.log("iterations : ", iteration)
        const NEW_POS = (iteration + self.progress) * LOOP_HEAD.duration()
        // console.log("NEW POS : ", NEW_POS)
        SCRUB.vars.position = NEW_POS
        SCRUB.invalidate().restart()
    },
})

const SNAP = gsap.utils.snap(1 / BOXES.length)

const progressToScroll = progress =>
    gsap.utils.clamp(
        1,
        TRIGGER.end - 1,
        gsap.utils.wrap(0, 1, progress) * TRIGGER.end
    )

const scrollToPosition = position => {
    const SNAP_POS = SNAP(position)
    const PROGRESS =
        (SNAP_POS - LOOP_HEAD.duration() * iteration) / LOOP_HEAD.duration()
    const SCROLL = progressToScroll(PROGRESS)
    if (PROGRESS >= 1 || PROGRESS < 0) return WRAP(Math.floor(PROGRESS), SCROLL)
    TRIGGER.scroll(SCROLL)
}

ScrollTrigger.addEventListener('scrollEnd', () => {
        // console.log(SCRUB.vars)
        scrollToPosition(SCRUB.vars.position)
    }
)
window.BOXES = BOXES

gsap.set('.box', { display: 'block' })

// need to know to, from, toFrom, ScrollTrigger
// https://gsap.com/docs/v3/Plugins/ScrollTrigger/
// https://gsap.com/resources/st-mistakes/

