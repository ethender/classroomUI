import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CreateClassService{

     baseUrl = "http://localhost:8080/classroom/class/";
    
    
    constructor(private http:Http){}
    
    createClass(className) : Observable<Response>{
        let url = this.baseUrl+"create";
        var params = {
           'name':className,
           'creator':localStorage.getItem('user'),
           'enrollers':0
        };
        return this.http.post(url,params);
    }
    
    getAllClasses(): Observable<Response>{
        let url = this.baseUrl+"allclasses";
        return this.http.get(url);
    }
    
    
    searchByClassName(className): Observable<Response>{
        let url = this.baseUrl+"class/"+className;
        return this.http.get(url);
    }
    
    searchByClassesByInstructors(instructor): Observable<Response>{
        let url = this.baseUrl+"class/by/"+instructor;
        return this.http.get(url);
    }
    
    
    
    
}