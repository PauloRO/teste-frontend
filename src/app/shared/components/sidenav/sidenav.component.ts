import { Component, Input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Input() show = false;

  open(event: any) {
    this.show = event;
  }

}
