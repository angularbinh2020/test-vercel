interface Breadcrumb {
  url: string;
  name: string;
}

interface Contact {
  avatar: string;
  email: string;
  full_name: string;
  is_new_contact: number;
  phone: string;
  user_id: string;
}

interface Tag {
  text: string;
  iconUrl: string;
}

export interface ApartmentSameLocation {
  mobileTeasersImageUrl: string;
  mobileTeasersImageCaption: string;
  desktopTeasersImageUrl: string;
  desktopTeasersImageCaption: string;
  title: string;
  statusText: string;
  pageURL: string;
  newsIdText: string;
  publishDateText: string;
  tags: Tag[];
  vrTourURL: string;
  contact: Contact;
}

export interface ProjectSameLocation {
  pageURL: string;
  name: string;
  shortDescription: string;
  logo: {
    logoUrl: string;
    description: string;
  };
  statusProcedure: {
    name: string;
  };
  nodeId: any;
  finishedYear: {
    name: any;
  };
  isProjectHasCommissionFromMgv: boolean;
  listOfInfo: {
    icon: string;
    text: string;
  }[];
}

export interface ApartmentSameLocationModel {
  viewAllUrl: string;
  viewAllLabel: string;
  title: string;
  listOfMgvNews: ApartmentSameLocation[];
}
export interface ISubPageData {
  address: string;
  vrTourURL: string;
  breadcrumbLinks: Breadcrumb[];
  contact: Contact;
  imageSliders: string[];
  statusText: string;
  title: string;
  newsIdText: string;
  pageFullURL: string;
  tags: Tag[];
  publishDateText: string;
  areaDescription: string;
  listOfRentalMgvNewsSameLocation: ApartmentSameLocationModel;
  listOfSellMgvNewsSameLocation: ApartmentSameLocationModel;
  listOfProjectsSameLocation: ProjectSameLocation[];
  rootNode: any;
  siteLanguageNode: any;
}
