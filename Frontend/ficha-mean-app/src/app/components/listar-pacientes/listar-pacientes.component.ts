import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.css']
})
export class ListarPacientesComponent implements OnInit {

  public page=10;
  public pageSize=10;

  constructor() { }

  ngOnInit(): void {
  }

  newPaciente() {
    
  }

}
