import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-arabic-book-item',
  templateUrl: './arabic-book-item.component.html',
  styleUrls: ['./arabic-book-item.component.css']
})
export class ArabicBookItemComponent {
  @Input() arabicBooks:any[] = [];
  @Input() term:string= '';
  @Output() item = new EventEmitter();
}
