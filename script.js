
// 1) active the slider when we click on menu icon////////////////////////////
const toggle= document.getElementById('mobile-menu');
const navLinks = document.querySelector('.navbar');

document.onclick=function(e){
  if(e.target.id !== 'slidebar' && e.target.id !== 'mobile-menu'){
           toggle.classList.remove('active');
           navLinks.classList.remove('active');
         }
       }
  toggle.onclick=function(){
  toggle.classList.toggle('active');
  navLinks.classList.toggle('active');
}



//.............................................
// 2) slide show in banner///////////////////////////////
let all_banner_images = {
    first: "Resources/poster-1.jpeg",
    second: "Resources/poster-2.jpg",
    third: "Resources/poster-3.png"
};

let imageKeys = Object.keys(all_banner_images);
let currentIndex = 0;

function changeBackgroundImage() {
   // let slideshowDiv = document.getElementById("banner");
    let originalSlideShow=document.getElementById("slide-show");

    //slideshowDiv.style.backgroundImage = `url(${all_banner_images[imageKeys[currentIndex]]})`;
    originalSlideShow.style.backgroundImage = `url(${all_banner_images[imageKeys[currentIndex]]})`;

    currentIndex = (currentIndex + 1) % imageKeys.length;
}

setInterval(changeBackgroundImage, 2000);
window.onload = changeBackgroundImage; // Initial call to set the first image




// 3) video section///////////////////////////////////
// play thevideo when we scroll to the video and pause the video whenever we scroll to any ther section
document.addEventListener("DOMContentLoaded", function() {
  const video = document.getElementById('myVideo');

  // Intersection Observer to pause video when out of view
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              video.play();
          } else {
              video.pause();
          }
      });
  });

  observer.observe(video);

  // Visibility change to pause video when tab is not active
  document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
          video.pause();
      } else if (video.getBoundingClientRect().top >= 0 && video.getBoundingClientRect().bottom <= window.innerHeight) {
          video.play();
      }
  });
});


// 4) active nav bar/////////////////////////
const navItems = document.querySelectorAll('.menu-links');
  navItems.forEach(navItem => {
    navItem.addEventListener('click', () => {
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
        });
        navItem.classList.add('active');

    });

});


// 9) comment Section
// here we if the number of words in comment is more than 40 then only 30 words will be visible and a Read More button
// will get appear when we click on this ReadMore button then the hidden comment will be appear.
document.addEventListener('DOMContentLoaded', () => {
    const paragraphs = document.querySelectorAll('.paragraph');
    const wordLimit = 30;
    let currentlyExpanded = null;

    paragraphs.forEach(paragraph => {
        const words = paragraph.textContent.trim().split(' ');
        if (words.length > 40) {
            const visibleWords = words.slice(0, wordLimit).join(' ');
            const hiddenWords = words.slice(wordLimit).join(' ');
          

             paragraph.innerHTML = `
             <span>${visibleWords}</span> 
             <span class="ellipsis">...</span> 
             <span class="hidden extra-text">${hiddenWords}</span> 
             <button class="read-more-btn">Read more</button>
             `;
           

            const readMoreBtn = paragraph.querySelector('.read-more-btn');
            const extraText = paragraph.querySelector('.extra-text');
            const ellipsis = paragraph.querySelector('.ellipsis');

            readMoreBtn.addEventListener('click', () => {
                // Close any previously expanded paragraph
                if (currentlyExpanded && currentlyExpanded !== paragraph) {
                    currentlyExpanded.querySelector('.extra-text').classList.add('hidden');
                    currentlyExpanded.querySelector('.ellipsis').style.display = 'inline';
                    currentlyExpanded.querySelector('.read-more-btn').textContent = 'Read more';
                }

                // Toggle the current paragraph
                const isExpanded = extraText.classList.toggle('hidden');
                ellipsis.style.display = isExpanded ? 'inline' : 'none';
                readMoreBtn.textContent = isExpanded ? 'Read more' : 'Read less';
                
                // Update currently expanded paragraph
                currentlyExpanded = isExpanded ? null : paragraph;
            });
        }
    });
});




// our clients are//////////////////////////////////
 // script.js
 const imageCount = 20;
 const boxes = document.querySelectorAll('.box');
 const imagePaths = Array.from({ length: imageCount }, (_, i) => `Wallpaper/${i + 1}.jfif`);

 function getRandomInt(max) {
   return Math.floor(Math.random() * max);
 }

 function assignUniqueRandomImages() {
   const usedIndexes = new Set();
   boxes.forEach(box => {
     let randomIndex;
     do {
       randomIndex = getRandomInt(imageCount);
     } while (usedIndexes.has(randomIndex));
     usedIndexes.add(randomIndex);
     box.style.backgroundImage = `url('${imagePaths[randomIndex]}')`;
   });
 }

 function updateRandomBox() {
   const randomBoxIndex = getRandomInt(boxes.length);
   const currentImages = Array.from(boxes).map(box => box.style.backgroundImage);
   let randomImageIndex;
   do {
     randomImageIndex = getRandomInt(imageCount);
   } while (currentImages.includes(`url("${imagePaths[randomImageIndex]}")`));
   
   boxes[randomBoxIndex].style.backgroundImage = `url('${imagePaths[randomImageIndex]}')`;
   setTimeout(updateRandomBox, getRandomInt(300) + 200);
 }

 assignUniqueRandomImages();
 setTimeout(updateRandomBox, 100);

