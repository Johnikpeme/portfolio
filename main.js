// Create the app container
const app = document.getElementById('app');
app.style.background = '#FFFFFF';
app.style.minHeight = '100vh';
app.style.overflow = 'auto';
app.style.fontFamily = "'Sora', sans-serif";

// Load Sora Font Dynamically
const loadFonts = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Sora:wght@400;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};
loadFonts();

// Navigation Bar (Sticky and Bold Links) - Updated to include Publications and mobile responsiveness
const createNav = () => {
  const nav = document.createElement('nav');
  nav.style.display = 'flex';
  nav.style.justifyContent = 'space-between';
  nav.style.alignItems = 'center';
  nav.style.padding = '20px 40px';
  nav.style.background = '#FFFFFF';
  nav.style.position = 'fixed';
  nav.style.top = '0';
  nav.style.left = '0';
  nav.style.right = '0';
  nav.style.zIndex = '1000';
  nav.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
  app.appendChild(nav);

  const logo = document.createElement('div');
  logo.innerHTML = `
    <img src="assets/logo.png" alt="Logo" style="width: 20px; height: 20px; margin-right: 5px; vertical-align: middle;">
    Portfolio
  `;
  logo.style.display = 'flex';
  logo.style.alignItems = 'center';
  logo.style.fontWeight = '700';
  nav.appendChild(logo);

  const links = document.createElement('div');
  links.style.display = 'flex';
  links.style.gap = '30px';
  nav.appendChild(links);

  const navItems = ['About Me', 'Skills', 'Project', 'Publications', 'Contact Me'];
  navItems.forEach(item => {
    const link = document.createElement('a');
    link.href = `#${item.toLowerCase().replace(/\s/g, '-')}`;
    link.textContent = item;
    link.style.textDecoration = 'none';
    link.style.color = '#000000';
    link.style.fontSize = '18px';
    link.style.fontWeight = '700';
    links.appendChild(link);
  });

  const resumeLink = document.createElement('a');
  resumeLink.href = 'https://drive.google.com/file/d/14T3Hr-QznZV-V5Ofxqr4nwIx-rh_PqUV/view?usp=sharing';
  resumeLink.target = '_blank';
  resumeLink.rel = 'noopener noreferrer';
  resumeLink.download = '';
  resumeLink.style.textDecoration = 'none';
  resumeLink.style.display = 'inline-block';

  const resumeButton = document.createElement('button');
  resumeButton.innerHTML = `
    Resume 
    <img src="assets/download.png" alt="Download" style="width: 14px; height: 14px; margin-left: 5px; vertical-align: middle;">
  `;
  resumeButton.style.padding = '10px 20px';
  resumeButton.style.background = '#000000';
  resumeButton.style.color = '#FFFFFF';
  resumeButton.style.border = 'none';
  resumeButton.style.borderRadius = '5px';
  resumeButton.style.cursor = 'pointer';
  resumeButton.style.fontWeight = '700';
  resumeButton.style.display = 'flex';
  resumeButton.style.alignItems = 'center';

  resumeLink.appendChild(resumeButton);
  nav.appendChild(resumeLink);

  gsap.from(nav, { duration: 1, y: -50, opacity: 0, ease: 'power3.out' });

  // Mobile responsiveness
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const handleMobileNav = (e) => {
    if (e.matches) {
      // Adjust nav padding and hide links by default
      nav.style.padding = '15px 20px';
      links.style.display = 'none';
      resumeButton.style.padding = '8px 15px';
      resumeButton.style.fontSize = '14px';

      // Remove existing hamburger if present to avoid duplicates
      if (nav.querySelector('.hamburger')) {
        nav.removeChild(nav.querySelector('.hamburger'));
      }

      // Add hamburger menu
      const hamburger = document.createElement('div');
      hamburger.className = 'hamburger';
      hamburger.innerHTML = '☰';
      hamburger.style.fontSize = '24px';
      hamburger.style.cursor = 'pointer';
      nav.appendChild(hamburger);

      // Toggle links visibility on hamburger click
      hamburger.addEventListener('click', () => {
        links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
        links.style.flexDirection = 'column';
        links.style.position = 'absolute';
        links.style.top = '60px';
        links.style.right = '20px';
        links.style.background = '#FFFFFF';
        links.style.padding = '10px';
        links.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        links.style.gap = '15px'; // Adjusted gap for vertical layout
      });
    } else {
      // Reset to desktop styles
      nav.style.padding = '20px 40px';
      links.style.display = 'flex';
      links.style.flexDirection = 'row';
      links.style.position = 'static';
      links.style.background = 'none';
      links.style.padding = '0';
      links.style.boxShadow = 'none';
      links.style.gap = '30px';
      resumeButton.style.padding = '10px 20px';
      resumeButton.style.fontSize = '16px';

      // Remove hamburger menu if present
      if (nav.querySelector('.hamburger')) {
        nav.removeChild(nav.querySelector('.hamburger'));
      }
    }
  };

  // Add event listener for screen size changes and run initial check
  mediaQuery.addEventListener('change', handleMobileNav);
  handleMobileNav(mediaQuery);
};
createNav();

