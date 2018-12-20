import { Component, OnInit } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  constructor(private menuCtrl: MenuController) {
  }

  ngOnInit() {
  }

  onToggleMenu()
  {
    this.menuCtrl.open();
  }
}
