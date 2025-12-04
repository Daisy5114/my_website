/**
 * 图集欣赏页面功能脚本
 * 处理图片画廊、筛选、搜索和模态框查看功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========== 全局变量 ==========
    let currentImages = [];
    let filteredImages = [];
    let currentPage = 1;
    let imagesPerPage = 8;
    let currentFilter = 'all';
    let currentSearchTerm = '';
    let currentImageIndex = 0; // 添加这个变量
    
    // ========== 初始化函数 ==========
    function initGallery() {
        // 获取所有图片元素
        currentImages = Array.from(document.querySelectorAll('.gallery-item'));
        filteredImages = [...currentImages];
        
        // 初始化图片计数
        updateImageCount();
        
        // 设置延迟显示动画
        initImageAnimations();
        
        // 初始化筛选功能
        initFilterButtons();
        
        // 初始化搜索功能
        initSearch();
        
        // 初始化分页功能
        initPagination();
        
        // 初始化图片点击查看功能
        initImageClick();
        
        // 初始化模态框功能
        initLightbox();
        
        // 控制台信息
        console.log('图集页面已加载');
        console.log('共 ' + currentImages.length + ' 张图片');
    }
    
    // ========== 图片动画效果 ==========
    function initImageAnimations() {
        currentImages.forEach((item, index) => {
            // 设置延迟显示
            setTimeout(() => {
                item.style.animationDelay = (index * 0.1) + 's';
            }, 100);
        });
    }
    
    // ========== 筛选功能 ==========
    function initFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 移除其他按钮的active类
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // 添加当前按钮的active类
                this.classList.add('active');
                
                // 获取筛选条件
                currentFilter = this.getAttribute('data-filter');
                
                // 筛选图片
                filterImages();
                
                // 重置分页
                resetPagination();
            });
        });
    }
    
    function filterImages() {
        if (currentFilter === 'all') {
            filteredImages = [...currentImages];
        } else {
            filteredImages = currentImages.filter(item => {
                return item.getAttribute('data-category') === currentFilter;
            });
        }
        
        // 如果有关键词搜索，继续筛选
        if (currentSearchTerm) {
            filterBySearch();
        } else {
            // 显示筛选结果
            displayFilteredImages();
        }
    }
    
    // ========== 搜索功能 ==========
    function initSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        // 搜索按钮点击事件
        searchBtn.addEventListener('click', performSearch);
        
        // 输入框回车事件
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // 输入框输入事件（实时搜索）
        searchInput.addEventListener('input', function() {
            if (this.value.trim() === '') {
                currentSearchTerm = '';
                filterImages();
            }
        });
    }
    
    function performSearch() {
        const searchInput = document.getElementById('searchInput');
        currentSearchTerm = searchInput.value.trim().toLowerCase();
        
        if (currentSearchTerm) {
            filterBySearch();
        } else {
            // 如果没有搜索词，只按分类筛选
            filterImages();
        }
    }
    
    function filterBySearch() {
        if (!currentSearchTerm) {
            displayFilteredImages();
            return;
        }
        
        filteredImages = currentImages.filter(item => {
            // 检查分类
            if (currentFilter !== 'all' && item.getAttribute('data-category') !== currentFilter) {
                return false;
            }
            
            // 检查标签
            const tags = item.getAttribute('data-tags').toLowerCase();
            if (tags.includes(currentSearchTerm)) {
                return true;
            }
            
            // 检查标题和描述
            const title = item.querySelector('.image-title').textContent.toLowerCase();
            const desc = item.querySelector('.image-desc').textContent.toLowerCase();
            
            return title.includes(currentSearchTerm) || desc.includes(currentSearchTerm);
        });
        
        displayFilteredImages();
    }
    
    // ========== 显示筛选后的图片 ==========
    function displayFilteredImages() {
        // 隐藏所有图片
        currentImages.forEach(item => {
            item.style.display = 'none';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });
        
        // 显示筛选后的图片（按当前分页）
        const startIndex = (currentPage - 1) * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
        const pageImages = filteredImages.slice(startIndex, endIndex);
        
        pageImages.forEach((item, index) => {
            setTimeout(() => {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
        
        // 更新图片计数
        updateImageCount();
        
        // 更新分页按钮状态
        updatePaginationButtons();
    }
    
    function updateImageCount() {
        const countElement = document.getElementById('imageCount');
        if (countElement) {
            countElement.textContent = `共 ${filteredImages.length} 张图片`;
        }
    }
    
    // ========== 分页功能 ==========
    function initPagination() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const pageNumbers = document.querySelectorAll('.page-number');
        
        // 上一页按钮
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayFilteredImages();
                updateActivePageNumber();
                updatePaginationButtons();
            }
        });
        
        // 下一页按钮
        nextBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayFilteredImages();
                updateActivePageNumber();
                updatePaginationButtons();
            }
        });
        
        // 页码点击
        pageNumbers.forEach((number, index) => {
            number.addEventListener('click', function() {
                currentPage = index + 1;
                displayFilteredImages();
                updateActivePageNumber();
                updatePaginationButtons();
            });
        });
    }
    
    function resetPagination() {
        currentPage = 1;
        updateActivePageNumber();
        updatePaginationButtons();
        setTimeout(() => {
            displayFilteredImages();
        }, 300);
    }
    
    function updateActivePageNumber() {
        const pageNumbers = document.querySelectorAll('.page-number');
        pageNumbers.forEach((number, index) => {
            if (index + 1 === currentPage) {
                number.classList.add('active');
            } else {
                number.classList.remove('active');
            }
        });
    }
    
    function updatePaginationButtons() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
        
        // 更新上一页按钮状态
        prevBtn.disabled = currentPage === 1;
        
        // 更新下一页按钮状态
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
        
        // 更新页码显示
        updatePageNumbersDisplay(totalPages);
    }
    
    function updatePageNumbersDisplay(totalPages) {
        const pageNumbersContainer = document.querySelector('.page-numbers');
        if (!pageNumbersContainer) return;
        
        // 清空现有页码
        pageNumbersContainer.innerHTML = '';
        
        // 显示最多5个页码
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        // 调整起始页码
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }
        
        // 创建页码按钮
        for (let i = startPage; i <= endPage; i++) {
            const pageNumber = document.createElement('span');
            pageNumber.className = 'page-number';
            if (i === currentPage) {
                pageNumber.classList.add('active');
            }
            pageNumber.textContent = i;
            pageNumber.addEventListener('click', function() {
                currentPage = i;
                displayFilteredImages();
                updateActivePageNumber();
                updatePaginationButtons();
            });
            pageNumbersContainer.appendChild(pageNumber);
        }
    }
    
    // ========== 图片点击查看功能 ==========
    function initImageClick() {
        currentImages.forEach((item, index) => {
            const imageContainer = item.querySelector('.gallery-image');
            
            // 点击图片容器打开模态框
            imageContainer.addEventListener('click', function() {
                // 找到当前图片在filteredImages中的索引
                const clickedImage = this.closest('.gallery-item');
                const imageIndex = filteredImages.findIndex(img => img === clickedImage);
                
                if (imageIndex !== -1) {
                    currentImageIndex = imageIndex; // 更新全局变量
                    openLightbox();
                }
            });
        });
    }
    
    // ========== 模态框功能 ==========
    function initLightbox() {
        const lightboxModal = document.getElementById('lightboxModal');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');
        const lightboxImage = document.getElementById('lightboxImage');
        
        // 关闭模态框
        lightboxClose.addEventListener('click', closeLightbox);
        
        // 点击模态框背景关闭
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
        
        // ESC键关闭
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                closeLightbox();
            }
        });
        
        // 上一张
        lightboxPrev.addEventListener('click', function() {
            navigateLightbox(-1);
        });
        
        // 下一张
        lightboxNext.addEventListener('click', function() {
            navigateLightbox(1);
        });
        
        // 键盘左右键导航
        document.addEventListener('keydown', function(e) {
            if (!lightboxModal.classList.contains('active')) return;
            
            if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        });
        
        // 打开模态框函数
        function openLightbox() {
            if (currentImageIndex >= 0 && currentImageIndex < filteredImages.length) {
                updateLightboxContent();
                lightboxModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // 防止背景滚动
                
                // 添加控制台日志用于调试
                console.log('打开模态框，图片索引:', currentImageIndex);
                console.log('图片总数:', filteredImages.length);
            }
        }
        
        // 关闭模态框
        function closeLightbox() {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = ''; // 恢复背景滚动
        }
        
        // 导航到上一张或下一张
        function navigateLightbox(direction) {
            currentImageIndex += direction;
            
            // 循环浏览
            if (currentImageIndex < 0) {
                currentImageIndex = filteredImages.length - 1;
            } else if (currentImageIndex >= filteredImages.length) {
                currentImageIndex = 0;
            }
            
            updateLightboxContent();
            
            // 调试日志
            console.log('导航到图片索引:', currentImageIndex);
        }
        
        // 更新模态框内容
        function updateLightboxContent() {
            if (currentImageIndex < 0 || currentImageIndex >= filteredImages.length) return;
            
            const imageItem = filteredImages[currentImageIndex];
            const imageSrc = imageItem.querySelector('img').getAttribute('data-fullsize');
            const imageAlt = imageItem.querySelector('img').getAttribute('alt');
            const title = imageItem.querySelector('.image-title').textContent;
            const description = imageItem.querySelector('.image-desc').textContent;
            const category = imageItem.querySelector('.image-category').textContent;
            const date = imageItem.querySelector('.image-date').textContent;
            
            // 显示加载状态
            lightboxImage.style.opacity = '0';
            
            // 预加载图片
            const img = new Image();
            img.onload = function() {
                lightboxImage.src = imageSrc;
                lightboxImage.alt = imageAlt;
                lightboxImage.style.opacity = '1';
            };
            
            img.onerror = function() {
                // 如果大图加载失败，使用缩略图
                lightboxImage.src = imageItem.querySelector('img').getAttribute('src');
                lightboxImage.alt = imageAlt;
                lightboxImage.style.opacity = '1';
                console.warn('大图加载失败，使用缩略图');
            };
            
            img.src = imageSrc;
            
            // 更新文本信息
            document.getElementById('lightboxTitle').textContent = title;
            document.getElementById('lightboxDescription').textContent = description;
            document.getElementById('lightboxCategory').textContent = category;
            document.getElementById('lightboxDate').textContent = date;
            
            // 调试日志
            console.log('更新模态框内容:', title);
        }
        
        // 将openLightbox函数暴露给window对象，以便调试
        window.openLightbox = openLightbox;
        window.navigateLightbox = navigateLightbox;
    }
    
    // ========== 图片懒加载优化 ==========
    function initLazyLoading() {
        const images = document.querySelectorAll('.gallery-image img');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('src');
                    
                    // 如果图片还未加载
                    if (!img.classList.contains('loaded')) {
                        img.src = src;
                        img.classList.add('loaded');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        images.forEach(img => {
            if (!img.classList.contains('loaded')) {
                imageObserver.observe(img);
            }
        });
    }
    
    // ========== 图片下载提示 ==========
    function initDownloadNotice() {
        const images = document.querySelectorAll('.gallery-image img');
        
        images.forEach(img => {
            img.addEventListener('contextmenu', function(e) {
                // 可以在这里添加自定义右键菜单逻辑
                console.log('右键点击了图片:', this.alt);
            });
        });
    }
    
    // ========== 页面加载动画 ==========
    function initPageAnimation() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
    
    // ========== 调试函数 ==========
    function initDebugFunctions() {
        // 添加调试按钮（仅开发时使用）
        const debugBtn = document.createElement('button');
        debugBtn.textContent = '调试：测试图片点击';
        debugBtn.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            z-index: 1000;
            padding: 10px;
            background: #f39c12;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            display: none; /* 默认隐藏 */
        `;
        document.body.appendChild(debugBtn);
        
        debugBtn.addEventListener('click', function() {
            console.log('=== 调试信息 ===');
            console.log('currentImages:', currentImages.length);
            console.log('filteredImages:', filteredImages.length);
            console.log('currentImageIndex:', currentImageIndex);
            
            // 测试打开第一张图片
            if (filteredImages.length > 0) {
                currentImageIndex = 0;
                window.openLightbox();
            }
        });
        
        // 按F12显示调试按钮
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12') {
                debugBtn.style.display = debugBtn.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
    
    // ========== 初始化所有功能 ==========
    function initAll() {
        initPageAnimation();
        initGallery();
        initLazyLoading();
        initDownloadNotice();
        initDebugFunctions(); // 添加调试功能
        
        // 初始显示
        setTimeout(() => {
            displayFilteredImages();
        }, 500);
    }
    
    // 启动初始化
    initAll();
});

// ========== 全局函数（供外部调用） ==========

/**
 * 外部调用打开指定图片
 * @param {number} imageIndex - 图片索引
 */
window.showImage = function(imageIndex) {
    if (window.openLightbox) {
        // 这里需要传递正确的索引，但由于作用域限制，可能需要其他方法
        console.warn('showImage函数需要更多的上下文信息');
    }
};

/**
 * 外部调用筛选图片
 * @param {string} category - 分类名称
 */
window.filterByCategory = function(category) {
    const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
    if (filterBtn) {
        filterBtn.click();
    }
};