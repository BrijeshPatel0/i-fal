import { environment } from "src/environments/environment";

export class TextDirectionController {

    public textDirection: any;

    constructor() {
        this.CheckDiriction();
    }

    public CheckDiriction(): void {
        const lang = localStorage.getItem('lang');
        if (lang === 'isr') { // he - hebrew language
            this.textDirection = 'rtl';
            environment.language ="IW";
            localStorage.setItem('direction', 'rtl');
        } else {
            this.textDirection = 'ltr';
            environment.language ="EN";
            localStorage.setItem('direction', 'ltr');
        }
    }
}