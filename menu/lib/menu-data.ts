// Menu data structure for database storage and preview

export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  category: string;
  image: string;
  isOnSale: boolean;
  salePercentage?: number;
  ingredients: string[];
}

export interface MenuCategory {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  order: number;
}

export const menuCategories: MenuCategory[] = [
  { id: "offers", nameAr: "عروض", nameEn: "Offers", icon: "🎁", order: 1 },
  { id: "appetizers", nameAr: "مقبلات", nameEn: "Appetizers", icon: "🥗", order: 2 },
  { id: "burgers", nameAr: "برجر", nameEn: "Burgers", icon: "🍔", order: 3 },
  { id: "chicken", nameAr: "دجاج", nameEn: "Chicken", icon: "🍗", order: 4 },
  { id: "pizza", nameAr: "بيتزا", nameEn: "Pizza", icon: "🍕", order: 5 },
  { id: "sandwiches", nameAr: "ساندويتشات", nameEn: "Sandwiches", icon: "🥪", order: 6 },
  { id: "salads", nameAr: "سلطات", nameEn: "Salads", icon: "🥗", order: 7 },
  { id: "desserts", nameAr: "حلويات", nameEn: "Desserts", icon: "🍰", order: 8 },
  { id: "drinks", nameAr: "مشروبات", nameEn: "Drinks", icon: "🥤", order: 9 },
];