// Add a spacer to prevent content from being hidden under the fixed nav
const navSpacer = document.createElement('div');
navSpacer.style.height = '80px';
app.appendChild(navSpacer);

// Hero Section
const createHero = () => {
  const hero = document.createElement('section');
  hero.id = 'hero';
  hero.style.display = 'flex';
  hero.style.justifyContent = 'flex-start';
  hero.style.alignItems = 'center';
  hero.style.padding = '50px 40px';
  hero.style.background = '#FFFFFF';
  hero.style.gap = '20px';
  app.appendChild(hero);

  const textContainer = document.createElement('div');
  textContainer.style.maxWidth = '50%';
  hero.appendChild(textContainer);

  const greeting = document.createElement('h1');
  greeting.innerHTML = `Hello I'm <span style="font-weight: 900;">John Ikpeme.</span>`;
  greeting.style.fontSize = '48px';
  greeting.style.fontWeight = '400';
  greeting.style.color = '#000000';
  textContainer.appendChild(greeting);

  const title = document.createElement('h2');
  title.textContent = 'Data Scientist, ML Engineer & Frontend Developer';
  title.style.fontSize = '36px';
  title.style.fontWeight = '700';
  title.style.color = '#000000';
  title.style.margin = '10px 0';
  textContainer.appendChild(title);

  const bio = document.createElement('p');
  bio.textContent = "I thrive on turning raw data into actionable insights, building intelligent systems, and crafting seamless user experiences. Whether it's developing machine learning models, automating workflows, creating real-time monitoring tools, or designing interactive web applications, I bring a hands-on approach to problem-solving with data and technology. With over six years of experience, I bridge the gap between data science, automation, and front-end development to build scalable and impactful solutions.";
  bio.style.fontSize = '16px';
  bio.style.fontWeight = '400';
  bio.style.color = '#666666';
  bio.style.lineHeight = '1.6';
  textContainer.appendChild(bio);

  const socialIcons = document.createElement('div');
  socialIcons.style.display = 'flex';
  socialIcons.style.gap = '20px';
  socialIcons.style.marginTop = '50px';
  textContainer.appendChild(socialIcons);

  const socials = [
    { name: 'github', link: 'https://github.com/Johnikpeme' },
    { name: 'linkedin', link: 'https://www.linkedin.com/in/john-i-02b82397/' },
    { name: 'twitter', link: 'https://x.com/johnikpeme_' }
  ];

  socials.forEach(social => {
    const iconLink = document.createElement('a');
    iconLink.href = social.link;
    iconLink.target = '_blank';
    iconLink.rel = 'noopener noreferrer';

    const iconContainer = document.createElement('div');
    iconContainer.style.width = '50px';
    iconContainer.style.height = '50px';
    iconContainer.style.background = '#FFFFFF';
    iconContainer.style.border = '2px solid #000000';
    iconContainer.style.borderRadius = '5px';
    iconContainer.style.display = 'flex';
    iconContainer.style.alignItems = 'center';
    iconContainer.style.justifyContent = 'center';
    iconContainer.style.transition = 'all 0.3s ease-in-out';

    const icon = document.createElement('img');
    icon.src = `assets/${social.name}.png`;
    icon.alt = `${social.name} icon`;
    icon.style.width = '30px';
    icon.style.height = '30px';
    icon.style.transition = 'all 0.3s ease-in-out';

    iconContainer.addEventListener('mouseenter', () => {
      iconContainer.style.background = '#000000';
      icon.src = `assets/${social.name}_active.png`;
    });

    iconContainer.addEventListener('mouseleave', () => {
      iconContainer.style.background = '#FFFFFF';
      icon.src = `assets/${social.name}.png`;
    });

    iconContainer.appendChild(icon);
    iconLink.appendChild(iconContainer);
    socialIcons.appendChild(iconLink);
  });

  const imageContainer = document.createElement('div');
  imageContainer.style.maxWidth = '45%';
  imageContainer.style.overflow = 'hidden';
  imageContainer.style.display = 'flex';
  imageContainer.style.justifyContent = 'flex-start';
  hero.appendChild(imageContainer);

  const image = document.createElement('img');
  image.src = './assets/picture.png';
  image.style.width = '110%';
  image.style.height = 'auto';
  image.style.objectFit = 'contain';
  imageContainer.appendChild(image);

  gsap.from(textContainer, { duration: 1, x: -100, opacity: 0, ease: 'power3.out' });
  gsap.from(imageContainer, { duration: 1, x: 100, opacity: 0, ease: 'power3.out', delay: 0.5 });

  // Mobile responsiveness
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const handleMobileHero = (e) => {
    if (e.matches) {
      hero.style.flexDirection = 'column';
      hero.style.padding = '30px 20px';
      textContainer.style.maxWidth = '100%';
      imageContainer.style.maxWidth = '100%';
      greeting.style.fontSize = '32px';
      title.style.fontSize = '24px';
      bio.style.fontSize = '14px';
      socialIcons.style.marginTop = '20px';
    } else {
      hero.style.flexDirection = 'row';
      hero.style.padding = '50px 40px';
      textContainer.style.maxWidth = '50%';
      imageContainer.style.maxWidth = '45%';
      greeting.style.fontSize = '48px';
      title.style.fontSize = '36px';
      bio.style.fontSize = '16px';
      socialIcons.style.marginTop = '50px';
    }
  };
  mediaQuery.addEventListener('change', handleMobileHero);
  handleMobileHero(mediaQuery);
};
createHero();

