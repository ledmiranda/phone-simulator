import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Application } from 'src/app/models/application';
import { ApplicationsService } from 'src/app/services/applications.service';

@Component({
  selector: 'app-application-form',
  templateUrl: 'application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
})
export class ApplicationFormComponent implements OnInit {
  public isLoading$: Observable<boolean> = this.store.select('isLoading');
  public appForm: FormGroup;
  public formSubmitted: boolean;

  public get form() {
    return this.appForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<{ isLoading: boolean }>,
    private applicationService: ApplicationsService
  ) {}

  ngOnInit(): void {
    this.appForm = this.fb.group({
      name: ['', Validators.required],
      version: [
        '',
        [Validators.required, Validators.pattern(/^(\d+)\.(\d+)\.(\d+)$/)],
      ],
      contact: ['', Validators.required],
    });
  }

  public async addApplication() {
    this.formSubmitted = true;
    try {
      if (this.appForm.valid) {
        const newApplication: Application = {
          id: `${Math.floor(Math.random() * 100)}`,
          name: this.appForm.get('name')?.value,
          version: this.appForm.get('version')?.value,
          contactInfo: this.appForm.get('contact')?.value,
        };

        await this.applicationService.addApplication(newApplication);
        await this.applicationService.getApplicationsList();
        this.appForm.reset();
        this.formSubmitted = false;
        console.log(this.formSubmitted);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
