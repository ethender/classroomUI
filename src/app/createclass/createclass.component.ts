import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http'; 
import { SimpleTimer } from 'ng2-simple-timer';


import { CreateClassService } from './createclass.service';

@Component({
    selector: 'app-createclass',
    templateUrl: './createclass.component.html',
    styleUrls: ['./createclass.component.css']
})
export class CreateclassComponent implements OnInit {

    loadingScreen = false;
    alertScreen = false;
    tasks = {'create':false};
    screens = {"viewclasses":true,"classcreate":false,"lecturesview":false,'lecturescreate':false,'lectureview':false,'uploadview':false};
    props = {'msg':'hello,world','alertcounter':0};

    sample = [0,1,2,3,4];
    constructor(private classService: CreateClassService, private st: SimpleTimer) { }

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
    
    
    createAlert(){
        this.alertScreen = true;
        //creating timer for 5 seconds
        this.st.newTimer('alert',15);
        this.props.alertcounter = 0;
        this.st.subscribe('alert',()=>this.alertCallBack());
    }
    
    alertCallBack(){
        console.log("@@@ Comming to alert callback");
        if(this.props.alertcounter != 0){
            console.log("@@@ comming to if alert");
            this.alertScreen = false;
            this.st.delTimer('alert');
        }
        this.props.alertcounter = this.props.alertcounter+1;
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

    createClass(form: NgForm){
        const value = form.value;
        this.showLoadingScreen();
        const className = value.classname;
        console.log("@@@ Create class name: "+className);
        this.classService.createClass(className)
        .subscribe(
            (response: Response)=>{
                console.log("@@@ class creation successfull: "+JSON.stringify(response));
                form.reset();
                this.dismissLoadingScreen();
                this.showScreen('viewclasses');
                this.props.msg = 'class created successfull';
                this.createAlert();
            },(error: Response)=>{
                console.log("@@@ class creation unsuccessfull: "+JSON.stringify(error));
                this.dismissLoadingScreen();
                this.showScreen('viewclasses');
                this.props.msg = 'class created unsuccessfull';
                this.createAlert();
            }
        );
       
        
        /*this.showScreen('viewclasses');
        this.dismissLoadingScreen();*/
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
