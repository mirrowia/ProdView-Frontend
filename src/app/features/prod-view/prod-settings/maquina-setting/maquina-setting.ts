import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Maquina } from 'app/models/maquina';
import { Servidor } from 'app/models/servidor';
import { MaquinasService } from 'app/services/maquinas';
import { ServidoresService } from 'app/services/servidores';

@Component({
  selector: 'app-maquina-setting',
  imports: [FormsModule, CommonModule],
  templateUrl: './maquina-setting.html',
  styleUrl: './maquina-setting.css',
})
export class MaquinaSetting implements OnInit {


  maquina: Maquina = new Maquina();

  maquinas: Maquina[] = [];

  maquinaSeleccionada: Maquina = new Maquina();

  servidores: Servidor[] = [];

  constructor(private maquinaService: MaquinasService, private servidoresService: ServidoresService){}

  ngOnInit(): void {
    this.cargarServidores();
  }

  onMaquinaChange(seleccion: Maquina) {
    
    if (!seleccion || !seleccion.codMaq) {
      // Reiniciar el formulario
      this.maquina = new Maquina();
      this.maquinaSeleccionada = new Maquina();
      return;
    }    

    // Clonar para evitar mutaciones
    this.maquina = { ...seleccion };
  }

  cargarServidores(): void {
    this.servidoresService.getServidores().subscribe((servidores: Servidor[]) => {
      this.servidores = servidores 
      this.cargarMaquinas();
    });    
  }

  cargarMaquinas(): void {
    this.maquinas = []
    this.servidores.forEach(servidor => {
      this.maquinaService.getMaquinas(servidor.codigo).subscribe((maquinas: Maquina[]) => {
      this.maquinas = [...this.maquinas, ...maquinas];
      this.maquinas = this.maquinas.sort((a, b)=> a.descripcion.localeCompare(b.descripcion))        
      });      
    });
  }

  updateMaquina() {
    
    if (this.maquinaSeleccionada) {
      if (!this.maquinaSeleccionada.codMaq) {
      console.warn("No hay un maquina seleccionado");
      return;
      }      

    this.maquinaService.updateMaquina(this.maquinaSeleccionada.codMaq, this.maquina)
      .subscribe({
        next: (resp) => {
          console.log("Maquina actualizada:", resp)
          window.location.reload();
        },
        error: (err) => console.error("Error actualizando maquina:", err)
      });
    }
    
  }

}
