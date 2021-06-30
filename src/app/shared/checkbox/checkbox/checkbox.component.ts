import { Component, OnInit, Output } from '@angular/core';
  
interface Name{
  name: string;
}


@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  constructor() {
   }

  ngOnInit(): void {
  }
  
}


