import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Nota } from '../nota';
import { NotaService } from '../nota.service';
import { Mensaje } from '../mensaje';

@Component({
  selector: 'app-nota-detail',
  templateUrl: './nota-detail.component.html',
  styleUrls: ['./nota-detail.component.css']
})
export class NotaDetailComponent implements OnInit {
  nota: Nota | undefined;
  mensajes: Mensaje[] | undefined;
  textoCampo: string;
  textoMensaje: string;

  mensajeSeleccionado?: Mensaje;

  constructor(
    private route: ActivatedRoute,
    private heroService: NotaService,
    private location: Location
  ) {
    this.textoCampo = '';
    this.textoMensaje = '';
  }

  ngOnInit(): void {
    this.getNota();
  }

  getNota(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getNota(id)
      .subscribe(nota => {
        this.nota = nota;
        this.mensajes = nota.mensajes;
      });
  }


  goBack(): void {
    this.location.back();
  }

  agregarMensaje(mensaje: string) {
    if (this.mensajes && !this.mensajes.some(sp => sp.name === mensaje) && mensaje !== '') {
      const newMensaje: Mensaje = { id: 0, name: mensaje };
      this.mensajes.push(newMensaje);
    } else {
      alert('Mensaje ya existe');
    }
  }

  eliminarMensaje(mensaje: string) {
    if (this.mensajes) {
      const index = this.mensajes.findIndex(sp => sp.name === mensaje);
      if (index > -1) {
        this.mensajes.splice(index, 1);
      }
    }
  }


  updateNota() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10); // ID del héroe que deseas actualizar
    const updatedNota = {
      name: this.nota?.name, // Nuevo nombre del héroe
      mensajes: this.mensajes, // Nuevos superpoderes del héroe
    };

    this.heroService.updateHero(id, updatedNota).subscribe(
      (response) => {
        console.log('Nota actualizada:', response);
      },
      (error) => {
        console.error('Error al actualizar la nota:', error);
      }
    );
  }

  handleKeyPress(event: KeyboardEvent, mensaje: string) {
    if (event.key === 'Enter') {
      this.agregarMensaje(mensaje);
      this.textoCampo = '';
    }
  }

  seleccionarMensaje(mensajeSeleccionado: Mensaje) {
    this.mensajeSeleccionado = mensajeSeleccionado;
    this.textoMensaje = mensajeSeleccionado.name;
  }

}
