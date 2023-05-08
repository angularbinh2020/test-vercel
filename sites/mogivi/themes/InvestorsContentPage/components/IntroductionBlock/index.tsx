import API_URL from "const/api-url";
import { useGetPageDataContext } from "context/page-data.context";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BannerContactForm } from "sites/mogivi/layout/components/Banner/BannerContactForm";
import { CarouselItem } from "sites/mogivi/layout/components/CarouselItem";
import { ProjectModel } from "sites/mogivi/models/apis";
import { IIntroductionIInvestorBlock } from "sites/mogivi/models/blocks/IIntroductionIInvestorBlock";
import {
  onGetInvestor,
  onGetTopInvestor,
} from "sites/mogivi/redux/investor.slice";
import { RootState } from "store";
import { GalleryImageBlock } from "../GalleryImageBlock";
import { InvestorHeaderBlock } from "../InvestorHeaderBlock";
import { RichTextBlock } from "../RichTextBlock";

interface IntroductionBlockProps {
  block: IIntroductionIInvestorBlock;
}

let projectModel: ProjectModel = {
  page: 1,
  limit: 10,
  keyword: "",
  siteId: "2013",
};

export const IntroductionBlock = (props: IntroductionBlockProps) => {
  const { investor } = useSelector((state: RootState) => state.investor);
  const pageData = useGetPageDataContext();
  const { block } = props;
  const invetorName = block.fields.itemTitle;
  const keyword = pageData?.currentNode.system.urlSegment ?? "";
  const dispatch = useDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const quantity = 10;

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    dispatch(
      onGetInvestor(
        { ...projectModel, keyword: keyword },
        API_URL.SITE_PROJECT_SEARCH_RESULT
      ) as any
    );
    dispatch(onGetTopInvestor(quantity) as any);
  }, [dispatch]);

  useEffect(() => {
    scrollToTop();
  }, [router]);

  return (
    <>
      <InvestorHeaderBlock
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        {...props}
      />
      <RichTextBlock {...block} />
      <GalleryImageBlock items={investor} />
      <BannerContactForm handleShow={handleShow} investorName={invetorName} />
      <CarouselItem />
    </>
  );
};
