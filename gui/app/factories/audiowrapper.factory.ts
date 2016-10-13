/**
 * Created by bglebov on 13.10.2016.
 */

import {ModernAudioWrapper} from "../core/audio/audiowrapper.modern";
import {IAudioWrapper} from "../core/audio/audiowrapper.abstract";

export function audioWrapperFactory(file: File): IAudioWrapper {
    return new ModernAudioWrapper(file);
}