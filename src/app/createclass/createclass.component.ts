import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createclass',
  templateUrl: './createclass.component.html',
  styleUrls: ['./createclass.component.css']
})
export class CreateclassComponent implements OnInit {

    props = {};
    sample = [0,1,2,3,4];
  constructor() { }

  ngOnInit() {
  }

    
    checking(i){
        console.log("working"+i);
    }
}
