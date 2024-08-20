import { Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    // Establecer el idioma predeterminado
    translate.setDefaultLang('en');

    // Cambiar el idioma actual a español
    // translate.use('es');
    translate.use(environment.language);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
