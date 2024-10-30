/* 2020-2024 Peter Ursem */

function setCover() {
        const coverUrls = [
            '/images/web/cover.gif',
            '/images/2023/hualtuco/hualtuco-28.jpg',
            '/images/web/cover1.jpg',
            '/images/web/cover2.jpg',
            '/images/web/cover3.jpg',
            '/images/2024/Astronomy/07.jpg',
            '/images/2023/nl/nl-127.jpg',
            '/images/2024/Nederland/20.jpg',
            '/images/2024/Nederland/12.jpg',
            '/images/2024/Nederland/25.jpg',
            '/images/2024/Montana-Idaho/60.jpg',
            '/images/2024/Montana-Idaho/37.jpg',
            '/images/2024/Montana-Idaho/52.jpg',
            '/images/2023/nl/nl-006.jpg'
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