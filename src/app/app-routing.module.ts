import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminLayoutComponent } from './Components/Admin/admin-layout/admin-layout.component';
import { CrudAuthorsComponent } from './Components/Admin/crud-authors/crud-authors.component';
import { CrudBooksComponent } from './Components/Admin/crud-books/crud-books.component';
import { CrudCategoryComponent } from './Components/Admin/crud-category/crud-category.component';
import { CrudPublishersComponent } from './Components/Admin/crud-publishers/crud-publishers.component';
import { AdminHomeComponent } from './Components/Admin/Dashboard/admin-home/admin-home.component';
import { OrderDetailsComponent } from './Components/Admin/order-details/order-details.component';
import { ReviewComponent } from './Components/Admin/review/review.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { ArabicBooksComponent } from './Components/User/Arabic-Books/arabic-books/arabic-books.component';
import { AuthorDetailsComponent } from './Components/User/author-details/author-details.component';
import { BookDetailsComponent } from './Components/User/book-details/book-details.component';
import { CartComponent } from './Components/User/Cart/cart/cart.component';
import { OrderNowComponent } from './Components/User/Cart/order-now/order-now.component';
import { ChildrenArabicBooksComponent } from './Components/User/Children-Books/Children-Arabic/children-arabic-books/children-arabic-books.component';
import { ChildrenEnglishBooksComponent } from './Components/User/Children-Books/Children-English/children-english-books/children-english-books.component';
import { EnglishBooksComponent } from './Components/User/English-Books/english-books/english-books.component';
import { HomeComponent } from './Components/User/Home/home/home.component';
import { NewArrivalsComponent } from './Components/User/New-Arrivals/new-arrivals/new-arrivals.component';


import { NotFoundPageComponent } from './Components/User/not-found-page/not-found-page.component';
import { ReviewsComponent } from './Components/User/reviews/reviews.component';
import { AuthGuard } from './Core/guards/auth.guard';
import { HasRoleGuard } from './Core/guards/has-role.guard';
import { ResetPasswordComponent } from './Components/Auth/reset-password/reset-password.component';






const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'new', component: NewArrivalsComponent },
  { path: 'english', component: EnglishBooksComponent },
  { path: 'arabic', component: ArabicBooksComponent },
  { path: 'childrenEnglish', component: ChildrenEnglishBooksComponent },
  { path: 'childrenArabic', component: ChildrenArabicBooksComponent },

  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderNowComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'author/:name', component: AuthorDetailsComponent },
  {path : 'reset',component : ResetPasswordComponent  } ,

  {
    path: 'admin', component: AdminLayoutComponent, canActivate: [HasRoleGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', canActivate: [HasRoleGuard], component: AdminHomeComponent },
      { path: 'crudBooks', canActivate: [HasRoleGuard], component: CrudBooksComponent },
      { path: 'crudAuthors', canActivate: [HasRoleGuard], component: CrudAuthorsComponent },
      { path: 'crudPublishers', canActivate: [HasRoleGuard], component: CrudPublishersComponent },
      { path: 'crudCategory', canActivate: [HasRoleGuard], component: CrudCategoryComponent },
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

