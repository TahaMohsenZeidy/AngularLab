import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  public tab: Member[] = [];

  constructor(private httpClient: HttpClient) {}
  saveMember(member: Member): Promise<Member> {
     return this.httpClient.post<Member>('http://localhost:4200/api/MEMBRE-SERVICE/membres/enseignant', member).toPromise();
    /*const memberToSave = { ...member };
    memberToSave.id = member.id ?? Math.ceil(Math.random() * 10000);
    memberToSave.createdDate = new Date().toISOString();
    this.tab = [
      memberToSave,
      ...this.tab.filter((item) => item.id !== memberToSave.id),
    ];
    return new Promise((resolve) => resolve(memberToSave));*/
  }
  getMemeberById(id: string): Promise<Member> {
     return this.httpClient.get<Member>('http://localhost:4200/api/MEMBRE-SERVICE/membre/'+id).toPromise();
 /*   return new Promise((resolve) =>
      resolve(this.tab.filter((element) => element.id === id)[0] ?? null)
    );*/
  }
  deleteMemberById(id: string): Promise<void> {
     return this.httpClient.delete<void>('http://localhost:4200/api/MEMBRE-SERVICE/membres/'+id).toPromise();
    /*this.tab = this.tab.filter((member) => member.id !== id);
    return new Promise((resolve) => resolve());*/
  }
  getAllMemebers(): Promise<Member[]> {
    return this.httpClient.get<Member[]>('http://localhost:4200/api/MEMBRE-SERVICE/membres').toPromise();
  }
}
