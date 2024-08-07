import { Routes } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/components/login/login.component';
import { RegisterComponent } from './components/login/components/register/register.component';
import { CategoryComponent } from './components/category/category.component';


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

            }
        ]
    }
];
