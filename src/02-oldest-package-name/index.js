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

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

// Importing axios library
const axios = require('axios');

module.exports = async function oldestPackageName() {
  // TODO

  const BASE_URL = 'http://ambush-api.inyourarea.co.uk/ambush/intercept';
  const reqPayload = {
    url: 'https://api.npms.io/v2/search/suggestions?q=react',
    method: 'GET',
    return_payload: true,
  };

  try {
    const response = await axios.post(BASE_URL, reqPayload);

    const oldest = response.data.content.reduce((prev, cur) =>
      Date.parse(cur.package.date) < Date.parse(prev.package.date) ? cur : prev,
    );

    return oldest.package.name;
  } catch (ex) {
    console.log(ex.message);
    return '';
  }
};
