import { FileItemI } from "./file.interface";

export interface itemI {
    id?: string;
    item?: string;
}

export interface etiquetaI {
    id?:string;
    etiqueta?: string;
}

export interface PropietarioI {
    ID?: string,
    nombre?: string,
    direccion?: string,
    telefono?: string,
    email?: string,
}
export interface PacienteI {
    ID?: Number,
    nombre?: string,
    idPropietario?: string,
    idEspecie?: string,
    raza?: string,
    idSexo?: string;
    pelaje?: string,
    fechaNacimiento?: Number,
}

export interface EspecieI {
    id?: string,
    especie?: string,
}

export interface EntradaI {
    ID?: string,
    fecha?: number,
    comentarios?: string,
    propietario?: string,
    idPaciente?: Number,
    paciente?: string, 
    tipo_ingreso?: string
}

export interface vacunaI {
    ID?: string,
    vacuna?: string
}

export interface antiparasitarioI {
    ID?: string,
    antiparasitario?: string
}

export interface SanidadI {
    ID?: string,
    fecha?: number,
    idPaciente?: Number,
    idVacuna? : Number,
    vacuna?: string,
    idAntiparasitario: Number,
    antiparasitario?: string,
    fechaProxima?: number,
    recordatorio: Number,
    comentarios?: string,
}

export interface casoI {
    ID?: Number,
    sintomas? : string,
    diagnostico?: string,
    tratamiento? : string,
    //archivos: File[]
}
