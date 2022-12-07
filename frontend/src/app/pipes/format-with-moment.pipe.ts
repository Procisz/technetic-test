/**
 * @Pipe
 * @description Pipe to generate displayable text from ISO 8601 date
 * @input date string
 * @input format type
 * @output formatted string value
 */

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { LocalDateAndTimeFormats, LocalDateFormats } from '../enums/moment';

@Pipe({
  name: 'formatWithMomentPipe',
})
export class FormatWithMomentPipe implements PipeTransform {
  constructor() {}
  transform(date: string, withTime: boolean = false): string | null {
    if (!date) return null;
    let formatType: string;

    if (!withTime) formatType = LocalDateFormats.EN;
    else {
      formatType = LocalDateAndTimeFormats.EN;
    }
    return moment.isMoment(moment(date))
      ? moment.parseZone(date).utc(true).local().format(formatType)
      : date;
  }
}
