/**
 * Full menu of Restaurant Rio (Encamp, Andorra), localized ca/es/fr/en.
 * Prices in euros. Tags: "veggie" | "hot" | "house".
 */
import type { Localized } from "./i18n";

export type DishTag = "veggie" | "hot" | "house";

export type Dish = {
  name: Localized;
  desc: Localized;
  price: string;
  tag?: DishTag;
};

export type MenuCategory = {
  id: string;
  label: Localized;
  dishes: Dish[];
};

export const MENU: MenuCategory[] = [
  {
    id: "tapes",
    label: { ca: "Entrants & Tapes", es: "Entrantes & Tapas", fr: "Entrées & Tapas", en: "Starters & Tapas" },
    dishes: [
      {
        name: { ca: "Patates braves", es: "Patatas bravas", fr: "Pommes de terre bravas", en: "Patatas bravas" },
        desc: {
          ca: "Patates fregides amb salsa brava casolana.",
          es: "Patatas fritas con salsa brava casera.",
          fr: "Pommes de terre frites à la sauce brava maison.",
          en: "Fried potatoes with homemade brava sauce.",
        },
        price: "7,00",
      },
      {
        name: { ca: "Aletes de pollastre", es: "Alitas de pollo", fr: "Ailes de poulet", en: "Chicken wings" },
        desc: {
          ca: "Aletes marinades i cuites, cruixents i saboroses.",
          es: "Alitas marinadas y cocinadas, crujientes y sabrosas.",
          fr: "Ailes marinées et cuites, croustillantes et savoureuses.",
          en: "Marinated wings, crispy and full of flavour.",
        },
        price: "8,50",
      },
      {
        name: { ca: "Chipirons a la planxa", es: "Chipirones a la plancha", fr: "Chipirons grillés", en: "Grilled baby squid" },
        desc: {
          ca: "Chipirons frescos a la planxa amb all i julivert.",
          es: "Chipirones frescos a la plancha con ajo y perejil.",
          fr: "Chipirons frais à la plancha, ail et persil.",
          en: "Fresh baby squid a la plancha with garlic and parsley.",
        },
        price: "12,00",
      },
      {
        name: { ca: "Sèpia a la planxa", es: "Sepia a la plancha", fr: "Seiche grillée", en: "Grilled cuttlefish" },
        desc: {
          ca: "Sèpia fresca a la planxa, all, julivert i oli d'oliva.",
          es: "Sepia fresca a la plancha, ajo, perejil y aceite de oliva.",
          fr: "Seiche fraîche à la plancha, ail, persil et huile d'olive.",
          en: "Fresh cuttlefish a la plancha with garlic, parsley and olive oil.",
        },
        price: "14,50",
      },
      {
        name: { ca: "Brotxeta de pollastre", es: "Pincho de pollo", fr: "Brochette de poulet", en: "Chicken skewer" },
        desc: {
          ca: "Brotxeta de pollastre marinada a la planxa.",
          es: "Brocheta de pollo marinado a la plancha.",
          fr: "Brochette de poulet mariné à la plancha.",
          en: "Marinated chicken skewer a la plancha.",
        },
        price: "6,50",
      },
      {
        name: { ca: "Brotxeta de vedella", es: "Pincho de ternera", fr: "Brochette de bœuf", en: "Beef skewer" },
        desc: {
          ca: "Brotxeta de vedella halal a la planxa.",
          es: "Brocheta de ternera halal a la plancha.",
          fr: "Brochette de bœuf halal à la plancha.",
          en: "Halal beef skewer a la plancha.",
        },
        price: "7,50",
      },
      {
        name: { ca: "Brotxeta de xai", es: "Pincho de cordero", fr: "Brochette d'agneau", en: "Lamb skewer" },
        desc: {
          ca: "Brotxeta de xai especiada a la planxa.",
          es: "Brocheta de cordero especiado a la plancha.",
          fr: "Brochette d'agneau épicée à la plancha.",
          en: "Spiced lamb skewer a la plancha.",
        },
        price: "15,00",
      },
    ],
  },
  {
    id: "marroc",
    label: { ca: "Marroc", es: "Marruecos", fr: "Maroc", en: "Morocco" },
    dishes: [
      {
        name: { ca: "Harira", es: "Harira", fr: "Harira", en: "Harira" },
        desc: {
          ca: "Sopa tradicional del Marroc amb llenties, cigrons, tomàquet i espècies.",
          es: "Sopa tradicional de Marruecos con lentejas, garbanzos, tomate y especias.",
          fr: "Soupe traditionnelle du Maroc aux lentilles, pois chiches, tomate et épices.",
          en: "Traditional Moroccan soup with lentils, chickpeas, tomato and spices.",
        },
        price: "5,50",
      },
      {
        name: { ca: "Tajín de pollastre i verdures", es: "Tajín de pollo y verduras", fr: "Tajine de poulet aux légumes", en: "Chicken and vegetable tagine" },
        desc: {
          ca: "Tajín de pollastre amb verdures de temporada i espècies del Marroc.",
          es: "Tajín de pollo con verduras de temporada y especias marroquíes.",
          fr: "Tajine de poulet avec légumes de saison et épices du Maroc.",
          en: "Chicken tagine with seasonal vegetables and Moroccan spices.",
        },
        price: "15,00",
      },
      {
        name: { ca: "Tajín de pollastre amb llimona", es: "Tajín de pollo con limón", fr: "Tajine de poulet au citron", en: "Chicken tagine with lemon" },
        desc: {
          ca: "Pollastre amb llimona confitada, olives verdes i safrà.",
          es: "Pollo con limón confitado, aceitunas verdes y azafrán.",
          fr: "Poulet au citron confit, olives vertes et safran.",
          en: "Chicken with preserved lemon, green olives and saffron.",
        },
        price: "15,00",
      },
      {
        name: {
          ca: "Tajín de vedella amb prunes i ametlles",
          es: "Tajín de ternera con ciruelas y almendras",
          fr: "Tajine de bœuf aux pruneaux et amandes",
          en: "Beef tagine with prunes and almonds",
        },
        desc: {
          ca: "Vedella cuita lentament amb verdures, prunes seques i ametlles torrades.",
          es: "Ternera cocinada lentamente con verduras, ciruelas pasas y almendras tostadas.",
          fr: "Bœuf mijoté avec légumes, pruneaux et amandes torréfiées.",
          en: "Slow-cooked beef with vegetables, prunes and toasted almonds.",
        },
        price: "15,00",
      },
      {
        name: { ca: "Tajín de carn picada amb ou", es: "Tajín de carne picada con huevo", fr: "Tajine de viande hachée à l'œuf", en: "Minced meat tagine with egg" },
        desc: {
          ca: "Carn picada especiada cuita amb ou en tajín de fang.",
          es: "Carne picada especiada cocinada con huevo en tajine de barro.",
          fr: "Viande hachée épicée cuite avec œuf dans un tajine en terre cuite.",
          en: "Spiced minced meat cooked with egg in a clay tagine.",
        },
        price: "18,00",
      },
      {
        name: { ca: "Tajín de carn picada de xai", es: "Tajín de carne picada de cordero", fr: "Tajine de viande d'agneau hachée", en: "Minced lamb tagine" },
        desc: {
          ca: "Carn picada de xai especiada, cuita en tajín de fang tradicional.",
          es: "Carne picada de cordero especiada, cocinada en tajine de barro tradicional.",
          fr: "Viande d'agneau hachée épicée, cuite dans un tajine en terre cuite traditionnel.",
          en: "Spiced minced lamb cooked in a traditional clay tagine.",
        },
        price: "18,00",
      },
      {
        name: { ca: "Cuscús", es: "Cuscús", fr: "Couscous", en: "Couscous" },
        desc: {
          ca: "Sémola amb xai, pollastre, merguez i verdures de temporada.",
          es: "Sémola con cordero, pollo, merguez y verduras de temporada.",
          fr: "Semoule à l'agneau, poulet, merguez et légumes de saison.",
          en: "Semolina with lamb, chicken, merguez and seasonal vegetables.",
        },
        price: "17,00",
        tag: "house",
      },
    ],
  },
  {
    id: "pizzes",
    label: { ca: "Pizzes", es: "Pizzas", fr: "Pizzas", en: "Pizzas" },
    dishes: [
      {
        name: { ca: "Margarita", es: "Margarita", fr: "Margherita", en: "Margherita" },
        desc: {
          ca: "Tomata, mozzarella, orenga.",
          es: "Tomate, mozzarella, orégano.",
          fr: "Tomate, mozzarella, origan.",
          en: "Tomato, mozzarella, oregano.",
        },
        price: "9,50",
        tag: "veggie",
      },
      {
        name: { ca: "Prima", es: "Prima", fr: "Prima", en: "Prima" },
        desc: {
          ca: "Tomata, mozzarella, pebrot dolç, alvocat, orenga.",
          es: "Tomate, mozzarella, pimiento dulce, aguacate, orégano.",
          fr: "Tomate, mozzarella, poivron doux, avocat, origan.",
          en: "Tomato, mozzarella, sweet pepper, avocado, oregano.",
        },
        price: "9,50",
        tag: "veggie",
      },
      {
        name: { ca: "Napolitana", es: "Napolitana", fr: "Napolitaine", en: "Napolitana" },
        desc: {
          ca: "Tomata, mozzarella, anxoves, orenga.",
          es: "Tomate, mozzarella, anchoas, orégano.",
          fr: "Tomate, mozzarella, anchois, origan.",
          en: "Tomato, mozzarella, anchovies, oregano.",
        },
        price: "13,50",
      },
      {
        name: { ca: "6 Estacions", es: "6 Estaciones", fr: "6 Saisons", en: "6 Seasons" },
        desc: {
          ca: "Tomata, mozzarella, verdures de temporada, orenga.",
          es: "Tomate, mozzarella, verduras de temporada, orégano.",
          fr: "Tomate, mozzarella, légumes de saison, origan.",
          en: "Tomato, mozzarella, seasonal vegetables, oregano.",
        },
        price: "13,50",
        tag: "veggie",
      },
      {
        name: { ca: "Formatge de cabra", es: "Queso de cabra", fr: "Fromage de chèvre", en: "Goat cheese" },
        desc: {
          ca: "Tomàquets, mozzarella, ceba, xampinyons, formatge de cabra.",
          es: "Tomates, mozzarella, cebolla, champiñones, queso de cabra.",
          fr: "Tomates, mozzarella, oignon, champignons, fromage de chèvre.",
          en: "Tomato, mozzarella, onion, mushrooms, goat cheese.",
        },
        price: "13,50",
        tag: "veggie",
      },
      {
        name: { ca: "Pizza Rio", es: "Pizza Rio", fr: "Pizza Rio", en: "Rio Pizza" },
        desc: {
          ca: "La nostra signatura: carn picada especiada, ceba caramel·litzada, olives kalamata i menta fresca.",
          es: "Nuestra firma: carne picada especiada, cebolla caramelizada, aceitunas kalamata y menta fresca.",
          fr: "Notre signature : viande hachée épicée, oignon caramélisé, olives kalamata et menthe fraîche.",
          en: "Our signature: spiced minced meat, caramelised onion, kalamata olives and fresh mint.",
        },
        price: "13,00",
        tag: "house",
      },
      {
        name: { ca: "Tropical", es: "Tropical", fr: "Tropicale", en: "Tropical" },
        desc: {
          ca: "Tomata, mozzarella, pinya, poma, pollastre, salsa de mel, taronja.",
          es: "Tomate, mozzarella, piña, manzana, pollo, salsa de miel, naranja.",
          fr: "Tomate, mozzarella, ananas, pomme, poulet, sauce au miel, orange.",
          en: "Tomato, mozzarella, pineapple, apple, chicken, honey sauce, orange.",
        },
        price: "15,50",
      },
      {
        name: { ca: "4 Formatges", es: "4 Quesos", fr: "4 Fromages", en: "4 Cheeses" },
        desc: {
          ca: "Tomata, mozzarella, Emmental, Brie, orenga.",
          es: "Tomate, mozzarella, Emmental, Brie, orégano.",
          fr: "Tomate, mozzarella, Emmental, Brie, origan.",
          en: "Tomato, mozzarella, Emmental, Brie, oregano.",
        },
        price: "18,50",
        tag: "veggie",
      },
      {
        name: { ca: "Mar i Muntanya", es: "Mar y Montaña", fr: "Mer et Montagne", en: "Surf & Turf" },
        desc: {
          ca: "Tomata, mozzarella, gamba, pernil dolç, salsitxa, orenga.",
          es: "Tomate, mozzarella, gamba, jamón dulce, salchicha, orégano.",
          fr: "Tomate, mozzarella, crevette, jambon doux, saucisse, origan.",
          en: "Tomato, mozzarella, prawn, cooked ham, sausage, oregano.",
        },
        price: "18,50",
      },
      {
        name: { ca: "Tex Mex", es: "Tex Mex", fr: "Tex Mex", en: "Tex Mex" },
        desc: {
          ca: "Tomata, mozzarella, bolonyesa, ceba, pebrots, blat de moro, orenga.",
          es: "Tomate, mozzarella, boloñesa, cebolla, pimientos, maíz, orégano.",
          fr: "Tomate, mozzarella, bolognaise, oignon, poivrons, maïs, origan.",
          en: "Tomato, mozzarella, bolognese, onion, peppers, sweetcorn, oregano.",
        },
        price: "18,50",
        tag: "hot",
      },
    ],
  },
  {
    id: "amanides",
    label: { ca: "Amanides", es: "Ensaladas", fr: "Salades", en: "Salads" },
    dishes: [
      {
        name: { ca: "Amanida de formatge de cabra", es: "Ensalada de queso de cabra", fr: "Salade au fromage de chèvre", en: "Goat cheese salad" },
        desc: {
          ca: "Rúcula, maduixes, nous, formatge de cabra i mel.",
          es: "Rúcula, fresas, nueces, queso de cabra y miel.",
          fr: "Roquette, fraises, noix, fromage de chèvre et miel.",
          en: "Rocket, strawberries, walnuts, goat cheese and honey.",
        },
        price: "11,00",
        tag: "veggie",
      },
      {
        name: { ca: "Amanida mixta", es: "Ensalada mixta", fr: "Salade mixte", en: "Mixed salad" },
        desc: {
          ca: "Enciam, tomàquet, ceba, pastanaga, olives i formatge Brie.",
          es: "Lechuga, tomate, cebolla, zanahoria, aceitunas y queso Brie.",
          fr: "Laitue, tomate, oignon, carotte, olives et fromage Brie.",
          en: "Lettuce, tomato, onion, carrot, olives and Brie cheese.",
        },
        price: "11,00",
        tag: "veggie",
      },
      {
        name: { ca: "Amanida Rio", es: "Ensalada Rio", fr: "Salade Rio", en: "Rio salad" },
        desc: {
          ca: "Enciam, tomàquet, tonyina, ceba, pastanaga, formatge Brie i salmó.",
          es: "Lechuga, tomate, atún, cebolla, zanahoria, queso Brie y salmón.",
          fr: "Laitue, tomate, thon, oignon, carotte, fromage Brie et saumon.",
          en: "Lettuce, tomato, tuna, onion, carrot, Brie cheese and salmon.",
        },
        price: "11,00",
        tag: "house",
      },
    ],
  },
  {
    id: "pastes",
    label: { ca: "Pastes", es: "Pastas", fr: "Pâtes", en: "Pasta" },
    dishes: [
      {
        name: { ca: "Lasanya de carn", es: "Lasaña de carne", fr: "Lasagne à la viande", en: "Meat lasagne" },
        desc: {
          ca: "Lasanya casolana amb carn de vedella halal i beixamel.",
          es: "Lasaña casera con carne de ternera halal y bechamel.",
          fr: "Lasagne maison à la viande de bœuf halal et béchamel.",
          en: "Homemade lasagne with halal beef and béchamel.",
        },
        price: "10,50",
      },
      {
        name: { ca: "Espaguetis bolonyesa", es: "Espaguetis boloñesa", fr: "Spaghetti bolognaise", en: "Spaghetti bolognese" },
        desc: {
          ca: "Espaguetis amb salsa bolonyesa de vedella halal cuita a foc lent.",
          es: "Espaguetis con salsa boloñesa de ternera halal cocinada a fuego lento.",
          fr: "Spaghetti à la sauce bolognaise de bœuf halal mijotée.",
          en: "Spaghetti with slow-cooked halal beef bolognese.",
        },
        price: "10,50",
      },
      {
        name: { ca: "Tallarines a la carbonara", es: "Tallarines a la carbonara", fr: "Tagliatelles à la carbonara", en: "Tagliatelle carbonara" },
        desc: {
          ca: "Tallarines amb salsa cremosa d'ou, vedella halal i parmesà.",
          es: "Tallarines con salsa cremosa de huevo, ternera halal y parmesano.",
          fr: "Tagliatelles à la sauce crémeuse aux œufs, bœuf halal et parmesan.",
          en: "Tagliatelle in a creamy egg sauce with halal beef and parmesan.",
        },
        price: "10,50",
      },
    ],
  },
  {
    id: "peix",
    label: { ca: "Peix", es: "Pescado", fr: "Poisson", en: "Fish" },
    dishes: [
      {
        name: { ca: "Daurada", es: "Dorada", fr: "Daurade", en: "Sea bream" },
        desc: {
          ca: "Daurada fresca a la planxa o al forn, amb all i julivert.",
          es: "Dorada fresca a la plancha o al horno, con ajo y perejil.",
          fr: "Daurade fraîche à la plancha ou au four, ail et persil.",
          en: "Fresh sea bream grilled or oven-baked, with garlic and parsley.",
        },
        price: "18,00",
      },
      {
        name: { ca: "Llobarro", es: "Lubina", fr: "Bar", en: "Sea bass" },
        desc: {
          ca: "Llobarro fresc a la planxa amb all i julivert.",
          es: "Lubina fresca a la plancha con ajo y perejil.",
          fr: "Bar frais à la plancha, ail et persil.",
          en: "Fresh sea bass a la plancha with garlic and parsley.",
        },
        price: "16,00",
      },
      {
        name: { ca: "Salmó", es: "Salmón", fr: "Saumon", en: "Salmon" },
        desc: {
          ca: "Filet de salmó a la planxa amb salsa de llimona.",
          es: "Filete de salmón a la plancha con salsa de limón.",
          fr: "Filet de saumon à la plancha avec sauce citron.",
          en: "Grilled salmon fillet with lemon sauce.",
        },
        price: "16,00",
      },
    ],
  },
  {
    id: "brasa",
    label: { ca: "Carns a la brasa", es: "Carnes a la brasa", fr: "Viandes braisées", en: "Grilled meats" },
    dishes: [
      {
        name: { ca: "Brotxeta de pollastre", es: "Pincho de pollo", fr: "Brochette de poulet", en: "Chicken skewer" },
        desc: {
          ca: "Brotxeta de pollastre marinada a la brasa.",
          es: "Brocheta de pollo marinado a la brasa.",
          fr: "Brochette de poulet mariné aux braises.",
          en: "Marinated chicken skewer over embers.",
        },
        price: "14,00",
      },
      {
        name: { ca: "Brotxeta de vedella", es: "Pincho de ternera", fr: "Brochette de veau", en: "Beef skewer" },
        desc: {
          ca: "Brotxeta de vedella halal a la brasa.",
          es: "Brocheta de ternera halal a la brasa.",
          fr: "Brochette de veau halal aux braises.",
          en: "Halal beef skewer over embers.",
        },
        price: "16,00",
      },
      {
        name: { ca: "Brotxeta de xai", es: "Pincho de cordero", fr: "Brochette d'agneau", en: "Lamb skewer" },
        desc: {
          ca: "Brotxeta de xai especiada a la brasa.",
          es: "Brocheta de cordero especiado a la brasa.",
          fr: "Brochette d'agneau épicée aux braises.",
          en: "Spiced lamb skewer over embers.",
        },
        price: "19,00",
      },
      {
        name: { ca: "Entrecot 400 g", es: "Entrecot 400 g", fr: "Entrecôte 400 g", en: "Ribeye 400 g" },
        desc: {
          ca: "Entrecot de vedella a la brasa, 400 g.",
          es: "Entrecot de ternera a la brasa, 400 g.",
          fr: "Entrecôte de bœuf aux braises, 400 g.",
          en: "Grilled beef ribeye, 400 g.",
        },
        price: "27,00",
        tag: "house",
      },
      {
        name: { ca: "Pits de pollastre", es: "Pechugas de pollo", fr: "Blancs de poulet", en: "Chicken breast" },
        desc: {
          ca: "Pits de pollastre a la brasa, marinats amb espècies.",
          es: "Pechugas de pollo a la brasa, marinadas con especias.",
          fr: "Blancs de poulet aux braises, marinés aux épices.",
          en: "Grilled chicken breast marinated in spices.",
        },
        price: "14,50",
      },
      {
        name: { ca: "Entranya", es: "Entraña", fr: "Hampe de bœuf", en: "Skirt steak" },
        desc: {
          ca: "Tall de vedella argentina a la brasa, jugós i saborós.",
          es: "Corte de ternera argentina a la brasa, jugoso y sabroso.",
          fr: "Coupe de bœuf argentin aux braises, juteuse et savoureuse.",
          en: "Argentine beef cut over embers, juicy and flavourful.",
        },
        price: "20,00",
      },
      {
        name: { ca: "Costella de xai", es: "Costilla de cordero", fr: "Côtelette d'agneau", en: "Lamb chops" },
        desc: {
          ca: "Costelles de xai a la brasa, marinades amb espècies marroquines.",
          es: "Costillas de cordero a la brasa, marinadas con especias marroquíes.",
          fr: "Côtelettes d'agneau aux braises, marinées aux épices marocaines.",
          en: "Grilled lamb chops marinated in Moroccan spices.",
        },
        price: "20,00",
      },
      {
        name: { ca: "Churrasco de vedella argentina", es: "Churrasco de ternera argentino", fr: "Churrasco de bœuf argentin", en: "Argentine churrasco" },
        desc: {
          ca: "Costelles de vedella argentina a la brasa.",
          es: "Costillas de ternera argentina a la brasa.",
          fr: "Côtes de bœuf argentin aux braises.",
          en: "Argentine beef ribs over embers.",
        },
        price: "20,00",
      },
      {
        name: { ca: "Hamburguesa", es: "Hamburguesa", fr: "Hamburger", en: "Burger" },
        desc: {
          ca: "Carn de vedella halal, tomàquet, enciam, formatge Cheddar.",
          es: "Carne de ternera halal, tomate, lechuga, queso Cheddar.",
          fr: "Viande de bœuf halal, tomate, laitue, fromage Cheddar.",
          en: "Halal beef, tomato, lettuce, Cheddar cheese.",
        },
        price: "15,00",
      },
      {
        name: { ca: "Hamburguesa doble", es: "Hamburguesa doble", fr: "Double hamburger", en: "Double burger" },
        desc: {
          ca: "Doble de carn de vedella halal amb tots els ingredients.",
          es: "Doble de carne de ternera halal con todos los ingredientes.",
          fr: "Double viande de bœuf halal avec tous les ingrédients.",
          en: "Double halal beef with all the toppings.",
        },
        price: "20,00",
      },
    ],
  },
  {
    id: "postres",
    label: { ca: "Postres", es: "Postres", fr: "Desserts", en: "Desserts" },
    dishes: [
      {
        name: { ca: "Gelat", es: "Helado", fr: "Glace", en: "Ice cream" },
        desc: {
          ca: "Copa de gelat artesà de temporada.",
          es: "Copa de helado artesano de temporada.",
          fr: "Coupe de glace artisanale de saison.",
          en: "Seasonal artisan ice cream cup.",
        },
        price: "5,90",
      },
      {
        name: { ca: "Flam amb nata i caramel", es: "Flan con nata y caramelo", fr: "Flan crème et caramel", en: "Crème caramel" },
        desc: {
          ca: "Flam casolà amb nata muntada i caramel.",
          es: "Flan casero con nata montada y caramelo.",
          fr: "Flan maison avec crème fouettée et caramel.",
          en: "Homemade flan with whipped cream and caramel.",
        },
        price: "4,00",
      },
      {
        name: { ca: "Batut d'alvocat amb plàtan", es: "Batido de aguacate con plátano", fr: "Milkshake avocat-banane", en: "Avocado and banana shake" },
        desc: {
          ca: "Batut cremós d'alvocat i plàtan, natural i refrescant.",
          es: "Batido cremoso de aguacate y plátano, natural y refrescante.",
          fr: "Milkshake crémeux à l'avocat et à la banane, naturel et rafraîchissant.",
          en: "Creamy avocado and banana shake, natural and refreshing.",
        },
        price: "6,00",
      },
      {
        name: { ca: "Copa Magnum", es: "Copa Magnum", fr: "Coupe Magnum", en: "Magnum cup" },
        desc: {
          ca: "Copa de gelat Magnum petita.",
          es: "Copa de helado Magnum pequeña.",
          fr: "Coupe de glace Magnum petite.",
          en: "Small Magnum ice cream cup.",
        },
        price: "2,00",
      },
      {
        name: { ca: "Copa Magnum midi", es: "Copa Magnum mediana", fr: "Coupe Magnum moyenne", en: "Magnum cup midi" },
        desc: {
          ca: "Copa de gelat Magnum de mida mitjana.",
          es: "Copa de helado Magnum de tamaño mediano.",
          fr: "Coupe de glace Magnum taille moyenne.",
          en: "Medium Magnum ice cream cup.",
        },
        price: "3,00",
      },
      {
        name: { ca: "Bammat", es: "Bammat", fr: "Bammat", en: "Bammat" },
        desc: {
          ca: "Triangle de pasta de full farcit d'ametlles i mel. Dolç marroquí tradicional.",
          es: "Triángulo de hojaldre relleno de almendras y miel. Dulce marroquí tradicional.",
          fr: "Triangle de pâte feuilletée farci aux amandes et au miel. Douceur marocaine traditionnelle.",
          en: "Puff pastry triangle filled with almonds and honey. A traditional Moroccan sweet.",
        },
        price: "2,60",
        tag: "house",
      },
    ],
  },
];