// Skills Section
const createSkills = () => {
  const skills = document.createElement('section');
  skills.id = 'skills';
  skills.style.padding = '50px 40px';
  skills.style.background = '#FFFFFF';
  app.appendChild(skills);

  const title = document.createElement('h2');
  title.innerHTML = 'My <span style="font-weight: 700;">Tech Stack</span>';
  title.style.fontSize = '36px';
  title.style.fontWeight = '400';
  title.style.color = '#000000';
  title.style.textAlign = 'center';
  title.style.marginBottom = '40px';
  skills.appendChild(title);

  const skillsGrid = document.createElement('div');
  skillsGrid.style.display = 'grid';
  skillsGrid.style.gridTemplateColumns = 'repeat(5, 1fr)';
  skillsGrid.style.gap = '20px';
  skillsGrid.style.maxWidth = '1000px';
  skillsGrid.style.margin = '0 auto';
  skills.appendChild(skillsGrid);

  const skillItems = [
    { name: 'Git', icon: 'https://img.icons8.com/?size=100&id=106562&format=png&color=000000/50x50' },
    { name: 'Postgres', icon: 'https://img.icons8.com/?size=100&id=36440&format=png&color=000000/50x50' },
    { name: 'MsSql', icon: 'https://img.icons8.com/?size=100&id=11625&format=png&color=000000/50x50' },
    { name: 'MongoDB', icon: './assets/mongo.png' },
    { name: 'Power-Bi', icon: 'https://img.icons8.com/?size=100&id=QMTbsd0FVhHS&format=png&color=000000/50x50' },
    { name: 'Tableau', icon: 'https://img.icons8.com/?size=100&id=TH2qcEeVxMYI&format=png&color=000000/50x50' },
    { name: 'Python', icon: 'https://img.icons8.com/?size=100&id=101379&format=png&color=000000/50x50' },
    { name: 'Scikit-learn', icon: 'https://img.icons8.com/?size=100&id=jB3Wvby1qc6e&format=png&color=000000/50x50' },
    { name: 'Keras', icon: 'https://img.icons8.com/?size=100&id=XcSgtbIpgK6W&format=png&color=000000/50x50' },
    { name: 'TensorFlow', icon: './assets/tensor.png' },
    { name: 'React Js', icon: 'https://img.icons8.com/?size=100&id=122637&format=png&color=000000/50x50' },
    { name: 'Javascript', icon: 'https://img.icons8.com/?size=100&id=39854&format=png&color=000000/50x50' },
    { name: 'Power Automate', icon: './assets/automate.png' },
    { name: 'Figma', icon: 'https://img.icons8.com/?size=100&id=amXjtNWVYSKP&format=png&color=000000/50x50' },
    { name: 'Flask', icon: 'https://img.icons8.com/?size=100&id=MHcMYTljfKOr&format=png&color=000000' },
  ];

  skillItems.forEach((skill, index) => {
    const skillCard = document.createElement('div');
    skillCard.style.display = 'flex';
    skillCard.style.flexDirection = 'column';
    skillCard.style.alignItems = 'center';
    skillCard.style.padding = '20px';
    skillCard.style.background = '#F5F5F5';
    skillCard.style.borderRadius = '10px';
    skillCard.style.transition = 'background 0.3s ease';
    skillsGrid.appendChild(skillCard);

    skillCard.addEventListener('mouseenter', () => {
      skillCard.style.background = '#E0E0E0';
    });

    skillCard.addEventListener('mouseleave', () => {
      skillCard.style.background = '#F5F5F5';
    });

    const icon = document.createElement('div');
    icon.style.width = '50px';
    icon.style.height = '50px';
    icon.style.background = `url(${skill.icon})`;
    icon.style.backgroundSize = 'contain';
    icon.style.backgroundRepeat = 'no-repeat';
    skillCard.appendChild(icon);

    const name = document.createElement('p');
    name.textContent = skill.name;
    name.style.fontSize = '16px';
    name.style.fontWeight = '400';
    name.style.color = '#000000';
    name.style.marginTop = '10px';
    skillCard.appendChild(name);

    gsap.from(skillCard, { duration: 1, opacity: 0, y: 50, ease: 'power3.out', delay: index * 0.1 });
  });

  // Mobile responsiveness
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const handleMobileSkills = (e) => {
    if (e.matches) {
      skills.style.padding = '30px 20px';
      skillsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
      title.style.fontSize = '28px';
    } else {
      skills.style.padding = '50px 40px';
      skillsGrid.style.gridTemplateColumns = 'repeat(5, 1fr)';
      title.style.fontSize = '36px';
    }
  };
  mediaQuery.addEventListener('change', handleMobileSkills);
  handleMobileSkills(mediaQuery);
};
createSkills();

