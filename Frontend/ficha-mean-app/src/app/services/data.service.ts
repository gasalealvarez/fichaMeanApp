import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { antiparasitarioI, EntradaI, EspecieI, etiquetaI, itemI, PacienteI, PropietarioI, SanidadI, vacunaI} from '../models/model.interface';
import { RazaI } from '../models/raza.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public selectedPropietario$ : BehaviorSubject<PropietarioI>;
  public selectedPaciente$ :  BehaviorSubject<PacienteI>;
  public selectedCaso$ : BehaviorSubject <EntradaI>;

  private urlPropietario =  'http://localhost:4000/api/fichaapp/propietario/';
  private urlPaciente =  'http://localhost:4000/api/fichaapp/paciente/';
  private urlEntrada =   'http://localhost:4000/api/fichaapp/ingreso/';
  private urlAntiparasitario = 'http://localhost:4000/api/fichaapp/antiparasitario/';
  private urlVacuna = 'http://localhost:4000/api/fichaapp/vacuna/';
  private urlRaza = 'http://localhost:4000/api/fichaapp/raza/';
  private urlPlan ='http://localhost:4000/api/fichaapp/plan/';


  private etiquetas : etiquetaI[]=[
    { id: '1' ,
    etiqueta: 'Gastroenteritis' },
    { id: '2' ,
    etiqueta: 'Sincopes' },
    { id: '3' ,
    etiqueta: 'Ovariectomia' },
  ]

  private especies : EspecieI[]= [
    {
      id: '1',
      especie: 'Canino'
    },
    {
      id: '2',
      especie: 'Felino'
    }
  ]

 

  



  private items : itemI []=[
    {
      id:'1',
      item:'Razas'
    },
    {
      id:'2',
      item: 'Vacunas'
    },
    {
      id:'3',
      item:'Antiparasitarios'
    },
    {
      id:'4',
      item:'Etiquetas'
    },
  ];


  constructor(private http : HttpClient) { 
    this.selectedPaciente$ = new BehaviorSubject<PacienteI>({});
    this.selectedPropietario$= new BehaviorSubject<PropietarioI>({});
    this.selectedCaso$ = new BehaviorSubject<EntradaI>({});
  }


  seleccionarPropietario(propietario : PropietarioI) {
    this.selectedPropietario$.next(propietario);
  }

  seleccionarPaciente(paciente: PacienteI) {
    this.selectedPaciente$.next(paciente);
  }

  seleccionarCaso(caso: EntradaI) {
    this.selectedCaso$.next(caso);
  }

  getItems(): itemI[]{
    return this.items;
  } 

  getEtiquetas(): etiquetaI[]{
    return this.etiquetas;
  }

  // Propietarios

  getPropietarios(): Observable<any> {
    return this.http.get(this.urlPropietario);
  }

  eliminarPropietario(id: string | undefined ):Observable<any> {
    return this.http.delete(this.urlPropietario + id);
  }

  guardarPropietario(propietario : PropietarioI): Observable<any> {
    return this.http.post(this.urlPropietario, propietario);
  }

  editarPropietario(id: string, propietario: PropietarioI): Observable<any> {
    return this.http.put(this.urlPropietario + id, propietario);
  }
  
  //  Pacientes
  getPacientes(idPropietario: string | any): Observable<any>{
   return this.http.get(this.urlPaciente + idPropietario);
  }

  guardarPaciente (paciente : PacienteI): Observable<any>{
    return this.http.post(this.urlPaciente, paciente)
  }

  editarPaciente (id: string, paciente : PacienteI) : Observable<any> {
    return this.http.put(this.urlPaciente + id, paciente)
  }

  eliminarPaciente (id: string | undefined ):Observable<any> {
    return this.http.delete(this.urlPaciente + id);
  }

  // Ingresos

  getEntradasPorPaciente(idPaciente : string | any ): Observable<any> {
    return this.http.get(this.urlEntrada + idPaciente)
  }

  guardarEntrada(entrada: EntradaI): Observable<any> {
    return this.http.post(this.urlEntrada, entrada);
  }

  eliminarEntrada(id: string | undefined ): Observable<any> {
    return this.http.delete(this.urlEntrada + id);
  }

  actualizarEntrada(id: string, entrada : EntradaI): Observable<any> {
    return this.http.put(this.urlEntrada + id, entrada);
  }

  // Antiparasitarios

  getAntiparasitarios(): Observable <any> {
    return this.http.get(this.urlAntiparasitario);
  }


  guardarAntiparasitario(antiparasitario: antiparasitarioI): Observable<any> {
    return this.http.post(this.urlAntiparasitario, antiparasitario);
  }

  eliminarAntiparasitario(id: string | undefined) {
    return this.http.delete(this.urlAntiparasitario + id);
  }
  
  actualizarAntiparasitario(id: string | undefined, antiparasitario: antiparasitarioI): Observable<any>{
    return this.http.put(this.urlAntiparasitario + id, antiparasitario);
  }

  // Vacunas

  getVacunas():Observable<any>{
    return this.http.get(this.urlVacuna);
  }

  guardarVacuna(vacuna: vacunaI): Observable<any> {
    return this.http.post(this.urlVacuna, vacuna);
  }

  eliminarVacuna(id: string | undefined) {
    return this.http.delete(this.urlVacuna +  id);
  }

  actualizarVacuna (id: string | undefined , vacuna : vacunaI ) {
    return this.http.put(this.urlVacuna +id, vacuna);
  }

  // Razas 

  getRazas():Observable<any> {
    return this.http.get(this.urlRaza);
  }

  guardarRaza(raza: RazaI): Observable<any> {
    return this.http.post(this.urlRaza, raza);
  }

  getRazasById(id: string): Observable<any>{
    return this.http.get(this.urlRaza + id);
  }

  eliminarRaza(id: string | undefined):Observable<any>{
    return this.http.delete(this.urlRaza + id);
  }

  actualizarRaza(id: string | undefined, raza: RazaI): Observable<any>{
    return this.http.put(this.urlRaza + id, raza);
  }


  getPlan(id: string | undefined): Observable<any> {
    return this.http.get(this.urlPlan + id);
  }

  guardarPlan(sanidad : SanidadI) : Observable<any> {
    return this.http.post(this.urlPlan , sanidad)
  }

  actualizarPlan(id : string | undefined, sanidad: SanidadI): Observable<any> {
    return this.http.put(this.urlPlan +id, sanidad);
  }

  eliminarPlan(id: string | undefined ){
    return this.http.delete(this.urlPlan + id);
  }


  getEspecies(): EspecieI[] {
    return this.especies;
  }

  getPaciente$():Observable<PacienteI>{
    return this.selectedPaciente$.asObservable();
  }

  getPropietario$(): Observable<PropietarioI> {
    return this.selectedPropietario$.asObservable();
  }

  getCaso$(): Observable<EntradaI> {
    return this.selectedCaso$.asObservable();
  }


}