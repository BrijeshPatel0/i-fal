/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookYourLessonComponent } from './book-your-lesson.component';

describe('BookYourLessonComponent', () => {
  let component: BookYourLessonComponent;
  let fixture: ComponentFixture<BookYourLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookYourLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookYourLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
