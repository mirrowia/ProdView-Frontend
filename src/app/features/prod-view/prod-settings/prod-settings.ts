import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Maquina } from 'app/models/maquina';
import { Servidor } from 'app/models/servidor';
import { ServidorSetting } from "./servidor-setting/servidor-setting";
import { MaquinaSetting } from "./maquina-setting/maquina-setting";

@Component({
  selector: 'app-prod-settings',
  imports: [ServidorSetting, MaquinaSetting],
  templateUrl: './prod-settings.html',
  styleUrl: './prod-settings.css',
})
export class ProdSettings {

  activeTab: 'servidor' | 'maquina' = 'servidor';

}
