import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SanidadI } from 'src/app/models/model.interface';
import { DataService } from 'src/app/services/data.service';


interface Task {
  id: number;
  paciente: string;
  propietario: string;
  comentarios: string;
  fecha: string
}


@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.component.html',
  styleUrls: ['./listar-tareas.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        animate('1s ease-in')
      ])
    ])
  ]
})
export class ListarTareasComponent implements OnInit {

  public sanidad: Task[] = [];


  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
    this.dataSvc.getTareas().subscribe(e => {
      this.sanidad =e;
    })
  }




}
