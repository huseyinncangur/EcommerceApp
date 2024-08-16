import { Component } from '@angular/core';
import { CategoryModel } from '../../../category/models/category.model';
import { CategoryService } from '../../../category/services/category.service';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../models/product.model';
import { SharedModule } from '../../../../common/shared/shared.module';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export class ProductUpdateComponent {

  categories: CategoryModel[] = [];
  images: File[] = [];
  imageUrls: any[] = [];
  productId: string = "";
  product: ProductModel = new ProductModel();



  constructor(private _categoryService: CategoryService,
    private _productService: ProductService,
    private _toastr: ToastrService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute


  ) {

    this._activatedRoute.params.subscribe(params => {
      this.productId = params["value"];
      this.getById(this.productId);
    })

  }

  getById(_id: string) {

    this._productService.getById(_id, res => {
      this.product = res;
    })

  }

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories() {
    this._categoryService.getAll(res => this.categories = res)
  }


  getImages(event: any) {
    const file: File[] = Array.from(event.target.files);
    this.images.push(...file);


    for (let index = 0; index < event.target.files.length; index++) {
      const element = event.target.files[index];
      const reader = new FileReader();
      reader.readAsDataURL(element);

      reader.onload = () => {

        const imageUrl = reader.result as string;
        this.addImage(imageUrl, file);
      }
    }

  }

  addImage(imageUrl: string, file: any) {

    this.imageUrls.push({
      imageUrl: imageUrl,
      name: file.name,
      size: file.size
    })
  }


  deleteImage(id: string, index: number) {
    let model = {
      _id: id,
      index: index
    }
    this._productService.removeImageByProductId(model, res => {

      this._toastr.warning(res.message);
      this.getById(this.productId);

    })
  }




  update(form: NgForm) {



    if (form.value["categoriesSelect"].length == 0) {
      this._toastr.error("Kategori Seçimi Yapmadınız...")
    }

    let product = form.value;
    let categories: string[] = product["categoriesSelect"];
    let name = product["name"];
    let price = product["price"];
    let stock = product["stock"];
    price = price.toString().replace(",", ".");


    let formData = new FormData();
    formData.append("_id", this.product._id);
    formData.append("name", name);
    formData.append("stock", stock);
    formData.append("price", price);
    


    for (const category of categories) {
      formData.append("categories", category);
    }
    if (this.images != undefined) {
      for (const image of this.images) {
        formData.append("images", image, image.name);
      }
    }



    this._productService.update(formData, res => {



      this._toastr.success(res.message);
      form.reset();
      this.imageUrls = [];
      this._router.navigateByUrl("/products");

    })





  }


}
