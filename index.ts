import { createObjectCsvWriter } from "csv-writer";
import {  DataSchemaParse, Root, VideoDetails } from "./types";
import { parseDate } from "chrono-node";
import { Context, Effect, Ref, pipe } from "effect";
import { CsvWriter } from "csv-writer/src/lib/csv-writer";
import { ObjectMap } from "csv-writer/src/lib/lang/object";

//CSV Generator//
function generateWriterObj(path: string) {
    return createObjectCsvWriter({
        path: path,
        header: [
            { id: 'Name', title: 'Name' },
            { id: 'FullName', title: 'Full name' },
            { id: 'Total30DayViews', title: 'Total 30 Day Views' },
            { id: 'ViewsMinusShorts', title: '30 Day Views minus Shorts (<60s videos)' },
            { id: 'Followers', title: 'Followers' },
            { id: 'GeoLocation', title: 'GeoLocation' },
        ],
    })
}

//Check data within one month
function isWithinOneMonth(dateStr: string): boolean {
    const parsedDate = parseDate(dateStr);
    if (parsedDate) {
        const fourWeeksAgo = new Date();
        fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 31);
        return parsedDate >= fourWeeksAgo;
    }
    return false;
}

//extract number from views
function extractNumberFromViews(inputString: string) {
    const match = inputString.match(/([\d,]+) views/);
    if (match) {
        const numberStringWithCommas = match[1];
        const numberStringWithoutCommas = numberStringWithCommas.replace(/,/g, '');
        const number = parseInt(numberStringWithoutCommas, 10);

        return isNaN(number) ? null : number;
    }
    return null;
}

//Check video length is less than or equal to 60
function isTimeLessThan60Seconds(timeString:string) {
    const regex = /^(\d{1,2})(?::(\d{1,2}))?$/;
    const match = timeString.match(regex);
    if (match) {
      const minutes = match[1] ? parseInt(match[1], 10) : 0;
      const seconds = match[2] ? parseInt(match[2], 10) : parseInt(match[1], 10);
      const totalTimeInSeconds = minutes * 60 + seconds;
      return totalTimeInSeconds <= 60;
    }
    return false;
  }


//Extract Values from JSON///
function extractDataAndGenrateObj(video_details: Root, id_details: { data: string }, follower_details: { data: string }) {
    console.log(`User -- ${video_details.data.user.title}`);
    
    let total_views: number = 0;
    let total_shorts_views: number = 0;
    video_details.data.videos.forEach((x) => {
        // console.log(
        //     x?.richItemRenderer?.content?.videoRenderer?.publishedTimeText,
        //     x?.richItemRenderer?.content?.videoRenderer?.viewCountText,
        //     x?.richItemRenderer?.content?.videoRenderer?.lengthText
        // )
        const published_date = x?.richItemRenderer?.content?.videoRenderer?.publishedTimeText?.simpleText;
        const views = x?.richItemRenderer?.content?.videoRenderer?.viewCountText?.simpleText;
        const length = x?.richItemRenderer?.content?.videoRenderer?.lengthText?.simpleText;
        console.log(`Publish Date : ${published_date} -- Views : ${views} -- Length : ${length}`);
        if (published_date !== undefined || views !== undefined || length !== undefined) {
            if (isWithinOneMonth(published_date)) {
                console.log(`Allowed Publish Date : ${published_date} -- Views : ${views} -- Length : ${length}`);
                total_views += (extractNumberFromViews(views) || 0);
                if(isTimeLessThan60Seconds(length)) {
                      total_shorts_views+=(extractNumberFromViews(views)||0);
                }
            }
        }
    })
    return {
        Name: video_details.data.user.title,
        FullName: id_details.data,
        Total30DayViews: `${total_views}`,
        ViewsMinusShorts: `${total_views - total_shorts_views}`,
        Followers: follower_details.data,
        GeoLocation: ""
    }
}

//Main Function//
async function main(ids: string[]) {
    try{
    ids.forEach(async (id) => {
        const responses: [Response, Response, Response] = await Promise.all([
            fetch(`https://www.ensembledata.com/apis/youtube/channel/videos?browseId=${id}&depth=1&token=A5b99aRPp7KaY2B7`),
            fetch(`https://www.ensembledata.com/apis/youtube/channel/id-to-name?browseId=${id}&token=A5b99aRPp7KaY2B7`),
            fetch(`https://www.ensembledata.com/apis/youtube/channel/followers?browseId=${id}&token=A5b99aRPp7KaY2B7`)
        ])
        const video_details: Root = await responses[0].json();
        const id_details: { data: string } = await responses[1].json();
        const follower_details: { data: string } = await responses[2].json();
        generateWriterObj(`${id}.csv`).writeRecords([extractDataAndGenrateObj(video_details, id_details, follower_details)])
    })
  }catch(error:unknown) {
      console.log(error);
  }
}



