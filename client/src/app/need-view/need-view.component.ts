import { Component, OnInit, Input } from '@angular/core';
import { NeedService } from './../need.service';
import { Router } from '@angular/router';
import { ProposalService } from './../proposal.service';




@Component({
  selector: 'app-need-view',
  templateUrl: './need-view.component.html',
  styleUrls: ['./need-view.component.css']
})
export class NeedViewComponent implements OnInit {
  @Input() need: any;
  @Input() userIsCreator: boolean;
  @Input() user: any;
  @Input() project: any;
  proposals: any;
  fundingProposals : any;
  sourcingProposals : any;

  constructor(private proposalService: ProposalService, private router: Router, private needService: NeedService) { }

  ngOnInit() {
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

  deleteNeed(id) {
    this.needService.deleteNeed(id)
      .subscribe((response) => {
        console.log(response);
        this.needService.getDeletedEventEmitter().emit();
      });
  }

}
