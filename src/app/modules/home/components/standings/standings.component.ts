import { Component, Input } from '@angular/core';
import { Standing } from '../../models/standing.model';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent {

  @Input() currentYear!: string;
  @Input() leagueId!: string;
  @Input() standings: Standing[]= [];

}
