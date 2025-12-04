/**
 * 主功能脚本 - 适用于所有页面
 * 包括导航菜单、滚动效果、版权年份更新等
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========== 移动端菜单切换 ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        // 菜单按钮点击事件
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // 汉堡菜单动画
            const menuLines = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                menuLines[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                menuLines[1].style.opacity = '0';
                menuLines[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                menuLines[0].style.transform = 'none';
                menuLines[1].style.opacity = '1';
                menuLines[2].style.transform = 'none';
            }
        });
        
        // 点击导航链接关闭菜单
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                
                // 重置菜单按钮动画
                const menuLines = menuToggle.querySelectorAll('span');
                menuLines[0].style.transform = 'none';
                menuLines[1].style.opacity = '1';
                menuLines[2].style.transform = 'none';
            });
        });
        
        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                
                // 重置菜单按钮动画
                const menuLines = menuToggle.querySelectorAll('span');
                menuLines[0].style.transform = 'none';
                menuLines[1].style.opacity = '1';
                menuLines[2].style.transform = 'none';
            }
        });
    }
    
    // ========== 页面滚动效果 ==========
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.style.backgroundColor = '#2c3e50';
                header.style.backdropFilter = 'none';
            }
        }
        
        // 滚动到顶部按钮显示/隐藏
        const scrollTopBtn = document.querySelector('.scroll-top-btn');
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    });
    
    // ========== 更新版权年份 ==========
    function updateCopyrightYear() {
        const copyrightElements = document.querySelectorAll('.copyright, .footer-bottom p');
        const currentYear = new Date().getFullYear();
        
        copyrightElements.forEach(element => {
            if (element.textContent.includes('2025')) {
                element.innerHTML = element.innerHTML.replace('2025', currentYear);
            }
        });
    }
    updateCopyrightYear();
    
    // ========== 卡片悬停效果 ==========
    function initCardHoverEffects() {
        const characterCards = document.querySelectorAll('.character-card');
        const featureCards = document.querySelectorAll('.feature-card, .feature');
        
        characterCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });
        });
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(5deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
    initCardHoverEffects();
    
    // ========== 平滑滚动到锚点 ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是页面内锚点链接（不是#或#top）
            if (href.startsWith('#') && href.length > 1 && href !== '#top') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========== 创建并添加返回顶部按钮 ==========
    function createScrollTopButton() {
        // 检查是否已存在
        if (document.querySelector('.scroll-top-btn')) return;
        
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.innerHTML = '↑';
        scrollTopBtn.setAttribute('aria-label', '返回顶部');
        
        // 添加样式
        scrollTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(to right, #3498db, #9b59b6);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(scrollTopBtn);
        
        // 点击返回顶部
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // 添加显示/隐藏的CSS类
        const style = document.createElement('style');
        style.textContent = `
            .scroll-top-btn.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            .scroll-top-btn:not(.show) {
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
            }
            .scroll-top-btn:hover {
                background: linear-gradient(to right, #2980b9, #8e44ad);
                transform: translateY(-3px) !important;
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            }
        `;
        document.head.appendChild(style);
    }
    createScrollTopButton();
    
    // ========== 图片懒加载 ==========
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // 浏览器不支持 IntersectionObserver 的回退方案
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
    initLazyLoading();
    
    // ========== 页面加载动画 ==========
    function initPageLoad() {
        // 添加页面加载完成后的淡入效果
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
    initPageLoad();
    
    // ========== 控制台欢迎信息 ==========
    function showConsoleMessage() {
        const isHomePage = window.location.pathname.includes('index.html') || 
                          window.location.pathname.endsWith('/') ||
                          window.location.pathname.endsWith('/html/');
        
        const pageName = isHomePage ? '首页' : 
                        window.location.pathname.includes('contact.html') ? '联系反馈页面' : 
                        '其他页面';
        
        console.log('%c 葬送的芙莉莲动漫网站 ', 'color: #9b59b6; font-size: 18px; font-weight: bold;');
        console.log(`%c欢迎访问《葬送的芙莉莲》${pageName}！`, 'color: #3498db; font-size: 14px;');
        console.log('%c本网站为专科毕业设计项目，展示前端开发技能。', 'color: #7f8c8d; font-size: 12px;');
        console.log('%c有任何问题请访问联系反馈页面', 'color: #2ecc71; font-size: 12px;');
    }
    showConsoleMessage();
    
    // ========== 窗口大小改变时重置菜单 ==========
    window.addEventListener('resize', function() {
        // 如果窗口宽度大于768px且菜单是打开的，则关闭菜单
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                
                // 重置菜单按钮动画
                const menuLines = menuToggle.querySelectorAll('span');
                menuLines[0].style.transform = 'none';
                menuLines[1].style.opacity = '1';
                menuLines[2].style.transform = 'none';
            }
        }
    });
});

// ========== 全局辅助函数 ==========

/**
 * 防抖函数，用于优化频繁触发的事件
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖处理后的函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数，用于优化频繁触发的事件
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 限制时间（毫秒）
 * @returns {Function} 节流处理后的函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 切换页面主题（深色/浅色模式）
 * 注意：这个功能需要额外的CSS支持
 */
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

/**
 * 检查并应用保存的主题设置
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
}

// 页面加载后应用主题
window.addEventListener('load', loadTheme);