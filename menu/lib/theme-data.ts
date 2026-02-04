// Theme definitions and configurations
export interface Theme {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  isFree: boolean;
  navPosition: "top" | "bottom" | "sidebar";
  gradient: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

export const themes: Theme[] = [
  {
    id: "royal",
    name: "Royal Theme",
    nameAr: "قالب رويال",
    price: 95,
    isFree: false,
    navPosition: "top",
    gradient: "linear-gradient(135deg, #1e3a20 0%, #2d5a2d 100%)",
    primaryColor: "#2d5a2d",
    secondaryColor: "#1e3a20",
    accentColor: "#d4af37",
    backgroundColor: "#f5f5f0",
    textColor: "#1a1a1a",
  },
  {
    id: "apex",
    name: "Apex Theme",
    nameAr: "قالب أبكس",
    price: 150,
    isFree: false,
    navPosition: "bottom",
    gradient: "linear-gradient(135deg, #3d2817 0%, #5a3d1f 100%)",
    primaryColor: "#5a3d1f",
    secondaryColor: "#3d2817",
    accentColor: "#ff6b35",
    backgroundColor: "#faf8f5",
    textColor: "#2c2c2c",
  },
  {
    id: "nobel",
    name: "Nobel Theme",
    nameAr: "قالب نوبل",
    price: 200,
    isFree: true,
    navPosition: "sidebar",
    gradient: "linear-gradient(135deg, #1a1a3e 0%, #2d2d5f 100%)",
    primaryColor: "#2d2d5f",
    secondaryColor: "#1a1a3e",
    accentColor: "#4a90e2",
    backgroundColor: "#f8f9fa",
    textColor: "#212529",
  },
  {
    id: "classic",
    name: "Classic Theme",
    nameAr: "قالب كلاسيك",
    price: 120,
    isFree: false,
    navPosition: "top",
    gradient: "linear-gradient(135deg, #2d1810 0%, #4a2818 100%)",
    primaryColor: "#4a2818",
    secondaryColor: "#2d1810",
    accentColor: "#c9a961",
    backgroundColor: "#fff8f0",
    textColor: "#3e2723",
  },
  {
    id: "prime",
    name: "Prime Theme",
    nameAr: "قالب برايم",
    price: 180,
    isFree: false,
    navPosition: "bottom",
    gradient: "linear-gradient(135deg, #1a1a3e 0%, #2d2d5f 100%)",
    primaryColor: "#2d2d5f",
    secondaryColor: "#1a1a3e",
    accentColor: "#9b59b6",
    backgroundColor: "#f4f4f8",
    textColor: "#1a1a1a",
  },
  {
    id: "grand",
    name: "Grand Theme",
    nameAr: "قالب جراند",
    price: 250,
    isFree: false,
    navPosition: "sidebar",
    gradient: "linear-gradient(135deg, #2d1a2d 0%, #4a2d4a 100%)",
    primaryColor: "#4a2d4a",
    secondaryColor: "#2d1a2d",
    accentColor: "#e91e63",
    backgroundColor: "#fef5f8",
    textColor: "#2c2c2c",
  },
];

export const getThemeById = (id: string): Theme | undefined => {
  return themes.find((theme) => theme.id === id);
};
