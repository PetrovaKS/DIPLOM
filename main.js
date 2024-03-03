let catalogEl = document.querySelector('.catalog_opened_filters .catalog');

// Модальное окно подписки, всплывает 2 раза: через 5 сек и через 2 минуты
// второй раз отсчет времени ведется с момента загрузки страницы, как сделать так, чтобы время шло не зависимо от того, сколько страниц загружаем

let modalWindowSubscribeEl = document.querySelector('.dark_window_subscribe');

if (!sessionStorage.getItem('counterOpenWindow')) {
    setTimeout (() => {
        modalWindowSubscribeEl.style.display='flex';
        window.sessionStorage.setItem('counterOpenWindow', '1');
    }, 5000);
}

if (sessionStorage.getItem('counterOpenWindow') == '1') {
    setTimeout (() => {
        modalWindowSubscribeEl.style.display='flex';
        window.sessionStorage.setItem('counterOpenWindow', '2');
    }, 15000);
}


// закрытие модальных окон всех

let closeIconEl = document.querySelectorAll('.close_icon');  

for (let i = 0; i < closeIconEl.length; i++) {
    closeIconEl[i].addEventListener('click', function () {
        modalWindowSubscribeEl.style.display = 'none';
        modalWindowLocationEl.style.display = 'none';
        // При закрытии модального окна разрешаем прокрутку
        document.body.style.overflow = '';
    })
}


// открытие модального окна геолокации

let modalWindowLocationEl = document.querySelector('.dark_window_location')
let locationEl = document.querySelectorAll('.location');

locationEl.forEach((item) => {
    item.addEventListener('click', () => {
        modalWindowLocationEl.style.display = 'flex';
        // Блокируем прокрутку body
        document.body.style.overflow = 'hidden';
    })
})



// выбор города в геолокации

let chooseCityEl = document.querySelector('.input_city');
let chooseCityBtnEl = document.querySelector('.choose_city_btn');
let choosedLocationEl = document.querySelectorAll('.choosed_location');

let footerEkatEl = document.querySelector('.footer_ekat');
let footerRegionEl = document.querySelector('.footer_region');

let deliveryEkbEl = document.querySelector('.delivery_ekb');
let deliveryRegionEl = document.querySelector('.delivery_region');

let contactsEkbEl = document.querySelector('.contacts_ekb');
let contactsRegionEl = document.querySelector('.contacts_region');

choosedLocationEl.forEach((item) => item.textContent = window.localStorage.getItem('city'));


checkCity();

function checkCity() {
    // изменение футера, контактов и раздела доставки в зависимости от города
    if (window.localStorage.getItem('city') == 'ЕКАТЕРИНБУРГ') {
        footerRegionEl.classList.add('inactive');
        footerEkatEl.classList.remove('inactive');

        if (deliveryRegionEl || deliveryEkbEl) {
        deliveryRegionEl.classList.add('inactive');
        deliveryEkbEl.classList.remove('inactive');
        }

        if (contactsRegionEl || contactsEkbEl) {
        contactsRegionEl.classList.add('inactive');
        contactsEkbEl.classList.remove('inactive');
        }
    }
    else {
        footerRegionEl.classList.remove('inactive');
        footerEkatEl.classList.add('inactive');

        if (deliveryRegionEl || deliveryEkbEl) {
            deliveryRegionEl.classList.remove('inactive');
            deliveryEkbEl.classList.add('inactive');
        }

        if (contactsRegionEl || contactsEkbEl) {
            contactsRegionEl.classList.remove('inactive');
            contactsEkbEl.classList.add('inactive');
        }
    }
}

function getCityName() {
    if (chooseCityEl.value) {
        choosedLocationEl.forEach((item) => item.textContent = '');
        choosedLocationEl.forEach((item) => item.textContent = chooseCityEl.value.toUpperCase());
        modalWindowLocationEl.style.display = 'none';
        document.body.style.overflow = '';
        window.localStorage.setItem('city', chooseCityEl.value.toUpperCase());
        chooseCityEl.value = '';
    };
}

