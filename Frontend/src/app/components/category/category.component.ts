import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { CategoryService } from './services/category.service';
import { CategoryModel } from './models/category.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { SwalService } from '../../common/services/swal.service';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  categories: CategoryModel[] = [];
  category: CategoryModel = new CategoryModel();

  constructor(private _categoryService: CategoryService,
    private _toastr: ToastrService,
    private _swal: SwalService
  ) {

  }


  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._categoryService.getAll(res => this.categories = res);
  }
  add(form: NgForm) {
    if (form.valid) {
      this._categoryService.add(this.category, res => {
        this._toastr.success(res.message)
        let element = document.getElementById("addModalCloseBtn");
        element?.click();
        form.reset();
        this.getAll();
      });
    }

  }

  get(category: CategoryModel) {
    this.category = { ...category };
  }

  update(form: NgForm) {

    if (form.valid) {
      this._categoryService.update(this.category, res => {
        this._toastr.success(res.message);
        let element = document.getElementById("updateModalCloseBtn");
        element?.click();
        form.reset();
        this.getAll();

      });
    }

  }
  remove(category:CategoryModel) {
    this._swal.callSwal("Kategoriyi Silmek İstiyor musunuz ?", category.name, "Sil", () => {

      this._categoryService.removeById(category._id, res => {

        this._toastr.success(res.message);
        this.getAll();

      })
    })

  }

}
