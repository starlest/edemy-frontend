import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as worksheets from '../actions/worksheets.actions';
import { of } from 'rxjs/observable/of';
import { WorksheetsService } from '../services/';
import { Worksheet } from '../models';

@Injectable()
export class WorksheetsEffects {
	constructor(private actions$: Actions,
	            private worksheetsService: WorksheetsService) {
	}

	@Effect()
	loadWorksheets$: Observable<Action> = this.actions$
	  .ofType(worksheets.ActionTypes.LOAD)
	  .switchMap(() =>
		this.worksheetsService.get()
		  .map((results: Worksheet[]) => {
			  results.forEach(worksheet => {
				  worksheet.DownloadButton =
					`<a class="btn btn-sm btn-primary" href="${worksheet.DownloadLink}" target="_blank">
Download</a>`
			  });
			  return new worksheets.LoadSuccessAction(results)
		  })
		  .catch(error => of(new worksheets.LoadFailAction()))
	  );
}
