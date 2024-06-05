import { Component, Injectable, OnInit } from '@angular/core';
import { EspecieI, PacienteI, PropietarioI } from 'src/app/models/model.interface';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RazaI } from 'src/app/models/raza.interface';
import { DatePipe, formatDate } from '@angular/common';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastService } from 'src/app/services/toast.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { UrlSerializer } from '@angular/router';


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
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
  providers: [
    // adapta la fecha a DD/MM/YYYY
    // {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class SelectorComponent implements OnInit {
  
  public filterTerm!: string;
  public selectedPropietario: PropietarioI = {};
  public selectedPaciente: PacienteI={};
  public propietarios: PropietarioI[];
  public pacientes: PacienteI[];

  public especies: EspecieI[]=[];
  
  public razas_especie:RazaI[]=[];
  // public idEspecie:number=1;
  
  public pacienteForm : any = new FormControl();

  titulo : string ="Nuevo Paciente";
  private nuevaFecha!: Date;

  closeResult = '';
  public isShown : boolean =false;
  model1: NgbDateStruct | undefined;

  constructor(private dataSvc: DataService,
     
      public modalService: NgbModal,
      private fb: FormBuilder,
      private confirmationDialogService: ConfirmDialogService, 
      public toastService: ToastService,
      private dateAdapter: NgbDateAdapter<string>   )
       { 
        this.propietarios=[];
        this.pacientes=[];
        this.selectedPaciente={};
        this.pacienteForm = this.fb.group({
          id : ['', Validators.required],
          paciente : ['', Validators.required],
          especie : ['', Validators.required],
          idSexo : ['', Validators.required],
          raza : ['', Validators.required],
          pelaje : ['', Validators.required],
          edad :  ['', Validators.required],
          unidad_edad :  '',
          fechaNacimiento:  '',
        })
       
  }

  ngOnInit(): void {

    this.dataSvc.getPropietarios().subscribe( data => {
      this.propietarios = data;
    })
  }

  onSelect() {
    // aca cambie data por data.data por el tiempo de objecto que recibo en sqlite
    // en mongo solo recibo data
    // tambien cambie _id por ID en las interfaces, html y ts.

    this.dataSvc.getPacientes(this.selectedPropietario.ID).subscribe( data => {
     
      this.pacientes = data.data;
    }) ;
    this.selectedPaciente={};
    this.dataSvc.seleccionarPaciente(this.selectedPaciente);
    this.dataSvc.seleccionarPropietario(this.selectedPropietario);
  }

  onSelectPaciente() {
    this.dataSvc.seleccionarPaciente(this.selectedPaciente);
  }

  onRazas(idEspecie?: string | any ){
    
    if (idEspecie === undefined ) {
      idEspecie = this.pacienteForm.get('especie')?.value
    } else {

    }

    this.dataSvc.getRazasById(idEspecie).subscribe(raz => {
      this.razas_especie = raz.data;
    })
  
  }

  onGrabarPaciente() {

    this.modalService.dismissAll();

    this.model1 = this.pacienteForm.get('fechaNacimiento')?.value;

    var fecha = new Date(this.model1?.month + '/'+ this.model1?.day + '/' + this.model1?.year);

    // guarda la fecha en formato timeStamp
    
    const PACIENTE : PacienteI = {
      nombre : this.pacienteForm.get('paciente')?.value,
      idPropietario : this.selectedPropietario.ID,
      idEspecie : this.pacienteForm.get('especie')?.value,
      idSexo : this.pacienteForm.get('idSexo')?.value,
      raza : this.pacienteForm.get('raza')?.value,
      pelaje : this.pacienteForm.get('pelaje')?.value,
      fechaNacimiento : fecha.getTime()
    }

    
    
     if (this.pacienteForm.get('id')?.value != '') {
      this.dataSvc.editarPaciente(this.pacienteForm.get('id')?.value, PACIENTE).subscribe(data => {
        this.showSuccess();
        this.onSelect();
      })
    } else   {
      this.dataSvc.guardarPaciente(PACIENTE).subscribe(data => {
        this.showSuccess();
        this.onSelect();
      })
    }

    this.dataSvc.getPacientes(this.selectedPropietario.ID).subscribe( data => {
      this.pacientes = data.data;
    }) ;
 
    this.pacienteForm.reset();
  }

  onEliminar(paciente : PacienteI | any ){
    this.confirmationDialogService.confirm('Por favor Confirmar..', 'Desea borrar definitivamente '  + paciente.nombre + ' ?')
      .then((confirmed) => {
        if (confirmed) {
          this.dataSvc.eliminarPaciente(paciente.ID).subscribe( data => {
            this.onSelect();
            this.showError();
          })
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  onDateSelected() {

    this.model1 = this.pacienteForm.get('fechaNacimiento')?.value;

    var fecha = new Date(this.model1?.month + '/'+ this.model1?.day + '/' + this.model1?.year);

    this.pacienteForm.patchValue({     
      edad: moment(fecha).fromNow(true),
    })
  }


  calularFecha() {
    var  targetDate;
    var fecha;

    let valor= this.pacienteForm.get('edad')?.value ;

    if (this.pacienteForm.get('unidad_edad')?.value  === '1') {
      targetDate = moment().subtract(valor, 'days').format(); 
    } else if (this.pacienteForm.get('unidad_edad')?.value === '2') {
      targetDate = moment().subtract(valor, 'months').format(); 
    } else if (this.pacienteForm.get('unidad_edad')?.value === '3') {
      targetDate = moment().subtract(valor, 'years').format();
    }

    fecha = moment(targetDate).format('DD/MM/YYYY');

   
     const year =  fecha.substr(6,4);
     const month = fecha.substr(3,2);
     const day =  fecha.substr(0,2);

     var ngbDateStruct = { day: parseInt(day), month: parseInt(month), year: parseInt(year)};

     this.pacienteForm.patchValue({
       fechaNacimiento :  this.dateAdapter.toModel(ngbDateStruct)!
     });
  }

  showError() {
    this.toastService.show('Paciente eliminado con exito.', {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true
    });
  }


  showSuccess() {
    this.toastService.show('Paciente guardado exitosamente !', {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true
    });
  }
  
  openEdit(content: any, user: any) {
    this.especies = this.dataSvc.getEspecies(); 

    this.dataSvc.getPropietario$().subscribe( e => {
      this.selectedPropietario = e;
    });

    // cambia el number de especie a string para poder cargar el modal

    var a_especie: number = user.idEspecie
    var str_especie: string = a_especie + '';

    this.onRazas(user.idEspecie);

    this.titulo= 'Editar Paciente';
    moment.locale('es');
    this.isShown = false;


    var fecha;
    fecha = moment(user.fechaNacimiento).format('DD/MM/YYYY')
    
    const year =  fecha.substr(6,4);
    const month = fecha.substr(3,2);
    const day =  fecha.substr(0,2);

   

    var ngbDateStruct = { day: parseInt(day), month: parseInt(month), year: parseInt(year)};

    this.pacienteForm.patchValue({
          id: user._id,
          paciente: user.nombre,
          especie: str_especie,
          idSexo: user.idSexo,
          raza: user.raza,
          pelaje: user.pelaje,
          edad: moment(user.fechaNacimiento ).fromNow(true),
          fechaNacimiento:  this.dateAdapter.toModel(ngbDateStruct)!,
        })
      
        
     this.modalService.open(content, {
      centered: true,
      backdrop: 'static'
      });
    }

    open(targetModal: any) {
      this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.especies = this.dataSvc.getEspecies();

    // this.dataSvc.getRazas().subscribe(raza => {
    //   this.razas_especie = raza
    // })

    
    this.titulo = "Nuevo Paciente";
    this.isShown = true;

    this.pacienteForm.patchValue({
        id: '',
        paciente: '',
        especie:'',
        idSexo:'',
        raza: '',
        pelaje: '',
        edad: '',
        unidad_edad̈́:'', 
        fechaNacimiento: ''
     });
   }

}