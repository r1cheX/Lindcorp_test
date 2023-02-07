import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  public router: Router;
  currentRoute: string;


  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [{ title: 'Card 1', cols: 1, rows: 1 }];
      }

      return [{ title: 'Card 1', cols: 2, rows: 1 }];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, router: Router) {
    this.router = router;
    this.currentRoute = this.router.url;
  }
}
