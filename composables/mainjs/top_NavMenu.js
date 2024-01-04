export const topnavmenu = () => {
    let menuItems = document.getElementsByClassName('menu-item');
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", navHighlighter);
    function navHighlighter() {
        let scrollY = window.pageYOffset;
    
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            let sectionId = current.getAttribute("id");
    
            const link = document.querySelector(`.menu-item[data-target="${sectionId}"]`);
            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    Array.from(menuItems).forEach(item => {
                        item.classList.remove("active");
                    });
    
                    link.classList.add("active");
                } else {
                    
                    link.classList.remove("active");
                }
            }
        });
    }
    Array.from(menuItems).forEach((item, index) => {
        item.onclick = (e) => {
            let currMenu = document.querySelector('.menu-item.active');
            if (currMenu) {
                currMenu.classList.remove('active');
            }
            item.classList.add('active');
        }
    });
}
