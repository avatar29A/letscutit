/**
 * Created by warlock on 25.09.16.
 */

import {Component, OnInit,
        trigger, style, state, transition, animate} from "@angular/core";
import {Router} from "@angular/router";

enum DropboxState {
    Prepare = 1,
    Dragover,
}

@Component(
    {
        selector: 'dropbox',
        templateUrl: 'app/dropbox/dropbox.template.html',
        styleUrls: ['css/dropbox.css']
    }
)
export class DropboxComponent {
    state :DropboxState;

    constructor(private router:Router) {
        this.state = DropboxState.Prepare;
    }

    fileDragHover(e: DragEvent): void {
        e.stopPropagation();
        e.preventDefault();

        this.state = (e.type == "dragover" ? DropboxState.Dragover : DropboxState.Prepare);
        console.log("State: " + this.state);
    }

    fileSelectHandler(e: DragEvent): void {
        console.log(e);
    }
}