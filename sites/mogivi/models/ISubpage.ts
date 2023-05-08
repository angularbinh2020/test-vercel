export interface ISubPageData {
  address: string;
  vrTourUrl: string;
  totalView: number;
  totalChat: number;
  chatContact: {
    ownerId: string;
    nickName: string;
    phoneNumer: string;
    email: string;
    avatar: string;
  };
  images: string;
  files: [
    {
      src: string;
      name: string;
    }
  ];
  breadscrumb: {
    links: [
      {
        title: string;
        url: string;
      }
    ];
    searchAllApartmentsRentUrl: string;
    searchAllApartmentsSellUrl: string;
  };
  id: number;
  idText: string;
  projectId: number;
  projectName: string;
  title: string;
  body: string;
  bedRoomNo: number;
  bedRoomNoText: string;
  bathRoonNo: number;
  bathRoonNoText: string | null;
  area: string;
  priceText: string;
  heroImageUrl: string;
  directionText: string;
  type: number;
  typeText: string;
  publishedDate: string;
  currentStatus: number;
  publishedDateText: string;
  dotStatusColor: string;
  backgroudColor: string;
  textStatus: string;
  publishUrl: string;
  isShowVRIcon: boolean;
  tourContent: string;
}
