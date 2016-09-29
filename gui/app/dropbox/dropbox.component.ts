/**
 * Created by warlock on 25.09.16.
 */

import {
    Component, OnInit,
    trigger, style, state, transition, animate
} from "@angular/core";

const IdleState = 'idle';
const DragoverState = 'dragover';
const DropState = 'drop';

@Component(
    {
        selector: 'dropbox',
        templateUrl: 'app/dropbox/dropbox.template.html',
        styleUrls: ['css/dropbox.component.css'],
        animations: [
            trigger('dropboxState', [
                state(IdleState, style({
                    border: '0px solid white'
                })),

                state(DropState, style({
                    border: '0px solid white'
                })),

                state(DragoverState, style({
                    border: '6px solid #2815b6'
                })),

                transition('idle => dragover', animate('200ms ease-in')),
                transition('drop => dragover', animate('200ms ease-in')),
                transition('dragover => idle', animate('200ms ease-out')),
                transition('dragover => drop', animate('200ms ease-out'))
            ]),
            trigger('dropboxAlertHelperState', [
                state(IdleState, style({
                    opacity: 0
                })),

                state(DropState, style({
                    opacity: 0
                })),

                state(DragoverState, style({
                    opacity: 100
                })),
                transition('idle => dragover', animate('200ms ease-in')),
                transition('drop => dragover', animate('200ms ease-in')),
                transition('dragover => idle', animate('200ms ease-out')),
                transition('dragover => drop', animate('200ms ease-out'))
            ])
        ]
    }
)
export class DropboxComponent implements OnInit {

    state:string;
    dragCounter:number;
    selectedFileName:string;
    selectFileCtrl:HTMLElement;

    constructor() {
        this.state = IdleState;
        this.selectedFileName = "";
    }

    ngOnInit():void {
        this.selectFileCtrl = document.getElementById('fileselect');
        this.selectFileCtrl.addEventListener('change', this.fileDragDrop.bind(this), false);
    }

    fileDragLeave(e:DragEvent):void {
        this.state = IdleState;
        DropboxComponent.stopDragEventPropagation(e);
    }

    fileDragOver(e:DragEvent):void {
        if (this.state != DropState) {
            this.state = DragoverState;
        }

        DropboxComponent.stopDragEventPropagation(e);
    }

    fileDragDrop(e):void {
        if (this.state == DropState) {
            DropboxComponent.stopDragEventPropagation(e);
            return;
        }

        // cancel event and hover styling
        this.resetDragState();

        var files = e.target.files || e.dataTransfer.files;
        this.filesProcess(files);

        this.state = DropState;
        DropboxComponent.stopDragEventPropagation(e);
    }

    fileOpen():void {
        this.selectFileCtrl.click();
    }

    private filesProcess(files:FileList):void {
        // fetch FileList object
        for (var i = 0; i < files.length; i++) {
            this.processMp3File(files[i]);
        }
    }

    private resetDragState():void {
        this.state = IdleState;
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