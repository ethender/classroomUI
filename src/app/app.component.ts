import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'app works!';

    hello = 'Hello';
    user = 'User'
    props = {'menuactions':'',isCreateComponent:false,isViewComponent:false,isMarketComponent:true,'isMaterialSidedNeeded':'col-md-10','isUserEntered':true, 'username':''};

    constructor(private st:SimpleTimer){
        
    }
    
    
    callBack(){
        console.log("@@@Checking: "+JSON.stringify(this.st.getTimer()));
        this.hello = JSON.stringify(this.st.getTimer());
    }
    ngOnInit(){
        localStorage.removeItem('user');
        //this.st.newTimer('5 sec',5);
        //this.hello = this.st.subscribe('5 sec',()=>this.callBack());
    }
    
    menuActions($event){
        console.log("Event Data:"+JSON.stringify($event));
        var menuEvent = JSON.parse($event);
        if(menuEvent.menuselected == 'create'){
            this.props.isViewComponent = false;
            this.props.isMarketComponent = false;
            this.props.isCreateComponent = true;
            this.props.isMaterialSidedNeeded = 'col-md-10';
        }else if(menuEvent.menuselected == 'view'){
            this.props.isViewComponent = true;
            this.props.isMarketComponent = false;
            this.props.isCreateComponent = false;
            this.props.isMaterialSidedNeeded = 'col-md-6';
        }
    }
    
    
    storeUsername(){
        console.log("@@@ Username:"+this.props.username);
        localStorage.setItem('user',this.props.username);
        this.props.isUserEntered = false;
        this.user = localStorage.getItem('user');
        console.log("@@@ Username: "+localStorage.getItem('user'));
    }

}
