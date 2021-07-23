import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFavoritesProfile } from '../../../../../shared/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'src/app/core/services/profile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tile-profile',
  templateUrl: './tileProfile.component.html',
  styleUrls: ['./tileProfile.component.scss'],
})
export class TileProfileComponent implements OnInit {
  remoteData: any;

  // @Output() sendId: EventEmitter<any> = new EventEmitter();
  dropId() {
    // this.sendId.emit(this.discount$.id);
  }

  profileFavorite$: Observable<IFavoritesProfile[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profile: ProfileService
  ) {
    this.profileFavorite$ = this.profile.getFavorite();
  }

  setDotts(value: string, limit: number): string {
    return value.length < limit ? '' : '...';
  }

  ngOnInit(): void {}

  redirectToDescription(descriptionId: any): void {
    this.router.navigate([`home/${descriptionId}/description`]);
  }
}
