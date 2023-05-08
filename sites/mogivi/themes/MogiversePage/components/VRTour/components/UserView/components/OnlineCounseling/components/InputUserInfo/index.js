// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, makeStyles } from "@material-ui/core";
import styles from "./input-user-info.module.scss";
import TextInputStyled from "components/TextInputStyled";
import Image from "next/image";
import { ChatInfoStorage } from "apis/chat-storage";
import useSetNotification from "hooks/useSetNotification";
import { firebaseCloudMessaging } from "utils/push-notification";
import {
  avatarDefault,
  ConversationGroupCategory,
  ConversationGroupType,
  userType,
} from "shared/const";
import ServerApiServices from "apis/server-api-services";

const InputUserInfo = (props) => {
  const classes = useStyles();

  const {
    agencyInfo,
    handleSaveUserInfo,
    setChatInfo,
    tourId,
    syncUser,
    updateConversationGroup,
  } = props;
  const { Avatar, NickName } = agencyInfo;
  const { addErrorNotification } = useSetNotification();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      userName: "",
      //  userPhoneNumber: "",
    },

    onSubmit: async (values) => {
      //Tam thời ko cần nhập số điện thoại ở web

      // var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      // if (vnf_regex.test(values.userPhoneNumber) == false) {
      //   addErrorNotification('Số điện thoại của bạn không đúng định dạng!');
      //   return;
      // }
      // let userPhonnumber = '8A' + (Math.floor(Math.random() * 99999999) + 10000000);
      let userPhonnumber = "8A" + values.userPhoneNumber;
      handleSaveUserInfo(values);
      const uid = userPhonnumber;
      const params = {
        address: "",
        avatar: avatarDefault,
        display_name: values.userName,
        email: "",
        full_name: values.userName,
        group_name: "",
        group_type:
          agencyInfo.OwnerId !== "00000000-0000-0000-0000-000000000000"
            ? ConversationGroupType.TWO_CUSTOMER_BROKER
            : ConversationGroupType.TWO_CUSTOMER_SUPPORT,
        message: {
          files: [],
          message: `Chào bạn, tôi đang quan tâm tin đăng của bạn từ trang: ${window.location.href} .Bạn có thể tư vấn/cung cấp thêm thông tin chi tiết cho sản phẩm này.`,
        },
        notification_data: {
          PostId: 0,
          GuidId: tourId,
          URL: window.location.href,
        },
        // phone: values.userPhoneNumber,
        phone: userPhonnumber,
        platform: 1,
        project_name: "",
        conversation_group_id: "",
        is_web_client: true,
        receivers: [
          {
            avatar: agencyInfo.Avatar,
            display_name: agencyInfo.NickName,
            email: agencyInfo.Email,
            full_name: agencyInfo.NickName,
            phone: agencyInfo.PhoneNumer,
            type: userType.BROKER,
            uid: agencyInfo.OwnerId,
            uid_redis: "",
          },
        ],
        fcm_token: firebaseCloudMessaging.tokenInLocalStorage(),
        type: userType.CUSTOMER,
        uid,
        uid_redis: "",
        category:
          agencyInfo.OwnerId !== "00000000-0000-0000-0000-000000000000"
            ? ConversationGroupCategory.MOGIVIWEB_CUSTOMER_BROKER_3D
            : ConversationGroupCategory.MOGIVIWEB_CUSTOMER_SUPPORT_3D,
        is_web_client: true,
      };
      const res = await ServerApiServices.postLogin("/api/v1/chatWith", params);
      if (res != null) {
        let newdata = { ...res };
        if (uid) newdata.uid = uid;
        ChatInfoStorage.saveInfo(tourId, JSON.stringify(newdata));
        setChatInfo(res);
        await syncUser(res, 0);
        setTimeout(() => {
          updateConversationGroup(newdata);
        }, 500);
      } else {
        addErrorNotification("Đã có lỗi xảy ra, xin vui lòng thử lại");
      }
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Vui lòng nhập tên của bạn."),
      userPhoneNumber: Yup.string().required(
        "Vui lòng nhập số điện thoại của bạn."
      ),
      userPhoneNumber: Yup.string().matches(
        phoneRegExp,
        "Số điện thoại không hợp lệ"
      ),
    }),
  });

  return (
    <div className={styles.inputUserInfo}>
      <Image
        src={Avatar}
        className={styles.avatar}
        alt=""
        width={50}
        height={50}
        objectFit="cover"
      />

      <h3 className="text-center">{NickName}</h3>
      <h4>Xin chào, chúng tôi có thể giúp gì cho anh chị</h4>
      <h5>Thường phản hồi sau vài phút</h5>

      <TextInputStyled
        value={formik.values.userName}
        name="userName"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorMessage={formik.touched.userName && formik.errors.userName}
        placeholder="Họ và tên"
        className={classes.inputInfo}
      />

      <TextInputStyled
        value={formik.values.userPhoneNumber}
        name="userPhoneNumber"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorMessage={
          formik.touched.userPhoneNumber && formik.errors.userPhoneNumber
        }
        placeholder="Số điện thoại"
        className={classes.inputInfo}
      />

      <Button
        onClick={() => formik.handleSubmit()}
        className={classes.btnChat}
        fullWidth
      >
        Đặt câu hỏi ngay
      </Button>
    </div>
  );
};

InputUserInfo.propTypes = {
  agencyInfo: PropTypes.shape({
    Avatar: PropTypes.any,
    NickName: PropTypes.any,
  }),
  handleSaveUserInfo: PropTypes.func,
  setChatInfo: PropTypes.func,
};

export default InputUserInfo;
