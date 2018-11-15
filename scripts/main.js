import ut from "./modules/utility.js";
import OverlayFullScreen from "./modules/overlayFullScreen.js";

AOS.init();

// Global DOM elements on website
const el = {
    body: document.body,
    hamburger: document.getElementById("hamburger"),
    mobileNav: {
        overlay: document.getElementById("menu_overlay"),
        navItems: document.getElementById("mobile_nav"),
        menu: document.getElementById("menu")
    },
    scrollDownArr: document.getElementById("scrollDown"),
    aboutSection: document.getElementById("aboutSection"),
    heroCommon: document.querySelector(".hero_common"),
    hero: document.querySelector(".hero"),
    scrollUpArr: document.getElementById("scrollUp"),
    studio: document.getElementsByClassName("studio"),
    studioImages: document.querySelectorAll(".studio .img_container_bigger img"),
    work: {
        work: document.getElementsByClassName("work"),
        imageCont: document.querySelector(".work .img_container"),
        previous: document.querySelector(".work .go_back"),
        next: document.querySelector(".work .go_next")
    },
    myEquipment: {
        myEquipment: document.getElementsByClassName("my_equipment"),
        imageCont: document.querySelector(".my_equipment .img_container"),
        previous: document.querySelector(".my_equipment .go_back"),
        next: document.querySelector(".my_equipment .go_next"),
        captionCont: document.querySelector(".my_equipment .slideshow_caption")
    },
    projects: {
        projects: document.getElementsByClassName("projects_main"),
        thumbCont: document.querySelector(".projects_main .slideshow_thumb_container"),
        mainImgCont: document.querySelector(".projects_main .img_container_smaller"),
        previous: document.querySelector(".projects_main .go_back"),
        next: document.querySelector(".projects_main .go_next")
    }
};

