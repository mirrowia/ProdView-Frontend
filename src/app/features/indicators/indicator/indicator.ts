import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-indicator',
  imports: [],
  templateUrl: './indicator.html',
  styleUrl: './indicator.css',
})
export class Indicator {
  indicatorId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.indicatorId = this.route.snapshot.paramMap.get('id');
  }

  go(action: string) {
    this.router.navigate([`http://localhost:8090/ops/${action}`]);
  }
}
