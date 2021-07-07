import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-edit-bp',
  templateUrl: './step-edit-bp.component.html',
  styleUrls: ['./step-edit-bp.component.scss']
})
export class StepEditBpComponent implements OnInit {
  activeComponent: string = 'edit';
  
  constructor() { }

  ngOnInit(): void {
  }

}
