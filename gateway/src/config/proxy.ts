
export const proxyOptions = {
  proxyReqOptDecorator: (proxyReq, expressReq) => {
    const userData = expressReq["userData"];
    console.log("Gateway userData",userData);
    if(userData) {
      proxyReq.headers["x-user-id"] = userData.id;
    }
    return proxyReq;
  }
}