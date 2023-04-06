import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Application } from 'src/app/models/application';
import { ApplicationsService } from 'src/app/services/applications.service';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.scss'],
})
export class ApplicationEditComponent implements OnInit {
  @Input() application: Application;
  @Output() closeEditForm = new EventEmitter();

  public editForm: FormGroup;

  public get form() {
    return this.editForm.controls;
  }

  constructor(private fb: FormBuilder, private service: ApplicationsService) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.application.name, Validators.required],
      version: [
        this.application.version,
        [Validators.required, Validators.pattern(/^(\d+)\.(\d+)\.(\d+)$/)],
      ],
      contact: [this.application.contactInfo, Validators.required],
    });
  }

  public async saveEditApplication() {
    if (this.editForm.valid) {
      const newApplication: Application = {
        id: this.application.id,
        name: this.editForm.get('name')?.value,
        version: this.editForm.get('version')?.value,
        contactInfo: this.editForm.get('contact')?.value,
      };

      await this.service.editApplication(newApplication);
      await this.service.getApplicationsList();
      this.closeEdit();
    }
  }

  public closeEdit() {
    this.closeEditForm.emit();
  }
}
