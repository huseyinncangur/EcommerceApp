import { Injectable } from '@angular/core';
import { HttpService } from '../../../common/services/http.service';
import { LoginResponseModel } from '../models/login-response.model';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpService: HttpService) {

  }


  login(model: LoginModel, callBack: (res: LoginResponseModel) => void) {

    this._httpService.post<LoginResponseModel>("auth/login", model, res => callBack(res));

  }
}
