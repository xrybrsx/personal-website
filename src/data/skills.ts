
import type { SkillCategory } from '@/types/skill'

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    skills: ['Java 21', 'TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: ['Spring Boot', `Spring MVC`, `REST APIs`, 'Node.js', 'JDBC', 'gRPC', `Protocol Buffers`],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: ['Vue.js', 'Vuex', 'Vuetify', 'Highcharts'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DB',
    skills: ['Azure', 'Docker', 'Git', 'Maven', `SQL`, `NoSQL`],
  },
  {
    id: 'testing',
    title: 'Testing & Development Tools',
    skills: [`IntelliJ IDEA`, `Attlassian`,`Git`, `Bruno`,`JUnit`, `Mockito`, `Maven` ],

  },
]
