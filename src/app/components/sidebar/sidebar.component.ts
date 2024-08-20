import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    show: boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', show: true },
    { path: '/user-profile', title: 'huesped',  icon:'person', class: '', show: true },
    { path: '/typography', title: 'hotel',  icon:'hotel_class', class: '', show: true },
    { path: '/icons', title: 'habitacion',  icon:'room_preferences', class: '', show: true },
    { path: '/maps', title: 'servicio',  icon:'room_service', class: '', show: true },
    { path: '/table-list', title: 'gestion_servicios',  icon:'content_paste', class: '', show: environment.tableList },
    { path: '/notifications', title: 'gestion_huespedes',  icon:'manage_accounts', class: '', show: environment.notification },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem && menuItem.show);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
