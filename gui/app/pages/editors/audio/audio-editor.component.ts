/**
 * Created by Warlock on 01.10.2016.
 */

import {Component, ViewChild} from "@angular/core";
import {VisualiserComponent} from "../../../components/editors/audio/visualiser.component";
import {IAudioWrapper} from "../../../core/audio/audiowrapper.abstract";
import {IAudioBuffer} from "../../../core/audio/audiobuffer.abstract";
import {BusyNotificationService} from "../../../services/app/appbusy-notification.service";

import {audioWrapperFactory} from "../../../factories/audiowrapper.factory";
import {FileRenderedMessage, FileRenderProgressMessage, FilePlayedMessage, 
    AudioPlayMessage, AudioPauseMessage, AudioStopMessage} from "../../../core/audio/audio.messages";
import {PlayerState} from "../../../core/audio/playerstate";


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
    templateUrl: 'app/pages/editors/audio/audio-editor.template.html',
    styleUrls: ['app/pages/editors/audio/audio-editor.component.css']
})
export class AudioEditorComponent {
    private selectedFile: File;

    @ViewChild(VisualiserComponent)
    private visualiser: VisualiserComponent;

    state: EditorState;
    editorState = EditorState;
    audio: IAudioWrapper;

    constructor(private busyNotification: BusyNotificationService) {
        this.state = EditorState.Idle;
    }

    onDropedFile(file: File): void {
        this.selectedFile = file;
        this.state = EditorState.GotFile;

        this.audio = audioWrapperFactory(this.selectedFile);
        this.audio.fileProcessing$.subscribe(this.handleAudioProcessingMessage.bind(this));

        // Show waite-screen:
        this.busyNotification.appBusySpinnerShow();
    }

    private handleAudioProcessingMessage(message: any): void {
        if (message instanceof FileRenderProgressMessage) {
            let renderedProgressMessage = <FileRenderProgressMessage>message;

            if (renderedProgressMessage.progress < 100) {
                this.busyNotification.progressUpTo(renderedProgressMessage.progress);
            } else {
                this.busyNotification.progressComplete();
            }
        }

        if (message instanceof FileRenderedMessage) {
            let renderedMessage = <FileRenderedMessage>message;
            this.onReceivedAudioData(renderedMessage.renderedBuffer);

            return;
        }

        if (message instanceof FilePlayedMessage) {
            let playedMessage = <FilePlayedMessage>message;
            this.visualiser.currentTime = playedMessage.currentTime;
        }

        if (message instanceof AudioPlayMessage) {
            this.visualiser.PlayerState = PlayerState.Played;
        }

        if(message instanceof AudioPauseMessage) {
            this.visualiser.PlayerState = PlayerState.Paused;
        }

        if (message instanceof AudioStopMessage) {
            this.visualiser.PlayerState = PlayerState.Stopped;
        }
    }

    // Invoke when we received rendered audio data from AudioWrapper
    private onReceivedAudioData(ab: IAudioBuffer): void {
        this.visualiser.buffer = ab;
    }
}