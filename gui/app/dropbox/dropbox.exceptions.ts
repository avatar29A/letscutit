/**
 * Created by Warlock on 25.09.2016.
 */

declare class ErrorClass implements Error {
    public name: string;
    public message: string;
    constructor(message?: string);
}

class UnsupportedAudioFormatError extends ErrorClass {
    public name = "UnsupportedAudioFormatError";
    constructor () {
         super("Unsupported format. Expected mp3 file.");
    }
}