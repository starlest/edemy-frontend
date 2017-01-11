import {Component, NgZone} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = "Home";
  windowWidth: any;

  constructor(private router: Router,
              private ngZone: NgZone) {
    this.windowWidth = window.innerWidth;
    window.onresize = (e) => {
      ngZone.run(() => {
        this.windowWidth = window.innerWidth;
      });
    };
  }

  shouldSideNavBeHidden(): boolean {
    return this.windowWidth > 1600;
  }

  currentSideNavMode(): string {
    return this.windowWidth > 1600 ? 'side' : 'over';
  }
}
