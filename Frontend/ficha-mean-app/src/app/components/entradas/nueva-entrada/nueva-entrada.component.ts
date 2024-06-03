import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { throttleTime } from 'rxjs';
import { EntradaI, PacienteI, PropietarioI } from 'src/app/models/model.interface';
import { DataService } from 'src/app/services/data.service';


/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
 
/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
 @Injectable()
 export class CustomAdapter extends NgbDateAdapter<string> {
 
   readonly DELIMITER = '-';
 
   fromModel(value: string | null): NgbDateStruct | null {
     if (value) {
       const date = value.split(this.DELIMITER);
       return {
         day : parseInt(date[0], 10),
         month : parseInt(date[1], 10),
         year : parseInt(date[2], 10)
       };
     }
     return null;
   }
 
   toModel(date: NgbDateStruct | null): string | null {
     return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
   }
 }
 
 /**
  * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
  */
 
 @Injectable()
 export class CustomDateParserFormatter extends NgbDateParserFormatter {
 
   readonly DELIMITER = '/';
 
   parse(value: string): NgbDateStruct | null {
     if (value) {
       const date = value.split(this.DELIMITER);
       return {
         day : parseInt(date[0], 10),
         month : parseInt(date[1], 10),
         year : parseInt(date[2], 10)
       };
     }
     return null;
   }
 
   format(date: NgbDateStruct | null): string {
     return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
   }
 }
@Component({
  selector: 'app-nueva-entrada',
  templateUrl: './nueva-entrada.component.html',
  styleUrls: ['./nueva-entrada.component.css'],
  providers: [
    // adapta la fecha a DD/MM/YYYY
    // {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
  
})
export class NuevaEntradaComponent implements OnInit {
  paciente: PacienteI ={};
  propietario : PropietarioI = {};
  model1: NgbDateStruct | undefined;
  entradaForm : FormGroup;
  sanidad: boolean = false;

  @ViewChild('closebutton') closebutton: any;
  
  constructor(private dataSvc: DataService,
    private router: Router,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>, 
    private fb: FormBuilder){
      this.entradaForm = this.fb.group({
        fecha : ['', Validators.required],
        comentarios: ['', Validators.required]
      })
    }
    
    

  ngOnInit(): void {
    
      this.dataSvc.getPaciente$().subscribe( paciente => {
        this.paciente = paciente
      })

      this.dataSvc.getPropietario$().subscribe(propietario => {
        this.propietario = propietario
      })

      this.entradaForm.patchValue({
        fecha: this.dateAdapter.toModel(this.ngbCalendar.getToday())!,
      })

  }

  onSubmit() {

    this.model1 = this.entradaForm.get('fecha')?.value;

    var fecha = new Date(this.model1?.month + '/'+ this.model1?.day + '/' + this.model1?.year);
    

       
    const ENTRADA : EntradaI = {
      idPaciente : this.paciente.ID,
      paciente : this.paciente.nombre,
      propietario : this.propietario.nombre, 
      fecha : fecha,
      comentarios : this.entradaForm.get('comentarios')!.value,
      // sanidad : this.sanidad
    }

    console.log('ENTRADA ', ENTRADA)

    // this.dataSvc.guardarEntrada(ENTRADA).subscribe(data => {
    //   this.entradaForm.reset();
    //   this.router.navigate(['/listar-entradas']);
    // })
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }
  
  onSanidad() {
    this.sanidad=true;
  }

  onOtros() {
    this.sanidad = false;
  }

}
