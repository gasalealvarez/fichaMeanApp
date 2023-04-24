import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradaComponent } from './components/entradas/entrada/entrada.component';
import { NuevaEntradaComponent } from './components/entradas/nueva-entrada/nueva-entrada.component';
import { ListarHistorialComponent } from './components/listar-historial/listar-historial.component';
import { ListarPacientesComponent } from './components/listar-pacientes/listar-pacientes.component';
import { ListarPropietariosComponent } from './components/listar-propietarios/listar-propietarios.component';
import { ListarSanidadComponent } from './components/listar-sanidad/listar-sanidad.component';
import { ModalItemsComponent } from './modals/modal-items/modal-items.component';
import { SelectorComponent } from './components/selector/selector.component';
import { ModalCasoComponent } from './modals/modal-caso/modal-caso.component';
import { ArchivosComponent } from './components/archivos/archivos.component';

const routes: Routes = [
  { path:'',component: SelectorComponent},
  { path: 'agregar-items', component: ModalItemsComponent},
  { path: 'listar-propietarios', component: ListarPropietariosComponent},
  { path: 'listar-pacientes', component: ListarPacientesComponent},
  // { path: 'listar-entradas', component: EntradaComponent },
  { path: 'archivos', component : ArchivosComponent},
  { path: 'nueva-entrada', component: NuevaEntradaComponent},
  { path: 'listar-sanidad', component: ListarSanidadComponent},
    // children: [
    //   { path: 'nueva-sanidad', component: ModalSanidadComponent}
    // ]},
  { path: 'listar-historial', component: ListarHistorialComponent},
  { path: 'nuevo-caso', component: ModalCasoComponent},
  { path:'**', pathMatch:'full', redirectTo:'modal'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
