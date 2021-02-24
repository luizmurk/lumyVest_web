import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css']
})
export class FundComponent implements OnInit {
  cardNumber: any = '';
  exp_month : any = '';
  exp_year: any = '';
  cvv: any = '';

  cardNumberRequired: boolean = true;
  expMonthRequired: boolean = true;
  expYearRequired: boolean = true;
  cvvRequired: boolean = true;

  expMonthMax: boolean = true;
  expMonthMin: boolean = true;

  expYearMax: boolean = true;
  expYearMin: boolean = true;

  cvvMax: boolean = true;
  cvvMin: boolean = true;


  submitted = false;

  constructor() { }

  ngOnInit(): void {
    
  }

  checkCardNumber(newObj:any){
    console.log(newObj);
    this.cardNumberRequired = true;
    if(newObj.length < 1){
      this.cardNumberRequired = false;
    }
  }

  checkExpMonth(newObj:any){
    console.log(newObj);
    this.expMonthRequired = true;
    if(newObj.length < 1){
      this.expMonthRequired = false;
    }
  }

  checkExpYear(newObj:any){
    console.log(newObj);
    this.expYearRequired = true;
    if(newObj.length < 1){
      this.expYearRequired = false;
    }
  }

  checkCVV(newObj:any){
    console.log(newObj);
    this.cvvRequired = true;
    if(newObj.length < 1){
      this.cvvRequired = false;
    }
  }

  save(){
    this.cardNumberRequired = true;
    this.expMonthRequired = true;
    this.expYearRequired = true;
    this.cvvRequired = true;
    if(this.cardNumber.length < 1){
      this.cardNumberRequired = false;
    }
    if(this.exp_month.length < 1){
      this.expMonthRequired = false;
    }
    if(this.exp_year.length < 1){
      this.expYearRequired = false;
    }
    if(this.cvv.length < 1){
      this.cvvRequired = false;
    }
  }

}
