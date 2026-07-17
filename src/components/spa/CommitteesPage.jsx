import { useState } from 'react'
import PageShell from './PageShell'
import ScrollReveal from '../ScrollReveal'

// ── Accurate data sourced from kmit.in/administration/othercommittees.php ─────
const committees = [
  {
    name: 'Grievance Redressal Committee',
    icon: 'fa-scale-balanced', color: '#7c3aed',
    objectives: 'To cultivate an approachable, answerable atmosphere amidst all stakeholders, thereby, creating a congenial, hospitable, sociable, serene, and harmonious educational atmosphere in the institute to prevent grievances.',
    functions: [
      'GRC strives for the self-esteem of the College by safe guarding frictionless amicable atmosphere relationship among the stakeholders.',
      'Express fearlessly respective grievances; build confidence on the GRC of the institution among all stakeholders and especially amongst the student community, thus striving the learning to happen completely ragging free.',
      'Provision for expressing anonymously. Complaint Boxes are placed at different places in the campus free from CCTV coverage.'
    ],
    members: [
      { no: 1, name: 'Dr B L Malleswari',   dept: '—',           role: 'Chairperson' },
      { no: 2, name: 'Dr T V G Sridevi',     dept: '—',           role: 'Convener' },
      { no: 3, name: 'Dr P Swetha',          dept: '—',           role: 'Member' },
      { no: 4, name: 'Ms Sharmeela Chungi',  dept: '—',           role: 'Member' },
      { no: 5, name: 'Ms Sharadamani',       dept: '—',           role: 'Member' },
      { no: 6, name: 'Mr Jagan',             dept: '—',           role: 'Member' },
    ]
  },
  {
    name: 'Anti-Ragging Committee',
    icon: 'fa-shield-halved', color: 'var(--brand-orange-text)',
    objectives: 'The institution has formed an Anti-ragging committee to prevent the menace of ragging in accordance with UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions, 2009.',
    functions: [
      'To monitor and oversee the students in prevention of ragging in the institution.',
      'It shall be the duty of the Anti-Ragging committee to be called upon to make surprise raids in vulnerable places in the campus to incidents of, and having the potential of, ragging and shall be empowered to inspect such places.',
      'It shall also be the duty of the Anti-Ragging committee to conduct an on-the-spot enquiry into any incident of ragging referred to it by the Head of the institution and submit recommendations to the Anti-Ragging Committee.'
    ],
    members: [
      { no: 1, name: 'Dr B L Malleswari',         dept: 'Principal',           role: 'Chairperson' },
      { no: 2, name: 'Dr G Mahesh',                dept: 'Assistant Professor', role: 'Convener' },
      { no: 3, name: 'Mr U Balakrishna',           dept: 'Assistant Professor', role: 'Member' },
      { no: 4, name: 'Ms Saritha Gone',            dept: 'Assistant Professor', role: 'Member' },
      { no: 5, name: 'Mr B Niranjan Babu',         dept: 'Assistant Professor', role: 'Member' },
      { no: 6, name: 'Mr A Ravinder',              dept: 'Assistant Professor', role: 'Member' },
      { no: 7, name: 'Mr O Raghavendra Prasad',   dept: 'Assistant Professor', role: 'Member' },
      { no: 8, name: 'Mr Raja Satish Kumar',       dept: 'Assistant Professor', role: 'Member' },
    ]
  },
  {
    name: 'Discipline Committee',
    icon: 'fa-gavel', color: 'var(--navy)',
    objectives: 'To maintain a disciplined, respectful, and orderly environment within the institute, ensuring that all stakeholders adhere to the established rules, regulations, and code of conduct. The committee aims to foster a culture of responsibility, integrity, and mutual respect, thereby promoting a conducive atmosphere for academic and personal growth.',
    functions: [
      'The Discipline Committee is responsible for ensuring that all students, faculty, and staff adhere to the institute\'s code of conduct and disciplinary policies. It aims to create a safe and respectful environment for everyone.',
      'The committee addresses and resolves instances of misconduct, indiscipline, or violations of institutional rules. This includes academic dishonesty, behavioral issues, and any actions that disrupt the harmony of the institute.'
    ],
    members: [
      { no: 1, name: 'Mr. A Surya Prakash',  dept: 'H & S',         role: 'Convener' },
      { no: 2, name: 'Ms. P G K Aruna',      dept: 'AIML',          role: 'Member' },
      { no: 3, name: 'Mr. M Narsimlu',       dept: 'CSE',           role: 'Member' },
      { no: 4, name: 'Ms. Shailega Pawar',   dept: 'Non-Teaching',  role: 'Member' },
      { no: 5, name: 'Mr. K Reddiya Nayak',  dept: 'Non-Teaching',  role: 'Member' },
    ]
  },
  {
    name: 'Faculty Welfare Committee',
    icon: 'fa-heart', color: '#e11d48',
    objectives: 'The Faculty Welfare Committee is established to promote the well-being, professional growth, and job satisfaction of the faculty members within the institution. The committee aims to address the concerns, needs, and welfare of the faculty, ensuring a supportive and conducive work environment that fosters academic excellence and personal development.',
    functions: [],
    members: [
      { no: 1, name: 'Dr. K Vishal Reddy', dept: 'DS',   role: 'Convener' },
      { no: 2, name: 'Mr. M Srinivas',     dept: 'AIML', role: 'Member' },
    ]
  },
  {
    name: 'Maintenance Committee',
    icon: 'fa-wrench', color: '#0891b2',
    objectives: 'To ensure a well-maintained, safe, and efficient campus environment that fosters an atmosphere conducive to learning, development. The committee aims to uphold the infrastructure, cleanliness, and operational efficiency of the institution through proactive maintenance and timely intervention.',
    functions: [
      'The Maintenance Committee strives to sustain the reputation of the institution by ensuring a well-kept, hygienic, and functional infrastructure, fostering a smooth academic and administrative environment.',
      'To implement preventive maintenance measures for all physical and digital infrastructure, ensuring durability and cost efficiency.'
    ],
    members: [
      { no: 1, name: 'Mr. A Ravinder',           dept: 'H & S',  role: 'Convener' },
      { no: 2, name: 'Ms. N Jagruthi Chaitanya', dept: 'H & S',  role: 'Member' },
      { no: 3, name: 'Ms. M Deepika',            dept: 'AIML',   role: 'Member' },
      { no: 4, name: 'Mr. Y Singaraiah',         dept: 'AIML',   role: 'Member' },
      { no: 5, name: 'Mr. K Seshacharyulu',      dept: 'CSE',    role: 'Member' },
    ]
  },
  {
    name: 'Student Counselling Committee',
    icon: 'fa-comments', color: '#059669',
    objectives: '',
    functions: [
      'Establish a nurturing environment that promotes communication.',
      'Informing students of the roles and responsibilities of the mentor/student relationship.',
      'Collaborate and provide consulting services that support the development and implementation of the program.',
      'Provide educational research for the program.',
      'Facilitate student achievement and personal growth through collaborative classroom guidance experiences.',
      'Maintain an up-to-date Advising Portfolio, with a summary record of performance to date (grade reports, transcript, requirements completed, etc.), attendance reports, dates of conferences, and details of help sessions/tutoring/Remedial classes.'
    ],
    members: [
      { no: 1, name: 'Dr. T V G Sridevi',       dept: 'CSM',  role: 'Convener' },
      { no: 2, name: 'Dr. S. Udayalaxmi',        dept: 'H&S',  role: 'Member' },
      { no: 3, name: 'Ms. Hima Bindu Sree',      dept: 'CSE',  role: 'Member' },
      { no: 4, name: 'Ms. Saritha Gone',         dept: 'H&S',  role: 'Member' },
      { no: 5, name: 'Mr. Karthikeya H Mulay',   dept: 'EIE',  role: 'Student Member & Student Council President' },
      { no: 6, name: 'Mr. Sai Manish Avasarala', dept: 'CSE',  role: 'Student Member & Student Council Vice-President' },
      { no: 7, name: 'Mr. Ch. Snehith Yadav',   dept: 'IT',   role: 'Student Member & Student Council Treasurer' },
      { no: 8, name: 'Ms. Shreyasa Lankala',     dept: 'CSE',  role: 'Student Member & Student Council Secretary' },
    ]
  },
  {
    name: 'NSS Committee',
    icon: 'fa-flag', color: '#d97706',
    objectives: '',
    functions: [
      'Understand the community in which they work.',
      'Identify the needs and problems of the community and involve them in problem-solving.',
      'Develop among themselves a sense of social and civic responsibility.',
      'Develop capacity to meet emergencies and natural disasters.',
      'The committee aims at providing a variety of learning experiences which will develop a sense of participation, service and achievement among volunteers.',
      'Providing opportunities to the students to play their role in planning and executing projects especially in rural areas.',
      'Developing the qualities of Leadership by discovering the meaning of latent potential of students.'
    ],
    members: [
      { no: 1, name: 'Mr. Raghuram',     dept: 'H&S', role: 'Convener' },
      { no: 2, name: 'Mr. U. Balakrishna', dept: 'H&S', role: 'Member' },
    ]
  },
  {
    name: 'SC/ST Welfare Committee',
    icon: 'fa-users', color: '#be123c',
    objectives: 'The SC/ST Cell was established to support students from aforementioned communities. The college takes special interest in facilitating financial support to students from such communities from government agencies and other sources.',
    functions: [
      'To circulate State Government and UGC\'s decisions about different scholarship programs.',
      'To communicate with the students and motivate them for better future planning.',
      'Loan library books specifically meant for SC/ST from the library.',
      'Counsel them of any academic or psychological issues that may arise during academic study at KMIT.',
      'The committee will meet twice every year to discuss any issues.'
    ],
    members: [
      { no: 1, name: 'Mr. A. Ravinder',         dept: 'CSD',   role: 'Convener' },
      { no: 2, name: 'Mr. V. A. Raghava Rao',   dept: 'ADMIN', role: 'Member' },
      { no: 3, name: 'Ms. B. Himabindu',         dept: 'CSE',   role: 'Member' },
      { no: 4, name: 'Mr. K. Rajesh',            dept: 'CSE',   role: 'Member' },
      { no: 5, name: 'Mr. G Govardan',           dept: 'IT',    role: 'Member' },
    ]
  },
  {
    name: 'Women Empowerment Committee',
    icon: 'fa-venus', color: '#9333ea',
    objectives: 'The Women Empowerment Committee (WEC) was established at Keshav Memorial Institute of Technology in pursuance of the policies of women empowerment within the ambit of higher education. The management set up the WEC to address concerns of gender discrimination and recommend measures and policies for gender parity within the campus.',
    functions: [
      'To prevent sexual harassment within the campus.',
      'To promote a secure environment for teaching, non-teaching women staff and female students.',
      'Changing attitudes and community practices by encouraging active participation and involvement of both men and women.',
      'Conduct various workshops/lectures/seminars to educate and sensitize both male and female members.'
    ],
    members: [
      { no: 1, name: 'Dr. M Swapna',  dept: 'CSE', role: 'Convener' },
      { no: 2, name: 'Ms. M V Rama',  dept: 'H&S', role: 'Member' },
    ]
  },
  {
    name: 'Anti Sexual Harassment Committee',
    icon: 'fa-hand-fist', color: '#dc2626',
    objectives: '',
    functions: [
      'To fulfill the directive of the Supreme Court, as per UGC directives in respect of implementing a policy against sexual harassment in the institution.',
      'To evolve a mechanism for the prevention and redressal of sexual harassment cases and other acts of gender based violence in the institution.',
      'To ensure the implementation of the policy in letter and spirit through proper reporting of the complaints and their follow-up procedures.',
      'To provide an environment free of gender-based discrimination.',
      'To ensure equal access of all facilities and participation in activities of the college.',
      'To create a secure physical and social environment which will deter acts of sexual harassment.',
      'To promote a social and psychological environment that will raise awareness about sexual harassment in its various forms.'
    ],
    members: [
      { no: 1, name: 'Dr. M Swapna',  dept: 'CSE', role: 'Convener' },
      { no: 2, name: 'Ms. M V Rama',  dept: 'H&S', role: 'Member' },
    ]
  },
  {
    name: 'Professional Bodies Activities Committees',
    icon: 'fa-building', color: '#0284c7',
    objectives: 'The main objective of the Professional Bodies Activities committee is to encourage faculty and students to take membership of various professional bodies such as CSI, IEEE, IETE etc. The Committee also ensures the smooth functioning of KMIT Chapters of various professional bodies the college is associated to.',
    functions: [],
    members: [
      { no: 1, name: 'Dr. Ch. Sita Kameswari', dept: 'CSM', role: 'Convener' },
      { no: 2, name: 'Mr. Madhukar',            dept: 'CSE', role: 'Member' },
      { no: 3, name: 'Ms. Swarajya Lakshmi',    dept: 'IT',  role: 'Member' },
      { no: 4, name: 'Ms. Asha Sheldon',        dept: 'CSM', role: 'Member' },
      { no: 5, name: 'Mr. M Shankar',           dept: 'CSE', role: 'Member' },
      { no: 6, name: 'Ms. G Lavanya',           dept: 'H&S', role: 'Member' },
      { no: 7, name: 'Ms. N Surekha',           dept: 'H&S', role: 'Member' },
      { no: 8, name: 'Ms. Saritha Gone',        dept: 'H&S', role: 'Member' },
    ]
  },
  {
    name: 'Publications, R&D, Entrepreneur Development Committee',
    icon: 'fa-flask-vial', color: '#7c3aed',
    objectives: '',
    functions: [
      'To promote a research hub facilitating multiple research centers covering heterogeneous research areas that ultimately lead to publications and ED.',
      'To enhance the quality of quantitative research.',
      'To amplify collaborative research with premier Institutions and Industries.',
      'To involve students in research by vertical integration strategy.',
      'To focus the research on open community problems.',
      'To encourage registered researchers (Faculty and Students alike) to publish findings.'
    ],
    members: [
      { no: 1, name: '—',                  dept: 'Director',  role: 'Convenor' },
      { no: 2, name: 'Dr. R. Devika Rubi', dept: 'CSE',       role: 'Core Committee Member' },
      { no: 3, name: 'Dr. S. Rajasekaran', dept: 'CSE',       role: 'Core Committee Member' },
      { no: 4, name: 'Ms. Haleema Bushra', dept: 'CSE',       role: 'Member' },
      { no: 5, name: 'Mr. B. Niranjan Kumar', dept: 'H&S',    role: 'Member' },
    ]
  },
  {
    name: 'Results Analysis Committee',
    icon: 'fa-chart-line', color: 'var(--navy)',
    objectives: 'The committee ensures timely publication of Results Analysis Report.',
    functions: [
      'Ensure that results of students are reported at college level, branch level and section level.',
      'Subject wise analysis will also be taken up.',
      'Based on the analysis report a review meeting is conducted and necessary measures to be taken will be informed to heads of the departments.'
    ],
    members: [
      { no: 1, name: 'Dr. B L MALLESWARI',   dept: 'Principal, KMIT', role: 'Chair-Person and Chief COE' },
      { no: 2, name: 'Dr. S UDAYALAXMI',      dept: 'H&S',             role: 'Controller Of Examinations (COE)' },
      { no: 3, name: 'Mr. SATEESH RAVURI',    dept: 'H&S',             role: 'Addl. COE' },
      { no: 4, name: 'Dr. V ARUNA',           dept: 'HOD - CSE',       role: 'Member' },
      { no: 5, name: 'Dr. G. NARENDER',       dept: 'HOD - IT',        role: 'Member' },
      { no: 6, name: 'Dr. T V G SRIDEVI',     dept: 'HOD - CSM',       role: 'Member' },
      { no: 7, name: 'Mr. ANIL KUMAR',        dept: 'HOD - CSD',       role: 'Member' },
      { no: 8, name: 'Mr. U BALAKRISHNA',     dept: 'HOD - H&S',       role: 'Member' },
    ]
  },
  {
    name: 'Website + PR Committee',
    icon: 'fa-globe', color: '#0891b2',
    objectives: 'To signify the presence and strengthen the reputation of KMIT through various media sources and the institute\'s official website.',
    functions: [
      'To conceptualize and develop student generated content for the institute\'s official website.',
      'To source and maintain the institute\'s blog page.',
      'To facilitate communication about different Events and Competitions on different online platforms.',
      'To provide social media coverage during all events.'
    ],
    members: [
      { no: 1, name: 'Mr. A. V. Nagireddy',     dept: 'CSE', role: '—' },
      { no: 2, name: 'Mr. Rishab Deshpande',    dept: 'CSE', role: 'Head of PR' },
      { no: 3, name: 'Ms. Rythma Reddy Lakkady', dept: 'CSE', role: 'SIC of PR' },
    ]
  },
  {
    name: 'Self-Learning Committee',
    icon: 'fa-book-open-reader', color: '#059669',
    objectives: 'The ever growing technology and the pace of innovation has created significant skills-gap; as such the students and teachers feel the need to refresh their knowledge, upgrade their skills and at times brush up their basic concepts. The Self-Learning Committee was instituted so as to help facilitate, guide and monitor relevant activities for both Faculty and Students.',
    functions: [
      'Encourage Faculty members and students to enhance their technical skills through MOOCs such as Coursera, NPTEL, Udemy, IIRS-ISRO E-CLASS Platform etc.',
      'Encourage III year and IV year students to take NPTEL courses for credit transfer through SWAYAM platform as per guidelines of UGC, AICTE and MHRD.',
      'Encourage and motivate faculty and students to do Specialization certification Courses.',
      'Encourage faculty to enroll and actively participate in FDPs/Workshops.',
      'Faculty with less than 5 yrs experience are encouraged to do the NITTT modules (in accordance with AICTE Policies).',
      'Faculty are encouraged to take up AICTE approved FDP based online courses on the SWAYAM portal.',
      'Students are motivated to actively participate in Smart India Hackathon (SIH).'
    ],
    members: [
      { no: 1, name: 'Dr. M. Anuradha',      dept: 'CSE', role: 'Convenor' },
      { no: 2, name: 'Mr. Charan Singh',      dept: 'CSE', role: 'Member' },
      { no: 3, name: 'Ms. Haleema',           dept: 'CSE', role: 'Member' },
      { no: 4, name: 'Ms. B. Himabindu',      dept: 'IT',  role: 'Member' },
      { no: 5, name: 'Ms. Rajitha',           dept: 'IT',  role: 'Member' },
      { no: 6, name: 'Ms. Naga Sree Suma',    dept: 'CSE', role: 'Member' },
      { no: 7, name: 'Ms. Sharmeela Chungi',  dept: 'H&S', role: 'Member' },
    ]
  },
  {
    name: 'Course File Committee',
    icon: 'fa-folder-open', color: '#d97706',
    objectives: 'This committee ensures that the faculty submits their respective course files as per the given deadline with the specified format. Moreover, the committee takes steps to see to it that the additional materials in terms of contents beyond syllabus and mini projects are approved by IQAC. The committee verifies contents of the course file prepared and updated by the faculty.',
    functions: [
      'To prepare time lines for evaluation of the course files.',
      'To see that audit is conducted thrice a semester to evaluate the progress.',
      'Studying the Academic rules framed by the university and incorporating them in preparation of formats.',
      'To file and maintain the records of the audit report and submit the same to the IQAC Committee.'
    ],
    members: [
      { no: 1, name: 'Ms. Asha Sheldon',   dept: 'CSM', role: 'Convenor' },
      { no: 2, name: 'Dr. Kishore Babu',   dept: 'CSE', role: 'Member' },
      { no: 3, name: 'Ms. P. Aparna',      dept: 'DS',  role: 'Member' },
      { no: 4, name: 'Ms. Savitha Ramesh', dept: 'CSE', role: 'Member' },
      { no: 5, name: 'Ms. M Saradamani',   dept: 'H&S', role: 'Member' },
      { no: 6, name: 'Ms Lavanya Gattu',   dept: 'H&S', role: 'Member' },
    ]
  },
  {
    name: 'Feedback Committee',
    icon: 'fa-comment-dots', color: '#be123c',
    objectives: 'The committee monitors the feedback system that collects feedback from all stakeholders, namely, students, teachers, parents and alumni, once a year. The collective feedback are summarized and analyzed for the corrective measures and continuous improvements.',
    functions: [
      'To obtain objective opinion from the students about the effectiveness of the faculty and the facilities in the College.',
      'To prepare formats.',
      'For faculty feedback, achievement of course objectives, and infrastructure feedback.',
      'To file and maintain the records of the audit report and submit the same to the IQAC Committee.',
      'To set time lines as to when the feedback has to be taken.',
      'Send the feedback forms to departments for analysis and submit the report to college.'
    ],
    members: [
      { no: 1, name: 'Dr. J Pramada', dept: 'H&S', role: 'In-charge' },
      { no: 2, name: 'Dr. B Seshu',   dept: 'H&S', role: 'In-charge' },
    ]
  },
  {
    name: 'Lab Maintenance Committee',
    icon: 'fa-computer', color: '#1e40af',
    objectives: 'The intent of the lab committee is to impart education of the highest quality to the young minds, imbue them with specialized training, provide opportunities for innovation and research, and inspire them to be knowledgeable. The Lab Committee is responsible for equipment and work facilities in the research and teaching laboratories at the Institution.',
    functions: [
      'To find out the requirements for consumables for the laboratory and procure the same, before the start of every term.',
      'List of all the labs along with syllabus to be maintained.',
      'To see that the infrastructure facilities in the labs are adequate so that each batch has ample opportunity to complete practicals satisfactorily.',
      'Stock / Maintenance / Invoice / Student In-Out registers should be checked during the periodic inspections.',
      'Reports to be generated and submitted to the higher authorities.'
    ],
    members: [
      { no: 1, name: 'Dr. G Narender',      dept: 'IT',  role: 'Convenor' },
      { no: 2, name: 'Ms. M Nikitha',       dept: 'CSE', role: 'Member' },
      { no: 3, name: 'Mr. M Naresh',        dept: 'CSM', role: 'Member' },
      { no: 4, name: 'Ms. G Vanaja',        dept: 'CSD', role: 'Member' },
      { no: 5, name: 'Mr. G Rakesh Reddy', dept: 'CSE', role: 'Member' },
      { no: 6, name: 'Ms. S. Rama Laxmi',  dept: 'H&S', role: 'Member' },
    ]
  },
  {
    name: 'Training & Placement Committee',
    icon: 'fa-briefcase', color: 'var(--brand-orange-text)',
    objectives: 'Training and Placements Committee provides the official support for placement of final year students. The support services offered are in the form of readying students for and arranging On-campus/Pool-Campus Drives. The enthusiastic placements team strives for effectively striking a match between recruiter expectations and student aspirations.',
    functions: [
      'Enrolment of students.',
      'Training the students.',
      'Informing to do the Certifications in trained Field.',
      'Preparing the students for attending Interviews.'
    ],
    members: [
      { no: 1, name: 'Mr. D. Sudheer Reddy',    dept: 'T&P Cell',           role: 'Convenor' },
      { no: 2, name: 'Mr. Rajendra Tapadia',     dept: 'Consultant Trainer', role: 'Member' },
      { no: 3, name: 'Mr. B. Satyanarayana',     dept: 'CSE',                role: 'Member' },
      { no: 4, name: 'Mr. Krishna Subramanyam',  dept: 'CSE',                role: 'Member' },
      { no: 5, name: 'Mr. Srinivas Reddy',       dept: 'H&S',                role: 'Member' },
      { no: 6, name: 'Mr. Raja Satish',          dept: 'H&S',                role: 'Member' },
      { no: 7, name: 'Ms. J. Kamal Vijetha',     dept: 'AIML',               role: 'Member' },
    ]
  },
  {
    name: 'Alumni Committee',
    icon: 'fa-graduation-cap', color: '#9333ea',
    objectives: "KMIT's success is truly associated with the success of its Alumni. The KMIT Alumni Association aims to seamlessly connect with the institute, faculty, students and our associated alumni. Life members can access the KMITIANS database for their benefit.",
    functions: [],
    members: [
      { no: 1, name: 'Ms. N Surekha',      dept: 'H&S',  role: 'Convener' },
      { no: 2, name: 'Ms. M. V. Rama',     dept: 'H&S',  role: 'Member' },
      { no: 3, name: 'Mr. Ch Nagaraj',     dept: 'H&S',  role: 'Member' },
      { no: 4, name: 'Ms. J. Kamal Vijetha', dept: 'AIML', role: 'Member' },
      { no: 5, name: 'Mr. A Ravinder',     dept: 'DS',   role: 'Member' },
    ]
  },
  {
    name: 'Library Committee',
    icon: 'fa-book', color: '#0891b2',
    objectives: 'The Central Library began its existence in 2007. It is centrally located in the campus, surrounded by academic classrooms, laboratories, workshops, placement wing and sports grounds. It is divided into different sections like Stack area, Reading room, Reference and periodical Sections, Circulation, Digital library and Reprographic Section.',
    functions: [],
    members: [
      { no: 1, name: 'Mr. L. Sai Kiran',      dept: 'Library', role: 'Librarian' },
      { no: 2, name: 'Ms. M Bala Savitha',     dept: 'Library', role: 'Assistant Librarian' },
      { no: 3, name: 'Mr. K Rajesh',           dept: 'CSE',     role: 'Member' },
      { no: 4, name: 'Ms. M. Nikitha',         dept: 'IT',      role: 'Member' },
      { no: 5, name: 'Ms. B. Sandya Reddy',   dept: 'H&S',     role: 'Member' },
    ]
  },
  {
    name: 'Sports Committee',
    icon: 'fa-person-running', color: '#059669',
    objectives: 'The vision of the sports committee is to organize training, coaching and education in sports for everybody so that they can learn to keep themselves physically fit. The Committee aims at enhancing the interest of the participants in the field of sports — Football, Cricket, Basketball, Volleyball, Table tennis, Chess, Badminton.',
    functions: [
      'Give a proposal and events calendar every semester.',
      'All the permissions and grants provided from college to students and coaches.',
      'Award and document participation certificates and winners\' photographs.'
    ],
    members: [
      { no: 1, name: 'Mr. A Ravinder',       dept: 'CSD',          role: 'Convenor' },
      { no: 2, name: 'Ms. Shailega Pawar',   dept: 'Non-Teaching', role: 'Member' },
      { no: 3, name: 'Mr. K Reddiya Nayak',  dept: 'Non-Teaching', role: 'Member' },
    ]
  },
  {
    name: 'Arts & Cultural Committee',
    icon: 'fa-music', color: '#d97706',
    objectives: 'All extracurricular activities on campus are handled by the campus Student Council and various clubs instituted under it.',
    functions: [],
    members: []
  },
  {
    name: 'Purchase & Stores Committee',
    icon: 'fa-boxes-stacked', color: '#be123c',
    objectives: 'The Purchase & Stores Committee was established to review and evaluate purchasing documentation. The committee recommends the suppliers and service providers by evaluating price, quality, stock availability, etc.',
    functions: [
      'To scrutinise the quotations for purchase and provide recommendations.',
      'To ensure proper documentation of the purchase.',
      'To ensure quality, fairness, transparency and accountability in purchasing.'
    ],
    members: [
      { no: 1, name: 'Mr. S Nitin',           dept: 'Management',     role: 'Convenor' },
      { no: 2, name: 'Mr. K Surender Reddy',  dept: 'Administration', role: 'Co-ordinator' },
      { no: 3, name: 'Mr. Satish Kumar',       dept: 'Accounts',       role: 'Member' },
      { no: 4, name: 'Dr T Sunil Kumar',       dept: 'CSE',            role: 'Member' },
      { no: 5, name: 'Ms. K. Priyanka',        dept: 'CSE',            role: 'Member' },
    ]
  },
  {
    name: 'College Maintenance Committee',
    icon: 'fa-building-circle-check', color: '#0284c7',
    objectives: '',
    functions: [
      'Maintenance of physical property and facilities in the campus.',
      'Regular maintenance of the conditions of infrastructure and other equipments of the college.',
      'Review of the maintenance of campus building ground, utilities and other access points.',
      'Preventive maintenance like fire extinguishers.',
      'Monitoring routine cleanliness and neatness of the campus.',
      'Maintenance of RO system.',
      'To inspect the college utilities like R.O. plant, lift, water quality etc.',
      'To inspect electric items like printers, Xerox machines, access points, etc.'
    ],
    members: [
      { no: 1, name: 'Mr. K. Anil Kumar',   dept: 'CSD',          role: 'Convenor' },
      { no: 2, name: 'Ms. Madhurika',        dept: 'CSE',          role: 'Member' },
      { no: 3, name: 'Mr. G. Suresh',        dept: 'CSE',          role: 'Member' },
      { no: 4, name: 'Mr. C. Vikas',         dept: 'IT',           role: 'Member' },
      { no: 5, name: 'Mr. Kishore',          dept: 'Non-teaching', role: 'Hardware-in-Charge' },
      { no: 6, name: 'Mr. Surender Reddy',  dept: 'Non-teaching', role: 'Supervisor' },
    ]
  },
  {
    name: 'Unnat Bharat Abhiyan (UBA)',
    icon: 'fa-leaf', color: '#15803d',
    objectives: 'Unnat Bharat Abhiyan (UBA) is a flagship programme of the Ministry of Human Resource Development, with the intention to enrich Rural India. The knowledge base and resources of the Premier Institutions of the country are to be leveraged to bring in transformational change in the rural development process. KMIT has been selected from Telangana State under Unnat Bharat Abhiyan 2.0.',
    functions: [],
    members: [
      { no: 1, name: 'Mr. A Laxminarasimharao', dept: 'H&S', role: 'Convenor' },
      { no: 2, name: 'Mr. Sateesh Ravuri',       dept: 'H&S', role: 'Member' },
      { no: 3, name: 'Mr. G K Srinivas',         dept: 'H&S', role: 'Member' },
      { no: 4, name: 'Ms. K. Priyanka',          dept: 'CSE', role: 'Member' },
    ]
  },
  {
    name: 'Women Protection Cell',
    icon: 'fa-shield-heart', color: '#9333ea',
    objectives: '',
    functions: [],
    members: [
      { no: 1, name: 'Dr B L Malleswari', dept: 'Principal',           role: 'Chairperson' },
      { no: 2, name: 'Dr Udaya Laxmi',    dept: 'Assistant Professor', role: 'Convener' },
      { no: 3, name: 'Dr M Anuradha',     dept: 'Assistant Professor', role: 'Member' },
      { no: 4, name: 'Ms Sandhya Redy',   dept: 'Assistant Professor', role: 'Member' },
      { no: 5, name: 'Ms Gattu Lavanya',  dept: 'Assistant Professor', role: 'Member' },
      { no: 6, name: 'Ms Priyanka Saxena',dept: 'Assistant Professor', role: 'Member' },
    ]
  },
  {
    name: 'Internal Complaint Committee',
    icon: 'fa-file-circle-exclamation', color: '#dc2626',
    objectives: '',
    functions: [],
    members: [
      { no: 1, name: 'Dr B L Malleswari',  dept: 'Principal',            role: 'Chairperson' },
      { no: 2, name: 'Dr Narender',         dept: 'Associate Professor',  role: 'Convener' },
      { no: 3, name: 'Mr A Ravinder',       dept: 'Assistant Professor',  role: 'Member' },
      { no: 4, name: 'Mr B Niranjan Babu', dept: 'Assistant Professor',  role: 'Member' },
      { no: 5, name: 'Mr Para Upender',     dept: 'Assistant Professor',  role: 'Member' },
    ]
  },
  {
    name: 'Social Welfare Committee',
    icon: 'fa-hands-holding-heart', color: '#059669',
    objectives: '',
    functions: [],
    members: [
      { no: 1, name: 'Mr Ravinder Amgoth', dept: 'Assistant Professor',  role: 'Convener' },
      { no: 2, name: 'Mr Raghava',          dept: 'Non-teaching Staff',   role: 'Member' },
      { no: 3, name: 'Mr Goverdhan',        dept: 'Assistant Professor',  role: 'Member' },
      { no: 4, name: 'Ms Lavanya Gattu',    dept: 'Assistant Professor',  role: 'Member' },
      { no: 5, name: 'Mr M Shanker',        dept: 'Assistant Professor',  role: 'Member' },
      { no: 6, name: 'Mr B Srinu',          dept: 'Assistant Professor',  role: 'Member' },
      { no: 7, name: 'Mr K Rajesh',         dept: 'Assistant Professor',  role: 'Member' },
      { no: 8, name: 'Mr T Vamsidhar',      dept: 'Assistant Professor',  role: 'Member' },
    ]
  },
]

