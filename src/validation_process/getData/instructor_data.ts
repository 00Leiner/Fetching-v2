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

interface CourseInfo {
    code: string;
    description: string;
    units: string;
    type: string;
}

interface InstructorInfo {
    _id: string;
    fname: string;
    sname: string;
    specialized: CourseInfo[];
}

function formatData(fetchedData: any): InstructorInfo[] {
    const formattedData: InstructorInfo[] = [];

    for (const instructor of fetchedData.teachers || []) {
        const programInfo: InstructorInfo = {
            _id: instructor._id || '',
            fname: instructor.program || '',
            sname: instructor.major || '',
            specialized: []
        };

        for (const course of instructor.specialized || []) {
            const courseInfo: CourseInfo = {
                code: course.code || '',
                description: course.description || '',
                units: course.units || '',
                type: course.type || ''
            };

            programInfo.specialized.push(courseInfo);
        }

        formattedData.push(programInfo);
    }

    return formattedData;
}

export async function fetchInstructorData(): Promise<InstructorInfo[] | null> {
    const fetchUrl = 'http://192.168.1.7:3000/Teachers/get';
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
