/**
 * Inicijalizuje footer sekciju sajta tako što dinamički popunjava informacije i društvene mreže,
 * i dodaje animaciju na ikonice u footeru pomoću jQuery-a.
 */
export function initFooter() {
    let footer_info_section = [
        {
            name: "location",
            text: "Zdravka Čelara 12, Beograd",
            slug: "#"
        },
        {
            name: "mail",
            text: "vukasin.radovanovic.67.23@ict.edu.rs",
            slug: "#"
        },
        {
            name: "number",
            text: "+381 12 234 6789",
            slug: "#"
        },
        {
            name: "doc",
            text: "DOKUMENTACIJA",
            slug: "public/img/dokumentacija.pdf"
        },
    ]

    function infoMaker(icon) {
        let line = `<li class="footer_mainInfoHolderItem p-2"><a class="footer_mainInfoHolderItemLink footer_mainInfoHolderItemLink--${icon.name} d-flex align-items-center" href="${icon.slug}">
        <span class="footer_mainInfoHolderItemLinkText">
            ${icon.text}
        </span></a></li>`;
        return line;
    }

    let footer_infoAllCode = "";

    footer_info_section.forEach(function (icon) {
        footer_infoAllCode += infoMaker(icon);
    });

    let footer_infoContainer = document.querySelector(".footer_mainInfoHolder");

    if (footer_infoContainer) {
        footer_infoContainer.innerHTML = footer_infoAllCode;
    }

    //Footer ikonice

    let footer_icon = [
        {
            name: "facebook",
            text: "Facebook",
            slug: "#"
        },
        {
            name: "instagram",
            text: "Instagram",
            slug: "#"
        },
        {
            name: "x",
            text: "X/Twitter",
            slug: "#"
        },
    ]

    function socialIconMaker(icon) {
        let line = `<li class="footer_mainIconsHolderItem"><a class="footer_mainIconsHolderItemLink footer_mainIconsHolderItemLink--${icon.name} d-flex align-items-center" href="${icon.slug}">
        <span class="footer_mainIconsHolderItemLinkText">
            ${icon.text}
        </span></a></li>`;
        return line;
    }

    let footer_iconAllCode = "";

    footer_icon.forEach(function (icon) {
        footer_iconAllCode += socialIconMaker(icon);
    });

    let footer_iconContainer = document.querySelector(".footer_mainIconsHolder");

    if (footer_iconContainer) {
        footer_iconContainer.innerHTML = footer_iconAllCode;
    };

    //Animacija ikonica u footer-u jQuery

    $(document).ready(function () {
        $(".footer_mainIconsHolderItem").hover(
            function () {
                $(this).find(".footer_mainIconsHolderItemLink").css("transform", "translateX(-2.2rem)");  // Pomeranje ikonice ulevo
                $(this).find(".footer_mainIconsHolderItemLinkText").css("display", "block");              // Prikazivanje teksta
            },
            function () {
                $(this).find(".footer_mainIconsHolderItemLink").css("transform", "translateX(0)");        // Resetovanje ikonice
                $(this).find(".footer_mainIconsHolderItemLinkText").css("display", "none");               // Sakrivanje teksta
            }
        );
    });
}