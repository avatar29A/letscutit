/**
 * Created by Warlock on 01.10.2016.
 */

import {Component, ViewChild} from "@angular/core";
import {IAudioWrapper} from "../../core/audio/audiowrapper.abstract";
import {BusyNotificationService} from "../../app/services/app-notification.service";
import {FileRenderedMessage, FileRenderProgressMessage, ModernAudioWrapper} from "../../core/audio/audiowrapper.modern";
import {VisualiserComponent} from "./visualiser/visualiser.component";


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
    templateUrl: 'app/editors/audio/audio-editor.template.html',
    styleUrls: ['css/audio-editor.component.css']
})
export class AudioEditorComponent {
    private selectedFile:File;

    @ViewChild(VisualiserComponent)
    private visualiser:VisualiserComponent;

    state:EditorState;
    editorState = EditorState;
    audio:IAudioWrapper;
    audioBuffer:AudioBuffer;

    constructor(private busyNotification:BusyNotificationService) {
        this.state = EditorState.Idle;
    }

    onDropedFile(file:File):void {
        this.busyNotification.appBusySpinnerShow();

        this.selectedFile = file;
        this.state = EditorState.GotFile;

        this.audio = new ModernAudioWrapper(this.selectedFile);
        this.audio.fileProcessing$.subscribe(this.handleAudioProcessingMessage.bind(this));

        this.startAudioFileProcessing();
    }

    // Up progress status to 5%. It's need only for user like look.
    private startAudioFileProcessing():void {
        this.busyNotification.prepare();
    }

    private handleAudioProcessingMessage(message:any):void {
        if (message instanceof FileRenderedMessage) {
            let renderedMessage = <FileRenderedMessage>message;
            this.onReceivedAudioData(renderedMessage.renderedBuffer);

            return;
        }

        if (message instanceof FileRenderProgressMessage) {
            let progressMessage = <FileRenderProgressMessage>message;
            this.busyNotification.progressUpTo(progressMessage.progress);

            return;
        }
    }

    // Invoke when we received rendered audio data from AudioWrapper
    private onReceivedAudioData(ab:AudioBuffer):void {
        this.busyNotification.progressComplete();

        this.audioBuffer = ab;
        this.visualiser.buffer = ab;
    }
}