import { Injectable } from '@angular/core';
import { HttpService } from '../../../common/services/http.service';
import { LoginResponseModel } from '../components/login/models/login-response.model';
import { LoginModel } from '../components/login/models/login.model';
import { RegisterModel } from '../components/register/models/register.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpService: HttpService) {

  }

  login(model: LoginModel, callBack: (res: LoginResponseModel) => void) {

    this._httpService.post<LoginResponseModel>("auth/login", model, res => callBack(res));

  }
  register(model: RegisterModel, callBack: (res: any) => void) {

    this._httpService.post("auth/register", model, res => callBack(res))
  }
}
