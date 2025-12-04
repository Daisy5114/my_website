/* 图集页面专用样式 */

/* 页面标题区域 */
.page-header {
    padding: 60px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
}

.page-title h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.page-title p {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 800px;
    margin: 0 auto;
}

/* 图集主内容 */
.gallery-main {
    padding: 80px 0;
    background-color: #f8f9fa;
}

/* 分类筛选 */
.gallery-filters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 40px;
}

.filter-btn {
    padding: 12px 24px;
    background-color: white;
    border: 2px solid #e1e5e9;
    border-radius: 30px;
    color: #2c3e50;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.filter-btn:hover {
    border-color: #3498db;
    color: #3498db;
    transform: translateY(-2px);
}

.filter-btn.active {
    background: linear-gradient(to right, #3498db, #9b59b6);
    color: white;
    border-color: transparent;
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

/* 图片搜索 */
.gallery-search {
    display: flex;
    gap: 15px;
    margin-bottom: 40px;
    align-items: center;
    flex-wrap: wrap;
}

#searchInput {
    flex: 1;
    min-width: 200px;
    padding: 14px 20px;
    border: 2px solid #e1e5e9;
    border-radius: 30px;
    font-size: 1rem;
    color: #333;
    transition: border-color 0.3s ease;
}

#searchInput:focus {
    outline: none;
    border-color: #9b59b6;
    box-shadow: 0 0 0 3px rgba(155, 89, 182, 0.1);
}

#searchBtn {
    padding: 14px 30px;
    background: linear-gradient(to right, #3498db, #9b59b6);
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

#searchBtn:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.search-info {
    margin-left: auto;
    color: #7f8c8d;
    font-size: 0.9rem;
}

/* 图集容器 - 幻灯片画廊布局 */
.gallery-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 50px;
}

.gallery-item {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.5s ease forwards;
}

.gallery-item:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.gallery-image {
    position: relative;
    height: 250px;
    overflow: hidden;
}

.gallery-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.gallery-item:hover .gallery-image img {
    transform: scale(1.05);
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.7));
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: flex-end;
    padding: 20px;
}

.gallery-item:hover .image-overlay {
    opacity: 1;
}

.overlay-content h3 {
    color: white;
    font-size: 1.4rem;
    margin-bottom: 5px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.overlay-content p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.9rem;
    margin: 0;
}

.image-info {
    padding: 25px;
}

.image-title {
    font-size: 1.3rem;
    color: #2c3e50;
    margin-bottom: 10px;
    font-weight: 600;
}

.image-desc {
    color: #7f8c8d;
    line-height: 1.6;
    margin-bottom: 15px;
    font-size: 0.95rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.image-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.image-category {
    background-color: #f0f7ff;
    color: #3498db;
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
}

.image-date {
    color: #95a5a6;
    font-size: 0.85rem;
}

/* 分页控制 */
.gallery-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 40px;
}

.page-btn {
    padding: 12px 24px;
    background-color: white;
    border: 2px solid #e1e5e9;
    border-radius: 5px;
    color: #2c3e50;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 100px;
}

.page-btn:hover:not(:disabled) {
    border-color: #3498db;
    color: #3498db;
}

.page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.page-numbers {
    display: flex;
    gap: 10px;
}

.page-number {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 2px solid #e1e5e9;
    border-radius: 5px;
    color: #2c3e50;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.page-number:hover {
    border-color: #3498db;
    color: #3498db;
}

.page-number.active {
    background: linear-gradient(to right, #3498db, #9b59b6);
    color: white;
    border-color: transparent;
}

/* 图片查看器（模态框） */
.lightbox-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.lightbox-modal.active {
    display: flex;
    opacity: 1;
    align-items: center;
    justify-content: center;
}

.lightbox-content {
    position: relative;
    width: 90%;
    max-width: 1000px;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    max-height: 90vh;
}

.lightbox-close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    z-index: 10;
    transition: background-color 0.3s ease;
}

.lightbox-close:hover {
    background: rgba(0, 0, 0, 0.8);
}

.lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    z-index: 10;
    transition: background-color 0.3s ease;
}

.lightbox-nav:hover {
    background: rgba(0, 0, 0, 0.8);
}

.lightbox-nav.prev {
    left: 20px;
}

.lightbox-nav.next {
    right: 20px;
}

.lightbox-image-container {
    position: relative;
    height: 60vh;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
}

#lightboxImage {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.lightbox-loader {
    position: absolute;
    color: white;
    font-size: 1.2rem;
}

.lightbox-info {
    padding: 30px;
}

.lightbox-info h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 15px;
}

.lightbox-info p {
    color: #7f8c8d;
    line-height: 1.6;
    margin-bottom: 20px;
}

.lightbox-meta {
    display: flex;
    gap: 20px;
    color: #95a5a6;
    font-size: 0.9rem;
}

/* 下载提示 */
.download-notice {
    background-color: #fff8e1;
    padding: 20px;
    border-radius: 10px;
    border-left: 4px solid #ffb300;
    margin-top: 40px;
}

.download-notice p {
    color: #ff8f00;
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
}

/* 动画 */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 响应式设计 */
@media screen and (max-width: 1200px) {
    .gallery-container {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
}

@media screen and (max-width: 768px) {
    .page-title h1 {
        font-size: 2.2rem;
    }
    
    .page-title p {
        font-size: 1rem;
    }
    
    .gallery-filters {
        gap: 10px;
    }
    
    .filter-btn {
        padding: 10px 20px;
        font-size: 0.9rem;
    }
    
    .gallery-search {
        flex-direction: column;
        align-items: stretch;
    }
    
    #searchInput, #searchBtn {
        width: 100%;
    }
    
    .search-info {
        margin-left: 0;
        text-align: center;
    }
    
    .gallery-container {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }
    
    .gallery-image {
        height: 200px;
    }
    
    .image-info {
        padding: 20px;
    }
    
    .image-title {
        font-size: 1.1rem;
    }
    
    .gallery-pagination {
        flex-wrap: wrap;
        gap: 15px;
    }
    
    .lightbox-content {
        width: 95%;
    }
    
    .lightbox-image-container {
        height: 50vh;
    }
    
    .lightbox-info {
        padding: 20px;
    }
    
    .lightbox-info h2 {
        font-size: 1.4rem;
    }
}

@media screen and (max-width: 480px) {
    .page-title h1 {
        font-size: 1.8rem;
    }
    
    .gallery-container {
        grid-template-columns: 1fr;
    }
    
    .gallery-image {
        height: 180px;
    }
    
    .page-numbers {
        gap: 5px;
    }
    
    .page-number {
        width: 35px;
        height: 35px;
    }
    
    .lightbox-nav {
        width: 40px;
        height: 40px;
        font-size: 16px;
    }
    
    .lightbox-nav.prev {
        left: 10px;
    }
    
    .lightbox-nav.next {
        right: 10px;
    }
}

/* 打印样式 */
@media print {
    .page-header {
        background: none;
        color: black;
        padding: 30px 0;
    }
    
    .gallery-filters,
    .gallery-search,
    .gallery-pagination,
    .download-notice {
        display: none;
    }
    
    .gallery-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
    
    .gallery-item {
        break-inside: avoid;
        box-shadow: none;
        border: 1px solid #ddd;
    }
    
    .image-overlay {
        display: none;
    }
}