type SectionData = {
  name: string;
  icon?: string;
  type: "organizations" | "items";
  entries: OrganizationData[] | ItemData[];
}

type OrganizationData = {
  name: string;
  location?: string;
  link?: string;
  positions: PositionData[];
  image?: ImageMetadata;
}

type PositionData = {
  title: string;
  link?: string;
  startMonth: string;
  endMonth: string;
  location?: string;
  notes?: string[];
  technologies?: string[];
}

type ItemData = {
  name: string;
  location?: string;
  link?: string;
  startMonth?: string;
  endMonth?: string;
  notes?: string[];
  technologies?: string[];
}

export { SectionData, OrganizationData, PositionData, ItemData };