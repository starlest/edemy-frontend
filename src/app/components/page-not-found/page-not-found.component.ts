import {Component} from '@angular/core';

@Component({
  selector: "ed-page-not-found",
  template: `
      <h1 class="error">
        ERROR 404: Ooops... There is nothing here! <i class="fa fa-frown-o"
                                           aria-hidden="true"></i>
      </h1>
`,
  styles: [
    `
      .error {
          text-align: center;
          margin-top: 50px;
      }
`
  ]
})
export class PageNotFoundComponent {
}
