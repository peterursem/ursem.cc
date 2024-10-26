/* 2020-2024 Peter Ursem */

function setCover() {
        const coverUrls = [
            '/images/web/cover.gif',
            '/images/web/cover0.jpg',
            '/images/web/cover1.jpg',
            '/images/web/cover2.jpg',
            '/images/web/cover3.jpg',
            '/images/web/cover4.jpg',
            //'/images/web/cover5.jpg', *ONLY WORKS ON DESKTOP*
            '/images/web/cover6.jpg'
        ]

        let coverDiv = document.getElementById('sitecover');
        const coverIndex = Math.floor(Math.random() * coverUrls.length);
        coverDiv.style.backgroundImage = 'url('+coverUrls[coverIndex]+')';
    
        let first = document.getElementById("first");
        first.style.color = getThemeColor();
        first.style.top = getRandHeight();

        let last = document.getElementById("last");
        last.style.color = getThemeColor();
        last.style.bottom = getRandHeight();
    }

    let themeColors = ['#6cb8c5','#84c09e','#ecdb64','#de6e5a'];
    
    function getThemeColor() {
        return themeColors.splice(Math.floor(Math.random() * themeColors.length),1)[0];
    }
    
    function getRandHeight() {
        let height = Math.floor(Math.random() * (window.innerHeight*0.3));
        return height + 'px';
    }

setCover();