import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, SortDirection} from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { IAppState, VendorStatistic } from "../../../../shared/interfaces";
import { createSelector, select, Store } from "@ngrx/store";
import { StatisticService } from "../../../../core/services/statistic.service";
import {MatTableDataSource} from "@angular/material/table";

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})

export class StatisticComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['name', 'discountsNumber', 'viewNumber','numberOfGettingPromo'];
  // dataSourceVendors: VendorStatistic[] = [];
  // statisticVData$: Observable<any>;

  resultsLength = 0;
  isRateLimitReached = false;

  dataSourceVendors: MatTableDataSource<VendorStatistic>;
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator!: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort!: MatSort;

  // @ViewChild(MatPaginator, {static:false})
  // paginator!: MatPaginator;
  // @ViewChild(MatSort, {static:false})
  // sort!: MatSort;

  constructor(private store: Store<IAppState>,
              private statisticService: StatisticService) {
    this.dataSourceVendors = new MatTableDataSource;
  }

  ngOnInit(): void {
    // this.dataSourceVendors.paginator = this.tableOnePaginator;
    // this.dataSourceVendors.sort = this.tableOneSort;
    this.dataSourceVendors.paginator = this.tableOnePaginator;
    this.dataSourceVendors.sort = this.tableOneSort;

    this.tableOneSort.sortChange.subscribe(() => this.tableOnePaginator.pageIndex = 0);

    merge(this.tableOneSort.sortChange, this.tableOnePaginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          console.log( 'page:', this.tableOnePaginator.pageIndex)
          return this.statisticService.getStatisticVendors({
            sortBy: this.tableOneSort.active,
            sortDirection: this.tableOneSort.direction,
            page: this.tableOnePaginator.pageIndex
          })
            .pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          this.resultsLength = data.total_count;
          return data.items;
        })
      ).subscribe(data => this.dataSourceVendors = data);
  }

  ngAfterViewInit() {

  }
}