if (chooseCityEl) {
    chooseCityEl.addEventListener("input", () => {
        chooseCityEl.value = chooseCityEl.value.replace(/[0-9a-zA-Z]/g, "");
    });
    
    chooseCityBtnEl.addEventListener('click', () => {
        getCityName();
        checkCity();
    })

    document.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            getCityName();
        }
    })
}

// открытие главного всплывающего меню женщины / мужчины

let navMenuWomenEl = document.querySelector('.nav_menu__women');
let dropdownMenuWomenEl = document.querySelector('#dropdown_menu_women');

let navMenuMenEl = document.querySelector('.nav_menu__men');
let dropdownMenuMenEl = document.querySelector('#dropdown_menu_men');

navMenuWomenEl.addEventListener('click', function () {

    if (dropdownMenuWomenEl.classList.contains('dropdown--active')) {
        dropdownMenuWomenEl.classList.remove('dropdown--active');
        navMenuWomenEl.classList.remove('nav_menu--active');
        dropdownMenuWomenEl.classList.add('dropdown--inactive');
    }
    else {
        dropdownMenuWomenEl.classList.remove('dropdown--inactive');
        dropdownMenuWomenEl.classList.add('dropdown--active');
        navMenuWomenEl.classList.add('nav_menu--active');
        dropdownMenuMenEl.classList.remove('dropdown--active');
        navMenuMenEl.classList.remove('nav_menu--active');
    };

});

navMenuMenEl.addEventListener('click', function (e) {

    if (dropdownMenuMenEl.classList.contains('dropdown--active')) {
        dropdownMenuMenEl.classList.remove('dropdown--active');
        navMenuMenEl.classList.remove('nav_menu--active');
        dropdownMenuMenEl.classList.add('dropdown--inactive');
    }
    else {
        dropdownMenuMenEl.classList.remove('dropdown--inactive');
        dropdownMenuWomenEl.classList.remove('dropdown--active');
        navMenuWomenEl.classList.remove('nav_menu--active');
        dropdownMenuMenEl.classList.add('dropdown--active')
        navMenuMenEl.classList.add('nav_menu--active');
    }

});

document.addEventListener('click', outsideDropdownMenu);

function outsideDropdownMenu(e) {
    if (e.target === dropdownMenuMenEl || e.target === dropdownMenuWomenEl || dropdownMenuWomenEl.contains(e.target) || dropdownMenuMenEl.contains(e.target) || e.target === navMenuWomenEl || e.target === navMenuMenEl) {
        return;
    }
    dropdownMenuMenEl.classList.remove('dropdown--inactive');
    dropdownMenuWomenEl.classList.remove('dropdown--inactive');
    dropdownMenuWomenEl.classList.remove('dropdown--active');
    dropdownMenuMenEl.classList.remove('dropdown--active');
    navMenuMenEl.classList.remove('nav_menu--active');
    navMenuWomenEl.classList.remove('nav_menu--active');
}


// catalog_inner_sections_panel.html hover на разделы каталога

let shareCatalogEl = document.querySelectorAll('.catalog_inner_sections .main_text_title');

for (let i = 0; i < shareCatalogEl.length; i++) {

    shareCatalogEl[i].addEventListener('mouseenter', () => {
        for (let j = 0; j < shareCatalogEl.length; j++) {
            if (j != i) {
                shareCatalogEl[j].classList.add('main_text_addit_title');
            }
        }
    })

    shareCatalogEl[i].addEventListener('mouseleave', () => {
        for (let j = 0; j < shareCatalogEl.length; j++) {
            if (j != i) {
                shareCatalogEl[j].classList.remove('main_text_addit_title');
            }
        }
    })

}

// // сортировка выпадает по клику

