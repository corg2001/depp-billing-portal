import { Directive, EventEmitter, Input, Output, HostBinding, HostListener } from '@angular/core';
import { SortDirectionEnums } from 'src/app/core/enums/sort-direction.enums';
import { SortEventInterface } from 'src/app/core/interface/sort-event.interface';

@Directive({
    selector: 'th[appSortable]'
})
export class SortableHeaderDirective {
    @Input() appSortable: string = '';
    @Input() direction: string = SortDirectionEnums.None;
    @Output() sort = new EventEmitter<SortEventInterface>();

    @HostBinding('class.asc')
    private get _ascClass(): boolean {
        return this.direction === SortDirectionEnums.Ascending;
    }
    @HostBinding('class.desc')
    private get _descClass(): boolean {
        return this.direction === SortDirectionEnums.Descending;
    }
    @HostListener('click')
    private _onClick(): void {
        this.direction =
            this.direction === SortDirectionEnums.None
            ? SortDirectionEnums.Ascending
            : (this.direction === SortDirectionEnums.Ascending) ? SortDirectionEnums.Descending : SortDirectionEnums.Ascending;
        this.sort.emit({column: this.appSortable, direction: this.direction});
    }
}