// Experience Section
const createExperience = () => {
  const experience = document.createElement('section');
  experience.id = 'experience';
  experience.style.padding = '50px 40px';
  experience.style.background = '#000000';
  experience.style.color = '#FFFFFF';
  app.appendChild(experience);

  const title = document.createElement('h2');
  title.innerHTML = 'My <span style="font-weight: 700;">Experience</span>';
  title.style.fontSize = '36px';
  title.style.fontWeight = '400';
  title.style.textAlign = 'center';
  title.style.marginBottom = '40px';
  experience.appendChild(title);

  const expList = document.createElement('div');
  expList.style.maxWidth = '90%';
  expList.style.margin = '0 auto';
  experience.appendChild(expList);

  const experiences = [
    {
      company: 'Sterling Bank',
      logo: 'assets/sterling.png',
      role: 'Enterprise Intelligence Analyst',
      date: 'Mar 2023 - Present',
      description: 'Developed and led OneMonitor, a real-time performance tracking application for major bank products on web and mobile, integrating 20+ dashboards for platforms like OneBank, USSD, and Specta. Automated data pipelines using MS SQL and PostgreSQL to generate efficient insights and built interactive Python Dash dashboards for enhanced monitoring. Designed and deployed an AI-powered incident tracking bot that leveraged machine learning models to automate ticket classification and assignment, significantly reducing resolution time by directing issues to the appropriate departments. Compiled detailed customer experience reports to improve service offerings and contributed to the Self-Service Project by automating processes to streamline stakeholder decision-making.'
    },
    {
      company: 'Dash Studios',
      logo: 'assets/dash.png',
      role: 'Co-Founder & CEO',
      date: 'Nov 2019 - Present',
      description: 'Expanded the Nouns Hunt user base to over 10,000 players across 65 countries, earning multiple awards, including Debut of the Year. Leveraged Google Analytics, SQL, and Tableau to analyze user behavior, shaping data-driven game development and marketing strategies. Boosted player retention by 90% through enhanced user experience and sustained a competitive edge with in-depth market analysis.'
    },
    {
      company: 'UAC',
      logo: 'assets/uac.png',
      role: 'Data Analyst',
      date: 'Jan 2021 - Dec 2021',
      description: 'Increased sales by 40% in Cross River’s South Region by implementing talent forecasting and predictive modeling. Optimized team structures and efficiency using data-driven workforce strategies. Developed machine learning models with Python and scikit-learn, driving higher platform adoption among South-South distributors.'
    }
  ];

  experiences.forEach((exp, index) => {
    const expCard = document.createElement('div');
    expCard.style.padding = '20px';
    expCard.style.background = '#1A1A1A';
    expCard.style.borderRadius = '10px';
    expCard.style.marginBottom = '20px';
    expList.appendChild(expCard);

    const companyDiv = document.createElement('div');
    companyDiv.style.display = 'flex';
    companyDiv.style.alignItems = 'center';

    if (exp.logo) {
      const logo = document.createElement('img');
      logo.src = exp.logo;
      logo.alt = `${exp.company} Logo`;
      logo.style.height = '24px';
      logo.style.marginRight = '8px';
      companyDiv.appendChild(logo);
    }

    const company = document.createElement('h3');
    company.textContent = exp.company;
    company.style.fontSize = '24px';
    company.style.fontWeight = '700';
    company.style.color = '#FFFFFF';
    companyDiv.appendChild(company);
    expCard.appendChild(companyDiv);

    const role = document.createElement('p');
    role.textContent = exp.role;
    role.style.fontSize = '18px';
    role.style.fontWeight = '400';
    role.style.color = '#FFFFFF';
    role.style.margin = '5px 0';
    expCard.appendChild(role);

    const date = document.createElement('p');
    date.textContent = exp.date;
    date.style.fontSize = '16px';
    date.style.fontWeight = '400';
    date.style.color = '#666666';
    date.style.marginBottom = '10px';
    expCard.appendChild(date);

    const description = document.createElement('p');
    description.textContent = exp.description;
    description.style.fontSize = '16px';
    description.style.fontWeight = '400';
    description.style.color = '#CCCCCC';
    description.style.lineHeight = '1.6';
    expCard.appendChild(description);

    gsap.from(expCard, { duration: 1, opacity: 0, y: 50, ease: 'power3.out', delay: index * 0.3 });
  });

  // Mobile responsiveness
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const handleMobileExperience = (e) => {
    if (e.matches) {
      experience.style.padding = '30px 20px';
      title.style.fontSize = '28px';
      expList.style.maxWidth = '100%';
    } else {
      experience.style.padding = '50px 40px';
      title.style.fontSize = '36px';
      expList.style.maxWidth = '90%';
    }
  };
  mediaQuery.addEventListener('change', handleMobileExperience);
  handleMobileExperience(mediaQuery);
};
createExperience();

