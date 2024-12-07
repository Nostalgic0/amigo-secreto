import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  public GetAmigoSecreto(body: any){
    return this.http.post<any>(this.url + '/GetAmigoSecreto', body,{
      responseType: 'json',
    });
  }
}
