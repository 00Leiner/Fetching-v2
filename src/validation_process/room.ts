import { fetchCurriculumData } from './getData/curriculum_data';
import { fetchProgramData } from './getData/program_blocks_data';
import { fetchRoomData } from './getData/room_data';

async function roomValidation() {
    const CurriculumData = await fetchCurriculumData();
    const ProgramData = await fetchProgramData();
    const RoomData = await fetchRoomData();

    let laboratory = 0;
    let lecture = 0;
    let labroom_availability = 0;
    let lecroom_availability = 0;

    ProgramData?.forEach((program) => {
        CurriculumData?.forEach((curriculum) => {
            if (program.program == curriculum.program && 
                program.major == curriculum.major && 
                program.year == curriculum.year && 
                program.semester == curriculum.semester) {
                    
                    curriculum.courses?.forEach((course) => {
                        if (course.type == 'Laboratory') {
                            laboratory += 5;
                        } else {
                            lecture += 3;
                        }
                    });
            }
        });
    });

    RoomData?.forEach((room) => {
        if (room.type == 'Laboratory') {
            labroom_availability += 6 * 12; // 6 hours a week and 12 hours a day
        } else {
            lecroom_availability += 6 * 12;
        }
    });

    return laboratory > labroom_availability && lecture > lecroom_availability;
}
