import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder} from '@angular/forms';
import { ServiceArea } from '../interface/service-area';

@Component({
  selector: 'app-service-areas',
  templateUrl: './service-areas.component.html',
  styleUrls: ['./service-areas.component.scss']
})
export class ServiceAreasComponent implements OnInit {
  
  public searchForm: FormGroup;
  //replace with service data
  public serviceAreaDetails:ServiceArea[]=[
    {
      zipcode:'30002',
      hvac:'HVAC',
      service:'Serviced'
    },
    {
      zipcode:'30025',
      hvac:'HVAC',
      service:'Serviced'
    },
    {
      zipcode:'30028',
      hvac:'HVAC',
      service:'Serviced'
    },
    {
      zipcode:'30029',
      hvac:'HVAC',
      service:'Serviced'
    }
  ];
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this._fb.group({
      county: [''],
      zipcode: [''],
      hvac: ['']
    });
  }
public search(searchForm:any){
  //service call
  console.log(this.searchForm.value);
}
}
