# 🌮 ¡Sabores Hispanos! - Trivia Culinaria Individual 🥘

Un juego interactivo web de preguntas y respuestas en español, inspirado en la estética vibrante de **Kahoot**, diseñado para una **experiencia 100% individual** enfocada en el aprendizaje y desafío cultural sobre **Comidas Típicas y Los Países Hispánicos**.

---

## ✨ Características Principales

- 🎯 **Experiencia 100% Individual**:
  - Sin bots, sin clasificaciones fingidas ni marcadores artificiales. Es un desafío personal para poner a prueba tu conocimiento de la gastronomía hispanohablante.
  - Al completar la partida recibes un **Certificado de Maestría Gastronómica** con tu puntuación, precisión, racha y un título honorífico (ej. *Gran Maestro de la Cocina Hispana*, *Chef Especialista Hispano*, etc.).
- 🎮 **Estilo Visual Kahoot**:
  - Cuatro botones dinámicos con los colores y formas canónicas: 🔺 Rojo (Triángulo), 🔷 Azul (Rombo), 🟡 Amarillo (Círculo) y 🟩 Verde (Cuadrado).
  - Cronómetro circular SVG animado con cuenta regresiva sonora y alerta de tensión en los últimos segundos.
  - Sistema de puntuación por velocidad (hasta 1,000 puntos base) + bonos por racha de respuestas seguidas 🔥.
- 🌎 **Tema: Comidas Típicas y Países Hispánicos**:
  - 25 preguntas culturales sobre platos tradicionales de España, México, Argentina, Perú, Colombia, Venezuela, Chile, Cuba, Uruguay, República Dominicana, Guatemala, El Salvador, Costa Rica, Ecuador y Bolivia.
  - Al responder cada pregunta, descubres una tarjeta didáctica **"¿Sabías que...?"** con la historia, ingredientes y curiosidades del platillo.
  - Al final de la partida, puedes abrir el **Resumen Culinario Completo** para repasar todas las preguntas, tus respuestas y las curiosidades aprendidas.
- 🔊 **Audio Procedural con Web Audio API**:
  - Efectos de sonido y melodías sintetizadas en el navegador (sin archivos externos, carga instantánea y sin problemas de CORS).
  - Control de sonido (Mute/Unmute) y botón de pantalla completa.
  - Atajos de teclado: responde al instante usando las teclas `1`, `2`, `3` o `4`.
- 📱 **Totalmente Responsivo**:
  - Adaptado para teléfonos inteligentes, tablets y computadoras de escritorio.

---

## 🚀 Publicación en GitHub Pages (Deploy en 1 Minuto)

El repositorio remoto ya está configurado con:
`https://github.com/felipeamlozano-ui/Spanish_GAME.git`

Tu enlace público de juego en GitHub Pages será:
🌐 **https://felipeamlozano-ui.github.io/Spanish_GAME/**

---

### Cómo Activar GitHub Pages en el repositorio:
1. En tu repositorio en GitHub ([https://github.com/felipeamlozano-ui/Spanish_GAME/settings/pages](https://github.com/felipeamlozano-ui/Spanish_GAME/settings/pages)), ve a **Settings** ➔ **Pages**.
2. En la sección **Build and deployment** ➔ **Source**, selecciona:
   **`Deploy from a branch`**.
3. En **Branch**, selecciona **`main`** y la carpeta **`/ (root)`**, luego haz clic en el botón **Save**.
4. ¡Listo! En 30 a 60 segundos tu juego estará activo en:
   🌐 **https://felipeamlozano-ui.github.io/Spanish_GAME/**

---

## 📂 Estructura Limpia del Proyecto

```text
├── index.html                   # Interfaz de pantallas (Lobby, Intro, Pregunta, Resultado, Resumen)
├── .nojekyll                    # Configuración para GitHub Pages
├── .gitignore                   # Archivos ignorados por Git
├── css/
│   └── style.css                # Estilos Kahoot, degradados, animaciones y diseño responsivo
├── js/
│   ├── audio.js                 # Sintetizador procedural Web Audio API
│   ├── confetti.js              # Animaciones de confeti a 60fps en Canvas
│   ├── questions.js             # 25 preguntas culturales, opciones y curiosidades
│   └── game.js                  # Motor del juego individual, temporizador SVG y títulos de maestría
└── .github/
    └── workflows/
        └── deploy.yml           # Workflow automático para GitHub Pages Actions
```

¡Disfruta del juego y descubre los mejores sabores del mundo hispano! 🌮🥘🏆