// ── Accordion row component ──────────────────────────────────────────────────
function CommitteeRow({ c }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="committee-row" style={{ 
      background: 'var(--white)', 
      borderRadius: '16px', 
      border: open ? `1px solid ${c.color}50` : '1px solid var(--light-grey)', 
      overflow: 'hidden',
      marginBottom: '1rem',
      boxShadow: open ? `0 10px 30px ${c.color}15` : '0 4px 10px rgba(0,0,0,0.03)',
      transition: 'all 0.3s ease'
    }}>
      {/* Header */}
      <button
        className="committee-row-btn"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', 
          background: open ? `${c.color}05` : 'transparent',
          border: 'none', 
          padding: '1.5rem 2rem', 
          cursor: 'pointer',
          display: 'flex', 
          alignItems: 'center', 
          gap: '1.5rem', 
          textAlign: 'left',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.background = '#f8f9fc'; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.background = 'transparent'; }}
      >
        <div style={{
          width: '50px', 
          height: '50px', 
          borderRadius: '14px', 
          flexShrink: 0,
          background: open ? c.color : `${c.color}15`, 
          display: 'grid', 
          placeItems: 'center',
          color: open ? '#fff' : c.color, 
          fontSize: '1.2rem',
          transition: 'all 0.3s ease'
        }}>
          <i className={`fa-solid ${c.icon}`} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.1rem', letterSpacing: '-0.3px', marginBottom: '0.2rem' }}>{c.name}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
            {c.objectives ? 'View Mandate & Members' : 'View Members'}
          </div>
        </div>
        <span style={{ 
          fontSize: '0.75rem', 
          color: open ? c.color : 'var(--text-muted)', 
          background: open ? `${c.color}15` : 'var(--off-white)', 
          padding: '5px 14px', 
          borderRadius: '20px', 
          fontWeight: '800', 
          flexShrink: 0,
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}>
          {c.members.length > 0 ? `${c.members.length} Members` : 'Details'}
        </span>
        <div style={{ 
          width: '32px', height: '32px', 
          borderRadius: '50%', background: open ? `${c.color}20` : 'var(--light-grey)', 
          display: 'grid', placeItems: 'center', 
          color: open ? c.color : 'var(--text-muted)', 
          marginLeft: '0.5rem', flexShrink: 0,
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease, background 0.3s ease, color 0.3s ease'
        }}>
          <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.8rem' }} />
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="committee-row-content" style={{ padding: '0 2rem 2rem 5.25rem', background: open ? `${c.color}05` : '#f8f9fc', borderTop: `1px solid ${c.color}20` }}>
          {/* Objectives */}
          {c.objectives && (
            <div style={{ padding: '1.2rem 0 1rem' }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: c.color, fontWeight: '800', marginBottom: '0.5rem' }}>About</div>
              <p style={{ color: 'var(--text-dark)', lineHeight: '1.8', fontSize: '0.9rem', margin: 0 }}>{c.objectives}</p>
            </div>
          )}

          {/* Functions */}
          {c.functions.length > 0 && (
            <div style={{ paddingBottom: '1rem' }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--navy)', fontWeight: '800', marginBottom: '0.8rem' }}>Functions</div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {c.functions.map((f, i) => (
                  <li key={i} style={{ color: 'var(--text-dark)', fontSize: '0.88rem', lineHeight: '1.7' }}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Member table */}
          {c.members.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: c.color, fontWeight: '800', marginBottom: '0.8rem' }}>Committee Members</div>
              <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid var(--light-grey)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                      <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontWeight: '700', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', width: '40px' }}>S.No</th>
                      <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontWeight: '700', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Name of the Member</th>
                      <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontWeight: '700', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Department</th>
                      <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontWeight: '700', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Designation in Committee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.members.map((m, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fc', borderBottom: '1px solid var(--light-grey)' }}>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontWeight: '700' }}>{m.no}</td>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--navy)', fontWeight: '700' }}>{m.name}</td>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--text-dark)' }}>{m.dept}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span style={{
                            background: m.role === 'Chairperson' ? 'rgba(165,28,48,0.1)' : m.role.includes('Convener') || m.role.includes('Convenor') ? 'rgba(255,107,0,0.1)' : 'rgba(10,22,40,0.05)',
                            color: m.role === 'Chairperson' ? 'var(--crimson)' : m.role.includes('Convener') || m.role.includes('Convenor') ? 'var(--vibrant-accent)' : 'var(--text-dark)',
                            padding: '3px 10px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: '700'
                          }}>{m.role}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CommitteesPage() {
  return (
    <PageShell
      eyebrow="Administration & Committees"
      title="Institutional"
      titleEm="Committees"
      description="KMIT operates through a robust structure of 28+ specialised committees ensuring transparency, compliance, student welfare, and academic quality across all institutional operations."
      breadcrumbs={[{ label: 'Administration & Committees', to: '/administration/hod' }, { label: 'Other Committees' }]}
    >
      {/* ── Intro Banner ─────────────────────────────────────── */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="committees-intro-banner" style={{
              background: 'linear-gradient(135deg, var(--navy) 0%, #1a4080 100%)',
              borderRadius: '24px', padding: '3.5rem',
              display: 'grid', gridTemplateColumns: '1fr auto',
              gap: '3rem', alignItems: 'center',
              position: 'relative', overflow: 'hidden',
              boxShadow: 'var(--shadow-lift)'
            }}>
              <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', marginBottom: '0.6rem', fontWeight: '800' }}>Administrative Governance</div>
                <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem', fontWeight: '800' }}>
                  Other <span style={{ color: 'var(--vibrant-accent)' }}>Committees</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: '1.8', maxWidth: '680px', margin: 0 }}>
                  KMIT maintains a comprehensive committee structure to ensure student welfare, academic integrity, campus safety, and regulatory compliance. Each committee is headed by senior faculty and operates under UGC/AICTE guidelines. Click any committee below to view its objectives, functions, and full member table.
                </p>
              </div>
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--vibrant-accent)' }}>28+</div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Active Committees</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Accordion ─────────────────────────────────────────── */}
      <section className="page-section-alt">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
              <div className="section-eyebrow"><i className="fa-solid fa-list-check" /> Directory</div>
              <h2>Committees <em>Directory</em></h2>
              <div className="section-divider" />
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.9rem' }}>Click on a committee to view its details, objectives, functions, and member table.</p>
            </div>
          </ScrollReveal>

          <div style={{ maxWidth: '960px', margin: '3rem auto 0', display: 'flex', flexDirection: 'column' }}>
            {committees.map((c, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 50}>
                <CommitteeRow c={c} />
              </ScrollReveal>
            ))}
          </div>

          {/* Grievance note */}
          <ScrollReveal animation="fade-up">
            <div style={{
              maxWidth: '960px', margin: '3rem auto 0',
              background: 'var(--white)', borderRadius: '16px', padding: '2rem 2.5rem',
              border: '1px solid var(--light-grey)', boxShadow: 'var(--shadow-sm)',
              display: 'flex', gap: '1.5rem', alignItems: 'flex-start'
            }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(165,28,48,0.08)', borderRadius: '12px', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <i className="fa-solid fa-triangle-exclamation" style={{ color: 'var(--brand-orange-text)', fontSize: '1.2rem' }} />
              </div>
              <div>
                <h4 style={{ color: 'var(--navy)', fontWeight: '800', marginBottom: '0.4rem' }}>Grievance & Welfare</h4>
                <p style={{ color: 'var(--text-dark)', fontSize: '0.9rem', lineHeight: '1.75', margin: 0 }}>
                  KMIT is committed to maintaining a safe and healthy environment for all students, faculty, and staff. We are committed to maintaining a safe and healthy environment for all students. Contact the respective committee directly or use the online grievance portal available on the KMIT website.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  )
}
