import { Component, OnInit } from '@angular/core';
import { PacienteI } from 'src/app/models/model.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public paciente : PacienteI={};
  constructor(private dataSvc : DataService) { }

  ngOnInit(): void {
    this.dataSvc.getPaciente$().subscribe( paciente => {
      this.paciente = paciente
    })

  }

}

