
import { Injectable } from '@angular/core';

@Injectable()
export class AppUtils{
    baseUrl = "http://localhost:8080/classroom/";
    classBaseUrl = this.baseUrl+"class/";
    lectureBaseUrl = this.baseUrl+"lecture/";
    
    
      
    //checks the data is empty
    checkIsEmpty(data){
        if(data == undefined || data.length <= 0 || data == ''){
            
            return true;
        }else{
            return false;
        }
    }
}