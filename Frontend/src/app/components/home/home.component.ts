import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { CategoryService } from '../category/services/category.service';
import { CategoryModel } from '../category/models/category.model';
import { RequestModel } from '../../common/models/request.model';
import { ProductService } from '../product/services/product.service';
import { ProductModel } from '../product/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  categories: CategoryModel[] = [];
  requestModel: RequestModel = new RequestModel();
  products:ProductModel[]=[];


  constructor(private _categoryService: CategoryService,
    private _productService:ProductService
  ) {

  }
  ngOnInit(): void {
    this.getCategories();
    this.getAll();
  }

  getAll()
  {
    console.log("price",this.requestModel)
    this._productService.getAllForHomePage(this.requestModel,res=> this.products = res)
     
  }


  getCategories() {
    this._categoryService.getAll(res => this.categories = res)
  }
  changeSelectedCategory(categoryId: string, categoryName: string) {
    this.requestModel.categoryName = categoryName;
    this.requestModel.categoryId = categoryId;
    this.getAll();
  } 
  cleanImageUrl(path: string): string {
    return path.replace(/\s+/g, '%20');
  }

  


}
