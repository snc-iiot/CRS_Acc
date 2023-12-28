import { Icons } from "@/components/common/icons";
import { CheckCustomerForeigner } from "@/helpers/common.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { FC, Fragment } from "react";

const StandardsCertifications: FC = () => {
  const { registration } = useAtomStore();
  const {
    standard: { certificate, benefit },
    payment_term,
  } = registration;

  const isForeigner = CheckCustomerForeigner(registration);

  if (!certificate || !benefit || !payment_term)
    return (
      <div>
        <h1 className="text-xl font-semibold">
          ไม่พบข้อมูลมาตรฐานหรือการรับรองที่ได้รับ
        </h1>
      </div>
    );

  return (
    <div className="pl-1 text-xs">
      <small className="text-red-500">
        หมายเหตุ : มาตรฐานหรือการรับรองที่ได้รับ จะหมดอายุภายใน 30 วัน
        กรุณาตรวจสอบเอกสารแนบ
      </small>
      {/* //! 4.1 */}
      <h4 className="font-semibold">1. การรับรองที่ได้รับ / Certifications</h4>
      <div className="mb-1 grid grid-cols-2 gap-y-1 pl-1">
        {certificate.length == 0 ? null : (
          <Fragment>
            {certificate?.map((item, i) => (
              <Fragment key={i}>
                <div className="flex items-center gap-x-1">
                  {item?.is_checked ? (
                    <Icons.checkSquare className="h-3 w-3 text-primary" />
                  ) : (
                    <Icons.square className="h-3 w-3" />
                  )}
                  <p className={item?.is_checked ? "text-primary" : ""}>
                    {item?.cer_name_th}{" "}
                    {item.value !== "" && item.value !== "-"
                      ? `(${item.value}) `
                      : ""}
                    {item?.is_checked && item?.cer_id !== 17 ? (
                      <small className="text-red-500">exp: {item?.exp}</small>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </Fragment>
            ))}
          </Fragment>
        )}
      </div>

      {/* //! 4.2 */}
      <h4 className="font-semibold">2. สิทธิประโยชน์ที่ได้รับ / Benefits</h4>
      <div className="mb-1 grid grid-cols-2 gap-y-1 pl-1">
        {benefit?.length == 0 ? null : (
          <Fragment>
            {benefit?.map((item, i) => (
              <Fragment key={i}>
                <div className="flex items-center gap-x-1">
                  {item?.is_checked ? (
                    <Icons.checkSquare className="h-3 w-3 text-primary" />
                  ) : (
                    <Icons.square className="h-3 w-3" />
                  )}
                  <div className="flex items-center gap-x-1">
                    <p className={item?.is_checked ? "text-primary" : ""}>
                      {item?.cer_name_th}{" "}
                      {item.value !== "" && item.value !== "-"
                        ? `(${item.value}) `
                        : ""}
                    </p>{" "}
                    {item?.is_checked && item?.cer_id !== 4 ? (
                      <small className="text-red-500">exp: {item?.exp}</small>
                    ) : (
                      ""
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
            <Icons.checkCircle className="h-3 w-3 text-primary" />
            <p className={cn("text-primary")}>
              {payment_term?.credit_term?.name === "other"
                ? "อื่นๆ"
                : payment_term?.credit_term?.name === "credit"
                ? "เครดิต"
                : ""}
            </p>
          </div>
          <div className="px-1">
            <p
              className={cn(
                payment_term?.credit_term?.name === "other" &&
                  "border-b text-primary",
              )}
            >
              {payment_term?.credit_term?.value} วัน
            </p>
          </div>
          <div />
          <div />
        </div>

        {/* //! 4.3.2 */}
        <h5>3.2 ระเบียบการวางบิล</h5>
        <div className="grid grid-cols-4 items-center pl-1">
          <div className="col-span-4 flex items-center gap-x-1">
            {payment_term?.billing_term?.name === "transfer" ? (
              <Icons.checkCircle className="h-3 w-3 text-primary" />
            ) : (
              <Icons.circle className="h-3 w-3" />
            )}
            <p
              className={cn(
                payment_term?.billing_term?.name === "transfer" &&
                  "text-primary",
              )}
            >
              โอน
            </p>
          </div>

          <div className="flex items-center gap-x-1">
            {payment_term?.billing_term?.name === "check" ? (
              <Icons.checkCircle className="h-3 w-3 text-primary" />
            ) : (
              <Icons.circle className="h-3 w-3" />
            )}
            <p
              className={cn(
                payment_term?.billing_term?.name === "check" && "text-primary",
              )}
            >
              รับเช็ค
            </p>
          </div>
          <div className="col-span-3 pr-4">
            {payment_term?.billing_term?.name === "check" && (
              <p className="border-b text-primary">
                {payment_term?.billing_term?.value}
              </p>
            )}
          </div>
          <div className="col-span-4 flex items-center gap-x-1">
            {payment_term?.billing_term?.name === "cash" ? (
              <Icons.checkCircle className="h-3 w-3 text-primary" />
            ) : (
              <Icons.circle className="h-3 w-3" />
            )}
            <p
              className={cn(
                payment_term?.billing_term?.name === "cash" && "text-primary",
              )}
            >
              เงินสด
            </p>
          </div>
        </div>

        {/* //! 4.3.3 */}
        <div className="grid grid-cols-4 items-center">
          <h5>3.3 สกุลเงิน</h5>
          <div className="border-b pl-1 text-primary">
            {payment_term?.currency}
          </div>
        </div>

        {/* //! 4.3.4 */}
        <div
          className={cn(
            "grid grid-cols-4 items-center",
            !isForeigner && "opacity-50",
          )}
        >
          <h5>3.4 Incoterm</h5>
          {payment_term?.incoterm !== "" && (
            <div className="border-b pl-1 text-primary">
              {payment_term?.incoterm}
            </div>
          )}
        </div>

        {/* //! 4.3.5 */}
        <h5
          className={cn(
            !isForeigner && "opacity-50",
            payment_term?.lc_term?.is_lc && "text-primary",
          )}
        >
          3.5 เงื่อนไขการเปิด L/C
        </h5>
        {isForeigner && (
          <div className="grid grid-cols-4 items-center pl-1">
            <div
              className={cn(
                "col-span-4 flex items-center gap-x-1",
                !isForeigner && "opacity-50",
              )}
            >
              {payment_term?.lc_term?.is_lc ? (
                <Icons.checkCircle className="h-3 w-3 text-primary" />
              ) : (
                <Icons.circle className="h-3 w-3" />
              )}
              <p className={cn(payment_term?.lc_term?.is_lc && "text-primary")}>
                มี{" "}
                <span className="text-primary">
                  {payment_term?.lc_term?.lc_type}
                </span>
              </p>
            </div>
            <div className="col-span-4 flex items-center gap-x-1">
              {!payment_term?.lc_term?.is_lc ? (
                <Icons.checkCircle className="h-3 w-3 text-primary" />
              ) : (
                <Icons.circle className="h-3 w-3" />
              )}
              <p className="text-primary">ไม่มี</p>
            </div>
          </div>
        )}

        {/* //! 4.3.6 */}
        <h5>3.6 เงื่อนไขการขนส่งสินค้า</h5>
        <div className="grid grid-cols-4 items-center pl-1">
          {payment_term?.delivery_term?.map((item, i) => (
            <Fragment key={i}>
              <div className="col-span-2 flex items-center gap-x-1">
                {item?.is_checked ? (
                  <Icons.checkSquare className="h-3 w-3 text-primary" />
                ) : (
                  <Icons.square className="h-3 w-3" />
                )}
                <p className={item?.is_checked ? "text-primary" : ""}>
                  {item?.cer_name_th}
                </p>
              </div>
            </Fragment>
          ))}
        </div>

        {/* //! 4.3.7 */}
        <h5>3.7 เงื่อนไขในการวางเงินมัดจำ</h5>
        <div className="grid grid-cols-4 items-center pl-1">
          <div className="flex items-center gap-x-1">
            {payment_term?.deposit_term?.is_deposit ? (
              <Icons.checkCircle className="h-3 w-3 text-primary" />
            ) : (
              <Icons.circle className="h-3 w-3" />
            )}
            <p
              className={cn(
                payment_term?.deposit_term?.is_deposit && "text-primary",
              )}
            >
              มี
            </p>
          </div>
          {/* <div className="h-full w-[80%] border-b pl-1 text-primary">
            <p></p>
          </div> */}
          {payment_term?.deposit_term?.is_deposit && (
            <div className="col-span-2 flex items-center gap-x-1 pr-4">
              <p className="ml-1 w-full border-b text-primary">
                {payment_term?.deposit_term?.deposit_type}
              </p>
            </div>
          )}
          <div className="flex items-center gap-x-1">
            {!payment_term?.deposit_term?.is_deposit ? (
              <Icons.checkCircle className="h-3 w-3 text-primary" />
            ) : (
              <Icons.circle className="h-3 w-3" />
            )}
            <p>ไม่มี</p>
          </div>
        </div>

        {/* //! 4.3.8 */}
        <h5>3.8 เงื่อนไขการประกันสินค้า</h5>
        <div className="grid grid-cols-4 items-center pl-1">
          <div className="flex items-center gap-x-1">
            {payment_term?.product_warranty?.is_warranty ? (
              <Icons.checkCircle className="h-3 w-3 text-primary" />
            ) : (
              <Icons.circle className="h-3 w-3" />
            )}
            <p
              className={cn(
                payment_term?.product_warranty?.is_warranty && "text-primary",
              )}
            >
              ต้องการ
            </p>
          </div>
          <div
            className={cn(
              "h-full w-[80%] pl-1 text-primary",
              payment_term?.product_warranty?.is_warranty && "border-b",
            )}
          >
            {payment_term?.product_warranty?.value} ปี
          </div>
          <div className="col-span-4 flex items-center gap-x-1">
            {!payment_term?.product_warranty?.is_warranty ? (
              <Icons.checkCircle className="h-3 w-3 text-primary" />
            ) : (
              <Icons.circle className="h-3 w-3" />
            )}
            <p
              className={cn(
                !payment_term?.product_warranty?.is_warranty && "text-primary",
              )}
            >
              ไม่ต้องการ
            </p>
          </div>
        </div>
      </div>

      {/* //! 4.4 */}
      <h4 className="font-semibold">
        4. นโยบายการดำเนินการ / Company Policies
      </h4>
      <div className="mb-1 grid grid-cols-9 items-center gap-x-1 pl-1 pr-4">
        {payment_term?.company_policy?.length == 0
          ? null
          : payment_term?.company_policy?.map((item, i) => (
              <Fragment key={i}>
                <Fragment>
                  <p className="col-span-7 truncate">
                    4.{i + 1} {item?.cer_name_th}{" "}
                  </p>
                  {item?.is_checked && item?.cer_id === 8 && (
                    <p className="col-span-7 truncate">{item?.value}</p>
                  )}
                </Fragment>
                <div className="flex items-center gap-x-1">
                  {item?.is_checked ? (
                    <Icons.checkCircle className="h-3 w-3 text-primary" />
                  ) : (
                    <Icons.circle className="h-3 w-3" />
                  )}
                  <p className={item?.is_checked ? "text-primary" : ""}>มี</p>
                </div>
                <div className="flex items-center gap-x-1">
                  {!item?.is_checked ? (
                    <Icons.checkCircle className="h-3 w-3 text-primary" />
                  ) : (
                    <Icons.circle className="h-3 w-3" />
                  )}
                  <p className={!item?.is_checked ? "text-primary" : ""}>
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
        {payment_term?.delivery_term?.map((item, i) => (
          <Fragment key={i}>
            <div className="flex items-center gap-x-1">
              {item?.is_checked ? (
                <Icons.checkSquare className="h-3 w-3 text-primary" />
              ) : (
                <Icons.square className="h-3 w-3" />
              )}
              <p className={item?.is_checked ? "text-primary" : ""}>
                {item?.cer_name_th}
              </p>
            </div>
          </Fragment>
        ))}
      </div>

      {/* //! 4.6 */}
      <h4 className="font-semibold">
        6. ลูกค้าหลักของลูกค้า / Main customer of customer
      </h4>
      <div className="grid grid-cols-4 items-center pl-1 pr-4">
        <div className="flex items-center gap-x-1">
          {payment_term?.main_customer?.name === "internal" ? (
            <Icons.checkCircle className="h-3 w-3 text-primary" />
          ) : (
            <Icons.circle className="h-3 w-3" />
          )}
          <p
            className={cn(
              payment_term?.main_customer?.name === "internal" &&
                "text-primary",
            )}
          >
            ลูกค้าในประเทศไทย
          </p>
        </div>
        <div className="flex items-center gap-x-1 pr-4">
          {payment_term?.main_customer?.name === "foreign" ? (
            <Icons.checkCircle className="h-3 w-3 text-primary" />
          ) : (
            <Icons.circle className="h-3 w-3" />
          )}
          <p
            className={cn(
              payment_term?.main_customer?.name === "foreign" && "text-primary",
            )}
          >
            ลูกค้าต่างประเทศ
          </p>
        </div>
        {payment_term?.main_customer?.name === "foreign" && (
          <div className="col-span-2">
            <p className="w-full border-b text-primary">
              {payment_term?.main_customer?.value}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StandardsCertifications;
