import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, SortDirection} from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { IAppState, VendorStatistic } from "../../../../shared/interfaces";
import { createSelector, select, Store } from "@ngrx/store";
import { StatisticService } from "../../../../core/services/statistic.service";

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
  dataSource: VendorStatistic[] = [];
  statisticVData$: Observable<any>;

  resultsLength = 0;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, {static:false})
  paginator!: MatPaginator;
  @ViewChild(MatSort, {static:false})
  sort!: MatSort;

  constructor(private store: Store<IAppState>,
              private statisticService: StatisticService) {

    const selectStatistic = (state: IAppState) => state.statistic;

    const selectDStatisticVendors = createSelector(
      selectStatistic,
      (state: any) => state.vendors
    );
    this.statisticVData$ = this.store.pipe(select(selectDStatisticVendors));
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.statisticService.getStatisticVendors({
            sortBy: this.sort.active,
            sortDirection: this.sort.direction,
            page: this.paginator.pageIndex
          })
            .pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          this.resultsLength = data.total_count;
          return data;
        })
      ).subscribe(data => this.dataSource = data);
  }
}
