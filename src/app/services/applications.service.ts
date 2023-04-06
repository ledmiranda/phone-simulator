import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, lastValueFrom, map } from 'rxjs';
import {
  Application,
  mapFromResponse,
  mapToRequest,
} from '../models/application';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  private baseUrl = `${environment.apiUrl}`;
  private currentApplicationsSource = new Subject<Application[]>();
  public currentApplicationsStream =
    this.currentApplicationsSource.asObservable();

  constructor(private http: HttpClient) {}

  public async getApplicationsList(page: number = 1) {
    const response = await lastValueFrom(
      this.http.get<Application[]>(`${this.baseUrl}applications`)
    );
    const transformedApplications = mapFromResponse(response);

    this.currentApplicationsSource.next(transformedApplications);
  }

  public async addApplication(newApplication: Application) {
    const requestData = mapToRequest(newApplication);
    await lastValueFrom(
      this.http.post(`${this.baseUrl}applications`, requestData)
    );
  }

  public async editApplication(application: Application) {
    const requestData = mapToRequest(application);
    await lastValueFrom(
      this.http.put(
        `${this.baseUrl}applications/${application.id}`,
        requestData
      )
    );
  }
}
