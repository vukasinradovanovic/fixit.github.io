/**
 * Dinamički generiše i prikazuje navigacioni meni na sajtu.
 */
export function initNavigation() {
    let links = [                   //Linkovi i tekst za navigaciju

        {
            slug: "index.html",
            text: "Početna"
        },
        {
            slug: "usluge.html",
            text: "Usluge"
        },
        {
            slug: "o_autoru.html",
            text: "O autoru"
        }
    ];

    function linkMaker(link) {
        let line = `<li class="nav-item nav_listItem"><a href="${link.slug}" class="nav-item nav-link nav_listItemLink">${link.text}</a></li>`;
        return line;
    }

    let navLink = "";

    links.forEach(function (link) {
        navLink += linkMaker(link);
    })

    let navHolder = document.querySelector(".navigation");

    if (navHolder) {
        navHolder.innerHTML = navLink;
    }

    //Navigacija - meni koji ostaje na vrhu
    const navbar = document.querySelector('.navHolder');

    function updateNavbarOpacity() {
        if (window.scrollY <= 400) {
            navbar.style.opacity = '1';
        } else {
            navbar.style.opacity = '0.7';
        }
    }

    function scrollNavbar() {
        if (window.scrollY > 400) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateNavbarOpacity();
    }

    // Mis van navigacije
    navbar.addEventListener('mouseenter', () => {
        if (window.scrollY > 400) {
            navbar.style.opacity = '1';
        }
    });

    // Mis unutar navigacije
    navbar.addEventListener('mouseleave', () => {
        if (window.scrollY > 400) {
            navbar.style.opacity = '0.7';
        }
    });

    window.addEventListener('scroll', () => {
        if (window.innerWidth > 990) {
            scrollNavbar();
        }
    });

}