export interface JobsItem {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Attributes {
  title: string;
}

export interface Relationships {
  skills: Skills;
}

export interface Skills {
  id: number;
}
