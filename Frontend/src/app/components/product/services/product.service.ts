import { Injectable } from '@angular/core';
import { HttpService } from '../../../common/services/http.service';
import { MessageResponseModel } from '../../../common/models/message.response';
import { RequestModel } from '../../../common/models/request.model';
import { ResultModel } from '../../../common/models/result.model';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpService: HttpService) { }


  add(model: FormData, callBack: (res: MessageResponseModel) => void) {


    this._httpService.post<MessageResponseModel>("product/add", model, res => callBack(res));

  }
  update(model: FormData, callBack: (res: MessageResponseModel) => void) {

    this._httpService.post<MessageResponseModel>("product/update", model, res => callBack(res));

  }

  getAll(model: RequestModel, callBack: (res: ResultModel<ProductModel[]>) => void) {

    this._httpService.post<ResultModel<ProductModel[]>>("product/getAll", model, res => callBack(res))

  }
  removeById(_id: string, callBack: (res: MessageResponseModel) => void) {
    let model = { _id: _id };
    this._httpService.post<MessageResponseModel>("product/removeById", model, res => callBack(res));
  }
  changeActiveStatus(_id: string, callBack: (res: MessageResponseModel) => void) {
    let model = { _id: _id };
    this._httpService.post<MessageResponseModel>("product/changeActiveStatus", model, res => callBack(res));
  }
  getById(_id: string, callBack: (res: ProductModel) => void) {
    let model = { _id: _id };
    this._httpService.post<ProductModel>(`product/getById`, model, res => callBack(res))
  }
  removeImageByProductId(model: any, callBack: (res: MessageResponseModel) => void) {
    this._httpService.post<MessageResponseModel>(`product/removeImageByProduc tId`, model, res => callBack(res))
  }
  getAllForHomePage(model: RequestModel, callBack: (res: ProductModel[]) => void) {
    this._httpService.post<ProductModel[]>("product/getAllForHomePage", model, res => callBack(res))
  }




}
