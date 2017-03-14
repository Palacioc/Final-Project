import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ProposalService } from "./proposal.service";
import { SessionService } from "./session.service";
import { ProjectService } from "./project.service";
import { NeedService } from "./need.service";
import { AuthComponent } from './auth/auth.component';
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileSelectDirective } from "ng2-file-upload";
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectNewComponent } from './project-new/project-new.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { NeedViewComponent } from './need-view/need-view.component';
import { NeedNewComponent } from './need-new/need-new.component';
import { NeedEditComponent } from './need-edit/need-edit.component';
import { ProposalNewComponent } from './proposal-new/proposal-new.component';
import { ProposalViewComponent } from './proposal-view/proposal-view.component';
import { ProposalEditComponent } from './proposal-edit/proposal-edit.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth',  component: AuthComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'user',
    children: [
      { path: 'edit/:id', component: UserEditComponent },
      { path: ':id)', component: UserViewComponent }
    ]
  },
  { path: 'projects',
    children: [
      { path: 'new', component: ProjectNewComponent },
      { path: 'edit/:id', component: ProjectEditComponent },
      { path: ':id', component: ProjectViewComponent }
    ]
  },
  { path: 'needs',
    children: [
      { path: 'new/:id', component: NeedNewComponent },
      { path: 'edit/:id', component: NeedEditComponent },
      { path: ':id)', component: NeedViewComponent }
    ]
  },
  { path: 'proposals',
    children: [
      { path: 'new/:id', component: ProposalNewComponent },
      { path: 'edit/:id', component: ProposalEditComponent },
      { path: ':id)', component: ProposalViewComponent }
    ]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    FileSelectDirective,
    HomeComponent,
    NavBarComponent,
    ProjectViewComponent,
    ProjectNewComponent,
    ProjectEditComponent,
    NeedViewComponent,
    NeedNewComponent,
    NeedEditComponent,
    ProposalNewComponent,
    ProposalViewComponent,
    ProposalEditComponent,
    UserViewComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
  ],
  providers: [SessionService, ProjectService, NeedService, ProposalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
