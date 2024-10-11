import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Heart,
  Star,
  Sparkles,
  Coffee,
  Music,
  Camera,
  Plane,
  Gift,
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const iconMap = [
  Heart,
  Star,
  Sparkles,
  Coffee,
  Music,
  Camera,
  Plane,
  Gift,
];
