import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-need-view',
  templateUrl: './need-view.component.html',
  styles: []
})
export class NeedViewComponent implements OnInit {
  @Input() need: any;

  constructor() { }

  ngOnInit() {}

}
