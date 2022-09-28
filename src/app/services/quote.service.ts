import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Quote } from '../models/Quote';
import { retry, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})

export class TeamService {

 apiUrl = 'https://localhost:7163';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
  headers: new HttpHeaders({
   'Content-Type': 'application/json'
   })
    }
   
    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError('Something bad happened; please try again later.');
    }
  
  createQuote(createQuote: Quote){
    return this.httpClient.post(this.apiUrl + '/api/Quotes/CreateQuote' , Quote, this.httpOptions)
  }

  getQuoteList(): Observable<Quote> {
    return this.httpClient
      .get<Quote>(this.apiUrl + '/api/Quotes/GetQuoteList')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getQuote(id): Observable<Quote> {
    return this.httpClient
      .get<Quote>(this.apiUrl + '/api/Quotes/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateQuote(item): Observable<Quote> {
    return this.httpClient
      .put<Quote>(this.apiUrl + '/api/Quotes/' + '?' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  deleteQuote(id): Observable<{}> {
  
    return this.httpClient.delete(this.apiUrl + '/api/Quotes/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}

// import { Injectable } from '@angular/core';
// import { AngularFirestore } from "@angular/fire/compat/firestore";
// import {
//   AngularFireDatabase,
//   AngularFireList,
//   AngularFireObject
// } from '@angular/fire/compat/database';
// import { Observable, throwError } from 'rxjs';
// import { Quotes } from '../models/Quote';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { retry,catchError, tap, map } from 'rxjs/operators';


// @Injectable({
//   providedIn: 'root'
// })
// export class QuoteService {

//   apiUrl = 'https://localhost:7292'
//   httpOptions ={
//     headers: new HttpHeaders({
//       ContentType: 'application/json'
//     })
//   }








//  collectionName = 'Quote';
//   QuoteRef: AngularFireObject<any>;

//   constructor(private db: AngularFireDatabase,
//     private firestore: AngularFirestore,private httpClient: HttpClient
//   ) { }


//   private handleError(error: HttpErrorResponse) {
//     if (error.error instanceof ErrorEvent) {
//       // A client-side or network error occurred. Handle it accordingly.
//       console.error('An error occurred:', error.error.message);
//     } else {
//       // The backend returned an unsuccessful response code.
//       // The response body may contain clues as to what went wrong,
//       console.error(
//         `Backend returned code ${error.status}, ` +
//         `body was: ${error.error}`);
//     }
//     // return an observable with a user-facing error message
//     return throwError('Something bad happened; please try again later.');
    
//   }





//   AddQuote(quote: Quotes){
//     return this.httpClient.post(this.apiUrl + '/api/Fleet/Create' , quote, this.httpOptions)


//   }


//   getList(): Observable<Quotes> {
//     return this.httpClient
//       .get<Quotes>(this.apiUrl + '/api/Quote/GetAllQuotes')
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }










//   create_Quote(Quote) {
//     return this.firestore.collection(this.collectionName).add(Quote);
//   }

//   read_Quote() {
//     return this.firestore.collection(this.collectionName).snapshotChanges();
//   }

//   get_Quote(){
//     return this.firestore.collection('Quote').snapshotChanges();
//   }

//   getQuote(id: string){
//     return this.firestore.collection(this.collectionName).doc(id);
//   }

//   update_Quote(FleetID,Fleet) {
//     this.firestore.doc(this.collectionName + '/' + FleetID).update(Fleet);
//   }

//   updateQuote(id, Quote) {
//     this.firestore.doc(this.collectionName + '/' + id).update(Quote);
//   }

//   deleteQuote(id: string) {
//     this.QuoteRef = this.db.object('/Quote/' + id);
//     this.QuoteRef.remove();
//   }




//   delete_Quote(Fleet_ID) {
//     this.firestore.doc(this.collectionName + '/' + Fleet_ID).delete();
//   }
// }



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
