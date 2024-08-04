import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidDirective } from '../directives/valid.directive';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ValidDirective,
    NgxSpinnerModule
    
    
  ],
  exports:[
    CommonModule,
    FormsModule,
    RouterModule,
    ValidDirective,
    NgxSpinnerModule
  ]
})
export class SharedModule { }