if (document.querySelector('.sort_title')) {  //проверяем, есть ли сортировка на странице
    let sortingEl = document.querySelector('.sort_title');
    let sortingDropdownEl = document.querySelector('.sorting_dropdown');

    sortingEl.addEventListener('click', () => {
        if (sortingDropdownEl.classList.contains('sorting_dropdown_show')) {
            sortingDropdownEl.classList.remove('sorting_dropdown_show');
            sortingDropdownEl.style.display = '';
        }
        else {
            sortingDropdownEl.classList.add('sorting_dropdown_show');
            sortingDropdownEl.style.display = 'flex';
        }
    });

    // назначается значение выбранного из списка сортировки

    let sortingItemsEl = document.querySelectorAll('.sorting_item');
    let sortingPropertyEl = document.querySelector('.sorting_property');
    let selectedSortEl = document.querySelector('.selected_sort');

    let selectedSortingElement = window.sessionStorage.getItem('selectedSortingElement') || 'СОРТИРОВКА';
    sortingPropertyEl.style.display = 'none';
    selectedSortEl.textContent = selectedSortingElement;

    for (let i = 0; i < sortingItemsEl.length; i++) {
        sortingItemsEl[i].addEventListener('click', () => {
            sortingPropertyEl.style.display = 'none';
            selectedSortEl.textContent = '';
            selectedSortEl.textContent = sortingItemsEl[i].textContent;

            sortingItemsEl[i].closest('.sorting_dropdown').classList.remove('sorting_dropdown_show');
            sortingItemsEl[i].closest('.sorting_dropdown').style.display = '';

            window.sessionStorage.setItem('selectedSortingElement', selectedSortEl.textContent);
        })
    }
}

// фильтр каталога одежды: скрытие и открытие разделов и всего фильтра

let hideFiltersEl = document.querySelector('.hide_filters');
let showFiltersEl = document.querySelector('.show_filters');
let hideFiltresDivEl = document.querySelector('.hide_filtres')
let sidePanelFiltersEl = document.querySelector('.side_panel_filters');

