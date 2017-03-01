import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quiz } from '../../../models';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';

@Component({
	selector: 'ed-admin-quizzes',
	templateUrl: 'admin-quizzes.component.html',
	styleUrls: ['admin-quizzes.component.scss']
})
export class AdminQuizzesComponent {
	quizzesSubscription: Subscription;

	data: Array<Quiz> = [];
	rows: Array<any> = [];

	columns: Array<any> = [
		{
			title: 'Subject',
			name: 'Subject',
			filtering: { filterString: '', placeholder: 'Filter' }
		},
		{
			title: 'Levels',
			name: 'Levels',
			filtering: { filterString: '', placeholder: 'Filter' }
		},
		{
			title: 'Title',
			name: 'Title',
			filtering: { filterString: '', placeholder: 'Filter' }
		},
		{
			title: 'Description',
			name: 'Description',
			sort: false
		},
		{
			title: 'Tutor',
			name: 'Tutor',
			filtering: { filterString: '', placeholder: 'Filter' }
		}
	];

	tableConfig: any = {
		paging: true,
		sorting: {
			columns: [this.columns[4], this.columns[1], this.columns[0],
				this.columns[2]]
		},
		className: ['table-striped', 'table-bordered', 'table-hover']
	};

	paginationConfig: any = {
		page: 1,
		itemsPerPage: 10,
		maxSize: 5,
		numPages: 1,
		length: null,
	};

	constructor(private store: Store<fromRoot.State>,
	            private ref: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.quizzesSubscription =
		  this.store.select(fromRoot.getQuizzes)
			.map(quizzes => {
				this.data = quizzes;
				this.paginationConfig.length = quizzes.length;
				this.onChangeTable(this.tableConfig);
				this.ref.detectChanges();
			})
			.subscribe();
	}

	ngOnDestroy() {
		if (this.quizzesSubscription)
			this.quizzesSubscription.unsubscribe();
	}

	changePage(page: any, data: Array<any> = this.data): Array<any> {
		let start = (page.page - 1) * page.itemsPerPage;
		let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) :
		  data.length;
		return data.slice(start, end);
	}

	changeSort(data: any, config: any): any {
		if (!config.sorting)
			return data;

		let columns = config.sorting.columns || [];
		let columnName: string = null;
		let sort: string = null;

		for (let i = 0; i < columns.length; i++) {
			if (columns[i].sort !== '' && columns[i].sort !== false) {
				columnName = columns[i].name;
				sort = columns[i].sort;
			}
		}

		if (!columnName)
			return data;

		return data.sort((previous: any, current: any) => {
			if (previous[columnName] > current[columnName]) {
				return sort === 'desc' ? -1 : 1;
			} else if (previous[columnName] < current[columnName]) {
				return sort === 'asc' ? -1 : 1;
			}
			return 0;
		});
	}

	changeFilter(data: any): any {
		let filteredData: Array<any> = data;
		this.columns.forEach((column: any) => {
			if (column.filtering) {
				filteredData = filteredData.filter(
				  (item: any) => String(item[column.name]).match(
					column.filtering.filterString)
				);
			}
		});
		return filteredData;
	}

	onChangeTable(config: any, page: any = {
		page: this.paginationConfig.page,
		itemsPerPage: this.paginationConfig.itemsPerPage
	}): any {
		if (config.sorting)
			Object.assign(this.tableConfig.sorting, config.sorting);

		let filteredData = this.changeFilter(this.data);
		let sortedData = this.changeSort(filteredData, this.tableConfig);
		this.rows = page && config.paging ? this.changePage(page, sortedData) :
		  sortedData;
		this.paginationConfig.length = sortedData.length;
	}

	public onCellClick(data: any): any {
		// this.store.dispatch(go(['/admin-dashboard/quizzes', data.row.Id]));
	}
}
