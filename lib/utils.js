import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formDate(date){
      return new Date(date).toLocaleDateString('pt-br', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
}
