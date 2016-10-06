/**
 * Created by Warlock on 01.10.2016.
 */

import {Component, Input} from "@angular/core";
import { AfterViewInit, ViewChild } from '@angular/core';
import {AudioWrapper, FileRenderedMessage} from "./audio.wrapper";
import {VisualiserComponent} from "./visualiser/visualiser.component";
import {BusyNotificationService, IAppProgressMessage, AppBusySpinnerMessage} from "../app/services/app-notification.service";

enum EditorState {
    Idle,
    GotFile
}

@Component({
    selector: 'audio-editor',
    templateUrl: 'app/editor/editor.template.html',
    styleUrls: ['css/editor.component.css']
})
export class AudioEditorComponent {
    private selectedFile:File;

    @ViewChild(VisualiserComponent)
    private visualiser:VisualiserComponent;

    state:EditorState;
    editorState = EditorState;
    audio:AudioWrapper;

    constructor(private busyNotification: BusyNotificationService) {
        this.state = EditorState.Idle;
    }

    onDropedFile(file:File):void {
        this.busyNotification.progressUpTo(20);

        this.busyNotification.appBusySpinnerShow();

        this.selectedFile = file;
        this.state = EditorState.GotFile;

        this.audio = new AudioWrapper(this.selectedFile);
        this.audio.fileProcessing$.subscribe(this.handleAudioProcessingMessage.bind(this));
    }

    private handleAudioProcessingMessage(message:any):void {
        if(message instanceof FileRenderedMessage) {
            this.busyNotification.appBusySpinnerHide();
            this.busyNotification.progressUpTo(100);
            console.log("compleate 100");
        }
    }
}