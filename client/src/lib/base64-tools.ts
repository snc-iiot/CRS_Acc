class Base64Tools {
  getBase64(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
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

  openBase64NewTab(base64: string) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "application/pdf" });
    // const blob = new Blob(base64);
    const nav = window.navigator as typeof window.navigator & {
      msSaveOrOpenBlob?: (blob: Blob, defaultName?: string) => boolean;
    };
    // console.log("Test");

    if (nav && nav.msSaveOrOpenBlob) {
      nav.msSaveOrOpenBlob(blob, "pdfBase64.pdf");
    } else {
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
    }
  }
}

export default Base64Tools;
