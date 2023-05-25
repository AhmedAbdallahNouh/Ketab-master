import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/Core/Models/Category';
import { CategoryService } from 'src/app/Core/Services/category.service';

@Component({
  selector: 'app-crud-category',
  templateUrl: './crud-category.component.html',
  styleUrls: ['./crud-category.component.css']
})
export class CrudCategoryComponent {
  categories: Category[] = []
  userForm !: FormGroup
  categoryObj = <Category>{}

  constructor(private fb: FormBuilder, private myservice: CategoryService) {
    this.getCategories()
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  getCategories() {
    this.myservice.getAllCategories().subscribe((data) => {
      this.categories = data
    })
  }

  addCategory() {
    this.categoryObj.name = this.userForm.value.name

    console.log(this.categoryObj);

    this.myservice.addNewCategory(this.categoryObj).subscribe((res) => {
      console.log(res);
      this.getCategories()
      alert("Category added successfully");
      this.userForm.reset()
    })
  }

  updateCategory(category: any) {
    this.userForm.patchValue({
      id: category.categoryId,
      name: category.name
    })
  }

  Edit() {
    let updateCategory = this.userForm.value;
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].categoryId == updateCategory.id) {
        this.categories[i] = updateCategory
        this.myservice.editCategory(updateCategory.id, this.categories[i]).subscribe((res) => {
          console.log(res);
          this.getCategories()
          alert("Author updated successfully");
          this.userForm.reset()
        })
      }
    }

  }


  deleteCategory(id: number) {
    this.myservice.deleteCategory(id).subscribe((res) => {
      console.log(res);
      this.getCategories()
      alert("deleted");
    })
  }
}
