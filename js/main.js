export function mainInit() {

    const preloader = document.querySelector('.preloader');
    const containerL = document.querySelector('.container-large'); // for container width measurements reference
    let containerWidth = containerL.offsetWidth;

    // LENIS
    window.lenis = new Lenis(); // globally available

    // Sync Lenis scrolling with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);

    if (preloader) {
        gsap.to('.preloader', {
            opacity: 0,
            delay: .1,
            duration: .5,
            ease: "power2.out",
            onComplete: () => {
                preloader.remove();
            }
        });
    }

    // RULER EFFECT (WORK PAGE)
    const filterItems = document.querySelectorAll('.filter_item');
    const filterInner = document.querySelector('.filter_ruler_inner');
    const rulerMarker = document.querySelector('.ruler_marker');
    const gap = 30;
    let distanceToNextTag = 9 * gap; // each tag is separated by 9 markers, this value will be static across different screen sizes

    if (filterInner && rulerMarker && filterItems.length > 0) {
        rulerMarker.classList.remove('active');

        // calculate total n of marker elements
        let nTotalMarkers = containerWidth * 3 / gap;

        for (let i = 0; i < nTotalMarkers; i++) {
            filterInner.appendChild(rulerMarker.cloneNode(true));
        }

        const markersList = document.querySelectorAll('.ruler_marker');
        // console.log(markersList);
        let starterMarker = markersList.length - 35;
        markersList[starterMarker].classList.add('active');

        let activeIndex = 0;
        let currentX = 0;

        filterItems.forEach((filter, index) => {
            filter.addEventListener('click', () => {

                if (activeIndex == index) {
                    return
                }

                let direction = -1;

                // check new active filter index compared to previous
                // to know direction of movement
                if (activeIndex < index) {
                    direction = 1;
                }

                let indexSpace = Math.abs(activeIndex - index); // the space (in number of indexes) that sparate the previous and current active filter
                currentX += direction * indexSpace * distanceToNextTag;

                console.log("separated by ", indexSpace);
                gsap.to(filterInner, {
                    x: currentX,
                    duration: .8,
                    ease: 'power2.out'
                });

                // update active index
                activeIndex = index;
            });
        });

    }

    console.log("running mainInit()");
}