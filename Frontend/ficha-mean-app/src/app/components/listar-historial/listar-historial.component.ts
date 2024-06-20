import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { EntradaI, PacienteI, PropietarioI } from 'src/app/models/model.interface';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';

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
  selector: 'app-listar-historial',
  templateUrl: './listar-historial.component.html',
  styleUrls: ['./listar-historial.component.css'],
  providers: [
    // adapta la fecha a DD/MM/YYYY
    // {provide: NgbDateAdapter, useClass: CustomAdapter},
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})

export class ListarHistorialComponent implements OnInit {
  public ingresos: EntradaI[] = [];
  private propietario: PropietarioI = {};
  public paciente: PacienteI = {};
  private sanidad: boolean = false;
  entradaForm: FormGroup;
  model1: NgbDateStruct | undefined;
  selectedOption: string | undefined;

  constructor(private dataSvc: DataService,
    private confirmationDialogService: ConfirmDialogService,
    private modalService: NgbModal,
    private ngbCalendar: NgbCalendar,
    public toastService: ToastService,
    private dateAdapter: NgbDateAdapter<string>,
    private router: Router,
    private fb: FormBuilder) {
    this.entradaForm = this.fb.group({
      ID: ['', Validators.required],
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      comentarios: ['', Validators.required],
      tipo_ingreso: ['', Validators.required]
    })
  }


  selectOption(option: string) {
    this.selectedOption = option;
  }

  ngOnInit(): void {

    this.dataSvc.getPropietario$().subscribe(propietario => {
      this.propietario = propietario
    })

    this.dataSvc.getPaciente$().subscribe(e => {
      this.paciente = e;
    })



    this.dataSvc.getEntradasPorPaciente(this.paciente.ID).subscribe(e => {
      this.ingresos = e.data;

    });

    
    this.entradaForm.patchValue({
      ID: '',
      nombre: this.paciente.nombre,
      fecha: this.dateAdapter.toModel(this.ngbCalendar.getToday())!,
    })

  }

  abrir_entrada(entrada: EntradaI) {
    this.router.navigate([`/nuevo-caso/${entrada.ID}`]);
  }

  onGrabarEntrada() {

    this.modalService.dismissAll();
    this.model1 = this.entradaForm.get('fecha')?.value;

    var fecha = new Date(this.model1?.month + '/' + this.model1?.day + '/' + this.model1?.year);

    if (this.entradaForm.get('ID')?.value == null) {
      this.entradaForm.patchValue({
        ID: ''
      })
    }

    const ENTRADA: EntradaI = {
      idPaciente: this.paciente.ID,
      paciente: this.paciente.nombre,
      propietario: this.propietario.nombre,
      fecha: fecha.getTime(),
      comentarios: this.entradaForm.get('comentarios')!.value,
      tipo_ingreso: this.entradaForm.get('tipo_ingreso')!.value
    }


    if (this.entradaForm.get('ID')?.value != '') {
       this.dataSvc.actualizarEntrada(this.entradaForm.get('ID')?.value, ENTRADA).subscribe(data => {
        this.dataSvc.getEntradasPorPaciente(this.paciente.ID).subscribe(data => {
          this.ingresos = data.data;
        }); 
      })
      
    } else {
       this.dataSvc.guardarEntrada(ENTRADA).subscribe(data => {
        this.dataSvc.getEntradasPorPaciente(this.paciente.ID).subscribe(data => {
          this.ingresos = data.data;
        });
      }) 
      
    }

    this.entradaForm.reset();
  }


  eliminarEntrada(entrada: EntradaI) {

    this.confirmationDialogService.confirm('Por favor Confirmar..', 'Desea borrar el ingreso definitivamente  del ' + entrada.fecha + ' ?', "Aceptar", "Cancelar", "lg")
      .then((confirmed) => {
        if (confirmed) {
          this.dataSvc.eliminarEntrada(entrada.ID).subscribe(data => {
            this.dataSvc.getPaciente$().subscribe(e => {
              this.paciente = e;

              this.dataSvc.getEntradasPorPaciente(this.paciente.ID).subscribe(data => {
                this.ingresos = data;
              });

            })
            this.showError();
          })

        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  openModal(targetModal: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    console.log('Paciente ', this.paciente.nombre)
    this.entradaForm.patchValue({
      ID: '',
      nombre: this.paciente.nombre,
      fecha: this.dateAdapter.toModel(this.ngbCalendar.getToday())!,
      tipo_ingreso: 'sanidad',
      recordatorio: '0',
      comentarios: ''
    })



  }

  openEdit(targetModal: any, entry: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    var fecha;
    fecha = moment(entry.fecha).format('DD/MM/YYYY')

    const year = fecha.substr(6, 4);
    const month = fecha.substr(3, 2);
    const day = fecha.substr(0, 2);

    var ngbDateStruct = { day: parseInt(day), month: parseInt(month), year: parseInt(year) };


    this.entradaForm.patchValue({
      ID: entry.ID,
      nombre: this.paciente.nombre,
      fecha: this.dateAdapter.toModel(ngbDateStruct)!,
      tipo_ingreso: entry.tipo_ingreso,
      recordatorio: '0',
      comentarios: entry.comentarios
    })
  }


  showError() {
    this.toastService.show('Ingreso eliminado con exito.', {
      classname: 'bg-danger text-light',
      delay: 2000,
      autohide: true
    });
  }

}