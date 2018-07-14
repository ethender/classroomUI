import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    
    @Output() messageEvent =  new EventEmitter<String>();
    
    props  = {'menuselected':''};
    
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
