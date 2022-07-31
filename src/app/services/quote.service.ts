import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  collectionName = 'Quote';
  QuoteRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase,
    private firestore: AngularFirestore
  ) { }

  create_Quote(Quote) {
    return this.firestore.collection(this.collectionName).add(Quote);
  }

  read_Quote() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  get_Quote(){
    return this.firestore.collection('Quote').snapshotChanges();
  }

  getQuote(id: string){
    return this.firestore.collection(this.collectionName).doc(id);
  }

  update_Quote(FleetID,Fleet) {
    this.firestore.doc(this.collectionName + '/' + FleetID).update(Fleet);
  }

  updateQuote(id, fleets) {
    this.firestore.doc(this.collectionName + '/' + id).update(fleets);
  }

  deleteQuote(id: string) {
    this.QuoteRef = this.db.object('/Quote/' + id);
    this.QuoteRef.remove();
  }




  delete_Quote(Fleet_ID) {
    this.firestore.doc(this.collectionName + '/' + Fleet_ID).delete();
  }
}



/*  api cruds
getQuote(): Observable<any> {
  return this.http.get(apiUrl, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

getQuoteById(id: string): Observable<any> {
  const url = `${apiUrl}/${id}`;
  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

postQuote(data): Observable<any> {
  const url = `${apiUrl}/add_with_students`;
  return this.http.post(url, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

updateQuote(id: string, data): Observable<any> {
  const url = `${apiUrl}/${id}`;
  return this.http.put(url, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

deleteQuote(id: string): Observable<{}> {
  const url = `${apiUrl}/${id}`;
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}


more infomation :

 constructor(private http: HttpClient) { }
  addSong(song: Song): Observable<any> {
    return this.http.post<Song>('http://localhost:3000/api/create-song', song, this.httpOptions)
      .pipe(
        catchError(this.handleError<Song>('Add Song'))
      );
  }
  getSong(id): Observable<Song[]> {
    return this.http.get<Song[]>('http://localhost:3000/api/get-song/' + id)
      .pipe(
        tap(_ => console.log(`Song fetched: ${id}`)),
        catchError(this.handleError<Song[]>(`Get Song id=${id}`))
      );
  }
  getSongList(): Observable<Song[]> {
    return this.http.get<Song[]>('http://localhost:3000/api')
      .pipe(
        tap(songs => console.log('Songs fetched!')),
        catchError(this.handleError<Song[]>('Get Songs', []))
      );
  }
  updateSong(id, song: Song): Observable<any> {
    return this.http.put('http://localhost:3000/api/update-song/' + id, song, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Song updated: ${id}`)),
        catchError(this.handleError<Song[]>('Update Song'))
      );
  }
  deleteSong(id): Observable<Song[]> {
    return this.http.delete<Song[]>('http://localhost:3000/api/delete-song/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Song deleted: ${id}`)),
        catchError(this.handleError<Song[]>('Delete Song'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

















*/
