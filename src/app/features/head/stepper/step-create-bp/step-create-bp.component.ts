import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-create-bp',
  templateUrl: './step-create-bp.component.html',
  styleUrls: ['./step-create-bp.component.scss']
})
export class StepCreateBpComponent implements OnInit {
  bpForm!: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    this.bpForm = new FormGroup({
      bonusProgram: new FormControl(null, [Validators.required]),
      bpName: new FormControl(null, [Validators.required]),
      bpPhotos: new FormControl(null, [Validators.required]),
      bpDescription: new FormControl(null, [Validators.required]),
      bpStartDate: new FormControl(null, [Validators.required]),
      bpEndDate: new FormControl(null, [Validators.required]),
      bpLocations: new FormControl(null, [Validators.required]),
      bpSize: new FormControl(null, [Validators.required]),
      bpPrice: new FormControl(null, [Validators.required])
    });
  };

  saveBP() {
    localStorage.setItem('bpFormData', JSON.stringify(this.bpForm.value))
  };
}
