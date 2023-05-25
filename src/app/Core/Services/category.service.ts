import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /*Get All Categories */
  getAllCategories(): Observable<any> {
    return this.http.get("https://localhost:7248/api/Category");
  }

  /*Add New Category */
  addNewCategory(data: any): Observable<any> {
    return this.http.post("https://localhost:7248/api/Category", data);
  }

  /*Edit Category */
  editCategory(id: number, data: any): Observable<any> {
    return this.http.put(`https://localhost:7248/api/Category?id=${id}`, data, { responseType: 'text' })
  }

  /* Delete Category */
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`https://localhost:7248/api/Category?id=${id}`);
  }
}
