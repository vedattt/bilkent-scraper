import { Dayjs } from "dayjs";
import { SemesterType } from "../offerings";

export interface SRS2FACode {
  /**
   * Verification code
   */
  code: string;
  /**
   * Reference code
   */
  ref: string;
}

export interface SRSLoginRequest {
  /**
   * The initial session cookie, to be used to finalize authentication
   */
  cookie: string;
  /**
   * Reference code for the verification code
   */
  reference: string;
}

export interface SRSCourse {
  /**
   * The department segment of the course: **CS** 101-1
   */
  department: string;
  /**
   * The number segment of the course: CS **101**-1
   */
  number: string;
  /**
   * The section segment of the course: CS 101-**1**
   */
  section: string;
}

export interface SRSSemester {
  /**
   * The year segment of the semester: **2020**-2021 Fall
   */
  year: string;
  /**
   * The season segment of the semester: 2020-2021 **Fall**
   */
  season: SemesterType;
}

export interface SRSSemesterCourses {
  semester: SRSSemester;
  courses: {
    code: SRSCourse;
    name: string;
    instructor: string;
    credits: string;
    type: string;
  }[];
}

export enum SRSLetterGrade {
  "A" = "A",
  "A-" = "A-",
  "B+" = "B+",
  "B" = "B",
  "B-" = "B-",
  "C+" = "C+",
  "C" = "C",
  "C-" = "C-",
  "D+" = "D+",
  "D" = "D",
  "F" = "F",
}

export type CGPACalculationRequestData = { course: SRSCourse; grade: SRSLetterGrade }[];

export interface CGPACalculation {
  gpa: number;
  cgpa: number;
  standing: string;
  credits: {
    semesterTotal: number;
    previousTotal: number;
    grandTotal: number;
  };
  points: {
    semesterTotal: number;
    previousTotal: number;
    grandTotal: number;
  };
}

export interface SRSExam {
  courseName: string;
  examType: string;
  startingTime: Dayjs;
  timeBlock: string;
  classrooms: string[];
}

export enum SRSTimeSlot {
  H8 = "08:30 - 09:20",
  H9 = "09:30 - 10:20",
  H10 = "10:30 - 11:20",
  H11 = "11:30 - 12:20",
  H12 = "12:30 - 13:20",
  H13 = "13:30 - 14:20",
  H14 = "14:30 - 15:20",
  H15 = "15:30 - 16:20",
  H16 = "16:30 - 17:20",
  H17 = "17:30 - 18:20",
  H18 = "18:30 - 19:20",
  H19 = "19:30 - 20:20",
  H20 = "20:30 - 21:20",
  H21 = "21:30 - 22:20",
}

export interface SRSDailyScheduleItem<TimeSlotKey extends keyof typeof SRSTimeSlot = keyof typeof SRSTimeSlot> {
  timeSlot: typeof SRSTimeSlot[TimeSlotKey];
  details: string[] | null;
}

export type SRSDailySchedule = [
  h8: SRSDailyScheduleItem<"H8">,
  h9: SRSDailyScheduleItem<"H9">,
  h10: SRSDailyScheduleItem<"H10">,
  h11: SRSDailyScheduleItem<"H11">,
  h12: SRSDailyScheduleItem<"H12">,
  h13: SRSDailyScheduleItem<"H13">,
  h14: SRSDailyScheduleItem<"H14">,
  h15: SRSDailyScheduleItem<"H15">,
  h16: SRSDailyScheduleItem<"H16">,
  h17: SRSDailyScheduleItem<"H17">,
  h18: SRSDailyScheduleItem<"H18">,
  h19: SRSDailyScheduleItem<"H19">,
  h20: SRSDailyScheduleItem<"H20">,
  h21: SRSDailyScheduleItem<"H21">
];

export type SRSWeeklySchedule = [
  monday: SRSDailySchedule,
  tuesday: SRSDailySchedule,
  wednesday: SRSDailySchedule,
  thursday: SRSDailySchedule,
  friday: SRSDailySchedule,
  saturday: SRSDailySchedule,
  sunday: SRSDailySchedule
];

export interface SRSInfoCard {
  student: {
    id: string;
    nationalId: string;
    fullName: string;
    status: string;
    faculty: string;
    department: string;
    picture?: string;
  };
  advisor: {
    fullName: string;
    email: string;
  };
  academic: {
    standing: string;
    gpa: string;
    cgpa: string;
    registrationSemester: string;
    curriculumSemester: string;
    class: string;
    nominalCreditLoad: string;
    courseLimits: {
      lower: string;
      upper: string;
    };
    ranking: {
      cohort: string;
      agpa: string;
      details: string;
    };
  };
  scholarship: {
    byPlacement: string;
    merit: string;
  };
  contact: {
    contactEmail: string;
    bilkentEmail: string;
    mobilePhone: string;
  };
}

export interface AcademicCalendarItem {
  date: string;
  event: string;
  type?: "studentaffairs" | "vacation" | "englishprep";
}
export type AcademicCalendar = AcademicCalendarItem[];

/**
 * Represents a row on the grade table for a course.
 */
export interface SRSGradeItem {
  title: string;
  date: string;
  grade: string;
  comment: string;
}

/**
 * Represents a category of grades for a course.
 */
export interface SRSGradeCategory {
  type: string;
  items: SRSGradeItem[];
}

/**
 * Represents the full grade data for a course.
 */
export interface SRSCourseGrades {
  title: string;
  categories: SRSGradeCategory[];
}

/**
 * Represents a row on the attendance table for a course.
 */
export interface SRSAttendanceItem {
  title: string;
  date: string;
  attendance: string;
}

/**
 * Represents the full attendance data for a course.
 */
export interface SRSCourseAttendance {
  title: string;
  data: SRSAttendanceItem[];
  /**
   * The attendance ratio
   */
  ratio: string;
}

/**
 * Represents a single semester on the transcript.
 */
export interface SRSTranscriptSemester {
  semester: SRSSemester;
  gpa: string;
  cgpa: string;
  standing: string;
  courses: {
    course: Omit<SRSCourse, "section">;
    name: string;
    grade: SRSLetterGrade | "N/A";
    credits: string;
  }[];
}
export type SRSTranscript = SRSTranscriptSemester[];

/**
 * Represents a single row on the curriculum.
 */
export interface SRSCurriculumCourseItem {
  course: Omit<SRSCourse, "section"> | "N/A";
  name: string;
  status: "Successful" | "Not taken" | "Failed";
  grade: SRSLetterGrade | "N/A";
  credits: string | "N/A";
  semester: SRSSemester | null;
  replacement?: {
    course: Omit<SRSCourse, "section">;
    name: string;
  };
}
/**
 * Represents a full semester on the curriculum.
 */
export type SRSCurriculumSemester = SRSCurriculumCourseItem[];
/**
 * Represents the full curriculum
 */
export type SRSCurriculum = SRSCurriculumSemester[];

/**
 * Represents a row on the data of a letter grade announcement.
 */
export interface SRSLetterGradeResult {
  course: string;
  grade: SRSLetterGrade;
}
/**
 * Represents a complete letter grade announcement.
 */
export type SRSLetterGradeResults = SRSLetterGradeResult[];
