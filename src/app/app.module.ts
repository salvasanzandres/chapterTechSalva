import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {MatButtonModule, MatGridListModule, MatListModule, MatRadioModule, MatSelectModule, MatTableModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserService} from './user.service';
import {AuthorizationService} from './authorization.service';
import {CanAccessDirective} from './access.directive';


@NgModule({
  declarations: [
    AppComponent,
    CanAccessDirective
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatRadioModule

  ],
  providers: [UserService, AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