export const menuItems: MenuItem[] = [
  // Offers
  {
    id: "offer-1",
    nameAr: "عرض فاميلي",
    nameEn: "Family Offer",
    descriptionAr: "برجر + بطاطس + بيبسي",
    descriptionEn: "Burger + Fries + Pepsi",
    price: 260.0,
    category: "offers",
    image: "🍔",
    isOnSale: true,
    salePercentage: 30,
    ingredients: ["برجر", "بطاطس", "بيبسي"],
  },
  {
    id: "offer-2",
    nameAr: "عرض كومبو",
    nameEn: "Combo Offer",
    descriptionAr: "برجر + بطاطس + مشروب",
    descriptionEn: "Burger + Fries + Drink",
    price: 180.0,
    category: "offers",
    image: "🍔",
    isOnSale: true,
    salePercentage: 25,
    ingredients: ["برجر", "بطاطس", "مشروب"],
  },

  // Burgers
  {
    id: "burger-1",
    nameAr: "برجر كلاسيك",
    nameEn: "Classic Burger",
    descriptionAr: "لحم بقري + خس + طماطم + صوص خاص",
    descriptionEn: "Beef + Lettuce + Tomato + Special Sauce",
    price: 160.0,
    category: "burgers",
    image: "🍔",
    isOnSale: false,
    ingredients: ["لحم بقري", "خس", "طماطم", "صوص"],
  },
  {
    id: "burger-2",
    nameAr: "برجر دبل",
    nameEn: "Double Burger",
    descriptionAr: "لحم بقري مضاعف + جبن + خضار",
    descriptionEn: "Double Beef + Cheese + Vegetables",
    price: 220.0,
    category: "burgers",
    image: "🍔",
    isOnSale: false,
    ingredients: ["لحم بقري", "جبن", "خضار"],
  },
  {
    id: "burger-3",
    nameAr: "برجر دجاج",
    nameEn: "Chicken Burger",
    descriptionAr: "دجاج مقلي + خس + مايونيز",
    descriptionEn: "Fried Chicken + Lettuce + Mayo",
    price: 140.0,
    category: "burgers",
    image: "🍔",
    isOnSale: false,
    ingredients: ["دجاج", "خس", "مايونيز"],
  },

  // Chicken
  {
    id: "chicken-1",
    nameAr: "دجاج مقلي",
    nameEn: "Fried Chicken",
    descriptionAr: "قطع دجاج مقرمشة + صوص",
    descriptionEn: "Crispy Chicken Pieces + Sauce",
    price: 110.0,
    category: "chicken",
    image: "🍗",
    isOnSale: true,
    salePercentage: 15,
    ingredients: ["دجاج", "بقسماط", "توابل"],
  },
  {
    id: "chicken-2",
    nameAr: "أجنحة دجاج",
    nameEn: "Chicken Wings",
    descriptionAr: "أجنحة دجاج حارة + صوص رانش",
    descriptionEn: "Spicy Wings + Ranch Sauce",
    price: 95.0,
    category: "chicken",
    image: "🍗",
    isOnSale: false,
    ingredients: ["أجنحة", "صوص حار", "رانش"],
  },
  {
    id: "chicken-3",
    nameAr: "ناجتس دجاج",
    nameEn: "Chicken Nuggets",
    descriptionAr: "قطع دجاج صغيرة مقرمشة",
    descriptionEn: "Crispy Chicken Nuggets",
    price: 75.0,
    category: "chicken",
    image: "🍗",
    isOnSale: false,
    ingredients: ["دجاج", "بقسماط"],
  },

  // Pizza
  {
    id: "pizza-1",
    nameAr: "بيتزا مارجريتا",
    nameEn: "Margherita Pizza",
    descriptionAr: "صوص طماطم + جبن موتزاريلا + ريحان",
    descriptionEn: "Tomato Sauce + Mozzarella + Basil",
    price: 180.0,
    category: "pizza",
    image: "🍕",
    isOnSale: false,
    ingredients: ["صوص طماطم", "جبن", "ريحان"],
  },
  {
    id: "pizza-2",
    nameAr: "بيتزا بيبروني",
    nameEn: "Pepperoni Pizza",
    descriptionAr: "بيبروني + جبن + زيتون",
    descriptionEn: "Pepperoni + Cheese + Olives",
    price: 220.0,
    category: "pizza",
    image: "🍕",
    isOnSale: false,
    ingredients: ["بيبروني", "جبن", "زيتون"],
  },
  {
    id: "pizza-3",
    nameAr: "بيتزا مشكلة",
    nameEn: "Mixed Pizza",
    descriptionAr: "لحم + دجاج + خضار + جبن",
    descriptionEn: "Meat + Chicken + Vegetables + Cheese",
    price: 250.0,
    category: "pizza",
    image: "🍕",
    isOnSale: true,
    salePercentage: 20,
    ingredients: ["لحم", "دجاج", "خضار", "جبن"],
  },

  // Appetizers
  {
    id: "app-1",
    nameAr: "بطاطس مقلية",
    nameEn: "French Fries",
    descriptionAr: "بطاطس مقرمشة + ملح",
    descriptionEn: "Crispy Fries + Salt",
    price: 45.0,
    category: "appetizers",
    image: "🍟",
    isOnSale: false,
    ingredients: ["بطاطس", "ملح"],
  },
  {
    id: "app-2",
    nameAr: "حلقات البصل",
    nameEn: "Onion Rings",
    descriptionAr: "حلقات بصل مقرمشة",
    descriptionEn: "Crispy Onion Rings",
    price: 55.0,
    category: "appetizers",
    image: "🧅",
    isOnSale: false,
    ingredients: ["بصل", "بقسماط"],
  },
  {
    id: "app-3",
    nameAr: "أصابع الموتزاريلا",
    nameEn: "Mozzarella Sticks",
    descriptionAr: "أصابع جبن موتزاريلا مقلية",
    descriptionEn: "Fried Mozzarella Sticks",
    price: 65.0,
    category: "appetizers",
    image: "🧀",
    isOnSale: false,
    ingredients: ["جبن موتزاريلا", "بقسماط"],
  },

  // Salads
  {
    id: "salad-1",
    nameAr: "سلطة يونانية",
    nameEn: "Greek Salad",
    descriptionAr: "خس + طماطم + خيار + جبن فيتا + زيتون",
    descriptionEn: "Lettuce + Tomato + Cucumber + Feta + Olives",
    price: 85.0,
    category: "salads",
    image: "🥗",
    isOnSale: false,
    ingredients: ["خس", "طماطم", "خيار", "جبن فيتا", "زيتون"],
  },
  {
    id: "salad-2",
    nameAr: "سلطة سيزر",
    nameEn: "Caesar Salad",
    descriptionAr: "خس + دجاج + جبن بارميزان + صوص سيزر",
    descriptionEn: "Lettuce + Chicken + Parmesan + Caesar Sauce",
    price: 95.0,
    category: "salads",
    image: "🥗",
    isOnSale: false,
    ingredients: ["خس", "دجاج", "جبن", "صوص سيزر"],
  },

  // Drinks
  {
    id: "drink-1",
    nameAr: "بيبسي",
    nameEn: "Pepsi",
    descriptionAr: "مشروب غازي بارد",
    descriptionEn: "Cold Soft Drink",
    price: 15.0,
    category: "drinks",
    image: "🥤",
    isOnSale: false,
    ingredients: ["بيبسي"],
  },
  {
    id: "drink-2",
    nameAr: "عصير برتقال",
    nameEn: "Orange Juice",
    descriptionAr: "عصير برتقال طازج",
    descriptionEn: "Fresh Orange Juice",
    price: 25.0,
    category: "drinks",
    image: "🍊",
    isOnSale: false,
    ingredients: ["برتقال طازج"],
  },
  {
    id: "drink-3",
    nameAr: "ماء",
    nameEn: "Water",
    descriptionAr: "ماء معدني",
    descriptionEn: "Mineral Water",
    price: 10.0,
    category: "drinks",
    image: "💧",
    isOnSale: false,
    ingredients: ["ماء معدني"],
  },

  // Desserts
  {
    id: "dessert-1",
    nameAr: "آيس كريم",
    nameEn: "Ice Cream",
    descriptionAr: "آيس كريم بالفانيليا",
    descriptionEn: "Vanilla Ice Cream",
    price: 35.0,
    category: "desserts",
    image: "🍦",
    isOnSale: false,
    ingredients: ["حليب", "فانيليا", "سكر"],
  },
  {
    id: "dessert-2",
    nameAr: "كيك شوكولاتة",
    nameEn: "Chocolate Cake",
    descriptionAr: "كيك شوكولاتة غني",
    descriptionEn: "Rich Chocolate Cake",
    price: 45.0,
    category: "desserts",
    image: "🍰",
    isOnSale: false,
    ingredients: ["شوكولاتة", "دقيق", "سكر"],
  },
];

export const getItemsByCategory = (categoryId: string): MenuItem[] => {
  return menuItems.filter((item) => item.category === categoryId);
};

export const getOnSaleItems = (): MenuItem[] => {
  return menuItems.filter((item) => item.isOnSale);
};
