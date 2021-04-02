import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { registerLocaleData } from '@angular/common'; /** 配置 angular i18n **/
import zh from '@angular/common/locales/zh';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {AmapSwitchComponent} from './components/amap-switch/amap-switch.component';
import {Tabset2Component} from './components/tabset2/tabset2.component';
import {Tab2Component} from './components/tabset2/tab2/tab2.component';
import {ColorComponent} from './components/color/color.component';
import {LeafletMapControl} from './components/leaflet-map-control/leaflet-map-control.component';
import {LeafletMapLayerComponent} from './components/leaflet-map-layer/leaflet-map-layer.component';

registerLocaleData(zh);

@NgModule({
    declarations: [LeafletMapControl, AmapSwitchComponent, LeafletMapLayerComponent, Tabset2Component, Tab2Component, ColorComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        LeafletMapControl, AmapSwitchComponent, LeafletMapLayerComponent, Tabset2Component, Tab2Component, ColorComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                {provide: NZ_I18N, useValue: zh_CN}
            ]
        };
    }

    static forChild(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }
}
