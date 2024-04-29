import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { Share } from '@capacitor/share';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent  implements OnInit {

  @Input()
  article!: Article;
  @Input()
  index!: number; 
  

  constructor(
    
    private actionSheetCtrl: ActionSheetController,
    private storageService: StorageServiceService
  ) { 
  
  }

  ngOnInit() {}

  openArticle(){

    window.open(this.article.url, '_blank')

  }

  async onOpenMenu(){

    const articleInFavorite = this.storageService.articleInFavorites(this.article);

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-outline',
          handler: () => this.onShareArticle()
        },
        {
          text: articleInFavorite ? 'Remover favorito' : 'Favorito',
          icon: articleInFavorite ? 'heart': 'heart-outline',
          handler: () => this.onToggleFavorite()
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',
          cssClass: 'secondary'

        }
      ]
    });

    await actionSheet.present();

  }

  private async onShareArticle() {
    return await Share.share({
      title: this.article.title,
      text: this.article.description,
      url: this.article.url,
      dialogTitle: this.article.source.name
    })
  }

  onToggleFavorite(){
    this.storageService.saveRemoveArticle(this.article);
  }
}
