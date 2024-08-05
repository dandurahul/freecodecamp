import axios from "axios";
import httpContext from "express-http-context";
import { constants } from "../../../api/constants/constants.constants";
var uuid = require("uuid");
// const jsonAxios = async (options: any) => {
//   // make sure the JSON header is set
//   if (options != null) {
//     if (options.headers == null) {
//       options.headers = {};
//     }
//     let corid = uuid.v4();
//     // options.headers["Content-Type"] = "application/json";
//     // options.headers["X-Correlation-ID"] = correlationId()
//     //   ? correlationId()
//     //   : corid;
//     // var userName = httpContext.get(constants.USER_NAME);
//     // var requestId = httpContext.get(constants.REQUEST_ID);
//     // options.headers["RequestId"] = requestId ? requestId : "";
//     // options.headers["PermissionCheck"] = constants.ALLOW;
//     // options.headers["userName"] = userName ? userName : "";
//     // options.headers[constants.BUSINESS_UNIT_ID] = httpContext.get(
//     //   constants.BUSINESS_UNIT_ID
//     // );
//   }

//   // fetch the response and handle response status codes and payload
//   return axios(options)
//     .then((response: any) => {
//       console.log({response})
//       if (!response.data.status) {
//         let error = {
//           code: response.data.code,
//           error: response.data.error,
//         };
//         throw Object.assign(error);
//       }
//       return response.data.data? response.data.data: response.data;
//     })
//     .catch((error: any) => {
//       console.log(options)
//       console.log(error);
//       if (error.code && error.error) throw error;
//       else if (error && error.response && error.response.data) {
//         throw error.response.data;
//       } else {
//         let port = error && error.port;
//         let err = {
//           message: "unable to reach service " + port,
//         };
//         throw Object.assign({ code: 503, error: err });
//       }
//     });
// };

const jsonFetch = async (options: any) => {
  if (options != null) {
    if (options.headers == null) {
      options.headers = {};
    }
  }
  // fetch the response and handle response status codes and payload
return await axios(options)
  .then((response: any) => {    
    return response.data;
  })
  .catch((error: any) => {
    if (error.code == constants.ECONNREFUSED) {
      let err = {
        message: "unable to reach service",
      };
      throw Object.assign({ status: false, code: 404, error: err });
    } else {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.status === false
      ) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  });
};

export { jsonFetch };