// About Me Section
const createAbout = () => {
  const about = document.createElement('section');
  about.id = 'about-me';
  about.style.display = 'flex';
  about.style.justifyContent = 'space-between';
  about.style.alignItems = 'center';
  about.style.padding = '50px 40px';
  about.style.background = '#FFFFFF';
  app.appendChild(about);

  const imageContainer = document.createElement('div');
  imageContainer.style.maxWidth = '45%';
  imageContainer.style.overflow = 'hidden';
  imageContainer.style.display = 'flex';
  imageContainer.style.justifyContent = 'flex-end';
  imageContainer.style.alignItems = 'center';
  imageContainer.style.marginLeft = '5%';
  about.appendChild(imageContainer);

  const image = document.createElement('img');
  image.src = './assets/me.png';
  image.style.width = '100%';
  image.style.height = 'auto';
  image.style.objectFit = 'contain';
  imageContainer.appendChild(image);

  const textContainer = document.createElement('div');
  textContainer.style.maxWidth = '50%';
  about.appendChild(textContainer);

  const title = document.createElement('h2');
  title.innerHTML = 'About <span style="font-weight: 700;">Me</span>';
  title.style.fontSize = '36px';
  title.style.fontWeight = '400';
  title.style.color = '#000000';
  title.style.marginBottom = '20px';
  textContainer.appendChild(title);

  const description = document.createElement('p');
  description.textContent = "I'm a passionate Data Scientist, Machine Learning Engineer, and Front-End Developer who thrives at the intersection of data, AI, and sleek user interfaces. I love turning complex data into actionable insights, building intelligent systems, and crafting intuitive web experiences. My journey started with web development, but over time, my curiosity led me deeper into machine learning, predictive modeling, and data-driven decision-making. Now, I specialize in leveraging technologies like Python, TensorFlow, React.js, and Next.js to build intelligent and scalable applications. Beyond tech, I’m a huge football fan, and when I’m not coding, you’ll probably find me watching a match, playing video games, or even designing them. I also have a soft spot for dogs, because let’s be honest—who doesn’t? I’m always exploring new challenges, whether it’s training a cutting-edge ML model, optimizing an AI pipeline, or pushing the boundaries of front-end performance. You can follow my journey on GitHub, where I build and share projects, or connect with me on Twitter for some quality banter.";
  description.style.fontSize = '16px';
  description.style.fontWeight = '400';
  description.style.color = '#666666';
  description.style.lineHeight = '1.6';
  textContainer.appendChild(description);

  gsap.from(imageContainer, { duration: 1, x: -100, opacity: 0, ease: 'power3.out' });
  gsap.from(textContainer, { duration: 1, x: 100, opacity: 0, ease: 'power3.out', delay: 0.5 });

  // Mobile responsiveness
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const handleMobileAbout = (e) => {
    if (e.matches) {
      about.style.flexDirection = 'column';
      about.style.padding = '30px 20px';
      imageContainer.style.maxWidth = '100%';
      textContainer.style.maxWidth = '100%';
      title.style.fontSize = '28px';
      description.style.fontSize = '14px';
    } else {
      about.style.flexDirection = 'row';
      about.style.padding = '50px 40px';
      imageContainer.style.maxWidth = '45%';
      textContainer.style.maxWidth = '50%';
      title.style.fontSize = '36px';
      description.style.fontSize = '16px';
    }
  };
  mediaQuery.addEventListener('change', handleMobileAbout);
  handleMobileAbout(mediaQuery);
};
createAbout();

