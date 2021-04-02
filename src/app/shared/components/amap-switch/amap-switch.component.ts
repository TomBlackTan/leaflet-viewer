import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-amap-switch',
    templateUrl: './amap-switch.component.html',
    styleUrls: ['./amap-switch.component.scss']
})
export class AmapSwitchComponent implements OnInit {
    option: any = {
        type: 'street',
        base_layers: [{
            name: '道路',
            checked: true,
            layer_type: 'road'
        }, {
            name: '建筑物',
            checked: true,
            layer_type: 'building'
        }, {
            name: '标注',
            checked: true,
            layer_type: 'point'
        }, {
            name: '绿地水系',
            checked: true,
            layer_type: 'bg'
        }]
    };

    @Output() typeChange = new EventEmitter();
    @Input()
    get mapType() {
        return this.option.type;
    }

    set mapType(val) {
        this.option.type = val;
        this.typeChange.emit(this.option.type);
    }

    @Input() amap: any;

    constructor() { }

    ngOnInit() {
    }

    switch(){
        if (!this.amap) return;
        if( this.option.type === 'satellite'){
            const amap_layer = this.amap.getLayers();
            if(amap_layer && amap_layer.length>0){
                amap_layer[amap_layer.length-1].show();
            }
        }else{
            const amap_layer = this.amap.getLayers();
            if(amap_layer && amap_layer.length>0){
                amap_layer[amap_layer.length-1].hide();
            }
            const features = [];
            this.option.base_layers.forEach( item =>{
                if(item.checked){
                    features.push(item.layer_type);
                }
            });
            this.amap.setFeatures(features);
        }
    }
}
