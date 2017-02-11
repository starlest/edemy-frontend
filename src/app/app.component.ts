import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-root',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ed-navbar></ed-navbar>
		<div class="router-outlet-wrapper">
		<router-outlet></router-outlet>
		</div>
`,
	styles: [`
	.router-outlet-wrapper {
		padding-top: 64px;
	}
`]
})
export class AppComponent {
}
