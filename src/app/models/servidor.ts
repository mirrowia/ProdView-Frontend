export class Servidor {
  codigo: string = '';
  nombre: string = '';
  direccionIp: string = '';
  puerto: number = 0;
  habilitado: boolean = true;

  constructor(init?: Partial<Servidor>) {
    Object.assign(this, init);
  }
}