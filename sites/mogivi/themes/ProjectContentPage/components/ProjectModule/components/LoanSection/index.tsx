import classNames from "classnames";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Accordion, Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.scss";

import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { I18nLoan } from "sites/mogivi/models/I18nLoan";
import { IETFormFieldItem } from "models/IETFormFieldItem";
import { IETTab } from "sites/mogivi/models/IETTab";
import { submitLoan } from "apis/client";
import { useForm } from "react-hook-form";
import { MOGIVI_CONTENT_TYPE } from "sites/mogivi/const/content-type";
import { useGetPageDataContext } from "context/page-data.context";

type FormType = Models.LoanModel & {};

let loanModel: Models.LoanModel = {
  currentPageId: 0,
  email: "",
  fullname: "",
  tel: "",
  request: "",
};

interface LoanSectionProps {
  tab: IETTab;
}

const LoanSection = (props: LoanSectionProps) => {
  const tab = props.tab.fields;
  const loanItems = tab.blocksInTab[0] || [];
  const loanToolOption = loanItems.fields.loanToolOption.node.fields;
  const { maximum: realEstatePriceMax, minimum: realEstatePriceMin } =
    loanToolOption.realEstateValue;
  const { maximum: maxYearInterestRate, minimum: minYearInterestRate } =
    loanToolOption.yearInterestRate;

  const { loanTermYears, lowestLoan: minLoan } = loanToolOption;
  const [isRendered, setRendered] = useState(false);
  const selectGroupField = loanToolOption.submitRequestForm[0].fields.fields;
  const fullNameField = selectGroupField[4];
  const phoneNumberField = selectGroupField[5];
  const emailField = selectGroupField[6];
  const { selectFieldList } = useMemo(() => {
    const selectFieldList: Array<IETFormFieldItem> = [];
    for (let i = 0; i < 4; i++) {
      selectFieldList.push(selectGroupField[i]);
    }
    return { selectFieldList };
  }, []);
  const [maxLoan, setMaxLoan] = useState(
    Math.ceil((0.7 * (realEstatePriceMin + realEstatePriceMax)) / 2)
  );
  const [realEstateValue, setRealEstateValue] = useState<number>(
    (realEstatePriceMin + realEstatePriceMax) / 2
  );
  const [loanValue, setLoanValue] = useState<number>((minLoan + maxLoan) / 2);
  const [loanValueThumb, setLoanValueThumb] = useState<number>(loanValue);
  const [realYearRate, setRealYearRate] = useState<number>(
    (minYearInterestRate + maxYearInterestRate) / 2
  );
  const [loanTime, setLoanTime] = useState<number>(Number(loanTermYears[0]));
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const totalPayRef = useRef(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);

  const pageData = useGetPageDataContext();
  let receiveLoanSpreadsheets;
  pageData?.currentNode.fields.blocks.forEach((block: any) => {
    const contentType = block.system.contentType;
    if (contentType === MOGIVI_CONTENT_TYPE.breadcrumbsProjectPageBlock) {
      receiveLoanSpreadsheets =
        block.fields.subcribeAPI.receiveLoanSpreadsheets;
    }
  });
  const siteId = pageData?.siteId ?? 0;
  const [age, setAge] = useState(
    selectFieldList.find((item) => item.fields.elementName === "yourAgeSelect")
      ?.fields.values[0].fields.value || ""
  );
  const [job, setJob] = useState(
    selectFieldList.find((item) => item.fields.elementName === "yourJobSelect")
      ?.fields.values[0].fields.value || ""
  );
  const [income, setIncome] = useState(
    selectFieldList.find(
      (item) => item.fields.elementName === "totalEarnSelect"
    )?.fields.values[0].fields.value || ""
  );
  const [earnType, setEarnType] = useState(
    selectFieldList.find((item) => item.fields.elementName === "getSalaryBy")
      ?.fields.values[0].fields.value || ""
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backdrop, setBackdrop] = useState(true);

  const onSelectChange = (type: string, value: string) => {
    if (type === "yourAgeSelect") setAge(value);
    if (type === "yourJobSelect") setJob(value);
    if (type === "totalEarnSelect") setIncome(value);
    if (type === "getSalaryBy") setEarnType(value);
  };

  const onTextChange = (type: string, value: string) => {
    if (type === "name") setName(value);
    if (type === "phone") setPhone(value);
    if (type === "email") setEmail(value);
  };

  const reset = () => {
    setName("");
    setPhone("");
    setEmail("");
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
  const onSubmit = async (data: FormType) => {
    setIsLoading(true);
    setBackdrop(false);
    data.currentPageId = siteId;
    data.fullname = name;
    data.email = email;
    data.tel = phone;
    data.request = `Tuổi: ${age};Công việc hiện tại: ${job};Tổng thu nhập: ${income};Nhận lương qua: ${earnType}`;
    try {
      const submission = await submitLoan(data);
      if (submission) {
        handleClose();
        handleShowSuccess();
        reset();
      }
    } catch (error) {
      //
    }
    setIsLoading(false);
    setBackdrop(true);
  };

  const readNumber = (numberValue: number) => {
    let numberVal = numberValue || "",
      subVal = I18nLoan.COPPER;

    if (numberValue > 999999999) {
      numberVal = (numberValue / 1e9).toFixed(1);
      // @ts-ignore
      subVal = I18nLoan.BILLION;
    } else {
      numberVal = (numberValue / 1e6).toFixed(1);
      // @ts-ignore
      subVal = I18nLoan.MILLION;
    }
    return {
      numberVal: numberVal,
      subVal: subVal,
      fullString: `${numberVal} ${subVal}`,
    };
  };

  const getRealEstatePriceByPercent = (percent: number) => {
    return (
      percent * (realEstatePriceMax - realEstatePriceMin) + realEstatePriceMin
    );
  };
  const getRealEstatePricePercentByPrice = (price: number) => {
    return Math.ceil(
      ((price - realEstatePriceMin) /
        (realEstatePriceMax - realEstatePriceMin)) *
        100
    );
  };
  const getLoanAmountByPercent = (percent: number, realEstatePrice: number) => {
    const loanMax = Math.ceil(0.7 * realEstatePrice);
    return percent * (loanMax - 1e8) + 1e8;
  };
  const getLoanAmountPercentByPrice = (
    price: number,
    realEstatePrice: number
  ) => {
    const loanMax = Math.ceil(0.7 * realEstatePrice);
    return Math.ceil(((price - 1e8) / (loanMax - 1e8)) * 100);
  };

  const realEstatePricePercent =
    getRealEstatePricePercentByPrice(realEstateValue);
  const realEstatePrice = getRealEstatePriceByPercent(
    realEstatePricePercent / 100
  );
  const loanValuePercent = getLoanAmountPercentByPrice(
    loanValue,
    realEstatePrice
  );
  const loanAmount = getLoanAmountByPercent(
    loanValuePercent / 100,
    realEstatePrice
  );
  const mustPayFirstAmount = realEstatePrice - loanAmount;
  const interestPayAmount = Math.ceil(
    (realYearRate / 100) * loanAmount * loanTime
  );
  const payPerMonthAmount = Math.ceil(
    ((realYearRate / 100) * loanAmount) / 12 + loanAmount / (12 * loanTime)
  );
  totalPayRef.current = mustPayFirstAmount + loanAmount + interestPayAmount;
  const doughnutChartRender = useCallback(() => {
    const drawInnerText = (chart: any) => {
      var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;

      ctx.restore();
      let fontSize = (height / 160).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "top";
      var text = readNumber(totalPayRef.current).fullString,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();
    };
    const plugins = [
      {
        beforeDraw: (chart: any) => {
          drawInnerText(chart);
        },
      },
    ];

    const data = [mustPayFirstAmount, loanAmount, interestPayAmount];
    const chartData = {
      labels: ["Cần trả trước", "Gốc cần trả", "Lãi cần trả"],
      datasets: [
        {
          label: "My First Dataset",
          data: data,
          backgroundColor: ["#ff4e00", "#155aa9", "#00adbb"],
          hoverOffset: 4,
          text: "",
        },
      ],
    };
    return (
      <>
        {/* @ts-ignore */}
        <Doughnut height={426} width={426} data={chartData} plugins={plugins} />
      </>
    );
  }, [realEstateValue, loanValue, realYearRate, loanTime]);

  useEffect(() => {
    setRendered(true);
  }, []);

  const [activeKey, setActiveKey] = useState("");
  const handleOnClick = (e: any) => {
    if (activeKey) setActiveKey("");
    else setActiveKey("0");
  };

  return (
    <>
      <div className="col-12 col-lg-8" id={tab.anchorID}>
        <Accordion activeKey={activeKey}>
          <Accordion.Item eventKey="0">
            <Accordion.Header
              onClick={handleOnClick}
              data-tab-opened={activeKey ? "true" : "false"}
            >
              <h2 className={styles.sectionTitle}>
                {loanItems.fields?.itemTitle}{" "}
                <span className={styles.placeViral}>
                  {loanItems.fields?.subtitle}
                </span>
              </h2>
            </Accordion.Header>
            <Accordion.Body>
              <div data-tab-anchor-id={tab.anchorID}>
                <div className={styles.loanContent}>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h5 className="font-18-20 mb-3">Tính toán trả góp</h5>
                      <div className="row">
                        <div className="col-6 col-md-12">
                          <label>Giá trị bất động sản</label>
                        </div>
                        <div className="col-6 text-end d-md-none">
                          <span className="fw-bold">
                            {readNumber(realEstateValue).fullString}
                          </span>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-12 col-md-8 py-1">
                          <input
                            type="range"
                            className={classNames(
                              "form-control-range",
                              styles.mogiviSlider
                            )}
                            id="realEstatePrice"
                            value={realEstateValue || 0}
                            min={realEstatePriceMin}
                            max={realEstatePriceMax}
                            step={10 * Math.pow(10, 6)}
                            onChange={(e: any) => {
                              setRealEstateValue(Number(e.target.value));
                              setMaxLoan(
                                Math.ceil(0.7 * Number(e.target.value))
                              );
                            }}
                            style={{
                              backgroundSize: `${Math.round(
                                (100 * (realEstateValue - realEstatePriceMin)) /
                                  (realEstatePriceMax - realEstatePriceMin)
                              )}% 100%`,
                            }}
                          />
                        </div>
                        <div className="col-12 col-md-4 text-center text-danger d-none d-md-block">
                          <span className="fw-bold">
                            {readNumber(realEstateValue).fullString}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 col-md-12">
                          <label htmlFor="loanAmount">Khoản vay</label>
                        </div>
                        <div className="col-6 text-end d-md-none">
                          <span className="fw-bold">
                            {readNumber(loanValue).fullString}
                          </span>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-12 col-md-8 py-1">
                          <input
                            type="range"
                            onChange={(e: any) =>
                              setLoanValue(Number(e.target.value))
                            }
                            className={classNames(
                              "form-control-range",
                              styles.mogiviSlider
                            )}
                            id="loanAmount"
                            min={minLoan}
                            max={maxLoan}
                            step={0.1}
                            style={{
                              backgroundSize: `${Math.round(
                                (100 * (loanValue - minLoan)) /
                                  (maxLoan - minLoan)
                              )}% 100%`,
                            }}
                          />
                        </div>
                        <div className="col-12 col-md-4 text-center  text-danger d-none d-md-block">
                          <span className="fw-bold">
                            {readNumber(loanValue).fullString}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 col-md-12">
                          <label htmlFor="interestRatePerYearInput">
                            Lãi suất 1 năm (%)
                          </label>
                        </div>
                        <div className="col-6 text-end d-md-none">
                          <span className="fw-bold">{realYearRate} </span>%
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-12 col-md-8 py-1">
                          <input
                            type="range"
                            className={classNames(
                              "form-control-range",
                              styles.mogiviSlider
                            )}
                            onChange={(e: any) =>
                              setRealYearRate(Number(e.target.value))
                            }
                            id="interestRatePerYearInput"
                            min={minYearInterestRate}
                            max={maxYearInterestRate}
                            step={0.1}
                            style={{
                              backgroundSize: `${Math.round(
                                (100 * (realYearRate - minYearInterestRate)) /
                                  (maxYearInterestRate - minYearInterestRate)
                              )}% 100%`,
                            }}
                          />
                        </div>
                        <div className="col-12 col-md-4 text-center text-danger d-none d-md-block">
                          <span className="fw-bold">{realYearRate} </span>%
                        </div>
                      </div>
                      <label htmlFor="loanTime">Thời hạn vay (Năm)</label>
                      <div className="input-group mb-3">
                        <select
                          className="form-control"
                          id="loanTime"
                          onChange={(e: any) =>
                            setLoanTime(Number(e.target.value))
                          }
                          style={{ WebkitAppearance: "listbox" }}
                        >
                          {loanTermYears.map((item, idx) => (
                            <option key={idx} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="info-detail mb-4"></div>
                    </div>
                    <div className="col-12 col-md-6">
                      <h5 className="font-18-20">Kết quả</h5>

                      <div id="loanChart" className="my-4">
                        {doughnutChartRender()}
                      </div>

                      {isRendered && (
                        <>
                          <div className="d-flex justify-content-between align-items-center info-detail">
                            <span>Cần trả trước:</span>
                            <h6
                              id="mustPayFirst"
                              className={classNames(
                                "mb-0 fw-bold",
                                styles.colorInternalOrange
                              )}
                            >
                              {mustPayFirstAmount.toLocaleString()}
                            </h6>
                          </div>

                          <div className="d-flex justify-content-between align-items-center info-detail">
                            <span>Gốc cần trả:</span>
                            <h6
                              id="rootPay"
                              className={classNames(
                                "fw-bold mb-0",
                                styles.colorDenim
                              )}
                            >
                              {loanAmount.toLocaleString()}
                            </h6>
                          </div>

                          <div className="d-flex justify-content-between align-items-center info-detail">
                            <span>Lãi cần trả:</span>
                            <h6
                              id="interestPay"
                              className={classNames(
                                "fw-bold mb-0",
                                styles.colorPacificBlue
                              )}
                            >
                              {interestPayAmount.toLocaleString()}
                            </h6>
                          </div>

                          <div className="d-flex justify-content-between align-items-center info-detail">
                            <span>Thanh toán hàng tháng:</span>
                            <h6 id="payPerMonth" className="mb-0 fw-bold">
                              {readNumber(payPerMonthAmount).fullString}
                            </h6>
                          </div>
                        </>
                      )}

                      {receiveLoanSpreadsheets && (
                        <button
                          className={classNames(
                            "btn w-100 mt-5 mogivi-btn",
                            styles.btnSubscribe
                          )}
                          type="button"
                          onClick={handleShow}
                        >
                          Đăng ký vay
                        </button>
                      )}

                      <button
                        type="button"
                        className="d-none"
                        data-toggle="modal"
                        data-target="#loanRegisterSuccessModal"
                      >
                        Thông báo đã tiếp nhận yêu cầu vay vốn
                      </button>

                      <div
                        className="modal fade"
                        id="loanRegisterSuccessModal"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Đăng ký tư vấn thành công
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">×</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              Đăng ký tư vấn thành công. Mogivi sẽ liên hệ với
                              quý khách sớm nhất có thể
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Đóng
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="col-0 col-lg-4"></div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop={backdrop ? true : "static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Khả năng vay vốn</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="row">
              {selectFieldList.map((formItem, formItemIdx) => {
                return (
                  <div key={formItemIdx} className="col-6 mb-2">
                    <div className="form-group">
                      <label
                        className="mb-2"
                        htmlFor={formItem.fields.elementName}
                      >
                        {formItem.fields.label}
                      </label>
                      <select
                        style={{ maxWidth: 220 }}
                        className="form-control"
                        id={formItem.fields.elementName}
                        onChange={(e: any) =>
                          onSelectChange(
                            formItem.fields.elementName,
                            e.target.value
                          )
                        }
                      >
                        {formItem.fields.values.map((item, idx) => {
                          return (
                            <option key={idx} value={item.fields.key}>
                              {item.fields.value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                );
              })}

              <div className="col-12 mt-3">
                <input type="hidden" name="ClientId" id="clientUserId" />
                <div className="form-group mb-3">
                  <label className="mb-2 mt-2">Thông tin cá nhân</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={fullNameField.fields.placeholder}
                    onChange={(e) => onTextChange("name", e.target.value)}
                    value={name}
                    required
                    id="userNameInput"
                  />
                </div>

                <div className="form-group mb-3">
                  <input
                    type="tel"
                    pattern="(84|0[1|2|3|5|7|8|9])+([0-9]{8})\b"
                    className="form-control"
                    placeholder={phoneNumberField.fields.placeholder}
                    onChange={(e) => onTextChange("phone", e.target.value)}
                    value={phone}
                    required
                    id="userPhoneInput"
                  />
                </div>

                <div className="form-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder={emailField.fields.placeholder}
                    onChange={(e) => onTextChange("email", e.target.value)}
                    value={email}
                    required
                    id="userEmailInput"
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {!isLoading && (
              <Button type="submit" className={styles.btnSubscribe}>
                Đăng ký vay
              </Button>
            )}
            {isLoading && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={showSuccess} onHide={handleCloseSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>Đã gửi thành công!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {" "}
            Cảm ơn bạn đã Mogivi, chúng tôi sẽ liên lạc ngay trong thời gian sớm
            nhất. Mọi thắc mắc xin vui lòng liên hệ{" "}
            <a href="tel:1800 646 427">1800 646 427</a>
          </p>
        </Modal.Body>
        <Button
          type="submit"
          className={styles.btnClose}
          onClick={handleCloseSuccess}
        >
          Đóng
        </Button>
      </Modal>
    </>
  );
};

export default memo(LoanSection);
