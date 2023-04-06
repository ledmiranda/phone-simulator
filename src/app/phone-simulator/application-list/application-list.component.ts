import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable, Subscription } from 'rxjs';
import { Application } from 'src/app/models/application';
import { ApplicationsService } from 'src/app/services/applications.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
})
export class ApplicationListComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public applications: Application[] = [];
  public paginatedApplications: Application[] = [];
  public isLoading$: Observable<boolean> = this.store.select('isLoading');

  constructor(
    public applicationsService: ApplicationsService,
    private store: Store<{ isLoading: boolean }>
  ) {}

  ngOnInit(): void {
    this.subscription =
      this.applicationsService.currentApplicationsStream.subscribe((data) => {
        this.applications = data;
        this.paginatedApplications = this.applications.slice(0, 9);
      });
    this.applicationsService.getApplicationsList();
  }

  pageChanged(event: PageChangedEvent) {
    console.log(event.itemsPerPage);
    const start = (event.page - 1) * event.itemsPerPage;
    const end = event.page * event.itemsPerPage;
    this.paginatedApplications = this.applications.slice(start, end);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
