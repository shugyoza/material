import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { JobRow } from "../models/job-row.model";
import { MyHttpResponse } from "../../../shared/library/models/my-http-response.model";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly http = inject(HttpClient);

  getJobs(): Observable<MyHttpResponse<JobRow[]>> {
    const response$ = this.http.get<MyHttpResponse<JobRow[]>>('/mock/job/jobs.json');

    return response$;
  }

}