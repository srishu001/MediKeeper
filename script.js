console.log('Script loaded!');

// Add this at the top of script.js, outside any event listener
function scrollToAppointment() {
    // Check if we're on the home page
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        const appointmentSection = document.getElementById('appointment-section');
        if (appointmentSection) {
            appointmentSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    } else {
        // If not on home page, redirect to home page with appointment section
        window.location.href = 'index.html#appointment-section';
    }
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Collect form data (optional, for debugging)
            const formData = new FormData(this);
            const formDataObject = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });
            console.log('Contact Form Data:', formDataObject);

            // Show success message
            alert('Thank you! Your message has been sent successfully.');
            this.reset();
        });
    }
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObject = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });

            // Here you would typically send the data to your backend
            console.log('Appointment Form Data:', formDataObject);
            
            // Show success message
            alert('Thank you! Your appointment request has been submitted. We will contact you shortly.');
            this.reset();
        });
    }

    // Newsletter form handling (for all forms on all pages)
    document.querySelectorAll('.newsletter-form').forEach(newsletterForm => {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Here you would typically send the email to your backend
            console.log('Newsletter Subscription:', email);
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if(elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial animation check
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);

    // Add animation classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate');
    });

    // Mobile Navigation Toggle
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Insert hamburger button before nav-links on mobile
    navbar.insertBefore(hamburger, navLinks);
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    // Replace the testimonial slider code with this
    document.addEventListener('DOMContentLoaded', function() {
        const slider = {
            container: document.querySelector('.testimonials-container'),
            slides: document.querySelectorAll('.testimonial-slide'),
            dots: document.querySelectorAll('.testimonial-dots .dot'),
            prevBtn: document.querySelector('.prev-btn'),
            nextBtn: document.querySelector('.next-btn'),
            currentIndex: 0,
            slideInterval: null,
            intervalTime: 5000,

            init() {
                if (!this.slides.length) return;
                
                this.showSlide(0);
                this.addEventListeners();
                this.startAutoSlide();
            },

            showSlide(index) {
                // Remove all classes first
                this.slides.forEach(slide => {
                    slide.classList.remove('active', 'prev');
                });
                this.dots.forEach(dot => dot.classList.remove('active'));

                // Add appropriate classes
                this.slides[this.currentIndex].classList.add('prev');
                this.currentIndex = index;
                this.slides[index].classList.add('active');
                this.dots[index].classList.add('active');
            },

            nextSlide() {
                const next = (this.currentIndex + 1) % this.slides.length;
                this.showSlide(next);
            },

            prevSlide() {
                const prev = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
                this.showSlide(prev);
            },

            startAutoSlide() {
                if (this.slideInterval) clearInterval(this.slideInterval);
                this.slideInterval = setInterval(() => this.nextSlide(), this.intervalTime);
            },

            stopAutoSlide() {
                if (this.slideInterval) {
                    clearInterval(this.slideInterval);
                    this.slideInterval = null;
                }
            },

            addEventListeners() {
                // Button clicks
                this.prevBtn.addEventListener('click', () => {
                    this.prevSlide();
                    this.stopAutoSlide();
                    this.startAutoSlide();
                });

                this.nextBtn.addEventListener('click', () => {
                    this.nextSlide();
                    this.stopAutoSlide();
                    this.startAutoSlide();
                });

                // Dot clicks
                this.dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        this.showSlide(index);
                        this.stopAutoSlide();
                        this.startAutoSlide();
                    });
                });

                // Pause on hover
                this.container.addEventListener('mouseenter', () => this.stopAutoSlide());
                this.container.addEventListener('mouseleave', () => this.startAutoSlide());

                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') {
                        this.prevSlide();
                        this.stopAutoSlide();
                        this.startAutoSlide();
                    } else if (e.key === 'ArrowRight') {
                        this.nextSlide();
                        this.stopAutoSlide();
                        this.startAutoSlide();
                    }
                });
            }
        };

        // Initialize the slider
        slider.init();
    });

    // Doctors Slider
    const doctorDots = document.querySelectorAll('.doctors-dots .dot');
    doctorDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            doctorDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            // Add your slider logic here
        });
    });

    // Add click handler for appointment buttons
    const appointmentBtns = document.querySelectorAll('.appointment-btn, .learn-more-btn');
    appointmentBtns.forEach(btn => {
        btn.addEventListener('click', scrollToAppointment);
    });
});