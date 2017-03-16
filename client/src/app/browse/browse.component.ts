import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { Router } from '@angular/router';
import { NeedService } from "../need.service";
import { ProjectService } from "../project.service";
import { ProposalService } from "../proposal.service";


@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  constructor(private session: SessionService, private router: Router, private projectService: ProjectService, private needService: NeedService, private proposalService: ProposalService) { }

  formInfo: string;
  closeResult: string;
  user: any;
  error: string;
  need: any;
  proposals: any;
  projects: any;
  fourLatest: any;
  searchResult: any;
  model = {
    status: 'All',
    coverage: 'All',
  };
  currentProp: any;

  shouldFilterByStatus: boolean = this.model.status!=='All';
  shouldFilterByType: boolean = this.model.coverage!=='All';

  submitForm(theForm){
    this.search(this.formInfo);
  }

  returnType(string){
    return string==='Green' ? 'fund' : 'source'
  }

  returnStatus(bool){
    return bool ? 'Accepted' : 'Pending'
  }

  ngOnInit() {
   this.session.isLoggedIn()
     .subscribe(
       (user) => {
         this.successCb(user);
         this.getAllInfo(user)
       },
       (err) => {this.errorCb(err)}

   );
   this.projectService.getFourLatest().subscribe((projects)=>{
     this.fourLatest = projects;
   })
  };

  getAllInfo(user){
    this.projectService.getByCreator(user._id).subscribe((projects)=>{
      this.projects = projects;
    })
    this.proposalService.getByCreator(user._id)
    .subscribe((proposals)=>{
      this.proposals = proposals;
    })
  }

  search(term){
    this.projectService.search(term).subscribe((projects)=>{
      this.searchResult = projects;
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
