import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from './map.component';

const routes: Routes = [
    {
        path: '',
        component: MapComponent
    }
];


@NgModule({
    imports: [
        SharedModule.forChild(),
        RouterModule.forChild(routes)
    ],
    declarations: [
        MapComponent
    ]
})
export class MapModule {
}
