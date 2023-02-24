/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookLessionComponent } from './book-lession.component';

describe('BookLessionComponent', () => {
  let component: BookLessionComponent;
  let fixture: ComponentFixture<BookLessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookLessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookLessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
