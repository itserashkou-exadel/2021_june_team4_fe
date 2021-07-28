
import { OnInit, Component } from '@angular/core';
import { ProfileService } from '../../../../../core/services/profile.service';
import { Observable } from 'rxjs';
import { IFavoritesProfile } from '../../../../../shared/interfaces';
import { map } from 'rxjs/operators';
import { HomeService } from '../../../../../core/services/home.service';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {

  displayHistory: string[] = ['Name', 'Promo', 'EndDate'];
  profileCoupons$!: Observable<IFavoritesProfile[]>;
  //dataSource: IFavoritesProfile[] = new MatTableDataSource(this.profileCoupons$);

  constructor(
    private profile: ProfileService,
    public homeService: HomeService
  ) {}


  // @ViewChild(MatSort) sort!: MatSort;

  // ngAfterViewInit() {
  //   // this.data.sort = this.sort;
  // }

  ngOnInit(): void {
    this.profileCoupons$ = this.profile.getCoupons().pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