// Projects Section
const createProjects = () => {
  const projects = document.createElement('section');
  projects.id = 'project';
  projects.style.padding = '50px 40px';
  projects.style.background = '#000000';
  projects.style.color = '#FFFFFF';
  app.appendChild(projects);

  const title = document.createElement('h2');
  title.innerHTML = 'My <span style="font-weight: 700;">Projects</span>';
  title.style.fontSize = '36px';
  title.style.fontWeight = '400';
  title.style.textAlign = 'center';
  title.style.marginBottom = '40px';
  projects.appendChild(title);

  const projectList = document.createElement('div');
  projectList.style.maxWidth = '1000px';
  projectList.style.margin = '0 auto';
  projects.appendChild(projectList);

  const projectData = [
    {
      number: '01',
      title: 'Feeling Flow',
      description: "Feelin’ Flow is an AI-powered music recommendation web app that curates the perfect Spotify playlist based on your emotions. Whether you type in how you feel or let the app analyze your facial expression using AI and machine learning, Feelin’ Flow instantly understands your mood and delivers a personalized playlist that matches your vibe. Built with React and JavaScript on the front end and powered by a Python-based backend, the app seamlessly integrates with Spotify to enhance your listening experience.",
      image: 'assets/pd1.png',
      projectLink: 'https://youtu.be/OcaeDJX6k7w',
      githubLink: 'https://github.com/Johnikpeme/spotify-emoter'
    },
    {
      number: '02',
      title: 'Planet Vault',
      description: "PlanetVault is a futuristic web app that lets users explore and purchase unique planets in a dystopian multiverse. With an interactive catalog, planet slideshows, filters, and cart functionality, it delivers an immersive e-commerce experience. Built using HTML5, CSS3, and JavaScript, PlanetVault showcases dynamic front-end development and UI design.",
      image: 'assets/pd2.png',
      projectLink: 'https://johnikpeme.github.io/planet-vault/',
      githubLink: 'https://github.com/Johnikpeme/planet-vault'
    },
    {
      number: '03',
      title: 'Airbnb Listings & Pricing',
      description: "This study, conducted using Tableau with data across 10 major cities, investigates whether Airbnb effectively addresses the initial problem it aimed to solve or if hotels provide superior packages in comparison.",
      image: 'assets/pd3.png',
      projectLink: 'https://public.tableau.com/app/profile/john.ikpeme/viz/shared/DYY2YQKRB',
      githubLink: 'https://github.com/Johnikpeme'
    }
  ];

  projectData.forEach((proj, index) => {
    const projectCard = document.createElement('div');
    projectCard.style.display = 'flex';
    projectCard.style.alignItems = 'center';
    projectCard.style.marginBottom = '40px';
    projectCard.style.gap = '30px';
    projectList.appendChild(projectCard);

    const image = document.createElement('div');
    image.style.width = '45%';
    image.style.height = '300px';
    image.style.background = `url(${proj.image})`;
    image.style.backgroundSize = 'cover';
    image.style.backgroundPosition = 'center';
    image.style.backgroundRepeat = 'no-repeat';
    image.style.borderRadius = '8px';
    projectCard.appendChild(image);

    const textContainer = document.createElement('div');
    textContainer.style.width = '55%';
    textContainer.style.display = 'flex';
    textContainer.style.flexDirection = 'column';
    textContainer.style.gap = '10px';
    projectCard.appendChild(textContainer);

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.gap = '15px';
    textContainer.appendChild(header);

    const number = document.createElement('h3');
    number.textContent = proj.number;
    number.style.fontSize = '32px';
    number.style.fontWeight = '700';
    number.style.color = '#FF8C00';
    header.appendChild(number);

    const title = document.createElement('h4');
    title.textContent = proj.title;
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.color = '#FFFFFF';
    header.appendChild(title);

    const description = document.createElement('p');
    description.textContent = proj.description;
    description.style.fontSize = '16px';
    description.style.fontWeight = '400';
    description.style.marginTop = '-25px';
    description.style.color = '#CCCCCC';
    description.style.lineHeight = '1.6';
    description.style.maxWidth = '90%';
    textContainer.appendChild(description);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '-15px';
    textContainer.appendChild(buttonContainer);

    const projectLink = document.createElement('a');
    projectLink.href = proj.projectLink;
    projectLink.textContent = index === 0 ? 'Watch Demo' : 'View Project';
    projectLink.style.display = 'inline-block';
    projectLink.style.marginRight = '10px';
    projectLink.style.padding = '8px 15px';
    projectLink.style.background = '#FFFFFF';
    projectLink.style.color = '#000000';
    projectLink.style.fontSize = '14px';
    projectLink.style.fontWeight = '700';
    projectLink.style.textDecoration = 'none';
    projectLink.style.borderRadius = '5px';
    projectLink.target = '_blank';
    buttonContainer.appendChild(projectLink);

    const githubLink = document.createElement('a');
    githubLink.href = proj.githubLink;
    githubLink.textContent = 'GitHub Repo';
    githubLink.style.display = 'inline-block';
    githubLink.style.padding = '8px 15px';
    githubLink.style.background = '#FF8C00';
    githubLink.style.color = '#FFFFFF';
    githubLink.style.fontSize = '14px';
    githubLink.style.fontWeight = '700';
    githubLink.style.textDecoration = 'none';
    githubLink.style.borderRadius = '5px';
    githubLink.target = '_blank';
    buttonContainer.appendChild(githubLink);

    gsap.from(projectCard, { duration: 1, opacity: 0, y: 50, ease: 'power3.out', delay: index * 0.3 });
  });

  // Mobile responsiveness
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const handleMobileProjects = (e) => {
    if (e.matches) {
      projects.style.padding = '30px 20px';
      title.style.fontSize = '28px';
      projectList.style.maxWidth = '100%';
      projectData.forEach((_, index) => {
        const card = projectList.children[index];
        card.style.flexDirection = 'column';
        card.children[0].style.width = '100%'; // Image
        card.children[0].style.height = '200px';
        card.children[1].style.width = '100%'; // Text
      });
    } else {
      projects.style.padding = '50px 40px';
      title.style.fontSize = '36px';
      projectList.style.maxWidth = '1000px';
      projectData.forEach((_, index) => {
        const card = projectList.children[index];
        card.style.flexDirection = 'row';
        card.children[0].style.width = '45%';
        card.children[0].style.height = '300px';
        card.children[1].style.width = '55%';
      });
    }
  };
  mediaQuery.addEventListener('change', handleMobileProjects);
  handleMobileProjects(mediaQuery);
};
createProjects();