ut.ready(function () {
    // Hamburger menu functionality and overlay
    const hamburger = (function () {
        el.hamburger.addEventListener("click", (e) => {
            if (!el.hamburger.classList.contains("overflay_fs_active")) {
                ut.toggleClassOnAllElements("active", el.hamburger, el.mobileNav.overlay, el.mobileNav.navItems)
                ut.toggleClassOnAllElements("faded", el.mobileNav.overlay, el.mobileNav.navItems)
                ut.toggleClass(el.hamburger, "inactive");
                ut.toggleClass(el.mobileNav.menu, "translate_away");
                ut.toggleClass(el.body, "overflow_hidden");
            }
        })
    })()

    const animations = (function () {
        // Animation for hero headline - sliding in from the side
        const heroAnimation = (function () {
            const heroText = document.getElementById("hero_text");
            setTimeout(() => {
                heroText.style.animation = "moveInLeft .5s linear";
                heroText.classList.remove("faded");
            }, 500);
        }())

        // Scroll down
        const scrollDown = (function () {
            if (el.scrollDownArr) {
                el.scrollDownArr.addEventListener("click", e => {
                    el.aboutSection.scrollIntoView({
                        behavior: "smooth"
                    });
                })
            }
        }())

        // Scroll up
        const scrollUp = (function () {
            // Showing or hiding the scroll up icon
            window.addEventListener("scroll", e => {
                if (window.pageYOffset > 1000) {
                    el.scrollUpArr.style.opacity = "1"
                } else {
                    el.scrollUpArr.style.opacity = "0";
                }
            })

            el.scrollUpArr.addEventListener("click", e => {
                // If it's home page
                if (el.hero) {
                    el.hero.scrollIntoView({
                        behavior: "smooth"
                    });
                } else {
                    el.heroCommon.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            })
        }())

    })()

    const slideshow = (function () {
        if (el.studio.length > 0) {
            let current = 0;
            setInterval(function () {
                for (let i = 0; i < el.studioImages.length; i++) {
                    el.studioImages[i].style.opacity = 0;
                }
                current = (current != el.studioImages.length - 1) ? current + 1 : 0;
                el.studioImages[current].style.opacity = 1;
            }, 6000);
        }
    }())

    const workCarousel = (function () {
        if (el.work.work.length > 0) {
            let current = 0;

            const controls = {
                next: () => {
                    el.work.imageCont.children.length - 1 === current ? current = 0 : current++;
                },
                previous: () => {
                    current === 0 ? current = el.work.imageCont.children.length - 1 : current--;
                },
                showCurrent: () => {
                    el.work.imageCont.children[current].style.opacity = 1;
                },
                clearAll: () => {
                    ut.goThroughElementsOfContainer(el.work.imageCont, e => {
                        e.style.opacity = 0;
                    })
                }
            }
            controls.showCurrent();

            el.work.next.addEventListener("click", e => {
                controls.next();
                controls.clearAll();
                controls.showCurrent();
            })

            el.work.previous.addEventListener("click", e => {
                controls.previous();
                controls.clearAll();
                controls.showCurrent();
            })

        }
    }())

    const myEquipmentCarousel = (function () {
        if (el.myEquipment.myEquipment.length > 0) {
            let current = 0;

            const controls = {
                next: () => {
                    el.myEquipment.imageCont.children.length - 1 === current ? current = 0 : current++;
                    el.myEquipment.captionCont.children.length - 1 === current ? current = 0 : current++;
                },
                previous: () => {
                    current === 0 ? current = el.myEquipment.imageCont.children.length - 1 : current--;
                    current === 0 ? current = el.myEquipment.captionCont.children.length - 1 : current--;
                },
                showCurrent: () => {
                    el.myEquipment.imageCont.children[current].style.opacity = 1;
                    el.myEquipment.captionCont.children[current].style.opacity = 1;
                },
                clearAll: () => {
                    ut.goThroughElementsOfContainer(el.myEquipment.imageCont, e => {
                        e.style.opacity = 0;
                    })
                    ut.goThroughElementsOfContainer(el.myEquipment.captionCont, e => {
                        e.style.opacity = 0;
                    })
                }
            }
            controls.showCurrent();

            el.myEquipment.next.addEventListener("click", e => {
                controls.next();
                controls.clearAll();
                controls.showCurrent();
            })

            el.myEquipment.previous.addEventListener("click", e => {
                controls.previous();
                controls.clearAll();
                controls.showCurrent();
            })

        }
    }())

    const overlay_fs = (function () {
        if (document.querySelector(".sidebar")) {
            const archives = new OverlayFullScreen("archives", "archives_menu", "hamburger");
            const categories = new OverlayFullScreen("categories", "categories_menu", "hamburger");
            archives.eventListeners();
            categories.eventListeners();
        }
    }())

    /*
    const projectsLightbox = (function () {
        if (el.projects.projects.length > 0) {
            // viewport in ems
            let viewport = window.innerWidth / parseFloat(getComputedStyle(document.querySelector('html'))['font-size']) * .625;

            let current = 0;

            const controls = {
                two: {
                    next: () => {
                        el.projects.thumbCont.children.length - 3 === current ? current = 0 : current += 2;
                    },
                    previous: () => {
                        current === 0 ? current = el.projects.thumbCont.children.length - 3 : current -= 2;
                    },
                    showCurrent: () => {
                        let curr = current;
                        for (let i = 0; i < 2; i++) {
                            if (el.projects.thumbCont.children[curr].classList.contains("slideshow_photo")) {
                                el.projects.thumbCont.children[curr].style.opacity = 1;
                            }
                            curr++;
                        }
                    }
                },
                three: {
                    next: () => {
                        el.projects.thumbCont.children.length - 4 === current ? current = 0 : current += 3;
                    },
                    previous: () => {
                        current === 0 ? current = el.projects.thumbCont.children.length - 4 : current -= 3;
                    },
                    showCurrent: () => {
                        let curr = current;
                        for (let i = 0; i < 3; i++) {
                            if (el.projects.thumbCont.children[curr].classList.contains("slideshow_photo")) {
                                el.projects.thumbCont.children[curr].style.opacity = 1;
                            }
                            curr++;
                        }
                    }
                },
                clearAll: () => {
                    // works
                    ut.goThroughElementsOfContainer(el.projects.thumbCont, e => {
                        if (e.classList.contains("slideshow_photo")) {
                            e.style.opacity = 0;
                        }
                    })
                },
                showAll: () => {
                    ut.goThroughElementsOfContainer(el.projects.thumbCont, e => {
                        if (e.classList.contains("slideshow_photo")) {
                            e.style.opacity = 1;
                        }
                    })
                }
            }
            // controls.two.showCurrent();

            el.projects.previous.addEventListener("click", e => {
                let viewport = window.innerWidth / parseFloat(getComputedStyle(document.querySelector('html'))['font-size']) * .625;
                if (viewport >= 37.5 && viewport < 60) {
                    // logic for 3 thumbnails in a row
                    controls.three.previous();
                    controls.clearAll();
                    controls.three.showCurrent();
                } else if (viewport < 37.5) {
                    // logic for 2 thumbnails in a row
                    controls.two.previous();
                    controls.clearAll();
                    controls.two.showCurrent();
                }
            })

            el.projects.next.addEventListener("click", e => {
                let viewport = window.innerWidth / parseFloat(getComputedStyle(document.querySelector('html'))['font-size']) * .625;
                if (viewport >= 37.5 && viewport < 60) {
                    // logic for 3 thumbnails in a row
                    controls.three.next();
                    controls.clearAll();
                    controls.three.showCurrent();
                } else if (viewport < 37.5) {
                    // logic for 2 thumbnails in a row     
                    controls.two.next();
                    controls.clearAll();
                    controls.two.showCurrent();
                }
            });

            let flags = {
                smallScreen: false,
                biggerScreen: false,
                bigScreen: false
            };

            window.addEventListener("resize", e => {
                let viewport = window.innerWidth / parseFloat(getComputedStyle(document.querySelector('html'))['font-size']) * .625;
                if (viewport >= 60) {
                    if (flags.bigScreen === false) {
                        current = 0;
                        controls.showAll();
                        ut.setPropTrueAndRestFalse(flags, "bigScreen");
                    }
                } else if (viewport < 37.5) {
                    if (flags.smallScreen === false) {
                        current = 0;
                        controls.clearAll()
                        controls.two.showCurrent();
                        ut.setPropTrueAndRestFalse(flags, "smallScreen");
                    }
                } else {
                    if (flags.biggerScreen === false) {
                        current = 0;
                        controls.clearAll();
                        controls.three.showCurrent();
                        ut.setPropTrueAndRestFalse(flags, "biggerScreen");
                    }
                }

            })
        }
    }())
    */
})

class ProjectLightbox {
    constructor(thumbCont, previous, next) {
        this.thumbCont = thumbCont;
        this.previous = previous;
        this.next = next;
        this.logic()
        this.responsive();
    }
    logic() {
        let current = 0;
        const controls = {
            two: {
                next: () => {
                    this.thumbCont.children.length - 3 === current ? current = 0 : current += 2;
                },
                previous: () => {
                    current === 0 ? current = this.thumbCont.children.length - 3 : current -= 2;
                },
                showCurrent: () => {
                    let curr = current;
                    for (let i = 0; i < 2; i++) {
                        if (this.thumbCont.children[curr].classList.contains("slideshow_photo")) {
                            this.thumbCont.children[curr].style.opacity = 1;
                        }
                        curr++;
                    }
                }
            },
            three: {
                next: () => {
                    this.thumbCont.children.length - 4 === current ? current = 0 : current += 3;
                },
                previous: () => {
                    current === 0 ? current = this.thumbCont.children.length - 4 : current -= 3;
                },
                showCurrent: () => {
                    let curr = current;
                    for (let i = 0; i < 3; i++) {
                        if (this.thumbCont.children[curr].classList.contains("slideshow_photo")) {
                            this.thumbCont.children[curr].style.opacity = 1;
                        }
                        curr++;
                    }
                }
            },
            clearAll: () => {
                // works
                ut.goThroughElementsOfContainer(this.thumbCont, e => {
                    if (e.classList.contains("slideshow_photo")) {
                        e.style.opacity = 0;
                    }
                })
            },
            showAll: () => {
                ut.goThroughElementsOfContainer(this.thumbCont, e => {
                    if (e.classList.contains("slideshow_photo")) {
                        e.style.opacity = 1;
                    }
                })
            }
        }
        // controls.two.showCurrent();

        this.previous.addEventListener("click", e => {
            let viewport = window.innerWidth / parseFloat(getComputedStyle(document.querySelector('html'))['font-size']) * .625;
            if (viewport >= 37.5 && viewport < 60) {
                // logic for 3 thumbnails in a row
                controls.three.previous();
                controls.clearAll();
                controls.three.showCurrent();
            } else if (viewport < 37.5) {
                // logic for 2 thumbnails in a row
                controls.two.previous();
                controls.clearAll();
                controls.two.showCurrent();
            }
        })

        this.next.addEventListener("click", e => {
            let viewport = window.innerWidth / parseFloat(getComputedStyle(document.querySelector('html'))['font-size']) * .625;
            if (viewport >= 37.5 && viewport < 60) {
                // logic for 3 thumbnails in a row
                controls.three.next();
                controls.clearAll();
                controls.three.showCurrent();
            } else if (viewport < 37.5) {
                // logic for 2 thumbnails in a row     
                controls.two.next();
                controls.clearAll();
                controls.two.showCurrent();
            }
        });



    }

    responsive() {
        let flags = {
            smallScreen: false,
            biggerScreen: false,
            bigScreen: false
        };
    
        // this is for all
        window.addEventListener("resize", e => {
            let viewport = window.innerWidth / parseFloat(getComputedStyle(document.querySelector('html'))['font-size']) * .625;
            if (viewport >= 60) {
                if (flags.bigScreen === false) {
                    current = 0;
                    controls.showAll();
                    ut.setPropTrueAndRestFalse(flags, "bigScreen");
                }
            } else if (viewport < 37.5) {
                if (flags.smallScreen === false) {
                    current = 0;
                    controls.clearAll()
                    controls.two.showCurrent();
                    ut.setPropTrueAndRestFalse(flags, "smallScreen");
                }
            } else {
                if (flags.biggerScreen === false) {
                    current = 0;
                    controls.clearAll();
                    controls.three.showCurrent();
                    ut.setPropTrueAndRestFalse(flags, "biggerScreen");
                }
            }
    
        })
    }

}

const thumbConts = document.getElementsByClassName("slideshow_thumb_container");
const thumbContsArr = Array.from(thumbConts);

for(let i = 0; i < thumbContsArr.length; i++) {
    let thumb = new ProjectLightbox(thumbContsArr[i], thumbContsArr[i].children[6].children[0], thumbContsArr[i].children[6].children[1]);
}


// const one = new ProjectLightbox(el.projects.thumbCont, el.projects.previous, el.projects.next);
// one.logic();

