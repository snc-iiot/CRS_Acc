import { Icons } from "@/components/common/icons";
// import { cn } from "@/lib/utils";
// import { Checkbox } from "@/components/ui/checkbox";
import { FC, Fragment } from "react";

const StandardsCertifications: FC = () => {
  const certificationInformation: {
    topic: string;
    label: string;
    isChecked: boolean;
    value: string;
    exp: string;
  }[] = [
    {
      topic: "v-cer0",
      label: "ISO 14064-1:2018",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "v-cer1",
      label: "ISO 9001:2015",
      isChecked: true,
      value: "",
      exp: "2025-10-01",
    },
    {
      topic: "v-cer2",
      label: "ISO 14001:2015",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "v-cer3",
      label: "CBAM Certificate",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "v-cer4",
      label: "IATF 16949:2016",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "v-cer5",
      label: "TIS 18001:1999",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "v-cer6",
      label: "OHSAS 18001:2007",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "v-cer7",
      label: "มรท. 8001-2546",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "v-cer8",
      label: "ISO/IEC 17025:2017",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "v-cer9",
      label: "ฉลากประหยัดไฟ เบอร์ 5",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "v-cer10",
      label: "สัญลักษณ์ FSC",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "v-cer11",
      label: "ฉลากเขียว",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "v-cer12",
      label: "ฉลาก Carbon Reduction",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "v-cer13",
      label: "สัญลักษณ์ Green Industry",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "v-cer14",
      label: "การรับรองอุตสาหกรรมสีเขียว (GI) (ระดับ 3)",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "v-cer-none",
      label: "ไม่มี",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "v-cer-other",
      label: "อื่นๆ",
      isChecked: true,
      value: "ISO Test1:0000",
      exp: "2025-02-04",
    },
    // {
    //   topic: "v-cer-other",
    //   label: "อื่นๆ",
    //   isChecked: false,
    //   value: "",
    //   exp: "",
    // },
  ];

  const benefitsInformation: {
    topic: string;
    label: string;
    isChecked: boolean;
    value: string;
    exp: string;
  }[] = [
    {
      topic: "benefit-boi",
      label: "BOI",
      isChecked: true,
      value: "",
      exp: "2024-03-03",
    },
    {
      topic: "benefit-free-zone",
      label: "Free Zone",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "benefit-none",
      label: "ไม่ได้รับสิทธิประโยชน์ใดๆ",
      isChecked: false,
      value: "",
      exp: "",
    },
    {
      topic: "benefit-other",
      label: "อื่นๆ ",
      isChecked: true,
      value: "Benefit1",
      exp: "2024-09-01",
    },
  ];

  const companyPoliciesInformation: { lable: string; isChecked: boolean }[] = [
    {
      lable: "มีนโยบายการต่อต้านทุจริตคอร์รัปชั่น",
      isChecked: true,
    },
    {
      lable: "มีนโยบายไม่รับแรงงานต่ำกวา 18 ปี",
      isChecked: true,
    },
    {
      lable: "มีนโยบายการประเมินผลกระทบต่อสื่งแวดล้อมต่อตนเอง และชุมชนโดยรอบ",
      isChecked: false,
    },
    {
      lable: "มีนโยบายการเปิดเผยช่องทางให้ติดต่อร้องเรียน",
      isChecked: false,
    },
    {
      lable: "มีนโยบายประเมินความปลอดภัย อาชีวอนามัยและสภาพแวดล้อมในการทำงาน",
      isChecked: false,
    },
    {
      lable: "มีนโยบายสวัสดิการแรงงานตามกฎหมายกำหนด",
      isChecked: true,
    },
  ];

  return (
    <div className="pl-1 text-xs">
      <small className="text-red-500">
        หมายเหตุ : มาตรฐานหรือการรับรองที่ได้รับ จะหมดอายุภายใน 30 วัน
        กรุณาตรวจสอบเอกสารแนบ
      </small>
      {/* //! 4.1 */}
      <h4 className="font-semibold">1. การรับรองที่ได้รับ / Certifications</h4>
      <div className="mb-1 grid grid-cols-2 gap-y-1 pl-1">
        {certificationInformation.length == 0 ? null : (
          <Fragment>
            {certificationInformation.slice(0, -2)?.map((item, i) => (
              <Fragment key={i}>
                <div className="flex items-center gap-x-1">
                  {item?.isChecked ? (
                    <Icons.checkSquare className="h-3 w-3 text-primary" />
                  ) : (
                    <Icons.square className="h-3 w-3" />
                  )}
                  <p className={item?.isChecked ? "text-primary" : ""}>
                    {item?.label}{" "}
                    {item?.isChecked ? (
                      <small className="text-red-500">exp: {item?.exp}</small>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </Fragment>
            ))}

            {/* //! index -2 -> end */}
            {certificationInformation.slice(-2)?.map((item, i) => (
              <Fragment key={i}>
                <div className="col-span-2 flex items-center gap-x-1">
                  {item?.isChecked ? (
                    <Icons.checkSquare className="h-3 w-3 text-primary" />
                  ) : (
                    <Icons.square className="h-3 w-3" />
                  )}
                  <div className="flex w-full items-center gap-x-1">
                    <p className={item?.isChecked ? "text-primary" : ""}>
                      {item?.label}
                    </p>{" "}
                    {!item?.isChecked ? (
                      ""
                    ) : (
                      <small className="whitespace-nowrap text-red-500">
                        exp: {item?.exp}
                      </small>
                    )}
                    {item?.value == "" ? (
                      ""
                    ) : (
                      <p className="ml-2 mr-4 w-full border-b text-primary">
                        {item?.value}
                      </p>
                    )}
                  </div>
                </div>
              </Fragment>
            ))}
          </Fragment>
        )}
      </div>

      {/* //! 4.2 */}
      <h4 className="font-semibold">2. สิทธิประโยชน์ที่ได้รับ / Benefits</h4>
      <div className="mb-1 grid grid-cols-3 gap-y-1 pl-1">
        {benefitsInformation?.length == 0 ? null : (
          <Fragment>
            {benefitsInformation?.slice(0, -1)?.map((item, i) => (
              <Fragment key={i}>
                <div className="flex items-center gap-x-1">
                  {item?.isChecked ? (
                    <Icons.checkSquare className="h-3 w-3 text-primary" />
                  ) : (
                    <Icons.square className="h-3 w-3" />
                  )}
                  <div className="flex items-center gap-x-1">
                    <p className={item?.isChecked ? "text-primary" : ""}>
                      {item?.label}
                    </p>{" "}
                    {item?.isChecked ? (
                      <small className="text-red-500">exp: {item?.exp}</small>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Fragment>
            ))}

            {benefitsInformation?.slice(-1)?.map((item, i) => (
              <Fragment key={i}>
                <div className="col-span-3 flex items-center gap-x-1">
                  {item?.isChecked ? (
                    <Icons.checkSquare className="h-3 w-3 text-primary" />
                  ) : (
                    <Icons.square className="h-3 w-3" />
                  )}
                  <div className="flex w-full items-center gap-x-1">
                    <p className={item?.isChecked ? "text-primary" : ""}>
                      {item?.label}
                    </p>{" "}
                    {!item?.isChecked ? (
                      ""
                    ) : (
                      <small className="whitespace-nowrap text-red-500">
                        exp: {item?.exp}
                      </small>
                    )}
                    {item?.value == "" ? (
                      ""
                    ) : (
                      <p className="ml-2 mr-4 w-full border-b text-primary">
                        {item?.value}
                      </p>
                    )}
                  </div>
                </div>
              </Fragment>
            ))}
          </Fragment>
        )}
      </div>

      {/* //! 4.3 */}
      <h4 className="font-semibold">
        3. เงื่อนไขการขายและรับชำระเงิน / Sales and Payment Terms
      </h4>
      <div className="mb-1 pl-1">
        {/* //! 4.3.1 */}
        <h5>3.1 เครดิตเทอมการจ่ายเงิน {/*/ Customer Credit Term*/}</h5>
        <div className="grid grid-cols-4 items-center pl-1">
          <div className="flex items-center gap-x-1">
            <Icons.circle className="h-3 w-3" />
            <p>เครดิตเทอม</p>
          </div>
          <div className="bg-gray-200 px-1">
            <p></p>
          </div>
          <div />
          <div />

          <div className="flex items-center gap-x-1">
            <Icons.checkCircle className="h-3 w-3 text-primary" />
            <p className="text-primary">อื่นๆ</p>
          </div>
          <div className="border-b px-1 text-primary">
            <p>180 วัน</p>
          </div>
        </div>

        {/* //! 4.3.2 */}
        <h5>3.2 ระเบียบการวางบิล</h5>
        <div className="grid grid-cols-4 items-center pl-1">
          <div className="col-span-4 flex items-center gap-x-1">
            <Icons.circle className="h-3 w-3" />
            <p>โอน</p>
          </div>

          <div className="flex items-center gap-x-1">
            <Icons.checkCircle className="h-3 w-3 text-primary" />
            <p className="text-primary">รับเช็ค</p>
          </div>
          <div className="col-span-3 pr-4">
            <p className="border-b text-primary">
              เซ็นทรัลระยอง, 12.00AM, นายสถาพร ไชยเจริญ
            </p>
          </div>

          <div className="col-span-4 flex items-center gap-x-1">
            <Icons.circle className="h-3 w-3" />
            <p>เงินสด</p>
          </div>
        </div>

        {/* //! 4.3.3 */}
        <div className="grid grid-cols-4 items-center">
          <h5>3.3 สกุลเงิน</h5>
          <div className="border-b pl-1 text-primary">THB</div>
        </div>

        {/* //! 4.3.4 */}
        <div className="grid grid-cols-4 items-center">
          <h5>3.4 Incoterm</h5>
          <div className="border-b pl-1 text-primary">EXW</div>
        </div>

        {/* //! 4.3.5 */}
        <h5>3.5 เงื่อนไขการเปิด L/C</h5>
        <div className="grid grid-cols-4 items-center pl-1">
          <div className="col-span-4 flex items-center gap-x-1">
            <Icons.circle className="h-3 w-3" />
            <p>มี</p>
          </div>
          <div className="col-span-4 flex items-center gap-x-1">
            <Icons.checkCircle className="h-3 w-3 text-primary" />
            <p className="text-primary">ไม่มี</p>
          </div>
        </div>

        {/* //! 4.3.6 */}
        <h5>3.6 เงื่อนไขการขนส่งสินค้า</h5>
        <div className="grid grid-cols-4 items-center pl-1">
          <div className="col-span-2 flex items-center gap-x-1">
            <Icons.checkSquare className="h-3 w-3 text-primary" />
            <p className="text-primary">SNC เป็นผู้ขนส่งสินค้า</p>
          </div>
          <div className="col-span-2 flex items-center gap-x-1">
            <Icons.checkSquare className="h-3 w-3 text-primary" />
            <p className="text-primary">ผู้รับ (Customer) เป็นผู้ขนส่งสินค้า</p>
          </div>
          <div className="col-span-2 flex items-center gap-x-1">
            <Icons.square className="h-3 w-3" />
            <p>ผู้รับ (Customer) จ้างขนส่งภายนอก</p>
          </div>
        </div>

        {/* //! 4.3.7 */}
        <h5>3.7 เงื่อนไขในการวางเงินมัดจำ</h5>
        <div className="grid grid-cols-4 items-center pl-1">
          <div className="flex items-center gap-x-1">
            <Icons.checkCircle className="h-3 w-3 text-primary" />
            <p className="text-primary">มี</p>
          </div>

          <div className="h-full w-[80%] border-b pl-1 text-primary">
            <p>อื่นๆ</p>
          </div>

          <div className="col-span-2 flex items-center gap-x-1 pr-4">
            {/* <div className="flex w-full items-center gap-x-1"> */}
            <p className="ml-1 w-full border-b text-primary">
              วางเงินมัดจำ 20/80 %
            </p>
            {/* </div> */}
          </div>

          <div className="flex items-center gap-x-1">
            <Icons.circle className="h-3 w-3" />
            <p>ไม่มี</p>
          </div>
        </div>

        {/* //! 4.3.8 */}
        <h5>3.8 เงื่อนไขการประกันสินค้า</h5>
        <div className="grid grid-cols-4 items-center pl-1">
          <div className="flex items-center gap-x-1">
            <Icons.checkCircle className="h-3 w-3 text-primary" />
            <p className="text-primary">ต้องการ</p>
          </div>
          <div className="h-full w-[80%] border-b pl-1 text-primary">3 ปี</div>
          <div className="col-span-4 flex items-center gap-x-1">
            <Icons.circle className="h-3 w-3" />
            <p>ไม่ต้องการ</p>
          </div>
        </div>
      </div>

      {/* //! 4.4 */}
      <h4 className="font-semibold">
        4. นโยบายการดำเนินการ / Company Policies
      </h4>
      <div className="mb-1 grid grid-cols-9 items-center gap-x-1 pl-1 pr-4">
        {companyPoliciesInformation?.length == 0
          ? null
          : companyPoliciesInformation?.map((item, i) => (
              <Fragment key={i}>
                <p className="col-span-7 truncate">
                  4.{i + 1} {item?.lable}
                </p>
                <div className="flex items-center gap-x-1">
                  {item?.isChecked ? (
                    <Icons.checkCircle className="h-3 w-3 text-primary" />
                  ) : (
                    <Icons.circle className="h-3 w-3" />
                  )}
                  <p className={item?.isChecked ? "text-primary" : ""}>มี</p>
                </div>
                <div className="flex items-center gap-x-1">
                  {!item?.isChecked ? (
                    <Icons.checkCircle className="h-3 w-3 text-primary" />
                  ) : (
                    <Icons.circle className="h-3 w-3" />
                  )}
                  <p className={!item?.isChecked ? "text-primary" : ""}>
                    ไม่มี
                  </p>
                </div>
              </Fragment>
            ))}
      </div>

      {/* //! 4.5 */}
      <h4 className="font-semibold">
        5. วัตถุประสงค์การซื้อสินค้า / The objective of purchasing
      </h4>
      <div className="mb-1 pl-1">
        <div className="flex items-center gap-x-1">
          <Icons.circle className="h-3 w-3" />
          <p>ซื้อมาขายไป</p>
        </div>
        <div className="flex items-center gap-x-1">
          <Icons.circle className="h-3 w-3" />
          <p>ผลิตงาน</p>
        </div>
        <div className="flex items-center gap-x-1 pr-4 text-primary">
          <Icons.checkCircle className="h-3 w-3" />
          <p>อื่นๆ</p>
          <p className="ml-2 w-full border-b">เพื่อนำมาทดสอบงาน</p>
        </div>
      </div>

      {/* //! 4.6 */}
      <h4 className="font-semibold">
        6. ลูกค้าหลักของลูกค้า / Main customer of customer
      </h4>
      <div className="grid grid-cols-4 items-center pl-1 pr-4">
        <div className="flex items-center gap-x-1">
          <Icons.circle className="h-3 w-3" />
          <p>ลูกค้าในประเทศไทย</p>
        </div>
        <div className="flex items-center gap-x-1 pr-4">
          <Icons.checkCircle className="h-3 w-3 text-primary" />
          <p className="text-primary">ลูกค้าต่างประเทศ</p>
        </div>
        <div className="col-span-2">
          <p className="w-full border-b text-primary">ประเทศจีน</p>
        </div>
      </div>
    </div>
  );
};

export default StandardsCertifications;
