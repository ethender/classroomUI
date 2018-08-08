import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { AppUtils } from '../app.utils';
import { FileUploader } from 'ng2-file-upload';


@Injectable()
export class CreateClassService{

    
    props = {};
    
     //baseUrl = "http://localhost:8080/classroom/class/";
    
    public uploader:FileUploader = new  FileUploader({url:this.utils.lectureBaseUrl+"video/upload",removeAfterUpload:true});
    constructor(private http:Http, private utils:AppUtils){
        
         this.uploader.onCompleteItem  = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
        };
        
    }
    
    
   
    
    
    /*
    * classes services
    */
    
    
    //create class
    createClass(className) : Observable<Response>{
        let url = this.utils.classBaseUrl+"create";
        var params = {
           'name':className,
           'creator':localStorage.getItem('user'),
           'enrollers':0
        };
        return this.http.post(url,params);
    }
    
    //Get All Classes
    getAllClasses(): Observable<Response>{
        let url = this.utils.classBaseUrl+"allclasses";
        return this.http.get(url);
    }
    
    
    //search class by class name
    searchByClassName(className): Observable<Response>{
        let url = this.utils.classBaseUrl+className;
        return this.http.get(url);
    }
    
    
    // search class by instructor name
    searchByClassesByInstructors(instructor): Observable<Response>{
        let url = this.utils.classBaseUrl+"by/"+instructor;
        return this.http.get(url);
    }
    
    
    
    
    /*
    *   Lectures Services
    */
    
    getAllLecturesByClassRef(classRef):Observable<Response>{
        let url = this.utils.lectureBaseUrl+"searchref/"+classRef;
        return this.http.get(url);
    }
    
    createLecture(lectureProps):Observable<Response>{
        let url = this.utils.lectureBaseUrl+"create";
        return this.http.post(url,lectureProps);
    }
    
    
    uploadVideo(fileToUpload: File):Observable<Response>{
        let url = this.utils.lectureBaseUrl+"video/upload";
        let headers = new Headers();
        headers.append('Content-Type','multipart/form-data');
        headers.append('Accept','application/json');
        let options = new RequestOptions({headers:headers});
        let formData: FormData = new FormData();
       console.log("@@@@ File Name: "+fileToUpload.name); formData.append('fileKey',fileToUpload,fileToUpload.name);
        return this.http.post(url,formData,options);
    }
    
    
    
    
    
    
}