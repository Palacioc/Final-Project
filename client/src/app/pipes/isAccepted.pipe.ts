import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBoolean'
})
export class IsAcceptedPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }

    if (!value) {
      return items;
    }

    return items.filter(it => it[field]===value);
  }
}
