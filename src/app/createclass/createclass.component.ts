import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Response } from '@angular/http'; 
import { SimpleTimer } from 'ng2-simple-timer';
import { AppUtils } from '../app.utils';

import { FileItem } from 'ng2-file-upload';

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

    props = {'msg':'hello,world','alertcounter':0,'classes':[],'classRef':'','lectures':[],'lecRef':'',uploadRef:''};

    @ViewChild('videoupload')
    videoUpload: ElementRef;

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
        console.log("@Lecture Ref: "+i+", ClassRef: "+this.props.classRef);
        this.showLoadingScreen();
        this.props.lecRef = i;
        this.showScreen('lectureview');
        this.dismissLoadingScreen();
    }


    onCreateLecture(){
        this.showLoadingScreen();
        this.showScreen('lecturescreate');
        this.dismissLoadingScreen();
    }

    submitLecture(form: NgForm){
        console.log("@@@ inside submit lecture");
        this.showLoadingScreen();
        console.log("@@@ClassRef: "+this.props.classRef);
        const values = form.value;
        var lecProps = {
            'classRef':this.props.classRef,
            'letureName':values.lecture,
            'desc':values.desc,
            'username':localStorage.getItem('user'),
            'views':0
        };
        console.log("@@@ Lecture Create props: "+JSON.stringify(lecProps));
        this.classService.createLecture(lecProps)
            .subscribe(
            (response:Response)=>{

                this.props.msg = "Lecture Created Successfully.";
                console.log("@@@: "+JSON.stringify(response));
                this.createAlert();
            },(error:Response)=>{
                this.props.msg = "Lecture Creation Unsuccessfull.";
                console.log("@@@: "+JSON.stringify(error));
                this.createAlert();
            }
        );
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


    addMoreToLecture(value){
        console.log("@@@ Value: "+value);
        switch(value){
            case "video":
                this.showLoadingScreen();
                this.showScreen('uploadview');
                this.dismissLoadingScreen();
                break;
            default:
                this.showLoadingScreen();
                this.onClickLecture(this.props.lecRef);
                this.dismissLoadingScreen();
        }
    }


    uploadFile(files: FileList){
        console.log("@@@@ Inside uploadFile");
        this.classService.uploadVideo(files.item(0))
            .subscribe(
            (response:Response)=>{
                console.log("@@@ Response: "+JSON.stringify(response));
            },(error:Response)=>{
                console.log("@@@ Error: "+JSON.stringify(error));
            }
        );
    }

    uploadLecture(form:NgForm){
        console.log("@@@ Upload Lecture");
        const values = form.value;
        if(values.referencelink == "" || values.referencelink == undefined || values.referencelink  == null){
            /*
            Multiple Upload
            this.classService.uploader.uploadAll();
            this.classService.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
                console.log(fileItem);
                console.log(progress);
            };*/

            //single upload
            for(let item of this.classService.uploader.queue){
                console.log("@@@"+item.file.name);
                //console.log("@@@ vide: "+JSON.stringify(values.files));
                item.upload();
                this.classService.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
                    console.log("ImageUpload:uploaded:", item, status, response);
                    if(status == 200){
                        this.props.uploadRef = response;
                    }else{
                        this.props.uploadRef = '';
                    }
                };
            }

            form.resetForm();


        }else{
            console.log("@@@ Reference Link is: "+values.referencelink);
        }
        form.reset();
    }





}
