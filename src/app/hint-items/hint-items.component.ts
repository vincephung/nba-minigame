import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hint-items',
  templateUrl: './hint-items.component.html',
  styleUrls: ['./hint-items.component.css']
})
export class HintItemsComponent {
  @Input() playerStat = "";
  @Input() statName = "";
  textVisible = false;

  handleClick(): void{
    this.textVisible = !this.textVisible;
  }
}
