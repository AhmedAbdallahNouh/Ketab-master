import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/Core/Models/Author';
import { AuthorsService } from 'src/app/Core/Services/authors.service';


@Component({
  selector: 'app-crud-authors',
  templateUrl: './crud-authors.component.html',
  styleUrls: ['./crud-authors.component.css']
})

export class CrudAuthorsComponent {

  authors: Author[] = [];
  userForm !: FormGroup
  authorObj = <Author>{}

  constructor(private fb: FormBuilder,
    private myservice: AuthorsService
  ) {
    this.getAuthors()
  }


  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      image: ['', Validators.required],
      bio: ['', Validators.required]
    });
  }


  imgurl: string = " "
  selectImage(e: any) {
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (event: any) => {
        this.imgurl = event.target.result;
        console.log(this.imgurl);
        this.userForm.get('image')?.setValue(this.imgurl)
        console.log(this.imgurl);
      }
    }
  }

  getAuthors() {
    this.myservice.getAllAuthors().subscribe((data) => {
      this.authors = data
      console.log(this.authors);
    })
  }

  addAuthor() {
    this.authorObj.firstname = this.userForm.value.firstname;
    this.authorObj.lastname = this.userForm.value.lastname;
    this.authorObj.image = this.userForm.value.image;
    this.authorObj.bio = this.userForm.value.bio;

    console.log(this.authorObj);

    this.myservice.addNewAuthor(this.authorObj).subscribe((res) => {
      console.log(res);
      this.getAuthors()
      alert("Author added successfully");
      this.userForm.reset()
    })
  }

  updateAuthor(author: any) {
    this.userForm.patchValue({
      id: author.authorId,
      firstname: author.firstname,
      lastname: author.lastname,
      bio: author.bio,
      image: author.image
    })
    this.imgurl = author.image
  }

  Edit() {
    let updateAuthor = this.userForm.value;
    for (let i = 0; i < this.authors.length; i++) {
      if (this.authors[i].authorId == updateAuthor.id) {
        this.authors[i] = updateAuthor

        console.log(updateAuthor.id);
        console.log(this.authors[i]);
        // console.log(this.authors[i].authorId);

        this.myservice.editAuthor(updateAuthor.id, this.authors[i]).subscribe((res) => {
          console.log(res);
          this.getAuthors()
          alert("Author updated successfully");
          this.userForm.reset()
        })
      }
    }

  }



  deleteAuthor(id: number) {
    this.myservice.deleteAuthor(id).subscribe((res) => {
      console.log(res);
      alert("deleted")
      this.getAuthors()
    })
  }
}
