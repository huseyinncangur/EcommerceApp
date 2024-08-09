import { Pipe, PipeTransform } from '@angular/core';
import { CategoryModel } from '../models/category.model';

@Pipe({
  name: 'SearchPipe',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(value: CategoryModel[], search: string): CategoryModel[] {

    if (search == "") {

      return value;
    }

    return value.filter(p => p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }

}
