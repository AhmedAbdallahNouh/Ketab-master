import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private dataToSend:any;
  sharedValue = new Subject();
  navBarCartLenght = new Subject();

  constructor() { }

  setData(data:any):void{
    this.dataToSend = data;
  }

  getData():any{
    return this.dataToSend;
  }
}
