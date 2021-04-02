import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {Tab2Component} from './tab2/tab2.component';

@Component({
    selector: 'app-tabset2',
    templateUrl: './tabset2.component.html',
    styleUrls: ['./tabset2.component.scss']
})
export class Tabset2Component implements OnInit, AfterContentInit {

    @Input() align: string = 'left';

    @ContentChildren(Tab2Component) tabs: QueryList<Tab2Component>;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
        if (this.tabs.length > 0) {
            let config: boolean = false;
            this.tabs.forEach(tab => {
                if (tab.active) {
                    config = true;
                }
            });
            if (!config) {
                this.tabs[0].active = true;
            }
        }
    }

    active(tab) {
        this.tabs.forEach(item => {
            if (tab !== item) {
                item.active = false;
            }
        });
        tab.active = true;
    }

}
