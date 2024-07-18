import { Hotel } from "./hotel.interface";

export interface Service{
    id: number;
    nombre: string;
    descripcion:string;
    hoteles: Hotel[];
}