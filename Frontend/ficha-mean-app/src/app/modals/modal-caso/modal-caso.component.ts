import { Component, OnInit } from '@angular/core';
import { FileItemI } from 'src/app/models/file.interface';
import {WebcamImage} from 'ngx-webcam';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-caso',
  templateUrl: './modal-caso.component.html',
  styleUrls: ['./modal-caso.component.css']
})
export class ModalCasoComponent implements OnInit {
  public selectedFiles: FileItemI[] = [];
  

   // latest snapshot

  public webcamImage: WebcamImage | undefined;


  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    console.log('imagen ', webcamImage.imageAsBase64)

  }

  onUpload() {
    // this.fileSvc.uploadImage(this.selectedFiles);   

    console.log('files ', this.selectedFiles)
  }

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

 
}
