// nav bar hide and show
let lastScrollTop = 0;
const navBar = document.getElementById("navBar");

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navBar.classList.add("hide-nav");
        navBar.classList.remove("show-nav");
    } else {
        // Scrolling up
        navBar.classList.remove("hide-nav");
        navBar.classList.add("show-nav");
      
        
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
});
// trusted by
const scrollLeftBtn = document.getElementById('scroll-left');
const scrollRightBtn = document.getElementById('scroll-right');
const logoWrapper = document.querySelector('.logo-wrapper');
const scrollAmount = 200; // Amount to scroll on each click
let autoScrollInterval;
let isManualScroll = false;
let isHovering = false;
let maxScrollLeft = logoWrapper.scrollWidth - logoWrapper.clientWidth;

// Function to update arrow visibility
function updateArrowVisibility() {
  const scrollLeft = logoWrapper.scrollLeft;

  // Hide left arrow if at the leftmost position
  if (scrollLeft <= 0) {
    scrollLeftBtn.style.display = 'none';
  } else {
    scrollLeftBtn.style.display = 'block';
  }

  // Hide right arrow if at the rightmost position
  if (scrollLeft >= maxScrollLeft) {
    scrollRightBtn.style.display = 'none';
  } else {
    scrollRightBtn.style.display = 'block';
  }
}

// Scroll left manually when clicking the left button
scrollLeftBtn.addEventListener('click', () => {
  clearInterval(autoScrollInterval);  // Temporarily stop auto-scroll
  logoWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  isManualScroll = true;
  setTimeout(() => isManualScroll = false, 500); // Delay before auto-scroll resumes
  resumeAutoScroll();
});

// Scroll right manually when clicking the right button
scrollRightBtn.addEventListener('click', () => {
  clearInterval(autoScrollInterval);  // Temporarily stop auto-scroll
  logoWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  isManualScroll = true;
  setTimeout(() => isManualScroll = false, 500); // Delay before auto-scroll resumes
  resumeAutoScroll();
});

// Sync scrolling for both rows
const logoRows = document.querySelectorAll('.logo-row');
logoWrapper.addEventListener('scroll', () => {
  const scrollPosition = logoWrapper.scrollLeft;
  logoRows.forEach(row => row.scrollLeft = scrollPosition);
  updateArrowVisibility(); // Update arrow visibility on scroll
});

// Auto-scroll function
function autoScroll() {
  autoScrollInterval = setInterval(() => {
    if (isManualScroll || isHovering) return;  // Stop auto-scroll if manual scrolling or hovering

    maxScrollLeft = logoWrapper.scrollWidth - logoWrapper.clientWidth; // Update max scroll
    // Stop scrolling if we reach the end
    if (logoWrapper.scrollLeft >= maxScrollLeft) {
      clearInterval(autoScrollInterval);
    } else {
      logoWrapper.scrollBy({ left: 1, behavior: 'smooth' });
    }
  }, 20);
}

// Start auto-scroll on page load
autoScroll();

// Resume auto-scroll after manual interaction or hover
function resumeAutoScroll() {
  setTimeout(() => {
    if (!isHovering && !isManualScroll) {
      autoScroll();  // Resume auto-scroll if no manual interaction or hovering
    }
  }, 500);  // Resume auto-scroll after 0.5 second delay
}

// Pause auto scroll when hovering the container
logoWrapper.addEventListener('mouseenter', () => {
  clearInterval(autoScrollInterval);  // Pause auto scroll
  isHovering = true;
});

// Resume auto scroll when mouse leaves the container
logoWrapper.addEventListener('mouseleave', () => {
  isHovering = false;
  resumeAutoScroll();  // Resume auto-scroll when mouse leaves
});

// Pause auto scroll when hovering over arrow buttons
scrollLeftBtn.addEventListener('mouseenter', () => {
  clearInterval(autoScrollInterval);
  isHovering = true;
});
scrollRightBtn.addEventListener('mouseenter', () => {
  clearInterval(autoScrollInterval);
  isHovering = true;
});

// Resume auto scroll when leaving arrow buttons
scrollLeftBtn.addEventListener('mouseleave', () => {
  isHovering = false;
  resumeAutoScroll();
});
scrollRightBtn.addEventListener('mouseleave', () => {
  isHovering = false;
  resumeAutoScroll();
});

// Initial arrow visibility check
updateArrowVisibility();
