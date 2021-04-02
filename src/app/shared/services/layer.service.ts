import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

    layers: any = [];
    layer: any;  //current;
    private subject: any = {
        add: new Subject<any>(),
        remove: new Subject<any>(),
        refresh: new Subject<any>(),
        open: new Subject<any>(),            //open table
        close: new Subject<any>()
    };


    constructor() {
    }

    add(layer: any) {
        this.layers.push(layer);
        this.emit("add", layer);
    }

    remove(layer: any) {
        const index = this.layers.findIndex(item => item === layer);
        this.layers.splice(index, 1);
        this.emit("remove", layer);
    }

    refresh() {
        this.emit("refresh", null);
    }

    switch(layer) {
        if (layer.visible) {
            this.emit("add", layer);
        } else {
            this.emit("remove", layer);
        }
    }

    open(layer) {
        this.layer = layer;
        this.emit("open", layer);
    }

    close() {
        this.layer = null;
        this.emit("close", null);
    }

    up(layer) {
        const index = this.layers.findIndex(item => item === layer);
        if (index > 0) {
            this.layers[index-1] = this.layers.splice(index, 1, this.layers[index-1])[0];
            this.emit("refresh", null);
        }
    }

    down(layer) {
        const index = this.layers.findIndex(item => item === layer);
        if (index < this.layers.length - 1) {
            this.layers[index+1] = this.layers.splice(index, 1, this.layers[index+1])[0];
            this.emit("refresh", null);
        }
    }

    on(event, callback){
        return this.subject[event].subscribe( value => callback(value) );
    }

    emit(event, value: any) {
        return this.subject[event].next(value);
    }

}
