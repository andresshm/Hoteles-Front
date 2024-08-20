import { Injectable, InjectionToken, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { BehaviorSubject } from 'rxjs';

export const SERVER_LANG_TOKEN = new InjectionToken<string>('SERVER_LANG_TOKEN');

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  cookie = inject(SsrCookieService);
  translate = inject(TranslateService);

  langServer = inject(SERVER_LANG_TOKEN, {
    optional: true,
  });

  private currentLangSubject = new BehaviorSubject<string>(this.langServer ?? 'es');
  currentLang$ = this.currentLangSubject.asObservable();

  changeLang(lang: string) {
    this.cookie.set('lang', lang);
    console.log({ lang });

    this.translate.setDefaultLang(lang);
    this.translate.use(lang);

    this.currentLangSubject.next(lang);
  }
}
