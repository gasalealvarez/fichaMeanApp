import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { Location } from '@angular/common'

import { antiparasitarioI, EspecieI, etiquetaI, itemI, vacunaI } from 'src/app/models/model.interface';
import { DataService } from 'src/app/services/data.service';
import { RazaI } from 'src/app/models/raza.interface';
import { ToastService } from 'src/app/services/toast.service';
import { ThisReceiver } from '@angular/compiler';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';



@Component({
  selector: 'app-modal-items',
  templateUrl: './modal-items.component.html',
  styleUrls: ['./modal-items.component.css']
})
export class ModalItemsComponent implements OnInit {
  public items : itemI[]=[];
  public razas: RazaI[]=[];
  public especies: EspecieI[]=[];
  public vacunas: vacunaI[]=[];
  public antiparasitarios: antiparasitarioI[]=[];
  public etiquetas: etiquetaI[]= [];

  private raza : RazaI = {};
  private vacuna: vacunaI = {};
  private antiparasitario : antiparasitarioI = {};
  private etiqueta: etiquetaI = {};

  public raza_b: boolean = false;
  public vacuna_b:boolean= false;
  public antiparasitario_b: boolean= false;
  public etiqueta_b=false;

  public boton_estado="Agregar"
  
  itemForm : any = new FormControl();

  constructor(private dataSvc: DataService,
    private toastService: ToastService,
    private confirmationDialogService: ConfirmDialogService, 
    private location: Location,
    private fb: FormBuilder) {
      this.itemForm = this.fb.group({
        objecto_editar: ['', Validators.required],
        claseItem : [''],
        especie:  ['', Validators.required],
        item : ['', Validators.required],
        texto : ['', Validators.required],
      })
     }

  ngOnInit(): void {
    this.items = this.dataSvc.getItems();
    this.especies = this.dataSvc.getEspecies();
  }

  boton_nuevo(){
    this.boton_estado ="Agregar"

    this.itemForm.setValue({
      objecto_editar:'',
      claseItem : '',
      especie:'', 
      item : '',
      texto : ''
    })
  }

  itemSeleccionado() {
    if(this.itemForm.get('claseItem').value === 'Razas') {
      this.raza_b = true;
      this.vacuna_b= false;
      this.antiparasitario_b = false;
      this.etiqueta_b = false;
      this.dataSvc.getRazas().subscribe(razas => {
        this.razas = razas
      })

    } 
    else if (this.itemForm.get('claseItem').value === 'Vacunas') {
      this.vacuna_b= true;
      this.antiparasitario_b = false;
      this.etiqueta_b= false;
      this.raza_b = false;
      this.dataSvc.getVacunas().subscribe(vacunas => {
        this.vacunas = vacunas;
      })
    } 
    else if (this.itemForm.get('claseItem').value === 'Antiparasitarios') {
      this.antiparasitario_b = true;
      this.etiqueta_b =false;
      this.vacuna_b=false;
      this.raza_b = false;
      this.dataSvc.getAntiparasitarios().subscribe(atp => {
        this.antiparasitarios = atp
      }) 
    }
    else if (this.itemForm.get('claseItem').value === 'Etiquetas') {
      this.etiqueta_b = true;
      this.antiparasitario_b = false;
      this.vacuna_b=false;
      this.raza_b = false;
      this.etiquetas = this.dataSvc.getEtiquetas();

    }

  }