const ids: string[] = [
    // "UChCBHudFoBnsF0O1flPXqiQ",
    // "UCI78AdiI6f7VKhqW1i4B3Rw",
    // "UCUw4K8hh4No3ks8wxfqj-uQ",
    // "UCTJLP240qyOLchOPWV27row",
    // "UCJswRv22oiUgmT1FuFeUekw",
    // "UC7wvDM9avjylOCiZ7--b60Q",
    // "UCG9IkxZWMiufFkXT2IE34Qw",
    // "UC78mJyZPMa_OG08KLHjhODw",
    // "UCb0Vz-YNWQEVctt7-U_Yj_A",
    // "UCKliXHOqQFkFK5FbWh8sEIw",
    // "UCP0_k4INXrwPS6HhIyYqsTg",
    // "UCKKf2Tvw0Xqz6RfzTI2dTpQ",
    // "UChUZYCkg0wKnfQz9-xNvtaQ",
    // "UCsDUx3IrrXQI0CbfKMxTCww",
    // "UCJv5T2W-D3K3fYO0prgv5uw",
    // "UCVUBigRuM7Q8gZK5TMVt0Pg",
    // "UCCOo3F56SHHeYRSM97SVpog",
    // "UCJVkkxqSzMZDcLFhULXAIIQ",
    // "UCoWliOvugpnkRXzjHXWiO3w",
    // "UC-SgrUhzMPuSHZMu_EUX1Yw",
    "UChZkagt4BuseiFEGXCOAmqQ",
    "UC0papSSZAJJ32NNIC20FfXA",
    "UCQWEsFHEYXExYewHWySFeWQ",
    "UCwc_RHwAPPaEh-jtwClpVrg",
    "UCKMYdnHrn9DCh3SQpsZWOKA",
    "UCPHXtOVmjvbP9OJihsd7gCg",
    "UCFn2CWhGpkm7Y4D34-h4VSw",
    "UCTkOWqOi-BnsfPdSe4R1u7w",
    "UCOAh7LxxMFBFLeRrKGKhScA",
    "UCExNl6OE9OIyQA7Uzt7mnOw",
    // "UCDzdCE9XbxTbgvuVdhbLtOQ",
    // "UCRa3vKZ7BG0Dcv4t_add-KQ",
    // "UCj0sKQk9qjiIfNH22ZBWpxw",
    // "UCV7nsHpgs0n8Q69eHXCZjLw",
    // "UCoIt1uXpcle1BhRJloc6GRw",
    // "UCECrsbh5uGFxnycSdq9XJ7w",
    // "UCrmmNapCiVvBuCkHNJcAgbQ",
    // "UCo4aEg_lco6-ZQgCMUOd8VA",
    // "UChIrj5Qb5V-TZIRrk0Df-Uw",
    // "UCIPijQrMxrD-2UEdEdmpiHw",
    // "UC6yXu1rGk7_yw-vdj9pqaOA",
    // "UCDHI-EBDPtdr1zhU1G2jHOg",
    // "UCOLxOm2Pi2rmuvQfnKsFGZQ",
    // "UCIIPl-DSCC0prKxGGnJrdGQ",
    // "UCIVVhpcnP9U5J_mlt-pSbQg",
    // "UCwg6_F2hDHYrqbNSGjmar4w",
    // "UCU7uY3wCPh9j39KXzOpqNaw",
    // "UCfRqpIRnbUf5tJZ5R6bKgCw",
    // "UCNqBpQg7xHDVkR_bzXl8gsg",
    // "UCgIGMDYhCqiwls28cygpYqg",
    // "UCvCDo7i9AZk42KW-aOntomg",
    // "UCZ8kRL8S3O-XBdgirSUDiHQ",
    // "UCsHwvaN48GtzoppqMm58Jww",
    // "UC_4MHQy18oruEu_F6GiOQ_Q",
    // "UCl0L4ecl2ipGTVLp0zz8Puw",
    // "UCP0ok1nSEenuz-e_ulNAJjg",
    // "UCmRe_hOfMppsUfoW1_b3Eiw",
    // "UC9N_6QIniNssFFZMva2GdTQ",
    // "UCco82nwl5frKBMJqNkr_iFw",
    // "UCSri6c58uWro3kLTlcuFlVA",
    // "UCQUgJGrTIut299Mo96JQBbA",
    // "UCRl31PWkfF0a3j3hiDRaCGA",
    // "UCf78EtpuUbIDQDc0AQ_pgxA",
    // "UCgkzrMGEbZemPI4hkz0Z9Bw",
    // "UC4JX40jDee_tINbkjycV4Sg",
    // "UCFJFO1qVsGxfF4Avg8P3bow",
    // "UCrA2bqOHwjX1DxgP9CaVJzw",
    // "UC9kG4C3M1ZoG7TKe3L7wPCw",
    // "UCp4cuWZKxR5ZNbcWrP1DozA",
    // "UCYdHjl9aX-8Fwyg0OBOL21g",
    // "UCrYcVA4BjglTciCmEYw7e6Q",
    // "UChNz6iFKpp4P10K6sF8chhg",
    // "UCQtaMXn0e5_iZiJvD0yei2A",
    // "UCGDumBSWK7q6Rpdwz8osbYA",
    // "UC7qUbTJ26pWtqpIMqPpMX2w",
    // "UC47hfsRhwO1GIKe7UzbeoJA",
    // "UCT3cGZ8SeFVY5xwUxBAO0Mg",
    // "UCs3iFCPtX0gzkKxCrobO4ig",
    // "UCK376qNDlNZZDNHsnaWuTeg",
    // "UCLTirYdzU5yMMHNJC714CAA",
    // "UCPtiXdv7RoU8IkrJeNY73qw",
    // "UCpSnnINsuhXB7SZ3BaKWZFA",
    // "UCVNjPml7N3I4m9IpBVkHRpg",
    // "UC2iXohrgKb7Ga-pLRmqh3fw",
    // "UCrViPg5cdGsH8Uk-OLzhQdg",
    // "UCcJQ96WlEhJ0Ve0SLmU310Q",
    // "UCWkWw2-DuuVky7R8zgozhZg",
    // "UCbMt0TXpOmyW1ot65SXjwWQ",
    // "UCvPs3pT83N6EmNLlLrbwwMQ",
    // "UCU6UepGmPHCOv1Wj9JGfAMg"
    
]

