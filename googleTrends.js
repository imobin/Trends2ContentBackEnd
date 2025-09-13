// import axios from "axios";

// const googleTrends = require("google-trends-api");

// export async function axios.post(request: Request) {
// //   const { msj } = await request.json();

//   return googleTrends
//     .autoComplete({ keyword: 'Valentines Day' })
//     .then(function (results) {
//       console.log(results)
//     })
//     .catch(function (err: any) {
//       console.error(err);
//       return Response.json({ results: "null" });
//     });
// }

const googleTrends = require("google-trends-api");

async function POST(request) {
  try {
    const resultsString = await googleTrends.autoComplete({ keyword: "game"});
    const results = JSON.parse(resultsString);
    // const theresults = JSON.stringify(results)
    console.log(resultsString)
    // return resultsString
    // On success, return a Response with the results and a 200 status
    // return new Response(JSON.stringify(results), {
    //   status: 200,
    //   headers: { 'Content-Type': 'application/json' },
    // });
    
  } catch (err) {
    console.error(err);
    // On error, return a Response with an error message and a 500 status
    return new Response(JSON.stringify({ error: "Failed to fetch trends data." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

POST()
// (async () => {
//   const test = await POST();
//   console.log(test.body);
// })();