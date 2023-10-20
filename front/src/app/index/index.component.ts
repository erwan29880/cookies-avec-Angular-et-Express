import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-index',
  template: `
    <div *ngIf="auth">connecté !</div>
    <div *ngIf="!auth">pas connecté !</div>
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
