import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { Element } from '@angular/compiler';
import { NzMessageRef, NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  cars: any = [];


    constructor(private adminservice: AdminService,
      private message:NzMessageService) { }

    ngOnInit() {
      this.getAllCars();
    }

     getAllCars() {
      this.adminservice.getAllCars().subscribe((res) => {
        console.log(res);
        res.forEach((element: { processedImg: string; returnedImage: string; }) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
          this.cars.push(element);
        });
      })
     }

     deleteCar(id: number){
       console.log(id);
       this.adminservice.deletecar(id).subscribe((res) =>  {
        this.getAllCars();
        this.message.success("Car delete Successfully", {nzDuration: 5000 });
       })
     }

}
