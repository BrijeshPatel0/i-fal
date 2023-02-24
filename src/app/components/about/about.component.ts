import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TextDirectionController } from 'src/app/service/TextDirectionController';
import { ComponentsService } from '../components.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  public directionController = new TextDirectionController();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentsService: ComponentsService,
    public translateService: TranslateService
  ) {
    this.componentsService.currentMessage.subscribe(message => this.directionController.textDirection = message)
  }

  ngOnInit() {
  }

}
