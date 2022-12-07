/**
 * @Pipe
 * @description Pipe to convert any value into logical value
 * @input any value
 * @output 'Yes' or 'No'
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'logicalConverterPipe',
})
export class LogicalConverterPipe implements PipeTransform {
  constructor() {}
  transform(value: any): string | null {
    return value ? 'Yes' : 'No';
  }
}
