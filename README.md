# 🌮 ¡Sabores Hispanos! - El Gran Kahoot de Gastronomía y Cultura 🥘

Un juego interactivo web de preguntas y respuestas en español, inspirado en el diseño vibrante y dinámico de **Kahoot**, centrado en **Comidas Típicas y Los Países Hispánicos**.

---

## ✨ Características Principales

- 🎮 **Estilo Kahoot Auténtico**:
  - Cuatro botones con formas y colores icónicos: 🔺 Rojo (Triángulo), 🔷 Azul (Rombo), 🟡 Amarillo (Círculo) y 🟩 Verde (Cuadrado).
  - Cronómetro circular SVG en tiempo real con cuenta regresiva sonora y visual de alerta (de 20s, 15s o 30s).
  - Cálculo de puntuación oficial de Kahoot basado en la rapidez de respuesta (hasta 1,000 puntos base) + bonos por racha 🔥.
  - Oponentes virtuales en vivo (Sofía 🇪🇸, Mateo 🇦🇷, Valentina 🇨🇴, Lucas 🇲🇽, Camila 🇨🇱) que compiten contigo en la tabla de clasificación.
  - Gran Podio 3D interactivo para el 1º, 2º y 3º puesto con lluvia de confeti y fanfarria triunfal.
- 🌎 **Tema Gastronómico y Cultural**:
  - 25 preguntas detalladas en español sobre platillos emblemáticos: Paella, Tacos al pastor, Asado, Ceviche, Bandeja paisa, Ropa vieja, Pastel de choclo, Chivito, Mangú, Pupusas, Mole poblano, Curanto y más.
  - Sección *"¿Sabías que...?"* al final de cada pregunta con explicaciones y curiosidades históricas del plato.
  - Módulo de **Revisión de Respuestas** al terminar la partida para estudiar los aciertos y fallos.
- 🔊 **Efectos de Sonido con Web Audio API**:
  - 100% sintetizados procedimentalmente mediante el navegador (sin archivos MP3 externos ni problemas de CORS).
  - Música de fondo en el lobby, tics de tensión para el temporizador, fanfarrias de acierto, efectos de error y fanfarria olímpica en el podio.
  - Botón flotante para silenciar/activar sonido y modo pantalla completa.
- 📱 **Diseño 100% Responsivo**:
  - Diseñado para funcionar impecablemente en computadoras, tablets y teléfonos celulares.
  - Atajos de teclado: Puedes presionar las teclas `1`, `2`, `3` o `4` para contestar inmediatamente.

---

## 🚀 Cómo Publicar en GitHub Pages (Deploy en 1 Minuto)

Este proyecto está **100% preparado** para funcionar directamente en GitHub Pages sin necesidad de instalar librerías complejas ni procesos de compilación (builds).

### Paso 1: Crear el repositorio en GitHub
1. Entra a tu cuenta en [GitHub](https://github.com/new) y crea un nuevo repositorio (por ejemplo, `sabores-hispanos` o `jogo-espanhol`).
2. Déjalo como **Público** (Public).

### Paso 2: Subir el proyecto desde tu terminal
Abre una terminal en la carpeta de este proyecto y ejecuta:

```bash
git remote add origin https://github.com/TU-USUARIO/NOMBRE-DEL-REPOSITORIO.git
git push -u origin main
```

*(Sustituye `TU-USUARIO` y `NOMBRE-DEL-REPOSITORIO` por los tuyos).*

---

### Paso 3: Activar GitHub Pages en el repositorio

Tienes dos opciones listas:

#### Opción A (Recomendada con GitHub Actions - Totalmente Automatizada):
1. En tu repositorio de GitHub, ve a la pestaña **Settings** (Configuración) ➔ sección **Pages** (en el menú lateral izquierdo).
2. En **Build and deployment** ➔ **Source**, selecciona:
   **`GitHub Actions`**.
3. ¡Listo! El archivo incluido `.github/workflows/deploy.yml` compilará y publicará el juego automáticamente. En unos segundos tu juego estará activo en:
   ```
   https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/
   ```

#### Opción B (Clásica por rama):
1. En **Settings** ➔ **Pages** ➔ **Build and deployment** ➔ **Source**, selecciona:
   **`Deploy from a branch`**.
2. En **Branch**, selecciona **`main`** y la carpeta **`/ (root)`**, luego haz clic en **Save**.
3. En 1 minuto tendrás tu enlace listo.

---

## 💻 Cómo probar el juego localmente

Para probar el juego de inmediato en tu computadora:

1. Simplemente haz doble clic sobre el archivo `index.html` en tu explorador de archivos para abrirlo en Chrome, Edge o tu navegador preferido.
2. O bien, si tienes Python instalado, ejecuta en la terminal:
   ```bash
   python -m http.server 8000
   ```
   Y abre en tu navegador: `http://localhost:8000`.

---

## 📂 Estructura del Proyecto

```text
├── index.html                   # Página principal y estructura semántica de pantallas
├── .nojekyll                    # Configuración para GitHub Pages
├── .gitignore                   # Archivos ignorados por Git
├── css/
│   └── style.css                # Estilos visuales Kahoot, degradados, animaciones y podio 3D
├── js/
│   ├── audio.js                 # Motor de sonido sintetizado Web Audio API
│   ├── confetti.js              # Animaciones de partículas y confeti para celebraciones
│   ├── questions.js             # Banco de 25 preguntas culturales con opciones y curiosidades
│   └── game.js                  # Lógica del juego, rivales en vivo, cronómetro y cálculo de puntos
└── .github/
    └── workflows/
        └── deploy.yml           # Workflow automático para GitHub Pages Actions
```

¡Que empiece el juego y que gane el mejor gourmet! 🌮🏆
