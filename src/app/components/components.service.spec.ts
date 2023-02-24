/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComponentsService } from './components.service';

describe('Service: Components', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentsService]
    });
  });

  it('should ...', inject([ComponentsService], (service: ComponentsService) => {
    expect(service).toBeTruthy();
  }));
});
