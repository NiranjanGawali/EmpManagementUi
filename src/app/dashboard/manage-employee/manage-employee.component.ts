import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss'],
  providers:[DatePipe]
})
export class ManageEmployeeComponent implements OnInit {
  myForm: FormGroup;
  empData: any = null;
  editMode:boolean = false;

  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(public fb: FormBuilder,public datepipe: DatePipe,private dashService:DashboardService,
    private router: Router,private route: ActivatedRoute,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.checkEmpNoExists();
  }

  async checkEmpNoExists() {
    if (this.route.snapshot.queryParams['empNo']) {
     let empNum = this.route.snapshot.queryParams['empNo'];
     this.editMode = true;
     console.log('EDIT MODE => ',this.editMode);
      this.empData = await this.getEmployeeDataByEmpNo(parseInt(empNum));
      console.log(this.empData);
      this.reactiveEditForm(this.empData);
    } else {
      console.log('INSERT MODE');
      console.log(this.editMode);
      
    }
  }


  reactiveForm() {
    this.myForm = this.fb.group({
      emp_no: ['',[Validators.required]],
      birth_date: ['',[Validators.required]],
      first_name: ['',[Validators.required]],
      last_name: ['',[Validators.required]],     
      gender: ['',[Validators.required]],    
      hire_date: ['',[Validators.required]]     
    });
  }

  reactiveEditForm(employee) {
    this.myForm = this.fb.group({
      emp_no: [parseInt(employee.emp_no),[Validators.required]],
      birth_date: [employee.birth_date,[Validators.required]],
      first_name: [employee.first_name,[Validators.required]],
      last_name: [employee.last_name,[Validators.required]],     
      gender: [employee.gender,[Validators.required]],    
      hire_date: [employee.hire_date,[Validators.required]]     
    });
  }

  addEmployee(form:NgForm) {
    console.log('In Add Employee....');
    console.log(this.myForm.value);
    let birthDate = this.myForm.value.birth_date;
    let birth_date = this.datepipe.transform(birthDate, 'yyyy-MM-dd');
    let hireDate = this.myForm.value.hire_date;
    let hire_date = this.datepipe.transform(hireDate, 'yyyy-MM-dd')
    
    let payload = this.myForm.value;

    payload.birth_date = birth_date;
    payload.hire_date = hire_date;

    console.log(payload);
    if(this.editMode) {
      this.dashService.updateEmployee(payload).subscribe(res => {      
        console.log(res);
        if(res.status) {
          console.log('User Updated successfully!!!');     
          this.toastr.success('Employee Updated successfully!!!');
          // this.router.navigate(['/dashboard/main']);
        } 
      }, err => {
        console.log('ERROR LOGGG');      
        this.myForm.reset();
        console.log(err);
      });  
    } else {
      this.dashService.addEmployee(payload).subscribe(res => {      
        console.log(res);
        if(res.status) {
          console.log('Employee Added successfully!!!');     
          this.toastr.success('Employee Added successfully!!!');
          form.resetForm();
        } 
      }, err => {
        console.log('ERROR LOGGG');      
        this.myForm.reset();
        console.log(err);
      });
    }    
    
  }


  // Get Employee by Employee Number
   async getEmployeeDataByEmpNo(empNo) {
    try {
      let promData = new Promise(async (resolve, reject) => {
        await this.dashService.getEmployeeDataByEmpNo(empNo).subscribe(res => {
          if (res.status) {
            this.empData = res.data.data[0];
            console.log('EMP DATA');
            resolve(this.empData);
          }
        }, err => {
          reject(err);
          return console.log(err);
        });
      });

      return promData;

    } catch (err) {
      return console.error(err);

    }
  }

  goToListEmployees() {
              this.router.navigate(['/dashboard/main']);
  }

}
