import { Component, Input, input } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css'
})
export class BlankComponent {

  @Input() title: string = "";
 

}
