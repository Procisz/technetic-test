import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/data/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  /**
   * Get all registrated user.
   * @returns {User[]} the list of the registrated users.
   */
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL}/user`);
  }

  /**
   * Add a new user.
   * @param {FormData} formData the form.
   * @returns {USer} The created User.
   */
  public addNewUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${environment.API_URL}/user`, formData);
  }
}
