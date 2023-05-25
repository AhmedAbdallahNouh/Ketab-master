import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-children-arabic-book-item',
  templateUrl: './children-arabic-book-item.component.html',
  styleUrls: ['./children-arabic-book-item.component.css']
})
export class ChildrenArabicBookItemComponent {
  @Input() arabicBooks:any[] = [];
  @Input() term:string= '';
  @Output() item = new EventEmitter();
}
