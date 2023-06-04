import { Component, OnInit } from '@angular/core';
import { Nota } from '../nota';
import { NotaService } from '../nota.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  notas: Nota[] = [];

  constructor(private heroService: NotaService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getNotas();
  }

  getNotas(): void {
    this.heroService.getNotas()
      .subscribe(notas => this.notas = notas.slice(0, 5));
  }

}
