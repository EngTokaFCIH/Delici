function checkScrolledNav() {
    let currentScroll = window.scrollY;

    if (window.scrollY > 10) {
        navEle.classList.add('scrolled')
    } else {
        navEle.classList.remove('scrolled')
    }
}

function updateNavLink(sectionId) {
    let section = document.querySelector(`#${sectionId}`),
        sectionTop = section.offsetTop,
        sectionHeight = section.clientHeight,
        sectionBottom = sectionTop + sectionHeight,
        currentNavLink = navEle.querySelector('.link.active');
    if (window.scrollY > sectionTop && window.scrollY < sectionBottom) {
        let sectionId = section.getAttribute('id'),
            navLinkOfNewSection = navEle.querySelector(`a[href="#${sectionId}"]`);

        currentNavLink.classList.remove('active');
        navLinkOfNewSection.classList.add('active');
    }
}

function updatePopUpLink(sectionId) {
    let section = document.querySelector(`#${sectionId}`),
        sectionTop = section.offsetTop,
        sectionHeight = section.clientHeight,
        sectionBottom = sectionTop + sectionHeight,
        currentNavLink = popUpNav.querySelector('.link.active');
    if (window.scrollY > sectionTop && window.scrollY < sectionBottom) {
        let sectionId = section.getAttribute('id'),
            navLinkOfNewSection = popUpNav.querySelector(`a[href="#${sectionId}"]`);

        currentNavLink.classList.remove('active');
        navLinkOfNewSection.classList.add('active');
    }
}

function openPopup(popupName) {
    let selectedPopup = document.querySelector(`.popup[data-name='${popupName}']`);

    selectedPopup.classList.add('active');
    setTimeout(function () {
        selectedPopup.classList.add('show')
    }, 1);
}

function closePopup() {
    let selectedPopup = document.querySelector(`.popup.active`);

    selectedPopup.classList.remove('show');
    setTimeout(function () {
        selectedPopup.classList.remove('active')
    }, 1000);
}

/**to check input if it empty or data is invalid pr data is valid ---- i call it from html*/
function checkInput(input) {
    let form = input.closest('form'),
        resetIcon = form.querySelector('i[data-name="reset"]');
    resetIcon.classList.remove('d-none');

    let inputName = input.name,
        inputValue = input.value.trim(),
        //comparison operator 
        isEmpty = inputValue === "",
        errorEle = document.querySelector(`span.alert-validate[data-error-name="${inputName}"]`);
    isInValid = !regexInputs[inputName].test(inputValue),
        errorMsg = "";

    input.value = input.value.trim();
    if (isEmpty) {
        errorEle.textContent = "This field is required.";
    } else if (isInValid) {
        if (inputName == 'name') {
            errorEle.textContent = "Enter letters only.";
        } else if (inputName == 'reservationName') {
            errorEle.textContent = "Enter letters only.";
        } else if (inputName == 'email') {
            errorEle.textContent = "Invalid email address.";
        } else if (inputName == 'phone') {
            errorEle.textContent = "Enter a valid Egyptian phone number.";
        } else if (inputName == 'seats') {
            errorEle.textContent = "Available seats from 1 to 15";
        }

    } else if (inputName == 'date') {
        let selectedDateTime = new Date(inputValue);
        let now = new Date();

        let selectedHours = selectedDateTime.getHours(),
            selectedMinutes = selectedDateTime.getMinutes();

        let isFuture = selectedDateTime > now;

        let isValidTime = selectedHours >= 7 && (selectedHours < 21 || (selectedHours === 21 && selectedMinutes === 0));

        if (!isValidTime || !isFuture) {
            errorEle.textContent = "Future time today (7 AM : 9 PM).";
        }
    }

    if (isEmpty || isInValid ||
        (inputName == 'date' &&
            (new Date(inputValue) <= new Date() ||
                new Date(inputValue).getHours() < 7 ||
                new Date(inputValue).getHours() > 21 ||
                (new Date(inputValue).getHours() === 21 &&
                    new Date(inputValue).getMinutes() !== 0)))) {
        // *incorrect
        input.classList.add("is-invalid");
        errorEle.classList.remove("d-none");
    } else {
        // *correct
        input.classList.remove("is-invalid");
        errorEle.classList.add("d-none");
    }

}

function resetForm(resetButton) {
    let registerForm = resetButton.closest('form')
    registerForm.reset();

    let registerInputs = registerForm.querySelectorAll('input');
    registerInputs.forEach(function (input) {
        errorEle = document.querySelector(`span.alert-validate[data-error-name="${input.name}"]`);
        if (input.classList.contains('is-invalid')) {
            input.classList.remove("is-invalid");
        }

        errorEle.classList.add('d-none')
        resetButton.classList.add('d-none')
    })
}

