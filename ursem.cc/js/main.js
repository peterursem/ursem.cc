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
        let last = document.getElementById("last");
        first.style.color = getThemeColor();
        first.style.top = getRandHeight();
        last.style.color = getThemeColor();
        last.style.bottom = getRandHeight();
        coverDiv.appendChild(first);
        coverDiv.appendChild(last);
    }
    
    function getThemeColor() {
        const themeColors = ['#6cb8c5','#84c09e','#ecdb64','#de6e5a'];
        return themeColors[Math.floor(Math.random() * themeColors.length)];
    }
    
    function getRandHeight() {
        let height = Math.floor(Math.random() * (window.innerHeight*0.3));
        return height + 'px';
    }

setCover();