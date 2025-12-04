/**
 * 角色介绍页面功能脚本
 * 处理角色卡片的交互效果
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========== 角色卡片交互效果 ==========
    function initCharacterCards() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const secondaryItems = document.querySelectorAll('.secondary-item');
        
        // 主要角色卡片点击效果
        portfolioItems.forEach((item, index) => {
            // 添加延迟显示动画
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index);
            
            // 点击显示详细信息
            item.addEventListener('click', function() {
                const description = this.querySelector('.character-description');
                if (description) {
                    description.classList.toggle('expanded');
                    
                    if (description.classList.contains('expanded')) {
                        description.style.maxHeight = 'none';
                        description.style.overflow = 'visible';
                    } else {
                        description.style.maxHeight = '4.8em'; // 大约3行
                        description.style.overflow = 'hidden';
                    }
                }
            });
            
            // 鼠标悬停效果增强
            item.addEventListener('mouseenter', function() {
                const image = this.querySelector('.portfolio-image img');
                if (image) {
                    image.style.filter = 'brightness(1.1)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const image = this.querySelector('.portfolio-image img');
                if (image) {
                    image.style.filter = 'brightness(1)';
                }
            });
        });
        
        // 次要角色卡片效果
        secondaryItems.forEach((item, index) => {
            // 添加延迟显示动画
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index + 300);
        });
    }
    
    // ========== 角色数据卡片动画 ==========
    function initStatsCards() {
        const statCards = document.querySelectorAll('.stat-card');
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statCards.forEach((card, index) => {
            // 添加延迟显示动画
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index + 500);
            
            // 数字动画效果
            const statNumber = card.querySelector('.stat-number');
            if (statNumber) {
                const finalNumber = statNumber.textContent;
                if (finalNumber.includes('+')) {
                    // 处理带加号的数字
                    const baseNumber = parseInt(finalNumber);
                    animateNumber(statNumber, 0, baseNumber, 1500);
                    setTimeout(() => {
                        statNumber.textContent = finalNumber;
                    }, 1600);
                } else if (!isNaN(parseInt(finalNumber))) {
                    // 处理纯数字
                    animateNumber(statNumber, 0, parseInt(finalNumber), 1500);
                }
            }
        });
    }
    
    /**
     * 数字动画效果
     * @param {HTMLElement} element - 数字元素
     * @param {number} start - 起始值
     * @param {number} end - 结束值
     * @param {number} duration - 动画持续时间(ms)
     */
    function animateNumber(element, start, end, duration) {
        const startTime = Date.now();
        const endTime = startTime + duration;
        
        function updateNumber() {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            
            // 使用缓动函数使动画更自然
            const easeProgress = easeOutCubic(progress);
            const currentValue = Math.floor(start + (end - start) * easeProgress);
            
            element.textContent = currentValue;
            
            if (now < endTime) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = end;
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    /**
     * 缓动函数 - 三次缓出
     * @param {number} t - 进度(0-1)
     * @returns {number} 缓动后的进度
     */
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    // ========== 角色关系图交互 ==========
    function initRelationshipChart() {
        const chartNodes = document.querySelectorAll('.chart-node');
        const connectionLines = document.querySelectorAll('.connection-line');
        
        chartNodes.forEach(node => {
            // 初始状态
            node.style.opacity = '0';
            node.style.transform = 'scale(0.8)';
            node.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            // 鼠标悬停效果
            node.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
            });
            
            node.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            });
            
            // 点击显示角色关系详情
            node.addEventListener('click', function() {
                const roleName = this.querySelector('h4').textContent;
                showRoleRelationship(roleName);
            });
        });
        
        // 延迟显示连接线
        connectionLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.width = '0';
            line.style.transition = 'opacity 0.5s ease, width 0.8s ease';
            
            setTimeout(() => {
                line.style.opacity = '0.5';
                line.style.width = '80px';
            }, 800 + index * 200);
        });
        
        // 延迟显示节点
        setTimeout(() => {
            chartNodes.forEach((node, index) => {
                setTimeout(() => {
                    node.style.opacity = '1';
                    node.style.transform = 'scale(1)';
                }, 300 + index * 200);
            });
        }, 500);
    }
    
    /**
     * 显示角色关系详情
     * @param {string} roleName - 角色名称
     */
    function showRoleRelationship(roleName) {
        const relationships = {
            '芙莉莲': '与辛美尔是伙伴关系，与菲伦是师徒关系，与海塔是前队友关系',
            '辛美尔': '勇者队伍的领袖，与芙莉莲、海塔、艾泽是队友关系',
            '菲伦': '海塔收养的女儿，芙莉莲的徒弟，正在学习魔法',
            '休塔尔克': '小矮人艾泽的徒弟，是芙莉莲和菲伦一起旅行的队友，队伍中的战士'
        };
        
        const relationship = relationships[roleName] || '暂无详细信息';
        
        // 创建或更新提示框
        let tooltip = document.querySelector('.relationship-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'relationship-tooltip';
            document.body.appendChild(tooltip);
            
            // 添加样式
            tooltip.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                max-width: 500px;
                width: 90%;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            // 点击其他地方关闭
            tooltip.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            document.addEventListener('click', function() {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 300);
            });
        }
        
        tooltip.innerHTML = `
            <h3 style="color: #2c3e50; margin-bottom: 10px;">${roleName}的关系网络</h3>
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">${relationship}</p>
            <button class="close-tooltip" style="
                background: #3498db;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 600;
            ">关闭</button>
        `;
        
        // 关闭按钮事件
        tooltip.querySelector('.close-tooltip').addEventListener('click', function() {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 300);
        });
        
        // 显示提示框
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
    }
    
    // ========== 初始化所有功能 ==========
    function initAll() {
        initCharacterCards();
        initStatsCards();
        initRelationshipChart();
        
        // 页面加载动画
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // 控制台信息
        console.log('角色介绍页面已加载');
        console.log('共 ' + document.querySelectorAll('.portfolio-item').length + ' 个主要角色');
        console.log('共 ' + document.querySelectorAll('.secondary-item').length + ' 个次要角色');
    }
    
    initAll();
});

// ========== 页面滚动时显示元素 ==========
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.portfolio-section, .secondary-characters, .relationship-section, .stats-section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});