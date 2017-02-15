import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-root',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="wrapper">
			<ed-navbar></ed-navbar>
			<div class="outlet-wrapper container-fluid">
				<router-outlet></router-outlet>
			</div>
		</div>
		<ed-footer></ed-footer>
`,
	styles: [`
			.outlet-wrapper {
				padding: 56px 0 0 0;
			}
			.wrapper {
				min-height: 100%;
			}
`]
})
export class AppComponent {
}
