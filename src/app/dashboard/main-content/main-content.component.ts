import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {


  page: number = 1;
  total: number = 100;
  firstName: String = '';
  empData: any = [];
  myControl = new FormControl();
  dataAvailableStatus = '';

  constructor(private dashService: DashboardService, private router: Router, private route: ActivatedRoute,
    private spinner: NgxSpinnerService,private toastr: ToastrService,private mainService: MainService) { }

  // dataSource = ELEMENT_DATA;
  async ngOnInit() {
    this.mainService.checkIfUserLoggedIn();
    this.empData = await this.getAllEmployee(1);
    console.log(this.empData);
  }

  async handlePageEvent(event: PageEvent) {
    console.log(event.pageIndex);
    let pageNo = event.pageIndex + 1;
    this.page = pageNo;
    await this.getAllEmployee(pageNo);

  }

  // Getting all employee data
  async getAllEmployee(pageNo) {
    this.spinner.show();
    try {
      let promData = new Promise(async (resolve, reject) => {
        await this.dashService.getEmployeeData(pageNo).subscribe(res => {
          console.log('MAIN log');
          console.log(res);
          
          if (res.status) {
            this.empData = res.data;
            console.log('EMP DATA');
            this.total = res.count;
            console.log(this.empData);
            this.spinner.hide();
            resolve(this.empData);
          }
        }, err => {
          reject(err);
          this.spinner.hide();
          return console.log(err);
        });
      });

      return promData;

    } catch (err) {
      return console.error(err);

    }
  }


  // Delete employee
  deleteEmployee(empNo) {
    let result = confirm("Are you sure wanto delete?");
    if(result) {
      try {
        console.log(empNo);
        this.dashService.deleteEmployeeData(empNo).subscribe(async res => {
          if (res.status) {
            console.log('DELETE operation done');
            this.empData = await this.getAllEmployee(1);
            this.toastr.success(res.message);
            console.log(res);
          }
        }, err => {
          return console.log(err);
        });
      } catch (err) {
        return console.error(err);
      }
    }
  }


  // Update Employee
  updateEmployee(empNo) {
    this.router.navigate(['/dashboard/manage-employee'], { queryParams: { empNo: empNo } });
  }


  // Add Employee
  addEmployeeRedirect() {
    // this.toastr.success('NIRANJAN');
    this.router.navigate(['/dashboard/manage-employee']);
  }

  // Search by First Name
  searchByFirsName(searchVal) {      
    this.spinner.show();
      let promData = new Promise(async (resolve, reject) => {
        await this.dashService.getEmployeeDataByFirstName(searchVal,this.page).subscribe(res => {
          if (res.status) {
            this.empData = res.data;
            console.log('EMP DATA');
            this.total = res.data;
            console.log(this.empData);
            this.spinner.hide();
            resolve(this.empData);
          }
        }, err => {
          reject(err);
          this.spinner.hide();
          return console.log(err);
        });
      });

      return promData;
  }

  logout() {
    let result = confirm("Are you sure want to logout?");
    if(result) {
      localStorage.clear();
      this.router.navigate(['/']);
    }  
  }

  async emptySearchField() {
    this.firstName = '';
    await this.getAllEmployee(this.page);
  }

}
