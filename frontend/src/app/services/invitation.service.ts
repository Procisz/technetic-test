import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  constructor(private http: HttpClient) {}

  /**
   * Create invitation(s).
   * @param {FormData} formData the form.
   * @returns {string} Confirmation message.
   */
  public addInvitations(formData: FormData): Observable<string> {
    return this.http.post<string>(
      `${environment.API_URL}/invitation`,
      formData
    );
  }
}
