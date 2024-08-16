import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { CategoryModel } from '../../../category/models/category.model';
import { CategoryService } from '../../../category/services/category.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {

  categories: CategoryModel[] = [];
  images: File[] = [];
  imageUrls: any[] = [];



  constructor(private _categoryService: CategoryService,
    private _productService: ProductService,
    private _toastr: ToastrService,
    private _router: Router


  ) {

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

  removeImage(name: string, size: number, index: number) {
    this.imageUrls.splice(index, 1);
    let i = this.images.findIndex(p => p.name == name && p.size == size);
    this.images.splice(i, 1);
  }


  add(form: NgForm) {

   

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
    formData.append("name",name);
    formData.append("stock",stock);
    formData.append("price",price);


    for(const category of categories)
    {
       formData.append("categories",category);
    }
    for(const image of this.images)
      {
         formData.append("images",image,image.name);
      }
    

    this._productService.add(formData, res => {

      

      this._toastr.success(res.message);
      form.reset();
      this.imageUrls = [];
      this._router.navigateByUrl("/products");

    })





  }

}
