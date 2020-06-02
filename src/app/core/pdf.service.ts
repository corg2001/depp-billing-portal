import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  public documentElementToPdfBlob(
    document: Document,
    elementId: string,
    pdf$: Subject<Blob>,
    isError$: Subject<boolean>
  ): void {
    const contentElement: HTMLElement = document.getElementById(elementId);

    html2canvas(contentElement)
      .then((canvas: HTMLCanvasElement) => {
        const imgData: string = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        const doc: jsPDF = new jsPDF({
          orientation: 'p',
          unit: 'mm'
        });

        let position: number = 0;
        doc.addImage({
          imageData: imgData,
          format: 'PNG',
          x: 0,
          y: position,
          w: imgWidth,
          h: imgHeight,
          compression: 'fast'
        });
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage({
            imageData: imgData,
            format: 'PNG',
            x: 0,
            y: position,
            w: imgWidth,
            h: imgHeight,
            compression: 'fast'
          });
          heightLeft -= pageHeight;
        }

        pdf$.next(doc.output('blob'));
      })
      .catch(() => {
        isError$.next(true);
      });
  }
}
