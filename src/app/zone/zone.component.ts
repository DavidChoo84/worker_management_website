import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
  readonly time = new Date();
  date: string;
  result: string;

  constructor() {
      this.date = this.time.toLocaleDateString();

      const [month, day, year] = this.date.split('/');

      this.result = [day, month, year].join('/');

   }

  ngOnInit(): void {
  }

}
