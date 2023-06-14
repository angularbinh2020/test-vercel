import classNames from "classnames";
import styles from "./styles.module.scss";
import useBoolean from "sites/mogivi/hooks/useBoolean";
import { useEffect, useRef, useState, useMemo } from "react";
import ReactSelect from "sites/mogivi/components/ReactSelect";
import Chart from "chart.js/auto";
import EmptyImg from "sites/mogivi/assets/images/empty-box.png";
import Image from "next/image";
import RegisterModal from "./components/RegisterModal";
interface Props {
  block: any;
  isMobileApp: boolean;
}

const HTML_ELEMENT_ID = {
  myChart: "myChart",
  legendContainer: "legendContainer",
};

const BannerSurveyPriceText = ({ block, isMobileApp }: Props) => {
  const { itemTitle, subscribesSettingAPI, analysisData } = block.fields;
  const [projects, setProjects] = useState<any[]>([]);
  const [projectSelected, setProjectSelected] = useState<any>();
  const chartContainerElement = useRef<HTMLDivElement>(null);
  const [isShowEmpty, hideEmpty, showEmpty] = useBoolean(false);
  const [isShowModal, closeModal, showModal] = useBoolean(false);
  const chartJsRef = useRef<Chart>();
  const [types] = useState([
    {
      value: 1,
      label: "Thuê",
    },
    {
      value: 2,
      label: "Bán",
    },
  ]);
  const [typeSelected, setTypeSelected] = useState(types[0]);
  const { apiSubscribesSetting } = useMemo(() => {
    return {
      apiSubscribesSetting:
        subscribesSettingAPI[0]?.fields?.apiKeyTag?.node?.fields?.itemTitle ??
        "",
    };
  }, [subscribesSettingAPI]);
  useEffect(() => {
    const isNotSelectedYet = !projectSelected || !typeSelected;
    if (isNotSelectedYet) return;
    chartJsRef.current?.destroy();
    const type = typeSelected.value;
    const projectId = projectSelected.value;
    let lstDate = [];
    const months = [];
    const rows1PN: any[] = [];
    const rows2PN: any[] = [];
    const rows3PN: any[] = [];
    const rows4PN: any[] = [];
    const rows5PN: any[] = [];
    let rowsConfig = [
      {
        data: rows1PN,
        borderColor: "#E22982",
        backgroundColor: "#E22982",
        fill: false,
        label: "1 PN",
        room: 1,
        borderWidth: 2,
        legendLabel: "1 Phòng ngủ",
      },
      {
        data: rows2PN,
        borderColor: "#0878FC",
        backgroundColor: "#0878FC",
        fill: false,
        label: "2 PN",
        room: 2,
        borderWidth: 2,
        legendLabel: "2 Phòng ngủ",
      },
      {
        data: rows3PN,
        borderColor: "#FF4E00",
        backgroundColor: "#FF4E00",
        fill: false,
        label: "3 PN",
        room: 3,
        borderWidth: 2,
        legendLabel: "3 Phòng ngủ",
      },
      {
        data: rows4PN,
        borderColor: "#00A843",
        backgroundColor: "#00A843",
        fill: false,
        label: "4 PN",
        room: 4,
        borderWidth: 2,
        legendLabel: "4 Phòng ngủ",
      },
      {
        data: rows5PN,
        borderColor: "black",
        backgroundColor: "black",
        fill: false,
        label: "5 PN",
        room: 5,
        borderWidth: 2,
        legendLabel: "5 Phòng ngủ",
      },
    ];
    if (projectId) {
      let dataDisplay = analysisData.filter(
        (c: any) => c.projectId == projectId && c.projectType == type
      );
      const cProjectAllPN: any[] = [];
      for (const pn of dataDisplay) {
        let item: any = { ...pn };
        item.mmyy = item.year + "/" + item.month;
        const index: any = `${item.month}/${item.year}/${item.bedroomNumber}`;
        cProjectAllPN[index] = item;
      }
      lstDate = dataDisplay
        .map((item: any) => item.year + "/" + item.month + "/02")
        .filter(
          (value: any, index: any, self: any) => self.indexOf(value) === index
        )
        .sort(
          (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime()
        );
      for (const item_date of lstDate) {
        months.push(
          `${new Date(item_date).getMonth() + 1}/${new Date(
            item_date
          ).getFullYear()}`
        );
      }
      if (months.length > 6) {
        months.splice(0, months.length - 6);
      }
      for (const mm of months) {
        rowsConfig.forEach((row) => {
          const index: any = `${mm}/${row.room}`;
          const price = cProjectAllPN[index]?.priceAvg || 0;
          row.data.push(price);
        });
      }
    }
    rowsConfig = rowsConfig.filter((row) => row.data.find((data) => data));
    const gridConfig = {
      display: true,
      drawBorder: true,
      drawOnChartArea: true,
      drawTicks: true,
      borderDash: [2, 5],
    };
    const isDataEmpty = rowsConfig.length === 0;
    if (isDataEmpty) {
      showEmpty();
      chartContainerElement.current?.classList.add("d-none");
    } else {
      chartContainerElement.current?.classList.remove("d-none");
      hideEmpty();
    }

    chartJsRef.current = new Chart(HTML_ELEMENT_ID.myChart, {
      type: "line",
      data: {
        labels: months,
        datasets: rowsConfig,
      },
      options: {
        scales: {
          y: {
            ticks: {
              callback: function (label: any) {
                return (
                  new Intl.NumberFormat("vi-VN").format(label / 1000000) + "Tr"
                );
              },
            },
            //@ts-ignore
            scaleLabel: {
              display: true,
              labelString: "1M = 1000000",
            },
            grid: gridConfig,
          },
          x: {
            grid: gridConfig,
          },
        },
        events: ["mousemove", "mouseout", "touchmove", "touchend"],
        animation: {
          //@ts-ignore
          radius: {
            duration: 250,
            easing: "linear",
            loop: (context: any) => context.active,
          },
        },
        hover: {
          //@ts-ignore
          animationDuration: 0,
          intersect: false,
        },
        tooltips: {
          intersect: false,
          enabled: true,
          callbacks: {
            label: (tooltipItem: any, data: any) => {
              let strAmount =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              strAmount =
                Intl.NumberFormat("vi-VN").format(
                  Math.round(strAmount / 100000) * 100000
                ) + " VND";
              return (
                data.datasets[tooltipItem.datasetIndex].label + ": " + strAmount
              );
            },
          },
        },
        plugins: {
          legend: { display: false },
        },
      },
    });
    const renderLegend = (rowsConfig: any) => {
      const legendContainer = document.createElement("div");
      legendContainer.setAttribute(
        "style",
        `display: flex;
   flex-wrap: wrap;
   max-width: 90%;
   margin-left: auto;`
      );
      rowsConfig.forEach((legend: any) => {
        const legendNode = document.createElement("div");
        legendNode.setAttribute(
          "style",
          `display: flex;
    align-items: center;
    width: 50%;`
        );
        legendNode.innerHTML = `<div style="width: 56px;height: 24px;position: relative;display: flex;align-items: center;margin-right: 14px;">
  <div style="
    height: 2px;
    background-color: ${legend.borderColor};
    width: 100%;
  "></div>
  <div style="
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: ${legend.borderColor};
    border-radius: 50%;
    top: 9px;
    left: 0;
  "></div>
  <div style="
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: ${legend.borderColor};
    border-radius: 50%;
    top: 9px;
    right: 0;
  "></div>
  </div><span style="
  font-size: 13px;
  line-height: 24px;
">${legend.legendLabel}</span>`;
        legendContainer.appendChild(legendNode);
      });
      const legendContainerElement = document.getElementById(
        HTML_ELEMENT_ID.legendContainer
      );
      if (legendContainerElement) {
        legendContainerElement.innerHTML = "";
        legendContainerElement.append(legendContainer);
      }
    };
    renderLegend(rowsConfig);
  }, [projectSelected, typeSelected]);

  useEffect(() => {
    const initProjects: any[] = [];
    analysisData?.forEach((item: any) => {
      const isNotExist = !initProjects.find(
        (project) => project.value == item.projectId
      );
      if (isNotExist) {
        initProjects.push({
          value: item.projectId,
          label: item.projectName,
        });
      }
    });
    if (initProjects?.length) {
      setProjectSelected(initProjects[0]);
    }
    setProjects(initProjects);
  }, []);

  return (
    <>
      <div className="container mt-4">
        {!isMobileApp && <h3>{itemTitle}</h3>}
      </div>
      <div className="px-2 px-sm-0 d-flex justify-content-center">
        <div
          className={classNames(
            "p-3 p-sm-3 p-md-4 container p-lg-5 bg-white card my-4 mx-sm-4",
            styles.container
          )}
        >
          <div className="row">
            <div className="col-12 col-sm-12 col-md-9 col-lg-9 m-b-sm m-t-sm select-custom mt-3">
              <ReactSelect
                placeholder="Chọn dự án"
                value={projectSelected}
                options={projects}
                onChange={(option: any) => setProjectSelected(option)}
              />
            </div>
            <div className="col-xs-12 col-md-3 p-l-n md-my-125 select-custom mt-3">
              <ReactSelect
                value={typeSelected}
                options={types}
                onChange={(option: any) => setTypeSelected(option)}
              />
            </div>
            {isShowEmpty && (
              <div className="text-center">
                <Image
                  src={EmptyImg}
                  alt="empty"
                  className={classNames("my-4", styles.emptyImg)}
                />
                <p className={styles.importantNote}>
                  Dự án không có hoặc ít thông tin rao bán/cho thuê trên thị
                  trường
                </p>
              </div>
            )}
            <div className="col-12 m-b-sm" ref={chartContainerElement}>
              <canvas
                id={HTML_ELEMENT_ID.myChart}
                className={styles.canvas}
              ></canvas>
              <div id={HTML_ELEMENT_ID.legendContainer}></div>
              <p className={styles.importantNote}>
                (*) Giá thuê có thể chênh lệch lớn do nội thất
              </p>
              <p className={styles.importantNote}>
                (*) Không tìm thấy dự án bạn đang quan tâm ? Đăng kí ngay để
                nhận khảo sát giá thuê/bán căn hộ dự án{" "}
                <span onClick={showModal}>Tại đây</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {isShowModal && (
        <RegisterModal
          apiSubscribesSetting={apiSubscribesSetting}
          handleClose={closeModal}
        />
      )}
    </>
  );
};

export default BannerSurveyPriceText;
