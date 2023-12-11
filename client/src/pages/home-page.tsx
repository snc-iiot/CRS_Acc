import BarChartHorizontal from "@/components/common/chart/bar-chart-horizontal";
import PieChartComponents from "@/components/common/chart/pi-chart";
import { Icons } from "@/components/common/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select } from "@/components/ui/select-custom";
import { COLORS_SERIES } from "@/lib/utils";
import MockCompany from "@/mock/company.json";
import { FC } from "react";

const HomePage: FC = () => {
  const PieChartData = [
    {
      id: "XXX",
      label: "XXX",
      value: 555,
      color: "#1F2C57",
    },
    {
      id: "YYY",
      label: "YYY",
      value: 344,
      color: "#F2C94C",
    },
  ];

  const data = MockCompany.map((item, i) => ({
    name: item?.Company,
    value: Math.floor(Math.random() * 100),
    color: COLORS_SERIES[9 + i],
  })).sort((a, b) => b.value - a.value);

  return (
    <main className="flex h-full w-full flex-col gap-2">
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
      <section className="grid h-full grid-cols-8 grid-rows-2 gap-2">
        <article className="col-span-6 row-span-1 rounded-md border p-2">
          <h3 className="text-md font-bold">Dashboard 0</h3>
        </article>
        <article className="col-span-2 row-span-1 rounded-md border p-2">
          <section className="flex h-full w-full flex-col gap-2">
            <article>
              <h3 className="text-md font-bold">
                สัดส่วนลูกค้า แบ่งตามสัญชาติ
              </h3>
            </article>
            <article className="flex h-full w-full flex-col">
              <PieChartComponents
                data={PieChartData}
                enableArcLinkLabels={true}
                isShowLegend={false}
                scheme="custom"
                arcLabelsTextColorMode="brighter"
                arcLabelsTextColor="#ffffff"
                unit="รายการ"
              />
            </article>
          </section>
        </article>
        <article className="col-span-2 row-span-1 rounded-md border p-2">
          <h3 className="text-md font-bold">
            ประเภทลูกค้าแบ่งตามวัตถุประสงค์การซื้อสินค้า
          </h3>
        </article>
        <article className="col-span-2 row-span-1 rounded-md border p-2">
          <h3 className="text-md font-bold">
            ลูกค้าหลักของบริษัทที่ขึ้นทะเบียน
          </h3>
        </article>
        <article className="relative col-span-4 row-span-1 rounded-md border">
          <Popover>
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
          </Popover>
          <section className="flex h-full w-full flex-col gap-2 p-2">
            <article>
              <h3 className="text-md font-bold">
                ประวัติขึ้นทะเบียนผู้ซื้อแบ่งตามบริษัท{" "}
                <span className="text-xs text-muted-foreground">
                  (อัพเดทล่าสุด วันที่ 01/01/2021)
                </span>
              </h3>
            </article>
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
          </section>
        </article>
      </section>
    </main>
  );
};

export default HomePage;
