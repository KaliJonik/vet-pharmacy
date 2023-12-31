export const animation = () => {
    // on scroll animation

    let scroll = window.requestAnimationFrame || function(callback) {window.setTimeout(callback, 1000/60)}

    let elToShow = document.querySelectorAll('.play-on-scroll')

    let isElInViewPort = (el) => {
        let rect = el.getBoundingClientRect()

        return (
            (rect.top <= 0 && rect.bottom >= 0)
            ||
            (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight))
            ||
            (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
        )
    }

    let loop = () => {
        elToShow.forEach((item, index) => {
            if (isElInViewPort(item)) {
                item.classList.add('start')
            } else {
                item.classList.remove('start')
            }
        })

        scroll(loop)
 
    }

    loop();
}
