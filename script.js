const galleryItems = [
  { title: 'Sunlit Forest', category: 'Nature', src: 'images/forest.jpg', alt: 'A peaceful forest path with sunlight through the trees' },
  { title: 'Neon Skyline', category: 'City', src: 'images/city.jpg', alt: 'A modern city skyline glowing at dusk' },
  { title: 'Digital Horizon', category: 'Tech', src: 'images/tech.jpg', alt: 'A close-up of modern technology hardware and screens' },
  { title: 'Coastal Escape', category: 'Travel', src: 'images/travel.jpg', alt: 'A scenic coast and ocean view during sunset' },
  { title: 'Mountain Calm', category: 'Nature', src: 'images/mountain.jpg', alt: 'Majestic mountain landscape under a bright sky' },
  { title: 'Studio Glow', category: 'Tech', src: 'images/studio.jpg', alt: 'A bright creative studio workspace with modern design' },
  { title: 'Golden Sunset', category: 'Nature', src: 'images/sunset.jpg', alt: 'A bright sunset over open hills' },
  { title: 'Sweet Dessert', category: 'Travel', src: 'images/dessert.jpg', alt: 'A beautifully plated dessert on a table' },
  { title: 'Still Lake', category: 'Travel', src: 'images/lake.jpg', alt: 'A calm lake reflecting the sky' }
];

const mainImage = document.getElementById('mainImage');
const imageTitle = document.getElementById('imageTitle');
const imageCategory = document.getElementById('imageCategory');
const counter = document.getElementById('counter');
const thumbs = document.getElementById('thumbs');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';
let currentIndex = 0;

function getVisibleItems() {
  return currentFilter === 'all' ? galleryItems : galleryItems.filter((item) => item.category === currentFilter);
}

function renderGallery() {
  const visibleItems = getVisibleItems();
  if (!visibleItems.length) return;

  if (currentIndex >= visibleItems.length) currentIndex = 0;

  const item = visibleItems[currentIndex];
  mainImage.src = item.src;
  mainImage.alt = item.alt;
  imageTitle.textContent = item.title;
  imageCategory.textContent = item.category;
  counter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;

  thumbs.innerHTML = '';
  visibleItems.forEach((thumbItem, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `thumb-btn ${index === currentIndex ? 'active' : ''}`;
    button.innerHTML = `<img src="${thumbItem.src}" alt="${thumbItem.alt}" />`;
    button.addEventListener('click', () => {
      currentIndex = index;
      renderGallery();
    });
    thumbs.appendChild(button);
  });
}

function goNext() {
  const visibleItems = getVisibleItems();
  if (!visibleItems.length) return;
  currentIndex = (currentIndex + 1) % visibleItems.length;
  renderGallery();
}

function goPrev() {
  const visibleItems = getVisibleItems();
  if (!visibleItems.length) return;
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  renderGallery();
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    currentIndex = 0;
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    renderGallery();
  });
});

prevBtn.addEventListener('click', goPrev);
nextBtn.addEventListener('click', goNext);

renderGallery();
