export function swiperInit() {

    console.log("running swiper.js");

    // Init Homepage Works Swiper
    let hpWorksSwiper = document.querySelector('.hp_works_swiper');
    if (hpWorksSwiper) {

        hpWorksSwiper = new Swiper('.hp_works_swiper', {
            slidesPerView: 5,
            spaceBetween: 32,
            // centeredSlides: true,
            direction: 'horizontal',
            loop: true,
            speed: 4500, // Smooth transition speed
            freeMode: false,
            freeModeMomentum: false,
            allowTouchMove: true,
            autoWidth: true,

            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
        });

    }

}