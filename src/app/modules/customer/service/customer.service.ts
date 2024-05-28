import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASIC_URL = ["http://localhost:9000"]

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor( private http: HttpClient) { }

  getAllCars():Observable<any>{
    return this.http.get(BASIC_URL+"/api/customer/cars",{
      headers: this.createAuthorizationHeader()
    })
  }

  getCarById(carId: number):Observable<any>{
    return this.http.get(BASIC_URL+"/api/customer/car" + carId,{
      headers: this.createAuthorizationHeader()
    })
  }

  bookACar(bookACarDto: any): Observable<any> {
    return this.http.post(BASIC_URL+"/api/customer/car/book" + bookACarDto,{
      headers: this.createAuthorizationHeader()
    })
  }
  
  getBookingsById():Observable<any>{
    return this.http.get(BASIC_URL+"/api/customer/bookings/" + StorageService.getUserId(),{
      headers: this.createAuthorizationHeader()
    })
  }

  searchCar(searchcarDto:any):Observable<any>{
    return this.http.post(BASIC_URL+"/api/customer/car/search",searchcarDto,{
   headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer' + StorageService.getToken()
    );
  }

}
