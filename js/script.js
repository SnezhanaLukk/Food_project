window.addEventListener('DOMContentLoaded',()=>{

    //Tabs menu
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabsContent.forEach (item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade')
        });
        tabs.forEach(item=>{
            item.classList.remove('tabheader__item_active')
        });
    }
    function showTabContent (i=0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener(('click'), event => {
        const target = event.target;
        if (target&&target.classList.contains('tabheader__item')){
            tabs.forEach((item, i)=>{
                if(target==item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });

    //Timer
    const deadline = new Date('2024-11-17T00:00:00');
    let days, hours, minutes, seconds;

    function getTimeRemaining(endtime){
        const total = Date.parse(endtime)-Date.parse(new Date());
        if (total<=0){
            days=0;
            hours=0;
            minutes=0;
            seconds=0;
        } else {
            days = Math.floor(total/1000/60/60/24);
            hours = Math.floor((total/1000/60/60)%24);
            minutes = Math.floor((total/1000/60)%60);
            seconds = Math.floor((total/1000)%60);
        }
        return {total, days, hours, minutes, seconds};
    
    }
    
    function getZero(num){
        if(num>=0&&num<10){
            return `0${num}`;
        }else return num;
    }
    
    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days=timer.querySelector('#days'),
              hours=timer.querySelector('#hours'),
              minutes=timer.querySelector('#minutes'),
              seconds=timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
                days.innerHTML = getZero(t.days);
            if (t.total<=0){
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

        // modal window

        const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow='hidden';        
    };
    
    modalCloseBtn.addEventListener('click', closeModal);

    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow='';           
    };

    modal.addEventListener('click', (e)=>{
        if (e.target === modal)
            closeModal();
    });
    document.addEventListener('keydown', (e)=>{
        if (e.code === "Escape"&& modal.classList.contains('show'))
            closeModal();
    });

});