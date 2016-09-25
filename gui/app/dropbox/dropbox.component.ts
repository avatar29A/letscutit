/**
 * Created by warlock on 25.09.16.
 */

import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component(
    {
        selector: 'dropbox',
        templateUrl: 'app/dropbox/dropbox.template.html'
    }
)

export class DropboxComponent extends OnInit {
    constructor (private router: Router) {}

    ngOnInit() {
        
    }

}