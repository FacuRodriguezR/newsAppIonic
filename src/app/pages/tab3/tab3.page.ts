import { Component } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  get articles(): Article[] {
    return this.storageService.getLocalArticles;
  }

  constructor( private storageService: StorageServiceService) {}

}
