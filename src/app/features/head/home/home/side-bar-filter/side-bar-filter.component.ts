 import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-side-bar-filter',
  templateUrl: './side-bar-filter.component.html',
  styleUrls: ['./side-bar-filter.component.scss'],
  
})


export class SideBarFilterComponent implements OnInit {
 
  filterForm: FormGroup;
  filterConfig: any;

  constructor() {

    this.filterForm = new FormGroup({
      cathegory : new FormControl('Fashion'),
      cities: new FormControl('Kyiv'),
    })

    this.filterConfig = {
      cathegories: ['Food', 'Fashion', 'Gadgets'],
      cities: ['Kyiv','Lviv','Odessa'],
    }
    //const cathegories=

  }

  ngOnInit(): void {
    
    
  }

  selectCathegory(){
    const cathegoryValue = this.filterForm.get('cathegory')?.value;

    console.log(this.filterConfig);
  }
}
