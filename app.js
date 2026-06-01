document.addEventListener('DOMContentLoaded', () => {

  // ================= GENERAL SETTINGS =================
  const WHATSAPP_NUMBER = '919876543210'; // Representative WhatsApp Business number

  // ================= SCROLL REVEAL ANIMATIONS =================
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('reveal-active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger once on load

  // ================= HEADER & NAV SCROLL EFFECT =================
  const header = document.getElementById('main-header');
  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll();

  // ================= ACTIVE NAV LINK HIGHLIGHTER =================
  const sections = document.querySelectorAll('section, footer');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const highlightNav = () => {
    let scrollPos = window.scrollY + 120; // offset for sticky header
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        const currentId = section.getAttribute('id');
        
        // Desktop Highlight
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });

        // Mobile Highlight
        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav);

  // ================= MOBILE NAVIGATION TOGGLE =================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  
  const toggleMobileNav = () => {
    mobileToggle.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    // Prevent body scroll when menu is active
    document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
  };

  mobileToggle.addEventListener('click', toggleMobileNav);

  // Close Mobile Menu on Link Click
  const allMobileLinks = document.querySelectorAll('.mobile-nav-link');
  allMobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      toggleMobileNav(); // Close menu

      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    });
  });

  // ================= HERO CTA BUTTONS SMOOTH SCROLL =================
  const ctaOrder = document.getElementById('cta-order');
  const ctaBook = document.getElementById('cta-book');

  const smoothScrollTo = (targetSelector) => {
    const targetSection = document.querySelector(targetSelector);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  ctaOrder.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollTo('#food-ordering');
  });

  ctaBook.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollTo('#booking');
  });

  // ================= MENU DISCOVERY: DYNAMIC LOAD MORE =================
  const btnLoadMore = document.getElementById('btn-load-more');
  const menuGrid = document.getElementById('menu-discovery-grid');

  const extraMenuItems = [
    {
      title: "Kerala Parotta & Beef Fry",
      price: "$15.99",
      desc: "Soft layers of flaky flatbread served with beef slow-roasted in coconut shards, black pepper, and curry leaves.",
      img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80",
      category: "mains",
      tag: "Traditional Classic"
    },
    {
      title: "Kallummakkaya Fry",
      price: "$13.99",
      desc: "Lakeside blue mussels marinated in a fiery spice blend and deep-fried with curry leaves for a crispy snack.",
      img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
      category: "seafood",
      tag: ""
    },
    {
      title: "Lakeside Fish Head Curry",
      price: "$21.99",
      desc: "Traditional red spicy fish head curry cooked in a clay pot with Malabar tamarind and fresh coconut milk.",
      img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80",
      category: "seafood",
      tag: "Premium Catch"
    },
    {
      title: "Tender Coconut Pudding",
      price: "$7.99",
      desc: "Silky-smooth pudding crafted with sweet tender coconut pulp and milk, served chilled with a hint of gold glaze.",
      img: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80",
      category: "desserts",
      tag: "Chilled Delight"
    }
  ];

  btnLoadMore.addEventListener('click', () => {
    // Disable button during animation
    btnLoadMore.disabled = true;
    btnLoadMore.textContent = "Preparing Foods...";

    setTimeout(() => {
      extraMenuItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'menu-item-card hidden-item';
        card.setAttribute('data-category', item.category);

        const tagHTML = item.tag ? `<div class="menu-item-overlay-tag">${item.tag}</div>` : '';

        card.innerHTML = `
          <div class="menu-item-img-box">
            <img src="${item.img}" alt="${item.title}">
            ${tagHTML}
          </div>
          <div class="menu-item-details">
            <div class="menu-item-header">
              <h3 class="menu-item-title">${item.title}</h3>
              <span class="menu-item-price">${item.price}</span>
            </div>
            <p class="menu-item-desc">${item.desc}</p>
          </div>
        `;

        menuGrid.appendChild(card);
        
        // Trigger reflow to run transition
        setTimeout(() => {
          card.classList.remove('hidden-item');
          card.classList.add('show-item');
        }, index * 150); // Stagger cards display
      });

      // Remove load more button container
      setTimeout(() => {
        btnLoadMore.parentElement.remove();
        showToast("Remaining menu items loaded successfully!");
      }, 600);
      
    }, 800);
  });

  // ================= MENU CATEGORIES VISUAL FILTER =================
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-category');
      const allCards = document.querySelectorAll('.menu-item-card');

      allCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });

  // ================= FOOD ORDERING: WHATSAPP INTERACTION =================
  const orderButtons = document.querySelectorAll('.btn-order-now');
  orderButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const foodName = btn.getAttribute('data-item-name');
      const encodedMsg = encodeURIComponent(`Hello, I would like to order ${foodName}. Is this available for delivery?`);
      const finalUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
      
      // Open in a new tab/window
      window.open(finalUrl, '_blank');
      showToast(`Redirecting to WhatsApp for ${foodName}...`);
    });
  });

  // ================= TABLE RESERVATION FORM & MODAL =================
  const bookingForm = document.getElementById('booking-form');
  const bookingModal = document.getElementById('booking-modal');
  const closeBookingModalBtn = document.getElementById('btn-close-booking-modal');

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Extract input values
    const name = document.getElementById('booking-name').value;
    const email = document.getElementById('booking-email').value;
    const address = document.getElementById('booking-address').value;
    const seats = document.getElementById('booking-seats');
    const seatsText = seats.options[seats.selectedIndex].text;

    // Generate random booking code
    const randomCode = 'ADR-' + Math.floor(10000 + Math.random() * 90000);

    // Populate Modal Elements
    document.getElementById('modal-code').textContent = randomCode;
    document.getElementById('modal-name').textContent = name;
    document.getElementById('modal-email').textContent = email;
    document.getElementById('modal-seats').textContent = seatsText;
    document.getElementById('modal-address').textContent = address;

    // Show Modal
    bookingModal.classList.add('active');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // stop background scroll

    // Reset Form
    bookingForm.reset();
  });

  // Close Booking Modal
  const closeBookingModal = () => {
    bookingModal.classList.remove('active');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    showToast("Seats successfully reserved!");
  };

  closeBookingModalBtn.addEventListener('click', closeBookingModal);
  
  // Close booking modal when clicking outside form box
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeBookingModal();
    }
  });

  // ================= GALLERY LIGHTBOX =================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentGalleryIndex = 0;
  const galleryImagesData = [];

  // Gather image items on load
  galleryItems.forEach(item => {
    const imgEl = item.querySelector('img');
    const titleEl = item.querySelector('.gallery-item-title');
    galleryImagesData.push({
      src: imgEl.src,
      alt: imgEl.alt,
      caption: titleEl.textContent
    });
  });

  const openLightbox = (index) => {
    currentGalleryIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const updateLightboxContent = () => {
    const data = galleryImagesData[currentGalleryIndex];
    lightboxImg.src = data.src;
    lightboxImg.alt = data.alt;
    lightboxCaption.textContent = data.caption;
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const navigateLightbox = (direction) => {
    if (direction === 'next') {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryImagesData.length;
    } else if (direction === 'prev') {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryImagesData.length) % galleryImagesData.length;
    }
    updateLightboxContent();
  };

  // Click on gallery item
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.getAttribute('data-index'), 10);
      openLightbox(index);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
  lightboxNext.addEventListener('click', () => navigateLightbox('next'));

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateLightbox('next');
    if (e.key === 'ArrowLeft') navigateLightbox('prev');
  });

  // ================= FEEDBACK & REVIEWS SLIDER =================
  const track = document.getElementById('reviews-slider-track');
  const btnPrevReview = document.getElementById('btn-prev-review');
  const btnNextReview = document.getElementById('btn-next-review');
  const dotsContainer = document.getElementById('slider-dots');
  
  let reviewSlides = Array.from(track.querySelectorAll('.review-slide'));
  let currentSlideIndex = 0;
  let sliderTimer;

  const initSliderDots = () => {
    dotsContainer.innerHTML = '';
    reviewSlides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = index === 0 ? 'dot active' : 'dot';
      dot.setAttribute('data-slide', index);
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  };

  const updateSlider = () => {
    reviewSlides.forEach((slide, index) => {
      slide.classList.remove('active');
      if (index === currentSlideIndex) {
        slide.classList.add('active');
      }
    });

    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.remove('active');
      if (index === currentSlideIndex) {
        dot.classList.add('active');
      }
    });
  };

  const goToSlide = (index) => {
    currentSlideIndex = index;
    updateSlider();
    resetSliderTimer();
  };

  const nextSlide = () => {
    currentSlideIndex = (currentSlideIndex + 1) % reviewSlides.length;
    updateSlider();
  };

  const prevSlide = () => {
    currentSlideIndex = (currentSlideIndex - 1 + reviewSlides.length) % reviewSlides.length;
    updateSlider();
  };

  btnNextReview.addEventListener('click', () => {
    nextSlide();
    resetSliderTimer();
  });

  btnPrevReview.addEventListener('click', () => {
    prevSlide();
    resetSliderTimer();
  });

  const startSliderTimer = () => {
    sliderTimer = setInterval(nextSlide, 6000);
  };

  const resetSliderTimer = () => {
    clearInterval(sliderTimer);
    startSliderTimer();
  };

  initSliderDots();
  startSliderTimer();

  // ================= STAR RATING SELECTOR =================
  const starRatingSelector = document.getElementById('star-rating-selector');
  const ratingStars = starRatingSelector.querySelectorAll('.rating-star');
  const ratingInput = document.getElementById('review-rating');

  const highlightStars = (count) => {
    ratingStars.forEach(star => {
      const val = parseInt(star.getAttribute('data-value'), 10);
      if (val <= count) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  };

  // Hover Effect for stars
  ratingStars.forEach(star => {
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.getAttribute('data-value'), 10);
      highlightStars(val);
    });
  });

  starRatingSelector.addEventListener('mouseleave', () => {
    const currentVal = parseInt(ratingInput.value, 10);
    highlightStars(currentVal);
  });

  // Select Rating
  ratingStars.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.getAttribute('data-value'), 10);
      ratingInput.value = val;
      highlightStars(val);
    });
  });

  // Initialize display
  highlightStars(5);

  // ================= FEEDBACK LOCAL STORAGE PERSISTENCE =================
  const reviewForm = document.getElementById('user-review-form');

  // Load reviews from localStorage
  const loadLocalReviews = () => {
    const saved = localStorage.getItem('adoru_local_reviews');
    if (!saved) return;

    const reviews = JSON.parse(saved);
    reviews.forEach(rev => {
      appendReviewToSlider(rev.author, rev.rating, rev.text);
    });
    
    // Re-init slider indicators
    reviewSlides = Array.from(track.querySelectorAll('.review-slide'));
    initSliderDots();
  };

  const appendReviewToSlider = (author, rating, text) => {
    const slide = document.createElement('div');
    slide.className = 'review-slide';
    
    // Build star icons
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starsHTML += '<span class="star">&#9733;</span>';
      } else {
        starsHTML += '<span class="star">&#9734;</span>';
      }
    }

    // Default avatar
    const randomAvatarId = Math.floor(Math.random() * 70) + 10;
    const avatarUrl = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`;

    slide.innerHTML = `
      <div class="review-stars">${starsHTML}</div>
      <p class="review-text">"${text}"</p>
      <div class="review-author-box">
        <img src="${avatarUrl}" alt="${author}" class="author-avatar">
        <div class="author-details">
          <h4 class="author-name">${author}</h4>
          <p class="author-meta">Verified Guest</p>
        </div>
      </div>
    `;

    track.appendChild(slide);
  };

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const author = document.getElementById('review-author').value;
    const rating = parseInt(ratingInput.value, 10);
    const text = document.getElementById('review-message').value;

    // Append to slide list visually
    appendReviewToSlider(author, rating, text);
    
    // Re-gather slides
    reviewSlides = Array.from(track.querySelectorAll('.review-slide'));
    initSliderDots();

    // Save to LocalStorage
    const saved = localStorage.getItem('adoru_local_reviews');
    const reviewsList = saved ? JSON.parse(saved) : [];
    reviewsList.push({ author, rating, text });
    localStorage.setItem('adoru_local_reviews', JSON.stringify(reviewsList));

    // Reset Form
    reviewForm.reset();
    ratingInput.value = 5;
    highlightStars(5);

    // Jump to the newly added review slide!
    goToSlide(reviewSlides.length - 1);
    
    showToast("Feedback submitted successfully! Thank you.");
  });

  // Load local reviews at start
  loadLocalReviews();

  // ================= TOAST NOTIFICATION FUNCTION =================
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer;

  function showToast(message) {
    clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toast.classList.add('active');
    
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 3500);
  }

});
