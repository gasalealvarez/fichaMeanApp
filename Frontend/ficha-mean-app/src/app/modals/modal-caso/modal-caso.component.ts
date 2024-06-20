import { Component, OnInit } from '@angular/core';
import { FileItemI } from 'src/app/models/file.interface';
import { WebcamImage } from 'ngx-webcam';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { casoI } from 'src/app/models/model.interface';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-modal-caso',
  templateUrl: './modal-caso.component.html',
  styleUrls: ['./modal-caso.component.css']
})
export class ModalCasoComponent implements OnInit {
  public selectedFiles: FileItemI[] = [];
  casoForm: FormGroup;
  ID: Number = 0;
  public caso: casoI = {};

  sintomas: string = '';
  archivos: File | undefined;

  // latest snapshot

  public webcamImage: WebcamImage | undefined;



  constructor(private dataSvc: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private fb: FormBuilder) {
    this.casoForm = this.fb.group({
      ID: ['', Validators.required],
      sintomas: ['', Validators.required],
      diagnostico: ['', Validators.required],
      tratamiento: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    this.ID = Number(this.route.snapshot.paramMap.get('id'));
    this.dataSvc.getCaso(this.ID).subscribe(e => {
      if (e.status != 300) {  

        this.caso = e.data[0];

        this.casoForm.patchValue({
          ID : this.caso.ID,
          sintomas: this.caso.sintomas,
          diagnostico: this.caso.diagnostico,
          tratamiento: this.caso.tratamiento
        })

      }
    })


  }

  guardar() {

    const CASO: casoI = {
      ID: this.ID,
      sintomas: this.casoForm.get('sintomas')?.value,
      diagnostico: this.casoForm.get('diagnostico')?.value,
      tratamiento: this.casoForm.get('tratamiento')?.value,
    }

    if (this.casoForm.get('ID')?.value == null) {
      this.dataSvc.guardarCaso(CASO).subscribe(res => {
        this.router.navigate(['/listar-historial']);
      });
    } else {
      console.log('Editando')
    }

   

  }



  onUpload() {
    // this.fileSvc.uploadImage(this.selectedFiles);   

    console.log('files ', this.selectedFiles)
  }


  onFileDropped(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.archivos = file;
    }
    console.log('archivos  ' + this.archivos?.name)
  }

  /*

  maneja_Imagen(event: any): void {
    this.addFiles(event.target.files);
    this.onUpload();
  }


  addFiles(fileList: FileList): void {
    for (const property in Object.getOwnPropertyNames(fileList)) {
      const tempFile = fileList[property];
      {
        const newFile = new FileItemI(tempFile);
        this.selectedFiles.push(newFile);
      }
    }
    

  }
*/

}


