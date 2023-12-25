import BarChart from "@/components/common/chart/bar-chart";
import BarChartHorizontal from "@/components/common/chart/bar-chart-horizontal";
import PieChartComponents from "@/components/common/chart/pi-chart";
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
  } = useAtomStore();
  const { isFetchingRegisCount, isFetchingMainCustomerRatio } = useHome();

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
      value:
        dataObjectivePurchasingRatio?.filter(
          ({ objective_purchasing }) => objective_purchasing === "trade",
        )?.[0]?.amount ?? 10,
      datetime: "ซื้อมาขายไป",
    },
    {
      name: "ผลิตงาน",
      value:
        dataObjectivePurchasingRatio?.filter(
          ({ objective_purchasing }) => objective_purchasing === "produce",
        )?.[0]?.amount ?? 17,
      datetime: "ผลิตงาน",
    },
    {
      name: "อื่นๆ",
      value:
        dataObjectivePurchasingRatio?.filter(
          ({ objective_purchasing }) => objective_purchasing === "other",
        )?.[0]?.amount ?? 0,
      datetime: "อื่นๆ",
    },
  ]?.sort((a, b) => b?.value - a?.value);

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
    ?.filter(({ company }) => company !== "Undefine" && company !== "SNC")
    ?.map(({ company, regis_count }, i) => ({
      name: company,
      value: regis_count,
      color: COLORS_SERIES[9 + i],
    }))
    ?.sort((a, b) => b?.value - a?.value);

  const dataBarChart = [] as {
    name: string;
    value: number;
    datetime: string;
  }[];

  return (
    <main className="relative flex h-full w-full flex-col gap-2">
      {/* <div className="absolute inset-0 z-20 bg-[rgba(0,0,0,0.6)] from-primary" />
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 text-center text-2xl font-bold text-white lg:text-4xl">
        <h2 className="text-4xl">หน่วยงาน SNC-CoDE อยู่ระหว่างพัฒนาฟังก์ชัน</h2>
        <h2 className="text-3xl">ขออภัยในความไม่สะดวก</h2>
      </div> */}
      <section className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">
          ภาพรวมของการขึ้นทะเบียนผู้ซื้อ
        </h1>
        <div className="w-44">
          <Select
            className="text-xs shadow-none"
            defaultValue="2023"
            placeholder="เลือกปี"
          >
            <option value="2023">Y2023</option>
          </Select>
        </div>
      </section>
      <section className="grid h-full grid-cols-8 grid-rows-2 gap-2 overflow-clip">
        <article className="col-span-6 row-span-1 h-full overflow-clip rounded-md border p-2">
          <h3 className="text-md h-[8%] font-bold">สถิติการลงทะเบียน</h3>
          {dataBarChart?.length === 0 ? (
            <article className="flex h-[92%] w-full flex-col items-center justify-center">
              <text className="text-sm">
                {isFetchingRegisCount
                  ? "กำลังโหลดข้อมูล..."
                  : "ยังไม่มีข้อมูลการลงทะเบียน"}
              </text>
            </article>
          ) : (
            <article className="flex h-[92%] w-full flex-col">
              <BarChart data={dataBarChart} domain={[0, 100]} />
            </article>
          )}
        </article>
        <article className="col-span-2 row-span-1 rounded-md border p-2">
          <section className="flex h-full w-full flex-col gap-2">
            <article>
              <h3 className="text-md font-bold">
                สัดส่วนลูกค้า แบ่งตามสัญชาติ
              </h3>
            </article>
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
                <article className="flex h-[80%] w-full flex-col  items-center justify-center">
                  <PieChartComponents
                    data={Datanationality}
                    enableArcLinkLabels={true}
                    isShowLegend={false}
                    scheme="custom"
                    arcLabelsTextColorMode="brighter"
                    arcLabelsTextColor="#ffffff"
                    unit="รายการ"
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
              </article>
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
                {isFetchingRegisCount
                  ? "กำลังโหลดข้อมูล..."
                  : "ยังไม่มีข้อมูลการลงทะเบียน"}
              </text>
            </article>
          ) : (
            <article className="flex h-[80%] w-full flex-col">
              <BarChart data={DataObjectivePurchasingRatio} unitYAxis="" />
            </article>
          )}
        </article>
        <article className="relative col-span-4 row-span-1 rounded-md border">
          {/* <Popover>
            <PopoverTrigger className="absolute right-2 top-2">
              <Icons.filter className="h-4 w-4 text-primary" />
            </PopoverTrigger>
            <PopoverContent align="end" className="h-60 w-72 p-0 shadow-sm">
              <section className="flex h-full w-full flex-col gap-2 overflow-hidden p-1">
                <h2 className="px-2 py-1 text-sm font-semibold underline">
                  ตัวกรอง
                </h2>
                <div>
                  <p className="px-2 py-1 text-xs font-semibold">เลือกปี</p>
                  <Select
                    placeholder="เลือกปี"
                    className="text-xs shadow-none"
                    defaultValue="2023"
                  >
                    <option value="2023">Y2023</option>
                  </Select>
                </div>
                <div>
                  <p className="px-2 py-1 text-xs font-semibold">
                    รูปแบบการแสดงผล
                  </p>
                  <Select
                    defaultValue="quarter"
                    placeholder="รูปแบบการแสดงผล"
                    className="text-xs shadow-none"
                  >
                    <option value="quarter">ไตรมาส</option>
                    <option value="month">เดือน</option>
                    <option value="year">ปี</option>
                  </Select>
                </div>
                <div>
                  <p className="px-2 py-1 text-xs font-semibold">
                    รูปแบบการแสดงผล
                  </p>
                  <Select
                    defaultValue="quarter-1"
                    placeholder="รูปแบบการแสดงผล"
                    className="text-xs shadow-none"
                  >
                    <option value="quarter-1">ไตรมาส 1</option>
                  </Select>
                </div>
              </section>
            </PopoverContent>
          </Popover> */}
          <section className="flex h-full w-full flex-col gap-2 p-2">
            <article>
              <h3 className="text-md font-bold">
                ประวัติขึ้นทะเบียนผู้ซื้อแบ่งตามบริษัท{" "}
                {/* <span className="text-xs text-muted-foreground">
                  (อัพเดทล่าสุด วันที่ 01/01/2021)
                </span> */}
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
              <article className="flex h-full w-full flex-col">
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
        <article className="col-span-2 row-span-1 rounded-md border p-2">
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
              <article className="flex h-[80%] w-full flex-col  items-center justify-center">
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
