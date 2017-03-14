import { Component, OnInit, Input } from '@angular/core';
import { NeedService } from './../need.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-need-view',
  templateUrl: './need-view.component.html',
  styles: []
})
export class NeedViewComponent implements OnInit {
  @Input() need: any;
  @Input() userIsCreator: boolean;
  @Input() user: boolean;
  @Input() project: any;


  constructor(private router: Router, private needService: NeedService) { }

  ngOnInit() {}

  deleteNeed(id) {
    this.needService.deleteNeed(id)
      .subscribe((response) => {
        console.log(response);
        this.needService.getDeletedEventEmitter().emit();
      });
  }

}
