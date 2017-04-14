const courses = [
  /* Udacity */
  {
    id: 'ud206',
    title: 'Shell Workshop',
    description: 'A quick, one-lesson introduction to the Unix-style command-line environment. This course is intended to get you up to speed on the shell — using a terminal, managing files and directories, and running command-line programs.',
    photoUrl: 'https://lh3.googleusercontent.com/s2S7Q8NyH4OlJ8Evfgdm08DDn9xyT6gUsbxZd3eN9Fpr9p_QAnZZfocSbgFG0uwvBQC4vElFS_zJ5btSRg=s0#w=1440&h=780',
    partnerId: 'udacity',
  },
  {
    id: 'ud303',
    title: 'HTTP & Web Servers',
    description: "This course is intended for budding full-stack web developers to master the basics of HTTP, the protocol that underlies all web technology. In this course, you'll explore HTTP directly, talking with web servers and browsers by hand. You'll write and deploy low-level web applications in Python. And you'll learn more about how HTTP connects with other web technologies.",
    photoUrl: 'https://lh3.googleusercontent.com/MQllxxio7I1smqIMnxsa8V_LzaHEi_gOFxlPYhnI0oSzNk8LtLdflV3IPqzk0j4plFb51gX9crjwVHSV3A=s0#w=1440&h=780',
    partnerId: 'udacity',
  },
  {
    id: 'ud1015',
    title: 'VR Platforms & Applications',
    description: 'Learn stuff.',
    photoUrl: '',
    partnerId: 'udacity',
  },
  {
    id: 'ud1016',
    title: 'Designing in VR',
    description: 'Learn stuff.',
    photoUrl: '',
    partnerId: 'udacity',
  },
  {
    id: 'ud1014',
    title: 'VR Software Development',
    description: 'This course is designed to teach you how to make your VR experience more dynamic and responsive to your users. You will be exposed to C# programming and using it in the Unity interface. Upon completing this course,, you will have learned basic programming constructs such as methods, loops, variables, and using events and how to apply them in a VR environment.',
    photoUrl: 'https://lh3.googleusercontent.com/8OcQ_YMQSsZN83C4hMQJkrSIQX4_r5AYnUM5QOBx_t4v8fdqqwqa-9p5hpBVKY9ili-9uEzdKisuNNXyymwj=s0#w=1552&h=1012',
    partnerId: 'udacity',
  },
  {
    id: 'ud1031',
    title: 'Server-Side Swift',
    description: "In this course, you'll learn how to utilize Swift as a server-side language for building end-to-end applications. You'll learn by doing — creating projects with Swift clients and servers as well as middleware components that can leverage the power of services in the cloud. You'll also work with custom tooling specifically designed to reduce developer friction and let you work in a native environment regardless of whether you're implementing the client or the server.",
    photoUrl: '',
    partnerId: 'udacity',
  },

  /* Coursera */
  {
    id: '69Bku0KoEeWZtA4u62x6lQ',
    title: 'Gamification',
    description: "Gamification is the application of game elements and digital game design techniques to non-game problems, such as business and social impact challenges. This course will teach you the mechanisms of gamification, why it has such tremendous potential, and how to use it effectively. For additional information on the concepts described in the course, you can purchase Professor Werbach's book For the Win: How Game Thinking Can Revolutionize Your Business in print or ebook format in several languages.",
    photoUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/topics/gamification/large-icon.png',
    partnerId: 'coursera',
  },
  {
    id: '0HiU7Oe4EeWTAQ4yevf_oQ',
    title: 'Dealing With Missing Data',
    description: 'This course will cover the steps used in weighting sample surveys, including methods for adjusting for nonresponse and using data external to the survey for calibration. Among the techniques discussed are adjustments using estimated response propensities, poststratification, raking, and general regression estimation. Alternative techniques for imputing values for missing items will be discussed. For both weighting and imputation, the capabilities of different statistical software packages will be covered, including R®, Stata®, and SAS®.',
    photoUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/dd/8e0e60f75a11e5a5175d8aed3cf3b0/AdobeStock_83781931.jpg',
    partnerId: 'coursera',
  },
  {
    id: '5zjIsJq-EeW_wArffOXkOw',
    title: 'Vital Signs: Understanding What the Body Is Telling Us',
    description: 'The vital signs – heart rate, blood pressure, body temperature, respiration rate, and pain – communicate important information about the physiological status of the human body. In this six-part course we explore the anatomy and physiology underlying the vital signs so that you will develop a systematic, integrated understanding of how the body functions. Relevant body systems are reviewed including cardiovascular and respiratory, followed by explanations of how the function of these systems affects vital signs. We discuss normal ranges, normal variants, and the mechanisms that underlie changes in the objective measurement of vital signs. The course also includes demonstrations of appropriate techniques for measuring vital signs in yourself and others. The course is designed for a broad, general audience but will be particularly interesting for individuals working in healthcare, those considering a career as a healthcare professional, lay caregivers, those with an interest in personal health and fitness, or anyone who simply wants to understand how the body functions.',
    photoUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/55/8d2e309e6811e3bf47177a6a987fca/Vital-Signs-1.png',
    partnerId: 'coursera',
  },
  {
    id: 'v9CQdBkhEeWjrA6seF25aw',
    title: 'Modern Art & Ideas',
    description: 'Welcome to Modern Art & Ideas! This course is designed to help anyone interested in learning more about modern and contemporary art. Themes can provide an effective structure for engaging with art. In this course, you will explore four themes that educators at The Museum of Modern Art use frequently in their teaching: Places & Spaces, Art & Identity, Transforming Everyday Objects, and Art & Society. Through videos, slideshows, and a variety of resources, readings, and activities, you will explore the content and context of works of art in MoMA’s collection. Learners will… - Explore works of modern and contemporary art through a variety of accessible and relevant themes. - Hear directly from artists about their ideas and processes. - Gain exposure to a range of digital resources available for continually engaging with works of art.',
    photoUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/65/78ce0081ad11e681d7bb31b0a632ef/starry-night.jpg',
    partnerId: 'coursera',
  },
  {
    id: 'QgmoVdT2EeSlhSIACx2EBw',
    title: 'The Evolving Universe',
    description: 'This is an introductory astronomy survey class that covers our understanding of the physical universe and its major constituents, including planetary systems, stars, galaxies, black holes, quasars, larger structures, and the universe as a whole.',
    photoUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/c9/2238c0bb9211e4b43859e37616f9c4/desktop.jpeg',
    partnerId: 'coursera',
  },
];

export default courses;
