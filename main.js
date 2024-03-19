let catalogEl = document.querySelector('.catalog_opened_filters .catalog');

// Модальное окно подписки, всплывает 2 раза: через 5 сек и через 2 минуты
// второй раз отсчет времени ведется с момента загрузки страницы, как сделать так, чтобы время шло не зависимо от того, сколько страниц загружаем

let modalWindowSubscribeEl = document.querySelector('.dark_window_subscribe');

if (!sessionStorage.getItem('counterOpenWindow')) {
    setTimeout (() => {
        modalWindowSubscribeEl.classList.remove('inactive');
        window.sessionStorage.setItem('counterOpenWindow', '1');
    }, 5000);
}

if (sessionStorage.getItem('counterOpenWindow') == '1') {
    setTimeout (() => {
        modalWindowSubscribeEl.classList.remove('inactive');
        window.sessionStorage.setItem('counterOpenWindow', '2');
    }, 15000);
}


// закрытие модальных окон всех

let closeIconEl = document.querySelectorAll('.close_icon');  

for (let i = 0; i < closeIconEl.length; i++) {
    closeIconEl[i].addEventListener('click', function () {
        modalWindowSubscribeEl.classList.add('inactive');
        modalWindowLocationEl.classList.add('inactive');
        modalWindowEntrance.classList.add('inactive');
        if (modalWindowEntrance) {
            toggleTabLogin();
        }
        modalWindowDiscountEl.classList.add('inactive');

        // При закрытии модального окна разрешаем прокрутку
        document.body.style.overflow = '';
    })
}


// открытие модального окна геолокации

let modalWindowLocationEl = document.querySelector('.dark_window_location')
let locationEl = document.querySelectorAll('.location');

