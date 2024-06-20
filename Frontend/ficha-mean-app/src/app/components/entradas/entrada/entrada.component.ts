import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { EntradaI, PacienteI } from 'src/app/models/model.interface';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {
  public ingresos : EntradaI[]=[];
  model: NgbDateStruct | undefined;
  public paciente : PacienteI={};

  constructor(private dataSvc: DataService,
    private confirmationDialogService: ConfirmDialogService, 
    public toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {

    this.dataSvc.getPaciente$().subscribe(e => {
      this.paciente = e;
    })

    this.dataSvc.getEntradasPorPaciente(this.paciente.ID).subscribe( data => {
      this.ingresos = data;
    });
   
  }

  abrir_entrada() {
    this.router.navigate(['/nuevo-caso']);
  }

  eliminarEntrada(entrada : EntradaI) {

    this.confirmationDialogService.confirm('Por favor Confirmar..', 'Desea borrar el ingreso definitivamente  del '+ entrada.fecha +' ?',"Aceptar","Cancelar", "lg")
      .then((confirmed) => {
        if (confirmed) {
            this.dataSvc.eliminarEntrada(entrada.ID).subscribe( data => {
              this.dataSvc.getPaciente$().subscribe(e => {
                this.paciente = e;
              })
              this.showError();
            })
            
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  showError() {
    this.toastService.show('Ingreso eliminado con exito.', {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true
    });
  }

}
