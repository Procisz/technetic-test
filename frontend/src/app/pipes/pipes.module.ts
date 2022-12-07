import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatWithMomentPipe } from './format-with-moment.pipe';
import { LogicalConverterPipe } from './logical-converter.pipe';

@NgModule({
  declarations: [FormatWithMomentPipe, LogicalConverterPipe],
  imports: [CommonModule],
  exports: [FormatWithMomentPipe, LogicalConverterPipe],
})
export class PipesModule {}
