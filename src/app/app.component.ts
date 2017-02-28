import {
	Component, ChangeDetectionStrategy, ViewContainerRef
} from '@angular/core';

@Component({
	selector: 'app-root',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="site-wrapper">
			<ed-navbar></ed-navbar>
			<div class="outlet-wrapper">
				<router-outlet></router-outlet>
			</div>
		</div>
		<ed-footer></ed-footer>
`,
	styles: [`
			.outlet-wrapper {
				padding: 55px 0 0 0;
			}
			.site-wrapper {
				min-height: 100%;
			}
`]
})
export class AppComponent {
	constructor() {
	}
}
