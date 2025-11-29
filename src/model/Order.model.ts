import { Item } from "./item.model";
export interface Order {  
    getItem(): Item;
    getPrice(): number;
    getQunatity(): number;
    getId(): string;
}