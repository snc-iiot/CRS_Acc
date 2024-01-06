import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useConfirm } from "@/hooks";
import { useSwal } from "@/hooks/use-swal";
import { useAtomStore } from "@/jotai/use-atom-store";
import Excel from "@/lib/excel";
import { useForm, useUtils } from "@/services";
import { useImportExcel } from "@/services/hooks/use-import-excel";
import { FC, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";
import { Icons } from "./icons";
import TableDBD, { ITableDBD } from "./table-dbd";
import TableDBDFinancialRatio from "./table-dbd-financial-ratio";

interface Props {
  activeTab: "R2" | "R3" | "R4" | "R5";
}

const ActionTab: FC<Props> = ({ activeTab = "R2" }) => {
  const { Confirm } = useConfirm();
  const { showLoading, closeSwal, confirmSwal, showError } = useSwal();
  const [isOpenUpload, setIsOpenUpdate] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const regisId = searchParams.get("RegisID");
  const { mutateSyncDBD, mutateGetDBDInfo } = useUtils();
  const { mutateConfirmDBDInfo } = useForm();

  const UploadDBDDialog = () => {
    const { mutateImportExcelFinancialPosition, mutateImportExcelIcomeStatement, mutateImportExcelFinancialRatios } =
      useImportExcel();

    const inputFileFinancialPosition = useRef<HTMLInputElement>(null);
    const inputFileIncomeStatement = useRef<HTMLInputElement>(null);
    const inputFileFinancialRatios = useRef<HTMLInputElement>(null);
    const excel = new Excel();
    const regisId = searchParams.get("RegisID");

    const { dataDBDSyncList, setDataDBDSyncList } = useAtomStore();

    const Financial =
      dataDBDSyncList?.financial_position?.map((item) => ({
        Topic: `${item?.topic_th} ${item?.topic_en === "" ? "" : `(${item?.topic_en})`}`,
        Info: item?.info?.map((info) => ({
          Year: info?.year,
          Amount: info?.amount,
          Change: info?.change,
        })),
      })) ?? ([] as ITableDBD[]);

    const Income =
      dataDBDSyncList?.income_statement?.map((item) => ({
        Topic: `${item?.topic_th} ${item?.topic_en === "" ? "" : `(${item?.topic_en})`}`,
        Info: item?.info?.map((info) => ({
          Year: info.year,
          Amount: info.amount,
          Change: info.change,
        })),
      })) ?? ([] as ITableDBD[]);

    const mapTopicsT1 = {
      "Accounts Receivable": "ลูกหนี้การค้าสุทธิ",
      Inventories: "สินค้าคงเหลือ",
      "Total Current Assets": "สินทรัพย์หมุนเวียน",
      "Property, Plant and Equipment": "ที่ดิน อาคารและอุปกรณ์",
      "Total Non-current Assets": "สินทรัพย์ไม่หมุนเวียน",
      "Total Assets": "สินทรัพย์รวม",
      Assets: "สินทรัพย์รวม",
      "Total Current Liabilities": "หนี้สินหมุนเวียน",
      "Total Non-current Liabilities": "หนี้สินไม่หมุนเวียน",
      "Total Liabilities": "หนี้สินรวม",
      Equity: "ส่วนของผู้ถือหุ้น",
      "Total Liabilities and Equity": "หนี้สินรวมและส่วนของผู้ถือหุ้น",

      ลูกหนี้การค้าสุทธิ: "Accounts Receivable",
      สินค้าคงเหลือ: "Inventories",
      สินทรัพย์หมุนเวียน: "Total Current Assets",
      "ที่ดิน อาคารและอุปกรณ์": "Property, Plant and Equipment",
      สินทรัพย์ไม่หมุนเวียน: "Total Non-current Assets",
      สินทรัพย์รวม: "Total Assets",
      หนี้สินหมุนเวียน: "Total Current Liabilities",
      หนี้สินไม่หมุนเวียน: "Total Non-current Liabilities",
      หนี้สินรวม: "Total Liabilities",
      ส่วนของผู้ถือหุ้น: "Equity",
      หนี้สินรวมและส่วนของผู้ถือหุ้น: "Total Liabilities and Equity",
    };

    // //! Table 2
    const mapTopicsT2 = {
      "Revenue from Sales&Services": "รายได้หลัก",
      "Total Revenue": "รายได้รวม",
      "Cost of Goods Sold": "ต้นทุนขาย",
      "Gross Profit (Loss)": "กำไร(ขาดทุน) ขั้นต้น",
      "Selling&Admin Expenses": "ค่าใช้จ่ายในการขายและบริหาร",
      "Total Expenses": "รายจ่ายรวม",
      "Interest Expenses": "ดอกเบี้ยจ่าย",
      "Profit(Loss) before Income Tax": "กำไร(ขาดทุน) ก่อนภาษี",
      "Income Tax Expense": "ภาษีเงินได้",
      "Net Profit (Loss)": "กำไร(ขาดทุน) สุทธิ",
      รายได้หลัก: "Revenue from Sales&Services",
      รายได้รวม: "Total Revenue",
      ต้นทุนขาย: "Cost of Goods Sold",
      "กำไร(ขาดทุน) ขั้นต้น": "Gross Profit (Loss)",
      ค่าใช้จ่ายในการขายและบริหาร: "Selling&Admin Expenses",
      รายจ่ายรวม: "Total Expenses",
      ดอกเบี้ยจ่าย: "Interest Expenses",
      "กำไร(ขาดทุน) ก่อนภาษี": "Profit(Loss) before Income Tax",
      ภาษีเงินได้: "Income Tax Expense",
      "กำไร(ขาดทุน) สุทธิ": "Net Profit (Loss)",
    };

    // //! Table 3
    const mapTopicsT3 = {
      "Return on Assets (%)": "อัตราผลตอบแทนจากสินทรัพย์รวม(ROA) (%)",
      "Return on Equity (%)": "อัตราผลตอบแทนจากส่วนของผู้ถือหุ้น(ROE) (%)",
      "Gross Profit Margin (%)": "ผลตอบแทนจากกำไรขั้นต้นต่อรายได้รวม (%)",
      "Operating Income on Revenue Ratio (%)": "ผลตอบแทนจากการดำเนินงานต่อรายได้รวม (%)",
      "Net Profit Margin (%)": "ผลตอบแทนจากกำไรสุทธิต่อรายได้รวม (%)",
      "Current Ratio (times)": "อัตราส่วนทุนหมุนเวียน(เท่า)",
      "Accounts Receivable Turnover (times)": "อัตราการหมุนเวียนของลูกหนี้ (เท่า)",
      "Inventory Turnover (times)": "อัตราการหมุนเวียนของสินค้าคงเหลือ (เท่า)",
      "Accounts Payable Turnover (times)": "อัตราการหมุนเวียนของเจ้าหนี้ (เท่า)",
      "Total Assets Turnover (times)": "อัตราการหมุนเวียนของสินทรัพย์รวม (เท่า)",
      "Operation Expense to Total Revenue Ratio (%)": "อัตราค่าใช้จ่ายการดำเนินงานต่อรายได้รวม (%)",
      "Asset to Equity Ratio or Financial Leverage (times)": "อัตราส่วนสินทรัพย์รวมต่อส่วนของผู้ถือหุ้น (เท่า)",
      "Debt to Asset Ratio (times)": "อัตราส่วนหนี้สินรวมต่อสินทรัพย์รวม (เท่า)",
      "Debt to Equity Ratio (times)": "อัตราส่วนหนี้สินรวมต่อส่วนของผู้ถือหุ้น (เท่า)",
      "Debt to Capital Ratio (times)": "อัตราส่วนหนี้สินรวมต่อทุนดำเนินงาน (เท่า)",

      "อัตราผลตอบแทนจากสินทรัพย์รวม(ROA) (%)": "Return on Assets (%)",
      "อัตราผลตอบแทนจากส่วนของผู้ถือหุ้น(ROE) (%)": "Return on Equity (%)",
      "ผลตอบแทนจากกำไรขั้นต้นต่อรายได้รวม (%)": "Gross Profit Margin (%)",
      "ผลตอบแทนจากการดำเนินงานต่อรายได้รวม (%)": "Operating Income on Revenue Ratio (%)",
      "ผลตอบแทนจากกำไรสุทธิต่อรายได้รวม (%)": "Net Profit Margin (%)",
      "อัตราส่วนทุนหมุนเวียน(เท่า)": "Current Ratio (times)",
      "อัตราการหมุนเวียนของลูกหนี้ (เท่า)": "Accounts Receivable Turnover (times)",
      "อัตราการหมุนเวียนของสินค้าคงเหลือ (เท่า)": "Inventory Turnover (times)",
      "อัตราการหมุนเวียนของเจ้าหนี้ (เท่า)": "Accounts Payable Turnover (times)",
      "อัตราการหมุนเวียนของสินทรัพย์รวม (เท่า)": "Total Assets Turnover (times)",
      "อัตราค่าใช้จ่ายการดำเนินงานต่อรายได้รวม (%)": "Operation Expense to Total Revenue Ratio (%)",
      "อัตราส่วนสินทรัพย์รวมต่อส่วนของผู้ถือหุ้น (เท่า)": "Asset to Equity Ratio or Financial Leverage (times)",
      "อัตราส่วนหนี้สินรวมต่อสินทรัพย์รวม (เท่า)": "Debt to Asset Ratio (times)",
      "อัตราส่วนหนี้สินรวมต่อส่วนของผู้ถือหุ้น (เท่า)": "Debt to Equity Ratio (times)",
      "อัตราส่วนหนี้สินรวมต่อทุนดำเนินงาน (เท่า)": "Debt to Capital Ratio (times)",
    };

    const mapShortKeysT3 = {
      "Return on Assets (%)": "ROA",
      "Return on Equity (%)": "ROE",
      "Gross Profit Margin (%)": "gross_profit_margin",
      "Operating Income on Revenue Ratio (%)": "operating_income_on_revenue_ratio",
      "Net Profit Margin (%)": "net_profit_margin",
      "Current Ratio (times)": "current_ratio",
      "Accounts Receivable Turnover (times)": "accounts_receivable_turnover",
      "Inventory Turnover (times)": "inventory_turnover",
      "Accounts Payable Turnover (times)": "accounts_payable_turnover",
      "Total Assets Turnover (times)": "total_assets_turnover",
      "Operation Expense to Total Revenue Ratio (%)": "operation_expense_to_total_revenue_ratio",
      "Asset to Equity Ratio or Financial Leverage (times)": "asset_to_equity_ratio_or_financial_leverage",
      "Debt to Asset Ratio (times)": "debt_to_asset_ratio",
      "Debt to Equity Ratio (times)": "debt_to_equity_ratio",
      "Debt to Capital Ratio (times)": "debt_to_capital_ratio",
    };

    function handleChooseFileFinancialPosition() {
      inputFileFinancialPosition.current?.click();
    }
    function handleChooseFileIncomeStatement() {
      inputFileIncomeStatement.current?.click();
    }
    function handleChooseFileFinancialRatios() {
      inputFileFinancialRatios.current?.click();
    }

    function isThai(text: string) {
      return text.charCodeAt(0) > 3584 && text.charCodeAt(0) < 3711;
    }

    async function onChangeIFileFinancialPosition(e: React.ChangeEvent<HTMLInputElement>) {
      const files = e.target.files || [];
      if (files?.length > 0) {
        try {
          const file = files[0];

          const data: { [key: string]: string }[] = (await excel.importFile(file)) as {
            [key: string]: string;
          }[];

          const dataArray = Object.keys(data?.[0] ?? {});
          const dataKey = dataArray[0];

          const isThais = isThai(data?.[3]?.[dataKey]);

          const Data = data?.slice(3)?.map((info, i) => ({
            topic_no: i + 1,
            topic_th: isThais
              ? info?.[dataKey] ?? ""
              : mapTopicsT1?.[(typeof info?.[dataKey] === "string" ? info[dataKey] : "") as keyof typeof mapTopicsT1] ??
                "",
            topic_en: isThais
              ? mapTopicsT1?.[(typeof info?.[dataKey] === "string" ? info[dataKey] : "") as keyof typeof mapTopicsT1] ??
                ""
              : info?.[dataKey] ?? "",
            short_key: "",
            info: [
              {
                year: (isThais ? 0 : 543) + parseFloat(data?.[1]?.__EMPTY_1?.replace(/,/g, "")) ?? "-",
                amount: parseFloat(info?.__EMPTY_1?.replace(/,/g, "")) ?? "-",
                change: parseFloat(info?.__EMPTY_2?.replace(/,/g, "")) ?? "-",
              },
              {
                year: (isThais ? 0 : 543) + parseFloat(data?.[1]?.__EMPTY_3?.replace(/,/g, "")) ?? "-",
                amount: parseFloat(info?.__EMPTY_3?.replace(/,/g, "")) ?? "-",
                change: parseFloat(info?.__EMPTY_4?.replace(/,/g, "")) ?? "-",
              },
              {
                year: (isThais ? 0 : 543) + parseFloat(data?.[1]?.__EMPTY_5?.replace(/,/g, "")) ?? "-",
                amount: parseFloat(info?.__EMPTY_5?.replace(/,/g, "")) ?? "-",
                change: parseFloat(info?.__EMPTY_6?.replace(/,/g, "")) ?? "-",
              },
              {
                year: (isThais ? 0 : 543) + parseFloat(data?.[1]?.__EMPTY_7?.replace(/,/g, "")) ?? "-",
                amount: parseFloat(info?.__EMPTY_7?.replace(/,/g, "")) ?? "-",
                change: parseFloat(info?.__EMPTY_8?.replace(/,/g, "")) ?? "-",
              },
              {
                year: (isThais ? 0 : 543) + parseFloat(data?.[1]?.__EMPTY_9?.replace(/,/g, "")) ?? "-",
                amount: parseFloat(info?.__EMPTY_9?.replace(/,/g, "")) ?? "-",
                change: parseFloat(info?.__EMPTY_10?.replace(/,/g, "")) ?? "-",
              },
            ],
          }));

          setDataDBDSyncList({ ...dataDBDSyncList, financial_position: Data });
        } catch (error) {
          console.log(error);
        }
      }
    }

    async function onChangeIFileIncomeStatement(e: React.ChangeEvent<HTMLInputElement>) {
      const files = e.target.files || [];
      if (files?.length > 0) {
        try {
          const file = files[0];

          const data: { [key: string]: string }[] = (await excel.importFile(file)) as {
            [key: string]: string;
          }[];

          const dataArray = Object.keys(data?.[0] ?? {});
          const dataKey = dataArray[0];

          const isThais = isThai(data?.[3]?.[dataKey]);

          const Data = data?.slice(3)?.map((info, i) => ({
            topic_no: i + 1,
            topic_th: isThais
              ? info?.[dataKey] ?? ""
              : mapTopicsT2?.[(typeof info?.[dataKey] === "string" ? info[dataKey] : "") as keyof typeof mapTopicsT2] ??
                "",
            topic_en: isThais
              ? mapTopicsT2?.[(typeof info?.[dataKey] === "string" ? info[dataKey] : "") as keyof typeof mapTopicsT2] ??
                ""
              : info?.[dataKey] ?? "",
            short_key: "",
            info: [
              {
                year: (isThais ? 0 : 543) + parseFloat(data?.[1]?.__EMPTY_1?.replace(/,/g, "")) ?? "-",
                amount: parseFloat(info?.__EMPTY_1?.replace(/,/g, "")) ?? "-",
                change: parseFloat(info?.__EMPTY_2?.replace(/,/g, "")) ?? "-",
              },
              {
                year: (isThais ? 0 : 543) + parseFloat(data?.[1]?.__EMPTY_3?.replace(/,/g, "")) ?? "-",
                amount: parseFloat(info?.__EMPTY_3?.replace(/,/g, "")) ?? "-",
                change: parseFloat(info?.__EMPTY_4?.replace(/,/g, "")) ?? "-",
              },
              {
                year: (isThais ? 0 : 543) + parseFloat(data?.[1]?.__EMPTY_5?.replace(/,/g, "")) ?? "-",
                amount: parseFloat(info?.__EMPTY_5?.replace(/,/g, "")) ?? "-",
                change: parseFloat(info?.__EMPTY_6?.replace(/,/g, "")) ?? "-",
              },
              {
                year: (isThais ? 0 : 543) + parseFloat(data?.[1]?.__EMPTY_7?.replace(/,/g, "")) ?? "-",
                amount: parseFloat(info?.__EMPTY_7?.replace(/,/g, "")) ?? "-",
                change: parseFloat(info?.__EMPTY_8?.replace(/,/g, "")) ?? "-",
              },
              {
                year: (isThais ? 0 : 543) + parseFloat(data?.[1]?.__EMPTY_9?.replace(/,/g, "")) ?? "-",
                amount: parseFloat(info?.__EMPTY_9?.replace(/,/g, "")) ?? "-",
                change: parseFloat(info?.__EMPTY_10?.replace(/,/g, "")) ?? "-",
              },
            ],
          }));

          setDataDBDSyncList({ ...dataDBDSyncList, income_statement: Data });
        } catch (error) {
          console.log(error);
        }
      }
    }

    async function onChangeIFileFinancialRatios(e: React.ChangeEvent<HTMLInputElement>) {
      const files = e.target.files || [];
      if (files?.length > 0) {
        try {
          const file = files[0];

          const data: { [key: string]: string }[] = (await excel.importFile(file)) as {
            [key: string]: string;
          }[];

          const isThais = isThai(data?.[3]?.__EMPTY_1);

          const Data = data
            ?.slice(3)
            ?.filter((info) => info?.__EMPTY_2 !== undefined)
            ?.map((info, i) => ({
              topic_no: i + 1,
              topic_th: isThais
                ? info?.__EMPTY_1 ?? ""
                : mapTopicsT3?.[
                    (typeof info?.__EMPTY_1 === "string" ? info?.__EMPTY_1 : "") as keyof typeof mapTopicsT3
                  ] ?? "",
              topic_en: isThais
                ? mapTopicsT3?.[
                    (typeof info?.__EMPTY_1 === "string" ? info?.__EMPTY_1 : "") as keyof typeof mapTopicsT3
                  ] ?? ""
                : info?.__EMPTY_1 ?? "",
              short_key:
                mapShortKeysT3[
                  (isThais
                    ? mapTopicsT3?.[
                        (typeof info?.__EMPTY_1 === "string" ? info?.__EMPTY_1 : "") as keyof typeof mapTopicsT3
                      ] ?? ""
                    : info?.__EMPTY_1 ?? "") as keyof typeof mapShortKeysT3
                ] ?? "",
              info: [
                {
                  year: (isThais ? 0 : 543) + parseFloat(data?.[1]?.__EMPTY_2?.replace(/,/g, "")) ?? "-",
                  ratio: parseFloat(info?.__EMPTY_2?.replace(/,/g, "")) ?? "-",
                },
                {
                  year: (isThais ? 0 : 543) + parseFloat(data?.[1]?.__EMPTY_3?.replace(/,/g, "")) ?? "-",
                  ratio: parseFloat(info?.__EMPTY_3?.replace(/,/g, "")) ?? "-",
                },
                {
                  year: (isThais ? 0 : 543) + parseFloat(data?.[1]?.__EMPTY_4?.replace(/,/g, "")) ?? "-",
                  ratio: parseFloat(info?.__EMPTY_4?.replace(/,/g, "")) ?? "-",
                },
                {
                  year: (isThais ? 0 : 543) + parseFloat(data?.[1]?.__EMPTY_5?.replace(/,/g, "")) ?? "-",
                  ratio: parseFloat(info?.__EMPTY_5?.replace(/,/g, "")) ?? "-",
                },
                {
                  year: (isThais ? 0 : 543) + parseFloat(data?.[1]?.__EMPTY_6?.replace(/,/g, "")) ?? "-",
                  ratio: parseFloat(info?.__EMPTY_6?.replace(/,/g, "")) ?? "-",
                },
              ],
            }));

          setDataDBDSyncList({
            ...dataDBDSyncList,
            financial_ratio: Data,
          });
        } catch (error) {
          console.log(error);
        }
      }
    }

    const handleUploadDBD = async () => {
      showLoading("กำลังอัพโหลดข้อมูล", "กรุณารอสักครู่...");
      // await Promise.all([
      //   dataDBDSyncList?.financial_position?.[0] &&
      //     mutateImportExcelFinancialPosition({
      //       regis_id: regisId as string,
      //       content: dataDBDSyncList?.financial_position,
      //     }),
      //   dataDBDSyncList?.income_statement?.[0] &&
      //     mutateImportExcelIcomeStatement({
      //       regis_id: regisId as string,
      //       content: dataDBDSyncList?.income_statement,
      //     }),
      //   dataDBDSyncList?.financial_ratio?.[0] &&
      //     mutateImportExcelFinancialRatios({
      //       regis_id: regisId as string,
      //       content: dataDBDSyncList?.financial_ratio,
      //     }),
      // ]);
      if (dataDBDSyncList?.financial_position?.[0]) {
        const data = await mutateImportExcelFinancialPosition({
          regis_id: regisId as string,
          content: dataDBDSyncList?.financial_position,
        });
        if (data?.status === "error") {
          closeSwal();
          setIsOpenUpdate(false);
          showError(data?.message, "");
          return;
        }
      }
      if (dataDBDSyncList?.income_statement?.[0]) {
        const data = await mutateImportExcelIcomeStatement({
          regis_id: regisId as string,
          content: dataDBDSyncList?.income_statement,
        });
        if (data?.status === "error") {
          closeSwal();
          setIsOpenUpdate(false);
          showError(data?.message, "");
          return;
        }
      }
      if (dataDBDSyncList?.financial_ratio?.[0]) {
        const data = await mutateImportExcelFinancialRatios({
          regis_id: regisId as string,
          content: dataDBDSyncList?.financial_ratio,
        });
        if (data?.status === "error") {
          closeSwal();
          setIsOpenUpdate(false);
          showError(data?.message, "");
          return;
        }
      }

      await mutateSyncDBD(regisId as string);
      await mutateGetDBDInfo(regisId as string);
      setIsOpenUpdate(false);
      closeSwal();
    };

    return (
      <div className="flex items-center justify-end text-sm">
        <Dialog
          open={isOpenUpload}
          onOpenChange={(e) => {
            setDataDBDSyncList({ ...dataDBDSyncList, regis_id: regisId ?? "" });
            setIsOpenUpdate(e);
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpenUpdate(true)}>
              <Icons.uploadCloudIcon className="mr-2" />
              Upload ข้อมูล DBD
            </Button>
          </DialogTrigger>
          <DialogContent
            style={{ minWidth: "max-content", maxHeight: "80%" }}
            className="flex flex-col overflow-clip p-2"
          >
            <div className="flex w-full flex-col gap-2 overflow-clip">
              <h2 className="text-lg font-semibold">กรุณากรอกรหัสลูกค้าให้ถูกต้อง</h2>
              <div className="flex gap-2">
                {dataDBDSyncList?.financial_position?.[0] === undefined ? (
                  <Button className="w-[20rem]" onClick={() => handleChooseFileFinancialPosition()}>
                    <Icons.uploadCloudIcon className="mr-2" />
                    Upload ข้อมูล งบแสดงฐานะการเงิน
                  </Button>
                ) : (
                  <Button
                    className="w-[20rem] bg-red-600 hover:bg-red-600/80"
                    onClick={() =>
                      setDataDBDSyncList({
                        ...dataDBDSyncList,
                        financial_position: [],
                      })
                    }
                  >
                    <Icons.trash2 className="mr-2" />
                    ลบข้อมูล งบแสดงฐานะการเงิน
                  </Button>
                )}

                {dataDBDSyncList?.income_statement?.[0] === undefined ? (
                  <Button className="w-[20rem]" onClick={() => handleChooseFileIncomeStatement()}>
                    <Icons.uploadCloudIcon className="mr-2" />
                    Upload ข้อมูล งบกำไรขาดทุน
                  </Button>
                ) : (
                  <Button
                    className="w-[20rem] bg-red-600 hover:bg-red-600/80"
                    onClick={() =>
                      setDataDBDSyncList({
                        ...dataDBDSyncList,
                        income_statement: [],
                      })
                    }
                  >
                    <Icons.trash2 className="mr-2" />
                    ลบข้อมูล งบกำไรขาดทุน
                  </Button>
                )}

                {dataDBDSyncList?.financial_ratio?.[0] === undefined ? (
                  <Button className="w-[20rem]" onClick={() => handleChooseFileFinancialRatios()}>
                    <Icons.uploadCloudIcon className="mr-2" />
                    Upload ข้อมูล อัตราส่วนทางการเงินที่สำคัญ
                  </Button>
                ) : (
                  <Button
                    className="w-[20rem] bg-red-600 hover:bg-red-600/80"
                    onClick={() =>
                      setDataDBDSyncList({
                        ...dataDBDSyncList,
                        financial_ratio: [],
                      })
                    }
                  >
                    <Icons.trash2 className="mr-2" />
                    ลบข้อมูล อัตราส่วนทางการเงินที่สำคัญ
                  </Button>
                )}
              </div>
              <div className="flex h-full w-full overflow-auto">
                <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]}>
                  <AccordionItem className="min-w-[1200px]" value="item-1">
                    <AccordionTrigger className="p-1 text-xs font-bold">
                      งบการเงิน / Statement of Financial Position
                    </AccordionTrigger>
                    <AccordionContent>
                      <TableDBD className="w-full" data={Financial} />
                      <input
                        ref={inputFileFinancialPosition}
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={onChangeIFileFinancialPosition}
                        className="h-[200px] w-full border-spacing-2 rounded-md border-2 border-dashed border-gray-300 p-2 text-gray-700"
                        style={{ outline: "none", display: "none" }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="p-1 text-xs font-bold">
                      งบกำไรขาดทุน / Income Statement
                    </AccordionTrigger>
                    <AccordionContent>
                      <input
                        ref={inputFileIncomeStatement}
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={onChangeIFileIncomeStatement}
                        className="h-100 w-full border-spacing-2 rounded-md border-2 border-gray-300 p-2 text-gray-700"
                        style={{ outline: "none", display: "none" }}
                      />

                      <TableDBD className="w-full" data={Income} />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="p-1 text-xs font-bold">
                      อัตราส่วนทางการเงิน / Financial Ratio
                    </AccordionTrigger>
                    <AccordionContent>
                      <input
                        ref={inputFileFinancialRatios}
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={onChangeIFileFinancialRatios}
                        className="h-100 w-full border-spacing-2 rounded-md border-2 border-gray-300 p-2 text-gray-700"
                        style={{ outline: "none", display: "none" }}
                      />

                      <TableDBDFinancialRatio />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="flex w-full items-end justify-end gap-2">
                <Button
                  className="bg-green-600 hover:bg-green-600/80"
                  disabled={
                    dataDBDSyncList?.financial_position?.[0] === undefined &&
                    dataDBDSyncList?.financial_ratio?.[0] === undefined &&
                    dataDBDSyncList?.income_statement?.[0] === undefined
                  }
                  onClick={handleUploadDBD}
                >
                  <Icons.save className="mr-2" />
                  ยืนยันข้อมูลการเงิน
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const renderElement = {
    // ["R1"]: (
    //   <div className="flex w-full items-center justify-end gap-2">
    //     <Button className="bg-yellow-500 hover:bg-yellow-500/80">
    //       <Icons.fileEdit className="mr-2 h-5 w-5" />
    //       แก้ไขข้อมูล
    //     </Button>
    //     <Button className="bg-green-600 hover:bg-green-600/80">
    //       <Icons.save className="mr-2 h-5 w-5" />
    //       บันทึกข้อมูล
    //     </Button>
    //   </div>
    // ),
    ["R2"]: (
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2">
          <Button
            onClick={async () => {
              showLoading("กำลังดำเนินการ Sync ข้อมูล DBD", "กรุณารอสักครู่...");
              await mutateSyncDBD(regisId as string);
              closeSwal();
            }}
          >
            <Icons.refreshCcw className="mr-2" />
            Sync ข้อมูล DBD
          </Button>
          <UploadDBDDialog />
        </div>
        <Button
          className="bg-green-600 hover:bg-green-600/80"
          onClick={async () => {
            const isConfirm = await confirmSwal("ยืนยันข้อมูลการเงิน", "คุณต้องการยืนยันข้อมูลการเงินใช่หรือไม่");
            if (isConfirm) {
              await mutateConfirmDBDInfo(regisId as string);
            }
          }}
        >
          <Icons.save className="mr-2 h-5 w-5" />
          ยืนยันข้อมูลการเงิน
        </Button>
      </div>
    ),
    ["R3"]: (
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2">
          <Button>
            <Icons.refreshCcw className="mr-2" />
            Sync ข้อมูล DBD
          </Button>
          <Button variant="secondary">
            <Icons.downloadCloud className="mr-2" />
            อัพโหลดข้อมูลโดย Excel{" "}
          </Button>
        </div>
        <Confirm
          button={
            <Button className="bg-green-600 hover:bg-green-600/80">
              <Icons.save className="mr-2 h-5 w-5" />
              ยืนยันข้อมูลและคำนวณ
            </Button>
          }
          title="ยืนยันการบันทึกข้อมูล"
          description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
          confirm={() => console.log("action")}
          cancel={() => console.log("cancel")}
          confirmButtonText="บันทึกข้อมูล"
          cancelButtonText="ยกเลิก"
        />
      </div>
    ),
    ["R4"]: (
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2">
          <Button>
            <Icons.refreshCcw className="mr-2" />
            Sync ข้อมูล DBD
          </Button>
          <Button variant="secondary">
            <Icons.downloadCloud className="mr-2" />
            อัพโหลดข้อมูลโดย Excel{" "}
          </Button>
        </div>
        <Confirm
          button={
            <Button className="bg-green-600 hover:bg-green-600/80">
              <Icons.save className="mr-2 h-5 w-5" />
              ยืนยันข้อมูลและคำนวณ
            </Button>
          }
          title="ยืนยันการบันทึกข้อมูล"
          description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
          confirm={() => console.log("action")}
          cancel={() => console.log("cancel")}
          confirmButtonText="บันทึกข้อมูล"
          cancelButtonText="ยกเลิก"
        />
      </div>
    ),
    ["R5"]: (
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2">
          <Button>
            <Icons.refreshCcw className="mr-2" />
            Sync ข้อมูล DBD
          </Button>
          <Button variant="secondary">
            <Icons.downloadCloud className="mr-2" />
            อัพโหลดข้อมูลโดย Excel{" "}
          </Button>
        </div>
        <Confirm
          button={
            <Button className="bg-green-600 hover:bg-green-600/80">
              <Icons.save className="mr-2 h-5 w-5" />
              ยืนยันข้อมูลและคำนวณ
            </Button>
          }
          title="ยืนยันการบันทึกข้อมูล"
          description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
          confirm={() => console.log("action")}
          cancel={() => console.log("cancel")}
          confirmButtonText="บันทึกข้อมูล"
          cancelButtonText="ยกเลิก"
        />
      </div>
    ),
  };

  return <>{renderElement[activeTab]}</>;
};

export default ActionTab;
