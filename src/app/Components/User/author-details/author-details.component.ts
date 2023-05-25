import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorsService } from 'src/app/Core/Services/authors.service';


@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent {
  name:any;
  authorDetails:any;
  
  constructor(private authorsService:AuthorsService,private Route:ActivatedRoute){
      this.name = Route.snapshot.paramMap.get('name');
      authorsService.getAuthorDetails(this.name).subscribe((res) =>{
        this.authorDetails = res;
        console.log("id = ",this.name);
        console.log(this.authorDetails);
      })
  }
}
