import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItemI } from 'src/app/models/file.interface';
import { archivoI, PacienteI } from 'src/app/models/model.interface';
import { DataService } from 'src/app/services/data.service';


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
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css'],
  providers: [
    // {provide: NgbDateAdapter, useClass: CustomAdapter},
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class ArchivosComponent implements OnInit {

  public paciente: PacienteI = {};
  public archivoForm: FormGroup;
  archivo: File | undefined;
  archivos: archivoI[] = []; 
  
  model1: NgbDateStruct | undefined;

  constructor(
    private dataSvc: DataService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>
  ) {
    this.archivoForm = this.fb.group({
      id: '',
      fecha: ['', Validators.required],
      comentarios: ['', Validators.required]
    })

    this.dataSvc.getPaciente$().subscribe(e => {
      this.paciente = e;
    })
  }

  ngOnInit(): void {
    const pacienteID = this.paciente?.ID ?? 0;

    this.dataSvc.getArchivos(pacienteID).subscribe( e => {
      this.archivos = e.data;
      this.archivoForm.patchValue ({
        //ID: this.archivos
      })
    })
  }


  onGrabarArchivo() {
    this.model1 = this.archivoForm.get('fecha')?.value;

    var fecha = new Date(this.model1?.month + '/' + this.model1?.day + '/' + this.model1?.year);

    const pacienteID = this.paciente?.ID ?? 0;


      this.dataSvc.guardarArchivo(pacienteID, this.archivo, this.archivoForm.get('comentarios')?.value, 
          fecha.getTime()).subscribe ({
            next: e => {
              console.log('Archivo y texto recibidos correctamente', e);
            },
            error: err => {
              console.error('Error occurred:', err);
            }
          });  
  }

  open(targetModal: any) {

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.archivoForm.patchValue({
      fecha: this.dateAdapter.toModel(this.ngbCalendar.getToday())!,
    })
  }


  onFileDropped(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.archivo = file;
    }
  }

}
