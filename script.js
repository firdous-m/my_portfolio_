const input = document.getElementById("commandInput");
const output = document.getElementById("output");
let commandHistory = [];
let historyIndex = -1;
const contactInfo = {
    email: "firdousf891@gmail.com",
    github: "https://github.com/firdous-m",
    linkedin: "www.linkedin.com/in/firdous-m-093281263",
    instagram: "https://www.instagram.com/_.firdous_firu._?igsh=eTZtcTZ0aW5xMmpl&utm_source=qr"
};


/* =========================
   BOOT CONFIG
========================= */

const bootLines = [
    "booting system...",
    "initializing profile...",
    "loading modules...",
    "system ready. type 'help'"
];

const banner = `
 ______ _           _                 
|  ____(_)         | |                
| |__   _ _ __   __| | ___  _   _ ___ 
|  __| | | '_ \\ / _\` |/ _ \\| | | / __|
| |    | | |     (_| | (_) | |_| \\__ \\
|_|    |_|_|    \\__,_|\\___/ \\__,_|___/
`;

/* =========================
   TEXT CONTENT
========================= */

const contactText = `
CONTACT
-------
Email     : ${contactInfo.email}
GitHub    : ${contactInfo.github}
LinkedIn  : ${contactInfo.linkedin}
Instagram : ${contactInfo.instagram}
`;

const helpText = `
SYSTEM COMMANDS
---------------
help                 → show commands
whoami               → about me
projects list        → list projects
projects open        → view project
skills               → skill overview
status               → availability
clear                → reboot system
contact              → contact details
`;

const whoamiText = `
Firdous M
-----------
Embedded Systems Engineer (ECE)
Developer | System Thinker | Builder

ABOUT ME
--------
I am an Electronics and Communication Engineering graduate
with a strong focus on embedded systems and system-level
development.

I enjoy working close to hardware while also building
reliable software systems that interact directly with
real-world signals, devices, and constraints.

My interest lies in understanding how things work at a
low level and turning that understanding into practical,
working solutions.

EDUCATION
---------
B.Tech – Electronics & Communication Engineering
College of Engineering Thalassery
Pass-out Year: 2025

ACADEMIC PROJECTS
-----------------
• Mini Project:
  Line Following Robot
  - Designed and implemented a basic autonomous robot
  - Worked on sensors, control logic, and motor interfacing

• Major Project:
  NOAA Satellite Signal Reception System
  - Built a low-cost weather data reception system
  - Captured satellite signals using SDR and antenna systems
  - Processed and analyzed real-time satellite data

TRAINING & EXPERIENCE
---------------------
Embedded Systems Trainee
Emertxe, Bangalore (Current)

• Learning embedded system design and development
• Gaining hands-on experience in system-level programming
• Focus on writing efficient, reliable C code

Internship:
Python Intern – Quest

• Worked on Python-based applications
• Strengthened programming fundamentals and logic building

PROJECT WORK (SOFTWARE)
-----------------------
• Address Book Management System (C)
• Image Steganography
• Lexical Analyzer
• Arbitrary Precision Calculator

These projects strengthened my understanding of
data structures, memory management, and problem-solving.

SKILLS
------
Programming:
• Advanced C
• Data Structures & Algorithms in C
• Python (Intermediate)
• HTML, CSS, JavaScript (Basics)
• Flutter

Embedded & ECE:
• Embedded Systems Fundamentals
• Digital Electronics
• Microcontroller Concepts
• Signal Processing Basics
• SDR & Antenna Concepts

Design & Tools:
• Figma
• Basic UI/UX Design
• MATLAB (Academic)
• Electronics Simulation Tools

CERTIFICATIONS
--------------
• Python Certification

PROFESSIONAL WORK
-----------------
• Freelance projects involving software and design work
• Experience working with real client requirements
• Exposure to end-to-end project delivery

CAREER FOCUS
------------
Primary Focus:
Embedded Systems Engineering

I aim to build reliable embedded and system-level solutions
that bridge hardware and software in meaningful ways.
`;
const skillsText = `
🛠️ TECHNICAL SKILLS

⚙️ Embedded Systems
  • C
  • Embedded C
  • STM32
  • Arduino

💻 Programming & Web
  • Python
  • HTML
  • CSS

📡 Simulation & Analysis
  • MATLAB
  • HFSS

🎨 UI / App Development
  • Figma
  • Flutter

🧰 Tools & Platforms
  • GitHub
  • Linux

👉 Type 'projects' to see what I’ve built
`;



/* =========================
   PROJECT DATA
========================= */

