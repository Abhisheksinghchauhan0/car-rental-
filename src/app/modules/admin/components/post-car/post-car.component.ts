import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss'
})
export class PostCarComponent {
  postCarForm!: FormGroup;
  isSpinning: boolean=false;
  selectedFile!: File | null;
  imagePreview!: string | ArrayBuffer | null;
  listofoption: Array<{lable: string; value: string }> = [];
  listofBrand = ["Mahendra","TATA","TESLA","VOLVO","LAND ROVER",
    "Jaguar","Maruti Suzuki","Toyota","BMW", "Audi","Ferrari","Honda" ];
  listofType = ["Diesel","Petrol","CNG","Electric"];
  listofColor = ["Red","White","Black","Silver","Grey","Yellow"];
  listoftTransmission = ["Mannual","Automatic"];

  constructor(private fb: FormBuilder,
    private adminservice:AdminService,
     private message:NzMessageService,
     private router: Router){ }

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null,Validators.required],
      type: [null,Validators.required],
      color: [null,Validators.required],
      transmission: [null,Validators.required],
      price: [null,Validators.required],
      description: [null,Validators.required],
      year: [null,Validators.required],
    })
  }

postCar(){
  this.isSpinning = true;
  const formData: FormData = new FormData();
  formData.append('img', this.selectedFile!);
  formData.append('brand', this.postCarForm.get('brand')?.value);
  formData.append('name', this.postCarForm.get('name')?.value);
  formData.append('type', this.postCarForm.get('type')?.value);
  formData.append('color', this.postCarForm.get('color')?.value);
  formData.append('year', this.postCarForm.get('year')?.value);
  formData.append('transmission', this.postCarForm.get('transmission')?.value);
  formData.append('description', this.postCarForm.get('description')?.value);
  formData.append('price', this.postCarForm.get('price')?.value);  
  console.log(formData);
  this.adminservice.postCar(formData).subscribe((res)=> {
  this.isSpinning = false;
  this.message.success("car posted successfully", {nzDuration: 5000 });
  this.router.navigateByUrl("/admin/dashboard");
  console.log(res);
 }, error => {
  this.message.error("Error while posting car", { nzDuration: 5000})
 })
}

onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
}

    previewImage () {
      const reader = new FileReader();
      reader.onload = () => {
      this.imagePreview = reader.result;
    }
     reader.readAsDataURL(this.selectedFile!);
    }}
