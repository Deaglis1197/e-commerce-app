import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first, last } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  totalPrice:number=0;
  totalQuantity:number=0;
  isShpFree:boolean=false;

  checkoutFormGroup: FormGroup;
  constructor(private formBuilder:FormBuilder){
    this.checkoutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      billingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      creditCart: this.formBuilder.group({
        cartType:[''],
        nameOnCart:[''],
        cartNumber:[''],
        securityCode:[''],
        expirationYear:[''],
        expirationMonth:[''],
      })

    });
  }
  ngOnInit():void{
    
  }

  onSubmit(){
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log("The email address is "+this.checkoutFormGroup.get('customer')!.value.email);
  }
  copyShippingAdressToBillingAddress(event:any){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress
      .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }
}
