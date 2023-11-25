export const useBackToTop = () => {

    let backToTopBtn = document.querySelector('.back-to-top')

    window.onscroll = () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopBtn.style.display = 'flex'
        } else {
            backToTopBtn.style.display = 'none'
        }
    }

}