function submitForm(that, e) {
    // registerForm.forEach(function (form) {
    // that.addEventListener("submit", function (e) {
    /**we stop the work of that so we will take data from inputs to check it by myself */
    e.preventDefault();

    let invalidInput = that.querySelector("input.is-invalid");
    if (invalidInput != null) {
        invalidInput.blur();
        return;
    }

    let registerInputs = that.querySelectorAll('input');

    // *to control the action of enter key
    for (let input of registerInputs) {
        if (input.value == "") {
            input.focus();
            return;
        }
        else if (input.value != "") {
            input.blur();
        }
    }

    registerInputs.forEach(function (input, index) {
        input.addEventListener("keydown", function (e) {
            if (e.key == "Enter") {
                if (registerInputs[index].value == "") {
                    registerInputs[index].focus();
                } else {
                    if (registerInputs[index + 1] && registerInputs[index + 1].value == "") {
                        e.preventDefault();
                        registerInputs[index + 1]?.focus()
                    }
                    else if (registerInputs[index + 1] && registerInputs[index + 1].value != "") {
                        emptyInput = that.querySelector("input")
                        if (emptyInput.value == "") {
                            emptyInput.focus();
                        }
                    }
                }
            }
        })
    })

    if (registerInputs[registerInputs.length - 1]) {
        console.log('ok')
        e.preventDefault();
        registerInputs[registerInputs.length - 1].blur();
        return;
    }

    resetIcon.classList.add('d-none');
    that.reset();
    // });
    // })

}

// function changeActive(that , e){
//     e.preventDefault();

//     let links = that.closest('.links'),
//     currentActive = links.querySelector('a.active'),
//     currentActiveId = currentActive.getAttribute('href'),
//     newActiveId = that.getAttribute('href'),
//     currentPane = document.querySelector(`${currentActiveId}`),
//     newPane = document.querySelector(`#Menu .row.pane`);
//     newPane.id = newActiveId.split('#');
//     console.log(currentPane)
//     console.log(newPane)
//     console.log(newPane.id)

//     // showMenu(newActiveId);

//     window.onload = function(){
//         currentPane.classList.add('move')
//     }
//     if(newPane.classList.contains('move')){
//         newPane.classList.remove('move')
//     }
//     console.log(currentPane);

//     currentPane.classList.add('d-none');
//     currentActive.classList.remove('active');
//     that.classList.add('active');
//     newPane.classList.remove('d-none');
//     setTimeout(function(){
//         newPane.classList.add('move');
//     }, 100)
// }

function changeActive(typeOfMeal, that, e) {
    e.preventDefault();

    let links = that.closest('.links'),
        currentActive = links.querySelector('a.active');

    currentActive.classList.remove('active');
    that.classList.add('active');

    if (typeOfMeal == 'BreakFast') {
        currentMenu = BreakFast;
    } else if (typeOfMeal == 'Lunch') {
        currentMenu = Lunch;
    } else if (typeOfMeal == 'Dinner') {
        currentMenu = Dinner;
    } else if (typeOfMeal == 'Drinks') {
        currentMenu = Drinks;
    }

    showMenu(currentMenu)

    let row = document.querySelector('#Menu .pane');

    if (row.classList.contains('move')) {
        row.classList.remove('move')
    }

    setTimeout(function () {
        row.classList.add('move')

    }, 100)
}

