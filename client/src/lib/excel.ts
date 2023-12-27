import * as XLSX from 'xlsx';

class Excel {
  importFile(file: File): Promise<unknown[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = XLSX.read(event.target?.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]) || [];
          resolve(rows);
        }
      };

      reader.onerror = (error) => reject(error);

      reader.readAsArrayBuffer(file);
    });
  }

  exportFile(fileName: string, data: any[]) {
    return new Promise((resolve, reject) => {
      try {
        const headings = Object.keys(data[0]);
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, [headings]);
        XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${fileName}.xlsx`);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default Excel;
