window.addEventListener('load', () => {
    const bloques = document.querySelectorAll('.bloque');
    const courseColors = {}; // Diccionario para mapear URL -> Color RGB
    
    bloques.forEach(bloque => {
        // 1. Obtener el color asignado por defecto por la plataforma
        const computedStyle = window.getComputedStyle(bloque);
        const bgColor = computedStyle.backgroundColor;
        
        // 2. Extraer los valores RGB
        const rgbValues = bgColor.match(/\d+/g);
        
        if (rgbValues && rgbValues.length >= 3) {
            const r = rgbValues[0];
            const g = rgbValues[1];
            const b = rgbValues[2];
            
            bloque.style.setProperty('--r', r);
            bloque.style.setProperty('--g', g);
            bloque.style.setProperty('--b', b);
            
            // Guardar el color asociado a la URL del curso
            const courseUrl = bloque.getAttribute('data-url');
            if (courseUrl && !courseColors[courseUrl]) {
                courseColors[courseUrl] = { r, g, b };
            }
        }
        
        // 3. Remover clases rainbow para aplicar nuestro efecto transparente
        const clasesAEliminar = Array.from(bloque.classList).filter(c => c.startsWith('rainbow'));
        clasesAEliminar.forEach(c => bloque.classList.remove(c));
        
        bloque.style.backgroundColor = 'transparent';
        bloque.classList.add('tinted-dark-glass');

        // 4. Hacer los bloques más delgados dinámicamente
        const currentWidth = bloque.style.width;
        const currentHeight = bloque.style.height;
        
        if (currentWidth) {
            bloque.style.width = `calc(${currentWidth} - 10px)`;
            bloque.style.marginLeft = '5px';
        }
    });

    // 5. Aplicar los colores extraídos a los módulos del sidebar
    const sidebarLinks = document.querySelectorAll('#modulos ul li a');
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Si el enlace coincide con una URL del horario que guardamos
        if (href && courseColors[href]) {
            link.style.setProperty('--r', courseColors[href].r);
            link.style.setProperty('--g', courseColors[href].g);
            link.style.setProperty('--b', courseColors[href].b);
            link.classList.add('tinted-sidebar-glass');
        } else {
            // Si es un enlace de "Comunidades" o "Favoritos" que no está en el horario
            link.classList.add('default-sidebar-glass');
        }
    });

    const header = document.getElementById('header-content-wrapper');
    if (header) {
        header.style.background = 'rgba(17, 17, 21, 0.85)';
        header.style.backdropFilter = 'blur(12px)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
    }
});