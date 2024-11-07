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

export function warningMsg(name, min, max){

  if(!min && max){
    return `Maximum length exceeded`
  }

  if(!max && min){
    return `Size of ${name} is too small`
  }
}

export function isValidUrl(l){
  try {
   new URL(l);
    return true;
  } catch (error) {
    return false;
  }
}