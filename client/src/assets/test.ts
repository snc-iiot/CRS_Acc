/** @format */
import {
  currentPastMinutesInterface,
  electricalTargetInterface,
  powerConsumptionInterface,
} from "@/Models/interface/Electrical/Electrical";

export const Current = (lineChartElectricalCurrent: any[]) => {
  return lineChartElectricalCurrent?.reduce((acc, { Datetime }) => {
    const obj = {
      Datetime: new Set(acc.map((item: any) => item?.Datetime)).has(Datetime),
      MDB: 0,
      DB1: 0,
      DB2: 0,
      DB3: 0,
      DB4: 0,
      DB5: 0,
      DB6: 0,
      DB7: 0,
      DB8: 0,
      DB9: 0,
    };
    if (obj.Datetime) {
      return acc;
    }
    obj.Datetime = Datetime;
    obj["MDB"] = lineChartElectricalCurrent
      ?.filter(({ DB, Datetime }) => DB == "MDB" && Datetime == obj.Datetime)
      .reduce((acc, { Current }) => {
        acc += Number(Current);
        return acc <= 0 ? 0 : acc;
      }, 0);
    obj["DB1"] = lineChartElectricalCurrent
      ?.filter(({ DB, Datetime }) => DB == "DB1" && Datetime == obj.Datetime)
      .reduce((acc, { Current }) => {
        acc += Number(Current);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB2"] = lineChartElectricalCurrent
      ?.filter(({ DB, Datetime }) => DB == "DB2" && Datetime == obj.Datetime)
      .reduce((acc, { Current }) => {
        acc += Number(Current);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB3"] = lineChartElectricalCurrent
      ?.filter(({ DB, Datetime }) => DB == "DB3" && Datetime == obj.Datetime)
      .reduce((acc, { Current }) => {
        acc += Number(Current);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB4"] = lineChartElectricalCurrent
      ?.filter(({ DB, Datetime }) => DB == "DB4" && Datetime == obj.Datetime)
      .reduce((acc, { Current }) => {
        acc += Number(Current);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB5"] = lineChartElectricalCurrent
      ?.filter(({ DB, Datetime }) => DB == "DB5" && Datetime == obj.Datetime)
      .reduce((acc, { Current }) => {
        acc += Number(Current);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB6"] = lineChartElectricalCurrent
      ?.filter(({ DB, Datetime }) => DB == "DB6" && Datetime == obj.Datetime)
      .reduce((acc, { Current }) => {
        acc += Number(Current);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB7"] = lineChartElectricalCurrent
      ?.filter(({ DB, Datetime }) => DB == "DB7" && Datetime == obj.Datetime)
      .reduce((acc, { Current }) => {
        acc += Number(Current);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB8"] = lineChartElectricalCurrent
      ?.filter(({ DB, Datetime }) => DB == "DB8" && Datetime == obj.Datetime)
      .reduce((acc, { Current }) => {
        acc += Number(Current);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB9"] = lineChartElectricalCurrent
      ?.filter(({ DB, Datetime }) => DB == "DB9" && Datetime == obj.Datetime)
      .reduce((acc, { Current }) => {
        acc += Number(Current);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);

    acc.push(obj);
    return acc;
  }, []);
};

export const Voltage = (lineChartElectricalVoltage: any[]) => {
  return lineChartElectricalVoltage?.reduce((acc, { Datetime }) => {
    const obj = {
      Datetime: new Set(acc.map((item: any) => item.Datetime)).has(Datetime),
      MDB: 0,
      DB1: 0,
      DB2: 0,
      DB3: 0,
      DB4: 0,
      DB5: 0,
      DB6: 0,
      DB7: 0,
      DB8: 0,
      DB9: 0,
    };
    if (obj.Datetime) {
      return acc;
    }
    obj.Datetime = Datetime;
    obj["MDB"] = lineChartElectricalVoltage
      ?.filter(({ DB, Datetime }) => DB == "MDB" && Datetime == obj.Datetime)
      .reduce((acc, { Voltage }) => {
        acc += Number(Voltage);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB1"] = lineChartElectricalVoltage
      ?.filter(({ DB, Datetime }) => DB == "DB1" && Datetime == obj.Datetime)
      .reduce((acc, { Voltage }) => {
        acc += Number(Voltage);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB2"] = lineChartElectricalVoltage
      ?.filter(({ DB, Datetime }) => DB == "DB2" && Datetime == obj.Datetime)
      .reduce((acc, { Voltage }) => {
        acc += Number(Voltage);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB3"] = lineChartElectricalVoltage
      ?.filter(({ DB, Datetime }) => DB == "DB3" && Datetime == obj.Datetime)
      .reduce((acc, { Voltage }) => {
        acc += Number(Voltage);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB4"] = lineChartElectricalVoltage
      ?.filter(({ DB, Datetime }) => DB == "DB4" && Datetime == obj.Datetime)
      .reduce((acc, { Voltage }) => {
        acc += Number(Voltage);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB5"] = lineChartElectricalVoltage
      ?.filter(({ DB, Datetime }) => DB == "DB5" && Datetime == obj.Datetime)
      .reduce((acc, { Voltage }) => {
        acc += Number(Voltage);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB6"] = lineChartElectricalVoltage
      ?.filter(({ DB, Datetime }) => DB == "DB6" && Datetime == obj.Datetime)
      .reduce((acc, { Voltage }) => {
        acc += Number(Voltage);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB7"] = lineChartElectricalVoltage
      ?.filter(({ DB, Datetime }) => DB == "DB7" && Datetime == obj.Datetime)
      .reduce((acc, { Voltage }) => {
        acc += Number(Voltage);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB8"] = lineChartElectricalVoltage
      ?.filter(({ DB, Datetime }) => DB == "DB8" && Datetime == obj.Datetime)
      .reduce((acc, { Voltage }) => {
        acc += Number(Voltage);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB9"] = lineChartElectricalVoltage
      ?.filter(({ DB, Datetime }) => DB == "DB9" && Datetime == obj.Datetime)
      .reduce((acc, { Voltage }) => {
        acc += Number(Voltage);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);

    acc.push(obj);
    return acc;
  }, []);
};

export const Electric = (
  tabElectric: string,
  LineChartElectricalElectric: any[],
) => {
  return LineChartElectricalElectric?.filter(({ DB }) => {
    if (tabElectric == "Electric") {
      return DB == "MDB";
    } else {
      return DB;
    }
  })?.reduce((acc, { kWh, Datetime }) => {
    const obj = {
      MDB: Number(kWh),
      Datetime: Datetime,
    };
    acc.push(obj);
    return acc;
  }, []);
};

export const Power = (lineChartElectricalPower: any[]) => {
  return lineChartElectricalPower?.reduce((acc, { kW, Datetime, DB }) => {
    const obj = {
      Datetime: new Set(acc.map((item: any) => item.Datetime)).has(Datetime),
      MDB: 0,
      DB1: 0,
      DB2: 0,
      DB3: 0,
      DB4: 0,
      DB5: 0,
      DB6: 0,
      DB7: 0,
      DB8: 0,
      DB9: 0,
    };
    if (obj.Datetime) {
      return acc;
    }
    obj.Datetime = Datetime;
    obj["MDB"] = lineChartElectricalPower
      ?.filter(({ DB, Datetime }) => DB == "MDB" && Datetime == obj.Datetime)
      .reduce((acc, { kW }) => {
        acc += Number(kW);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB1"] = lineChartElectricalPower
      ?.filter(({ DB, Datetime }) => DB == "DB1" && Datetime == obj.Datetime)
      .reduce((acc, { kW }) => {
        acc += Number(kW);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB2"] = lineChartElectricalPower
      ?.filter(({ DB, Datetime }) => DB == "DB2" && Datetime == obj.Datetime)
      .reduce((acc, { kW }) => {
        acc += Number(kW);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB3"] = lineChartElectricalPower
      ?.filter(({ DB, Datetime }) => DB == "DB3" && Datetime == obj.Datetime)
      .reduce((acc, { kW }) => {
        acc += Number(kW);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB4"] = lineChartElectricalPower
      ?.filter(({ DB, Datetime }) => DB == "DB4" && Datetime == obj.Datetime)
      .reduce((acc, { kW }) => {
        acc += Number(kW);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB5"] = lineChartElectricalPower
      ?.filter(({ DB, Datetime }) => DB == "DB5" && Datetime == obj.Datetime)
      .reduce((acc, { kW }) => {
        acc += Number(kW);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB6"] = lineChartElectricalPower
      ?.filter(({ DB, Datetime }) => DB == "DB5" && Datetime == obj.Datetime)
      .reduce((acc, { kW }) => {
        acc += Number(kW);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB7"] = lineChartElectricalPower
      ?.filter(({ DB, Datetime }) => DB == "DB7" && Datetime == obj.Datetime)
      .reduce((acc, { kW }) => {
        acc += Number(kW);
        return acc <= 0
          ? 0.0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB8"] = lineChartElectricalPower
      ?.filter(({ DB, Datetime }) => DB == "DB8" && Datetime == obj.Datetime)
      .reduce((acc, { kW }) => {
        acc += Number(kW);
        return acc <= 0
          ? 0.0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);
    obj["DB9"] = lineChartElectricalPower
      ?.filter(({ DB, Datetime }) => DB == "DB9" && Datetime == obj.Datetime)
      .reduce((acc, { kW }) => {
        acc += Number(kW);
        return acc <= 0
          ? 0
          : Number(Number(acc)?.toFixed(2))?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            });
      }, 0);

    acc.push(obj);
    return acc;
  }, []);
};