if (document.querySelector('.hide_filters') || document.querySelector('.show_filters')) {  //проверяем, есть ли фильтры на странице

    hideFiltresDivEl.addEventListener('click', () => {
        sidePanelFiltersEl.classList.toggle('inactive');

        hideFiltersEl.classList.toggle('inactive');
        hideFiltersEl.classList.toggle('active');
        showFiltersEl.classList.toggle('inactive');
        showFiltersEl.classList.toggle('active');

    })


    let filterArrowOpenedEl = document.querySelectorAll('.filter_arrow_opened');
    let filterArrowClosedEl = document.querySelectorAll('.filter_arrow_closed');
    let filterSectionItemsEl = document.querySelectorAll('.filter_section_items');


    for (let i = 0; i < filterArrowOpenedEl.length; i++) {
        filterArrowOpenedEl[i].addEventListener('click', () => {
            filterSectionItemsEl[i].style.display = 'none';
            filterArrowOpenedEl[i].style.display = 'none';
            filterArrowClosedEl[i].style.display = 'block';
        })
    }

    for (let i = 0; i < filterArrowClosedEl.length; i++) {
        filterArrowClosedEl[i].addEventListener('click', () => {
            filterSectionItemsEl[i].style.display = 'flex';
            filterArrowOpenedEl[i].style.display = 'block';
            filterArrowClosedEl[i].style.display = 'none';
        })
    }

    // фильтр каталога одежды: выбор и очистка чекбоксов

    let checkboxFiltresGroupEl = document.querySelectorAll('.side_panel_filters .сustom_сheckbox');
    let applyFiltersButtonEl = document.querySelector('.apply_filters');
    let activeFiltersPanelEl = document.querySelector('.active_filters');
    let clearFiltersAllButtonEl = document.querySelector('.clear_filters_all');
    let checkedFilters = [];

    // выгрузили из local storage сохраненный массив активных фильтров
    let checkedFiltersValue = window.sessionStorage.getItem('checkedFiltersValue') || '[]';
    checkedFiltersValue = JSON.parse(checkedFiltersValue);
    console.log(checkedFiltersValue)

    //отметили чекбоксы после перезагрузки
    for (let i = 0; i < checkboxFiltresGroupEl.length; i++) {
        for (let j = 0; j < checkedFiltersValue.length; j++) {
            if (checkboxFiltresGroupEl[i].value == checkedFiltersValue[j]) {
                checkboxFiltresGroupEl[i].checked = true;
            }
        }
    }

    filterProducts();

    function filterProducts() {
        checkedFiltersValue = [];
        checkedFilters = [];
        activeFiltersPanelEl.textContent = '';

        for (let i = 0; i < checkboxFiltresGroupEl.length; i++) {
            if (checkboxFiltresGroupEl[i].checked) {
                checkedFilters.push(checkboxFiltresGroupEl[i]);
                checkedFiltersValue.push(checkboxFiltresGroupEl[i].value);
            };
        };

        checkedFiltersValue.forEach((item) => {
            activeFiltersPanelEl.insertAdjacentHTML('beforeend', 
            `<div class="active_filters__item">
                <p class="small_text uppercase">${item}</p>
                <div class="delete_filter_item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5.33316 15.2565L4.74316 14.6665L9.40983 9.99983L4.74316 5.33316L5.33316 4.74316L9.99983 9.40983L14.6665 4.74316L15.2565 5.33316L10.5898 9.99983L15.2565 14.6665L14.6665 15.2565L9.99983 10.5898L5.33316 15.2565Z" fill="#393939"/>
                    </svg>
                </div>
            </div>`)
        });

        window.sessionStorage.setItem('checkedFiltersValue', JSON.stringify(checkedFiltersValue));

        // удаление категории при нажатии крестика
        let deleteFilterItemGroupEl = document.querySelectorAll('.delete_filter_item');

        for (let i = 0; i < deleteFilterItemGroupEl.length; i++) {
            deleteFilterItemGroupEl[i].addEventListener('click', () => {
            checkedFilters[i].checked = false;
            filterProducts();
            });
        }

        if (window.screen.width < 767) {
            sidePanelFiltersEl.classList.remove('active');
            catalogEl.classList.remove('inactive');
        }
    }

    // нажатие кнопки применить
    applyFiltersButtonEl.addEventListener('click', filterProducts);

    // нажатие кнопки очистить все
    clearFiltersAllButtonEl.addEventListener('click', () => {
        checkboxFiltresGroupEl.forEach((item) => {
            item.checked = false;
        });
        activeFiltersPanelEl.textContent = '';
        checkedFiltersValue = [];
        window.sessionStorage.setItem('checkedFiltersValue', JSON.stringify(checkedFiltersValue));

        if (window.screen.width < 767) {
            sidePanelFiltersEl.classList.remove('active');
            catalogEl.classList.remove('inactive');
        }
    })
}


// раскрытие условий возврата товара

let refundConditionVisibleGroupEl = document.querySelectorAll('.refund_condition__visible');
let refundConditionHiddenGroupEl = document.querySelectorAll('.refund_condition__hidden');
let refundOpenedArrowGroupEl = document.querySelectorAll('.refund_opened_arrow');
let refundClosedArrowGroupEl = document.querySelectorAll('.refund_closed_arrow');

for (let i = 0; i < refundConditionVisibleGroupEl.length; i++) {
    refundConditionVisibleGroupEl[i].addEventListener('click', () => {

        if (refundConditionHiddenGroupEl[i].classList.contains('refund_condition--active')) {
            refundConditionHiddenGroupEl[i].classList.remove('refund_condition--active');
            refundConditionHiddenGroupEl[i].style.display = 'none';
            refundClosedArrowGroupEl[i].style.display = 'flex';
            refundOpenedArrowGroupEl[i].style.display = 'none';
        }
        else {
            refundConditionHiddenGroupEl[i].classList.add('refund_condition--active');
            refundConditionHiddenGroupEl[i].style.display = 'flex';
            refundClosedArrowGroupEl[i].style.display = 'none';
            refundOpenedArrowGroupEl[i].style.display = 'flex';
        }
    })
}


