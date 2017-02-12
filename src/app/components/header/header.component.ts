import { Component, Input } from '@angular/core';

@Component({
	selector: 'ed-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	@Input() title: string;
}
