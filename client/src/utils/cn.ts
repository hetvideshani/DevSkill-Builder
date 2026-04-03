import  {twMerge} from 'tailwind-merge';
import {clsx, ClassValue} from 'clsx';

export default function cn(...classes: string[]) {
    return twMerge(clsx(...classes));
}


export function cn_class(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
