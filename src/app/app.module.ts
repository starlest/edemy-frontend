import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {HttpModule} from '@angular/http';

import {AppRouting} from './app.routing';

import { StoreModule } from '@ngrx/store';
// import { DBModule } from '@ngrx/db';
import {RouterStoreModule} from '@ngrx/router-store';

import {AppComponent} from './app.component';
import {ComponentsModule} from './components';

import 'hammerjs';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRouting,
    BrowserModule,
    ComponentsModule,
    FormsModule,
    FlexLayoutModule.forRoot(),
    MaterialModule.forRoot(),
    HttpModule

    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    // RouterStoreModule.connectRouter()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
