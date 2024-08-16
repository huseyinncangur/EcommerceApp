import { Component, OnInit } from '@angular/core';
import { ResultModel } from '../../common/models/result.model';
import { ProductModel } from './models/product.model';
import { RequestModel } from '../../common/models/request.model';
import { ProductService } from './services/product.service';
import { SwalService } from '../../common/services/swal.service';
import { ToastrService } from 'ngx-toastr';
import { BlankComponent } from '../../common/components/blank/blank.component';
import { TableComponent } from '../../common/components/table/table.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../common/shared/shared.module';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule, CommonModule, BlankComponent, TableComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  result: ResultModel<ProductModel[]> = new ResultModel<ProductModel[]>;
  request: RequestModel = new RequestModel();
  pageNumbers: number[] = [];
  product: ProductModel = new ProductModel();

  constructor(private _productService: ProductService,
    private _swalService: SwalService,
    private _toastr: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.getAll(1);
  }

  getAll(pageNumber: number = 1) {
    this.request.pageNumber = pageNumber;

    this._productService.getAll(this.request, res => {


      this.result.data = res.data;
      this.setPageNumbers()



    })
  }

  setPageNumbers() {
    const startPage = Math.max(1, this.result.pageNumber - 2);
    const endPage = Math.min(this.result.totalPageCount, this.result.pageNumber + 2);
    this.pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      this.pageNumbers.push(i);
    }

  }

  search() {
    if (this.request.search.length >= 3) {
      this.getAll(1);
    }
  }

  cleanImageUrl(path: string): string {
    return path.replace(/\s+/g, '%20');
  }

  removeById(id: string) {
    this._swalService.callSwal("Ürünü silmek istiyor musunuz ?", "Ürünü Sil", "Sil", () => {


      this._productService.removeById(id, res => {

        this._toastr.info(res.message);
        this.getAll(this.request.pageNumber);

      })

    })
  }
  changeProductStatus(id:string)
  {
    this._productService.changeActiveStatus(id,res=>{
       this._toastr.info(res.message);
       this.getAll(this.request.pageNumber);
    })
  }


}
