import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-index',
  template: `
    <div *ngIf="!auth" class="message">Vous n'êtes pas connecté(e)</div>
    <div *ngIf="auth" class="message">vous êtes connecté(e)</div>
  `
})
export class IndexComponent implements OnInit {

  auth!: boolean;

  constructor(private service: FetchService) {
  }

  ngOnInit() {
    this.service.checkSession().subscribe(res => this.auth = res.message === "nosession" ? false : true);
  }
}
