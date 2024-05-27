import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {

  searchCarForm! : FormGroup;
  listofoption: Array<{lable: string; value: string }> = [];
  listofBrand = ["Mahendra","TATA","TESLA","VOLVO","LAND ROVER",
    "Jaguar","Maruti Suzuki","Toyota","BMW", "Audi","Ferrari","Honda" ];
  listofType = ["Diesel","Petrol","CNG","Electric"];
  listofColor = ["Red","White","Black","Silver","Grey"];
  listoftTransmission = ["Mannual","Automatic"];
  isSpinning = false;
  cars: any = [];

  constructor(private fb: FormBuilder,
   private service: AdminService){
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null],
    })
  }

  searchCar(){
    this.isSpinning = true;
    this.service.searchCar(this.searchCarForm.value).subscribe((res) => {
      res.carDtoList.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
      this.isSpinning  = false;
    })
   }
}
