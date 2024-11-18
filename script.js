document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-button.right');
  const prevButton = document.querySelector('.carousel-button.left');
  const indicators = Array.from(document.querySelectorAll('.indicator'));
  const slideWidth = slides[0].getBoundingClientRect().width;

  // Arrange the slides next to one another
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });

  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  };

  const updateIndicators = (currentIndicator, targetIndicator) => {
    currentIndicator.classList.remove('active');
    targetIndicator.classList.add('active');
  };

  const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
      prevButton.style.display = 'none';
      nextButton.style.display = 'block';
    } else if (targetIndex === slides.length - 1) {
      prevButton.style.display = 'block';
      nextButton.style.display = 'none';
    } else {
      prevButton.style.display = 'block';
      nextButton.style.display = 'block';
    }
  };

  // Move slides when clicking left button
  prevButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide') || slides[0];
    const prevSlide = currentSlide.previousElementSibling;
    const currentIndex = slides.findIndex(slide => slide === currentSlide);
    const prevIndicator = indicators[currentIndex - 1];

    moveToSlide(track, currentSlide, prevSlide);
    updateIndicators(indicators[currentIndex], prevIndicator);
    hideShowArrows(slides, prevButton, nextButton, currentIndex - 1);
  });

  // Move slides when clicking right button
  nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide') || slides[0];
    const nextSlide = currentSlide.nextElementSibling;
    const currentIndex = slides.findIndex(slide => slide === currentSlide);
    const nextIndicator = indicators[currentIndex + 1];

    moveToSlide(track, currentSlide, nextSlide);
    updateIndicators(indicators[currentIndex], nextIndicator);
    hideShowArrows(slides, prevButton, nextButton, currentIndex + 1);
  });

  // Update slides when clicking an indicator
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      const currentSlide = track.querySelector('.current-slide') || slides[0];
      const targetSlide = slides[index];
      const currentIndicator = document.querySelector('.indicator.active');

      moveToSlide(track, currentSlide, targetSlide);
      updateIndicators(currentIndicator, indicator);
      hideShowArrows(slides, prevButton, nextButton, index);
    });
  });

  // Initialize default state
  slides[0].classList.add('current-slide');
  indicators[0].classList.add('active');
  hideShowArrows(slides, prevButton, nextButton, 0);
});


document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  fetch('/submit-form', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert('Form submitted successfully!');
      event.target.reset();
    })
    .catch((error) => {
      alert('Error submitting form.');
      console.error(error);
    });
});