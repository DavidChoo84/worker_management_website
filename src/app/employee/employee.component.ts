import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';
/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-employee',
  styleUrls: ['employee.component.css'],
  templateUrl: 'employee.component.html',
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'photo', 'create', 'edit', 'delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  ngOnInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

export interface PeriodicElement {
  name: string;
  id: string;
  photo: string;

}


const ELEMENT_DATA: PeriodicElement[] = [
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://apod.nasa.gov/apod/image/2212/MarsTrailsSMALL.jpg'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z005', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z001', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'}
];