document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        navButtons.classList.toggle('active');
    });
    
    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    navButtons.classList.remove('active');
                }
            }
        });
    });
    
    // Pricing Toggle Switch
    const pricingToggle = document.getElementById('pricingToggle');
    const monthlyPrices = document.querySelectorAll('.price');
    const originalPrices = ['Rp99.000', 'Rp299.000', 'Rp899.000'];
    const annualPrices = ['Rp79.200', 'Rp239.200', 'Rp719.200'];
    
    pricingToggle.addEventListener('change', function() {
        if (this.checked) {
            monthlyPrices.forEach((price, index) => {
                price.textContent = annualPrices[index];
            });
        } else {
            monthlyPrices.forEach((price, index) => {
                price.textContent = originalPrices[index];
            });
        }
    });
    
    // Bot Builder Drag and Drop Functionality
    const toolboxItems = document.querySelectorAll('.toolbox-item');
    const flowCanvas = document.getElementById('flowCanvas');
    
    toolboxItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.innerHTML);
            this.classList.add('dragging');
        });
        
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    flowCanvas.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    flowCanvas.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    flowCanvas.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        const data = e.dataTransfer.getData('text/plain');
        const newBlock = document.createElement('div');
        newBlock.className = 'flow-block';
        newBlock.innerHTML = data;
        newBlock.draggable = true;
        newBlock.style.left = (e.clientX - this.getBoundingClientRect().left - 50) + 'px';
        newBlock.style.top = (e.clientY - this.getBoundingClientRect().top - 50) + 'px';
        
        // Make new blocks draggable within the canvas
        newBlock.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', '');
            this.classList.add('dragging');
            initialX = e.clientX;
            initialY = e.clientY;
        });
        
        newBlock.addEventListener('dragend', function(e) {
            this.classList.remove('dragging');
            const rect = this.getBoundingClientRect();
            const canvasRect = flowCanvas.getBoundingClientRect();
            
            let newX = parseInt(this.style.left || '0') + (e.clientX - initialX);
            let newY = parseInt(this.style.top || '0') + (e.clientY - initialY);
            
            // Constrain to canvas boundaries
            newX = Math.max(0, Math.min(newX, canvasRect.width - rect.width));
            newY = Math.max(0, Math.min(newY, canvasRect.height - rect.height));
            
            this.style.left = newX + 'px';
            this.style.top = newY + 'px';
        });
        
        this.appendChild(newBlock);
    });
    
    // Initialize variables for block dragging
    let initialX, initialY;
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
            this.reset();
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .template-card, .pricing-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.feature-card, .template-card, .pricing-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});