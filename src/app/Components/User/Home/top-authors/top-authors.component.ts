import { Component } from '@angular/core';
import { AuthorsService } from 'src/app/Core/Services/authors.service';

@Component({
  selector: 'app-top-authors',
  templateUrl: './top-authors.component.html',
  styleUrls: ['./top-authors.component.css']
})
export class TopAuthorsComponent {

  authors: any[] = [];
  topAuthors: any;
  constructor(authorService: AuthorsService) {


    authorService.getTopAuthors().subscribe((data) => {
      this.authors = data ;
      this.topAuthors = this.authors ;

    })

  }

}
