import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  @Input() images: any = [{
    image:['https://material.angular.io/assets/img/examples/shiba2.jpg'],
  }];
}
