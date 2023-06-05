import { Injectable } from '@angular/core';
import { Nota } from './nota';
//import { HEROES } from './mock-heroes';

import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Mensaje } from './mensaje';
import { environment } from 'environment';

@Injectable({ providedIn: 'root' })
export class NotaService {

  private notasUrl = "/api/notas";  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  /** GET heroes from the server */
  getNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.notasUrl
    )
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Nota[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getNota(id: number): Observable<Nota> {
    const url = `${this.notasUrl
      }/${id}`;
    return this.http.get<Nota>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Nota>(`getHero id=${id}`))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Nota> {
    const url = `${this.notasUrl
      }/?id=${id}`;
    return this.http.get<Nota[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Nota>(`getHero id=${id}`))
      );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Nota[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Nota[]>(`${this.notasUrl
      }/?name=${term}`).pipe(
        tap(x => x.length ?
          this.log(`found heroes matching "${term}"`) :
          this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Nota[]>('searchHeroes', []))
      );
  }

  getMensajes(id: number): Observable<Nota> {
    const url = `${this.notasUrl
      }/${id}`;
    return this.http.get<Nota>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Nota>(`getHero id=${id}`))
    );
  }


  /** POST: add a new hero to the server */
  addNota(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.notasUrl
      , nota, this.httpOptions).pipe(
        tap((newHero: Nota) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Nota>('addHero'))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteNota(id: number): Observable<Nota> {
    const url = `${this.notasUrl
      }/${id}`;

    return this.http.delete<Nota>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted nota id=${id}`)),
      catchError(this.handleError<Nota>('deleteNota'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(id: number, updatedNota: any) {
    return this.http.put(`/api/notas/${id}`, updatedNota);
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
*
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


  // API TIEMPO
  getWeatherData() {
    const url = 'https://goweather.herokuapp.com/weather/almeria';
    this.http.get(url).subscribe((data: any) => {
      // Aquí puedes manipular los datos obtenidos del JSON
      console.log(data);
      // Asigna los datos a variables en tu componente para mostrarlos en la plantilla
    });
  }



}
