import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';


export interface Task {
  name: string;
  selected: boolean;
  color: ThemePalette;
}

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit{
 
  ngOnInit(){}

  task: Task[] = [
    {
      name: 'Home',
      selected: false,
      color: 'primary',
    },
    {
      name: 'Food',
      selected: false,
      color: 'primary',
    },
    {
      name: 'Clothes',
      selected: false,
      color: 'primary',
    },
    {
      name: 'Travel',
      selected: false,
      color: 'primary',
    },
    {
      name: 'Devices',
      selected: false,
      color: 'primary',
    },
  ];
}