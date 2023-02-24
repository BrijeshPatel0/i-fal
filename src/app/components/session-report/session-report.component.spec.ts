/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SessionReportComponent } from './session-report.component';

describe('SessionReportComponent', () => {
  let component: SessionReportComponent;
  let fixture: ComponentFixture<SessionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
