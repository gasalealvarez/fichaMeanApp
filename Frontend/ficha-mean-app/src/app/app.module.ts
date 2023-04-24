import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule  } from '@angular/common/http'

import localeEs  from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

import { ListarPacientesComponent } from './components/listar-pacientes/listar-pacientes.component';
import { ListarPropietariosComponent } from './components/listar-propietarios/listar-propietarios.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SelectorComponent } from './components/selector/selector.component';
import { EntradaComponent } from './components/entradas/entrada/entrada.component';
import { NuevaEntradaComponent } from './components/entradas/nueva-entrada/nueva-entrada.component';
import { ListarSanidadComponent } from './components/listar-sanidad/listar-sanidad.component';
import { ListarHistorialComponent } from './components/listar-historial/listar-historial.component';
import { ModalItemsComponent } from './modals/modal-items/modal-items.component';
import { ModalCasoComponent } from './modals/modal-caso/modal-caso.component';
import { WebcamModule } from 'ngx-webcam';
import { CamaraComponent } from './components/widgets/camara/camara.component';
import { ToastComponent } from './components/widgets/toast/toast.component';
import { ConfirmDialogComponent } from './components/widgets/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './services/confirm-dialog.service';
import { ArchivosComponent } from './components/archivos/archivos.component';



@NgModule({
  declarations: [
    AppComponent,
    ListarPacientesComponent,
    ListarPropietariosComponent,
    NavbarComponent,
    SelectorComponent,
    EntradaComponent,
    NuevaEntradaComponent,
    ListarSanidadComponent,
    ListarHistorialComponent,
    ModalItemsComponent,
    ModalCasoComponent,
    CamaraComponent,
    ToastComponent,
    ConfirmDialogComponent,
    ArchivosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgbModule, 
    WebcamModule,
    HttpClientModule, 
    ToastrModule.forRoot(),
  ],
  providers: [{provide: LOCALE_ID, useValue:'es'}, ConfirmDialogService],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmDialogComponent ],
})
export class AppModule { }
