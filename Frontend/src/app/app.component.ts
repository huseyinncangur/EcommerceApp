import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './common/shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SharedModule],
  template: `<router-outlet> </router-outlet>
  <ngx-spinner bdColor = "rgba(0, 0, 0, 0.8)" size = "medium" color = "#fff" type = "ball-clip-rotate" [fullScreen] = "true"><p style="color: white" > Yükleniyor... </p></ngx-spinner>
  `,
  
})
export class AppComponent {
  title = 'Frontend';
}
