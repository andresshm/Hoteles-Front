import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { LanguageService } from '../service/lang-service.service';
import { TranslateDirective, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-language-selector',
//   standalone: true,
//   imports: [CommonModule, TranslateModule,],
  templateUrl: './language-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent implements OnInit {
  languageService = inject(LanguageService);

  // Observable que mantendrá el idioma actual
  currentLang$ = this.languageService.currentLang$;

  // Lista de idiomas soportados
  languages = new BehaviorSubject([
    { code: 'en', flag: '🇺🇸' },
    { code: 'es', flag: '🇪🇸' },
    { code: 'fr', flag: '🇫🇷' },
    { code: 'it', flag: '🇮🇹' },
  ]);

  ngOnInit() {
    // Si necesitas hacer algo cuando se inicialice el componente, lo haces aquí
    this.currentLang$.subscribe((lang) => {
      console.log('Current language is:', lang);
    });
  }

  changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;

    this.languageService.changeLang(lang);
  }
}
