let scale = 1;
let posX = 0;
let posY = 0;
let isDragging = false;
let startX, startY;

const zoomArea = document.getElementById("zoom-area");
const viewport = document.getElementById("viewport");

// Função de atualização do transform para a área de zoom
function updateTransform() {
  zoomArea.style.transform = `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px)) scale(${scale})`;
}

// Função de zoom in
function zoomIn() {
  scale += 0.9;
  updateTransform();
}

// Função de zoom out
function zoomOut() {
  scale = Math.max(0.9, scale - 0.9);
  updateTransform();
}

// Eventos para mouse (desktop)
viewport.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  viewport.style.cursor = "grabbing";
});

viewport.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  startX = e.clientX;
  startY = e.clientY;
  posX += dx;
  posY += dy;
  updateTransform();
});

viewport.addEventListener("mouseup", () => {
  isDragging = false;
  viewport.style.cursor = "grab";
});

viewport.addEventListener("mouseleave", () => {
  isDragging = false;
  viewport.style.cursor = "grab";
});

// Eventos para toque (mobile)
viewport.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  viewport.style.cursor = "grabbing";
});

viewport.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const dx = e.touches[0].clientX - startX;
  const dy = e.touches[0].clientY - startY;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  posX += dx;
  posY += dy;
  updateTransform();
});

viewport.addEventListener("touchend", () => {
  isDragging = false;
  viewport.style.cursor = "grab";
});

viewport.addEventListener("touchcancel", () => {
  isDragging = false;
  viewport.style.cursor = "grab";
});







document.querySelectorAll('.popup-trigger').forEach(circle => {
  circle.addEventListener('click', () => {
    const popupId = circle.getAttribute('data-popup-id');
    document.querySelectorAll('.popup').forEach(p => p.style.display = 'none');
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.style.display = 'block';
      loadImages(popup); // ⬅️ carregamento sob demanda
    }
  });
});

document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.style.display = 'none';
  });
});


// Fecha o popup se clicar fora dele (mas não se clicar em algo dentro dele)
window.addEventListener('click', (e) => {
  const isPopup = e.target.closest('.popup');
  const isTrigger = e.target.closest('.popup-trigger');
  if (!isPopup && !isTrigger) {
    document.querySelectorAll('.popup').forEach(p => p.style.display = 'none');
  }
});


document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // impede que o clique suba pro evento global
    btn.parentElement.style.display = 'none';
  });
});

function loadImages(popup) {
  popup.querySelectorAll('img.lazy-img').forEach(img => {
    if (!img.src) {
      img.src = img.getAttribute('data-src');
    }
  });
}