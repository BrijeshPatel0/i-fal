import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration2',
  templateUrl: './registration2.component.html',
  styleUrls: ['./registration2.component.css']
})
export class Registration2Component implements OnInit {

  constructor() { }

  ngOnInit() {
    $('body').addClass('body');
  }

}
