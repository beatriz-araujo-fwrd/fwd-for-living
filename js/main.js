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


    // SERVICES PAGE 
    // - Hero Reveal
    const imgOverlayContainer = document.querySelector('.header32_background-image-wrapper.overlay-reveal');

    if (imgOverlayContainer) {
        gsap.to(imgOverlayContainer, {
            delay: .4,
            clipPath: 'polygon(25% 90%, 75% 90%, 75% 100%, 25% 100%)',
            duration: .5,
            ease: 'power2.out'
        });
        
        setTimeout(() => {
            gsap.fromTo(imgOverlayContainer, {
                clipPath: 'polygon(25% 90%, 75% 90%, 75% 100%, 25% 100%)',
            },{
                scrollTrigger: {
                    trigger: '.services_hero_section',
                    pin: true,
                    start: 'top top',
                    end: '+=200%',
                    scrub: true,
                },
                immediateRender: false,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1,
                ease: 'power2.out'
            })
        }, 600);
    }

    // - Project Rows
    const pjStepsRows = document.querySelectorAll('.step-row');
    const pjStepsContainer = document.querySelector('.project-step-container-2');
    const pjDescList = document.querySelectorAll('.pj_step_desc');

    if (pjStepsContainer && pjStepsRows.length > 0 && pjDescList.length > 0) {
        pjStepsRows.forEach((row, i) => {
            ScrollTrigger.create({
                trigger: row,
                start: 'top 35%',
                end: 'bottom 35%',
                onEnter: () => {
                    let currentActiveRow = document.querySelector('.step-row.active');
                    let currentActiveDesc = document.querySelector('.pj_step_desc.active');
                    // just to make sure there are no more than 1 row with the .active class
                    if (currentActiveRow) {
                        currentActiveRow.classList.remove('active');
                    }
                    //apply same logic to desc container
                    if (currentActiveDesc) {
                        currentActiveDesc.classList.remove('active');
                    }
                    row.classList.add('active');
                    pjDescList[i].classList.add('active');
                },
                onLeave: () => {
                    row.classList.remove('active');
                },
                onEnterBack: () => {
                    let currentActiveRow = document.querySelector('.step-row.active');
                    let currentActiveDesc = document.querySelector('.pj_step_desc.active');
                    if (currentActiveRow) {
                        currentActiveRow.classList.remove('active');
                    }
                    if (currentActiveDesc) {
                        currentActiveDesc.classList.remove('active');
                    }
                    row.classList.add('active');
                    pjDescList[i].classList.add('active');
                },
                onLeaveBack: () => {
                    row.classList.remove('active');
                }
            });
        });

        // rows slide-in and ruller scroll effect
        gsap.from('.step-name', {
            scrollTrigger: {
                trigger: pjStepsContainer,
                start: 'top bottom',
                end: 'bottom 35%',
                scrub: true,
                // markers: true,
                onUpdate: ()=> {
                    // ADD INDEX TRUNCATION HERE BASED ON PROGRESS AND # OF RULER MARKERS
                },
                onEnter: ()=> {
                    // ADD .pj_step_context_container VISIBILITY HANDLERS HERE
                }
            },
            paddingLeft: '100rem',
            stagger: .05,
            ease: 'power2.out'
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
                // gsap.to(filterInner, {
                //     x: currentX,
                //     duration: .8,
                //     ease: 'power2.out'
                // });

                // update active index
                activeIndex = index;
            });
        });

    }

    // CASE HOVER (WORK PAGE)
    const caseListContainer = document.querySelector('.blog12_list');
    const caseList = document.querySelectorAll('.blog12_item');
    const seeMoreTag = document.querySelector('.see-more-text-container');

    if (caseListContainer && seeMoreTag && caseList.length > 0 && window.innerWidth > 991) {
        caseList.forEach((item) => {
            let itemImg = item.querySelector('img');

            itemImg.addEventListener('mouseover', (e) => {
                e.stopPropagation();
                seeMoreTag.classList.add('show');
            });

            itemImg.addEventListener('mouseout', (e) => {
                e.stopPropagation();
                seeMoreTag.classList.remove('show');
            });
        });

        setTimeout(() => {
            window.addEventListener('mousemove', (e) => {
                let mouseX = e.clientX;
                let mouseY = e.clientY;

                gsap.to(seeMoreTag, {
                    left: mouseX + 10,
                    top: mouseY - 35,
                    duration: .5,
                    delay: .01,
                    ease: 'power2.out'
                });
            });
        }, 200);
    }

    console.log("running mainInit()");
}