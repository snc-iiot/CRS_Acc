class Base64Tools {
  getBase64(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  isBase64(str: string): boolean {
    return str.includes("data:");
  }

  getBase64Pdf(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        const base64WithoutType = base64.split(",")[1];
        resolve(base64WithoutType);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  getBase64Image(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        const base64WithoutType = base64.split(",")[1];
        resolve(base64WithoutType);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  downloadBase64(
    base64: string,
    fileName: string = "test.pdf",
    isNewTab: boolean = false,
  ) {
    const linkSource = base64;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
    if (isNewTab) window.open(linkSource, "_blank");
  }

  getBase64ImageAndResize(file: any): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx: any = canvas.getContext("2d");
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        const blobBin = atob(dataUrl.split(",")[1]);
        const array = [];
        for (let i = 0; i < blobBin.length; i++) {
          array.push(blobBin.charCodeAt(i));
        }
        const file = new Blob([new Uint8Array(array)], {
          type: "image/jpeg",
        });
        let baseURL: string = "";
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          baseURL = reader.result as string;
          resolve(baseURL);
        };
      };
    });
  }

  openBase64NewTab(base64: string) {
    const spitBase64 = base64.split(",")[1];
    const binaryString = window.atob(spitBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "application/pdf" });
    const nav = window.navigator as typeof window.navigator & {
      msSaveOrOpenBlob?: (blob: Blob, defaultName?: string) => boolean;
    };
    if (nav && nav.msSaveOrOpenBlob) {
      nav.msSaveOrOpenBlob(blob, "pdfBase64.pdf");
    } else {
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
    }
  }
}

export default Base64Tools;
