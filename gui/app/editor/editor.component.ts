/**
 * Created by Warlock on 01.10.2016.
 */

import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'audio-editor',
    templateUrl: 'app/editor/editor.template.html',
    styleUrls: []
})
export class AudioEditorComponent implements OnInit {
    constructor() {
    }

    ngOnInit():void {
        console.log("Audio editor is loaded");
    }
}