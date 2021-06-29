import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

interface Config {
  heroesUrl: string;
  textfile: string;
  date: any;
}

@Injectable()

export class ConfigService {
  rd: any;

  

  constructor(private http: HttpClient) {
    interface options {}

    this.rd = {
      heroesUrl: 'api/heroes',
      textfile: 'assets/textfile.txt',
      date: '2020-01-29',
    };

    
  }

  getConfig() {

    const res = this.http.get<Config>(this.rd);
    return 
  }
}
