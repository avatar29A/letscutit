/**
 * Created by Warlock on 01.10.2016.
 */

import {Component, Input} from "@angular/core";

enum EditorState {
    Idle,
    GotFile
}

@Component({
    selector: 'audio-editor',
    templateUrl: 'app/editor/editor.template.html',
    styleUrls: []
})
export class AudioEditorComponent {
    _selectedFile:File;
    state:EditorState;
    editorState = EditorState;

    onDropedFile(file):void {
        this._selectedFile = file;
        this.state = EditorState.GotFile;

        console.log("Selected file: " + this._selectedFile.name);
    }

    constructor() {
        this.state = EditorState.Idle;
    }
}