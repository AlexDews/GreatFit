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
            button.style.left = '55px';
            button.style.right = 'auto';
            button.dataset.side = 'left';
          } else {
            button.style.right = '55px';
            button.style.left = 'auto';
            button.dataset.side = 'right';
          }
        }

        function showButton() {
          clearTimeout(hideTimeout);
          button.style.opacity = '1';
          button.style.transform = 'translateX(0) scale(1)';
          button.style.pointerEvents = 'auto';
          button.style.visibility = 'visible';
        }

        function hideButton() {
          hideTimeout = setTimeout(() => {
            if (isDragging) return;
            const side = button.dataset.side;
            button.style.opacity = '0';
            button.style.transform = side === 'left' ? 'translateX(-20px) scale(0.8)' : 'translateX(20px) scale(0.8)';
            button.style.pointerEvents = 'none';
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
                width: 45px; height: 45px; pointer-events: auto; display: flex; align-items: center; justify-content: center;">
      
      <a href="/html/styleguide/styleguide.html" 
         id="styleguide-button"
         target="_blank" 
         rel="noopener noreferrer"
         style="position: absolute; white-space: nowrap;
                background: #007bff; color: white; padding: 10px 18px; 
                border-radius: 50px; text-decoration: none; font-family: sans-serif; 
                font-size: 13px; font-weight: 600; box-shadow: 0 4px 15px rgba(0,123,255,0.4);
                display: flex; align-items: center; gap: 8px;
                transition: opacity 0.3s, transform 0.3s;
                opacity: 0; visibility: hidden; z-index: 1;">
        <span>🎨</span> Styleguide
      </a>

      <div id="drag-handle" 
           style="width: 45px; height: 45px; background: #28a745; border-radius: 50%; 
                  display: flex; align-items: center; justify-content: center;
                  cursor: grab; user-select: none; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                  color: white; z-index: 2; position: relative;">
        <span style="font-size: 20px;">⋮⋮</span>
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