// открытие таблицы размеров в карточке товара

let sizeChartEl = document.querySelector('.size_chart');
let sizeChartTableEl = document.querySelector('.size_chart__table');

if (document.querySelector('.size_chart')) {
    sizeChartEl.addEventListener('click', () => {
        sizeChartTableEl.classList.toggle('size_chart--active')
    })
}

// карточка товара - раскрытие опций


let optionInfoRowGroupEl = document.querySelectorAll('.option .info_row');
let optionItemGroupEl = document.querySelectorAll('.option_item')
let optionProductOpenedArrowGroupEl = document.querySelectorAll('.option_product_opened_arrow');
let optionProductClosedArrowGroupEl = document.querySelectorAll('.option_product_closed_arrow');

for (let i = 0; i < optionInfoRowGroupEl.length; i++) {
    optionInfoRowGroupEl[i].addEventListener('click', () => {
        if (optionItemGroupEl[i].classList.contains('option--active')) {
            optionItemGroupEl[i].classList.remove('option--active');
            optionItemGroupEl[i].classList.add('option--inactive');
            optionProductOpenedArrowGroupEl[i].classList.add('option--inactive');
            optionProductClosedArrowGroupEl[i].classList.remove('option--inactive');
        }
        else {
            optionItemGroupEl[i].classList.add('option--active');
            optionItemGroupEl[i].classList.remove('option--inactive');
            optionProductOpenedArrowGroupEl[i].classList.remove('option--inactive');
            optionProductClosedArrowGroupEl[i].classList.add('option--inactive');
        }
    })
}

// карточка товара

    let colorPickerGroupEl = document.querySelectorAll('.color_picker');
    let colorNameGroupEl = document.querySelectorAll('.color_name');
    let colorChoosedImgEl = document.querySelector('.color_choosed_img');
    let colorChoosedNameEl = document.querySelector('.color_choosed_name');
    let colorDetailsEl = document.querySelector('.color_details');
    let colorOpenedArrowEl = document.querySelector('.color_opened_arrow');
    let colorClosedArrowEl = document.querySelector('.color_closed_arrow');

    let sizeChoiceGroupEl = document.querySelectorAll('.option .size_choice');
    let sizeChoosedEl = document.querySelector('.size_choosed');
    let sizeRowEl = document.querySelector('.size_row');
    let sizeOpenedArrowEl = document.querySelector('.size_opened_arrow');
    let sizeClosedArrowEl = document.querySelector('.size_closed_arrow');

    let choosedColorImg; // понять, как извлечь картинку из LS
    let choosedColorName = window.localStorage.getItem('choosedColorName');
    let choosedSizeName = window.localStorage.getItem('choosedSizeName');

    let addToBasketBtnEl = document.querySelector('.add_to_basket_btn');
    let inBasketEl = document.querySelector('.btn_in_basket');

    let pushedBtnInBasket = window.localStorage.getItem('pushedBtnInBasket') || 'false';

