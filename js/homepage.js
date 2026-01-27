            // Card Highlight
            heroCards.forEach((card) => {
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 58%',
                        end: 'top 10%',
                        scrub: false,
                        onEnter: () => {
                            card.classList.add("active");
                        },
                        onLeave: () => {
                            card.classList.remove("active");
                        },
                        onEnterBack: () => {
                            card.classList.add("active");
                        },
                        onLeaveBack: () => {
                            card.classList.remove("active");
                        }
                    }
                });
            });
