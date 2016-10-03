/**
 * Created by Warlock on 01.10.2016.
 */

import {Component, Input} from "@angular/core";
import { AfterViewInit, ViewChild } from '@angular/core';
import {AudioWrapper} from "./audio.wrapper";
import {VisualiserComponent} from "./visualiser/visualiser.component";

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
    private _selectedFile:File;

    @ViewChild(VisualiserComponent)
    private _visualiser:VisualiserComponent;

    state:EditorState;
    editorState = EditorState;
    audio: AudioWrapper;

    onDropedFile(file):void {
        this._selectedFile = file;
        this.state = EditorState.GotFile;

        this.audio = new AudioWrapper(this._selectedFile);
    }

    constructor() {
        this.state = EditorState.Idle;
    }
}