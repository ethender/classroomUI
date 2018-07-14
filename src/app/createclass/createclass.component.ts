import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http'; 

@Component({
  selector: 'app-createclass',
  templateUrl: './createclass.component.html',
  styleUrls: ['./createclass.component.css']
})
export class CreateclassComponent implements OnInit {

    props = {'isCreated':false,'isLoadingScreen':false};
    sample = [0,1,2,3,4];
  constructor() { }

  ngOnInit() {
  }

    
    onClickClass(i){
        console.log("working"+i);
    }
    
    
    onCreateClass(){
        this.props.isCreated = true;
    }
    
    createClass(){
        this.showLoadingScreen();
        this.props.isCreated = false;
        this.dismissLoadingScreen();
    }
    
    showLoadingScreen(){
        this.props.isLoadingScreen = true;
    }
    
    dismissLoadingScreen(){
        this.props.isLoadingScreen = false;
    }
    
    
}