  onPreCambioItem() {

    if (this.boton_estado === "Agregar") 
      {
            if (this.vacuna_b) {

              const VACUNA : vacunaI = {
                vacuna :  this.itemForm.get('texto')?.value
              }

              this.dataSvc.guardarVacuna(VACUNA).subscribe(vacuna => {
                this.dataSvc.getVacunas().subscribe(vacunas => {
                  this.vacunas = vacunas;
                })
                this.showSuccess();
              });

            } else if (this.antiparasitario_b) {
              const ATP : antiparasitarioI = {
                antiparasitario:  this.itemForm.get('texto')?.value
              }

              this.dataSvc.guardarAntiparasitario(ATP).subscribe(antiparasitario => {
                this.dataSvc.getAntiparasitarios().subscribe(atp => {
                  this.antiparasitarios = atp
                })
                this.showSuccess();
              })
            } else if (this.raza_b) {
              const RAZA : RazaI = {
                idEspecie: this.itemForm.get('especie')?.value,
                raza: this.itemForm.get('texto')?.value
              }

              this.dataSvc.guardarRaza(RAZA).subscribe(a => {
                this.dataSvc.getRazas().subscribe(b=> {
                  this.razas = b
                })
              })
              this.showSuccess();
            }

      } else if (this.boton_estado === "Editar") {
        if (this.vacuna_b) {
          const VACUNA : vacunaI = { 
                                      _id: this.vacuna._id,
                                       vacuna : this.itemForm.get('texto')?.value
                                   }
         
          this.dataSvc.actualizarVacuna(VACUNA._id, VACUNA).subscribe(vacuna => {
            this.dataSvc.getVacunas().subscribe(vacunas => {
              this.vacunas = vacunas;
            })
            this.showSuccess();
          });
        } else if (this.antiparasitario_b) {
            const ANTIPARASITARIO : antiparasitarioI = {
                                  _id : this.antiparasitario._id,
                                  antiparasitario : this.itemForm.get('texto')?.value
                                  }
            this.dataSvc.actualizarAntiparasitario(ANTIPARASITARIO._id, ANTIPARASITARIO).subscribe(atp => {
              this.dataSvc.getAntiparasitarios().subscribe(atps => {
                this.antiparasitarios = atps
              })
              this.showSuccess()
            })
        } else if (this.raza_b) {
          const RAZA : RazaI = {
                                _id: this.raza._id,
                                raza : this.itemForm.get('texto')?.value
                               }
          this.dataSvc.actualizarRaza(RAZA._id, RAZA).subscribe(raza => {
            this.dataSvc.getRazas().subscribe(razas => {
              this.razas = razas
            })
          })
        }
      }

   
    
    // retornarAnterior();
  }

  eliminarItem(item: any) {
    this.asignar_clase(item);
    if (this.vacuna_b) {
      this.confirmationDialogService.confirm('Por favor Confirmar..', 'Desea borrar definitivamente '  + this.vacuna.vacuna + ' ?')
      .then((confirmed) => {
        if (confirmed) {
          this.dataSvc.eliminarVacuna(this.vacuna._id).subscribe(data => {
            this.dataSvc.getVacunas().subscribe(vacunas => {
              this.vacunas = vacunas
            })
            this.showError();
          })
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

    } else if (this.antiparasitario_b) {
      this.confirmationDialogService.confirm('Por favor Confirmar..', 'Desea borrar definitivamente '  + this.antiparasitario.antiparasitario + ' ?')
      .then((confirmed) => {
        if (confirmed) {
          this.dataSvc.eliminarAntiparasitario(this.antiparasitario._id).subscribe(data => {
            this.dataSvc.getAntiparasitarios().subscribe(atps => {
              this.antiparasitarios = atps
            })
            this.showError();
          })
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

    } else if (this.raza_b) {
      this.confirmationDialogService.confirm('Por favor Confirmar..', 'Desea borrar definitivamente '  + this.raza.raza + ' ?')
      .then((confirmed) => {
        if (confirmed) {
          this.dataSvc.eliminarRaza(this.raza._id).subscribe(data => {
            this.dataSvc.getRazas().subscribe(razas => {
              this.razas = razas
            })
            this.showError();
          })
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

    }

  }

  editarItem(item: any){
    this.boton_estado="Editar"

    this.asignar_clase(item);


    if (this.vacuna_b) {
      this.itemForm.setValue({
        objecto_editar: this.vacuna._id,
        claseItem : 'Vacunas',
        especie :'',
        item : '',
        texto : this.vacuna.vacuna
      })
    } else if (this.antiparasitario_b)
      {
        this.itemForm.setValue({
          objecto_editar: this.antiparasitario._id,
          claseItem : 'Antiparasitarios',
          especie : '',
          item : '',
          texto : this.antiparasitario.antiparasitario
        })
      } else if (this.raza_b)  {

        var toString = this.raza.idEspecie?.toString();
        var toConcat =  toString + "";
 
         this.itemForm.setValue({
          objecto_editar: this.raza._id,
          claseItem : 'Razas',
          especie :toConcat,
          item : '',
          texto : this.raza.raza
        });
  
      } else if (this.etiqueta_b)
      {
        this.itemForm.setValue({
          objecto_editar: item,
          claseItem : '',
          especie : '',
          item : '',
          texto : this.etiqueta.etiqueta
        })
      }
  }

  asignar_clase(item:any) {
     if (this.vacuna_b) {
      this.vacuna = item
    } else if (this.antiparasitario_b)
    {
      this.antiparasitario = item;
    } else if (this.raza_b)
    {
      this.raza = item;
    } else if (this.antiparasitario_b)
    {
      this.etiqueta = item;
    }
  }

  showSuccess() {
    this.toastService.show('Guardado exitosamente !', {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true
    });
  }


  showError() {
    this.toastService.show('Eliminado con exito.', {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true
    });
  }

  retornarAnterior() {
    this.location.back();
  }

}
