import { Component, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Student } from '../../../models';
import * as sa from '../../../actions/students.action';
import * as fromRoot from '../../../reducers';
import { go } from '@ngrx/router-store';

@Component({
	selector: 'ed-students-dashboard',
	templateUrl: 'admin-students.component.html',
	styleUrls: ['admin-students.component.scss']
})
export class AdminStudentsComponent {
	studentsSubscription: Subscription;

	data: Array<Student> = [];
	rows: Array<any> = [];

	columns: Array<any> = [
		{
			title: 'NRIC', name: 'IdentificationNumber',
			filtering: { filterString: '', placeholder: 'Filter' },
			sort: false
		},
		{
			title: 'First Name', name: 'FirstName',
			filtering: { filterString: '', placeholder: 'Filter' },
			sort: 'asc'
		},
		{
			title: 'Middle Name',
			name: 'MiddleName'
		},
		{
			title: 'Last Name', name: 'LastName',
			filtering: { filterString: '', placeholder: 'Filter' },
			sort: 'asc'
		},
		{
			title: 'Email', name: 'Email',
			filtering: { filterString: '', placeholder: 'Filter' },
			sort: false
		},
		{
			title: 'School', name: 'School',
			filtering: { filterString: '', placeholder: 'Filter' }
		}
	];

	tableConfig: any = {
		paging: true,
		sorting: {
			columns: [this.columns[5], this.columns[3], this.columns[1]]
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
		this.studentsSubscription = this.store.select(fromRoot.getStudents)
		  .map(students => {
			  this.data = students;
			  this.paginationConfig.length = students.length;
			  this.onChangeTable(this.tableConfig);
			  this.ref.detectChanges();
		  })
		  .subscribe();
	}

	ngOnDestroy() {
		if (this.studentsSubscription)
			this.studentsSubscription.unsubscribe();
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
				filteredData = filteredData.filter((item: any) => {
					return item[column.name].match(
					  column.filtering.filterString);
				});
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
		this.store.dispatch(go(['/admin-dashboard/students', data.row.Id]));
	}
}
