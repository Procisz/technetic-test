import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/data/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  /**
   * Get all registration.
   * @returns {UserModel} the list of the registrated users.
   */
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL}/registration`);
  }

  //   /**
  //    * Get a location by locationUID.
  //    * @param {???} locationUID The uid of the Location.
  //    * @returns {LocationFullModel} A specific Location.
  //    */
  //   public getLocatonByLocationUID(locationUID): Observable<LocationFullModel> {
  //     return this.http.get<LocationFullModel>(`${environment.API_URL}/location/${locationUID}`, { withCredentials: true });
  //   }

  //   /**
  //    * Get parent locations by the child's locationUID.
  //    * @param {???} locationUID The uid of the parent Location.
  //    * @returns {LocationFullModel} The child Location of the parent Location or an empty array.
  //    */
  //   public getParentLocatonByLocationUID(locationUID): Observable<LocationFullModel> {
  //     return this.http.get<LocationFullModel>(`${environment.API_URL}/location/parents/${locationUID}`, {
  //       withCredentials: true,
  //     });
  //   }

  //   /**
  //    * Add a new Location.
  //    * @param {FormData} formData the form.
  //    * @returns {LocationFullModel} The added Location.
  //    */
  //   public addNewLocation(formData: FormData): Observable<LocationFullModel> {
  //     return this.http.post<LocationFullModel>(`${environment.API_URL}/location/add`, formData, {
  //       withCredentials: true,
  //     });
  //   }

  //   /**
  //    * Add a new Location.
  //    * @param {FormData} formData the form.
  //    * @returns {LocationFullModel} The added Location.
  //    */
  //   public updateLocation(formData: FormData): Observable<LocationFullModel> {
  //     return this.http.post<LocationFullModel>(`${environment.API_URL}/location/update`, formData, {
  //       withCredentials: true,
  //     });
  //   }

  //   /**
  //    * Delete an existing Location.
  //    * @param {string} locationUID The id of the Location.
  //    * @returns {string} Confirmation message
  //    */
  //   public deleteLocation(locationUID: string): Observable<string> {
  //     return this.http.delete<string>(`${environment.API_URL}/location/${locationUID}`);
  //   }

  //   /**
  //    * Check the relationship between two locations.
  //    * Preventing infinite loop in the tree.
  //    * @param {object} parentLocationUID The uid of the Parent Location
  //    * @param {string} childLocationUID The uid of the Child (current) Location
  //    * @returns {Boolean} If the provided parentLocation is anywhere in any child in the Child (current) Location, or the provided parentLocation is the same as the Child (current) Location returns false. Otherwise returns true.
  //    */
  //   public checkTwoLocationRelationship(parentLocationUID: string = null, childLocationUID: string = null): Observable<boolean> {
  //     const queryParams = {
  //       withCredentials: true,
  //       params: {},
  //     };
  //     if (parentLocationUID) queryParams.params['parentUid'] = parentLocationUID;
  //     if (childLocationUID) queryParams.params['childUid'] = childLocationUID;

  //     return this.http.get<boolean>(`${environment.API_URL}/location/canSetParent`, queryParams);
  //   }

  //   /** ***** LOCATIONS CONTROLLING END ***** */

  //   /**
  //    * Get all countries.
  //    * @returns {Observable} The list of the available country.
  //    */
  //   public getCountries(): Observable<CountryModel[]> {
  //     return this.http.get<CountryModel[]>(`${environment.API_URL}/location/countries`, {
  //       withCredentials: true,
  //     });
  //   }

  //   /**
  //    * Get states by country id.
  //    * @param countryID The id of the country.
  //    * @returns {Observable} The list of the available states belonging to a specific country.
  //    */
  //   public getStatesByCountryID(countryID): Observable<StateModel[]> {
  //     return this.http.get<StateModel[]>(`${environment.API_URL}/location/states?countryId=${countryID}`, {
  //       withCredentials: true,
  //     });
  //   }

  //   /**
  //    * Get cities by state id.
  //    * @param stateID The id of the state.
  //    * @returns {Observable} The list of the available city belonging to a specific state.
  //    */
  //   // TODO: Should be a CityModel
  //   public getCitiesByStateID(stateID): Observable<any> {
  //     return this.http.get<any>(`${environment.API_URL}/location/city?stateId=${stateID}`, {
  //       withCredentials: true,
  //     });
  //   }
}
