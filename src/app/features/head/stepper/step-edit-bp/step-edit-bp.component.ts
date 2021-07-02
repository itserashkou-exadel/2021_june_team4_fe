import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-edit-bp',
  templateUrl: './step-edit-bp.component.html',
  styleUrls: ['./step-edit-bp.component.scss']
})
export class StepEditBpComponent implements OnInit {
  visible: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  addBP(): boolean {
    return this.visible = !this.visible;
  }
}
