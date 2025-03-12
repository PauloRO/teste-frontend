import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnChanges {
  @Input() show = false;

  open(event: any) {
    this.show = event;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']) { 

      console.log(this.show);
    }
  }
}
