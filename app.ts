import { createObjectCsvWriter } from "csv-writer";

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
    });
}


generateWriterObj("test.csv").writeRecords([{ Name:"Pritam Biswas" }])

async function main(ids: string[]) {
    const csvWriter = generateWriterObj('output.csv');
    const dataToWrite:any = [];

    for (const id of ids) {
        try {
            const data = await getVideoDetails(id);
            console.log(data, "Data");
            dataToWrite.push(data);
        } catch (error) {
            console.log(error);
        }
    }

    await csvWriter.writeRecords(dataToWrite);
    console.log('CSV file created successfully.');
}

const getVideoDetails = async (x: string) => {
    try {
        const responses = await Promise.all([
            fetch(`https://www.googleapis.com/youtube/v3/search?part=id&channelId=${x}&maxResults=50&key=AIzaSyCncnrqyYKph7rxEAHjET6jnaUMThJYA7M&publishedAfter=2023-09-01T00:00:00Z&publishedBefore=2023-09-30T00:00:00Z&type=video`),
            fetch(`https://www.googleapis.com/youtube/v3/search?part=id&channelId=${x}&maxResults=50&key=AIzaSyCncnrqyYKph7rxEAHjET6jnaUMThJYA7M&publishedAfter=2023-09-01T00:00:00Z&publishedBefore=2023-09-30T00:00:00Z&type=shorts`),
            fetch(`https://www.ensembledata.com/apis/youtube/channel/followers?browseId=${x}&token=A5b99aRPp7KaY2B7`),
            fetch(`https://www.ensembledata.com/apis/youtube/channel/id-to-name?browseId=${x}&token=A5b99aRPp7KaY2B7`)
        ]);

        const [videoList, shortsList, followerList, nameResponse] = await Promise.all(responses.map(res => res.json()));

        let totalVideoviews: number|undefined = await dataFetcher(videoList, shortsList);
        let totalshortsViews: number = 0;
        const name = nameResponse?.data ?? "";
        return {
            Name: name,
            FullName: name,
            Total30DayViews: totalVideoviews,
            shortsVideos: totalshortsViews,
            Followers: followerList?.data,
            GeoLocation: ""
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

const fetchVideoDetails = async (videoId: string) => {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=AIzaSyCncnrqyYKph7rxEAHjET6jnaUMThJYA7M`);
        const responseData = await response.json();
        console.log(responseData, "Response Data");
        return Number(responseData?.items[0]?.statistics?.viewCount);
    } catch (error) {
        console.log(error);
    }
}

const dataFetcher = async (videoList: any, shortsList: any) => {
    try {
        let totalViews = 0;
        for (let i = 0; i < videoList?.items?.length; i++) {
            const val = videoList?.items[i];
            const result = await fetchVideoDetails(val?.id?.videoId);
            if(result){
                 totalViews+=result;
            }
        }
        return totalViews;
    } catch (error) {
        console.log(error);
    }
}

const ids: string[] = [
    "UChZkagt4BuseiFEGXCOAmqQ",
]

main(ids);