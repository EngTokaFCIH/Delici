function checkScrolledNav(){
    let currentScroll = window.scrollY;

    if(window.scrollY > 10){
        navEle.classList.add('scrolled')
    }else{
        navEle.classList.remove('scrolled')
    }
}

function updateNavLink(sectionId){
    let section = document.querySelector(`#${sectionId}`),
    sectionTop = section.offsetTop,
    sectionHeight = section.clientHeight,
    sectionBottom = sectionTop + sectionHeight,
    currentNavLink = navEle.querySelector('.link.active');
    if(window.scrollY > sectionTop && window.scrollY < sectionBottom){
        let sectionId = section.getAttribute('id'),
        navLinkOfNewSection = navEle.querySelector(`a[href="#${sectionId}"]`);

        currentNavLink.classList.remove('active');
        navLinkOfNewSection.classList.add('active');
    }
}

function updatePopUpLink(sectionId){
    let section = document.querySelector(`#${sectionId}`),
    sectionTop = section.offsetTop,
    sectionHeight = section.clientHeight,
    sectionBottom = sectionTop + sectionHeight,
    currentNavLink = popUpNav.querySelector('.link.active');
    if(window.scrollY > sectionTop && window.scrollY < sectionBottom){
        let sectionId = section.getAttribute('id'),
        navLinkOfNewSection = popUpNav.querySelector(`a[href="#${sectionId}"]`);

        currentNavLink.classList.remove('active');
        navLinkOfNewSection.classList.add('active');
    }
}

function openPopup(popupName){
    let selectedPopup = document.querySelector(`.popup[data-name='${popupName}']`);

    selectedPopup.classList.add('active');
    setTimeout(function(){
        selectedPopup.classList.add('show')
    }, 1);
}

function closePopup(){
    let selectedPopup = document.querySelector(`.popup`);

    selectedPopup.classList.remove('show');
    setTimeout(function(){
        selectedPopup.classList.remove('active')
    }, 1000);
}