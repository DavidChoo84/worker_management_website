import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';
import { NavbarService } from '../navbar.service';
/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
   displayedColumns: string[] = ['id', 'name', 'photo', 'create', 'edit', 'delete'];
   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   constructor(public nav: NavbarService){}
  
  ngOnInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
    this.nav.show();
    this.nav.doSomethingElseUseful();
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
  { id: 'Z001', name: 'Lau Yong Jie', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z002', name: 'Teng Wei Zhun', photo: 'https://apod.nasa.gov/apod/image/2212/MarsTrailsSMALL.jpg'},
  { id: 'Z003', name: 'Looi Hao Shan', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z004', name: 'Choo Zhe Lim', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z005', name: 'Ng Wei Shen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z006', name: 'Kong Hao Kwang', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z007', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z008', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z009', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z010', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z011', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z012', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z013', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z014', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z015', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z016', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z017', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z018', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z019', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'},
  { id: 'Z020', name: 'Hydrogen', photo: 'https://github.com/SiddAjmera.png'}
];