import axios, { AxiosResponse } from 'axios';

class Fetching {
    url: string;

    constructor(url: string) {
        this.url = url;
    }
    
    async performGetRequest(): Promise<any | null> {
        try {
            const response: AxiosResponse = await axios.get(this.url);
            
            if (response.status === 200) {
                return response.data;
            } else {
                console.error(`Error in GET request. Status code: ${response.status}`);
                console.error(response.data);
                return null;
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }
}

interface RoomInfo {
    _id: string;
    name: string;
    type: string;
}

function formatData(fetchedData: any): RoomInfo[] {
    const formattedData: RoomInfo[] = [];

    for (const room of fetchedData.rooms || []) {
        const programInfo: RoomInfo = {
            _id: room._id || '',
            name: room.name || '',
            type: room.type || ''
        };
        formattedData.push(programInfo);
    }
    return formattedData;
}

export async function fetchRoomData(): Promise<RoomInfo[] | null> {
    const fetchUrl = 'http://192.168.1.7:3000/Rooms/get';
    const fetchingInstance = new Fetching(fetchUrl);
    const fetchedData = await fetchingInstance.performGetRequest();

    if (fetchedData !== null) {
        const formattedData = formatData(fetchedData);
        return formattedData;
    } else {
        console.error('Failed to fetch data.');
        return null;
    }
}
