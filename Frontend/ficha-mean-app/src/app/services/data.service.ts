import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { antiparasitarioI, EntradaI, EspecieI, etiquetaI, itemI, PacienteI, PropietarioI, SanidadI, vacunaI, casoI } from '../models/model.interface';
import { RazaI } from '../models/raza.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public selectedPropietario$: BehaviorSubject<PropietarioI>;
  public selectedPaciente$: BehaviorSubject<PacienteI>;
  public selectedCaso$: BehaviorSubject<EntradaI>;

  private urlPropietario = 'http://localhost:3000/api/propietario/';
  private urlPaciente = 'http://localhost:3000/api/paciente/';
  private urlEntrada = 'http://localhost:3000/api/ingreso/';
  private urlAntiparasitario = 'http://localhost:3000/api/antiparasitario/';
  private urlVacuna = 'http://localhost:3000/api/vacuna/';
  private urlRaza = 'http://localhost:3000/api/raza/';
  private urlPlan = 'http://localhost:3000/api/plan/';
  private urlCaso = 'http://localhost:3000/api/caso/';
  private urlArchivo = 'http://localhost:3000/api/archivo/';


  private etiquetas: etiquetaI[] = [
    {
      id: '1',
      etiqueta: 'Gastroenteritis'
    },
    {
      id: '2',
      etiqueta: 'Sincopes'
    },
    {
      id: '3',
      etiqueta: 'Ovariectomia'
    },
  ]

  private especies: EspecieI[] = [
    {
      id: '1',
      especie: 'Canino'
    },
    {
      id: '2',
      especie: 'Felino'
    }
  ]


  private items: itemI[] = [
    {
      id: '1',
      item: 'Razas'
    },
    {
      id: '2',
      item: 'Vacunas'
    },
    {
      id: '3',
      item: 'Antiparasitarios'
    },
    {
      id: '4',
      item: 'Etiquetas'
    },
  ];


  constructor(private http: HttpClient) {
    this.selectedPaciente$ = new BehaviorSubject<PacienteI>({});
    this.selectedPropietario$ = new BehaviorSubject<PropietarioI>({});
    this.selectedCaso$ = new BehaviorSubject<EntradaI>({});
  }


  seleccionarPropietario(propietario: PropietarioI) {
    this.selectedPropietario$.next(propietario);
  }

  seleccionarPaciente(paciente: PacienteI) {
    this.selectedPaciente$.next(paciente);
  }

  seleccionarCaso(caso: EntradaI) {
    this.selectedCaso$.next(caso);
  }

  getItems(): itemI[] {
    return this.items;
  }

  getEtiquetas(): etiquetaI[] {
    return this.etiquetas;
  }

  // Propietarios

  getPropietarios(): Observable<any> {
    return this.http.get(this.urlPropietario);
  }

  eliminarPropietario(id: string | undefined): Observable<any> {
    return this.http.delete(this.urlPropietario + id);
  }

  guardarPropietario(propietario: PropietarioI): Observable<any> {
    return this.http.post(this.urlPropietario, propietario);
  }

  editarPropietario(id: string, propietario: PropietarioI): Observable<any> {
    return this.http.put(this.urlPropietario + id, propietario);
  }

  //  Pacientes
  getPacientes(idPropietario: string | any): Observable<any> {
    return this.http.get(this.urlPaciente + idPropietario);
  }

  guardarPaciente(paciente: PacienteI): Observable<any> {
    return this.http.post(this.urlPaciente, paciente)
  }

  editarPaciente(id: string, paciente: PacienteI): Observable<any> {
    console.log('Paciente id ', id)
    console.log('Paciente desde DATA ', paciente)
    return this.http.put(this.urlPaciente + id, paciente)
  }

  eliminarPaciente(id: string | undefined): Observable<any> {
    return this.http.delete(this.urlPaciente + id);
  }

  // Ingresos

  getEntradasPorPaciente(idPaciente: string | any): Observable<any> {
    return this.http.get(this.urlEntrada + idPaciente)
  }

  guardarEntrada(entrada: EntradaI): Observable<any> {
    return this.http.post(this.urlEntrada, entrada);
  }

  eliminarEntrada(id: string | undefined): Observable<any> {
    return this.http.delete(this.urlEntrada + id);
  }

  actualizarEntrada(id: string, entrada: EntradaI): Observable<any> {
    return this.http.put(this.urlEntrada + id, entrada);
  }

  // Antiparasitarios

  getAntiparasitarios(): Observable<any> {
    return this.http.get(this.urlAntiparasitario);
  }


  guardarAntiparasitario(antiparasitario: antiparasitarioI): Observable<any> {
    return this.http.post(this.urlAntiparasitario, antiparasitario);
  }

  eliminarAntiparasitario(id: string | undefined) {
    return this.http.delete(this.urlAntiparasitario + id);
  }

  actualizarAntiparasitario(id: string | undefined, antiparasitario: antiparasitarioI): Observable<any> {
    return this.http.put(this.urlAntiparasitario + id, antiparasitario);
  }

  // Vacunas

  getVacunas(): Observable<any> {
    return this.http.get(this.urlVacuna);
  }

  guardarVacuna(vacuna: vacunaI): Observable<any> {
    return this.http.post(this.urlVacuna, vacuna);
  }

  eliminarVacuna(id: string | undefined) {
    return this.http.delete(this.urlVacuna + id);
  }

  actualizarVacuna(id: string | undefined, vacuna: vacunaI) {
    return this.http.put(this.urlVacuna + id, vacuna);
  }


  // Caso

  getCaso(idEntrada: Number | undefined): Observable<any> {
    console.log(this.urlCaso + idEntrada);
    return this.http.get(this.urlCaso + idEntrada);
  }

  guardarCaso(caso: casoI) {

    return this.http.post(this.urlCaso, caso);

    // guardarCaso(archivos: File, sintomas: string){
    /*     let formData = new FormData();
    
         
        formData.append('textData', sintomas);
        formData.append('file', archivos);
    
        const headers = new HttpHeaders();
        
    
        return this.http.post(this.urlCaso, formData, {
          headers:headers
        }); */

  }

  actualizarCaso(id: Number | undefined, caso: casoI) {
    console.log('ID sel service ', id)
    return this.http.put(this.urlCaso + id, caso);
  }

  // Archivos
  guardarArchivo(idPaciente: Number, archivos: File | undefined, comentarios: string, fecha: Number) {


    let formData = new FormData();


    formData.append('idPaciente', idPaciente.toString());


    formData.append('comentarios', comentarios);
    if (archivos) { // Ensure the file is defined before appending
      formData.append('file', archivos);
    }
    formData.append('fecha', fecha.toString());

    const headers = new HttpHeaders();

    return this.http.post(this.urlArchivo, formData, {
      headers: headers
    });
  }

  getArchivos (idPaciente: Number): Observable<any> {
    return this.http.get(this.urlArchivo + idPaciente);
  }

  eliminarArchivo (id: number | Number) : Observable<any> {
    return this.http.delete(this.urlArchivo + id);
  }

  // Razas 

  getRazas(): Observable<any> {
    return this.http.get(this.urlRaza);
  }

  guardarRaza(raza: RazaI): Observable<any> {
    return this.http.post(this.urlRaza, raza);
  }

  getRazasById(id: string): Observable<any> {
    return this.http.get(this.urlRaza + id);
  }

  eliminarRaza(id: number | undefined): Observable<any> {
    return this.http.delete(this.urlRaza + id);
  }

  actualizarRaza(id: number | undefined, raza: RazaI): Observable<any> {
    return this.http.put(this.urlRaza + id, raza);
  }


  // Plan

  getPlan(id: Number | undefined): Observable<any> {
    return this.http.get(this.urlPlan + id);
  }

  getTareas() :Observable<any> {
    return this.http.get(this.urlPlan);
  }

  guardarPlan(sanidad: SanidadI): Observable<any> {
    return this.http.post(this.urlPlan, sanidad)
  }

  actualizarPlan(id: number | undefined, sanidad: SanidadI): Observable<any> {
    console.log('Plan ', sanidad)
    return this.http.put(this.urlPlan + id, sanidad);
  }

  eliminarPlan(id: string | undefined) {
    return this.http.delete(this.urlPlan + id);
  }


  getEspecies(): EspecieI[] {
    return this.especies;
  }

  getPaciente$(): Observable<PacienteI> {
    return this.selectedPaciente$.asObservable();
  }

  getPropietario$(): Observable<PropietarioI> {
    return this.selectedPropietario$.asObservable();
  }

  getCaso$(): Observable<EntradaI> {
    return this.selectedCaso$.asObservable();
  }


}