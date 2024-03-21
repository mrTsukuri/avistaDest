import Swiper, {Navigation, Pagination, Thumbs, EffectFade} from 'swiper';

  document.addEventListener('DOMContentLoaded', function () {               
    document.querySelectorAll('.slider-modules').forEach(modulesSlider => {
        let currentCategory = modulesSlider.dataset.article;                   
        let worksSlideThumbs = new Swiper(`.slider-modules-thumbs[data-article="${currentCategory}"]`, {            
            slidesPerView: 6,            
            spaceBetween: 20,                                   
            direction: "vertical",                       
        });        
        const swiperDefOpt = {            
            spaceBetween: 20,
            slidesPerView: 1,            
            direction: "horizontal",
            breakpoints: {
                960: {                              
                    direction: "vertical",    
                }
            }   
        }  
        const swiperProductOpt = { 
            modules: [Thumbs],                      
            thumbs: {
                swiper: worksSlideThumbs
            },            
        } 
        if(document.querySelector('.slider-modules-thumbs')){            
            new Swiper(modulesSlider, Object.assign({}, swiperDefOpt, swiperProductOpt));
        }
        else{            
            new Swiper(modulesSlider, Object.assign({}, swiperDefOpt));    
        }               
    }) 
    document.querySelectorAll('.slider-works').forEach(modulesSlider => {
        let currentCategory = modulesSlider.dataset.article;                   
        let worksSlideThumbs = new Swiper(`.slider-works-thumbs[data-article="${currentCategory}"]`, {            
            slidesPerView: 5,            
            spaceBetween: 5,                                                                    
        });        
        const swiperDefOpt = {            
            spaceBetween: 5,
            slidesPerView: 1,                           
        }  
        const swiperProductOpt = { 
            modules: [Thumbs],                      
            thumbs: {
                swiper: worksSlideThumbs
            },            
        } 
        if(document.querySelector('.slider-works')){            
            new Swiper(modulesSlider, Object.assign({}, swiperDefOpt, swiperProductOpt));
        }
        else{            
            new Swiper(modulesSlider, Object.assign({}, swiperDefOpt));    
        }               
    }) 
    
    document.querySelectorAll('.slider-reviews').forEach(item => {                                
        let currentNavigation = document.querySelector(`.slider-navigation-reviews`);                     
        let navigation = {};
        let pagination = {};                       
        if (currentNavigation) {
            let next = '.slider-navigation-reviews .slider-next';                
            let prev = '.slider-navigation-reviews .slider-prev';                
            navigation = {
                nextEl: next,
                prevEl: prev,
            },
            pagination = {
                el: '.slider-navigation-reviews .slider-pagination',
                type: 'fraction',                
            };                 
        }       
        new Swiper(item, {
            modules: [Navigation, Pagination, EffectFade],
            navigation: navigation,
            pagination: pagination,                
            spaceBetween: 10,
            slidesPerView: 1,
            allowTouchMove: false,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },                      
        });
    });
                      
})    