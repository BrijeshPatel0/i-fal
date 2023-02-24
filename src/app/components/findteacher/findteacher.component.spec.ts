/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FindteacherComponent } from './findteacher.component';

describe('FindteacherComponent', () => {
  let component: FindteacherComponent;
  let fixture: ComponentFixture<FindteacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindteacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
