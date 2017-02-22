import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
	selector: '[mathjax]'
})
export class MathJaxDirective {
	@Input('mathjax') data: string;

	constructor(private el: ElementRef) {}

	ngOnChanges() {
		this.el.nativeElement.innerHTML = this.data;
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
	}
}
