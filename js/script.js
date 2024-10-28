/*I borrowed and used the Starbucks(https://www.starbucks.com/)navigation from the example provided on Brad Frost's website (http://bradfrost.com/blog/web/responsive-nav-patterns/).I have borrowed from including some of the design styling, most of the code logic, some of the code, and some of the interactions. */
class ResponsiveNavBar{
    constructor(responsiveMenu, navBarList, navCatenation) {
        this.navBarList = document.querySelector(navBarList);
        this.responsiveMenu = document.querySelector(responsiveMenu);
        this.navCatenation = document.querySelectorAll(navCatenation);
        this.handleClick = this.handleClick.bind(this);
        this.activeClass = "active";       
    }

    handleClick(){
        this.navBarList.classList.toggle(this.activeClass);
        this.responsiveMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }
    addClcikEvent(){
        this.responsiveMenu.addEventListener("click" ,this.handleClick)
    }

    animateLinks(){
        this.navCatenation.forEach((link,index) => {
            link.style.animation
            ? (link.style.animation = "")
            : (link.style.animation = `navLinksFading 0.2s ease forwards ${index / 50 + 0.2}s`);
        });
    }

    init(){
        if(this.responsiveMenu){
            this.addClcikEvent();
        }
        return this;
    }
}

const responsiveNavbar = new ResponsiveNavBar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
);

responsiveNavbar.init();

