import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const COLORS_SERIES = [
  // generated using https://mokole.com/palette.html
  "#004528",
  "#006837",
  "#238443",
  "#41ab5d",
  "#78c679",
  "#addd8e",
  "#d9f0a3",
  "#f7fcb9",
  "#ffffe5",
  "#1F2C57",
  "#3C5A99",
  "#5B7EBB",
  "#7BA3E0",
  "#A5C8FF",
  "#EAB308",
  "#CA8A04",
  "#A16207",
  "#854D0E",
  "#713F12",
  "#623B2F",
  "#43381E",
  "#1E293B",
  "#374151",
  "#4B5563",
  "#9CA3AF",
  "#D1D5DB",
  "#E5E7EB",
  "#F3F4F6",
  "#F9FAFB",
  "#FAFAFA",
  "#FFFFFF",
];
