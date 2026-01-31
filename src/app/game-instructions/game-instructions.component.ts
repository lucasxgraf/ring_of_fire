import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-game-instructions',
  standalone: true,
  imports: [MatCardModule,],
  templateUrl: './game-instructions.component.html',
  styleUrl: './game-instructions.component.scss'
})
export class GameInstructionsComponent {

}
