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

interface ProgramInfo {
    _id: string;
    program: string;
    major: string;
    year: string;
    semester: string;
    courses: CourseInfo[];
}

function formatData(fetchedData: any): ProgramInfo[] {
    const formattedData: ProgramInfo[] = [];

    for (const curriculum of fetchedData.curriculums || []) {
        const programInfo: ProgramInfo = {
            _id: curriculum._id || '',
            program: curriculum.program || '',
            major: curriculum.major || '',
            year: curriculum.year || '',
            semester: curriculum.semester || '',
            courses: []
        };

        for (const course of curriculum.curriculum || []) {
            const courseInfo: CourseInfo = {
                code: course.code || '',
                description: course.description || '',
                units: course.units || '',
                type: course.type || ''
            };

            programInfo.courses.push(courseInfo);
        }

        formattedData.push(programInfo);
    }

    return formattedData;
}

export async function fetchCurriculumData(): Promise<ProgramInfo[] | null> {
    const fetchUrl = 'http://192.168.1.7:3000/Curriculums/get';
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
