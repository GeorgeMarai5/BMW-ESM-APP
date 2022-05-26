import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  collectionName = 'Vehicle';

  constructor(private firestore: AngularFirestore) { }

  getVehicles() {
    return this.firestore.collection('Vehicle').snapshotChanges();
  }

  createVehicle(vehicle) {
    return this.firestore.collection(this.collectionName).add(vehicle);
  }

  getVehicle(id: string){
    return this.firestore.collection(this.collectionName).doc(id).get()
  }

  updateVehicle(id, vehicle) {
    this.firestore.doc(this.collectionName + '/' + id).update(vehicle);
  }

  deleteVehicle(id) {
    this.firestore.doc(this.collectionName + '/' + id).delete();
  }

  getYear(yearCode: string){
    let yearFromCode = '';
    switch(yearCode){
      case 'Y':
        yearFromCode = '2000';
        break;
      case '1':
        yearFromCode = '2001'; 
        break;
      case '2':
        yearFromCode = '2002'; 
        break;
      case '3':
        yearFromCode = '2003'; 
        break;
      case '4':
        yearFromCode = '2004'; 
        break;
      case '5':
        yearFromCode = '2005'; 
        break;
      case '6':
        yearFromCode = '2006'; 
        break;
      case '7':
        yearFromCode = '2007'; 
        break;
      case '8':
        yearFromCode = '2008'; 
        break;
      case '9':
        yearFromCode = '2009'; 
        break;
      case 'A':
        yearFromCode = '2010'; 
        break;
      case 'B':
        yearFromCode = '2011'; 
        break;
      case 'C':
        yearFromCode = '2012'; 
        break;
      case 'D':
        yearFromCode = '2013'; 
        break;
      case 'E':
        yearFromCode = '2014'; 
        break;
      case 'F':
        yearFromCode = '2015'; 
        break;
      case 'G':
        yearFromCode = '2016'; 
        break;
      case 'H':
        yearFromCode = '2017'; 
        break;
      case 'J':
        yearFromCode = '2018'; 
        break;
      case 'K':
        yearFromCode = '2019'; 
        break;
      case 'L':
        yearFromCode = '2020'; 
        break;
      case 'M':
        yearFromCode = '2021'; 
        break;
      case 'N':
        yearFromCode = '2022'; 
        break;
      case 'P':
        yearFromCode = '2023'; 
        break;
      case 'R':
        yearFromCode = '2024'; 
        break;
      case 'S':
        yearFromCode = '2025'; 
        break;
      case 'T':
        yearFromCode = '2026'; 
        break;
      case 'V':
        yearFromCode = '2027'; 
        break;
      case 'W':
        yearFromCode = '2028'; 
        break;
      case 'X':
        yearFromCode = '2029'; 
        break;
      default:
        yearFromCode = 'No Year';
        break;
    }
    return yearFromCode;
  }
}
