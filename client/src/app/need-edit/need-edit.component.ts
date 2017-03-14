import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { ProjectService } from "../project.service";
import { NeedService } from "../need.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-need-edit',
  templateUrl: './need-edit.component.html',
  styles: []
})
export class NeedEditComponent implements OnInit {

  formInfo = {
    name: '',
    description: '',
    cost: ''
  };
  feedback: string;
  needID: string;
  need: any;
  user: any;


  constructor(private session: SessionService, private needService: NeedService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.session.isLoggedIn()
    .subscribe(
      (user) => {this.user = user}
    );
    this.route.params.subscribe(params => {
      this.needID = params['id'];
      this.getNeedDetails(this.needID);
    });
  }

  getNeedDetails(id) {
    this.needService.get(id)
      .subscribe((need) => {
        this.need = need;
        console.log(this.need)
      });
  }

  submitForm(theForm){
    console.log(this.formInfo);
    this.needService.editNeed(this.needID, this.formInfo)
      .subscribe((need) => {
        console.log(need);
       this.router.navigate(['/projects/'+this.need._project._id]);
      });
  }

  }
