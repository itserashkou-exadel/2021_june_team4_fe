import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { API_URL } from 'src/app/shared/constants';

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
  exampleDatabase!: ExampleHttpDatabase;
  data: GithubIssue[] = [];

  resultsLength = 0;
  isLoadingResults = false; // spinner
  isRateLimitReached = false;

  @ViewChild(MatPaginator, {static:false})
  paginator!: MatPaginator;
  @ViewChild(MatSort, {static:false})
  sort!: MatSort;

  constructor(private _httpClient: HttpClient, ) {}

  ngOnInit(): void {
    const requestUrl = API_URL + `/statistics/vendors`;
    this._httpClient.get<any>(requestUrl).subscribe(
      data => this.data = data
    );

  }

  ngAfterViewInit() {

    // this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // // If the user changes the sort order, reset back to the first page.
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       this.isLoadingResults = true;
    //       return this.exampleDatabase!.getRepoIssues(
    //           this.sort.active, this.sort.direction, this.paginator.pageIndex)
    //         .pipe(catchError(() => observableOf(null)));
    //     }),
    //     map(data => {
    //       // Flip flag to show that loading has finished.
    //       this.isLoadingResults = false;
    //       this.isRateLimitReached = data === null;

    //       if (data === null) {
    //         return [];
    //       }

    //       // Only refresh the result length if there is new data. In case of rate
    //       // limit errors, we do not want to reset the paginator to zero, as that
    //       // would prevent users from re-triggering requests.
    //       this.resultsLength = data.total_count;
    //       return data.items;
    //     })
    //   ).subscribe(data => this.data = data);
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  numberOfGettingPromo: number;
  name: string;
  discountsNumber: number;
  viewNumber: number;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<GithubApi> {
    const requestUrl = API_URL + `/statistics/vendors`;
    return this._httpClient.get<any>(requestUrl);
  }
}
