/**
 * Created by bglebov on 13.10.2016.
 */

import {IAudioWrapper} from "../core/audio/audiowrapper.abstract";
import {AuroraAudioWrapper} from "../core/audio/audiowrapper.aurora";

export function audioWrapperFactory(file: File): IAudioWrapper {
    return new AuroraAudioWrapper(file);
}