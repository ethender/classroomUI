import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { AppUtils } from '../app.utils';

@Injectable()
export class CreateClassService{

     //baseUrl = "http://localhost:8080/classroom/class/";
    
    
    constructor(private http:Http, private utils:AppUtils){}
    
    
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
    
    createLecture(lectureName):Observable<Response>{
        let url = this.utils.lectureBaseUrl+"create";
        var params = {};
        return this.http.post(url,params);
    }
    
    
    
    
    
    
}