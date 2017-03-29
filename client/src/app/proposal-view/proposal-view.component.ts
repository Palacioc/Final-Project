import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from './../project.service';
import { NeedService } from './../need.service';
import { Router } from '@angular/router';
import { SessionService } from "../session.service";
import { ProposalService } from "../proposal.service";

@Component({
  selector: 'app-proposal-view',
  templateUrl: './proposal-view.component.html',
  styleUrls: ['./proposal-view.component.css']
})
export class ProposalViewComponent implements OnInit {

  userIsCreator : boolean = false;
  user : any;
  param : any;
  proposal : any;
  need : any;

  constructor(private router: Router, private route: ActivatedRoute,
    private projectService: ProjectService, private proposalService: ProposalService, private needService: NeedService, private session: SessionService) { }

    ngOnInit() {
      this.session.isLoggedIn()
        .subscribe(
          (user) => {
            this.successCb(user);
          }
      );
      this.route.params.subscribe(params => {
        this.param = params['id'];
        this.getProposalDetails(this.param);
        //comprobar si el autor del proyecto es el usuario y si lo es variable de componente
      });
    }

    getProposalDetails(id) {
      this.proposalService.get(id)
        .subscribe((proposal) => {
          this.proposal = proposal;
          this.needService.get(this.proposal._need._id)
          .subscribe((need)=>{
            this.need = need
            setTimeout(()=>{this.userIsCreator = this.need._project._creator===this.user._id}, 0);
          })
        });
    }

    acceptProposal(){
      this.proposalService.editProposal(this.proposal._id, { 'status' : true } );
      switch (this.proposal.coverage) {
        case 'Blue':
          this.needService.editNeed(this.need._id, { 'status' : 'Blue' , '_allocatedProvider' : this.proposal._contributor._id, 'accNo' : this.proposal.accountNo, 'cost' : this.proposal.cost});
          break;
        case 'Green':
          this.needService.editNeed(this.need._id, { 'status' : 'Green' , '_allocatedCollaborator' : this.proposal._contributor._id });
          break;
        default:
      }
      setTimeout(()=>{this.router.navigate(['/projects/'+this.need._project._id]);}, 200);
    }

    errorCb(err) {
      this.user.username = 'not logged in';
    }

    successCb(user) {
      this.user = user;
    }

}
