import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { Router } from '@angular/router';
import { NeedService } from "../need.service";
import { ProjectService } from "../project.service";
import { ProposalService } from "../proposal.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private modalService: NgbModal, private session: SessionService, private router: Router, private projectService: ProjectService, private needService: NeedService, private proposalService: ProposalService) { }

  closeResult: string;
  user: any;
  error: string;
  need: any;
  proposals: any;
  projects: any;
  model = {
    status: 'All',
    coverage: 'All',
  };
  currentProp: any;

  shouldFilterByStatus: boolean = this.model.status!=='All';
  shouldFilterByType: boolean = this.model.coverage!=='All';

  open(content, prop) {
    this.currentProp = prop;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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
