
import type { Project, Education, SkillCategory, Experience, Course } from './types';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Anuj Chaudhary",
  title: "Final Year Undergraduate | Mechanical Engineering",
  institute: "Indian Institute of Technology Kanpur",
  email: "anujc21@iitk.ac.in",
  phone: "+91-6396178114",
  linkedin: "linkedin.com/in/Anuj",
  github: "github.com/Anuj52",
  about: "Final year student at IIT Kanpur with a strong foundation in Full Stack Development, Data Analytics, and Machine Learning. Passionate about building scalable web applications and data-driven solutions.",
};

export const SOCIAL_LINKS = [
  { name: 'Email', icon: Mail, url: `mailto:${PERSONAL_INFO.email}` },
  { name: 'LinkedIn', icon: Linkedin, url: `https://${PERSONAL_INFO.linkedin}` },
  { name: 'GitHub', icon: Github, url: `https://${PERSONAL_INFO.github}` },
  { name: 'Phone', icon: Phone, url: `tel:${PERSONAL_INFO.phone}` },
];

export const EDUCATION: Education[] = [
  {
    year: "2021 - Present",
    degree: "B.Tech",
    institute: "Indian Institute of Technology Kanpur",
    score: ""
  },
  {
    year: "2020",
    degree: "CBSE (XII)",
    institute: "B.K.S.V.M, Mathura",
    score: "92.6%"
  },
  {
    year: "2018",
    degree: "CBSE (X)",
    institute: "B.K.S.V.M, Mathura",
    score: "80%"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Visual Analytics Dashboard for Google Trends",
    type: "Course Project",
    tech: "Python, Flask, D3.js, JSON APIs",
    date: "Feb '25 – May '25",
    description: [
      "Designed an interactive full-stack dashboard to explore Google Trends data, revealing temporal and seasonal patterns.",
      "Developed a robust Python-Flask backend to process CSV data and deliver it through JSON APIs for seamless querying.",
      "Built a dynamic user interface with D3.js to visualize and interact with choropleth maps, line charts, graphs, and word clouds.",
      "Enabled detailed exploration of global trends and region-specific insights for data-driven analysis."
    ],
    impact: "Optimized data processing speed by 40%, enabling real-time trend analysis for large datasets.",
    demoLink: "#",
    codeLink: "https://github.com/Anuj52/CS-661_project/tree/main/Visual%20Analytics%20System%20based%20on%20Google%20Trends%20Visualization"
  },
  {
    title: "Pic-Picture Hub",
    type: "Self Project",
    tech: "Django, REST Framework, Pillow, SQL Parse",
    date: "Self Project",
    description: [
      "Implemented secure and scalable user authentication using Django 4.1.7.",
      "Enhanced platform responsiveness by integrating ASGI technology for concurrent asynchronous operations.",
      "Developed RESTful APIs enabling seamless communication between frontend and backend.",
      "Utilized Pillow library for advanced image processing and lightweight TZ Data library for global time zone management."
    ],
    impact: "Reduced image upload latency by 30% through optimized processing pipelines and concurrent handling.",
    demoLink: "#",
    codeLink: "https://github.com/Anuj52/Picperfect-Hub"
  },
  {
    title: "Ecom-Project Powered by MERN",
    type: "Self Project",
    tech: "MongoDB, Express.js, React, Node.js, Redux, JWT",
    date: "Self Project",
    description: [
      "Developed a full-stack e-commerce app with integrated MongoDB and Express.js REST APIs.",
      "Implemented user auth with JWT-based token security and bcrypt hashing.",
      "Created an admin dashboard with role-based access control for managing products and orders.",
      "Designed a responsive UI using React, Material-UI, and Redux with React Router."
    ],
    impact: "Delivered a scalable architecture capable of supporting 500+ concurrent users with secure payment integration.",
    demoLink: "#",
    codeLink: "https://github.com/Anuj52/Mern-Ecom-project"
  },
  {
    title: "Movie Recommender System",
    type: "Self Project",
    tech: "Python, Pandas, NumPy, Scikit-Learn, Streamlit",
    date: "Self Project",
    description: [
      "Designed a content-based movie recommender system using Pandas, NumPy, and ML techniques.",
      "Consolidated metadata applying filters on genres, keywords, and cast for tailored recommendations.",
      "Developed an intuitive Streamlit interface enabling users to search movies and receive suggestions.",
      "Integrated TMDb API to dynamically fetch and display high-quality movie posters."
    ],
    impact: "Achieved 85% relevance accuracy in recommendations using content-based filtering algorithms.",
    demoLink: "#",
    codeLink: "https://github.com/Anuj52/movie-recommender-system"
  },
  {
    title: "Blogsphere",
    type: "Self Project",
    tech: "React, Node.js, Express.js, MongoDB, Tailwind CSS",
    date: "Self Project",
    description: [
      "Built a modern full-stack blogging platform allowing users to create, edit, and publish articles.",
      "Implemented rich text editing capabilities and secure image uploads.",
      "Designed a responsive layout with dark mode support for enhanced user experience.",
      "Integrated comment and like functionality to foster user engagement."
    ],
    impact: "Created a robust community platform facilitating knowledge sharing and user interaction.",
    demoLink: "https://blogsphere-lake.vercel.app/",
    codeLink: "https://github.com/Anuj52/blogsphere"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: ["Python", "C", "C++", "SQL", "MATLAB", "HTML", "CSS", "JavaScript"]
  },
  {
    category: "Frameworks & Databases",
    skills: ["Django", "React", "Node.js", "Express.js", "Bootstrap", "Tailwind CSS", "MySQL", "MongoDB"]
  },
  {
    category: "Software & Libraries",
    skills: ["Pandas", "NumPy", "SciPy", "Scikit-Learn", "TensorFlow", "PyTorch", "Matplotlib", "Plotly"]
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Jupyter", "Figma", "Canva", "LaTeX"]
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Senior Secretary",
    organization: "Card and Board Games Club",
    duration: "2022-23",
    details: [
      "Organized gaming events, tournaments, and social gatherings for 50+ members.",
      "Facilitated board meetings, prepared agendas, and ensured follow-up on action items.",
      "Coordinated weekend game nights creating a fun atmosphere for 50 participants.",
      "Managed club communications and updated social media with engaging content."
    ]
  }
];

export const COURSES: Course[] = [
  {
    category: "Computer Science & Data",
    courses: ["Intro to Machine Learning", "Big Data Visual Analytics", "Statistical NLP", "Fundamentals of Computing", "Computer Networks"]
  },
  {
    category: "Engineering & Design",
    courses: ["Linear Algebra", "Design AR & VR", "Robotics", "Design Practice I", "Manufacturing Systems"]
  }
];

export const ACHIEVEMENTS = [
  "Active chess player in online and offline tournaments, enhancing strategic thinking.",
  "Volunteered for the Reconvocation of Y20 Batch (2022) IIT Kanpur.",
  "Participated in national and institute-level hackathons.",
  "Competed as an Active Trader in the Institute Trading Competition."
];
