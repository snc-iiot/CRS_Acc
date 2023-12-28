import BarChart from "@/components/common/chart/bar-chart";
import BarChartHorizontal from "@/components/common/chart/bar-chart-horizontal";
import PieChartComponents from "@/components/common/chart/pi-chart";
import TreeMap from "@/components/common/chart/tree-map";
import { Select } from "@/components/ui/select-custom";
import { useAtomStore } from "@/jotai/use-atom-store";
import { COLORS_SERIES } from "@/lib/utils";
import { useHome } from "@/services/hooks/use-home";
import { FC } from "react";

const HomePage: FC = () => {
  const {
    dataRegisCount,
    dataMainCustomerRatio,
    dataObjectivePurchasingRatio,
    dataShareHolderRatio,
    dataRegisStat,
  } = useAtomStore();
  const {
    isFetchingRegisCount,
    isFetchingMainCustomerRatio,
    isFetchingShareHolderRatio,
    isFetchingObjectivePurchasingRatio,
  } = useHome();

  const Datanationality = dataShareHolderRatio
    ?.map(({ country, percent }, i) => ({
      id: country,
      label: country,
      value: Number(percent),
      color: COLORS_SERIES[10 + i],
    }))
    ?.sort((a, b) => b?.value - a?.value);

  const DataObjectivePurchasingRatio = [
    {
      name: "ซื้อมาขายไป",
      value: 0,
      ซื้อมาขายไป:
        dataObjectivePurchasingRatio?.filter(
          ({ objective_purchasing }) => objective_purchasing === "trade",
        )?.[0]?.amount ?? 10,
      ผลิตงาน:
        dataObjectivePurchasingRatio?.filter(
          ({ objective_purchasing }) => objective_purchasing === "produce",
        )?.[0]?.amount ?? 10,
      อื่นๆ:
        dataObjectivePurchasingRatio?.filter(
          ({ objective_purchasing }) => objective_purchasing === "other",
        )?.[0]?.amount ?? 10,
      datetime: "วัตถุประสงค์การซื้อสินค้า",
    },
  ];

  const DataMainCustomers = [
    {
      id: "ลูกค้าในประเทศไทย",
      label: "ลูกค้าในประเทศไทย",
      value:
        dataMainCustomerRatio?.filter(
          ({ main_customer }) => main_customer === "internal",
        )?.[0]?.amount ?? 0,
      color: "#1F2C57",
    },
    {
      id: "ลูกค้าต่างประเทศ",
      label: "ลูกค้าต่างประเทศ",
      value:
        dataMainCustomerRatio?.filter(
          ({ main_customer }) => main_customer === "foreign",
        )?.[0]?.amount ?? 0,
      color: "#F2C94C",
    },
  ];

  const data = dataRegisCount
    ?.filter(({ regis_count }) => regis_count > 0)
    ?.map(({ company, regis_count }, i) => ({
      name: company,
      value: regis_count,
      color: COLORS_SERIES[9 + i],
    }))
    ?.sort((a, b) => b?.value - a?.value);

  const TotolRegis = dataRegisCount
    ?.map(({ regis_count }) => regis_count ?? 0)
    ?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  const TotolRegisWest = dataRegisCount
    ?.map(({ regis_count, province }) =>
      province !== "RAYONG" ? 0 : regis_count ?? 0,
    )
    ?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  const TotolRegisEast = dataRegisCount
    ?.map(({ regis_count, province }) =>
      province !== "SAMUTPAKAN" ? 0 : regis_count ?? 0,
    )
    ?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

  const dataRegisWest = dataRegisCount
    ?.filter(
      ({ province, regis_count }) => province !== "RAYONG" && regis_count > 0,
    )
    ?.map(({ company, regis_count }) => ({
      name: company,
      children: [{ name: company, size: regis_count }],
    }));
  const dataRegisEast = dataRegisCount
    ?.filter(
      ({ province, regis_count }) =>
        province !== "SAMUTPAKAN" && regis_count > 0,
    )
    ?.map(({ company, regis_count }) => ({
      name: company,
      children: [{ name: company, size: regis_count }],
    }));

  return (
    <main className="relative flex h-full w-full flex-col gap-2">
      <section className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">
          ภาพรวมของการขึ้นทะเบียนผู้ซื้อ
        </h1>
        <div className="w-44">
          <Select className="text-xs shadow-none" defaultValue="2023">
            <option value="2023">Y2023</option>
          </Select>
        </div>
      </section>
      <section className="grid h-full grid-cols-8 grid-rows-2 gap-2">
        <article className="col-span-6 row-span-1 flex h-full flex-col">
          {dataRegisStat?.length === 0 ? (
            <article className="flex h-full w-full flex-col items-center justify-center">
              <text className="text-sm">
                {isFetchingRegisCount
                  ? "กำลังโหลดข้อมูล..."
                  : "ยังไม่มีข้อมูลการลงทะเบียน"}
              </text>
            </article>
          ) : (
            <section className="grid h-full w-full grid-cols-8 grid-rows-2 gap-2 ">
              <article className="col-span-2 row-span-2 flex h-full flex-col items-center justify-center rounded-md border p-2">
                <h3 className="text-md font-bold">
                  จำนวนลูกค้า SNC รวมทั้งเครือ
                </h3>
                <h1
                  className={`${
                    TotolRegis < 1000
                      ? "text-[6rem]"
                      : TotolRegis < 10000
                      ? "text-[5rem]"
                      : TotolRegis < 100000
                      ? "text-[4rem]"
                      : "text-[3rem]"
                  }`}
                >
                  {TotolRegis?.toLocaleString("en")}
                </h1>
              </article>
              <article className="relative z-10 col-span-2 flex h-full flex-col items-center  justify-center rounded-md border p-2">
                <h3 className="text-md absolute left-0 top-[-10px] bg-white px-2 font-bold">
                  East :
                </h3>
                <h1
                  className={`${
                    TotolRegis < 1000
                      ? "text-[6rem]"
                      : TotolRegis < 10000
                      ? "text-[5rem]"
                      : TotolRegis < 100000
                      ? "text-[4rem]"
                      : "text-[3rem]"
                  }`}
                >
                  {TotolRegisEast?.toLocaleString("en")}
                </h1>
              </article>
              <article className="col-span-4 row-span-1 flex h-full flex-col  overflow-clip rounded-md border ">
                <TreeMap data={dataRegisEast} />
              </article>
              <article className="relative col-span-2 flex h-full flex-col items-center justify-center rounded-md border p-2">
                <h3 className="text-md absolute left-0 top-[-10px] bg-white px-2 font-bold">
                  West :
                </h3>
                <h1
                  className={`${
                    TotolRegis < 1000
                      ? "text-[6rem]"
                      : TotolRegis < 10000
                      ? "text-[5rem]"
                      : TotolRegis < 100000
                      ? "text-[4rem]"
                      : "text-[3rem]"
                  }`}
                >
                  {TotolRegisWest?.toLocaleString("en")}
                </h1>
              </article>
              <article className="col-span-4 row-span-1 flex h-full flex-col overflow-clip rounded-md border ">
                <TreeMap data={dataRegisWest} />
              </article>
            </section>
          )}
        </article>
        <article className="col-span-2 row-span-1 flex h-full flex-col rounded-md border p-2">
          <section>
            <h3 className="text-md font-bold">สัดส่วนลูกค้า แบ่งตามสัญชาติ</h3>
          </section>
          <section className="relative flex h-full w-full flex-col">
            {dataMainCustomerRatio?.length === 0 ? (
              <article className="flex h-full w-full flex-col items-center justify-center">
                <text className="text-sm">
                  {isFetchingShareHolderRatio
                    ? "กำลังโหลดข้อมูล..."
                    : "ยังไม่มีข้อมูลการลงทะเบียน"}
                </text>
              </article>
            ) : (
              <>
                <article className="flex h-[99%] w-full flex-col  items-center justify-center">
                  <PieChartComponents
                    data={Datanationality?.reduce((acc: any, cur) => {
                      const index = acc.findIndex(
                        (item: { id: string }) => item.id === cur.id,
                      );
                      if (index === -1) {
                        acc.push({
                          id: cur.id || "",
                          label: cur.id || "",
                          value: cur.value || 0,
                          color: cur.color,
                        });
                      } else {
                        acc[index].value += cur.value;
                      }
                      return acc;
                    }, [])}
                    enableArcLinkLabels={true}
                    isShowLegend={false}
                    scheme="custom"
                    arcLabelsTextColorMode="brighter"
                    arcLabelsTextColor="#ffffff"
                    unit="รายการ"
                    isPercent={true}
                  />
                </article>
                <article className="absolute bottom-0 right-0">
                  {Datanationality?.slice(0, 5)?.map(({ id, color }, i) => (
                    <article
                      key={i}
                      className="flex flex-row items-center justify-start gap-2"
                    >
                      <div
                        className={"h-3 w-3 rounded-full"}
                        style={{
                          backgroundColor: color,
                        }}
                      />
                      <h6 className="text-xs font-bold">{id}</h6>
                    </article>
                  ))}
                  {Datanationality?.length > 5 && (
                    <h6 className="mt-[-6px] w-full text-center text-xs font-bold">
                      ...
                    </h6>
                  )}
                </article>
              </>
            )}
          </section>
        </article>
        <article className="col-span-2 row-span-1 flex flex-col gap-4 rounded-md border p-2">
          <h3 className="text-md font-bold">
            ประเภทลูกค้าแบ่งตามวัตถุประสงค์การซื้อสินค้า
          </h3>
          {dataObjectivePurchasingRatio?.length === 0 ? (
            <article className="flex h-[92%] w-full flex-col items-center justify-center">
              <text className="text-sm">
                {isFetchingObjectivePurchasingRatio
                  ? "กำลังโหลดข้อมูล..."
                  : "ยังไม่มีข้อมูลการลงทะเบียน"}
              </text>
            </article>
          ) : (
            <article className="flex h-[80%] w-full flex-col">
              <BarChart
                data={DataObjectivePurchasingRatio}
                unitYAxis="รายการ"
                dataKey={[
                  { name: "ซื้อมาขายไป", color: COLORS_SERIES[10] },
                  { name: "ผลิตงาน", color: COLORS_SERIES[11] },
                  { name: "อื่นๆ", color: COLORS_SERIES[12] },
                ]}
              />
            </article>
          )}
        </article>
        <article className="relative col-span-4 row-span-1 rounded-md border">
          <section className="flex h-full w-full flex-col gap-2 p-2">
            <article>
              <h3 className="text-md font-bold">
                ประวัติขึ้นทะเบียนผู้ซื้อแบ่งตามบริษัท{" "}
              </h3>
            </article>
            {data?.length === 0 ? (
              <article className="flex h-full w-full flex-col items-center justify-center">
                <text className="text-sm">
                  {isFetchingRegisCount
                    ? "กำลังโหลดข้อมูล..."
                    : "ยังไม่มีข้อมูลการลงทะเบียน"}
                </text>
              </article>
            ) : (
              <article className="flex h-[99%] w-full flex-col">
                <BarChartHorizontal
                  data={data}
                  keyMap={["value", "name"]}
                  label="รายการ"
                  keyXAxis="name"
                  keyYAxis="value"
                  isLabelInside={true}
                />
              </article>
            )}
          </section>
        </article>
        <article className="col-span-2 row-span-1 flex h-full flex-col rounded-md border p-2">
          <h3 className="text-md font-bold">
            ลูกค้าหลักของบริษัทที่ขึ้นทะเบียน
          </h3>
          {dataMainCustomerRatio?.length === 0 ? (
            <article className="flex h-full w-full flex-col items-center justify-center">
              <text className="text-sm">
                {isFetchingMainCustomerRatio
                  ? "กำลังโหลดข้อมูล..."
                  : "ยังไม่มีข้อมูลการลงทะเบียน"}
              </text>
            </article>
          ) : (
            <article className="relative flex h-full w-full flex-col items-center justify-center">
              <article className="flex h-[95%] w-full flex-col  items-center justify-center">
                <PieChartComponents
                  data={DataMainCustomers}
                  enableArcLinkLabels={true}
                  isShowLegend={false}
                  scheme="custom"
                  arcLabelsTextColorMode="brighter"
                  arcLabelsTextColor="#ffffff"
                  unit="รายการ"
                />
              </article>
              <article className="absolute bottom-6 right-0">
                {DataMainCustomers?.map(({ id, color }, i) => (
                  <article
                    key={i}
                    className="flex flex-row items-center justify-start gap-2"
                  >
                    <div
                      className={"h-3 w-3 rounded-full"}
                      style={{
                        backgroundColor: color,
                      }}
                    />
                    <h6 className="text-xs font-bold">{id}</h6>
                  </article>
                ))}
              </article>
            </article>
          )}
        </article>
      </section>
    </main>
  );
};

export default HomePage;
