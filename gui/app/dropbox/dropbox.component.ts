/**
 * Created by warlock on 25.09.16.
 */

import {
    Component,
    trigger, style, state, transition, animate
} from "@angular/core";
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
                transition('idle => dragover', animate('200ms ease-in')),
                transition('dragover => idle', animate('200ms ease-out'))
            ])
        ]
    }
)
export class DropboxComponent {
    state:string;
    dragCounter:number;
    selectedFileName:string;

    constructor(private router:Router) {
        this.state = 'idle';
        this.dragCounter = 0;
        this.selectedFileName = "";
    }

    fileDragEnter(e:DragEvent):void {
        this.dragCounter += 1;
        this.state = "dragover";

        console.log("ENTER");

        DropboxComponent.stopDragEventPropagation(e);
    }

    fileDragLeave(e:DragEvent):void {
        this.dragCounter -= 1;

        if (this.dragCounter === 0) {
            this.state = "idle";
        }

        DropboxComponent.stopDragEventPropagation(e);
    }

    fileDragOver(e:DragEvent):void {
        this.state = "dragover";
        DropboxComponent.stopDragEventPropagation(e);
    }

    fileDragDrop(e:DragEvent):void {
        // cancel event and hover styling
        this.resetDragState();

        // fetch FileList object
        var files = e.dataTransfer.files;
        for (var i = 0; i < files.length; i++) {
            this.processMp3File(files[i]);
        }

        DropboxComponent.stopDragEventPropagation(e);
    }

    private resetDragState():void {
        this.state = 'idle';
        this.dragCounter = 0;
    }

    private static stopDragEventPropagation(e:DragEvent):void {
        e.stopPropagation();
        e.preventDefault();
    }

    private processMp3File(file:File):void {
        this.selectedFileName = file.name;
    }
}