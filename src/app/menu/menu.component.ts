import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      console.log("@@@ Menu :"+localStorage.getItem('user'));
     //this.props.user  = localStorage.getItem('user');
  }

    
    @Output() messageEvent =  new EventEmitter<String>();
    
    props  = {'menuselected':''};
    @Input() user:  string;
    
    
    sendMessageToCreateClass(){
        console.log('Comming to create class');
        this.props.menuselected = 'create';
        this.messageEvent.emit(JSON.stringify(this.props));
    }
    
    
    sendMessageToGoMyClasses(){
        this.props.menuselected = 'view';
        this.messageEvent.emit(JSON.stringify(this.props));
    }
    
}
