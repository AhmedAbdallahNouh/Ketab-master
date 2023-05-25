import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  testQuantity:any[]=[];
  constructor(private http: HttpClient) { }

  getNewArrivalBooks(): Observable<any> {
    return this.http.get("https://localhost:7248/api/books/getByNewArrival") ;

  }

  BestSeller(): Observable<any> {
    return this.http.get("https://localhost:7248/api/bookBestSeller") ;
  }

  getBookDetails(id: any): Observable<any> {
    return this.http.get(`https://localhost:7248/api/books/${id}`);
  }

  getAllEnglishBooks():Observable<any>{
    return this.http.get(`https://localhost:7248/api/books/getByMainCategory?getByMainCategory=English`);
  }

getEnglishBooksCategories(name:string):Observable<any>{
  return this.http.get(
    `https://localhost:7248/api/books/getByMainCategoryByCategoryname?MainCategory=English&Categoryname=${name}`)
}

getAllArabicBooks():Observable<any>{
  return this.http.get(`https://localhost:7248/api/books/getByMainCategory?getByMainCategory=Arabic`);
}

getArabicBooksCategories(name:string):Observable<any>{
return this.http.get(
  `https://localhost:7248/api/books/getByMainCategoryByCategoryname?MainCategory=Arabic%20&Categoryname=${name}`)
}


getAllArabicChildEBooks():Observable<any>{
  return this.http.get(`https://localhost:7248/api/books/getByMainCategory?getByMainCategory=Children Arabic`);
}

getAllEnglishChildEBooks():Observable<any>{
  return this.http.get(`https://localhost:7248/api/books/getByMainCategory?getByMainCategory=Children Arabic`);
}

getChildEBooksCategories(name:string):Observable<any>{
  return this.http.get(
    `https://localhost:7248/api/books/getByMainCategoryByCategoryname?MainCategory=ChildE&Categoryname=${name}`)
  }



  getAllReview():Observable<any>{
  return this.http.get(`https://localhost:7248/api/Review/getAll`);
}


getAllChildABooks():Observable<any>{
  return this.http.get(`https://localhost:7248/api/books/getByMainCategory?getByMainCategory=ChildA`);
}



getChildABooksCategories(name:string):Observable<any>{
  return this.http.get(
    `https://localhost:7248/api/books/getByMainCategoryByCategoryname?MainCategory=ChildA&Categoryname=${name}`)
  }

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


  //Add New Book
  addNewBook(data: any): Observable<any> {
    return this.http.post("https://localhost:7248/api/books", data);
  }

  //Edit Book/
  editBook(id: number, data: any): Observable<any> {
    return this.http.put(`https://localhost:7248/api/books/${id}`, data);
  }

  /*Delete Book */
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`https://localhost:7248/api/books/${id}`);
  }

}
