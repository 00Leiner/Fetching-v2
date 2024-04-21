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

interface ProgramInfo {
    _id: string;
    program: string;
    major: string;
    year: string;
    semester: string;
    block: string;
}

function formatData(fetchedData: any): ProgramInfo[] {
    const formattedData: ProgramInfo[] = [];

    for (const program_block of fetchedData.students || []) {
        const programInfo: ProgramInfo = {
            _id: program_block._id || '',
            program: program_block.program || '',
            major: program_block.major || '',
            year: program_block.year || '',
            semester: program_block.semester || '',
            block: program_block.block || '',
        };
        
        formattedData.push(programInfo);
    }

    return formattedData;
}

export async function fetchProgramData(): Promise<ProgramInfo[] | null> {
    const fetchUrl = 'http://192.168.1.7:3000/Students/get';
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