if (colorChoosedNameEl) {

    function changeBtnOnProductPage(flag) {  // нажата или нет кнопка Добавить в корзину
        if (flag == 'true') {
            addToBasketBtnEl.style.display = 'none';
            inBasketEl.style.display = 'flex';
        }
        else {
            addToBasketBtnEl.style.display = 'flex';
            inBasketEl.style.display = 'none';
        }
    }

    if (choosedColorName != '' && choosedSizeName != '') {  // выгружаем данные при перезагрузке страницы
        // colorChoosedImgEl.append(choosedColorImg);
        colorChoosedNameEl.textContent = choosedColorName;
        
        colorDetailsEl.classList.add('option--inactive');
        colorDetailsEl.classList.remove('option--active');
        colorOpenedArrowEl.classList.add('option--inactive');
        colorClosedArrowEl.classList.remove('option--inactive');

        sizeChoosedEl.textContent = choosedSizeName;

        sizeRowEl.classList.add('option--inactive');
        sizeRowEl.classList.remove('option--active');
        sizeOpenedArrowEl.classList.add('option--inactive');
        sizeClosedArrowEl.classList.remove('option--inactive');

        changeBtnOnProductPage(pushedBtnInBasket);
    }


    // карточка товара - выбор цвета

    for (let i = 0; i < colorPickerGroupEl.length; i++) {
        colorPickerGroupEl[i].addEventListener('click', () => {
            colorChoosedImgEl.textContent = '';
            colorChoosedNameEl.textContent = '';

            pushedBtnInBasket = 'false';
            window.localStorage.setItem('pushedBtnInBasket', pushedBtnInBasket);
            changeBtnOnProductPage(pushedBtnInBasket);

            choosedColorName = colorNameGroupEl[i].textContent;
            colorChoosedNameEl.textContent = choosedColorName;

            choosedColorImg = colorPickerGroupEl[i].cloneNode(true);
            colorChoosedImgEl.append(choosedColorImg);

            colorDetailsEl.classList.add('option--inactive');
            colorDetailsEl.classList.remove('option--active');
            colorOpenedArrowEl.classList.add('option--inactive');
            colorClosedArrowEl.classList.remove('option--inactive');
        })
    }

    // карточка товара - выбор размера

    let j = 0;
    for (let i = 0; i < sizeChoiceGroupEl.length; i++) {
        sizeChoiceGroupEl[i].addEventListener('click', () => {
            sizeChoosedEl.textContent = '';

            pushedBtnInBasket = 'false';
            window.localStorage.setItem('pushedBtnInBasket', pushedBtnInBasket);
            changeBtnOnProductPage(pushedBtnInBasket);

            choosedSizeName = sizeChoiceGroupEl[i].textContent;
            sizeChoosedEl.textContent = choosedSizeName;

            sizeRowEl.classList.add('option--inactive');
            sizeRowEl.classList.remove('option--active');
            sizeOpenedArrowEl.classList.add('option--inactive');
            sizeClosedArrowEl.classList.remove('option--inactive');

            sizeChoiceGroupEl[i].classList.add('main_text_title');
            sizeChoiceGroupEl[i].classList.remove('main_text_addit_dark');
            sizeChoiceGroupEl[j].classList.remove('main_text_title');
            sizeChoiceGroupEl[j].classList.add('main_text_addit_dark');
            j = i;
        })
    }

    // нажатие кнопки Добавить товар в корзину  и проверка, что цвет и размер выбраны

    let modalWindowAddToBasketEl = document.querySelector('.dark_window_add_to_basket');

    if (document.querySelector('.add_to_basket_btn')) {
        addToBasketBtnEl.addEventListener('click', () => {

            let noChoosedColor = `<div class="red">не выбран цвет товара</div>`;
            let noChoosedSize = `<div class="red">не выбран размер</div>`;
        
            if ((colorChoosedNameEl.textContent == '') && (sizeChoosedEl.textContent == '')) {
                colorChoosedNameEl.insertAdjacentHTML('afterbegin', noChoosedColor);
                sizeChoosedEl.insertAdjacentHTML('afterbegin', noChoosedSize);
            }
            else if ((sizeChoosedEl.textContent == '') || (sizeChoosedEl.textContent == 'не выбран размер')) {
                sizeChoosedEl.textContent = '';
                sizeChoosedEl.insertAdjacentHTML('afterbegin', noChoosedSize);
            }
            else if ((colorChoosedNameEl.textContent == '') || (colorChoosedNameEl.textContent == 'не выбран цвет товара')) {
                colorChoosedNameEl.textContent = '';
                colorChoosedNameEl.insertAdjacentHTML('afterbegin', noChoosedColor);
            }
            else {
                // открываем модальное окно
                modalWindowAddToBasketEl.style.display = 'flex';

                // Блокируем прокрутку body
                document.body.style.overflow = 'hidden';

                // Меняем кнопку
                pushedBtnInBasket = 'true';
                window.localStorage.setItem('pushedBtnInBasket', pushedBtnInBasket);
                changeBtnOnProductPage(pushedBtnInBasket);

                //добавляем выбранные значения в LS
                // window.localStorage.setItem('choosedColorImg', choosedColorImg); // разобраться, как сохранить картинку в LS
                window.localStorage.setItem('choosedColorName', choosedColorName);
                window.localStorage.setItem('choosedSizeName', choosedSizeName);
            }
        }) 
    }

    // закрытие модальных окон всех
 
    console.log(closeIconEl)

    for (let i = 0; i < closeIconEl.length; i++) {
        closeIconEl[i].addEventListener('click', function () {
            modalWindowAddToBasketEl.style.display = 'none';
            document.body.style.overflow = '';
        })
    }

    let turnToShopBtnEl = document.querySelector('.turn_to_shop');

    if (turnToShopBtnEl) {
        turnToShopBtnEl.addEventListener('click', () => {
            modalWindowAddToBasketEl.style.display = 'none';
            document.body.style.overflow = '';
        })
    }
}


