/**
 * Created by warlock on 25.09.16.
 */

import {
    Component, OnInit, EventEmitter, Output,
    trigger, style, state, transition, animate
} from "@angular/core";

import * as _ from "lodash"
import EventEmitter = NodeJS.EventEmitter;

const IdleState = 'idle';
const DragoverState = 'dragover';
const DropState = 'drop';
const DropErrorState = 'droperror';

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

                state(DropErrorState, style({
                    border: '6px solid #ed6c63'
                })),

                transition('idle => dragover', animate('200ms ease-in')),
                transition('drop => dragover', animate('200ms ease-in')),

                transition('dragover => idle', animate('200ms ease-out')),
                transition('dragover => drop', animate('200ms ease-out')),
                transition('dragover => droperror', animate('200ms ease-in')),


                transition('droperror => dragover', animate('200ms ease-out')),
                transition('droperror => drop', animate('200ms ease-out')),
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
    selectedFile:File;
    selectFileCtrl:HTMLElement;
    @Output() eventEmitter:EventEmitter;

    constructor() {
        this.state = IdleState;
        this.eventEmitter = new EventEmitter();
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
        this.state = DragoverState;
        DropboxComponent.stopDragEventPropagation(e);
    }

    fileDragDrop(e):void {
        // cancel event and hover styling
        this.resetDragState();

        var files = e.target.files || e.dataTransfer.files;
        this.filesProcess(files);

        DropboxComponent.stopDragEventPropagation(e);
    }

    fileOpen():void {
        this.selectFileCtrl.click();
    }

    private filesProcess(files:FileList):void {
        // Take only first file:
        this.processMp3File(files[0]);
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
        if (this.isSupportedFormat(file)) {
            this.selectedFile = file;
            this.state = DropState;
            this.eventEmitter.emit(this.selectedFile);
        } else {
            this.state = DropErrorState;
        }
    }

    // Support only mp3 until.
    private isSupportedFormat(file:File):boolean {
        // simple check by extension:
        return _.endsWith(file.name, ".mp3")
    }
}