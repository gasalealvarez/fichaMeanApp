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
    ID?: string,
    nombre?: string,
    idPropietario?: string,
    idEspecie?: string,
    raza?: string,
    idSexo?: string;
    pelaje?: string,
    fechaNacimiento?: Date,
}

export interface EspecieI {
    id?: string,
    especie?: string,
}

export interface EntradaI {
    _id?: string,
    fecha?: Date,
    comentarios?: string,
    propietario?: string,
    idPaciente?: string,
    paciente?: string, 
    tipo_ingreso?: string
}

export interface vacunaI {
    _id?: string,
    vacuna?: string
}

export interface antiparasitarioI {
    _id?: string,
    antiparasitario?: string
}

export interface SanidadI {
    _id?: string,
    fecha?: Date,
    idPaciente?: string | null,
    vacuna?: string,
    antiparasitario?: string,
    fechaProxima?: Date,
    comentarios?: string,
}

export interface casoI {
    _id?: string,
    sintomas? : string,
    diagnostico?: string,
    tratamiento? : string,
    archivos: File[]
}
