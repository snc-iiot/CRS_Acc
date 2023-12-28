const carbon: { [key: string]: number } = {
  จดหมายอิเล็กทรอนิกส์: 0,
  รถยนต์ระบบสันดาป: 0.1411,
  "รถกระบะบรรทุก 4 ล้อ": 0.1627,
  "รถตู้บรรทุก 4 ล้อ": 0.1835,
  "รถกระบะบรรทุก 6 ล้อ": 0.0613,
  "รถตู้บรรทุก 10 ล้อ": 0.0454,
  "รถตู้บรรทุกพ่วง 18 ล้อ": 0.787,
  "รถตู้บรรทุกพ่วง 20 ล้อ": 0.0448,
  "รถตู้บรรทุกพ่วง 22 ล้อ": 0.0459,
  "เรือแบบ bulk": 0.0056,
  "เรือบรรทุก container": 0.0107,
};

export const CalculateCarbon = (distance: number, type: string): number => {
  if (!carbon[type]) {
    return 0;
  } else return Number(Number(distance * carbon[type])?.toFixed(2));
};
