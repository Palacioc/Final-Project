import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { SessionService } from "./session.service";
import { AuthComponent } from './auth/auth.component';
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileSelectDirective } from "ng2-file-upload";
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth',  component: AuthComponent },
  { path: 'home',  component: HomeComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    FileSelectDirective,
    HomeComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
