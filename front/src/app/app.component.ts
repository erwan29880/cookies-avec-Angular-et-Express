import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class AppComponent {
  title = 'front';

  constructor(private route: Router){}

  onAuth() {
    this.route.navigate(['/auth']);
  }

  onIndex() {
    this.route.navigate(['/']);
  }
}
