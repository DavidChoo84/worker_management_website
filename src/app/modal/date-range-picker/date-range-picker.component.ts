import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent {
  @Input()
  rangeDates: Date[];;
  constructor(
    private activeModal: NgbActiveModal,
  ) { 
  }

  ngOnInit(): void {
  }

  chooseDate(date: any){
    for (var i = 0; i < this.rangeDates.length; i++){
      if (this.rangeDates[i+1] != null){
        setTimeout(() => {
          this.close();
        }, 300)
      }
    }
  }

  close(){
    this.activeModal.close(this.rangeDates); //close the pop up
  }
}
