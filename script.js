document.addEventListener('DOMContentLoaded', function() {
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let currentIndex = 0;
    const totalItems = galleryItems.length;
    
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    
    lightboxClose.addEventListener('click', closeLightbox);
    
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
    
    
    function updateLightboxImage() {
        const imageSrc = galleryItems[currentIndex].querySelector('img').src;
        const imageAlt = galleryItems[currentIndex].querySelector('img').alt;
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt;
    }
    
    
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateLightboxImage();
    }
    
    
    function showNextImage() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateLightboxImage();
    }
    
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});