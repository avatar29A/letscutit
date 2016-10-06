/**
 * Created by Warlock on 01.10.2016.
 */

import {Component} from "@angular/core";
import {AudioWrapper, FileRenderedMessage, FileRenderProgressMessage} from "./audio.wrapper";
import {BusyNotificationService} from "../app/services/app-notification.service";

enum EditorState {
    Idle,
    GotFile
}

/*
AudioEditorComponent

Expected audio file and provides methods to modified it.
 */
@Component({
    selector: 'audio-editor',
    templateUrl: 'app/editor/editor.template.html',
    styleUrls: ['css/editor.component.css']
})
export class AudioEditorComponent {
    private selectedFile:File;

    state:EditorState;
    editorState = EditorState;
    audio:AudioWrapper;

    constructor(private busyNotification: BusyNotificationService) {
        this.state = EditorState.Idle;
    }

    onDropedFile(file:File):void {
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
        }else if(message instanceof  FileRenderProgressMessage) {
            this.busyNotification.progressUpTo(message.progress);
        }
    }
}