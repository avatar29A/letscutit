/**
 * Created by bglebov on 07.10.2016.
 */

export class BrowserInfo {
    constructor(public name:string, version:number) {
    }
}


// Browser is set of helpers to work with browser's features.
export class Browser {

    // getBrowserInfo detects browser's name and version.
    // Took from http://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
    public static getBrowserInfo():BrowserInfo {
        var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return new BrowserInfo('IE', Number(tem[1] || '0'));
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/);
            if (tem != null) {
                return new BrowserInfo('Opera', Number(tem[1]));
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M.splice(1, 1, tem[1]);
        }
        return new BrowserInfo(M[0], Number(M[1]));
    }
}
