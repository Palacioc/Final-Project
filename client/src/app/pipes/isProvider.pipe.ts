import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class IsProviderPipe implements PipeTransform {

  transform(items: any[], field: string, value: string, shouldFilter: string = 'true'): any[] {
    if (!items) {
      return [];
    }

    if (!value) {
      return items;
    }

    if(value==='All'){
      return items;
    }

    return items.filter(it => it[field].match(new RegExp(value, 'i')));
  }
}
