import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, UrlTree, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canMatch(route: Route, segments: UrlSegment[]): Observable<boolean>  | boolean  {
        return this.authService.checkAuthentication();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.authService.checkAuthentication();
    }
    
}