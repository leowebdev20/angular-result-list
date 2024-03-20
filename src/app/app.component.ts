import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResultListComponent } from './result-list/result-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResultListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'result-list';
}