// появление кнопки наверх

let btnUpEl = document.querySelector('.btn_up');

window.addEventListener('scroll', () => {
    window.scrollY > 1500 ? btnUpEl.style.display = 'block' : btnUpEl.style.display = '';
})

if (document.querySelector('.btn_up')) {
    document.querySelector('.btn_up').addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
    });
}


// открытие меню мобильной версии

let iconMenuBurgerEl = document.querySelector('.icon_menu__burger');
let iconMenuCloseEl = document.querySelector('.icon_menu__close');
let menuMobileEl = document.querySelector('.menu_mobile');

iconMenuBurgerEl.addEventListener('click', () => {
    iconMenuBurgerEl.style.display = 'none';
    iconMenuCloseEl.style.display = 'flex';
    menuMobileEl.style.transform = 'translateX(100%)';
    document.body.style.overflow = 'hidden';
})

iconMenuCloseEl.addEventListener('click', () => {
    iconMenuBurgerEl.style.display = 'flex';
    iconMenuCloseEl.style.display = 'none';
    menuMobileEl.style.transform = 'translateX(-100%)';
    document.body.style.overflow = '';
    menuMobileCategories.classList.remove('active'); 
    menuMobileCategories.classList.add('inactive'); 
    menuMobileWomenMenEl.classList.add('active');
    menuMobileWomenMenEl.classList.remove('inactive');

})


// открытие 2 уровня мобильного меню

let menuMobileItemGroupEl = document.querySelectorAll('.menu_mobile__women-men .category_part__item');
let menuMobileWomenMenEl = document.querySelector('.menu_mobile__women-men');
let menuMobileCategories = document.querySelector('.menu_mobile__categories');

// if (iconMenuCloseEl) {
    for (let i = 0; i < 2; i++) {
        menuMobileItemGroupEl[i].addEventListener('click', () => {
            menuMobileWomenMenEl.classList.add('inactive');
            menuMobileWomenMenEl.classList.remove('active');
            menuMobileCategories.classList.remove('inactive');  // здесь одно меню для мужчин и женщин, подумать, как сделать в нем ссылки на разные разделы(возможно, сделать разные меню на каждый элемент)
        })
    }
// }


// мобильная версия - раскрытие фильтров

let filterIconEl = document.querySelector('.filter_icon');

if (filterIconEl) {

    filterIconEl.addEventListener('click', () => {
        sidePanelFiltersEl.classList.toggle('active');
        catalogEl.classList.toggle('inactive');
    })

}