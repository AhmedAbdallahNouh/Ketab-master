import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private http: HttpClient) { }
  getTopAuthors(): Observable<any> {
    return this.http.get("https://localhost:7248/api/Authors");

  }

  getAuthorDetails(name: any): Observable<any> {
    return this.http.get(`https://localhost:7248/api/Authors/${name}`);
  }

  /*Get All Authors */
  getAllAuthors(): Observable<any> {
    return this.http.get("https://localhost:7248/api/Authors");
  }

  // Edit Author
  editAuthor(id: number, data: any): Observable<any> {
    return this.http.put(`https://localhost:7248/api/Authors/${id}`, data)
  }

  /*Add New Author */
  addNewAuthor(data: any): Observable<any> {
    return this.http.post("https://localhost:7248/api/Authors", data)
  }

  /*Delete Author */
  deleteAuthor(id: number): Observable<any> {
    return this.http.delete(`https://localhost:7248/api/Authors?id=${id}`)
  }

}
