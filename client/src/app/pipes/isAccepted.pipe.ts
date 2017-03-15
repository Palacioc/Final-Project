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
    console.log("pipe");
    console.log(value)
    return items.filter(it => {
      return (value == 'true')==it[field]
    });
  }
}
