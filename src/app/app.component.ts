import {Component, NgZone, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  windowWidth: any;

  constructor(private router: Router,
              private ngZone: NgZone) {
    this.windowWidth = window.innerWidth;
    window.onresize = () => {
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
