export default class Scroller {

    div;
    bgDiv;
    scrollTimer;
    listeners = {};

    constructor(){
        this.div = document.getElementById('imgs');
        this.bgDiv = document.getElementById('bgs');
        this.div.onscroll = () => {this.handleScroll(this)};
        this.scrollTimer = -1;
    }

    scrollEvent = new Event('scrollFinished');

    scrollFinished() {
        if(this.div.scrollTop > (0.5 * window.innerHeight)){
            this.emit('scrollFinished');
        }
    }
    
    handleScroll(that) {
        that.bgDiv.scrollTop = that.div.scrollTop;
        if (that.scrollTimer != -1)
            clearTimeout(that.scrollTimer);
        that.scrollTimer = setTimeout(() => {that.scrollFinished();}, 100);
    }

    emit(method, payload = null) {
        const callback = this.listeners[method];
        if(typeof callback === 'function'){
            callback(payload);
        }
    }

    addEventListener(method,callback) {
       this.listeners[method] = callback;
    }
  
    removeEventListener (method) {
        delete this.listeners[method];
     }

}