// Publications Section
const createPublications = () => {
  const publications = document.createElement('section');
  publications.id = 'publications';
  publications.style.padding = '50px 40px';
  publications.style.background = '#000000';
  publications.style.color = '#FFFFFF';
  app.appendChild(publications);

  const title = document.createElement('h2');
  title.innerHTML = 'My <span style="font-weight: 700;">Publications</span>';
  title.style.fontSize = '36px';
  title.style.fontWeight = '400';
  title.style.textAlign = 'center';
  title.style.marginBottom = '40px';
  publications.appendChild(title);

  const publicationList = document.createElement('div');
  publicationList.style.maxWidth = '1000px';
  publicationList.style.margin = '0 auto';
  publications.appendChild(publicationList);

  const publicationData = [
    {
      number: '01',
      title: 'The Past, Present & Future of Money/Banking',
      description: "The evolution of banking spans from traditional brick-and-mortar institutions to today’s digital and AI-driven financial ecosystems. In the past, banking relied on physical transactions and paper-based processes. The present is defined by fintech innovations, mobile banking, and decentralized finance (DeFi), enhancing accessibility and efficiency. Looking ahead, the future of banking will be shaped by AI, blockchain, and embedded finance, offering hyper-personalized experiences and seamless financial integration into daily life.",
      image: 'assets/pb1.jpg',
      articleLink: 'https://medium.com/@johnprecious88/the-past-present-future-of-money-banking-1c766eb984f3'
    },
    {
      number: '02',
      title: 'Current State of Casual Games in Africa',
      description: "The state of casual gaming in Africa is rapidly evolving, driven by increasing smartphone penetration, affordable internet access, and a growing young population. The report highlights how local developers are tapping into culturally relevant themes, while global companies are expanding their presence. Monetization remains a challenge due to low purchasing power, but ad-based and freemium models are gaining traction. Looking ahead, the sector is poised for significant growth with improved infrastructure, rising esports engagement, and increased investment in gaming startups across the continent.",
      image: 'assets/pub2.jpg',
      articleLink: 'https://medium.com/@johnprecious88/current-state-of-casual-games-in-africa-a-deep-dive-079759a1e44d'
    },
    {
      number: '03',
      title: 'Analyzing the Titanic Dataset: A Story of Tragedy and Survival',
      description: "Over the weekend, I watched the movie Titanic and was once again reminded of the harrowing tragedy that unfolded over a century ago. As a data analyst, I couldn’t help but wonder: what insights could we gain from the available data about the passengers on board? What factors contributed to their chances of survival, and what can we learn from this historical event?",
      image: 'assets/pub3.jpg',
      articleLink: 'https://medium.com/dev-genius/analyzing-the-titanic-dataset-a-story-of-tragedy-and-survival-48883b2f2d48'
    }
  ];

  publicationData.forEach((pub, index) => {
    const publicationCard = document.createElement('div');
    publicationCard.style.display = 'flex';
    publicationCard.style.alignItems = 'center';
    publicationCard.style.marginBottom = '40px';
    publicationCard.style.gap = '30px';
    publicationList.appendChild(publicationCard);

    const image = document.createElement('div');
    image.style.width = '45%';
    image.style.height = '300px';
    image.style.background = `url(${pub.image})`;
    image.style.backgroundSize = 'cover';
    image.style.backgroundPosition = 'center';
    image.style.backgroundRepeat = 'no-repeat';
    image.style.borderRadius = '8px';
    publicationCard.appendChild(image);

    const textContainer = document.createElement('div');
    textContainer.style.width = '55%';
    textContainer.style.display = 'flex';
    textContainer.style.flexDirection = 'column';
    textContainer.style.gap = '10px';
    publicationCard.appendChild(textContainer);

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.gap = '15px';
    textContainer.appendChild(header);

    const number = document.createElement('h3');
    number.textContent = pub.number;
    number.style.fontSize = '32px';
    number.style.fontWeight = '700';
    number.style.color = '#FF8C00';
    header.appendChild(number);

    const title = document.createElement('h4');
    title.textContent = pub.title;
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.color = '#FFFFFF';
    header.appendChild(title);

    const description = document.createElement('p');
    description.textContent = pub.description;
    description.style.fontSize = '16px';
    description.style.fontWeight = '400';
    description.style.marginTop = '-25px';
    description.style.color = '#CCCCCC';
    description.style.lineHeight = '1.6';
    description.style.maxWidth = '90%';
    textContainer.appendChild(description);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '-15px';
    textContainer.appendChild(buttonContainer);

    const readMoreLink = document.createElement('a');
    readMoreLink.href = pub.articleLink;
    readMoreLink.textContent = 'Read More';
    readMoreLink.style.display = 'inline-block';
    readMoreLink.style.padding = '8px 15px';
    readMoreLink.style.background = '#FFFFFF';
    readMoreLink.style.color = '#000000';
    readMoreLink.style.fontSize = '14px';
    readMoreLink.style.fontWeight = '700';
    readMoreLink.style.textDecoration = 'none';
    readMoreLink.style.borderRadius = '5px';
    readMoreLink.target = '_blank';
    buttonContainer.appendChild(readMoreLink);

    gsap.from(publicationCard, { duration: 1, opacity: 0, y: 50, ease: 'power3.out', delay: index * 0.3 });
  });

  // Mobile responsiveness
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const handleMobilePublications = (e) => {
    if (e.matches) {
      publications.style.padding = '30px 20px';
      title.style.fontSize = '28px';
      publicationList.style.maxWidth = '100%';
      publicationData.forEach((_, index) => {
        const card = publicationList.children[index];
        card.style.flexDirection = 'column';
        card.children[0].style.width = '100%';
        card.children[0].style.height = '200px';
        card.children[1].style.width = '100%';
      });
    } else {
      publications.style.padding = '50px 40px';
      title.style.fontSize = '36px';
      publicationList.style.maxWidth = '1000px';
      publicationData.forEach((_, index) => {
        const card = publicationList.children[index];
        card.style.flexDirection = 'row';
        card.children[0].style.width = '45%';
        card.children[0].style.height = '300px';
        card.children[1].style.width = '55%';
      });
    }
  };
  mediaQuery.addEventListener('change', handleMobilePublications);
  handleMobilePublications(mediaQuery);
};
createPublications();