const projectsData = {
    noaa: {
        title: "NOAA Satellite Weather Reception System",
        desc: "Low-cost system to receive and process weather data transmitted by NOAA satellites using SDR and antenna systems.",
        tech: "SDR, Antenna Systems, Signal Processing, Python",
        role: "Signal reception, system design, data processing",
        report: "reports/noaa_report.pdf"
    },

    linefollower: {
        title: "Line Following Robot",
        desc: "Autonomous robot designed using sensors and control logic to follow a predefined path.",
        tech: "Sensors, Motor Control, Embedded Logic",
        role: "Hardware interfacing, control logic",
        report: "reports/line_follower_report.pdf"
    },

    addressbook: {
        title: "Address Book Management System",
        desc: "Menu-driven C application for managing contact information with file storage.",
        tech: "C, File Handling, Data Structures",
        role: "Core implementation",
        github: "https://github.com/firdous-m/adressbook_emertexe.git"
    },

    steganography: {
        title: "Image Steganography",
        desc: "Implemented techniques to hide secret data inside images using bit manipulation.",
        tech: "C, Binary Data Handling",
        role: "Algorithm design",
        github: "https://github.com/firdous-m/stegnography.git"
    },

    lexical: {
        title: "Lexical Analyzer",
        desc: "Designed a lexical analyzer to tokenize source code input.",
        tech: "C, Compiler Design",
        role: "Tokenization logic",
        github: "https://github.com/yourusername/lexical-analyzer"
    },

    apc: {
        title: "Arbitrary Precision Calculator",
        desc: "Calculator capable of handling numbers beyond standard data limits using data structures.",
        tech: "C, Linked Lists",
        role: "Algorithm & implementation",
        github: "https://github.com/yourusername/arbitrary-precision-calculator"
    }
};


/* =========================
   OUTPUT HELPERS
========================= */

function print(text) {
    const pre = document.createElement("pre");

    // Convert URLs and PDF paths to clickable links
    let html = text
        // GitHub / http links
        .replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank">$1</a>'
        )
        // PDF report links
        .replace(
            /(reports\/[^\s]+\.pdf)/g,
            '<a href="$1" download>$1</a>'
        );

    pre.innerHTML = html;
    output.appendChild(pre);
}



function printError(text) {
    const p = document.createElement("p");
    p.textContent = text;
    p.classList.add("error");
    output.appendChild(p);
    glitchScreen();
}

/* =========================
   TYPING EFFECT
========================= */

function typeLine(text, callback) {
    let i = 0;
    const p = document.createElement("p");
    output.appendChild(p);

    const interval = setInterval(() => {
        p.textContent += text.charAt(i);
        i++;
        if (i === text.length) {
            clearInterval(interval);
            if (callback) callback();
        }
        output.scrollTop = output.scrollHeight;
    }, 40);
}

/* =========================
   BOOT SEQUENCE
========================= */

function bootSystem() {
    output.innerHTML = "";

    const pre = document.createElement("pre");
    pre.textContent = banner;
    output.appendChild(pre);

    let index = 0;

    function nextLine() {
        if (index < bootLines.length) {
            typeLine("> " + bootLines[index], () => {
                index++;
                setTimeout(nextLine, 300);
            });
        }
    }
    nextLine();
}

bootSystem();

/* =========================
   COMMAND INPUT
========================= */

input.addEventListener("keydown", function (e) {

    // ENTER → execute command
    if (e.key === "Enter") {
        const raw = input.value.trim();
        if (!raw) return;

        output.innerHTML += `<p>> ${raw}</p>`;
        handleCommand(raw.toLowerCase());

        // store command in history
        commandHistory.push(raw);
        historyIndex = commandHistory.length;

        input.value = "";
        output.scrollTop = output.scrollHeight;
    }

    // UP ARROW → previous command
    if (e.key === "ArrowUp") {
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        }
        e.preventDefault();
    }

    // DOWN ARROW → next command
    if (e.key === "ArrowDown") {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            input.value = "";
        }
        e.preventDefault();
    }
});


/* =========================
   COMMAND HANDLER
========================= */

function handleCommand(command) {
    const parts = command.split(" ");

    switch (parts[0]) {
        case "help":
            print(helpText);
            break;

        case "whoami":
            print(whoamiText);
            break;

        case "projects":
            handleProjects(parts);
            break;

        case "skills":
            print(skillsText);
            break;

        case "status":
            print("STATUS: Open to work | Availability: Immediate");
            break;

        case "clear":
            bootSystem();
            break;
        case "contact":
        print(contactText);
        break;


        default:
            printError("Command not found. Type 'help'");
    }
}

/* =========================
   PROJECT COMMANDS
========================= */

function handleProjects(parts) {
    if (parts.length === 1 || parts[1] === "list") {
        print(`
AVAILABLE PROJECTS
------------------
- noaa
- linefollower
- addressbook
- steganography
- lexical
- apc

Usage:
projects open <name>
        `);
        return;
    }

    if (parts[1] === "open" && !parts[2]) {
        printError("Missing project name. Example: projects open noaa");
        return;
    }

    if (parts[1] === "open") {
        const key = parts[2];
        const p = projectsData[key];

        if (!p) {
            printError("Project not found");
            return;
        }

        let outputText = `
${p.title}
------------------------
${p.desc}

Tech Stack:
${p.tech}

Your Role:
${p.role}
`;

        if (p.github) {
            outputText += `

GitHub Repository:
${p.github}
(click to open)
`;
        }

        if (p.report) {
            outputText += `

Project Report:
${p.report}
(click to download)
`;
        }

        print(outputText);
    }
}


/* =========================
   GLITCH EFFECT
========================= */

function glitchScreen() {
    const terminal = document.querySelector(".terminal");
    terminal.classList.add("glitch");

    setTimeout(() => {
        terminal.classList.remove("glitch");
    }, 150);
}
