import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http'; 

@Component({
    selector: 'app-createclass',
    templateUrl: './createclass.component.html',
    styleUrls: ['./createclass.component.css']
})
export class CreateclassComponent implements OnInit {

    loadingScreen = false;
    tasks = {'create':false};
    screens = {"viewclasses":true,"classcreate":false,"lecturesview":false,'lecturescreate':false,'lectureview':false,'uploadview':false};

    sample = [0,1,2,3,4];
    constructor() { }

    ngOnInit() {
    }


    showScreen(screenName){
        console.log("@@@ ScreeName: "+screenName);
        for(var screen in this.screens){
            if(screen == screenName){
                this.screens[screen] = true;
            }else{
                this.screens[screen] = false;
            }
        }
    }


    /*
    * class code
    */

    onClickClass(i){
        console.log("working"+i);
        this.showLoadingScreen();
        this.showScreen('lecturesview');
        this.dismissLoadingScreen();
    }


    onCreateClass(){
        this.showScreen('classcreate');
    }

    createClass(){
        this.showLoadingScreen();
        this.showScreen('viewclasses');
        this.dismissLoadingScreen();
    }

    showLoadingScreen(){
       this.loadingScreen = true;
    }

    dismissLoadingScreen(){
        this.loadingScreen = false;
    }


    /*
    *  Lectures Code
    */


    onClickLecture(i){
        console.log("working"+i);
        this.showLoadingScreen();
        this.showScreen('lectureview');
        this.dismissLoadingScreen();
    }


    onCreateLecture(){
        this.showLoadingScreen();
        this.showScreen('lecturescreate');
        this.dismissLoadingScreen();
    }
    
    submitLecture(){
        console.log("@@@ inside submit lecture");
        this.showLoadingScreen();
        this.showScreen('lecturesview');
        this.dismissLoadingScreen();
    }
    
    createTask(){
        console.log("@@@ Inside create task");
        this.tasks.create = true;
        
    }
    
    submitTask(){
        console.log("@@@ Submit the task")
        this.tasks.create = false;
    }
    
    
    
    /*
    * Lecture code
    */



}
