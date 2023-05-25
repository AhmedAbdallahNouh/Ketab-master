import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Publisher } from 'src/app/Core/Models/Publisher';
import { PublishersService } from 'src/app/Core/Services/publishers.service';

@Component({
  selector: 'app-crud-publishers',
  templateUrl: './crud-publishers.component.html',
  styleUrls: ['./crud-publishers.component.css']
})
export class CrudPublishersComponent {
  publishers: Publisher[] = [];
  userForm !: FormGroup
  publisherObj = <Publisher>{}

  constructor(private fb: FormBuilder, private myservice: PublishersService) {
    this.getPublishers()
  }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      location: ['', Validators.required],
      booksName: ['', Validators.required],
    });
  }

  getPublishers() {
    this.myservice.getAllPublishers().subscribe((data) => {
      this.publishers = data
      console.log(this.publishers);
    })
  }

  updatePublisher(publisher: any) {
    this.userForm.patchValue({
      id: publisher.publisherId,
      name: publisher.name,
      location: publisher.location,
      booksName: publisher.booksName
    })
  }

  Edit() {
    let updatePublisher = this.userForm.value;
    for (let i = 0; i < this.publishers.length; i++) {
      if (this.publishers[i].publisherId == updatePublisher.id) {
        this.publishers[i] = updatePublisher

        console.log(updatePublisher.id);
        console.log(this.publishers[i]);

        this.myservice.editPublisher(updatePublisher.id, this.publishers[i]).subscribe((res) => {
          console.log(res);
          this.getPublishers()
          alert("Publisher updated successfully");
          this.userForm.reset()
        })
      }
    }

  }

  addPublisher() {
    this.publisherObj.name = this.userForm.value.name;
    this.publisherObj.location = this.userForm.value.location;

    console.log(this.publisherObj);

    this.myservice.addNewPublisher(this.publisherObj).subscribe((res) => {
      console.log(res);
      this.getPublishers()
      alert("Publisher added successfully");
      this.userForm.reset()
    })
  }

  deletePublisher(id: number) {
    this.myservice.deletePublisher(id).subscribe((res) => {
      console.log(res);
      this.getPublishers()
    })
  }

}
