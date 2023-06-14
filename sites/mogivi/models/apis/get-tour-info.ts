export interface IGetTourInfoResponse {
  code: number;
  message: string;
  data: {
    id: number;
    gid: string;
    full_name: string;
    phone: string;
    email: "Hang@yopmail.com";
    title: string;
    vr_tour_url_view: string;
    ai_id: any;
    ai_vr_tour_url: any;
    allow_vr_tour: 1 | 2;
  };
}
