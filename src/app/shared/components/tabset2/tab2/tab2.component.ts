import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.scss']
})
export class Tab2Component implements OnInit {

  @Input() heading: string = "tab";
  @Input() badge: number;
  @Input() active: boolean;
  @Input() visible: boolean = true;
  @Input() templateRef: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
