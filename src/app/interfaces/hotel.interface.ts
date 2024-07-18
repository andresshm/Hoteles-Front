import { Room } from "./room.interface";
import { Service } from "./service.interface";

export interface Hotel {
    id: number;
    nombre: string;
    direccion: string;
    telefono:string;
    email:string;
    sitioWeb:string;
    services: number[];
    servicios: Service[];
    habitaciones: Room[];
}