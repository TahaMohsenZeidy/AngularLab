import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  public pubTab: Publication[] = [];

  constructor(private httpClient: HttpClient) {}

  savePub(pub: Publication): Promise<Publication> {
    return this.httpClient.post<Publication>('http://localhost:4200/api/PUBLICATION-SERVICE/publication/add', pub).toPromise();
  }

  getPubById(id: string): Promise<Publication> {
    return this.httpClient.get<Publication>('http://localhost:4200/api/PUBLICATION-SERVICE/publication/'+id).toPromise();
  }

  deletePubById(id: string): Promise<void> {
    return this.httpClient.delete<void>('http://localhost:4200/api/PUBLICATION-SERVICE/publication/'+id).toPromise();
  }

  getAllPubs(): Promise<Publication[]> {
  return this.httpClient.get<Publication[]>('http://localhost:4200/api/PUBLICATION-SERVICE/publications').toPromise();
 }

}
