import { Injectable } from '@angular/core';
import { HttpService } from '../../../common/services/http.service';
import { CategoryModel } from '../models/category.model';
import { MessageResponseModel } from '../../../common/models/message.response';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpService: HttpService) {

  }

  getAll(callback: (res: CategoryModel[]) => void) {
    this._httpService.get<CategoryModel[]>("category/getAll", res => callback(res));
  }

  add(model: CategoryModel, callBack: (res: MessageResponseModel) => void) {

    this._httpService.post<MessageResponseModel>("category/add", model, res => callBack(res));
  }
  update(model: CategoryModel, callBack: (res: MessageResponseModel) => void) {
    this._httpService.post<MessageResponseModel>("category/update", model, res => callBack(res));
  }
  removeById(_id: string, callBack: (res: MessageResponseModel) => void) {
    let model = { _id: _id };
    this._httpService.post<MessageResponseModel>("category/removeById", model, res => callBack(res));
  }


}
