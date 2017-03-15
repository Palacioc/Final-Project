import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { Router } from '@angular/router';
import { NeedService } from "../need.service";
import { ProjectService } from "../project.service";
import { ProposalService } from "../proposal.service";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private session: SessionService, private router: Router, private projectService: ProjectService, private needService: NeedService, private proposalService: ProposalService) { }

  user: any;
  error: string;
  need: any;
  proposals: any;
  tru:boolean = false;

  ngOnInit() {
   this.session.isLoggedIn()
     .subscribe(
       (user) => {
         this.successCb(user);
         this.getAllInfo(user)
       },
       (err) => {this.errorCb(err)}

   );
  };

  getAllInfo(user){
    this.proposalService.getByCreator(user._id)
    .subscribe((proposals)=>{
      this.proposals = proposals;
    })
  }

  errorCb(err) {
    this.error = err;
    this.user = null;
    // this.router.navigate(['/auth']);
  }

  successCb(user) {
    this.user = user;
    this.error = null;
    // this.router.navigate(['/home']);
  }

}
