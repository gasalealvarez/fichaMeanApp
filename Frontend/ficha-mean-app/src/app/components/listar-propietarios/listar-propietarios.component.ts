import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PropietarioI } from 'src/app/models/model.interface';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-listar-propietarios',
  templateUrl: './listar-propietarios.component.html',
  styleUrls: ['./listar-propietarios.component.css'],
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong></p>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})



export class ListarPropietariosComponent implements OnInit {

  public filterTerm!: string;
  public propietarios : PropietarioI[]=[];
  public page=10;
  public pageSize=10;
  propietarioForm : FormGroup;
  public titulo: string ="Nuevo Propietario";

  

  constructor(private dataSvc: DataService,
    private modalService: NgbModal, 
    private confirmationDialogService: ConfirmDialogService, 
    public toastService: ToastService,
    private fb: FormBuilder) {
      this.propietarioForm = this.fb.group({
        id:'',
        propietario : ['', Validators.required],
        direccion : ['', Validators.required],
        telefono : ['', Validators.required],
        email : ['', Validators.required]
      })
     }

  ngOnInit(): void {
    this.obenerPropietarios();  
  }

  obenerPropietarios() {
    this.dataSvc.getPropietarios().subscribe( data => {
      this.propietarios = data;
    });
  }

  eliminarPropietario(propietario: PropietarioI ) {

    this.confirmationDialogService.confirm('Por favor Confirmar..', 'Desea borrar definitivamente '  + propietario.nombre + ' ?')
      .then((confirmed) => {
        if (confirmed) {
          this.dataSvc.eliminarPropietario(propietario.ID).subscribe( data => {
            this.obenerPropietarios();
            this.showError();
          })
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }

  guardarPropietario() {
    this.modalService.dismissAll();

    const PROPIETARIO : PropietarioI = {
      nombre : this.propietarioForm.get('propietario')?.value,
      direccion : this.propietarioForm.get('direccion')?.value,
      telefono : this.propietarioForm.get('telefono')?.value,
      email : this.propietarioForm.get('email')?.value,
    }

  
    if (this.propietarioForm.get('id')?.value != '') {
      this.dataSvc.editarPropietario(this.propietarioForm.get('id')?.value, PROPIETARIO).subscribe(data => {
        this.showSuccess();
        this.obenerPropietarios();
      })
    } else   {
      this.dataSvc.guardarPropietario(PROPIETARIO).subscribe(data => {
        this.showSuccess();
        this.obenerPropietarios();
      })
    }
    this.propietarioForm.reset();
   }

  // modal para nuevo y editar 
  // Toast


  openModalEdit(targetModal: any, user: any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });

    this.titulo ="Editar Propietario"
   
    this.propietarioForm.patchValue({
     id : user._id, 
     propietario: user.nombre,
     direccion: user.direccion,
     telefono: user.telefono,
     email: user.email
    });
   }

   openModal(targetModal: any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    
    this.titulo = "Nuevo Propietario"

    this.propietarioForm.patchValue({
      id: '',
      propietario: '',
      direccion: '',
      telefono: '',
      email: ''
     });
   }

   showSuccess() {
    this.toastService.show('Propietario guardado exitosamente !', {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true
    });
  }

  showError() {
    this.toastService.show('Propietario eliminado con exito.', {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true
    });
  }
}