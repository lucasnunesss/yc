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

export function formViews(view){
  if(view < 2){
    return `${view} view`
  } else {
    return `${view} views`
  }
}