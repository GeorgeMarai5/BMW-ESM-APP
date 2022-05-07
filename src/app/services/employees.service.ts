import { Injectable } from '@angular/core';
import{ AngularFireDatabase, FirebaseListObservable } from '@angularfire2/database';
import { start } from 'repl';


@Injectable()
    export class EmployeesService{

        constructor(private db: AngularFireDatabase){}
                getEmployees(start, end): FirebaseListObservable<any>{
                    return this.db.list('/employees', {
                        query:{
                            startAt: start,
                            endAt: end
                        }
                    })
                }
        }