/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */

// Importing axios library
const axios = require('axios');

module.exports = async function countMajorVersionsAbove10() {
  // TODO

  const BASE_URL = 'http://ambush-api.inyourarea.co.uk/ambush/intercept';
  const reqPayload = {
    url: 'https://api.npms.io/v2/search/suggestions?q=react',
    method: 'GET',
    return_payload: true,
  };

  const MIN_REQUIRED_VERSION = 10;

  try {
    // Initializing the count to 0 at first
    let count = 0;
    const response = await axios.post(BASE_URL, reqPayload);

    // Looping through each dependencies
    response.data.content.forEach(dep => {
      // let's say version is "17.0.2"
      // and we can split it by dot, so we'll get an array ["17", "0", "2"]
      // the first element will be major version and maybe in a string type
      // so we can parse that string back to the integer
      // if that major version is greater than our minimum required version
      // we'll increase the count by 1
      // so end of the loop, we'll have our count of the packages
      const majorSemVer = dep.package.version.split('.')[0];
      if (parseInt(majorSemVer, 10) > MIN_REQUIRED_VERSION) {
        count += 1;
      }
    });

    return count;
  } catch (ex) {
    console.log(ex.message);
    return 0;
  }
};
