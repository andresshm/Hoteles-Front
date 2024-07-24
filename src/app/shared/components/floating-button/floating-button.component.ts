import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'shared-floating-button',
    templateUrl: './floating-button.component.html',
    styleUrls: ['./floating-button.component.css']
})

export class FloatingButtonComponent implements OnInit {
    @Input()
    public hotel :boolean = false;
    @Input()
    public huesped :boolean = false;
    @Input()
    public habitacion :boolean = false;
    @Input()
    public servicio :boolean = false;
    constructor() { }

    ngOnInit() { }
}


