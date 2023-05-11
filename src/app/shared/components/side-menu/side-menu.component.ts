import { Component } from '@angular/core';

interface MenuItems {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [],
})
export class SideMenuComponent {
  public reactiveMenu: MenuItems[] = [
    {
      title: 'Basics',
      route: './reactive/basics',
    },
    {
      title: 'Dynamics',
      route: './reactive/dynamics',
    },
    {
      title: 'Switchs',
      route: './reactive/switches',
    },
  ];

  public authMenu: MenuItems[] = [
    {
      title: 'Sign up',
      route: './auth/sign-up',
    },
  ];
}