// Contact Section
const createContact = () => {
  const contact = document.createElement('section');
  contact.id = 'contact-me';
  contact.style.padding = '50px 40px';
  contact.style.background = '#FFFFFF';
  contact.style.display = 'flex';
  contact.style.justifyContent = 'center';
  contact.style.alignItems = 'center';
  app.appendChild(contact);

  const textContainer = document.createElement('div');
  textContainer.style.width = '60%';
  textContainer.style.textAlign = 'center';
  contact.appendChild(textContainer);

  const title = document.createElement('h2');
  title.textContent = "Let's talk about something special";
  title.style.fontSize = '36px';
  title.style.fontWeight = '700';
  title.style.color = '#000000';
  title.style.marginBottom = '20px';
  textContainer.appendChild(title);

  const description = document.createElement('p');
  description.textContent = 'I seek to push the limits of creativity to create high-engaging, user-friendly, and memorable interactive experiences.';
  description.style.fontSize = '16px';
  description.style.fontWeight = '400';
  description.style.color = '#666666';
  description.style.lineHeight = '1.6';
  description.style.marginBottom = '20px';
  textContainer.appendChild(description);

  const email = document.createElement('a');
  email.textContent = 'Email Me';
  email.href = 'mailto:johnprecious88@gmail.com';
  email.style.fontSize = '16px';
  email.style.fontWeight = '600';
  email.style.color = '#000000';
  email.style.textDecoration = 'underline';
  email.style.display = 'block';
  email.style.marginBottom = '10px';
  textContainer.appendChild(email);

  const phone = document.createElement('a');
  phone.textContent = 'Call Me';
  phone.href = 'tel:+2349067167182';
  phone.style.fontSize = '16px';
  phone.style.fontWeight = '600';
  phone.style.color = '#000000';
  phone.style.textDecoration = 'underline';
  textContainer.appendChild(phone);

  gsap.from(textContainer, { duration: 1, y: 50, opacity: 0, ease: 'power3.out' });

  // Mobile responsiveness
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const handleMobileContact = (e) => {
    if (e.matches) {
      contact.style.padding = '30px 20px';
      textContainer.style.width = '100%';
      title.style.fontSize = '28px';
      description.style.fontSize = '14px';
      email.style.fontSize = '14px';
      phone.style.fontSize = '14px';
    } else {
      contact.style.padding = '50px 40px';
      textContainer.style.width = '60%';
      title.style.fontSize = '36px';
      description.style.fontSize = '16px';
      email.style.fontSize = '16px';
      phone.style.fontSize = '16px';
    }
  };
  mediaQuery.addEventListener('change', handleMobileContact);
  handleMobileContact(mediaQuery);
};
createContact();

// Footer
const createFooter = () => {
  const footer = document.createElement('footer');
  footer.style.padding = '20px 40px';
  footer.style.background = '#000000';
  footer.style.color = '#FFFFFF';
  footer.style.display = 'flex';
  footer.style.justifyContent = 'space-between';
  footer.style.alignItems = 'center';
  app.appendChild(footer);

  const logo = document.createElement('div');
  logo.textContent = 'John Portfolio';
  logo.style.fontSize = '24px';
  logo.style.fontWeight = '700';
  footer.appendChild(logo);

  const copyright = document.createElement('div');
  copyright.textContent = '© 2025 Personally built with Javascript';
  copyright.style.fontSize = '14px';
  copyright.style.fontWeight = '400';
  footer.appendChild(copyright);

  gsap.from(footer, { duration: 1, y: 50, opacity: 0, ease: 'power3.out' });

  // Mobile responsiveness
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const handleMobileFooter = (e) => {
    if (e.matches) {
      footer.style.padding = '15px 20px';
      footer.style.flexDirection = 'column';
      footer.style.textAlign = 'center';
      logo.style.fontSize = '20px';
      copyright.style.fontSize = '12px';
      copyright.style.marginTop = '10px';
    } else {
      footer.style.padding = '20px 40px';
      footer.style.flexDirection = 'row';
      footer.style.textAlign = 'left';
      logo.style.fontSize = '24px';
      copyright.style.fontSize = '14px';
      copyright.style.marginTop = '0';
    }
  };
  mediaQuery.addEventListener('change', handleMobileFooter);
  handleMobileFooter(mediaQuery);
};
createFooter();