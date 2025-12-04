import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Servidor } from 'app/models/servidor';
import { ServidoresService } from 'app/services/servidores';

@Component({
  selector: 'app-servidor-setting',
  imports: [FormsModule, CommonModule],
  templateUrl: './servidor-setting.html',
  styleUrl: './servidor-setting.css',
})
export class ServidorSetting implements OnInit {

  servidor: Servidor = new Servidor();

  servidorSeleccionado: Servidor = new Servidor();

  servidores: Servidor[] = [];

  constructor(private servidoresService: ServidoresService) {}

  ngOnInit(): void {
    this.cargarServidores();    
  }

  onServidorChange(seleccion: Servidor) {

    if (!seleccion || !seleccion.codigo) {
      // Reiniciar el formulario
      this.servidor = new Servidor();
      this.servidorSeleccionado = new Servidor();
      return;
    }    

    // Clonar para evitar mutaciones
    this.servidor = { ...seleccion };    
  }

  cargarServidores(): void {
    this.servidoresService.getServidores().subscribe((servidores: Servidor[]) => {
      this.servidores = servidores.sort((a, b) => a.codigo.localeCompare(b.codigo))
    });
  }

  updateServidor() {
    if (this.servidorSeleccionado) {
      if (!this.servidorSeleccionado.codigo) {
      console.warn("No hay un servidor seleccionado");
      return;
      }

      this.servidoresService.updateServidor(this.servidorSeleccionado.codigo, this.servidor)
      .subscribe({
        next: (resp) => {
          console.log("Servidor actualizado:", resp)
          window.location.reload();
        },
        error: (err) => console.error("Error actualizando servidor:", err)
      });
    }
  }

}
