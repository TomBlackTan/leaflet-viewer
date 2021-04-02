import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-color',
    templateUrl: './color.component.html',
    styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit, OnChanges {

    @Output() valueChange = new EventEmitter();

    @Input() name: string;
    @Input() value: string;

    color: string;
    opacity: number;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.value && changes.value.currentValue) {
            this.rgba2Hex(this.value);
        }
    }

    change() {
        this.value = this.color + (this.opacity * 255).toString(16).padStart(2, "0");
        this.valueChange.emit(this.value);
    }


    rgba2Hex(rgba) {
        if (rgba && rgba.startsWith('rgba')) {
            rgba = rgba.split(',');
            let r = parseInt(rgba[0].split('(')[1]);
            let g = parseInt(rgba[1]);
            let b = parseInt(rgba[2]);
            let a = parseFloat(rgba[3].split(')')[0]);
            this.color = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            this.opacity = a;
        } else if (rgba && rgba.startsWith('rgb')) {
            rgba = rgba.split(',');
            let r = parseInt(rgba[0].split('(')[1]);
            let g = parseInt(rgba[1]);
            let b = parseInt(rgba[2].split(')')[0]);
            this.color = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            this.opacity = 1;
        }  else if (rgba && rgba.startsWith('#')) {
            if (rgba.length == 9) {
                this.color = rgba.substring(0, 7);
                this.opacity = parseInt(rgba.substring(7), 16) / 255;
            } else {
                this.color = rgba;
                this.opacity = 1;
            }
        }
    }

}
