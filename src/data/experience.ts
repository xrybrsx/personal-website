
import type { Experience } from '@/types/experience'

export const experiences: Experience[] = [
  {
    id: 'commerzbank',
    role: 'Java Developer',
    company: 'Commerzbank via Accenture',
    displayCompany: 'Commerzbank',
    relationship: 'via Accenture',
    logo: `${import.meta.env.BASE_URL}logos/commerzbank.png`,
    employerLogo: `${import.meta.env.BASE_URL}logos/accenture.png`,
    period: '2026 – Present',
    description:
      `Backend development for enterprise banking systems, extending PSD2 payment services using Java 21, Spring Boot, and the Spring ecosystem.`,
    responsibilities: [
      `API Development: Implementing REST endpoints, Spring MVC controllers, and payment processing functionality.`,
      `System Integration: Integrating internal banking APIs and services, including request validation, service routing, and error handling.`,
      `Business Logic: Developing and extending application logic for payment workflows, such as SEPA Instant processing.`,
      `Database Persistence: Implementing data access and persistence operations using Hibernate ORM, JPA, Spring Data JPA, JDBC, and SQL.`,
      `Testing: Writing unit tests with JUnit and Mockito, performing API testing and debugging with Bruno.`,
      `Documentation & Configuration: Maintaining technical documentation in Confluence and working on application run configurations and container deployments.`],
    technologies: [
      'Java',
      'Spring Boot',
      'SQL',
      'JUnit',
      'Mockito',
    ],
  },
  {
    id: `microsoft`,
    role: `Cloud Technical Specialist & Discovery and Planning Lead`,
    company: `Microsoft via Accenture`,
    displayCompany: `Microsoft`,
    relationship: `via Accenture`,
    logo: `${import.meta.env.BASE_URL}logos/microsoft.png`,
    employerLogo: `${import.meta.env.BASE_URL}logos/accenture.png`,
    period: `2023 – 2025`,
    description: `Supported independent software vendors (ISVs) across 
    EMEA in adopting Microsoft Azure and navigating the Microsoft commercial marketplace.`,
    responsibilities: [
      `Technical Discovery: Led discovery and planning sessions to assess software solutions, technical requirements, and cloud adoption needs.`,
      `Azure Consulting: Provided technical guidance on Azure services, cloud architecture, and solution integration.`,
      `Marketplace Integration: Guided software vendors through Azure Marketplace publishing, technical requirements, and commercial marketplace processes.`,
      `Partner Enablement: Helped ISVs navigate Microsoft programs, technical documentation, and available cloud resources.`
    ],
    technologies: [
      'Microsoft Azure',
      'Cloud Architecture',
      `Azure Marketplace`,
      `Technical Discovery`,
      'Solution Integration',
    ],
  },
  {
    id: '3rdi',
    role: 'Full-Stack Developer',
    company: '3RDi',
    logo: `${import.meta.env.BASE_URL}logos/3rdi.svg`,
    period: '2022 – 2023',
    description:
      'Developed a cloud-based sales analytics platform, combining interactive data visualizations with a microservices-based backend.',
    responsibilities: [
      `Frontend Development: Built interactive dashboards and application features using Vue.js, TypeScript, Vuex, Vuetify, and Highcharts.`,
      `Backend Development: Developed Go microservices and REST APIs, implementing business logic and communication between services.`,
      `Service Integration: Worked with gRPC and Protocol Buffers for communication across distributed backend services.`,
      `Cloud & Data: Integrated Azure Cosmos DB and Azure Synapse Analytics for data storage, retrieval, and analytics.`,
      `Development Environment: Worked with Docker for containerized services and local development.`],
    technologies: [
      'Vue',
      'TypeScript',
      `JavaScript`,
      'Go',
      `REST APIs`,
      'Azure Synapse Analytics',
      `Azure Cosmos DB`,
      'Docker',
      `gRPC`,
      `Highcharts`,

    ],
  },
  {
    id: `acronis`,
    role: `QA Engineer`,
    company: `Acronis`,
    logo: `${import.meta.env.BASE_URL}logos/acronis.png`,
    period: `2021 – 2022`,
    description: `Worked on software quality assurance, testing application functionality and identifying defects to support reliable software releases.`,
    responsibilities: [
      `Software Testing: Executed functional and regression tests to validate application behavior.`,
      `Test Execution: Conducted manual and automated testing across different platforms and devices.`,
      `Bug Tracking: Identified, documented, and reported defects to support debugging and resolution.`,
      `Collaboration: Worked closely with development and product teams to ensure quality standards.`
    ],
    technologies: [
      'Software Testing',
      'Functional Testing',
      'Regression Testing',
      `Confluence`,
      'JIRA'
    ]
  }
]
