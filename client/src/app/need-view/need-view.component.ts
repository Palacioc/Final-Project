import { Component, OnInit, Input } from '@angular/core';
import { NeedService } from './../need.service';
import { Router } from '@angular/router';
import { ProposalService } from './../proposal.service';
import { environment } from '../../environments/environment';




@Component({
  selector: 'app-need-view',
  templateUrl: './need-view.component.html',
  styleUrls: ['./need-view.component.css']
})
export class NeedViewComponent implements OnInit {
  @Input() need: any;
  @Input() open: boolean;
  @Input() userIsCreator: boolean;
  @Input() user: any;
  @Input() project: any;
  proposals: any;
  fundingProposals : any;
  sourcingProposals : any;
  BASEURL = environment.apiURL;
  openString : string;

  constructor(private proposalService: ProposalService, private router: Router, private needService: NeedService) { }

  ngOnInit() {
    this.openString = this.open + '';
    this.proposalService.getByNeed(this.need._id)
    .subscribe((proposals)=>{
      this.proposals = proposals;
      this.fundingProposals = this.proposals.filter((elem)=>(elem.coverage === 'Green'))
      this.sourcingProposals = this.proposals.filter((elem)=>(elem.coverage === 'Blue'))
      console.log('Todos los proposals: ', this.proposals);
      console.log('Funding: ', this.fundingProposals);
      console.log('Sourcing', this.sourcingProposals);
    });

  }

  editNeed() {
    this.router.navigate(['/needs/edit/'+this.need._id]);
  }

  deleteNeed(id) {
    this.needService.deleteNeed(id)
      .subscribe((response) => {
        console.log(response);
        this.needService.getDeletedEventEmitter().emit();
      });
  }

}
