import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as quizzes from '../../actions/quizzes.actions';
import { Subscription } from 'rxjs';
import { Quiz } from '../../models';

@Component({
	selector: 'ed-quizzes',
	templateUrl: './quizzes.component.html',
	styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit, OnDestroy {
	quizzesSubscription: Subscription;
	data: Array<Quiz> = [];

	rows: Array<any> = [];
	columns: Array<any> = [
		{ title: 'Subject', name: 'Subject' },
		{ title: 'Levels', name: 'Levels' },
		{ title: 'Title', name: 'Title' },
		{
			title: 'Description',
			name: 'Description',
			sort: false
		},
		{ title: 'Tutor', name: 'Tutor' }
	];

	tableConfig: any = {
		paging: true,
		sorting: { columns: this.columns },
		filtering: { filterString: '' },
		className: ['table-striped', 'table-bordered', 'thead-inverse']
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
		this.store.dispatch(new quizzes.LoadAction);
	}

	ngOnInit() {
		this.quizzesSubscription =
		  this.store.select(fromRoot.getFilteredQuizzes)
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

		let columns = this.tableConfig.sorting.columns || [];
		let columnName: string = void 0;
		let sort: string = void 0;

		for (let i = 0; i < columns.length; i++) {
			if (columns[i].sort !== '' && columns[i].sort !== false) {
				columnName = columns[i].name;
				sort = columns[i].sort;
			}
		}

		if (!columnName)
			return data;

		// simple sorting
		return data.sort((previous: any, current: any) => {
			if (previous[columnName] > current[columnName]) {
				return sort === 'desc' ? -1 : 1;
			} else if (previous[columnName] < current[columnName]) {
				return sort === 'asc' ? -1 : 1;
			}
			return 0;
		});
	}

	changeFilter(data: any, config: any): any {
		let filteredData: Array<any> = data;
		this.columns.forEach((column: any) => {
			if (column.filtering) {
				filteredData = filteredData.filter((item: any) => {
					return item[column.name].match(
					  column.filtering.filterString);
				});
			}
		});

		if (!config.filtering) {
			return filteredData;
		}

		if (config.filtering.columnName) {
			return filteredData.filter((item: any) =>
			  item[config.filtering.columnName].match(
				this.tableConfig.filtering.filterString));
		}

		let tempArray: Array<any> = [];
		filteredData.forEach((item: any) => {
			let flag = false;
			this.columns.forEach((column: any) => {
				if (item[column.name].toString()
					.match(this.tableConfig.filtering.filterString)) {
					flag = true;
				}
			});
			if (flag) {
				tempArray.push(item);
			}
		});
		filteredData = tempArray;

		return filteredData;
	}

	onChangeTable(config: any, page: any = {
		page: this.paginationConfig.page,
		itemsPerPage: this.paginationConfig.itemsPerPage
	}): any {
		if (config.filtering)
			Object.assign(this.tableConfig.filtering, config.filtering);

		if (config.sorting)
			Object.assign(this.tableConfig.sorting, config.sorting);

		let filteredData = this.changeFilter(this.data, this.tableConfig);
		let sortedData = this.changeSort(filteredData, this.tableConfig);
		this.rows = page && config.paging ? this.changePage(page, sortedData) :
		  sortedData;
		this.paginationConfig.length = sortedData.length;
	}
}
