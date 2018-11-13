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
    scrollUpArr: document.getElementById("scrollUp")
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

    const overlay_fs = (function () {
        if (document.querySelector(".sidebar")) {
            const archives = new OverlayFullScreen("archives", "archives_menu", "hamburger");
            const categories = new OverlayFullScreen("categories", "categories_menu", "hamburger");
            archives.eventListeners();
            categories.eventListeners();
        }
    }())

})