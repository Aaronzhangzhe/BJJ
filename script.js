// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu interaction
    const menuBtn = document.querySelector('.mobile-menu-btn, .hamburger');
    const mobileMenuBtns = document.querySelectorAll('.mobile-menu-btn, .hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    const body = document.body;


    if (mobileMenuBtns.length > 0 && mobileMenu && backdrop) {
        mobileMenuBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                backdrop.classList.toggle('active');
                body.classList.toggle('no-scroll');
            });
        });

        backdrop.addEventListener('click', function() {
            mobileMenuBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            if (mobileMenu) mobileMenu.classList.remove('active');
            backdrop.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    }

    // Play video inside cards
    const programCards = document.querySelectorAll('.program-card');

    // Play video on card click
    if (programCards.length > 0) {
        programCards.forEach(card => {
            card.addEventListener('click', function(event) {
                // Get inner elements of the card
                const cardContent = this.querySelector('.card-content');
                const cardImage = this.querySelector('.card-image');
                const programOverlay = this.querySelector('.program-overlay');
                const videoContainer = this.querySelector('.card-video-container');
                const videoIframe = this.querySelector('.card-video');
                
                // Get video source URL
                const videoSrc = videoIframe.getAttribute('data-video-src');
                
                // Hide image and overlay, display video container
                if (cardImage && videoContainer && videoIframe) {
                    cardImage.style.display = 'none';
                    programOverlay.style.display = 'none';
                    videoContainer.style.display = 'block';
                    
                    // Set video src and start playing
                    videoIframe.src = videoSrc;
                }
                
                // Prevent event bubbling
                event.stopPropagation();
            });
        });
        
        // Stop all videos when clicking outside cards
        document.addEventListener('click', function(e) {
            const clickedCard = e.target.closest('.program-card');
            
            // If the clicked element is not within a card, stop all videos
            if (!clickedCard) {
                stopAllVideos();
            }
        });
    }
    
    // Stop all video playback and reset card UI
    function stopAllVideos() {
        programCards.forEach(card => {
            const cardImage = card.querySelector('.card-image');
            const programOverlay = card.querySelector('.program-overlay');
            const videoContainer = card.querySelector('.card-video-container');
            const videoIframe = card.querySelector('.card-video');
            
            if (cardImage && videoContainer && videoIframe) {
                cardImage.style.display = 'block';
                programOverlay.style.display = 'flex';
                videoContainer.style.display = 'none';
                videoIframe.src = '';
            }
        });
    }

    // Community post click interaction
    const forumPosts = document.querySelectorAll('.forum-post');
    if (forumPosts.length > 0) {
        forumPosts.forEach(post => {
            post.addEventListener('click', function() {
                alert('View post details');
            });
        });
    }
    
    // Search icon click interaction
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            alert('Search feature coming soon!');
        });
    }

    // Button click interactions
    const buttons = document.querySelectorAll('button:not(.hamburger):not(.mobile-menu-btn)');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('new-post-btn')) {
                e.stopPropagation();
                alert('Create new post');
            } else if (this.classList.contains('btn-primary')) {
                e.preventDefault();
                alert('Thank you for your interest! We will contact you soon.');
            } else if (this.classList.contains('btn-secondary')) {
                e.preventDefault();
                alert('You are about to view our membership plan details!');
            }
        });
    });

    // Simple scroll animation
    function revealOnScroll() {
        const elements = document.querySelectorAll('.category-card, .program-card');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial styles for cards
    const cards = document.querySelectorAll('.category-card, .program-card');
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Trigger scroll reveal on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial reveal check
    revealOnScroll();
});
