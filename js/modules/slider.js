function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    // Sliders

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slideWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slideWrapper).width,
        slideField = document.querySelector(field);

    let slideIndex = 1;
    let offset = 0;

    slideField.style.display = 'flex';
    slideField.style.transition = '1s all';
    slideField.style.width = 100 * slides.length + '%';

    slideWrapper.style.overflow = 'hidden';

    slider.style.position = 'relative';

    const dots = document.createElement('ol');
    let arrDots = [];
    dots.classList.add('carousel-indicators');
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }

        dots.append(dot);
        arrDots.push(dot);
    }

    slides.forEach((slide) => {
        slide.style.width = width;
    });

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else total.textContent = slides.length;

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        slideField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex < slides.length) {
            slideIndex++;
        } else {
            slideIndex = 1;
        }
        checkSlideNumber();

        arrDots.forEach(dot => dot.style.opacity = '0.5');
        arrDots[slideIndex - 1].style.opacity = '1';
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slideField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex < 2) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        checkSlideNumber();
        arrDots.forEach(dot => dot.style.opacity = '0.5');
        arrDots[slideIndex - 1].style.opacity = '1';
    });

    arrDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slideField.style.transform = `translateX(-${offset}px)`;

            checkSlideNumber();

            arrDots.forEach(dot => dot.style.opacity = '0.5');
            arrDots[slideIndex - 1].style.opacity = '1';

        });
    });

    function checkSlideNumber() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
}
export default slider;