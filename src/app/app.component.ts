import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.http.request(
      'http://sample-env-3.etaufnmjkp.ap-southeast-1.elasticbeanstalk.com/api/values')
      .subscribe((res: Response) => {
        this.title = res.json();
      });
  }
}
