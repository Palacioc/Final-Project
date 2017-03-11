/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NeedNewComponent } from './need-new.component';

describe('NeedNewComponent', () => {
  let component: NeedNewComponent;
  let fixture: ComponentFixture<NeedNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
