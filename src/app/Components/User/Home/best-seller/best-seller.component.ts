import { Component } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BookService } from 'src/app/Core/Services/book.service';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css']
})
export class BestSellerComponent {
bestSellerBooks:any[] = []

constructor(private bookService:BookService){
    bookService. BestSeller().subscribe((res) => {
    let response = res;
    this.bestSellerBooks = response.slice(0,60);
    console.log(res) ;
});
}

// customOptions: OwlOptions = {
//   stagePadding: 500 ,
//   loop: false,
//   mouseDrag: false,
//   touchDrag: false,
//   pullDrag: false,
//   dots: false,
//   navSpeed: 100,
//   navText: ['<i class="fa-solid fa-angles-left">','<i class="fa-solid fa-angles-right"></i>'],
//   // navText: ['&#8249', '&#8250;'],


// stagePadding: 500 ,
//     loop: false,
//     mouseDrag: false,
//     touchDrag: false,
//     pullDrag: true,
//     dots: false,
//     navSpeed: 600,
//     navText: ['<i class="fa-solid fa-angles-left">','<i class="fa-solid fa-angles-right"></i>'],
//     // navText: ['&#8249', '&#8250;'],
//     responsive: {
//       0: {
//         items: 1 
//       },
//       400: {
//         items: 2
//       },
//       760: {
//         items: 3
//       },
//       1000: {
//         items: 4
//       }
//     },
//     nav: true
//   };

// }



customOptions: OwlOptions = {
  stagePadding: 500 ,
  loop: false ,
  mouseDrag: false,
  touchDrag:true,
  pullDrag: true,
  dots: false,
  navSpeed: 100,
  navText: ['<i class="fa-solid fa-angles-left">','<i class="fa-solid fa-angles-right"></i>'],
  // navText: ['&#8249', '&#8250;'],
  responsive: {
    0: {
      items: 1 
    },
    400: {
      items: 2
    },
    760: {
      items: 3
    },
    1000: {
      items: 4
    }
  },
  nav: true
};
}