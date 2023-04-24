import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItemI } from 'src/app/models/file.interface';
import { createTypeReferenceDirectiveResolutionCache, forEachTrailingCommentRange } from 'typescript';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {

  // public archivoForm :  any = new FormGroup();
  public archivoForm : FormGroup;
  public selectedFiles: FileItemI[] = [];

  constructor(
    private modalService : NgbModal,
    private fb: FormBuilder
  ) {
      this.archivoForm = this.fb.group({
        id: '',
        title: ['', Validators.required],
        archivoURL: ['', Validators.required],
        public_id:['', Validators.required],
        fecha : ['', Validators.required],
        comentarios: ['', Validators.required]
      })
   }

  ngOnInit(): void {
  }


  onGrabarArchivo(){
  }

  open(targetModal: any) {

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  maneja_Imagen(event: any): void {
    this.addFiles(event.target.files);

    
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
