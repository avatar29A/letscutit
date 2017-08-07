/**
 * Created by Warlock on 01.10.2016.
 */

import { Component, ViewChild } from "@angular/core";
import { WaveformComponent } from "../../../components/editors/audio/waveform.component";
import { BusyNotificationService } from "../../../services/app/appbusy-notification.service";

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

    @ViewChild(WaveformComponent)
    private visualiser: WaveformComponent;

    state: EditorState;
    editorState = EditorState;

    constructor(private busyNotification: BusyNotificationService) {
        this.state = EditorState.Idle;
    }

    onDropedFile(file: File): void {
        this.selectedFile = file;
        this.state = EditorState.GotFile;
    }
}
