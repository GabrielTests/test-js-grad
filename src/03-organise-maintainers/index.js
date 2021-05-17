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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */

// Importing axios library
const axios = require('axios');

module.exports = async function organiseMaintainers() {
  // TODO

  const BASE_URL = 'http://ambush-api.inyourarea.co.uk/ambush/intercept';
  const reqPayload = {
    url: 'https://api.npms.io/v2/search/suggestions?q=react',
    method: 'GET',
    return_payload: true,
  };

  try {
    const response = await axios.post(BASE_URL, reqPayload);

    // Store the required data into the variable "allDeps"
    const allDeps = response.data.content;

    // Store the maintainers for all data packages.
    let allMaintainers = [];

    // Loop through the packages to get maintainer usernames
    allDeps.forEach(dep => {
      allMaintainers.push(...dep.package.maintainers.map(m => m.username));
    });

    // Use Set, to get the unique values
    // This will be passing all names in the maintainer.
    const uniqueMaintainers = [...new Set(allMaintainers)];

    // Sorting the names
    uniqueMaintainers.sort();

    // acc -> accumulator (previous value)
    // cur -> current

    // "acc" will store the "returned values" from the current iterations
    // Initially, "acc" will hold the empty array
    // In each iteration, we'll be pushing the object to the "acc" array, and will return it
    // so end of the first iteration the "acc" array will have one object in it
    // and on end of the second iteration the "acc" array will have two objects and following

    // at the end of all the iterations, reduce method will return an array (because we initialized it to an array)
    // that will store into the "maintainers" variable

    // the objects we'll be pushing will be like {username:"username", "packageNames": ["package-1", "package-2"]}

    // In our case, we're using reduce method in uniqueMaintainers array
    const maintainers = uniqueMaintainers.reduce((acc, cur) => {
      // First we're looping through all the deps, to find which packages have the current maintainers.
      const maintainerDeps = allDeps.filter(dep =>
        dep.package.maintainers.some(m => m.username === cur),
      );

      // We store all the package names in the current maintainer
      const packageNames = [];

      // Looping through the current maintainers' deps, we puch the package name to the packageNames array
      maintainerDeps.forEach(dep => packageNames.push(dep.package.name));

      // Sorting the packageNames which is required
      packageNames.sort();

      // Pushing the object in the required structure
      acc.push({ username: cur, packageNames });

      // return statement here is important... it will be used in the next iteration
      return acc;
    }, []);

    return maintainers;
  } catch (ex) {
    console.log(ex.message);
    return [];
  }
};
