import { Component, OnInit } from '@angular/core';
import { FileItemI } from 'src/app/models/file.interface';
import { WebcamImage } from 'ngx-webcam';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { casoI } from 'src/app/models/model.interface';

@Component({
  selector: 'app-modal-caso',
  templateUrl: './modal-caso.component.html',
  styleUrls: ['./modal-caso.component.css']
})
export class ModalCasoComponent implements OnInit {
  public selectedFiles: FileItemI[] = [];



  // latest snapshot

  public webcamImage: WebcamImage | undefined;


  sintomas: string = '';
  archivos: File | undefined;


  constructor(private dataSvc: DataService,
    private _sanitizer: DomSanitizer ) 
    {


    }

  ngOnInit(): void {

  }

  guardar() {
    if (this.sintomas && this.archivos) {


      this.dataSvc.guardarCaso(this.archivos, this.sintomas).subscribe(res => {
        console.log("datos enviados")
      });
    }
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;

    console.log('imagen ', webcamImage.imageAsBase64)

  }

  onUpload() {
    // this.fileSvc.uploadImage(this.selectedFiles);   

    console.log('files ', this.selectedFiles)
  }


  onFileDropped(event: any) {
    const file:File = event.target.files[0];

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


