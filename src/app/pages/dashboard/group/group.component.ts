import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  week = [
    {day: 'Monday', preference: 0},
    {day: 'Tuesday', preference: 0},
    {day: 'Wednesday', preference: 0},
    {day: 'Thursday', preference: 0},
    {day: 'Friday', preference: 0}
  ];
  preferences = [
    {display: 'Available', value: 0},
    {display: 'Maybe', value: 1},
    {display: 'Not Available', value: 2},
  ]

  constructor() { }

  ngOnInit() {
  }

}
