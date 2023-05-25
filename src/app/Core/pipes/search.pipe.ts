import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(books:any[], term:string): any[] {
    return books.filter((book) => book.title.toLowerCase().includes(term.toLowerCase()));
  }

}
