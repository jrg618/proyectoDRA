import { Component, OnInit } from '@angular/core';

import { Nota } from '../nota';
import { NotaService } from '../nota.service';
import { Mensaje } from '../mensaje';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  notas: Nota[] = [];
  textoCampo: string;

  constructor(private notaService: NotaService) {
    this.textoCampo = '';
  }

  ngOnInit(): void {
    this.getNotas();
  }

  getNotas(): void {
    this.notaService.getNotas()
      .subscribe(notas => this.notas = notas);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.notaService.addNota({ name } as Nota)
      .subscribe(nota => {
        this.notas.push(nota);
      });
  }

  delete(nota: Nota): void {
    this.notas = this.notas.filter(h => h !== nota);
    this.notaService.deleteNota(nota.id).subscribe();
  }

  handleKeyPress(event: KeyboardEvent, name: string) {
    if (event.key === 'Enter') {
      this.add(name);
      this.textoCampo = '';
    }
  }
}
/* <label>Añadir nueva nota: </label><br>
  <input id="new-hero" [(ngModel)]="textoCampo" placeholder="Nombre de la nota"
    (keyup)="handleKeyPress($event, textoCampo)" />

  <button type="button" class="add-button" (click)="add(textoCampo); textoCampo=''">
    Añadir nota
  </button>*/