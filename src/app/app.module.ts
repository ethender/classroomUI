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

import {  SimpleTimer } from 'ng2-simple-timer';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CreateclassComponent,
    ViewclassesComponent,
    MarketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
      CreateClassService,
      SimpleTimer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
