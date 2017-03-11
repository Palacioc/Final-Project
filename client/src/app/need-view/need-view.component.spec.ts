/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NeedViewComponent } from './need-view.component';

describe('NeedViewComponent', () => {
  let component: NeedViewComponent;
  let fixture: ComponentFixture<NeedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
