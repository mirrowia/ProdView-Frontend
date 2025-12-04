export class Maquina {
    codMaq: string = "";
    descripcion: string = "";
    vIdeal: number = 0;
    graficable: boolean = false;
    tecla: number = 0;

    constructor(init?: Partial<Maquina>) {
    Object.assign(this, init);
  }
}
