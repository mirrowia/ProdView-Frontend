import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepositoService {

  private base = environment.apiBaseUrlOps;

  constructor(private http: HttpClient) {}

  restartGdm(ip: string): Observable<any> {
    return this.http.post(`${this.base}/restart-gdm?ip=${ip}`, {});
  }

  restartOs(ip: string): Observable<any> {
    return this.http.post(`${this.base}/restart-os?ip=${ip}`, {});
  }

  restartService(service: string): Observable<any> {
    return this.http.get(`${this.base}/pc-camaras/restart-service?ip=${service}`, {});
  }
}
