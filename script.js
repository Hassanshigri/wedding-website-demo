// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.querySelector('i').classList.toggle('fa-bars');
        navToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.querySelector('i').classList.add('fa-bars');
            navToggle.querySelector('i').classList.remove('fa-times');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.querySelector('i').classList.add('fa-bars');
            navToggle.querySelector('i').classList.remove('fa-times');
        }
    });
}

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('february 10 2026 16:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    if (timeLeft < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Initialize countdown
if (document.getElementById('days')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Form Validation for RSVP
const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Simple validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (!name || !email || !phone) {
            alert('Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Phone validation (basic)
        if (phone.length < 10) {
            alert('Please enter a valid phone number');
            return;
        }

        // In a real application, you would send this data to a server
        // For now, we'll just show a success message
        alert('Thank you for your RSVP! Your response has been recorded.');
        rsvpForm.reset();
    });
}

// Guestbook Form
const guestbookForm = document.getElementById('guestbookForm');
if (guestbookForm) {
    guestbookForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('guestName').value.trim();
        const message = document.getElementById('guestMessage').value.trim();

        if (!name || !message) {
            alert('Please fill in all fields');
            return;
        }

        if (message.length < 10) {
            alert('Please write a longer message (at least 10 characters)');
            return;
        }

        // Create new message element
        const messagesContainer = document.querySelector('.messages-container');
        const newMessage = document.createElement('div');
        newMessage.className = 'message-card';
        newMessage.innerHTML = `
            <div class="message-header">
                <div class="message-author">${escapeHtml(name)}</div>
                <div class="message-date">${new Date().toLocaleDateString()}</div>
            </div>
            <div class="message-content">${escapeHtml(message)}</div>
        `;

        messagesContainer.insertBefore(newMessage, messagesContainer.firstChild);

        // Reset form
        guestbookForm.reset();

        // Show success message
        alert('Thank you for your message!');
    });
}

// Helper function to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Gallery Image Modal (if needed)
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item, .gallery-full-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;

            // Create modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                cursor: pointer;
            `;

            const modalImg = document.createElement('img');
            modalImg.src = imgSrc;
            modalImg.alt = imgAlt;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
            `;

            modal.appendChild(modalImg);
            document.body.appendChild(modal);

            // Close modal on click
            modal.addEventListener('click', function () {
                document.body.removeChild(modal);
            });

            // Close on ESC key
            document.addEventListener('keydown', function closeModal(e) {
                if (e.key === 'Escape') {
                    document.body.removeChild(modal);
                    document.removeEventListener('keydown', closeModal);
                }
            });
        });
    });
}

// Initialize gallery functionality
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.gallery-item') || document.querySelector('.gallery-full-item')) {
        initializeGallery();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage.includes(linkPage.replace('.html', '')))) {
            link.style.color = 'var(--primary-color)';
            link.style.fontWeight = '600';
        }
    });
});

// Simulate live stream status
function updateLiveStatus() {
    const livePage = document.getElementById('livePage');
    if (livePage) {
        const statusIndicator = document.querySelector('.status-indicator');
        const statusText = document.querySelector('.status-text');
        const weddingDate = new Date('February 15, 2026 16:00:00').getTime();
        const now = new Date().getTime();
        const timeUntil = weddingDate - now;

        // If we're within 24 hours of the wedding, show "Live Soon"
        // If we're during the wedding day, show "Live Now"
        // Otherwise show "Offline"

        const weddingDay = new Date(weddingDate).toDateString();
        const today = new Date(now).toDateString();

        if (weddingDay === today) {
            statusIndicator.classList.remove('offline');
            statusIndicator.classList.add('online');
            statusText.textContent = 'Live Now';
        } else if (timeUntil > 0 && timeUntil < 24 * 60 * 60 * 1000) {
            statusIndicator.classList.remove('offline');
            statusIndicator.classList.add('online');
            statusText.textContent = 'Live Soon';
        } else {
            statusIndicator.classList.remove('online');
            statusIndicator.classList.add('offline');
            statusText.textContent = 'Offline';
        }
    }
}

// Update live status every minute
if (document.getElementById('livePage')) {
    updateLiveStatus();
    setInterval(updateLiveStatus, 60000);
}

// RSVP Password Protection
const verifyCodeBtn = document.getElementById('verifyCode');
if (verifyCodeBtn) {
    verifyCodeBtn.addEventListener('click', function () {
        const code = document.getElementById('invitationCode').value.trim();
        const validCodes = ['WED2026', 'AISHA123', 'ROHAN456', 'LOVE789', 'FAMILY2026']; // Example codes

        if (validCodes.includes(code.toUpperCase())) {
            document.getElementById('passwordSection').style.display = 'none';
            document.getElementById('rsvpForm').style.display = 'block';
        } else {
            alert('Invalid invitation code. Please check your invitation card and try again.');
        }
    });

    // Allow pressing Enter to verify code
    document.getElementById('invitationCode').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            verifyCodeBtn.click();
        }
    });
}