import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CreateclassComponent } from './createclass/createclass.component';
import { ViewclassesComponent } from './viewclasses/viewclasses.component';
import { MarketComponent } from './market/market.component';


import { CreateClassService } from './createclass/createclass.service';
import { AppUtils } from './app.utils';
import {  SimpleTimer } from 'ng2-simple-timer';
import {FileUploadModule} from 'ng2-file-upload';
//import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CreateclassComponent,
    ViewclassesComponent,
    MarketComponent,
    //FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FileUploadModule
    
  ],
  providers: [
      CreateClassService,
      SimpleTimer,
      AppUtils
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
