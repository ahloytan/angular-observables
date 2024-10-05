import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ControlEvent } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-observable-form',
  templateUrl: './observable-form.component.html',
  styleUrl: './observable-form.component.scss'
})
export class ObservableFormComponent implements OnInit {
  myForm: FormGroup;
  formStatus: string = "";
  formValue: any;
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        streetDetails: this.fb.group({
          streetName: [''],
          streetNumber: [''],
        }),
        city: [''],
        state: [''],
        zip: ['']
      })
      // Add other controls as needed
    });
  }

  ngOnInit() {
    // // Subscribe to valueChanges observable
    // const valueChangesSub = this.myForm.valueChanges.subscribe((value) => {
    //   this.formValue = value;  // Get the current value of the form
    //   console.log('Form Value Changed:', value);
    // });

    // // Subscribe to statusChanges observable
    // const statusChangesSub = this.myForm.statusChanges.subscribe((status) => {
    //   this.formStatus = status;  // Get the current form status (VALID, INVALID, etc.)
    //   console.log('Form Status Changed:', status);
    // });

    //https://www.angulararchitects.io/en/blog/whats-new-in-angular-18/
    //https://www.angularspace.com/unified-control-state-change-events-in-angular-18/
    //https://medium.com/@chandantechie/angular-v18-unified-control-state-change-events-f4c99f7ba1f1
    //https://netbasal.com/unified-control-state-change-events-in-angular-7e83c0504c8b
    //https://dev.to/railsstudent/unified-control-state-change-events-working-with-reactive-form-is-never-the-same-in-angular-ipm
    const changesSub = this.myForm.events.subscribe(e => {
      console.log('e', e);
    });

    const changesStreetNameSub = this.myForm.get("address.streetDetails.streetName")?.events.subscribe((event) => {
      console.log('STREET NAME', event.source);
    });

    // Add subscriptions to the subscription management
    // this.subscription.add(valueChangesSub);
    // this.subscription.add(statusChangesSub);
    this.subscription.add(changesSub);
    this.subscription.add(changesStreetNameSub);

  }

  onSubmit() {
    console.log("heloi");
  }

}