locationEl.forEach((item) => {
    item.addEventListener('click', () => {
        modalWindowLocationEl.classList.remove('inactive');
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
        modalWindowLocationEl.classList.add('inactive');
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

    let choosedColorImgSrc = window.localStorage.getItem('choosedColorImgSrc');; // понять, как извлечь картинку из LS
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

    if (choosedColorName != '' && choosedSizeName != '' && choosedColorImgSrc != '') {  // выгружаем данные при перезагрузке страницы
        let choosedColorImg = document.createElement('IMG');
        choosedColorImg.setAttribute('src', choosedColorImgSrc);
        colorChoosedImgEl.append(choosedColorImg);
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

            colorChoosedImgEl.append(colorPickerGroupEl[i].cloneNode(true));
            choosedColorImgSrc = colorPickerGroupEl[i].src;

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
                modalWindowAddToBasketEl.classList.remove('inactive');

                // Блокируем прокрутку body
                document.body.style.overflow = 'hidden';

                // Меняем кнопку
                pushedBtnInBasket = 'true';
                window.localStorage.setItem('pushedBtnInBasket', pushedBtnInBasket);
                changeBtnOnProductPage(pushedBtnInBasket);

                //добавляем выбранные значения в LS
                window.localStorage.setItem('choosedColorName', choosedColorName);
                window.localStorage.setItem('choosedSizeName', choosedSizeName);
                window.localStorage.setItem('choosedColorImgSrc', choosedColorImgSrc);

                //добавляем товар в массив товаров в корзине
                addProductInBusket ();
            }
        }) 
    }

    // закрытие модальных окон всех

    for (let i = 0; i < closeIconEl.length; i++) {
        closeIconEl[i].addEventListener('click', function () {
            modalWindowAddToBasketEl.classList.add('inactive');
            document.body.style.overflow = '';
        })
    }

    let turnToShopBtnEl = document.querySelector('.turn_to_shop');

    if (turnToShopBtnEl) {
        turnToShopBtnEl.addEventListener('click', () => {
            modalWindowAddToBasketEl.classList.add('inactive');
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

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
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


// КОРЗИНА

let clearBasketEl = document.querySelector('.clear');
let emptyBasketEl = document.querySelector('.empty_basket');
let orderListBasketEl = document.querySelector('.order_list_basket');
let totalCostBasketEl = document.querySelector('.total_cost_basket');
let orderBtnBasketEl = document.querySelector('.order_btn_basket');
let basketAmountInHeaderEl = document.querySelectorAll('.total_amount');

let artEl = document.querySelector('.art');
let nameEl = document.querySelector('.name');
let priceInBasketEl = document.querySelector('.price_in_basket');
let q;
let mainFotoEl = document.querySelector('.main_foto');

let basketList = JSON.parse(window.localStorage.getItem('basketList')) || [];

let totalCostInBasket = [];
let totalCostInBasketEl = document.querySelectorAll('.total_cost_in_basket');
let totalCost = Number(window.localStorage.getItem('totalCost')); // итоговая сумма товаров в корзине, выгружаем из LS, выгружается в форму оформления заказа

let totalDiscountEl = document.querySelectorAll('.total_discount');
let totalDiscount = Number(window.localStorage.getItem('totalDiscount'));  // итоговая скидка клиента выгружается из LS, выгружается в форму оформления заказа

let totalDiscountInBasketSumEl = document.querySelectorAll('.total_discount_in_basket_sum');
let totalCostDeliveryEl = document.querySelectorAll('.total_cost_delivery');
let totalCostInBasketSumEl = document.querySelectorAll('.total_cost_in_basket_sum');
let totalOrdersSumEl = document.querySelector('.total_orders_sum');
let totalOrdersSum = JSON.parse(window.localStorage.getItem('totalOrdersSum'));; // общая сумма заказов, пока цифрой, выгружаем из LS

let totalAmountWordEl = document.querySelector('.total_amount_word');

let idCounter = Date.now();

let quantityTotal;
let totalDiscountSum;
let totalDelivery;
let totalSum;

calculateTotalOrderSum();

function calculateTotalOrderSum() {
    countDiscount();

    totalCostInBasketEl.forEach(item => item.textContent = '');
    totalCostInBasketEl.forEach(item => item.append(totalCost.toLocaleString("ru-RU")));

    totalDiscountEl.forEach(item => item.textContent = '');
    totalDiscountEl.forEach(item => item.append(totalDiscount.toLocaleString("ru-RU")));

    totalDiscountSum = totalCost * totalDiscount / 100;
    totalDiscountInBasketSumEl.forEach(item => item.textContent = '');
    totalDiscountInBasketSumEl.forEach(item => item.append(totalDiscountSum.toLocaleString("ru-RU")));

    totalDelivery = 1000; // пока 1000, потом написаь формулу расчета
    totalCostDeliveryEl.forEach(item => item.textContent = '');
    totalCostDeliveryEl.forEach(item => item.append(totalDelivery.toLocaleString("ru-RU")));

    totalSum = totalCost - totalDiscountSum + totalDelivery;
    totalCostInBasketSumEl.forEach(item => item.textContent = '');
    totalCostInBasketSumEl.forEach(item => item.append(totalSum.toLocaleString("ru-RU")));
}

function drawTotalQuantityInBasket (list) {
    quantityTotal = list
        .map(obj => obj.quantity)
        .reduce((accumulator, current) => accumulator + current, 0);

    basketAmountInHeaderEl.forEach((item) => {
        item.textContent = '';
        item.textContent = quantityTotal;
    })

    if(totalAmountWordEl) {
        totalAmountWordEl.textContent = '';
        if (quantityTotal >= 5 && quantityTotal <= 20) {
            totalAmountWordEl.textContent = 'товаров';
        } else if (quantityTotal >= 2 && quantityTotal <= 4) {
            totalAmountWordEl.textContent = 'товара';
        } else {
            totalAmountWordEl.textContent = 'товар';
        }
    }
}

drawTotalQuantityInBasket (basketList);


if (clearBasketEl) {

    clearBasketEl.addEventListener('click', () => {
        clearBasket();
        basketList = [];
        window.localStorage.setItem('basketList', JSON.stringify(basketList));
        drawTotalQuantityInBasket (basketList);
    })

    if (basketList.length == 0) {
        clearBasket();
    }
    else {
        drawListToBasket (basketList); // выводим список товаров в корзину при загрузке, если список пуст, то выводим пустую корзину
    }

}

function clearBasket() { 
    emptyBasketEl.classList.remove('inactive');
    
    orderListBasketEl.classList.add('inactive'); 
    totalCostBasketEl.classList.add('inactive');  // здесь нужно будет добавить очистку данных ?
    orderBtnBasketEl.classList.add('inactive');
    
    clearBasketEl.classList.add('inactive');
    clearBasketEl.classList.remove('active');

    drawTotalQuantityInBasket (basketList);
}

// функция создания массива товаров, добавленных в корзину ДОБАВИТЬ ПРОВЕРКУ, ЕСЛИ АРТИКУЛ ЕСТЬ, ТО ТОВАР НЕ ДОБАВЛЯЕМ, А МЕНЯЕТ КОЛИЧЕСТВО

function addProductInBusket () {
    let productInBasket = {
        art: artEl.textContent,
        name: nameEl.textContent,
        color: colorChoosedNameEl.textContent,
        size: sizeChoosedEl.textContent,
        imgSrc: mainFotoEl.src,
        price: Number(priceInBasketEl.textContent),
        quantity: 1,
        id: idCounter++
    };

    let q = 0;

    if (basketList.length == 0) {
        basketList.push(productInBasket);
    }
    else {
        basketList.forEach((item) => {
            if (productInBasket.art == item.art && productInBasket.color == item.color && productInBasket.size == item.size) {
                item.quantity = item.quantity + 1;
                q = 1;
            }
        })
        if (q == 0) {
            basketList.push(productInBasket);
        }
    }

    window.localStorage.setItem('basketList', JSON.stringify(basketList));

    drawTotalQuantityInBasket (basketList);

    if(orderListBasketEl) {
        drawListToBasket (basketList);
    }
}

// функция вывода в корзину товаров 

function drawListToBasket (list) {
    orderListBasketEl.textContent = '';
    totalCostInBasket = [];

    for(let item of list) {
        createElementInBasket(item);
    }

    totalCost = totalCostInBasket.reduce((accumulator, current) => accumulator + current, 0);
    window.localStorage.setItem('totalCost', totalCost);

    calculateTotalOrderSum();
}

// функция создания элемента товара в корзине

function createElementInBasket (listObject) {
    let cost = Number(listObject.price) * listObject.quantity;
    let price = Number(listObject.price);

    let listElementHTML = 
    // Строчка товара в корзине начало
    `<div class="order_list__item">
        <div class="order_item_foto">
            <img src=${listObject.imgSrc} alt="foto" class="item_foto">
        </div>
        <div class="order_item_info">
            <p class="main_text_title">${listObject.name}</p>
            <p class="small_text">${listObject.color}</p>
            <p class="main_text uppercase">${listObject.size}</p>
        </div>
        <div class="order_item_price main_text">
        ${price.toLocaleString("ru-RU")} р.
        </div>
        <div class="order_item_count">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="minus" data-id="${listObject.id}">
                <path d="M5 13V12H18V13H5Z" fill="#393939" class="minus" data-id="${listObject.id}"/>
            </svg>
            <p class="main_text">${listObject.quantity}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="plus" data-id="${listObject.id}">
                <path d="M5 13V12H11V6H12V12H18V13H12V19H11V13H5Z" fill="#393939" class="plus" data-id="${listObject.id}"/>
            </svg>
        </div>
        <div class="order_item_cost main_text">
            <span>${cost.toLocaleString("ru-RU")}</span> &nbsp;р.
        </div>
        <a href="#" class="order_item_favourite">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" class="heart">
                <path d="M10 18.0166C9.87726 18.0162 9.75809 17.9752 9.66112 17.8999C6.57223 15.4999 4.44445 13.4333 2.95556 11.3944C1.05556 8.78883 0.62223 6.38328 1.66667 4.24439C2.41112 2.71661 4.55001 1.46661 7.05001 2.19439C8.24198 2.53869 9.28195 3.27705 10 4.28883C10.7181 3.27705 11.758 2.53869 12.95 2.19439C15.4445 1.47772 17.5889 2.71661 18.3333 4.24439C19.3778 6.38328 18.9445 8.78883 17.0445 11.3944C15.5556 13.4333 13.4278 15.4999 10.3389 17.8999C10.2419 17.9752 10.1228 18.0162 10 18.0166Z"/>
            </svg>
        </a>
        <div class="order_item_delete small_text uppercase">
            <span class="item_delete" data-id="${listObject.id}">удалить</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="item_delete" data-id="${listObject.id}">
                <path d="M5.33414 15.2565L4.74414 14.6665L9.41081 9.99983L4.74414 5.33316L5.33414 4.74316L10.0008 9.40983L14.6675 4.74316L15.2575 5.33316L10.5908 9.99983L15.2575 14.6665L14.6675 15.2565L10.0008 10.5898L5.33414 15.2565Z" fill="#393939"  class="item_delete" data-id="${listObject.id}"/>
            </svg>
        </div>
    </div>`
    // Строчка товара в корзине конец

    orderListBasketEl.insertAdjacentHTML('beforeend', listElementHTML);

    totalCostInBasket.push(cost);
}


// функция удаления товара при нажатии крестика
let idBtn;
let idItem;

function removeProductFromBusket(e) {

    idBtn = e.target.getAttribute('data-id');
    idItem = basketList.findIndex((item) => {
        return item.id == idBtn;
    });

    basketList.splice(idItem, 1);
    window.localStorage.setItem('basketList', JSON.stringify(basketList));

    drawTotalQuantityInBasket(basketList);

    if (basketList.length == 0) {  // выводим список товаров в корзину при загрузке, если список пуст, то выводим пустую корзину
        clearBasket();
    }
    else {
        drawListToBasket (basketList); 
    }
};

// функции изменения количества кнопоками +/- в корзине

function reduceProductInBusket(e) {
    idBtn = e.target.getAttribute('data-id');
    idItem = basketList.findIndex((item) => {
        return item.id == idBtn;
    });

    basketList[idItem].quantity--;

    if (basketList[idItem].quantity == 0) {
        basketList.splice(idItem, 1);
    }

    window.localStorage.setItem('basketList', JSON.stringify(basketList));

    drawTotalQuantityInBasket(basketList);

    if (basketList.length == 0) {  // выводим список товаров в корзину при загрузке, если список пуст, то выводим пустую корзину
        clearBasket();
    }
    else {
        drawListToBasket (basketList); 
    }
}

function increaseProductInBusket(e) {
    idBtn = e.target.getAttribute('data-id');
    idItem = basketList.findIndex((item) => {
        return item.id == idBtn;
    });

    basketList[idItem].quantity++;
    window.localStorage.setItem('basketList', JSON.stringify(basketList));

    drawTotalQuantityInBasket(basketList);

    if (basketList.length == 0) {  // выводим список товаров в корзину при загрузке, если список пуст, то выводим пустую корзину
        clearBasket();
    }
    else {
        drawListToBasket (basketList); 
    }
}

if (orderListBasketEl) {
    orderListBasketEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('item_delete')) {
            removeProductFromBusket(e);
            console.log(e.target)
        }
        if (e.target.classList.contains('minus')) {
            reduceProductInBusket(e);
        }
        if (e.target.classList.contains('plus')) {
            increaseProductInBusket(e);
        }
    })
}


// расчет размера скидки

function countDiscount() {
    if (totalOrdersSum < 50000) {
        totalDiscount = 0;
    }
    if (totalOrdersSum >= 50000 && totalOrdersSum < 100000) {
        totalDiscount = 5;
    }
    if (totalOrdersSum >= 100000 && totalOrdersSum < 150000) {
        totalDiscount = 7;
    }
    if (totalOrdersSum >= 150000) {
        totalDiscount = 10;
    }
}


// ОФОРМЛЕНИЕ ЗАКАЗА - сделать сохранение данных по доставке

let blockDataBtnEl = document.querySelector('.block_data .btn_main');
let modalWindowCheckPhoneEl = document.querySelector('.dark_window_check_phone');
let blockTabsDataEl = document.querySelector('.block_data');
let checkPhoneInputEl = document.querySelector('.dark_window_check_phone input');
let blockTabsDeliveryEl = document.querySelector('.block_delivery');
let deliveryRadioEl = document.querySelectorAll('.block_delivery .сustom_сheckbox');
let deliveryOptionEl = document.querySelector('.delivery_option');
let pickupOptionEl = document.querySelector('.pickup_option');
let blockDeliveryBtnEl = document.querySelector('.block_delivery .btn_main');
let blockTabsPaymentEl = document.querySelector('.block_payment');
let tabDataEl = document.querySelector('.tab_data');
let tabDeliveryEl = document.querySelector('.tab_delivery');
let tabPaymentEl = document.querySelector('.tab_payment');

//  открытие и закрытие модального окна проверки номера телефона 

if (blockTabsDataEl) {
    blockDataBtnEl.addEventListener('click', () => {

        // сделать открытие только если в номер вносились изменения, так как на эту страницу попадает уже зарегистрированный пользователь (если value не равно тому, что было сохранено, то открываем, если нет, то просто переходим на вкладку доставка)
        modalWindowCheckPhoneEl.classList.remove('inactive');
        document.body.style.overflow = 'hidden';
    })
    
    for (let i = 0; i < closeIconEl.length; i++) {
        closeIconEl[i].addEventListener('click', function () {
            modalWindowCheckPhoneEl.classList.add('inactive');
            document.body.style.overflow = '';
        })
    }

    checkPhoneInputEl.addEventListener('input', () => {  // проверка кода, пока просто 1234. Доделать ограниечение ввода 4 цифр и вывод ошибки, если введен неверный код
        if (checkPhoneInputEl.value == 1234) {
            checkPhoneInputEl.value = '';

            modalWindowCheckPhoneEl.classList.add('inactive');
            document.body.style.overflow = '';

            blockTabsDataEl.classList.add('inactive');
            blockTabsDeliveryEl.classList.remove('inactive');

            tabDataEl.classList.remove('tab_active');
            tabDataEl.classList.add('tab_inactive_left');
            tabDataEl.classList.add('main_text_addit_dark');
            tabDataEl.classList.remove('main_text');

            tabDeliveryEl.classList.remove('tab_inactive_right');
            tabDeliveryEl.classList.remove('main_text_addit_dark');
            tabDeliveryEl.classList.add('tab_active');
            tabDeliveryEl.classList.add('main_text');

            tabDataEl.addEventListener('click', returnToDataTab) // добавили возможность вернуться на вкладку Данные
        }
    })
}

if (blockTabsDeliveryEl) {
    for (let i = 0; i < deliveryRadioEl.length; i++) {
        deliveryRadioEl[i].addEventListener('click', () =>{
            if(deliveryRadioEl[i].checked == true && deliveryRadioEl[i].id == "courier") {
                deliveryOptionEl.classList.remove('inactive');
                pickupOptionEl.classList.add('inactive');
            } else {
                deliveryOptionEl.classList.add('inactive');
                pickupOptionEl.classList.remove('inactive');
            } ;
        })
    }

    blockDeliveryBtnEl.addEventListener('click', () => {
        blockTabsDeliveryEl.classList.add('inactive');
        blockTabsPaymentEl.classList.remove('inactive');

        tabDeliveryEl.classList.add('tab_inactive_left');
        tabDeliveryEl.classList.remove('tab_active');
        tabDeliveryEl.classList.remove('main_text');
        tabDeliveryEl.classList.add('main_text_addit_dark');

        tabPaymentEl.classList.remove('tab_inactive_right');
        tabPaymentEl.classList.add('tab_active');
        tabPaymentEl.classList.add('main_text');
        tabPaymentEl.classList.remove('main_text_addit_dark');

        tabDeliveryEl.addEventListener('click', returnToDeliveryTab) // добавили возможность вернуться на вкладку Доставка
    })
}

// переход назад возможен по нажатию вкладки, вперед только по кнопке ДАЛЕЕ. Делаем предшествующие вкладки активными.

function returnToDeliveryTab() {
    blockTabsPaymentEl.classList.add('inactive');
    tabPaymentEl.classList.add('tab_inactive_right');
    tabPaymentEl.classList.remove('tab_active');
    tabPaymentEl.classList.remove('main_text');
    tabPaymentEl.classList.add('main_text_addit_dark');

    blockTabsDeliveryEl.classList.remove('inactive');
    tabDeliveryEl.classList.remove('tab_inactive_left');
    tabDeliveryEl.classList.add('tab_active');
    tabDeliveryEl.classList.add('main_text');
    tabDeliveryEl.classList.remove('main_text_addit_dark');

    tabDeliveryEl.removeEventListener('click', returnToDeliveryTab)
}

function returnToDataTab() {
    blockTabsPaymentEl.classList.add('inactive');
    tabPaymentEl.classList.add('tab_inactive_right');
    tabPaymentEl.classList.remove('tab_active');
    tabPaymentEl.classList.remove('main_text');
    tabPaymentEl.classList.add('main_text_addit_dark');

    blockTabsDeliveryEl.classList.add('inactive');
    tabDeliveryEl.classList.add('tab_inactive_right');
    tabDeliveryEl.classList.remove('tab_active');
    tabDeliveryEl.classList.remove('main_text');
    tabDeliveryEl.classList.add('main_text_addit_dark');

    blockTabsDataEl.classList.remove('inactive');
    tabDataEl.classList.remove('tab_inactive_left');
    tabDataEl.classList.add('tab_active');
    tabDataEl.classList.add('main_text');
    tabDataEl.classList.remove('main_text_addit_dark');

    tabDeliveryEl.removeEventListener('click', returnToDeliveryTab);
    tabDeliveryEl.removeEventListener('click', returnToDeliveryTab);
}


// ВХОД и РЕГИСТРАЦИЯ

let entranceEl = document.querySelectorAll('.entrance');
let modalWindowEntrance = document.querySelector('.dark_window_entrance');
let loginTabEl = document.querySelector('.log-in_tab');
let registrationTabEl = document.querySelector('.registration_tab');
let loginFormEl = document.querySelector('.log-in_form');
let registrationFormEl = document.querySelector('.registration_form');
let popupBlockTabsEl = document.querySelector('.pop_up_block_tabs');

let checkPhoneFormEl = document.querySelector('.check_phone_form');
let loginBtnEl = document.querySelector('.log-in_btn');
let loginPhoneInputEl = document.querySelector('.log-in_phone input');
let loginEmailInputEl = document.querySelector('.log-in_email input');
let checkPhoneCellInLoginEl = document.querySelector('.log-in_form .check_phone_cell');
let err1El = document.querySelector('.err1');
let err2El = document.querySelector('.err2');
let err10El = document.querySelector('.err10');
let err11El = document.querySelector('.err11');
let loginPhoneTitleEl = document.querySelector('.toggle_entrance_type .log-in_phone_title');
let loginEmailTitleEl = document.querySelector('.toggle_entrance_type .log-in_email_title');
let loginPhoneEl = document.querySelector('.log-in_phone');
let loginEmailEl = document.querySelector('.log-in_email');

let registrationBtnEl = document.querySelector('.registration_btn');
let err3El = document.querySelector('.err3');
let err4El = document.querySelector('.err4');
let err5El = document.querySelector('.err5');
let err6El = document.querySelector('.err6');
let err7El = document.querySelector('.err7');
let err8El = document.querySelector('.err8');
let err9El = document.querySelector('.err9');
let infoCellInRegListEl = document.querySelectorAll('.registration_form .info_cell');
let infoCellInputInRegListEl = document.querySelectorAll('.registration_form input');
let infoCellTitleInRegListEl = document.querySelectorAll('.info_cell .addit_text_addit_dark');

let regExpPhone = /\+7[0-9]{10}/;
let regExpEmail = /^[a-z0-9\.\-]+@[a-z0-9\.\-]+\.[a-z]{1,3}\.?[a-z]{0,3}$/i;

if (entranceEl) {
    for (let i = 0; i < entranceEl.length; i++) {
        entranceEl[i].addEventListener('click', () => {
            modalWindowEntrance.classList.remove('inactive');
            document.body.style.overflow = 'hidden';
        })
    }

    function toggleTabLogin() {
        loginTabEl.classList.remove('tab_inactive_left');
        loginTabEl.classList.add('tab_active');
        registrationTabEl.classList.remove('tab_active');
        registrationTabEl.classList.add('tab_inactive_right');

        loginTabEl.classList.add('main_text');
        loginTabEl.classList.remove('main_text_addit_dark');
        registrationTabEl.classList.remove('main_text');
        registrationTabEl.classList.add('main_text_addit_dark');

        loginFormEl.classList.remove('inactive');
        registrationFormEl.classList.add('inactive');
        popupBlockTabsEl.classList.remove('block_tabs_height-big');
        popupBlockTabsEl.classList.add('block_tabs_height-small');
        checkPhoneFormEl.classList.add('inactive');

        loginTabEl.removeEventListener('click', toggleTabLogin);
        registrationTabEl.addEventListener('click', toggleTabRegistration);

        loginPhoneInputEl.value = '';
    }

    function toggleTabRegistration() {
        loginTabEl.classList.add('tab_inactive_left');
        loginTabEl.classList.remove('tab_active');
        registrationTabEl.classList.add('tab_active');
        registrationTabEl.classList.remove('tab_inactive_right');

        registrationTabEl.classList.add('main_text');
        registrationTabEl.classList.remove('main_text_addit_dark');
        loginTabEl.classList.remove('main_text');
        loginTabEl.classList.add('main_text_addit_dark');

        loginFormEl.classList.add('inactive');
        registrationFormEl.classList.remove('inactive');
        popupBlockTabsEl.classList.add('block_tabs_height-big');
        popupBlockTabsEl.classList.remove('block_tabs_height-small');
        checkPhoneFormEl.classList.add('inactive');

        loginTabEl.addEventListener('click', toggleTabLogin)
        registrationTabEl.removeEventListener('click', toggleTabRegistration)

        err1El.classList.add('inactive');
        err2El.classList.add('inactive');
        checkPhoneCellInLoginEl.classList.remove('cell_mistake');

        if (iconMenuBurgerEl || iconMenuCloseEl) {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        for (let i = 0; i < infoCellInputInRegListEl.length; i++) {
            infoCellInputInRegListEl[i].value = '';
            infoCellInRegListEl[i].classList.remove('cell_mistake');
            infoCellTitleInRegListEl[i].classList.remove('red');
    
            if (i == 0) {
                err7El.classList.add('inactive');
            }
            if (i == 1) {
                err8El.classList.add('inactive');
            }
            if (i == 2) {
                err3El.classList.add('inactive');
                err4El.classList.add('inactive');
            }
            if (i == 3) {
                err5El.classList.add('inactive');
                err6El.classList.add('inactive');
                err9El.classList.add('inactive');
            };
        }
    }

    // переключение вкладок

    loginTabEl.addEventListener('click', toggleTabLogin);
    registrationTabEl.addEventListener('click', toggleTabRegistration);


    // переключение типа входа

    loginPhoneTitleEl.addEventListener('click', () => {
        loginPhoneEl.classList.remove('inactive');
        loginEmailEl.classList.add('inactive');

        err1El.classList.add('inactive');
        err2El.classList.add('inactive');
        checkPhoneCellInLoginEl.classList.remove('cell_mistake');
        loginPhoneInputEl.value = '';
    })

    loginEmailTitleEl.addEventListener('click', () => {
        loginPhoneEl.classList.add('inactive');
        loginEmailEl.classList.remove('inactive');

        err10El.classList.add('inactive');
        err11El.classList.add('inactive');
        checkPhoneCellInLoginEl.classList.remove('cell_mistake');
        loginEmailInputEl.value = '';
    })

    // ввод номера или почты в форме входа

    loginBtnEl.addEventListener('click', () => { 

        // здесь нужно сделать провеку, есть ли уже номер в базе, если нет, то выдать ошибку
        if (loginPhoneInputEl.value == '' || loginPhoneInputEl.value == '+7') {
            checkPhoneCellInLoginEl.classList.add('cell_mistake');
            err1El.classList.remove('inactive');
            err2El.classList.add('inactive');
        }
        else if (regExpPhone.test(loginPhoneInputEl.value)) {
            checkPhoneFormEl.classList.remove('inactive');
            loginFormEl.classList.add('inactive');
        }
        else {
            checkPhoneCellInLoginEl.classList.add('cell_mistake');
            err2El.classList.remove('inactive');
            err1El.classList.add('inactive');
        }

        //добавить проверку наличия почты в базе - если нет - выдать ошибку
        if (loginEmailInputEl.value == '') {
            err11El.classList.remove('inactive');
        } else if (loginEmailInputEl.value != '' && !regExpEmail.test(loginEmailInputEl.value)) {  
            err10El.classList.remove('inactive');
            checkPhoneCellInLoginEl.classList.add('cell_mistake');
        } else {
            checkPhoneFormEl.classList.remove('inactive');
            loginFormEl.classList.add('inactive');
        }
    })

    loginPhoneInputEl.addEventListener('focus', () => {
        loginPhoneInputEl.value = '+7';
    })

    loginPhoneInputEl.addEventListener('input', () => {
        err1El.classList.add('inactive');
        err2El.classList.add('inactive');
        checkPhoneCellInLoginEl.classList.remove('cell_mistake');

        loginPhoneInputEl.value = loginPhoneInputEl.value.replace(/[a-zа-я]/gi, "");
    })

    loginEmailInputEl.addEventListener('input', () => {
        err10El.classList.add('inactive');
        err11El.classList.add('inactive');
        checkPhoneCellInLoginEl.classList.remove('cell_mistake');
    })

    // ввод данных в форме регистрации

    infoCellInputInRegListEl[2].addEventListener('focus', () => {
        infoCellInputInRegListEl[2].value = '+7';
    })

    infoCellInputInRegListEl[2].addEventListener('input', () => {
        infoCellInputInRegListEl[2].value = infoCellInputInRegListEl[2].value.replace(/[a-zа-я]/gi, "");
    })


    registrationBtnEl.addEventListener('click', () => { 

        for (let i = 0; i < 4; i++) {
            if (infoCellInputInRegListEl[i].value == '') {
                infoCellInRegListEl[i].classList.add('cell_mistake');
                infoCellTitleInRegListEl[i].classList.add('red');
            }
        }

        if (infoCellInputInRegListEl[0].value == '') {
            err7El.classList.remove('inactive');
        }

        if (infoCellInputInRegListEl[1].value == '') {
            err8El.classList.remove('inactive');
        }
        
        if (infoCellInputInRegListEl[2].value == '' || !regExpPhone.test(infoCellInputInRegListEl[2].value)) { 
            // добавить проверку наличия телефона в базе - ошибка 4
            err3El.classList.remove('inactive');
            infoCellInRegListEl[2].classList.add('cell_mistake');
            infoCellTitleInRegListEl[2].classList.add('red');
        }

        if (infoCellInputInRegListEl[3].value == '') {
            err9El.classList.remove('inactive');
        } else if (infoCellInputInRegListEl[3].value != '' && !regExpEmail.test(infoCellInputInRegListEl[3].value)) {  
            //добавить проверку наличия почты в базе - ошибка 5
            err6El.classList.remove('inactive');
            infoCellInRegListEl[3].classList.add('cell_mistake');
            infoCellTitleInRegListEl[3].classList.add('red');
        }
    
        if (infoCellInputInRegListEl[0].value != '' &&
            infoCellInputInRegListEl[1].value != '' &&
            infoCellInputInRegListEl[2].value != '' &&
            infoCellInputInRegListEl[3].value != '' &&
            regExpPhone.test(infoCellInputInRegListEl[2].value) == true &&
            regExpEmail.test(infoCellInputInRegListEl[3].value) == true) {

                checkPhoneFormEl.classList.remove('inactive');
                registrationFormEl.classList.add('inactive');
        }
    })

    for (let i = 0; i < 4; i++) {
        infoCellInputInRegListEl[i].addEventListener('input', () => {
            infoCellInRegListEl[i].classList.remove('cell_mistake');
            infoCellTitleInRegListEl[i].classList.remove('red');
    
            if (i == 0) {
                err7El.classList.add('inactive');
            }
            if (i == 1) {
                err8El.classList.add('inactive');
            }
            if (i == 2) {
                err3El.classList.add('inactive');
                err4El.classList.add('inactive');
            }
            if (i == 3) {
                err5El.classList.add('inactive');
                err6El.classList.add('inactive');
                err9El.classList.add('inactive');
            }
        })
    }
}

// проверка введенной почты в поля подписки

let inputEmailGroupEl = document.querySelectorAll('.input_e-mail');
let subscribeOkGroupEl = document.querySelectorAll('.subscribe_ok');

for (let i = 0; i < inputEmailGroupEl.length; i++) {
    subscribeOkGroupEl[i].addEventListener('click', () => {
        if (inputEmailGroupEl[i].value == '') {
            inputEmailGroupEl[i].value = 'введите EMAIL';
            inputEmailGroupEl[i].classList.add('red');
            if (inputEmailGroupEl[i].classList.contains('footer_input_e-mail')) {
                inputEmailGroupEl[i].classList.remove('footer_input_e-mail')
            }
        }
        else if (inputEmailGroupEl[i].value != '' && !regExpEmail.test(inputEmailGroupEl[i].value)) {  
            inputEmailGroupEl[i].value = 'проверьте EMAIL';
            inputEmailGroupEl[i].classList.add('red');
            if (inputEmailGroupEl[i].classList.contains('footer_input_e-mail')) {
                inputEmailGroupEl[i].classList.remove('footer_input_e-mail')
            }
        }
        else {
            inputEmailGroupEl[i].value = 'вы успешно подписаны';
            inputEmailGroupEl[i].classList.add('red');
            if (inputEmailGroupEl[i].classList.contains('footer_input_e-mail')) {
                inputEmailGroupEl[i].classList.remove('footer_input_e-mail')
            }
        }
    })

    inputEmailGroupEl[i].addEventListener('focus', () => {
        inputEmailGroupEl[i].value = '';
        inputEmailGroupEl[i].classList.remove('red');
        if (inputEmailGroupEl[i].closest('.footer_subscribe_form')) {
            inputEmailGroupEl[i].classList.add('footer_input_e-mail')
        }
    })
}


// ЛИЧНЫЙ КАБИНЕТ

let modalWindowDiscountEl = document.querySelector('.dark_window_discount');
let discountInfoEl = document.querySelector('.discount_info');
let personalInfoTabEl = document.querySelector('.personal_info_tab');
let historyTabEl = document.querySelector('.history_tab');
let personalInfoEl = document.querySelector('.personal_info');
let ordersHistoryEl = document.querySelector('.orders_history');

// переключение вкладок

if (personalInfoTabEl) {

    discountInfoEl.addEventListener('click', () => {
        modalWindowDiscountEl.classList.remove('inactive');
        document.body.style.overflow = 'hidden';
    })
    
    personalInfoTabEl.addEventListener('click', () =>{
        historyTabEl.classList.add('tab_inactive_right');
        historyTabEl.classList.remove('tab_active');
        personalInfoTabEl.classList.add('tab_active');
        personalInfoTabEl.classList.remove('tab_inactive_left');
        personalInfoTabEl.classList.add('main_text');
        personalInfoTabEl.classList.remove('main_text_addit_dark');
        historyTabEl.classList.remove('main_text');
        historyTabEl.classList.add('main_text_addit_dark');
        personalInfoEl.classList.remove('inactive');
        ordersHistoryEl.classList.add('inactive');
    })
    
    historyTabEl.addEventListener('click', () =>{
        historyTabEl.classList.remove('tab_inactive_right');
        historyTabEl.classList.add('tab_active');
        personalInfoTabEl.classList.remove('tab_active');
        personalInfoTabEl.classList.add('tab_inactive_left');
        historyTabEl.classList.add('main_text');
        historyTabEl.classList.remove('main_text_addit_dark');
        personalInfoTabEl.classList.remove('main_text');
        personalInfoTabEl.classList.add('main_text_addit_dark');
        personalInfoEl.classList.add('inactive');
        ordersHistoryEl.classList.remove('inactive');
    }) 
}


// открытие окна регистрации или входа по клику на строку в корзине

let loginTextEl = document.querySelector('.login_text');
let regTextEl = document.querySelector('.reg_text');

if (loginTextEl) {
    loginTextEl.addEventListener('click', () => {
        modalWindowEntrance.classList.remove('inactive');
        document.body.style.overflow = 'hidden';
    })

    regTextEl.addEventListener('click', () => {
        modalWindowEntrance.classList.remove('inactive');
        document.body.style.overflow = 'hidden';
        toggleTabRegistration ();
    })
}

// при нажатии кнопки Оплатить - в историю заказов добавляется новый элемент

let payBtnEl = document.querySelector('.pay_btn');
let historyList = JSON.parse(window.localStorage.getItem('historyList')) || [];  //массив с историей заказов выгружаем из LS


if (payBtnEl) {
    payBtnEl.addEventListener('click', () => {
        addHistoryItem();
        basketList = [];
        window.localStorage.setItem('basketList', JSON.stringify(basketList));
        drawTotalQuantityInBasket (basketList);
    })
}

function addHistoryItem () {
    let dateNow = new Date();
    let date = (dateNow.getDate() < 10 ? "0" + dateNow.getDate() : dateNow.getDate()) + "."
             + ((Number(dateNow.getMonth()) + 1) < 10 ? "0" + (Number(dateNow.getMonth()) + 1) : (Number(dateNow.getMonth()) + 1)) + "."
             + dateNow.getFullYear();

    let historyItem = {
        number: historyList.length + 1,
        dateOrder: date,
        status: 'оплачен',
        basketList: basketList,
        totalQuantity: quantityTotal,
        totalDiscount: totalDiscount,
        totalCost: totalCost,
        totalDiscountSum: totalDiscountSum,
        totalDelivery: totalDelivery,
        totalSum: totalSum
    }

    historyList.push(historyItem);
    window.localStorage.setItem('historyList', JSON.stringify(historyList));
}

if (ordersHistoryEl) {
    drawListOrdersHistory(historyList);
}

function drawListOrdersHistory (list) {
    totalOrdersSum = 0;
    for (let item of list) {
        createListHistoryElement(item)
    }
    console.log(totalOrdersSum)
    window.localStorage.setItem('totalOrdersSum', totalOrdersSum);  
    totalOrdersSumEl.textContent = totalOrdersSum.toLocaleString("ru-RU");

    countDiscount();
}

function createListHistoryElement (listObject) {

    let sumWithDiscount = listObject.totalCost - listObject.totalDiscountSum;

    ordersHistoryEl.insertAdjacentHTML('afterbegin', 
    `<div class="container total_cost inactive">
        
        <div class="total_cost__item">
            <div class="total_item_name main_text">
            ${listObject.totalQuantity} товара
            </div>
            <div class="total_item_value main_text">
            ${listObject.totalCost.toLocaleString("ru-RU")} р.
            </div>
        </div>

        <div class="total_cost__item">
            <div class="total_item_name main_text">
                Скидка ${listObject.totalDiscount}%
            </div>
            <div class="total_item_value main_text">
                ${listObject.totalDiscountSum.toLocaleString("ru-RU")} р.
            </div>
        </div>

        <div class="total_cost__item">
            <div class="total_item_name main_text">
                Доставка
            </div>
            <div class="total_item_value main_text">
                ${listObject.totalDelivery.toLocaleString("ru-RU")} р.
            </div>
        </div>

        <div class="total_cost__item">
            <div class="total_item_name main_text_contrast">
                Оплачено
            </div>
            <div class="total_item_value main_text_contrast">
            ${listObject.totalSum.toLocaleString("ru-RU")} р.
            </div>
        </div>

    </div>`)

    ordersHistoryEl.insertAdjacentHTML('afterbegin', `<div class="order_list inactive order_list_history"></div>`);

    let orderListEl = document.querySelector('.order_list_history');

    for (item of listObject.basketList) {
        let cost = Number(item.price) * item.quantity;
        let price = Number(item.price);

        orderListEl.insertAdjacentHTML('beforeend', 
        `<div class="order_list__item">
            <div class="order_item_foto">
                <img src=${item.imgSrc} alt="foto" class="item_foto">
            </div>
            <div class="order_item_info">
                <p class="main_text_title">${item.name}</p>
                <p class="small_text">${item.color}</p>
                <p class="main_text uppercase">${item.size}</p>
            </div>
            <div class="order_item_price main_text">
                ${price.toLocaleString("ru-RU")}  р.
            </div>
            <div class="order_item_count">
                <p class="main_text">${item.quantity} шт.</p>
            </div>
            <div class="order_item_cost main_text">
                ${cost.toLocaleString("ru-RU")} р.
            </div>
        </div>`)
    }

    ordersHistoryEl.insertAdjacentHTML('afterbegin', 
    `<div class="orders_history__item">
        <div class="order_group">
            <div class="item_number main_text uppercase">
                заказ №35021-${listObject.number}
            </div>
            <div class="order_create main_text_addit_dark">
                создан ${listObject.dateOrder} г.
            </div>
            <div class="order_delivery main_text_addit_dark">
                ${listObject.status}
            </div>
        </div>
        <div class="order_value main_text">
            ${sumWithDiscount.toLocaleString("ru-RU")} р.
        </div>
        <div class="open_order">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"  class="pointer icon_open_order">
                <path d="M5.83464 8.33301L10.0013 12.4997L14.168 8.33301" stroke="#393939" stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="pointer inactive icon_close_order">
                <path d="M14.1693 11.667L10.0026 7.50033L5.83594 11.667" stroke="#393939" stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>`);

    totalOrdersSum = totalOrdersSum + listObject.totalCost - listObject.totalDiscountSum;
}

let ordersHistoryItemGroupEl = document.querySelectorAll('.orders_history__item');
let iconOpenOrderGroupEl = document.querySelectorAll('.icon_open_order');
let iconCloseOrderGroupEl = document.querySelectorAll('.icon_close_order');
let orderListInHistoryGroupEl = document.querySelectorAll('.orders_history .order_list ');
let totalCostInHistoryGroupEl = document.querySelectorAll('.orders_history .total_cost ')

for (let i = 0; i < iconOpenOrderGroupEl.length; i++) {
    iconOpenOrderGroupEl[i].addEventListener('click', () => {
        orderListInHistoryGroupEl[i].classList.remove('inactive');
        totalCostInHistoryGroupEl[i].classList.remove('inactive');
        iconOpenOrderGroupEl[i].classList.add('inactive');
        iconCloseOrderGroupEl[i].classList.remove('inactive');
        ordersHistoryItemGroupEl[i].classList.add('orders_history__item--opened');
    })

    iconCloseOrderGroupEl[i].addEventListener('click', () => {
        orderListInHistoryGroupEl[i].classList.add('inactive');
        totalCostInHistoryGroupEl[i].classList.add('inactive');
        iconOpenOrderGroupEl[i].classList.remove('inactive');
        iconCloseOrderGroupEl[i].classList.add('inactive');
        ordersHistoryItemGroupEl[i].classList.remove('orders_history__item--opened');
    })
}



// геолокация подключение

// if ("geolocation" in navigator) {
//   console.log('Geolocation API доступен');
// } else {
//   console.log('Geolocation API не поддерживается браузером пользователя');
// }


// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     console.log("Latitude:", position.coords.latitude);
//     console.log("Longitude:", position.coords.longitude);
//   },
//   function (error) {
//     console.error("Ошибка получения местоположения:", error);
//   }
// );

// подключить геолокцию тут https://yandex.ru/dev/geocode/doc/ru/


// делаем выпадающий список городов при выборе геолокации

const API_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
const API_KEY = 'acf562dfb6d0097c02ead5d1d44848d0373cd3b1'

document.querySelector('.input_city').addEventListener('input', () => {
    let city = document.querySelector('.input_city');
    let cityRegExp = new RegExp(city.value, 'i')

    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + API_KEY
        },
        body: JSON.stringify({query: city.value})
    }

    let cityList = [];

    fetch(API_URL, options)  // запрос сюда https://dadata.ru/api/suggest/address/
    .then(response => response.json())
    .then((data) => {
        for(let item of data.suggestions) {
            if(cityRegExp.test(item.data.city) && !cityList.includes(item.data.city)) {
                cityList.push(item.data.city);
                cityList.sort()
            }
        }
        drawCityList (cityList);
    })
})

