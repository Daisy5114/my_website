// 联系页面功能脚本
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // 表单验证
            if (validateForm(formValues)) {
                // 模拟表单提交
                console.log('表单数据:', formValues);
                
                // 显示成功消息
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // 滚动到成功消息
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        // 实时表单验证
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // 文本区域字符计数
        const textarea = document.getElementById('subject');
        if (textarea) {
            const charCount = document.createElement('div');
            charCount.className = 'char-count';
            charCount.style.fontSize = '0.85rem';
            charCount.style.color = '#7f8c8d';
            charCount.style.marginTop = '5px';
            textarea.parentNode.appendChild(charCount);
            
            textarea.addEventListener('input', function() {
                const count = this.value.length;
                charCount.textContent = `字符数: ${count}`;
                
                if (count < 10) {
                    charCount.style.color = '#e74c3c';
                } else {
                    charCount.style.color = '#2ecc71';
                }
            });
        }
    }
    
    // 表单验证函数
    function validateForm(data) {
        let isValid = true;
        
        // 验证必填字段
        const requiredFields = ['firstName', 'lastName', 'email', 'country', 'subject'];
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!data[field] || data[field].trim() === '') {
                showFieldError(input, '此字段为必填项');
                isValid = false;
            }
        });
        
        // 验证邮箱格式
        const emailInput = document.getElementById('email');
        if (data.email && data.email.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showFieldError(emailInput, '请输入有效的邮箱地址');
                isValid = false;
            }
        }
        
        // 验证留言长度
        const subjectInput = document.getElementById('subject');
        if (data.subject && data.subject.trim().length < 10) {
            showFieldError(subjectInput, '留言内容至少需要10个字符');
            isValid = false;
        }
        
        return isValid;
    }
    
    // 验证单个字段
    function validateField(input) {
        const value = input.value.trim();
        
        if (input.hasAttribute('required') && value === '') {
            showFieldError(input, '此字段为必填项');
            return false;
        }
        
        if (input.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(input, '请输入有效的邮箱地址');
                return false;
            }
        }
        
        if (input.id === 'subject' && value.length < 10) {
            showFieldError(input, '留言内容至少需要10个字符');
            return false;
        }
        
        clearFieldError(input);
        return true;
    }
    
    // 显示字段错误
    function showFieldError(input, message) {
        clearFieldError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#e74c3c';
    }
    
    // 清除字段错误
    function clearFieldError(input) {
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '#e1e5e9';
    }
    
    // 国家选择效果
    const countrySelect = document.getElementById('country');
    if (countrySelect) {
        countrySelect.addEventListener('change', function() {
            if (this.value) {
                this.style.color = '#333';
            }
        });
    }
    
    // 控制台信息
    console.log('%c联系反馈页面已加载', 'color: #9b59b6; font-size: 16px; font-weight: bold;');
    console.log('%c如有问题，请通过页面表单联系我们', 'color: #3498db; font-size: 14px;');
});

// 重置表单函数（供成功消息中的按钮调用）
function resetForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm && successMessage) {
        // 重置表单
        contactForm.reset();
        
        // 清除所有错误消息
        const errors = contactForm.querySelectorAll('.field-error');
        errors.forEach(error => error.remove());
        
        // 重置字符计数
        const charCount = contactForm.querySelector('.char-count');
        if (charCount) {
            charCount.textContent = '字符数: 0';
            charCount.style.color = '#7f8c8d';
        }
        
        // 切换显示
        contactForm.style.display = 'block';
        successMessage.style.display = 'none';
        
        // 滚动到表单顶部
        contactForm.scrollIntoView({ behavior: 'smooth' });
    }
}