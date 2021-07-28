import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { IAppState, VendorStatistic } from "../../../../shared/interfaces";
import { Store } from "@ngrx/store";
import { StatisticService } from "../../../../core/services/statistic.service";
import { MatTableDataSource } from "@angular/material/table";
import { ChartDataSets, ChartOptions, ChartType} from "chart.js";
import { Label } from "ng2-charts";

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})

export class StatisticComponent implements AfterViewInit, OnInit {
  panelOpenState = false;

  displayedColumns: string[] = ['name', 'discountsNumber', 'viewNumber','numberOfGettingPromo'];
  resultsLength = 0;
  isRateLimitReached = false;
  dataSourceVendors: MatTableDataSource<VendorStatistic>;
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator!: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort!: MatSort;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  labels:Observable<any>[] = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Number of discount views' }
  ];
  chartColors: any[] = [{ backgroundColor: "#40bfef" }];

  constructor(private store: Store<IAppState>,
              private statisticService: StatisticService) {
    this.dataSourceVendors = new MatTableDataSource;
  }

  ngOnInit(): void {
    this.dataSourceVendors.paginator = this.tableOnePaginator;
    this.dataSourceVendors.sort = this.tableOneSort;

    this.tableOneSort.sortChange.subscribe(() => this.tableOnePaginator.pageIndex = 0);

    merge(this.tableOneSort.sortChange, this.tableOnePaginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
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

    this.statisticService.getStatisticDiscounts().subscribe(res => {
      let labels = res.items.map((el:any)=>{
        return el.name;
      })
      let barData = res.items.map((el:any)=>{
        return el.viewNumber;
      })
      this.barChartLabels.push(...labels);
      this.barChartData[0].data!.push(...barData);
    });

  }

  ngAfterViewInit() {}
}