function drawCityList(list) {
    let cityListEl = document.querySelector('.city_list');
    cityListEl.textContent = '';  // очищаем див, в который будем выводить список

    for(let i = 0; i < list.length; i++) { // выводим список городов из массива
        let itemHTML = `<div class="city_list__item pointer">${list[i]}</div>`;
        cityListEl.insertAdjacentHTML('beforeend', itemHTML);
    }

    let cityListItemGroupEl = document.querySelectorAll('.city_list__item'); 

    for (let i = 0; i < cityListItemGroupEl.length; i++) { 
        cityListItemGroupEl[i].addEventListener('click', () => { 
            document.querySelector('.input_city').value = cityListItemGroupEl[i].textContent;
            cityListEl.textContent = '';
        })
    }
}


// скролл карточек горизонтальный

class Scroll {
    constructor (selector, shift) {
        this.blockScroll = document.querySelector(selector);
        this.leftBtn = document.querySelector(selector).querySelector('.left');
        this.rightBtn = document.querySelector(selector).querySelector('.right');
        this.shift = shift;
        console.log(this.blockScroll)
        console.log(this.leftBtn)
        console.log(this.rightBtn)
    }

    scrollGorizontal() {
        this.leftBtn.addEventListener('click', () => {
            this.blockScroll.scrollBy({ 
                left: -(this.blockScroll.offsetWidth + this.shift),
                behavior: 'smooth' 
            });
        });
        
        this.rightBtn.addEventListener('click', () => {
            this.blockScroll.scrollBy({ 
                left: this.blockScroll.offsetWidth + this.shift,
                behavior: 'smooth' 
            });
        });
    }
}

if (document.querySelector('.first_page')) {
    let scrollHits = new Scroll ('.our_hits__scroll', 15)
    scrollHits.scrollGorizontal()
}

if (document.querySelector('.product_page')) {
    let additProducts = new Scroll ('.addit_products__scroll', 15)
    additProducts.scrollGorizontal()
    
    let recentProducts = new Scroll ('.recent_products__scroll', 15)
    recentProducts.scrollGorizontal()
    
    let productsFoto = new Scroll ('.product_page__foto', 0)
    productsFoto.scrollGorizontal()
}

