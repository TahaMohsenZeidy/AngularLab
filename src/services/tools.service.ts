import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Outil } from 'models/outil.model';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  public outilTab: Outil[] = [];

  constructor(private httpClient: HttpClient) {}

  saveTool(outil: Outil): Promise<Outil> {
    return this.httpClient.post<Outil>('http://localhost:4200/api/OUTIL-SERVICE/outils/add', outil).toPromise();
  }

  getToolById(id: string): Promise<Outil> {
    return this.httpClient.get<Outil>('http://localhost:4200/api/OUTIL-SERVICE/outils/'+id).toPromise();
  }

  deleteToolById(id: string): Promise<void> {
    return this.httpClient.delete<void>('http://localhost:4200/api/OUTIL-SERVICE/outils/'+id).toPromise();
  }

  getAllTools(): Promise<Outil[]> {
  return this.httpClient.get<Outil[]>('http://localhost:4200/api/OUTIL-SERVICE/outils').toPromise();
 }

}
