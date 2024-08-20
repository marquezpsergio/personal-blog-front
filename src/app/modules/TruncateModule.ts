import { NgModule } from '@angular/core';
import { TruncatePipe } from '../pipes/TruncatePipe';

@NgModule({
  declarations: [TruncatePipe],
  exports: [TruncatePipe],
})
export class TruncateModule {}
