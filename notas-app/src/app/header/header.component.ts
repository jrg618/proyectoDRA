import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Notas';

  weatherData: any;

  constructor(private http: HttpClient) {
    this.getWeatherData();
  }
  ngOnInit(): void {
    this.getWeatherData();
  }

  getWeatherData() {
    const url = 'https://goweather.herokuapp.com/weather/almeria';
    this.http.get(url).subscribe((data: any) => {
      this.weatherData = data;
    });
  }

}
