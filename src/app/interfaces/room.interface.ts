import { Host } from "@angular/core";
import { Hotel } from "./hotel.interface";

export interface Room {
    id: number;
    idHotel: number;
    numero: string;
    tipo: string;
    precioNoche: number;
    huespedes: Host[];
    hotel: Hotel;
}