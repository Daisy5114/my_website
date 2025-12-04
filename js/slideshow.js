// 幻灯片功能
let slideIndex = 0;
let slideInterval;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    showSlides();
    startAutoPlay();
    
    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            plusSlides(-1);
        } else if (e.key === 'ArrowRight') {
            plusSlides(1);
        }
    });
});

// 显示幻灯片
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    // 隐藏所有幻灯片
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    // 更新指示点状态
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // 显示当前幻灯片
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    }
    
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
    }
}

// 跳转到指定幻灯片
function currentSlide(n) {
    clearInterval(slideInterval);
    slideIndex = n - 1;
    showSlides();
    startAutoPlay();
}

// 切换幻灯片
function plusSlides(n) {
    clearInterval(slideInterval);
    slideIndex += n - 1;
    showSlides();
    startAutoPlay();
}

// 开始自动播放
function startAutoPlay() {
    slideInterval = setInterval(showSlides, 2000); // 每2秒切换
}

// 幻灯片悬停暂停功能
const slideshowContainer = document.getElementById('slideshowContainer');
if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slideshowContainer.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
    
    // 触摸设备支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    slideshowContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    slideshowContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(touchStartX, touchEndX);
    }, {passive: true});
    
    function handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        
        if (startX - endX > swipeThreshold) {
            // 向左滑动，下一张
            plusSlides(1);
        } else if (endX - startX > swipeThreshold) {
            // 向右滑动，上一张
            plusSlides(-1);
        }
    }
}