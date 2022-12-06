import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  /**
   * Check an email availability.
   * @returns {boolean} true if the email is available, otherwise returns false.
   */
  public checkEmailAvailability(email: string | null): Observable<boolean> {
    return this.http.get<boolean>(
      `${environment.API_URL}/email?email=${email}`
    );
  }
}
