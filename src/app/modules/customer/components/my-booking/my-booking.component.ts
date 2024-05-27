import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.scss'
})
export class MyBookingComponent {

  booking : any;
  isSpinning = false;
   bookedCars: any;
  constructor(private service: CustomerService){
  this.getMyBooking();
  }

  getMyBooking(){
    this.isSpinning = true;
    this.service.getBookingsById().subscribe((res) => {
      this.isSpinning = false;
      //console.log(res);
      this.booking = res;
      this.bookedCars = res;
    })
  }

}
