import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { ICategory, ITag } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-step-create-bp',
  templateUrl: './step-create-bp.component.html',
  styleUrls: ['./step-create-bp.component.scss']
})
export class StepCreateBpComponent implements OnInit {
  bpForm!: FormGroup;

  categories$: Observable<ICategory[]>;
  tags$: Observable<ITag[]>;
  
  constructor( private categoriesService: CategoriesService,
               private tagsService: TagsService ) 
  { 
    this.categories$ = this.categoriesService.getCategories();
    this.tags$ = this.tagsService.getTags();
  }

  ngOnInit(): void {
    this.bpForm = new FormGroup({
      bonusProgram: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      tag: new FormControl(null, [Validators.required]),
      bpName: new FormControl(null, [Validators.required]),
      bpPhotos: new FormControl(null, [Validators.required]),
      bpDescription: new FormControl(null, [Validators.required]),
      bpStartDate: new FormControl(null, [Validators.required]),
      bpEndDate: new FormControl(null, [Validators.required]),
      bpSize: new FormControl(null, [Validators.required]),
      bpPrice: new FormControl(null, [Validators.required])
    });
  };

  saveBP() {
    localStorage.setItem('bpFormData', JSON.stringify(this.bpForm.value))
  };
}
