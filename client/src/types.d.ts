type ResumeEntryData = {
  name: string;
  link?: string;
  startMonth?: string;
  endMonth?: string;
  location?: string;
  description?: string[];
  technologies?: string[];
}

type ResumeSectionData = {
  name: string;
  entries: ResumeEntryData[];
  icon?: string;
}

export { ResumeEntryData, ResumeSectionData };