export interface Step {
    name: string;
    link: string;
  }
  
  export interface Skill {
    icon: string;
    title: string;
    description: string;
    steps: Step[];
  }