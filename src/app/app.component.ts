import { Component } from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';

    props = {'menuactions':'',isCreateComponent:false,isViewComponent:false,isMarketComponent:true,'isMaterialSidedNeeded':'col-md-10','isUserEntered':true, 'username':''};

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
        this.props.isUserEntered = false;
    }

}
