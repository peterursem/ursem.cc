export default class Scroller {

    div;
    bgDiv;
    scrollTimer;
    listeners = {};

    constructor(){
        this.div = document.getElementById('imgs');
        this.bgDiv = document.getElementById('bgs');
        this.setScrollListener();
        //this.div.onscroll = () => {this.handleScroll(this)};
        this.scrollTimer = -1;
    }

    setScrollListener(){
        this.div.addEventListener('scroll', () => {
            this.div.scrollTop = 0;
            this.handleScroll(this);
        }, {once: true});
    }

    scrollEvent = new Event('scrollFinished');

    scrollFinished() {
            this.div.scrollTop = 0;
            console.log('Scroll Finished');
            this.emit('scrollFinished');
            this.setScrollListener();
    }
    
    lasttime = Date.now();
    handleScroll(that) {
        console.log('Handle Scroll...');
        that.bgDiv.scrollTop = that.div.scrollTop;
        console.log('dScroll:',Date.now() - this.lasttime, 'BG:', that.bgDiv.scrollTop, '/', that.bgDiv.scrollHeight, 'IMG:', that.div.scrollTop, '/', that.div.scrollHeight);
        that.lasttime = Date.now();
        that.scrollTimer = setTimeout(() => {that.scrollFinished();}, 2500);
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