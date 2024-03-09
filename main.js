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
                modalWindowAddToBasketEl.style.display = 'flex';

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
let totalOrdersSum = 100000; // общая сумма заказов, пока цифрой, потом помещать в LS и выгружать

let totalAmountWordEl = document.querySelector('.total_amount_word');

let idCounter = Date.now();

calculateTotalOrderSum();

function calculateTotalOrderSum() {
    countDiscount();

    totalCostInBasketEl.forEach(item => item.textContent = '');
    totalCostInBasketEl.forEach(item => item.append(totalCost.toLocaleString("ru-RU")));

    totalDiscountEl.forEach(item => item.textContent = '');
    totalDiscountEl.forEach(item => item.append(totalDiscount.toLocaleString("ru-RU")));

    let totalDiscountSum = totalCost * totalDiscount / 100;
    totalDiscountInBasketSumEl.forEach(item => item.textContent = '');
    totalDiscountInBasketSumEl.forEach(item => item.append(totalDiscountSum.toLocaleString("ru-RU")));

    let totalDelivery = 1000; // пока 1000, потом написаь формулу расчета
    totalCostDeliveryEl.forEach(item => item.textContent = '');
    totalCostDeliveryEl.forEach(item => item.append(totalDelivery.toLocaleString("ru-RU")));

    let totalSum = totalCost - totalDiscountSum + totalDelivery;
    totalCostInBasketSumEl.forEach(item => item.textContent = '');
    totalCostInBasketSumEl.forEach(item => item.append(totalSum.toLocaleString("ru-RU")));
}

function drawTotalQuantityInBasket (list) {
    let quantityTotal = list
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
    // console.log(basketList)
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







