import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FetchService } from '../fetch.service';
import { Modele } from '../modele';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.html'
})
export class AuthComponent implements OnInit{

  message!: Modele;
  form!: FormGroup;


  constructor(private service: FetchService, private formBuilder: FormBuilder) {
    this.service.checkSession().subscribe(res => this.message = res);    
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
        pseudo : new FormControl("pseudo"),
        pwd: new FormControl("pwd")
    })
  }

  onSubmit(){
    this.service.login(this.form.value).subscribe(res => this.message = res);
  }

  onLogout() {
    this.service.logout().subscribe(res => this.message = res);
  }

}
