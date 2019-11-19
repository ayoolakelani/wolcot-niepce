import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/business-registration', title: 'Business Registration',  icon:'education_atom', class: '' },
    { path: '/will-management', title: 'Will Management',  icon:'location_map-big', class: '' },
    { path: '/drafts', title: 'Drafts',  icon:'ui-1_bell-53', class: '' },
    { path: '/logout', title: 'Sign Out',  icon:'users_single-02', class: '' },


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
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
 
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
