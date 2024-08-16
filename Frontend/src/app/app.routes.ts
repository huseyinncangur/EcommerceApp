import { Routes } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/components/login/login.component';
import { RegisterComponent } from './components/login/components/register/register.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { ProductAddComponent } from './components/product/components/product-add/product-add.component';
import { ProductUpdateComponent } from './components/product/components/product-update/product-update.component';


export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "",
        component: LayoutsComponent,
        children: [
            {
                path: "",
                component: HomeComponent
            },
            {
                path: "categories",
                component: CategoryComponent

            },
            {
                path:"products",
                component:ProductComponent
            },
            {
                path:"product/add",
                component:ProductAddComponent
            },
            {
                path:"product/update/:value",
                component:ProductUpdateComponent
            }
        ]
    }
];
