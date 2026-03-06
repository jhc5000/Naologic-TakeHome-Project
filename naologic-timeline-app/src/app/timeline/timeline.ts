import { CommonModule, } from '@angular/common';
import { Component, NgModule } from '@angular/core';
// import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-timeline',
  standalone:true,
  imports: [CommonModule],//MatTableModule
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class Timeline {
  months=["January","February", "March","April", "May", "June","July","August","September","October"]

}

