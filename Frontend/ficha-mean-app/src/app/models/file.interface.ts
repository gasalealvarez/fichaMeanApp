import { Observable } from "rxjs";

export class FileItemI {
    public name: string;
    public uploading = false;
    public uploadPercent: Observable<number> | any;
    public downloadURL: Observable<string> | undefined;
  
    constructor(public file: File = file) {
      this.name = file.name;
    }
  }