function showMenu(typeOfMeal) {
    let part = document.querySelectorAll('#Menu .part .item');
    part[0].innerHTML = '';
    part[1].innerHTML = '';

    typeOfMeal.forEach(function (meal, index) {
        if (index < ((typeOfMeal.length) / 2)) {
            part[0].innerHTML += `
                            <div class="box">
                                <div class="row column-gap-lg-4 column-gap-0 justify-content-center align-items-center flex-nowrap">
                                <div class="col-lg-2 p-xl-0 d-flex align-items-center justify-content-center">
                                    <div class="br-img d-flex justify-content-center rounded-4 position-relative">
                                        <img src="./images/${meal.images[0]}" class="img-flui" alt="Break Fast">
                                        <div class="layout position-absolute">
                                            <i class="fa-regular fa-square-plus" onclick="openPopup('menu') , openPopupMeal(${meal.id})"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-10 content d-flex align-items-start justify-content-center flex-column" title="">
                                    <div class="headline d-flex flex-column row-gap-2 flex-sm-row row-gap-lg-0">
                                        <h3 class="name pe-0 pe-sm-2">${meal.name}</h3>
                                        <div class="line-between d-none d-sm-block"></div>
                                        <h3 class="price ps-sm-2 ps-0">${meal.price}</h3>
                                    </div>
                                    <div class="description">
                                        <p>${meal.description.slice(0, 60)}</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                            `
        } else if (index > 2 && index < typeOfMeal.length) {
            part[1].innerHTML += `
                            <div class="box">
                                <div class="row column-gap-lg-4 column-gap-0 justify-content-center align-items-center flex-nowrap">
                                <div class="col-lg-2 p-xl-0 d-flex align-items-center justify-content-center">
                                    <div class="br-img d-flex justify-content-center rounded-4 position-relative">
                                        <img src="./images/${meal.images[0]}" class="img-flui" alt="Break Fast">
                                        <div class="layout position-absolute">
                                            <i class="fa-regular fa-square-plus" onclick="openPopup('menu') , openPopupMeal(${meal.id})"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-10 content d-flex align-items-start justify-content-center flex-column" title="">
                                    <div class="headline d-flex flex-column row-gap-2 flex-sm-row row-gap-lg-0">
                                        <h3 class="name pe-0 pe-sm-2">${meal.name}</h3>
                                        <div class="line-between d-none d-sm-block"></div>
                                        <h3 class="price ps-sm-2 ps-0">${meal.price}</h3>
                                    </div>
                                    <div class="description">
                                        <p>${meal.description.slice(0, 60)}</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                        `
        }
    })

}

function openPopupMeal(mealId) {
    let content = document.querySelector('.popup[data-name="menu"] .box .content');

    let meal = allMenu.find(function (item) {
        return item.id === mealId
    })

    content.innerHTML = "";
    content.innerHTML = ` 
                            <h3 class="display-6 text-light">${meal.name}</h3>
                            <div class="image-menu-popup rounded-3">
                                <img src="images/${meal.images[0]}" class="img-fluid" alt="">
                                <button class="btn menu-next" onclick="nextMeal(${meal.id}, '${meal.type}')"><i class="fa-solid fa-angle-right"></i></button>
                                <button class="btn menu-prev" onclick="prevMeal(${meal.id}, '${meal.type}')"><i class="fa-solid fa-angle-left"></i></button>
                                <div class="price rounded-start">${meal.price}</div>
                            </div>
                            <p class="description">${meal.description}</p>
                        `
}

function nextMeal(mealId, typeOfMeal) {
    let meals = {
        'BreakFast': BreakFast,
        'Lunch': Lunch,
        'Dinner': Dinner,
        'Drinks': Drinks
    },
        currentMeals = meals[typeOfMeal];

    let currentIndex = currentMeals.findIndex(function (item) {
        return item.id === mealId
    })

    let nextIndex = (currentIndex + 1) % currentMeals.length;

    let nextMeal = currentMeals[nextIndex];

    openPopupMeal(nextMeal.id)
}

function prevMeal(mealId, typeOfMeal) {
    let meals = {
        'BreakFast': BreakFast,
        'Lunch': Lunch,
        'Dinner': Dinner,
        'Drinks': Drinks
    },
        currentMeals = meals[typeOfMeal];

    let currentIndex = currentMeals.findIndex(function (item) {
        return item.id === mealId
    })

    let prevIndex = (currentIndex - 1 + currentMeals.length) % currentMeals.length;

    let prevMeal = currentMeals[prevIndex];

    openPopupMeal(prevMeal.id)
}

function search() {
    let value = searchInput.value.toLowerCase().trim(),
        noResult = document.querySelector('#Menu #noResult'),
        lineInMiddle = document.querySelector('.line-in-middle'),
        parts = document.querySelectorAll('#Menu .part'),
        cancelSearch = document.querySelector('.cancel-search');

    let result = currentMenu.filter(function (meal) {
        return meal.name.toLowerCase().includes(value);
    })

    cancelSearch.classList.remove('d-none')

    if (result.length === 0) {
        noResult.classList.remove('d-none');
        lineInMiddle.classList.add('d-none');
        lineInMiddle.classList.remove('d-lg-block');
        parts.forEach(function (part) {
            part.classList.add('d-none')
        })
    } else {
        noResult.classList.add('d-none');
        lineInMiddle.classList.remove('d-none');
        lineInMiddle.classList.add('d-lg-block');
        parts.forEach(function (part) {
            part.classList.remove('d-none')
        })
    }

    showMenu(result);
}

function cancelSearch(that){
    let input = document.querySelector('input.search-input')

    input.value = '';

    that.classList.add('d-none');

    search()
}