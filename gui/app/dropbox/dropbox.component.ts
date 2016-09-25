/**
 * Created by warlock on 25.09.16.
 */

import {Component, OnInit,
    trigger, style, state, transition, animate} from "@angular/core";
import {Router} from "@angular/router";

@Component(
    {
        selector: 'dropbox',
        templateUrl: 'app/dropbox/dropbox.template.html',
        styleUrls: ['css/dropbox.css'],
        animations: [
            trigger('dropboxState', [
                state('idle', style({
                    border: '0px solid white'
                })),

                state('dragover', style({
                    border: '6px solid #66A366'
                })),
                transition('idle => dragover', animate('100ms ease-in')),
                transition('dragover => idle', animate('100ms ease-out'))
            ])
        ]
    }
)
export class DropboxComponent {
    state:string;

    constructor(private router:Router) {
        this.state = 'idle';
    }

    fileDragHover(e:DragEvent):void {
        e.stopPropagation();
        e.preventDefault();

        this.state = (e.type == "dragover" ? "dragover" : "idle");
    }

    fileSelectHandler(e:DragEvent):void {
        // cancel event and hover styling
        this.fileDragHover(e);

        // fetch FileList object
        var files = e.dataTransfer.files;
        for (var file of files) {
            this.processMp3File(file);
        }
    }

    processMp3File(file:File):void {
        console.log("Get: " + file.name);
    }
}