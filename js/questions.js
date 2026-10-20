/**
 * ¡SABORES HISPANOS! - BANCO DE PREGUNTAS CULINARIAS
 * 25 Preguntas detalladas con opciones, respuestas correctas, banderas y curiosidades culturales.
 */

const QUIZ_QUESTIONS = [
  {
    id: 1,
    country: "España",
    flag: "🇪🇸",
    dish: "Paella Valenciana",
    question: "¿Qué especia tradicional da su característico color amarillo y aroma inconfundible a la auténtica Paella Valenciana?",
    options: [
      "El curry",
      "El azafrán",
      "La cúrcuma",
      "El pimentón dulce"
    ],
    correct: 1, // El azafrán
    trivia: "El azafrán es conocido como el 'oro rojo' por ser una de las especias más costosas del mundo; se extrae manualmente de los estigmas de la flor Crocus sativus."
  },
  {
    id: 2,
    country: "México",
    flag: "🇲🇽",
    dish: "Guacamole Tradicional",
    question: "¿Cuál es el ingrediente base e indispensable para preparar un auténtico Guacamole mexicano?",
    options: [
      "Tomatillo verde",
      "Aguacate (Palta)",
      "Nopal tierno",
      "Calabacita criolla"
    ],
    correct: 1, // Aguacate
    trivia: "La palabra 'guacamole' proviene del náhuatl 'ahuacamolli', que combina 'ahuacatl' (aguacate) y 'molli' (salsa o mole)."
  },
  {
    id: 3,
    country: "Argentina",
    flag: "🇦🇷",
    dish: "El Asado Criollo",
    question: "¿Qué técnica o preparación es el ritual culinario por excelencia en las reuniones familiares y de amigos en Argentina?",
    options: [
      "El Asado a la parrilla",
      "La Feijoada",
      "El Sancocho",
      "La Ropa Vieja"
    ],
    correct: 0, // El Asado
    trivia: "Hacer un asado en Argentina es un ritual sagrado; tradicionalmente, al finalizar, los comensales rinden homenaje gritando: '¡Un aplauso para el asador!'."
  },
  {
    id: 4,
    country: "Perú",
    flag: "🇵🇪",
    dish: "Ceviche Peruano",
    question: "¿Cómo se 'cocina' o marina tradicionalmente el pescado fresco en el célebre Ceviche peruano?",
    options: [
      "Al vapor con hierbas andinas",
      "En aceite hirviendo",
      "Con jugo fresco de limón (lima) y sal",
      "En salsa de soja y vinagre"
    ],
    correct: 2, // Con jugo fresco de limón
    trivia: "El jugo restante de la maceración del ceviche se conoce como 'Leche de tigre', famoso por su sabor concentrado y sus supuestas propiedades revitalizantes."
  },
  {
    id: 5,
    country: "Colombia",
    flag: "🇨🇴",
    dish: "Bandeja Paisa",
    question: "¿Qué plato abundante de Antioquia (Colombia) incluye frijoles, arroz, chicharrón, carne molida, huevo frito, tajada de plátano y arepa?",
    options: [
      "El Ajiaco",
      "La Bandeja Paisa",
      "El Mote de queso",
      "La Cazuela de mariscos"
    ],
    correct: 1, // La Bandeja Paisa
    trivia: "Originalmente era la comida hipercalórica de los campesinos y arrieros de la región paisa para soportar largas jornadas de trabajo en el campo montañoso."
  },
  {
    id: 6,
    country: "Venezuela",
    flag: "🇻🇪",
    dish: "Pabellón Criollo",
    question: "¿Cuáles son los cuatro elementos fundamentales que componen el Pabellón Criollo, plato nacional de Venezuela?",
    options: [
      "Pollo, papas fritas, ensalada y maíz",
      "Arroz blanco, carne mechada, caraotas negras y tajadas",
      "Yuca frita, chicharrón, frijoles rojos y huevo",
      "Cerdo guisado, patacones, queso llanero y arroz"
    ],
    correct: 1, // Arroz blanco, carne mechada, caraotas negras y tajadas
    trivia: "Se dice que el plato representa la unión de las culturas venezolanas: los españoles (arroz blanco), los africanos (caraotas negras) y los indígenas (carne y plátano)."
  },
  {
    id: 7,
    country: "España",
    flag: "🇪🇸",
    dish: "Tortilla Española",
    question: "¿Cuáles son los dos ingredientes esenciales de la clásica Tortilla de Patatas española (con o sin cebolla)?",
    options: [
      "Harina de trigo y leche",
      "Patatas (papas) y huevos",
      "Arroz y garbanzos",
      "Plátano macho y queso"
    ],
    correct: 1, // Patatas y huevos
    trivia: "El debate de si la tortilla debe llevar cebolla ('concebollistas') o no ('sincebollistas') es una de las discusiones gastronómicas más apasionadas de toda España."
  },
  {
    id: 8,
    country: "Chile",
    flag: "🇨🇱",
    dish: "Pastel de Choclo",
    question: "¿Qué ingrediente principal forma la pasta cremosa y dulce que cubre la base de carne (pino) en el Pastel de Choclo chileno?",
    options: [
      "Maíz tierno molido (choclo)",
      "Yuca fermentada",
      "Calabaza asada",
      "Trigo mote"
    ],
    correct: 0, // Maíz tierno molido (choclo)
    trivia: "Tradicionalmente se hornea y se sirve en pailas o fuentes de greda (arcilla) de Pomaire, que mantienen el calor durante toda la comida."
  },
  {
    id: 9,
    country: "México",
    flag: "🇲🇽",
    dish: "Mole Poblano",
    question: "¿Qué ingrediente dulce e histórico le da profundidad y brillo al complejo 'Mole Poblano' mexicano?",
    options: [
      "Miel de agave azul",
      "Chocolate amargo (cacao)",
      "Azúcar de caña quemada",
      "Canela en almíbar"
    ],
    correct: 1, // Chocolate amargo
    trivia: "Un buen mole poblano tradicional puede llevar más de 30 ingredientes distintos, incluyendo varios tipos de chiles secos, frutos secos y especias molidas en metate."
  },
  {
    id: 10,
    country: "Argentina",
    flag: "🇦🇷",
    dish: "Alfajores Argentinos",
    question: "¿Qué irresistible dulce es el relleno más popular y emblemático de los alfajores argentinos?",
    options: [
      "Crema chantilly",
      "Dulce de membrillo",
      "Dulce de leche",
      "Mermelada de fresa"
    ],
    correct: 2, // Dulce de leche
    trivia: "En Argentina se consumen más de 6 millones de alfajores al día, existiendo versiones de maicena, bañadas en chocolate negro o glaseadas con azúcar."
  },
  {
    id: 11,
    country: "Perú",
    flag: "🇵🇪",
    dish: "Causa Limeña",
    question: "¿Qué tipo de tubérculo andino es la base prensada y sazonada de la colorida Causa Limeña?",
    options: [
      "Camote morado",
      "Yuca brava",
      "Papa amarilla",
      "Oca dulce"
    ],
    correct: 2, // Papa amarilla
    trivia: "Cuenta la historia que este plato se vendía en las calles de Lima para recaudar fondos durante la guerra con el lema: '¡Por la causa nacional!'."
  },
  {
    id: 12,
    country: "Cuba",
    flag: "🇨🇺",
    dish: "Ropa Vieja",
    question: "¿Qué plato cubano se prepara con carne de res deshebrada cocinada a fuego lento con tomate, cebolla y pimientos?",
    options: [
      "Ropa Vieja",
      "Vaca Frita",
      "Picadillo a la Habanera",
      "Lechón Asado"
    ],
    correct: 0, // Ropa Vieja
    trivia: "Su curioso nombre proviene de una leyenda sobre un hombre pobre que, al no tener comida para su familia, coció su ropa rota con tanto amor que un milagro la convirtió en carne."
  },
  {
    id: 13,
    country: "República Dominicana",
    flag: "🇩🇴",
    dish: "El Mangú",
    question: "¿Qué plato típico dominicano hecho de puré de plátano verde se sirve tradicionalmente con 'los tres golpes' (queso frito, salami y huevo)?",
    options: [
      "El Mofongo",
      "El Mangú",
      "El Majarete",
      "El Chivo liniero"
    ],
    correct: 1, // El Mangú
    trivia: "Una popular leyenda urbana dice que durante la ocupación estadounidense, un soldado probó el puré y exclamó 'Man, good!' ('¡Hombre, qué bueno!'), derivando en 'Mangú'."
  },
  {
    id: 14,
    country: "España",
    flag: "🇪🇸",
    dish: "Gazpacho Andaluz",
    question: "¿A qué temperatura se sirve típicamente el Gazpacho andaluz de tomate, pepino, pimiento y aceite de oliva?",
    options: [
      "Hirviendo en cazuela",
      "Completamente frío o fresco",
      "Tibio al horno",
      "A temperatura ambiente"
    ],
    correct: 1, // Completamente frío
    trivia: "Es la sopa de verano perfecta en el sur de España para combatir las altas temperaturas andaluzas mientras aporta vitaminas y minerales esenciales."
  },
  {
    id: 15,
    country: "Uruguay",
    flag: "🇺🇾",
    dish: "El Chivito Uruguayo",
    question: "¿Qué es en realidad el famoso 'Chivito' uruguayo a pesar de su nombre?",
    options: [
      "Un guiso de cabra montés",
      "Un sándwich contundente de carne de lomo vacuno",
      "Una empanada de queso y cebolla",
      "Una sopa marina de almejas"
    ],
    correct: 1, // Un sándwich de carne de lomo
    trivia: "Nació en Punta del Este en los años 40 cuando una clienta pidió carne de chivo (cabra); como no tenían, el cocinero le preparó un sándwich con lomo de vaca tan rico que quedó bautizado así."
  },
  {
    id: 16,
    country: "México",
    flag: "🇲🇽",
    dish: "Tacos al Pastor",
    question: "¿Qué fruta fresca se suele colocar en la parte superior del trompo de carne y se corta con maestría sobre el taco al pastor?",
    options: [
      "Mango manila",
      "Piña (ananá)",
      "Naranja agria",
      "Lima dulce"
    ],
    correct: 1, // Piña
    trivia: "La técnica del trompo giratorio vertical fue introducida en México por inmigrantes libaneses en el estado de Puebla, adaptando el shawarma a la carne de cerdo con achiote."
  },
  {
    id: 17,
    country: "Colombia",
    flag: "🇨🇴",
    dish: "Ajiaco Santafereño",
    question: "¿Qué hierba aromática silvestre es el secreto imprescindible que le da su sabor único al Ajiaco de Bogotá?",
    options: [
      "El cilantro cimarrón",
      "Las guascas",
      "La albahaca morada",
      "El epazote"
    ],
    correct: 1, // Las guascas
    trivia: "El ajiaco santafereño combina tres tipos de papa (criolla, pastusa y sabanera) que al deshacerse logran una textura espesa y reconfortante."
  },
  {
    id: 18,
    country: "Venezuela",
    flag: "🇻🇪",
    dish: "Tequeños",
    question: "¿Cómo se llama el pasapalo o entremés frito venezolano relleno de queso blanco que nunca puede faltar en una celebración?",
    options: [
      "Empanaditas de cazón",
      "Mandocas",
      "Tequeños",
      "Tostones rellenos"
    ],
    correct: 2, // Tequeños
    trivia: "En Venezuela existe el dicho popular: 'Fiesta sin tequeños no es fiesta'. Son originarios de la ciudad de Los Teques, en el estado Miranda."
  },
  {
    id: 19,
    country: "El Salvador",
    flag: "🇸🇻",
    dish: "Pupusas Salvadoreñas",
    question: "¿Cuál es el plato nacional de El Salvador hecho con masa gruesa de maíz o arroz rellena de queso, frijoles o chicharrón?",
    options: [
      "Las Arepas",
      "Las Pupusas",
      "Las Gorditas",
      "Las Enchiladas"
    ],
    correct: 1, // Las Pupusas
    trivia: "Las pupusas se comen tradicionalmente con las manos y se acompañan obligatoriamente de 'curtido' (repollo fermentado en vinagre) y salsa de tomate casera."
  },
  {
    id: 20,
    country: "Argentina / Uruguay",
    flag: "🧉",
    dish: "El Mate",
    question: "¿Cómo se llama el tubo metálico con filtro que se usa para beber la infusión de Mate?",
    options: [
      "Pajilla de plata",
      "Bombilla",
      "Pipeta criolla",
      "Cucharilla"
    ],
    correct: 1, // Bombilla
    trivia: "Compartir un mate es un acto de fraternidad; según la etiqueta del mate, solo se dice 'gracias' cuando ya no deseas que te sigan sirviendo más rondas."
  },
  {
    id: 21,
    country: "Guatemala",
    flag: "🇬🇹",
    dish: "Pepián Guatemalteco",
    question: "¿Qué plato espeso y aromático, Patrimonio Cultural Intangible de Guatemala, se elabora con semillas tostadas de calabaza (pepitoria) y chiles?",
    options: [
      "El Pepián",
      "El Tapado",
      "El Chuchito",
      "El Jocón verde"
    ],
    correct: 0, // El Pepián
    trivia: "El Pepián es una receta de origen maya-kaqchikel que fusiona ingredientes prehispánicos con carnes y especias introducidas durante la época colonial."
  },
  {
    id: 22,
    country: "Costa Rica / Nicaragua",
    flag: "🇨🇷",
    dish: "Gallo Pinto",
    question: "¿Qué dos ingredientes principales componen el tradicional 'Gallo Pinto' centroamericano?",
    options: [
      "Maíz tostado y queso frito",
      "Arroz y frijoles negros o rojos salteados",
      "Yuca cocida y carne mechada",
      "Plátano maduro y garbanzos"
    ],
    correct: 1, // Arroz y frijoles
    trivia: "En Costa Rica suele condimentarse con la famosa 'Salsa Lizano', y se consume fundamentalmente en el desayuno acompañado de natilla, huevo y plátano frito."
  },
  {
    id: 23,
    country: "Ecuador",
    flag: "🇪🇨",
    dish: "Encebollado Ecuatoriano",
    question: "¿Qué pescado es la estrella de la sopa caliente marinera llamada Encebollado en la costa ecuatoriana?",
    options: [
      "Salmón rosado",
      "Albacora (atún)",
      "Trucha de río",
      "Bacalao seco"
    ],
    correct: 1, // Albacora
    trivia: "El Encebollado está considerado uno de los mejores caldos de pescado del mundo por rankings internacionales y es el remedio predilecto de los ecuatorianos tras una fiesta."
  },
  {
    id: 24,
    country: "Bolivia",
    flag: "🇧🇴",
    dish: "Salteñas Bolivianas",
    question: "¿Qué característica especial distingue a las famosas empanadas bolivianas llamadas 'Salteñas'?",
    options: [
      "Son dulces y rellenas de fruta",
      "Tienen un relleno muy jugoso y caldo en su interior",
      "Se comen siempre crudas",
      "Tienen forma triangular plana"
    ],
    correct: 1, // Relleno jugoso y caldo
    trivia: "Comer una salteña sin derramar ni una sola gota de su delicioso caldo interior es considerado un verdadero arte entre los bolivianos."
  },
  {
    id: 25,
    country: "España",
    flag: "🇪🇸",
    dish: "Churros con Chocolate",
    question: "¿Con qué bebida espesa y reconfortante es costumbre sumergir los churros en las mañanas madrileñas?",
    options: [
      "Horchata fría de chufa",
      "Chocolate caliente espeso",
      "Zumo de naranja sanguina",
      "Vino tinto especiado"
    ],
    correct: 1, // Chocolate caliente espeso
    trivia: "La chocolatería San Ginés en Madrid lleva sirviendo churros y porras con chocolate caliente ininterrumpidamente desde el año 1894."
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
