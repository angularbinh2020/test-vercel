const VR_TOUR_API_URL = {
  UPDATE_MOBILE_PANORAMA_TOUR_SETTING: "v1/mobile-vr360/",
  UPDATE_THETA_PANORAMA_TOUR_SETTING: "v1/theta-vr360/",
};
let apiHost = process.env.NEXT_PUBLIC_VR_TOUR_API_HOST;

if (apiHost && apiHost[apiHost.length - 1] !== "/") {
  apiHost += "/";
}

for (let property in VR_TOUR_API_URL) {
  VR_TOUR_API_URL[property as keyof typeof VR_TOUR_API_URL] =
    apiHost + VR_TOUR_API_URL[property as keyof typeof VR_TOUR_API_URL];
}

export default VR_TOUR_API_URL;
