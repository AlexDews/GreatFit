function generateDragScript() {
  return `
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const container = document.getElementById('draggable-styleguide');
        const dragHandle = document.getElementById('drag-handle');
        const button = document.getElementById('styleguide-button');
        
        let isDragging = false;
        let hideTimeout = null;
        let startX, startY, initialX, initialY;

        // --- ЛОГИКА ПАМЯТИ ---
        function savePosition(x, y) {
          localStorage.setItem('styleguide-btn-pos', JSON.stringify({ x, y }));
        }

        function loadPosition() {
          const saved = localStorage.getItem('styleguide-btn-pos');
          if (saved) {
            const { x, y } = JSON.parse(saved);
            // Проверяем, не вылезла ли кнопка за границы (если размер окна изменился)
            const safeX = Math.max(10, Math.min(x, window.innerWidth - 55));
            const safeY = Math.max(10, Math.min(y, window.innerHeight - 55));
            container.style.left = safeX + 'px';
            container.style.top = safeY + 'px';
            container.style.bottom = 'auto';
            container.style.right = 'auto';
            return safeX;
          }
          return null;
        }

        function updateButtonSide(currentX) {
          const screenWidth = window.innerWidth;
          if (currentX < screenWidth / 2) {
            button.style.left = '35px';
            button.style.right = 'auto';
            button.dataset.side = 'left';
          } else {
            button.style.right = '35px';
            button.style.left = 'auto';
            button.dataset.side = 'right';
          }
        }

        function showButton() {
  clearTimeout(hideTimeout);
  button.style.opacity = '1';
  button.style.visibility = 'visible';
  button.style.pointerEvents = 'auto';
  
  // Прижимаем кнопку вплотную к хэндлу в зависимости от стороны экрана
  const side = button.dataset.side;
  button.style.transform = side === 'left' ? 'translateX(35px) scale(1)' : 'translateX(-35px) scale(1)';
  
  // Добавляем хэндлу неоновое свечение, когда кнопка активна
  dragHandle.style.borderColor = '#00a2ff';
  dragHandle.style.boxShadow = '0 0 10px rgba(0, 162, 255, 0.4)';
}

        function hideButton() {
  hideTimeout = setTimeout(() => {
    if (isDragging) return;
    const side = button.dataset.side;
    button.style.opacity = '0';
    button.style.transform = side === 'left' ? 'translateX(110px) scale(0.9)' : 'translateX(-110px) scale(0.9)';
    button.style.pointerEvents = 'none';
    
    // Возвращаем хэндл в дефолтное состояние
    dragHandle.style.borderColor = '#164670';
    dragHandle.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    
    setTimeout(() => { if(button.style.opacity === '0') button.style.visibility = 'hidden'; }, 300);
  }, 300);
}

        dragHandle.addEventListener('mousedown', (e) => {
          isDragging = true;
          const rect = container.getBoundingClientRect();
          initialX = rect.left;
          initialY = rect.top;
          startX = e.clientX;
          startY = e.clientY;
          showButton();
          dragHandle.style.cursor = 'grabbing';
          e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
          if (!isDragging) return;
          
          let x = initialX + (e.clientX - startX);
          let y = initialY + (e.clientY - startY);

          const padding = 10;
          x = Math.max(padding, Math.min(x, window.innerWidth - 55));
          y = Math.max(padding, Math.min(y, window.innerHeight - 55));

          container.style.left = x + 'px';
          container.style.top = y + 'px';
          container.style.bottom = 'auto';
          container.style.right = 'auto';
          
          updateButtonSide(x);
        });

        document.addEventListener('mouseup', () => {
          if (!isDragging) return;
          isDragging = false;
          dragHandle.style.cursor = 'grab';
          
          // Сохраняем финальную точку
          const rect = container.getBoundingClientRect();
          savePosition(rect.left, rect.top);
          
          hideButton();
        });

        container.addEventListener('mouseenter', showButton);
        container.addEventListener('mouseleave', hideButton);

        // Инициализация при загрузке
        const loadedX = loadPosition();
        updateButtonSide(loadedX || container.getBoundingClientRect().left);
        hideButton(); 
      });
    </script>
  `;
}

function generateStyleguideButton() {
  return `
    <div id="draggable-styleguide" 
         style="position: fixed; bottom: 40px; right: 20px; z-index: 999999; 
                width: 45px; height: 45px; pointer-events: auto; display: flex; align-items: center; justify-content: center;
                font-family: 'Montserrat', sans-serif;">
      
      <a href="/styleguide" 
         id="styleguide-button"
         target="_blank" 
         rel="noopener noreferrer"
         style="position: absolute; white-space: nowrap;
                background: #092842; color: #eee; padding: 15px 30px; 
                border-radius: 8px; text-decoration: none;
                font-size: 13px; font-weight: 600; 
                border: 1px solid #164670;
                box-shadow: 0 8px 24px rgba(0,0,0,0.4);
                display: flex; align-items: center; gap: 8px;
                transition: all 0.3s ease-in-out;
                opacity: 0; visibility: hidden; z-index: 1;">
         Styleguide
      </a>

      <div id="drag-handle" 
           style="width: 45px; height: 45px; background: #0c3353; border: 1px solid #164670; border-radius: 8px; 
                  display: flex; align-items: center; justify-content: center;
                  cursor: grab; user-select: none; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                  color: #00a2ff; z-index: 2; position: relative;
                  transition: all 0.2s ease-in-out;">
        <span style="font-size: 18px; letter-spacing: -1px; font-weight: bold;">⋮⋮</span>
      </div>
    </div>
  `;
}

export const styleguidePlugin = (enabled = true) => {
  if (!enabled) return null;

  return {
    name: "styleguide-link-plugin",
    apply: "serve",
    transformIndexHtml(html) {
      return html.replace("</body>", generateStyleguideButton() + generateDragScript() + "</body>");
    },
  };
};
