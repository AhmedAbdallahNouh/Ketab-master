import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

  constructor(private http: HttpClient) { }
  /*Get All Publishers */
  getAllPublishers(): Observable<any> {
    return this.http.get("https://localhost:7248/api/Publisher");
  }

  /*Edit Publisher*/
  editPublisher(id: number, data: any): Observable<any> {
    return this.http.put(`https://localhost:7248/api/Publisher/${id}`, data)
  }

  /*Add New Publisher */
  addNewPublisher(data: any): Observable<any> {
    return this.http.post("https://localhost:7248/api/Publisher", data)
  }

  /*Delete Publisher */
  deletePublisher(id: number): Observable<any> {
    return this.http.delete(`https://localhost:7248/api/Publisher?id=${id}`)
  }
}
