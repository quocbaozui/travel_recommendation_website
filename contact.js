const contactForm = document.querySelector('.contact-form');
    
// Chỉ chạy mã này nếu tìm thấy contact form trên trang
if (contactForm) {
    const thankYouMessage = document.querySelector('#thank-you-message');

    contactForm.addEventListener('submit', (event) => {
        // 1. Ngăn trang tải lại
        event.preventDefault();

        // 2. Ẩn form đi
        contactForm.style.display = 'none';

        // 3. Hiện thông báo cảm ơn
        if (thankYouMessage) {
            thankYouMessage.style.display = 'block';
        }
    });
}