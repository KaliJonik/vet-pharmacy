export const topnavmenu = () => {
    let menuItems = document.getElementsByClassName('menu-item')

    Array.from(menuItems).forEach((item, index) => {
        item.onclick = (e) => {
            let currMenu = document.querySelector('.menu-item.active')
            currMenu.classList.remove('active')
            item.classList.add('active')
        }
    })

}