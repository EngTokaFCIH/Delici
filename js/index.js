let progressBar = document.querySelector('.progress-bar'),
    navEle = document.querySelector('nav.nav'),
    navLinks = navEle.querySelectorAll('.link'),
    popUpNav = document.querySelector('.popup[data-name="side-nav"]'),
    popUpNavLinks = popUpNav.querySelectorAll('.link'),
    prevScroll = window.scrollY,
    sections = document.querySelectorAll('section , Header'),
    prevSlide = document.querySelector(".prev"),
    nextSlide = document.querySelector(".next"),
    layout = document.querySelector(".SC-carousel-inner"),
    slidesArr = Array.from(document.querySelectorAll(".SC-carousel-item")),
    currentSlide = document.querySelector(".SC-carousel-item.active"),
    indicators = document.querySelectorAll('.indicators span'),
    registerForm = document.querySelectorAll("form"),
    // registerInputs = registerForm.querySelectorAll("input"),
    regexInputs = {
        'name': /^(([A-Za-z]{3,})|([A-Za-z]{2}\-[A-Za-z]{3,}))$/,
        'reservationName': /^(([A-Za-z]{3,})|([A-Za-z]{2}\-[A-Za-z]{3,}))$/,
        'email': /^[A-Za-z_]?[A-Za-z_\.]+[0-9]{0,}@(gmail|yahoo)\.(com|org)$/,
        'phone': /^(((02)?01(0|1|2|5)[0-9]{8})|(02)[0-9]{8})$/,
        'seats': /^[1-9]{1,2}$/,
        'date': /^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d$/
    },
    resetIcon = document.querySelector('i[data-name="reset"]'),
    loadingPage = document.querySelector('.loadingPage'),
    searchInput = document.querySelector('#Menu .search-input'),
    currentMenu = BreakFast;

searchInput.addEventListener('input' , search);

let cameraSound = new Audio("Music/irinairinafomicheva-camera-13695.mp3"),
    isAuto = false;

let popupBoxes = document.querySelectorAll(".popup .box");

checkScrolledNav();

sections.forEach(function (section) {
    updateNavLink(section.id);
    updatePopUpLink(section.id);
})

// console.log(slidesArr[0])

// layout.classList.add('layout-animation')
// currentSlide.style.transform = "scale(1.3)"
// setTimeout(function () {
//     currentSlide.style.transform = "scale(1)"
//     layout.classList.remove('layout-animation')
// }, 400)


nextSlide.addEventListener('click', function () {
    layout.classList.add('layout-animation')
    currentSlide.style.transform = "scale(1.1)"
    setTimeout(function () {
        currentSlide.style.transform = "scale(1)"
        layout.classList.remove('layout-animation')
    }, 300)

    setTimeout(function () {
        currentSlide.style.transform = "scale(1)"
        let newSlide = currentSlide.nextElementSibling ?? document.querySelector(".SC-carousel-item:first-child");
        let nextIndicator = document.querySelector(`span[id='${newSlide.dataset.name}']`);

        changeIndicator(nextIndicator);

        if (!isAuto) {
            cameraShutter();
        };
        isAuto = false;

        currentSlide.classList.remove("active");
        newSlide.classList.add("active");

        currentSlide = newSlide;
    }, 300);
})

prevSlide.addEventListener('click', function () {

    layout.classList.add('layout-animation')
    currentSlide.style.transform = "scale(1.1)"
    setTimeout(function () {
        currentSlide.style.transform = "scale(1)"
        layout.classList.remove('layout-animation')
    }, 300)

    setTimeout(function () {
        currentSlide.style.transform = "scale(1)"
        let newSlide = currentSlide.previousElementSibling ?? document.querySelector(".SC-carousel-item:last-child");
        let nextIndicator = document.querySelector(`span[id='${newSlide.dataset.name}']`);

        changeIndicator(nextIndicator);

        if (!isAuto) {
            cameraShutter();
        };
        isAuto = false;

        currentSlide.classList.remove("active");
        newSlide.classList.add("active");

        currentSlide = newSlide;
    }, 300);
})


