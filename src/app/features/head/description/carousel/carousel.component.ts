import {Component, Input} from '@angular/core';
import { IDescription } from "../../../../shared/interfaces";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  @Input() images: any = {
    img:['https://material.angular.io/assets/img/examples/shiba2.jpg'],
  };
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

}
