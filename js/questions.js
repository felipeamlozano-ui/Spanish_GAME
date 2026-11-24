/**
 * ¡PERSONALIDADES HISPANAS! - BANCO DE PREGUNTAS CULTURALES
 * 25 Preguntas detalladas sobre grandes figuras de España e Hispanoamérica, con banderas y curiosidades.
 */

const QUIZ_QUESTIONS = [
  {
    id: 1,
    country: "España",
    flag: "🇪🇸",
    category: "📚 Literatura",
    question: "¿Qué escritor español es el autor de 'El ingenioso hidalgo don Quijote de la Mancha', considerada la primera novela moderna?",
    options: [
      "Lope de Vega",
      "Miguel de Cervantes",
      "Francisco de Quevedo",
      "Federico García Lorca"
    ],
    correct: 1,
    trivia: "El español es conocido mundialmente como 'la lengua de Cervantes', y su obra maestra ha sido traducida a más de 140 idiomas."
  },
  {
    id: 2,
    country: "México",
    flag: "🇲🇽",
    category: "🎨 Arte y Pintura",
    question: "¿Qué célebre pintora mexicana es mundialmente famosa por sus intensos autorretratos como 'Las dos Fridas' y por su Casa Azul en Coyoacán?",
    options: [
      "Frida Kahlo",
      "Leonora Carrington",
      "Remedios Varo",
      "María Izquierdo"
    ],
    correct: 0,
    trivia: "Frida Kahlo comenzó a pintar mientras se recuperaba de un grave accidente en su juventud, usando un espejo colocado sobre su cama."
  },
  {
    id: 3,
    country: "Colombia",
    flag: "🇨🇴",
    category: "📚 Literatura",
    question: "¿Qué escritor colombiano ganó el Premio Nobel de Literatura en 1982 y creó el mítico pueblo de Macondo en 'Cien años de soledad'?",
    options: [
      "Álvaro Mutis",
      "Jorge Isaacs",
      "Gabriel García Márquez",
      "Fernando Vallejo"
    ],
    correct: 2,
    trivia: "Gabriel García Márquez, conocido cariñosamente como 'Gabo', es el máximo exponente del realismo mágico en la literatura universal."
  },
  {
    id: 4,
    country: "España",
    flag: "🇪🇸",
    category: "🎨 Arte y Pintura",
    question: "¿Qué artista malagueño cofundó el movimiento cubista y pintó la monumental obra antibélica 'Guernica' en 1937?",
    options: [
      "Joan Miró",
      "Pablo Picasso",
      "Diego Velázquez",
      "Francisco de Goya"
    ],
    correct: 1,
    trivia: "Pablo Picasso creó más de 20,000 obras a lo largo de su vida, incluyendo pinturas, esculturas, cerámicas y dibujos."
  },
  {
    id: 5,
    country: "Chile",
    flag: "🇨🇱",
    category: "✒️ Poesía",
    question: "¿Quién fue la primera persona latinoamericana y la primera mujer hispanohablante en recibir el Premio Nobel de Literatura en 1945?",
    options: [
      "Isabel Allende",
      "Alfonsina Storni",
      "Juana de Ibarbourou",
      "Gabriela Mistral"
    ],
    correct: 3,
    trivia: "Su nombre real era Lucila Godoy Alcayaga y adoptó el seudónimo 'Gabriela Mistral' en homenaje a los poetas Gabriele D'Annunzio y Frédéric Mistral."
  },
  {
    id: 6,
    country: "Argentina",
    flag: "🇦🇷",
    category: "⚽ Deporte",
    question: "¿Qué futbolista rosarino es el máximo ganador de Balones de Oro en la historia y capitaneó a Argentina al título mundial en 2022?",
    options: [
      "Lionel Messi",
      "Diego Maradona",
      "Gabriel Batistuta",
      "Mario Kempes"
    ],
    correct: 0,
    trivia: "Lionel Messi ha ganado ocho Balones de Oro y es el jugador con más títulos oficiales en toda la historia del fútbol profesional."
  },
  {
    id: 7,
    country: "España",
    flag: "🇪🇸",
    category: "🔬 Ciencia",
    question: "¿Qué médico e investigador español recibió el Premio Nobel de Medicina en 1906 y es considerado el padre de la neurociencia moderna?",
    options: [
      "Severo Ochoa",
      "Gregorio Marañón",
      "Santiago Ramón y Cajal",
      "Miguel Servet"
    ],
    correct: 2,
    trivia: "Además de científico, Ramón y Cajal era un dibujante extraordinario; sus ilustraciones hechas a mano de las neuronas aún se usan en libros de texto."
  },
  {
    id: 8,
    country: "México",
    flag: "🇲🇽",
    category: "🔬 Ciencia",
    question: "¿Qué ingeniero químico mexicano ganó el Premio Nobel de Química en 1995 por descubrir el daño de los CFC en la capa de ozono?",
    options: [
      "Guillermo Haro",
      "Mario Molina",
      "Luis Miramontes",
      "Rodolfo Neri Vela"
    ],
    correct: 1,
    trivia: "El trabajo de Mario Molina fue clave para la firma del Protocolo de Montreal, considerado el tratado ambiental más exitoso de la historia."
  },
  {
    id: 9,
    country: "Perú",
    flag: "🇵🇪",
    category: "📚 Literatura",
    question: "¿Qué autor peruano, Premio Nobel de Literatura 2010, escribió obras fundamentales como 'La ciudad y los perros' y 'La fiesta del Chivo'?",
    options: [
      "Mario Vargas Llosa",
      "César Vallejo",
      "Julio Ramón Ribeyro",
      "José María Arguedas"
    ],
    correct: 0,
    trivia: "Mario Vargas Llosa publicó su primera novela, 'La ciudad y los perros', a los 27 años inspirándose en su propia experiencia en un colegio militar."
  },
  {
    id: 10,
    country: "Cuba",
    flag: "🇨🇺",
    category: "🎵 Música",
    question: "¿Qué legendaria cantante cubana fue bautizada mundialmente como 'La Reina de la Salsa' y popularizó el grito de '¡Azúcar!'?",
    options: [
      "Omara Portuondo",
      "Gloria Estefan",
      "Celia Cruz",
      "La Lupe"
    ],
    correct: 2,
    trivia: "Celia Cruz grabó más de 70 álbumes durante su carrera y recibió una estrella en el Paseo de la Fama de Hollywood."
  },
  {
    id: 11,
    country: "Venezuela",
    flag: "🇻🇪",
    category: "🏛️ Historia",
    question: "¿Qué líder militar y político caraqueño es conocido como 'El Libertador' por su papel decisivo en la independencia de seis naciones americanas?",
    options: [
      "Francisco de Miranda",
      "Simón Bolívar",
      "Antonio José de Sucre",
      "José Antonio Páez"
    ],
    correct: 1,
    trivia: "Bolivia lleva su nombre en honor a Simón Bolívar, quien soñaba con ver a las naciones hispanoamericanas unidas en una gran confederación."
  },
  {
    id: 12,
    country: "España",
    flag: "🇪🇸",
    category: "🏛️ Arquitectura",
    question: "¿Qué genial arquitecto catalán diseñó la Basílica de la Sagrada Familia y el Parque Güell en Barcelona?",
    options: [
      "Antoni Gaudí",
      "Santiago Calatrava",
      "Rafael Moneo",
      "Lluís Domènech i Montaner"
    ],
    correct: 0,
    trivia: "Gaudí se inspiraba directamente en las formas orgánicas de la naturaleza: árboles, conchas marinas y huesos humanos guiaban sus estructuras."
  },
  {
    id: 13,
    country: "México",
    flag: "🇲🇽",
    category: "✒️ Poesía",
    question: "¿Qué escritora y religiosa novohispana del siglo XVII fue llamada 'La Décima Musa' y defendió el derecho de la mujer al estudio?",
    options: [
      "Rosario Castellanos",
      "Elena Poniatowska",
      "Laura Esquivel",
      "Sor Juana Inés de la Cruz"
    ],
    correct: 3,
    trivia: "Sor Juana aprendió a leer a los tres años y llegó a reunir una biblioteca personal de más de 4,000 volúmenes en su celda del convento."
  },
  {
    id: 14,
    country: "Chile",
    flag: "🇨🇱",
    category: "✒️ Poesía",
    question: "¿Qué poeta chileno escribió 'Veinte poemas de amor y una canción desesperada' a los 19 años y ganó el Premio Nobel en 1971?",
    options: [
      "Nicanor Parra",
      "Pablo Neruda",
      "Vicente Huidobro",
      "Roberto Bolaño"
    ],
    correct: 1,
    trivia: "Pablo Neruda era un apasionado coleccionista de objetos curiosos, especialmente mascarones de proa, caracolas marinas y botellas antiguas."
  },
  {
    id: 15,
    country: "Argentina",
    flag: "🇦🇷",
    category: "🔬 Ciencia",
    question: "¿Qué prestigioso cardiocirujano argentino revolucionó la medicina mundial al desarrollar la cirugía de bypass aortocoronario?",
    options: [
      "Bernardo Houssay",
      "Luis Federico Leloir",
      "René Favaloro",
      "César Milstein"
    ],
    correct: 2,
    trivia: "Antes de su histórico avance en Estados Unidos, René Favaloro trabajó durante 12 años como médico rural en un pequeño pueblo de La Pampa."
  },
  {
    id: 16,
    country: "Colombia",
    flag: "🇨🇴",
    category: "🎵 Música",
    question: "¿Qué cantante y compositora barranquillera alcanzó fama global con 'Pies Descalzos' y ha ganado múltiples premios Grammy?",
    options: [
      "Shakira",
      "Karol G",
      "Fanny Lu",
      "Totó la Momposina"
    ],
    correct: 0,
    trivia: "Además de su carrera musical, Shakira fundó en 1997 la Fundación Pies Descalzos para construir escuelas y brindar educación en Colombia."
  },
  {
    id: 17,
    country: "España",
    flag: "🇪🇸",
    category: "🎬 Cine",
    question: "¿Qué director de cine español ganó dos premios Óscar por películas como 'Todo sobre mi madre' y 'Hable con ella'?",
    options: [
      "Alejandro Amenábar",
      "Luis Buñuel",
      "Pedro Almodóvar",
      "Guillermo del Toro"
    ],
    correct: 2,
    trivia: "El estilo visual de Pedro Almodóvar se caracteriza por el uso vibrante del color rojo, el humor irreverente y profundos retratos femeninos."
  },
  {
    id: 18,
    country: "Nicaragua",
    flag: "🇳🇮",
    category: "✒️ Poesía",
    question: "¿Qué poeta nicaragüense es reconocido como el iniciador y máximo representante del modernismo literario en lengua española?",
    options: [
      "Ernesto Cardenal",
      "Rubén Darío",
      "José Martí",
      "Amado Nervo"
    ],
    correct: 1,
    trivia: "Con la publicación de su libro 'Azul...' en 1888, Rubén Darío renovó por completo la métrica y la musicalidad de la poesía en español."
  },
  {
    id: 19,
    country: "México",
    flag: "🇲🇽",
    category: "🎭 Cine y Humor",
    question: "¿Qué legendario actor y comediante mexicano dio vida al personaje 'Cantinflas', cuya forma de hablar originó el verbo 'cantinflear'?",
    options: [
      "Mario Moreno",
      "Germán Valdés (Tin Tan)",
      "Roberto Gómez Bolaños",
      "Pedro Infante"
    ],
    correct: 0,
    trivia: "La Real Academia Española incluyó el término 'cantinflear' en su diccionario para describir el acto de hablar mucho sin decir nada concreto."
  },
  {
    id: 20,
    country: "Argentina",
    flag: "🇦🇷",
    category: "📚 Literatura",
    question: "¿Qué escritor argentino, autor de 'Ficciones' y 'El Aleph', es famoso por sus cuentos filosóficos sobre laberintos, espejos y bibliotecas infinitas?",
    options: [
      "Julio Cortázar",
      "Ernesto Sabato",
      "Adolfo Bioy Casares",
      "Jorge Luis Borges"
    ],
    correct: 3,
    trivia: "Jorge Luis Borges fue director de la Biblioteca Nacional de Argentina durante casi 18 años, aun cuando ya había perdido prácticamente la vista."
  },
  {
    id: 21,
    country: "España",
    flag: "🇪🇸",
    category: "🏅 Deporte",
    question: "¿Qué tenista español nacido en Manacor es apodado 'El Rey de la Tierra Batida' tras conquistar 14 títulos de Roland Garros?",
    options: [
      "Carlos Alcaraz",
      "Rafael Nadal",
      "David Ferrer",
      "Manuel Santana"
    ],
    correct: 1,
    trivia: "Rafael Nadal es naturalmente diestro para escribir y comer, pero aprendió a jugar al tenis con la mano izquierda desde niño."
  },
  {
    id: 22,
    country: "República Dominicana",
    flag: "🇩🇴",
    category: "✨ Moda y Diseño",
    question: "¿Qué famoso diseñador dominicano de alta costura vistió a primeras damas, actrices y miembros de la realeza durante más de cinco décadas?",
    options: [
      "Carolina Herrera",
      "Ágatha Ruiz de la Prada",
      "Óscar de la Renta",
      "Adolfo Domínguez"
    ],
    correct: 2,
    trivia: "Óscar de la Renta comenzó su carrera estudiando pintura en Madrid antes de convertirse en aprendiz del maestro español Cristóbal Balenciaga."
  },
  {
    id: 23,
    country: "Uruguay",
    flag: "🇺🇾",
    category: "📚 Literatura",
    question: "¿Qué periodista y escritor uruguayo es autor de obras emblemáticas como 'Las venas abiertas de América Latina' y 'El libro de los abrazos'?",
    options: [
      "Eduardo Galeano",
      "Mario Benedetti",
      "Juan Carlos Onetti",
      "Horacio Quiroga"
    ],
    correct: 0,
    trivia: "Eduardo Galeano combinó el periodismo, la historia y la poesía en relatos breves que han sido leídos por generaciones en todo el mundo."
  },
  {
    id: 24,
    country: "Guatemala",
    flag: "🇬🇹",
    category: "🕊️ Derechos Humanos",
    question: "¿Qué líder indígena maya quiché de Guatemala recibió el Premio Nobel de la Paz en 1992 por su lucha en defensa de los pueblos originarios?",
    options: [
      "Elena Poniatowska",
      "Rigoberta Menchú",
      "Berta Cáceres",
      "Dolores Cacuango"
    ],
    correct: 1,
    trivia: "Al recibir el Nobel a los 33 años, Rigoberta Menchú se convirtió en una de las personas más jóvenes en obtener este prestigioso galardón."
  },
  {
    id: 25,
    country: "España",
    flag: "🇪🇸",
    category: "🎨 Arte y Pintura",
    question: "¿Qué excéntrico pintor surrealista español es autor de 'La persistencia de la memoria', célebre por sus relojes blandos que se derriten?",
    options: [
      "Diego Velázquez",
      "Bartolomé Esteban Murillo",
      "Salvador Dalí",
      "Joaquín Sorolla"
    ],
    correct: 2,
    trivia: "Salvador Dalí diseñó el famoso logotipo de la marca de caramelos Chupa Chups en menos de una hora en el año 1969."
  }
];

// Helper to shuffle questions or options
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
