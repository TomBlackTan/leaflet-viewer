import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from "../../shared/services/config.service";
import {HttpClient} from "@angular/common/http";
import {
    GeoJSON, CircleMarker
} from 'leaflet';
import {LayerService} from '../../shared/services/layer.service';
import {KeyValue} from '@angular/common';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
    @ViewChild('template',{static: true}) template: ElementRef;
    map: any;
    amap: any;
    mode: number = 0;

    feature: any = null;

    _subscriptions: any = [];

    constructor(private changeDetector: ChangeDetectorRef, private configService: ConfigService, private http: HttpClient, private layerService: LayerService) {
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {
        this._subscriptions.forEach( sub => {
            sub.unsubscribe();
        });
    }


    /////////////////以下私有函数/////////////////////
    /*_load(data): FeatureLayer {
        const featureClass = new FeatureClass(GeometryType.Point);
        featureClass.loadGeoJSON(data);
        const featureLayer = new FeatureLayer();
        featureLayer.featureClass = featureClass;

        //extract fields
        if (featureClass.features.length > 0) {
            const feature = featureClass.features[0];
            Object.keys(feature.properties).forEach(key => {
                const field = new Field();
                field.name = key;
                field.alias = key;
                field.type = typeof feature.properties[key] === "number" ? FieldType.Number : FieldType.String;
                featureClass.addField(field);
            });
        }

        const renderer = new SimpleRenderer();
        switch (featureClass.type) {
            case GeometryType.Polyline:
                renderer.symbol = new SimpleLineSymbol();
                break;
            case GeometryType.Polygon:
                renderer.symbol = new SimpleFillSymbol();
                break;
            case GeometryType.Point:
                renderer.symbol = new SimplePointSymbol();
                break;
        }
        featureLayer.renderer = renderer;
        featureLayer.on("click", (event) => {
            this.feature = event.feature;
            this.map.clearSelection();
            this.map.addSelection(this.feature.geometry);
            this.map.redraw();
            this.map.tooltip.show(this.template.nativeElement, event.screenX, event.screenY, 300);
        });
        return featureLayer;
    }*/

    /////////////////以下界面交互/////////////////////
    mapInit(event) {
        this.map = event.map;
        this.amap = event.amap;
        this.map.setView(this.configService.config.map.center, this.configService.config.map.zoom);

        this.changeDetector.detectChanges();
        this.http.get("assets/json/sensor.json").subscribe(data => {
            const layer = new GeoJSON(data, {
                pointToLayer: (point, latlng) => {
                    return new CircleMarker(latlng, {
                        radius: 6,
                        color: "#ff0000",
                        opacity: 1,
                        fillColor: "#ff0000",
                        fillOpacity: 0.5
                    });
                }
            });
            layer.visible = true;
            layer.name = "sensor";
            this.layerService.add(layer);
        });
        this.http.get("assets/json/beijing.json").subscribe(data => {
            const layer = new GeoJSON(data, {
                /*style: function (feature) {
                    return {color: feature.properties.color};
                }*/
            });
            layer.visible = true;
            layer.name = "beijing";
            this.layerService.add(layer);
        });
        this.http.get("assets/json/chongqing.json").subscribe(data => {
            const layer = new GeoJSON(data, {
                /*style: function (feature) {
                    return {color: feature.properties.color};
                }*/
            });
            layer.visible = true;
            layer.name = "chongqing";
            this.layerService.add(layer);
        });

    }

    open(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const data = JSON.parse(e.target.result);
            const index = file.name.lastIndexOf(".");
            const layer = new GeoJSON(data, {
                /*style: function (feature) {
                    return {color: feature.properties.color};
                }*/
            });
            layer.name = file.name.substring(0, index);
            layer.visible = true;
            this.layerService.add(layer);
        };
        reader.readAsText(file);
    }

    close() {
        this.feature = null;
        this.map.tooltip.hide();
    }

    // Preserve original property order
    originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
        return 0;
    }

}
