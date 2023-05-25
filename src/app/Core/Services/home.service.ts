import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  /*Get All Authors */
  getAllAuthors(): Observable<any> {
    return this.http.get("https://localhost:7248/api/Authors");
  }

  /*Get All Publishers */
  getAllPublishers(): Observable<any> {
    return this.http.get("https://localhost:7248/api/Publisher");
  }

  /*Get Sub Category */
  getAllCategories(): Observable<any> {
    return this.http.get("https://localhost:7248/api/Category");
  }

  /*Get Books */
  getAllBooks(): Observable<any> {
    return this.http.get("https://localhost:7248/api/books");
  }

  /*Get Total Price */
  getTotalPrice(): Observable<any> {
    return this.http.get(" https://localhost:7248/api/books/sumAllPrice");
  }

}
