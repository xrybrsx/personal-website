
import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: "stock-profit",
    title: "Stock Profit Calculator",
    description:
      "Full-stack application that analyzes stock price data to identify optimal buying and selling opportunities. Features interactive financial charts, REST APIs, containerization, and Azure deployment.",
    technologies: [
      "Vue.js",
      "TypeScript",
      "NestJS",
      "Highcharts",
      "Docker",
      "Azure",
    ],
    githubUrl: "https://github.com/xrybrsx/stock-profit-app",
    liveUrl:
      "https://stock-profit-app-a3abcnb0erhdgyev.westeurope-01.azurewebsites.net/",
    image: ["/projects/stock-calculator.png"],
  },
  {
    id: "social-media-analytics",
    title: "Social Media Analytics Dashboard",
    description:
      "University dissertation project exploring public opinion through social media sentiment analysis. Built a Python dashboard to process data and visualize sentiment, trends, and topic distributions.",
    technologies: [
      "Python",
      "Pandas",
      "NLTK",
      "Dash",
      "Plotly",
      "Twitter API",
    ],
    githubUrl: "https://github.com/xrybrsx/comp3200",
    image: ["/projects/pie-chart.png", "/projects/scatter-chart.png"],
  },
  {
    id: "interactive-map",
    title: "Map Pinning Application",
    description:
      "Interactive mapping application allowing users to add, drag, and save location markers. Built with Vue and Leaflet, with Cypress testing.",
    technologies: [
      "Vue.js",
      "JavaScript",
      "Leaflet",
      "Cypress",
    ],
    githubUrl: "https://github.com/xrybrsx/drag.io",
    image: ["/projects/interactive-map.png"],
  },
  {
    id: "runway-redeclaration",
    title: "Runway Redeclaration Tool",
    description:
      "University team project that recalculates airport runway parameters based on obstacle information. Provides updated measurements, visual representations, and calculation summaries.",
    technologies: [],
    githubUrl:
      "https://github.com/xrybrsx/runway-redeclaration-tool",
  },
  {
    id: "mathdoku",
    title: "MathDoku",
    description:
      "Java desktop puzzle game inspired by Sudoku, developed as an individual university programming project.",
    technologies: ["Java", "JavaFX"],
    githubUrl: "https://github.com/xrybrsx/MathDoku",
  },
  {
    id: "cv-library",
    title: "CV Library",
    description:
      "University cloud application that helps users explore resume examples, filter CVs, and upload their own documents.",
    technologies: ["Azure"],
    githubUrl: "https://github.com/xrybrsx/COMP3207",
    image: ["/projects/cv-library.png", "/projects/cv-library-login.png"],
  },
  {
    id: "recipe-book",
    title: "Smart Recipe Book",
    description:
      "Team hackathon project developed in under eight hours. A desktop application suggesting recipes based on ingredients selected by the user.",
    technologies: ["Java", "JavaFX"],
    githubUrl: "https://github.com/xrybrsx/hackaSoton2020",
    image: ["/projects/recipe-book.gif"],
  },
];
