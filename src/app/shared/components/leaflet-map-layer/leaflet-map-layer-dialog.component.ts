import {ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {LayerService} from '../../services/layer.service';


@Component({
    selector: 'leaflet-map-layer-dialog',
    templateUrl: './leaflet-map-layer-dialog.component.html',
    styleUrls: ['./leaflet-map-layer-dialog.component.scss']
})
export class LeafletMapLayerDialogComponent implements OnInit {
    private ribbonCanvasRef: ElementRef;
    @ViewChild('ribbonCanvas', { static: false }) set ribbonCanvas(elRef: ElementRef) {
        this.ribbonCanvasRef = elRef;
        this.ribbon();
    }
    @Output() onSave = new EventEmitter();
    @Output() onCancel = new EventEmitter();

    option: any = {
        label: {
            fonts :['YaHei','微软雅黑','宋体','新宋体','幼圆','楷体','隶书','黑体','华文仿宋','华文中宋'],
            sizes :[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
        },
        renderer: {
            method: 0,
            /*simple: new SimpleRenderer(),
            category: new CategoryRenderer(),
            class: new ClassRenderer(),*/
            field: null,
            start_color: "#ff0000",
            end_color: "#0000ff",
            classes: 5
        }
    };

    source: any;
    layer: any;
    shown: boolean;

    constructor(private layerService: LayerService, private message: NzMessageService, private modal: NzModalService) {
    }

    ngOnInit() {
    }

    /////////////////以下私有函数/////////////////////


    /////////////////以下界面交互/////////////////////


/*    show(layer){
        this.option = {
            label: {
                fonts :['YaHei','微软雅黑','宋体','新宋体','幼圆','楷体','隶书','黑体','华文仿宋','华文中宋'],
                sizes :[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            renderer: {
                method: 0,
                simple: new SimpleRenderer(),
                category: new CategoryRenderer(),
                class: new ClassRenderer(),
                field: null,
                start_color: "#ff0000",
                end_color: "#0000ff",
                classes: 5
            }
        };
        this.source = layer;
        this.layer = Object.assign({}, this.source);
        this.layer.featureClass = this.source.featureClass;
        this.layer.minZoom = this.source.minZoom;
        this.layer.maxZoom = this.source.maxZoom;
        this.layer.label = this.source.label || new Label();
        let symbol: any = new SimplePointSymbol();
        switch (this.source.featureClass.type) {
            case GeometryType.Polyline:
                symbol = new SimpleLineSymbol();
                break;
            case GeometryType.Polygon:
                symbol = new SimpleFillSymbol();
                break;
        }
        const renderer = new SimpleRenderer();
        renderer.symbol = symbol;
        this.option.renderer.simple = renderer;
        this.layer.renderer = this.source.renderer || renderer;
        if (this.layer.renderer instanceof CategoryRenderer) {
            this.option.renderer.method = 1;
            this.option.renderer.category = this.layer.renderer;
            this.option.renderer.field = this.layer.renderer.field;
        } else if (this.layer.renderer instanceof ClassRenderer) {
            this.option.renderer.method = 2;
            this.option.renderer.class = this.layer.renderer;
            this.option.renderer.field = this.layer.renderer.field;
        } else {
            this.option.renderer.method = 0;
            this.option.renderer.simple = this.layer.renderer;
        }
        this.shown = true;
    }*/

    save(){
        Object.assign(this.source, this.layer);
        this.source.minZoom = this.layer.minZoom;
        this.source.maxZoom = this.layer.maxZoom;
        this.source.label = this.layer.label;
        if (this.option.renderer.method == 1) {
            this.layer.renderer = this.option.renderer.category;
        } else if (this.option.renderer.method == 2) {
            this.layer.renderer = this.option.renderer.class;
        } else {
            this.layer.renderer = this.option.renderer.simple;
        }
        this.source.renderer = this.layer.renderer;
        this.shown = false;
        this.layerService.refresh();
    }

/*    addField() {
        this.layer.featureClass.addField(new Field());
    }

    removeField(field) {
        this.layer.featureClass.removeField(field);
    }*/

    changeRenderer() {
        if (this.option.renderer.method == 1) {
            this.option.renderer.field = this.option.renderer.category.field;
        } else if (this.option.renderer.method == 2) {
            this.option.renderer.field = this.option.renderer.class.field;
        } else {
            this.option.renderer.field = null;
        }
    }

    ribbon() {
        if (!this.ribbonCanvasRef) return;
        const canvas = this.ribbonCanvasRef.nativeElement;
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0,0,canvas.width,0);
        gradient.addColorStop(0, this.option.renderer.start_color);
        gradient.addColorStop(1, this.option.renderer.end_color);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    getRGB( color ) {
        color = color || '#ff0000';
        //十六进制颜色值的正则表达式
        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        // 如果是16进制颜色
        if (color && reg.test(color)) {
            if (color.length === 4) {
                let sColorNew = "#";
                for (let i=1; i<4; i+=1) {
                    sColorNew += color.slice(i, i+1).concat(color.slice(i, i+1));
                }
                color = sColorNew;
            }
            //处理六位的颜色值
            const sColorChange = [];
            for (let i=1; i<7; i+=2) {
                sColorChange.push(parseInt("0x"+color.slice(i, i+2)));
            }
            return sColorChange;
        }
        return [255,0,0];
    };

/*    createCategories(){
        if (!this.option.renderer.field) return;
        this.option.renderer.category = new CategoryRenderer();
        this.option.renderer.category.generate(this.layer.featureClass, this.option.renderer.field);
        const start = this.getRGB(this.option.renderer.start_color);
        const end = this.getRGB(this.option.renderer.end_color);
        const array =  this.option.renderer.category.items;
        const red = array.length > 1 ? Array.from({length: array.length}, (v, i) => Math.round(start[0] + (end[0] - start[0]) / (array.length - 1) * i) ) : [start[0]];
        const green = array.length > 1 ? Array.from({length: array.length}, (v, i) => Math.round(start[1] + (end[1] - start[1]) / (array.length - 1) * i) ) : [start[1]];
        const blue = array.length > 1 ? Array.from({length: array.length}, (v, i) => Math.round(start[2] + (end[2] - start[2]) / (array.length - 1) * i) ) : [start[2]];
        this.option.renderer.category.items.forEach((item, i) => {
            item.label = item.value;
            item.symbol.fillStyle = item.symbol.strokeStyle =  '#' + red[i].toString(16).padStart(2, "0") + green[i].toString(16).padStart(2, "0") + blue[i].toString(16).padStart(2, "0");
        })
    }

    createClasses() {
        if (!this.option.renderer.field) return;
        this.option.renderer.class = new ClassRenderer();
        this.option.renderer.class.generate(this.layer.featureClass, this.option.renderer.field, this.option.renderer.classes);
        const start = this.getRGB(this.option.renderer.start_color);
        const end = this.getRGB(this.option.renderer.end_color);
        const array =  this.option.renderer.class.items;
        const red = array.length > 1 ? Array.from({length: array.length}, (v, i) => Math.round(start[0] + (end[0] - start[0]) / (array.length - 1) * i) ) : [start[0]];
        const green = array.length > 1 ? Array.from({length: array.length}, (v, i) => Math.round(start[1] + (end[1] - start[1]) / (array.length - 1) * i) ) : [start[1]];
        const blue = array.length > 1 ? Array.from({length: array.length}, (v, i) => Math.round(start[2] + (end[2] - start[2]) / (array.length - 1) * i) ) : [start[2]];
        this.option.renderer.class.items.forEach((item, i) => {
            item.label = item.low + " - " + item.high;
            item.symbol.fillStyle = item.symbol.strokeStyle =  '#' + red[i].toString(16).padStart(2, "0") + green[i].toString(16).padStart(2, "0") + blue[i].toString(16).padStart(2, "0");
        })
    }*/

    compareElement(g1: any, g2: any): boolean {
        return g1 && g2 ? g1.name === g2.name : g1 === g2;
    }

    hide() {
        this.shown = false;
    }
}