function changeIndicator(that) {
    let currentIndicator = document.querySelector("span.active");

    currentIndicator.classList.remove("active");
    that.classList.add("active")

    let newIndicator = that,
        indicatorId = that.id;

    let selectedSlide = slidesArr.filter(function (slide) {
        return slide.dataset.name == indicatorId;
    })

    let newSlide = selectedSlide[0]

    let oldSlide = currentSlide;

    layout.classList.add('layout-animation')
    oldSlide.style.transform = "scale(1.1)"

    setTimeout(function () {
        oldSlide.style.transform = "scale(1)"
        currentSlide.classList.remove("active");
        newSlide.classList.add("active");
        currentSlide = newSlide;
        layout.classList.remove('layout-animation')
    }, 300)
}

indicators.forEach(function (indicator) {
    indicator.addEventListener('animationend', function () {
        if (indicator.classList.contains('active')) {
            isAuto = true;
            nextSlide.click();
        }
    })
})

function cameraShutter() {
    cameraSound.currentTime = 0;
    cameraSound.play();
}

popupBoxes.forEach(function (box) {
    box.addEventListener('click', function (e) {
        e.stopPropagation();
    })
})

window.addEventListener('scroll', function () {
    checkScrolledNav();

    let currentScroll = window.scrollY;
    // 2000 - 500 the height of my project - height of my laptop screen 
    maxHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (currentScroll > prevScroll) {
        navEle.classList.add('hide');
    } else if (prevScroll > currentScroll) {
        navEle.classList.remove('hide');
    }

    prevScroll = currentScroll;

    let progress = maxHeight > 0 ? (currentScroll / maxHeight) * 100 : 0;

    progressBar.style.width = `${progress}%`

    sections.forEach(function (section) {
        updateNavLink(section.id);
        updatePopUpLink(section.id);
    })
});

navLinks.forEach(function (navLink) {
    navLink.addEventListener('click', function (e) {
        e.preventDefault();

        let currentNavLink = navEle.querySelector('.link.active'),
            newId = navLink.getAttribute('href'),
            // we did not delete # from id as #About-Us means select element that have id About-Us (# in css means id , . means class)
            newSection = document.querySelector(newId),
            topOfSection = newSection.offsetTop + navEle.clientHeight - 5 * 16;

        currentNavLink.classList.remove('active');
        navLink.classList.add('active');

        window.scrollTo({
            top: topOfSection,
            left: 0,
            
        })
    })
})

popUpNavLinks.forEach(function (navLink) {
    navLink.addEventListener('click', function (e) {
        e.preventDefault();

        let currentNavLink = popUpNav.querySelector('.link.active'),
            newId = navLink.getAttribute('href'),
            // we did not delete # from id as #About-Us means select element that have id About-Us (# in css means id , . means class)
            newSection = document.querySelector(newId),
            topOfSection = newSection.offsetTop;

        currentNavLink.classList.remove('active');
        navLink.classList.add('active');

        window.scrollTo({
            top: topOfSection,
            left: 0,

        })

    })
})

showMenu(BreakFast);

window.onload = function(){
    loadingPage.classList.add('fixed');
    setTimeout(function(){
        loadingPage.classList.add('show');
    },0)

    let body = document.querySelector('body');

    setTimeout(function(){
        loadingPage.classList.remove('show');
        loadingPage.classList.add('d-none')
        body.classList.add('scroll')
        loadingPage.classList.remove('fixed');
    },400000) 
}




































// -------------------------------------------additional information----------------------------------------

// "document.documentElement.scrollHeight" gets the total height of the entire HTML page, including the content that is not currently visible on the screen.

// "window.innerHeight" gets the height of the visible browser window.

// Subtracting them gives the maximum scrollable distance.

// Example: "2000 - 500 = 1500px"
// window: Represents the browser window and provides information about the visible area and scrolling.

// document: Represents the HTML document and allows us to access and modify HTML elements.

// document.documentElement: Represents the root <html> element of the document.