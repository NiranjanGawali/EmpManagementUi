import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
    declarations:[],
    imports:[
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        NgxPaginationModule,
        MatDialogModule,
        MatNativeDateModule,
        ToastrModule
    ],
    exports:[
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        NgxPaginationModule,
        MatNativeDateModule,
        ToastrModule
    ],
    providers: []
})
export class CustomModule { }
