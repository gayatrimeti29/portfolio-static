// ---------- config you can edit ----------
const CONFIG = {
  name: "Gayatri Meti",
  tagline: "Web creator • Python problem-solver",
  bio: "Final-year Computer Science and Engineering student with a strong foundation in software development, web technologies, and IoT solutions. Proficient in multiple programming languages and experienced in project development, teamwork and problem-solving.",
  githubUsername: "gayatrimeti29",
  formspreeEndpoint: "https://formspree.io/f/mzzypggl" // replace with your Formspree URL
};
// ----------------------------------------

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('tagline').textContent = CONFIG.tagline;
document.getElementById('short-bio').textContent = CONFIG.bio;
document.querySelector('.logo').textContent = CONFIG.name;

// Technical skills (from your input)
const skills = [
  'Python','C','C++','JavaScript','HTML','CSS',
  'React.js','Node.js','Express.js','MongoDB',
  'Git','GitHub','VS Code','REST API',
  'Arduino UNO','IoT components',
  'Problem solving','Team collaboration','Time management','Communication'
];

// Projects you shared
const projects = [
  {
    title: 'Solar Tracker System',
    desc: 'Designed and implemented a solar panel tracking system that automatically follows the sun. Programmed Arduino UNO with Python for real-time tracking and integrated servo motors, voltage boosters and IoT controllers.',
    link: '#',
    tech: 'Python, Arduino UNO, Servo motors, IoT components'
  },
  {
    title: 'Minutes of Meeting (MOM) Web Application',
    desc: 'Full-stack application for managing meeting agendas, action items and decisions in real time. Built responsive UI using React.js and backend APIs with Node.js and Express.js, integrated with MongoDB.',
    link: '#',
    tech: 'HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB'
  }
];

// render skills
const skillsList = document.getElementById('skills-list');
skills.forEach(s => {
  const el = document.createElement('div');
  el.className = 'chip';
  el.textContent = s;
  skillsList.appendChild(el);
});

// render projects
const projectsList = document.getElementById('projects-list');
projects.forEach(p => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p>
    <p><small>${p.tech}</small></p>
    <a href="${p.link}" target="_blank" class="btn">View</a>`;
  projectsList.appendChild(card);
});

// contact form using Formspree (no backend)
// Replace CONFIG.formspreeEndpoint with your actual form endpoint
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const resEl = document.getElementById('contact-result');
  try {
    const res = await fetch(CONFIG.formspreeEndpoint, {
      method: 'POST', body: data, headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      resEl.textContent = 'Message sent. Thank you!';
      form.reset();
    } else {
      resEl.textContent = 'Error sending message. Check formspree setup.';
    }
  } catch (err) {
    resEl.textContent = 'Network error. Try again later.';
  }
});

// fetch public repos from GitHub if username is set and append up to 6 repos
async function loadRepos() {
  if (!CONFIG.githubUsername) return;
  try {
    const res = await fetch(`https://api.github.com/users/${CONFIG.githubUsername}/repos`);
    if (!res.ok) return;
    const repos = await res.json();
    // show up to 6 repos
    repos.slice(0,6).forEach(r => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3>${r.name}</h3><p>${r.description || ''}</p>
        <a href="${r.html_url}" target="_blank" class="btn">View repo</a>`;
      projectsList.appendChild(card);
    });
    // set github link in contact info
    const ghLink = document.getElementById('github-link');
    if (ghLink) ghLink.href = `https://github.com/${CONFIG.githubUsername}`;
  } catch(e) {
    console.error(e);
  }
}
loadRepos();
