let competence_tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".competences",
        pin: true,
        start: "top top",
        end: "+=250%",
        // markers: true,
        scrub: true,
        id: "competences"
    }
});

competence_tl
    .to(".python", {
        x: "3vw"
    }, "python")
    .to(".python-detail", {
        opacity: 1,
        z: 3
    }, "python")
/*    .to(".c", {
        x: "3vw"
    }, "c")*/
    .to(".python", {
        x: "0"
    }/*, "c"*/)
    .to(".python-detail", {
        opacity: 0,
        z: -1
    }, "<")
    .to(".c", {
        x: "3vw"
    }, "c")
    .to(".c-detail", {
        opacity: 1,
        z: 3
    }, "c")
/*    .to(".cpp", {
        x: "3vw"
    }, "cpp")*/
    .to(".c", {
        x: "0"
    })
    .to(".c-detail", {
        opacity: 0,
        z: -1
    }, "<")
    .to(".cpp", {
        x: "3vw"
    }, "cpp")
    .to(".cpp-detail", {
        opacity: 1,
        z: 3
    }, "cpp")
    .to(".cpp", {
        x: "0"
    })
    .to(".cpp-detail", {
        opacity: 0,
        z: -1
    }, "<")
    .to(".csharp", {
        x: "3vw"
    }, "csharp")
    .to(".csharp-detail", {
        opacity: 1,
        z: 3
    }, "csharp")
    .to(".csharp", {
        x: "0"
    })
    .to(".csharp-detail", {
        opacity: 0,
        z: -1
    }, "<")
    .to(".php", {
        x: "3vw"
    }, "php")
    .to(".php-detail", {
        opacity: 1,
        z: 3
    }, "php")
    .to(".php", {
        x: "0"
    })
    .to(".php-detail", {
        opacity: 0,
        z: -1
    }, "<")
    .to(".javascript", {
        x: "3vw"
    }, "javascript")
    .to(".javascript-detail", {
        opacity: 1,
        z: 3
    }, "javascript")
    .to(".javascript", {
        x: "0"
    })
    .to(".javascript-detail", {
        opacity: 0,
        z: -1
    }, "<")
    .to(".sql", {
        x: "3vw"
    }, "sql")
    .to(".sql-detail", {
        opacity: 1,
        z: 3
    }, "sql")
    .to(".sql", {
        x: "0"
    })
    .to(".sql-detail", {
        opacity: 0,
        z: -1
    }, "<")
    .to(".web-development", {
        x: "3vw"
    }, "web")
    .to(".web-detail", {
        opacity: 1,
        z: 3
    }, "web")
    .to(".web-development", {
        x: "0"
    })
    .to(".web-detail", {
        opacity: 0,
        z: -1
    }, "<")


// todo : gsap timeline
// the active class in the scroll trigger tutorial

// ==============================================================================================================
/*let veille_tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".veille-container",
        toggleActions: "play pause resume none",
        // pin: true,
        start: "top center",
        // end: "+=200%",
        // markers: true,
        // scrub: true,
        id: "veille"
    }
});*/

// the problem is very likely with over flow

/*
veille_tl
    .to(".veille-container", {
        width: "100vw",
        margin: 0,
        duration: 0.3
    })
    .to(".veille-container", {
        y: "-50vh",
        duration: 0.2
    })*/
