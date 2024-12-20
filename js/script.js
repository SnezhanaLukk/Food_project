window.addEventListener('DOMContentLoaded', () => {

    //Tabs menu
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade')
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        });
    }
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener(('click'), event => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });

    //Timer
    const deadline = new Date('2024-11-17T00:00:00');
    let days, hours, minutes, seconds;

    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        if (total <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(total / 1000 / 60 / 60 / 24);
            hours = Math.floor((total / 1000 / 60 / 60) % 24);
            minutes = Math.floor((total / 1000 / 60) % 60);
            seconds = Math.floor((total / 1000) % 60);
        }
        return { total, days, hours, minutes, seconds };

    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else return num;
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            days.innerHTML = getZero(t.days);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

    // modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(openTimer);
    };

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';
    };

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '')
            closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show'))
            closeModal();
    });

    const openTimer = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);



    // Напишем меню через классы

    // class MenuCard {
    //     constructor(src, alt, title, descr, price, parentSelector, ...classes) {
    //         this.src = src;
    //         this.alt = alt;
    //         this.title = title;
    //         this.descr = descr;
    //         this.price = price;
    //         this.classes = classes;
    //         this.parent = document.querySelector(parentSelector);
    //         this.transfer = 98;
    //         this.calcPrice();
    //     }
    //     calcPrice() {
    //         this.price = +this.price * this.transfer;
    //     }
    //     render() {
    //         const element = document.createElement('div');
    //         if (this.classes.length === 0) {
    //             this.element = 'menu__item';
    //             element.classList.add(this.element)
    //         } else {
    //             this.classes.forEach(className => element.classList.add(className));
    //         }

    //         element.innerHTML = `
    //         <img src="${this.src}" alt="${this.alt}">
    //         <h3 class="menu__item-subtitle">${this.title}</h3>
    //         <div class="menu__item-descr">${this.descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
    //         </div>
    //     `;
    //         this.parent.append(element);
    //     }
    // }

    const getResurces = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return await res.json();
    };

    // getResurces('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) =>{
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });


    getResurces('http://localhost:3000/menu')
        .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({ img, altimg, title, descr, price }) => {
            const element = document.createElement('div');
            element.classList.add('menu__item');
            price = price * 103;
            element.innerHTML = `
                <img src="${img}" alt="${altimg}">
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> руб/день</div>
                </div>
            `;
            document.querySelector('.menu .container').append(element);
        });
    }

    //Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindpostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        });

        return await res.json();
    }

    function bindpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));



            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                })

        });
    }

    function showThanksModal(message) {
        const previosModalDialog = document.querySelector('.modal__dialog');
        previosModalDialog.classList.add('hide');//скрываем добавленное окно для заполнения
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class = "modal__content">
                <div class = "modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            previosModalDialog.classList.remove('hide');
            previosModalDialog.classList.add('show');
            closeModal();
        }, 4000);

    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

    // Sliders

    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slideWrapper = document.querySelector('.offer__slider-wrapper'),
        slideField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slideWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    slideField.style.display = 'flex';
    slideField.style.transition = '1s all';
    slideField.style.width = 100 * slides.length + '%';

    slideWrapper.style.overflow = 'hidden';

    slides.forEach((slide) => {
        slide.style.width = width;
    });

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else total.textContent = slides.length;

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slideField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex < slides.length) {
            slideIndex++;
        } else {
            slideIndex = 1;
        }
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else current.textContent = slideIndex;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slideField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex < 2) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else current.textContent = slideIndex;
    });
    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else total.textContent = slides.length;

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }
    //     slides.forEach(item => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slideIndex < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else current.textContent = slideIndex;
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1)
    // });
    // next.addEventListener('click', () => {
    //     plusSlides(1)
    // });
});
