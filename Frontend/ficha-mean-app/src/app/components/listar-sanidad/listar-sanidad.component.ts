import { DatePipe } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { antiparasitarioI, PacienteI, SanidadI, vacunaI } from 'src/app/models/model.interface';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';

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
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}


@Component({
  selector: 'app-listar-sanidad',
  templateUrl: './listar-sanidad.component.html',
  styleUrls: ['./listar-sanidad.component.css'],
  providers: [
    // {provide: NgbDateAdapter, useClass: CustomAdapter},
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class ListarSanidadComponent implements OnInit {

  public vacunas: vacunaI[] = [];
  public antiparasitarios: antiparasitarioI[] = [];

  public sanidadForm: any = new FormControl();


  model1: NgbDateStruct | undefined;
  model2: NgbDateStruct | undefined;

  titulo: string = "Nuevo Registro";
  ID: string | undefined;

  isChecked:boolean = false;

  public sanidad: SanidadI[] = [];
  public paciente: PacienteI = {};

  constructor(private dataSvc: DataService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private modalService: NgbModal,
    private confirmationDialogService: ConfirmDialogService,
    public toastService: ToastService,
    private fb: FormBuilder,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>) {
    this.sanidadForm = this.fb.group({
      ID: ['', Validators.required],
      fechaAplicacion: ['', Validators.required],
      vacuna: ['', Validators.required],
      antiparasitario: ['', Validators.required],
      proxima: ['', Validators.required],
      recordatorio: [0, Validators.required],
      comentarios: ['', Validators.required],
    },
    )


    this.dataSvc.getPaciente$().subscribe(e => {
      this.paciente = e;
    })

  }

  ngOnInit(): void {

    this.dataSvc.getVacunas().subscribe(vacunas => {
      this.vacunas = vacunas;
      console.log()
    })

    
    this.dataSvc.getAntiparasitarios().subscribe(atp => {
      this.antiparasitarios = atp;
    })

    this.dataSvc.getPlan(this.paciente.ID).subscribe(plan => {
      if (plan.status != 300) {
        this.sanidad = plan;
      }

/* 
    this.sanidadForm.patchValue({
      ID:'',
      fechaAplicacion: this.dateAdapter.toModel(this.ngbCalendar.getToday())!,
      vacuna: '-',
      antiparasitario: '-',
      proxima: this.dateAdapter.toModel(this.ngbCalendar.getToday())!,
      comentarios: 'funciona'
    }); */
    });

  }

/*   openModal(targetModal: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });


    this.sanidadForm.setValue({
      ID:'',
      fechaAplicacion: this.dateAdapter.toModel(this.ngbCalendar.getToday())!,
      vacuna: '',
      antiparasitario: '',
      proxima: this.dateAdapter.toModel(this.ngbCalendar.getToday())!,
      recoradatorio:0, 
      comentarios: ''
    })

  } */


  agregar21() {
    let date: Date = new Date();
    date.setDate(date.getDate() + 21);
    let datePipe: DatePipe = new DatePipe('es');
    console.log(datePipe.transform(date, 'shortDate'));
    console.log(date)
  }

  onGrabarSanidad() {

    this.modalService.dismissAll();

    this.model1 = this.sanidadForm.get('fechaAplicacion')?.value;
    this.model2 = this.sanidadForm.get('proxima')?.value;

    var fecha = new Date(this.model1?.month + '/' + this.model1?.day + '/' + this.model1?.year);
    var fechaProxima = new Date(this.model2?.month + '/' + this.model2?.day + '/' + this.model2?.year);

    if (this.sanidadForm.get('ID')?.value == null ){
      this.sanidadForm.patchValue({
        ID:''
      })
    }


    const SANIDAD: SanidadI = {
      ID: this.sanidadForm.get('ID')?.value,
      idPaciente: this.paciente.ID,
      fecha: fecha.getTime(),
      idVacuna: this.sanidadForm.get('vacuna')?.value,
      idAntiparasitario: this.sanidadForm.get('antiparasitario')?.value,
      fechaProxima: fechaProxima.getTime(),
      recordatorio : this.sanidadForm.get('recordatorio')?.value,
      comentarios: this.sanidadForm.get('comentarios')?.value
    }


     if (this.sanidadForm.get('ID')?.value != '' ) { 
      this.dataSvc.actualizarPlan(this.sanidadForm.get('ID')?.value , SANIDAD).subscribe ( a => {
        this.dataSvc.getPlan(this.paciente.ID).subscribe(sanidad => {
          this.sanidad = sanidad;
        })
        this.showSuccess();
      })

    } else  {
      this.dataSvc.guardarPlan(SANIDAD).subscribe(plan => {

      this.dataSvc.getPlan(this.paciente.ID).subscribe(sanidad => {
        this.sanidad = sanidad;
      })
      this.showSuccess();
    })
    } 
    
    this.sanidadForm.reset();
  }

  eliminarPlan(plan: SanidadI) {
    this.confirmationDialogService.confirm('Por favor Confirmar..', 'Desea borrar el registro definitivamente  ?',"Aceptar","Cancelar", "lg")
    .then((confirmed) => {
      if (confirmed) {
        this.dataSvc.eliminarPlan(plan.ID).subscribe( data => {
          this.dataSvc.getPlan(this.paciente.ID).subscribe(sanidad => {
            this.sanidad = sanidad;
          })
          this.showError();
        })
        
    }
  })
  .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
}

  openEdit(content: any, plan: any) {
    if (plan.ID != '') {
      this.titulo = "Editar Registro"


      this.dataSvc.getPlan(this.paciente.ID).subscribe(plan => {
        this.sanidad = plan;
      })


      var fecha = moment(plan.fecha).format('DD/MM/YYYY')

      const year = fecha.substr(6, 4);
      const month = fecha.substr(3, 2);
      const day = fecha.substr(0, 2);

      var ngbDateStruct = { day: parseInt(day), month: parseInt(month), year: parseInt(year) };

      var fechaProx = moment(plan.fechaProxima).format('DD/MM/YYYY');


      const yearProx = fechaProx.substr(6, 4);
      const monthProx = fechaProx.substr(3, 2);
      const dayProx = fechaProx.substr(0, 2);

      var ngbDateStructProx = { day: parseInt(dayProx), month: parseInt(monthProx), year: parseInt(yearProx) };

           
      this.sanidadForm.setValue({
        ID: plan.ID,
        fechaAplicacion: this.dateAdapter.toModel(ngbDateStruct)!,
        vacuna: plan.idVacuna,
        antiparasitario: plan.idAntiparasitario,
        proxima: this.dateAdapter.toModel(ngbDateStructProx)!,
        recordatorio: plan.recordatorio,
        comentarios: plan.comentarios
      })
    }

    this.modalService.open(content, {
      centered: true,
      backdrop: 'static'
    });
  }

  open(targetModal: any) {

    this.titulo = "Nuevo Registro";

    this.sanidadForm.setValue({
      ID:'',
      fechaAplicacion: this.dateAdapter.toModel(this.ngbCalendar.getToday())!,
      vacuna: this.vacunas[0].ID,
      antiparasitario:this.antiparasitarios[0].ID,
      proxima: this.dateAdapter.toModel(this.ngbCalendar.getToday())!,
      recordatorio:0,
      comentarios: ''
    })

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  showSuccess() {
    this.toastService.show('Plan Sanitario guardado exitosamente !', {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true
    });
  }

  showError() {
    this.toastService.show('Plan Sanitario eliminado con exito.', {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true
    });
  }
}
