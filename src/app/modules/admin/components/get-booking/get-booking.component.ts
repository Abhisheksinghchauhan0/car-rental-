import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-get-booking',
  templateUrl: './get-booking.component.html',
  styleUrl: './get-booking.component.scss'
})
export class GetBookingComponent {

  bookings:any;
  isSpinning:any;

  constructor(private adminService: AdminService,
    private message:NzMessageService ) {
    this.getBookings();
  }

  getBookings(){
    this.isSpinning=true;
    this.adminService.getCarBookings().subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.bookings(res);
    })
  }

  changeBookingStatus(bookingId: number, status: string){
    this.isSpinning = true;
    console.log(bookingId,status);
    this.adminService.changeBookingStatus(bookingId,status).subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.getBookings();
      this.message.success("booking status change successfull!", { nzDuration: 5000});
    }, error => {
      this.message.error("something went Wrong", {nzDuration: 5000 });
    })
  }

}
