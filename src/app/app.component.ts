import { Component } from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';

    props = {'menuactions':'',isCreateComponent:true,isViewComponent:false,isMarketComponent:false,'isMaterialSidedNeeded':'col-md-10','isUserEntered':false};

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

}