const get_data = (id:string)=>pipe(
    Effect.succeed(id),
    Effect.flatMap((x)=>
         Effect.all([
             Effect.tryPromise({
                try:()=>fetch(`https://www.ensembledata.com/apis/youtube/channel/videos?browseId=${x}&depth=1&token=A5b99aRPp7KaY2B7`),
                catch:()=>new Error("Video Data Error")
             }).pipe(
                Effect.flatMap((x)=>
                Effect.tryPromise({
                      try:()=>x.json(),
                      catch:()=>new Error("Parse Error")
                })
             )).pipe(
                Effect.flatMap((x)=>VideoDetails(x))
             ),
             Effect.tryPromise({
                try:()=>fetch(`https://www.ensembledata.com/apis/youtube/channel/id-to-name?browseId=${x}&token=A5b99aRPp7KaY2B7`),
                catch:()=>new Error("Id Error")
             }).pipe(
                Effect.flatMap((x)=>
                Effect.tryPromise({
                      try:()=>x.json(),
                      catch:()=>new Error("Parse Error")
                })
             )).pipe(
                Effect.flatMap((x)=>DataSchemaParse(x))
             ),
             Effect.tryPromise({
                try:()=>fetch(`https://www.ensembledata.com/apis/youtube/channel/followers?browseId=${x}&token=A5b99aRPp7KaY2B7`),
                catch:()=>new Error("Follower Error")
             }).pipe(
                 Effect.flatMap((x)=>
                    Effect.tryPromise({
                          try:()=>x.json(),
                          catch:()=>new Error("Parse Error")
                    }),
                 )
             ).pipe(
                Effect.flatMap((x)=>DataSchemaParse(x))
             )
         ])
    )
)

const generatedCsvWriter = (path:string)=> Effect.succeed(createObjectCsvWriter({
    path: path,
    header: [
        { id: 'Name', title: 'Name' },
        { id: 'FullName', title: 'Full name' },
        { id: 'Total30DayViews', title: 'Total 30 Day Views' },
        { id: 'ViewsMinusShorts', title: '30 Day Views minus Shorts (<60s videos)' },
        { id: 'Followers', title: 'Followers' },
        { id: 'GeoLocation', title: 'GeoLocation' },
    ],
}));

interface GenerateCSVState extends Ref.Ref<CsvWriter<ObjectMap<any>>>{};
const GenerateCSVState = Context.Tag<GenerateCSVState>();


// const mainProgram = pipe(
//     Effect.succeed(ids),
//     Effect.flatMap((x)=>Effect.all(x.map(get_data), { concurrency: 1 })),
//     Effect.flatMap((x)=>
         
//     )
// );

// Effect.runPromise(mainProgram).then(console.log);

await main(ids);





