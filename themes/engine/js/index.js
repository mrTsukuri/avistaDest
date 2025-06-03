import JsTabs from 'js-tabs';
import MmenuLight from 'mmenu-light';
import StarRating from 'star-rating.js';
import { Modal } from './../../../../node_modules/bootstrap/dist/js/bootstrap.esm.min';
import tippy from 'tippy.js';




function parseHTML(html) {
    const t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
}

  
document.addEventListener('DOMContentLoaded', function () {
    //spoiler
    if (document.querySelector('.spoiler')) {
        document.querySelectorAll('.spoiler').forEach(item => {
            let btn = item.querySelector('.spoiler-btn');
            let container = item.querySelector('.spoiler-block');
            if(container.classList.contains('active')){
                container.style.height = container.clientHeight + 'px';
            }
            btn.addEventListener('click', function(event) {
                event.preventDefault();
                btn.classList.toggle('active');
                event.target.closest('.spoiler').classList.toggle('active');
                if(!container.classList.contains('active')){
                    container.classList.add('active');
                    container.style.height = 'auto';
                    let height = container.clientHeight + 'px';
                    container.style.height = '0px'; 
                    setTimeout(function () {
                        container.style.height = height;
                    }, 0);    
                } else {                    
                    container.style.height = '0px';                                                            
                    setTimeout(function () {                    
                        container.classList.remove('active');
                    }, 350);                
                }                
            })
            
        })
    } 
    tippy('[data-tippy-content]')
    // рейтинг
    if(document.querySelector('.rating')){
        document.querySelectorAll('.star-rating').forEach(item => {
            new StarRating(item, {
                clearable: true,
                tooltip: false,
                maxStars: 5,  
            })
        });    
    }                                         
    //mobileMenu
    if(document.querySelector('#mobile-menu') && document.querySelector('a[href="#mobile-menu"]')){                                      
        const navMenu = document.querySelector("#mobile-menu");
        let mobileMenu = new MmenuLight(document.querySelector("#mobile-menu"));
        mobileMenu.navigation({
            title: "Меню",
            theme: "dark"
        });
        let drawerMenu = mobileMenu.offcanvas();
        document.querySelectorAll('a[href="#mobile-menu"]').forEach(mmenu => {
            mmenu.addEventListener('click', function (evnt) {
                evnt.preventDefault();
                drawerMenu.open();
            })
        });
        navMenu.querySelectorAll('a[href^="#"]').forEach(item => {
            item.addEventListener('click', (e) => {                
                drawerMenu.close();
            })            
        })
    }
    //map    
    if(document.querySelector('.map')){
        function mapLoad(){
            document.querySelector('.map').classList.add('preloader');            
            let map = document.querySelector('.map');
            setTimeout(() => {                
                let src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A64b181d58fe3129c3f1523628617c8a14cd8bbf04d4ab7bb9f3581482b500d73&amp;width=100%25&amp;height=400&amp;lang=ru_RU&amp;scroll=false"
                if(document.querySelector('.map-block').dataset.src){
                    src = document.querySelector('.map-block').dataset.src; 
                }
                let script = document.createElement('script');
                script.async = true;
                script.src = src;
                document.querySelector('.map-block').replaceWith(script);                                                      
            }, 1000)
            setTimeout(() => {
                document.querySelector('.map iframe').setAttribute('loading', 'lazy');
                document.querySelector('.map').classList.remove('preloader');
            }, 1500)
        }
        let load = false;        
        if(document.querySelector('.map-block').dataset.load === 'true'){
            load = true;
            mapLoad();
        }
        window.addEventListener('scroll', function(){      
            if(load === false){
                load = true;
                mapLoad();  
            }
        })
    } 
    document.querySelectorAll('.js_benefit').forEach(item => {        
        item.querySelector('.js_benefit__close').addEventListener('click', ()=>{
            item.style.display='none';
        }) 
                                            
    })        
    //notice
    // const notice = (message, delay = 4000) => {
    //     let container = document.querySelector('.js_toast_container');
    //     if (!container) {
    //         container = parseHTML(`<div aria-live="polite" aria-atomic="true">
    //                                         <div class="toast-container position-fixed top-0 end-0 p-3 js_toast_container" style="z-index: 10000;"> 
    //                                         </div>
    //                                     </div>`);
    
    //         document.querySelector('body').append(container);
    //     }    
    //     let id = Math.random().toString().substring(2);    
    //     let element = parseHTML(`<div class="toast" id="toast_${id}" role="alert" aria-live="assertive" data-bs-animation="true" data-bs-delay="${delay}" aria-atomic="true">
    //                                         <div class="toast-header">
    //                                             <button type="button" class="btn-close border-0 bg-transparent p-0" data-bs-dismiss="toast" aria-label="Close">
    //                                                 <i class="icon-u_multiply icon fs-20"></i> 
    //                                             </button>
    //                                         </div>
    //                                         <div class="toast-body">
    //                                             ${message}
    //                                         </div>
    //                                     </div>`);    
    //     container.append(element);
    //     let to = document.querySelector(`#toast_${id}`);        
    //     let t = new Toast(to);
    //     t.show();    
    //     to.addEventListener('hidden.bs.toast', () => to.remove());        
    // };    
    // window.noty = notice;            
    //Mask
    function isNumber(val) {
        return /^[-]?\d+$/.test(val);
    }    
    function format(targetInput, e) {        
        let tel = targetInput.value.replace(/[^0-9]/g, '');
        console.log(tel);           
        let result = '';
        let position = getCursorPosition(targetInput);
        if (tel.length) {
            if ("1" !== tel[0] && "2" !== tel[0] && "3" !== tel[0] && "4" !== tel[0] && "5" !== tel[0] && "6" !== tel[0] && "9" !== tel[0] || (tel = "7" + tel), "8" === tel[0])
                result = "7";
            else {
                if ("7" !== tel[0])
                    return;
                result = tel[0]
            }
            result = '+' + result,          
            result = result + " (" + tel.substring(1, 4),
            tel.length > 3 && (result = result + ") " + tel.substring(4, 7)),
            tel.length > 6 && (result = result + " " + tel.substring(7, 9)),
            tel.length > 9 && (result = result + "-" + tel.substring(9, 11))                           
        }                                      
        targetInput.value = result;               
        if (e.keyCode === 46 || e.keyCode === 8) {                     
            setCaretPosition(targetInput, position);            
        }        
    }
    function setCaretPosition(elem, caretPos) {
        let range = void 0;    
        if (elem.createTextRange) {    
            range = elem.createTextRange();    
            range.move('character', caretPos);    
            range.select();    
        } else {    
            elem.focus();    
            if (elem.selectionStart !== undefined) {    
                elem.setSelectionRange(caretPos, caretPos);    
            }    
        }    
    }            
    function getCursorPosition(element) {    
        let el = element;    
        let pos = 0;    
        if ('selectionStart' in el) {    
            pos = el.selectionStart;    
        } else if ('selection' in document) {    
            el.focus();    
            var Sel = document.selection.createRange();    
            var SelLength = document.selection.createRange().text.length;    
            Sel.moveStart('character', -el.value.length);    
            pos = Sel.text.length - SelLength;    
        }            
        return pos;    
    }    
    function formatUp(e){
        // format(e.currentTarget, e);                
        if(isNumber(e.key) || e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 37 || e.keyCode == 39){            
            format(e.currentTarget, e);
        }    
    }   
    function formatDown(e){                       
        if(!isNumber(e.key) && e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 37 && e.keyCode !== 39){            
            e.preventDefault();
            e.stopPropagation();                      
        }
    }   
    document.querySelectorAll('input[type="tel"]').forEach(input => {               
        input.addEventListener('keydown', formatDown)
        input.addEventListener('keyup', formatUp)            
    })
    //скролл до верха
    if(document.querySelector('.scroll-item')){        
        document.addEventListener('scroll', ()=> {                      
            if(window.pageYOffset > 300){
                document.querySelectorAll('.scroll-item').forEach(item => {
                    item.classList.add('active');
                })
            } else {
                document.querySelectorAll('.scroll-item').forEach(item => {
                    item.classList.remove('active');
                })    
            }

        })
        document.querySelector('.scroll-top').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        })
    }
    tabs
    function tabs(tabName){        
        if(document.querySelector(tabName)){            
            document.querySelectorAll(tabName).forEach(item => {
                let tab = new JsTabs({
                    elm: item,
                    shouldScrollTabIntoView: false,
                });
                tab.init();                    
            });            
        }    
    }
    tabs('.modules__tabs');
    tabs('.works__tabs');
    document.querySelectorAll('.js-modules').forEach(item => {
        const tabBtn = item.querySelectorAll('.js-tabs__tab');
        const tabBlock = item.querySelectorAll('.js-tabs__content');
        const tabSlider = item.querySelectorAll('.modules__slider-wrapper');
        tabBtn.forEach(btn => {            
            btn.addEventListener('click', function() {
                let currentArticle = btn.dataset.article;                
                tabBlock.forEach(block => block.classList.remove('active'));
                tabSlider.forEach(block => block.classList.remove('active'));
                let currentBlock = item.querySelector(`.js-tabs__content[data-article="${currentArticle}"]`);
                let currentSlider = item.querySelector(`.modules__slider-wrapper[data-article="${currentArticle}"]`);
                currentBlock.classList.add('active');  
                currentSlider.classList.add('active');  
            })
        })
        tabBtn[0].classList.add('active');
        tabBlock[0].classList.add('active');
        tabSlider[0].classList.add('active');
    })
    //call_modal
    if(document.querySelector('.js_callModal')){
        const forms = document.querySelectorAll('.js_callModal');
        const sModal = document.querySelector('.modal-success');
        forms.forEach(form => {
            form.addEventListener('submit', (e) =>{
                e.preventDefault();
                const modalBoot = new Modal(sModal);                
                modalBoot.show();                
            })
        })
    }
    document.querySelectorAll('.modules__img').forEach(item => {        
        let src = item.querySelector('img').src;
        let backBlock = document.createElement('div');
        backBlock.classList.add('modules__img-back');
        backBlock.style.backgroundImage = `url(${src})`;
        item.appendChild(backBlock);             

    })
})
