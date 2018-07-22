import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http'; 
import { SimpleTimer } from 'ng2-simple-timer';
import { AppUtils } from '../app.utils';

import { CreateClassService } from './createclass.service';

@Component({
    selector: 'app-createclass',
    templateUrl: './createclass.component.html',
    styleUrls: ['./createclass.component.css']
})
export class CreateclassComponent implements OnInit {

    
    
    /*
    * Constants
    */
    loadingScreen = false;
    alertScreen = false;
    tasks = {'create':false};
   
    screens = {"viewclasses":true,"classcreate":false,"lecturesview":false,'lecturescreate':false,'lectureview':false,'uploadview':false};
    
    props = {'msg':'hello,world','alertcounter':0,'classes':[],'classRef':'','lectures':[]};

    sample = [0,1,2,3,4];
    
    
    //constructor
    constructor(private classService: CreateClassService, private st: SimpleTimer, private utils:AppUtils) { }

    
    
    /*
    * Create Class NgOnInit life cycle hook
    */
    ngOnInit() {
        this.loadClassesByThisUser();
    }


    //tells which screen has to show
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
    
    // creates alert  and holds upto 15 sec
    createAlert(){
        this.alertScreen = true;
        //creating timer for 5 seconds
        this.st.newTimer('alert',15);
        this.props.alertcounter = 0;
        this.st.subscribe('alert',()=>this.alertCallBack());
    }
    
    //after 15 secs cancels the timer
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

    
    //on click class created -> Means fetch for lectures for specific class
    onClickClass(ref){
        console.log("@@@ Class Ref"+ref);
        this.showLoadingScreen();
        this.props.classRef = ref;
        this.classService.getAllLecturesByClassRef(ref)
        .subscribe(
            (response:Response)=>{
                console.log("@@@ Lectures Successfull: "+JSON.stringify(response.json()));
                this.props.lectures = response.json();
            },(error:Response)=>{
                this.props.msg = "Unable to fetch lecture screens";
                console.log("@@@ Unable to lecture screen: "+JSON.stringify(error.json()));
                this.createAlert();
            }
        );
        this.showScreen('lecturesview');
        this.dismissLoadingScreen();
    }


    //Button On Click of create class button
    onCreateClass(){
        this.showScreen('classcreate');
    }

    
    //creates class 
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
    
    
    //load classes for login user
    loadClassesByThisUser(){
        const user = localStorage.getItem('user');
        this.showLoadingScreen();
        this.classService.searchByClassesByInstructors(user)
        .subscribe(
            (response:Response)=>{
                console.log("@@@@ Classes : "+JSON.stringify(response.json()));
                this.props.classes = response.json();
                this.dismissLoadingScreen();
            },
            (error:Response)=>{
                console.log("@@@ Classes error: "+JSON.stringify(error.json()));
                this.props.msg = "unable to fetch classes";
                this.createAlert();
                this.dismissLoadingScreen();
            }
        );
    }
    
    //shows the loading screen
    showLoadingScreen(){
       this.loadingScreen = true;
    }
    
    
    //dismiss the loading screen
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
    
    
    
     /*
    * Lecture code
    */
    
    createTask(){
        console.log("@@@ Inside create task");
        this.tasks.create = true;
        
    }
    
    submitTask(){
        console.log("@@@ Submit the task")
        this.tasks.create = false;
    }
    
    
    
   



}
