export const mobilenav = () => {
    // mobile nav

    let bottomNavItems = document.querySelectorAll('.mb-nav-item')

    let bottomMove = document.querySelector('.mb-move-item')

    bottomNavItems.forEach((item, index) => {
        item.onclick = (e) => {
            let crrItem = document.querySelector('.mb-nav-item.active')
            crrItem.classList.remove('active')
            item.classList.add('active')
            bottomMove.style.left = index * 25 + '%'
        }
    })
}