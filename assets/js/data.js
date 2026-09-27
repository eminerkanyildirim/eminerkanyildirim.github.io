/* =============================================================
   data.js — shared source for structured portfolio content.
   Add projects and update skills/contact details here, then run
   node scripts/build.mjs to regenerate the static pages.
   ============================================================= */

/* ---- Site owner / contact ---------------------------------- */
const SITE = {
  name: "Emin Erkan YILDIRIM",
  role: "Electronic Engineer",
  url: "https://eminerkanyildirim.github.io/",
  // Plain-English, dual-audience one-liner (HR + engineers):
  tagline:
    "I design circuit boards, program the chips on them, and build the software that reads their data.",
  location: "Türkiye",
  email: "eminerkanyildirim@hotmail.com",
  // Full URLs. Leave as placeholders until you have real links.
  github: "https://github.com/Robottur",
  linkedin: "https://linkedin.com/in/emin-erkan-yıldırım",
  githubUser: "Robottur",
  // Path to a downloadable CV. Drop a PDF at assets/Emin-Erkan-Yildirim-CV.pdf
  resumePdf: "assets/Emin-Erkan-Yildirim-CV.pdf",
};

/* ---- What I do (plain language, three tracks) --------------- */
const WHAT_I_DO = [
  {
    track: "Hardware",
    plain:
      "PCB design, board bring-up and verification — from a KiCad schematic to a validated board on the bench, including safety and compliance testing.",
    tags: ["KiCad", "Mixed-signal", "CAN", "IEC 60335"],
  },
  {
    track: "Firmware",
    plain:
      "The code that runs on the chip: bare-metal firmware talking to sensors and radios over BLE, I2C and UART.",
    tags: ["Embedded C", "RSL10", "STM32", "BLE"],
  },
  {
    track: "Software",
    plain:
      "Desktop and data tools that read, visualise and process what the hardware produces.",
    tags: ["C# / .NET", "Python", "MATLAB", "DSP"],
  },
];

/* ---- Skills ------------------------------------------------- */
const SKILLS = [
  { name: "PCB Design", detail: "KiCad — mixed-signal, schematic to bring-up", project: "ble-ecg-motion-sensor" },
  { name: "Embedded C", detail: "RSL10, STM32, bare-metal firmware", project: "ble-ecg-motion-sensor" },
  { name: "BLE / RF", detail: "RSL10 BLE, LoRa link bring-up", project: "ble-ecg-motion-sensor" },
  { name: "CAN bus", detail: "Automotive networking, signal modelling & layout" },
  { name: "Buses & Protocols", detail: "SPI, I2C, UART, MIL-STD-1553, TCP/UDP" },
  { name: "Digital / RTL", detail: "SystemVerilog, discrete-logic design" },
  { name: "C# / .NET", detail: "Real-time desktop UIs & data logging", project: "solaris-telemetry" },
  { name: "Python", detail: "Automation, robotics (Webots), data tooling", project: "quadruped-spider-robot" },
  { name: "Signal Processing", detail: "Filtering, protocol reverse-engineering, MATLAB", project: "ble-ecg-motion-sensor" },
];

/* ---- Tools and languages (from CV) ------------------------- */
const TOOLS = [
  { name: "Circuit design & simulation", detail: "KiCad, LTspice, QUCS, Proteus" },
  { name: "Analysis & simulation", detail: "MATLAB, Webots" },
];

const LANGUAGES = [
  { name: "English", detail: "Advanced" },
  { name: "Turkish", detail: "Native" },
];

/* ---- Experience --------------------------------------------
   Work history for the resume page. Each entry:
     role, org, location, period, points[] (concrete bullets).
   ------------------------------------------------------------ */
const EXPERIENCE = [
  {
    role: "Laboratory Specialist, R&D",
    org: "Vestel Beyaz Eşya",
    location: "Manisa, Türkiye",
    period: "Oct 2024 – Present",
    points: [
      "Test and verify tumble-dryer electronic control boards for functionality, performance and IEC 60335 safety compliance.",
      "Define engineering requirements and document technical specifications for product development.",
      "Benchmark products and examine competitor designs to evaluate components for integration.",
      "Contribute to design decisions with product safety and regulatory compliance in mind.",
      "Evaluate new component suppliers for cost and quality improvements.",
    ],
  },
  {
    role: "Embedded Software Engineering Intern",
    org: "Baykar Technologies",
    location: "İstanbul, Türkiye",
    period: "Jul 2023 – Aug 2023",
    points: [
      "Prepared and delivered a technical presentation analysing a communication protocol and comparing it against alternatives.",
    ],
  },
  {
    role: "Research & Development Intern",
    org: "Güleryüz Karoser Otomotiv",
    location: "Bursa, Türkiye",
    period: "Jul 2022 – Aug 2022",
    points: [
      "Inspected CAN bus placement in a vehicle electrical system.",
      "Standardised signal naming on the model to speed up production-line placement.",
      "Determined the required CAN bus cable lengths from the system model.",
    ],
  },
];

/* ---- Extracurricular / activities --------------------------- */
const ACTIVITIES = [
  {
    role: "Electronic Subgroup Member",
    org: "Solar Team Solaris",
    location: "",
    period: "Oct 2021 – Oct 2022",
    points: [
      "Reverse-engineered incoming LoRa data using HTerm to analyse communication frames.",
      "Developed a C# interface to read UART telemetry through the USB COM port of a ground-side LoRa receiver, display live data, and log it to CSV.",
      "Developed CAN communication software in C on an STM32 and built circuitry for communication testing and validation.",
    ],
  },
];

/* ---- Education (resume page) -------------------------------- */
const EDUCATION = [
  {
    degree: "M.Sc. Electrical & Electronics Engineering",
    org: "Dokuz Eylul University",
    period: "Feb 2025 – Present",
    detail: "",
  },
  {
    degree: "B.Sc. Electrical & Electronics Engineering",
    org: "Dokuz Eylul University",
    period: "Sep 2019 – Jun 2024",
    detail: "GPA 3.0 / 4.0",
  },
];

/* ---- Projects ----------------------------------------------
   Data-driven. Add a project = add one object here and regenerate.
   Fields:
     slug      unique id, used in the URL (projects/<slug>.html)
     title     display name
     oneLiner  plain-English: what it does / who it's for  (HR-readable)
     tags      short tech tags (engineer signal)
     status    "Shipped" | "In progress" | "Prototype" | "Completed course project" | "Archived"
     year      string
     cover     static image path (assets/img/<file>). This is what shows in
               the project ROW on the homepage / projects list.
     gif       legacy field; MP4/WebM files receive playback controls.
               GIF files fall back to the static cover to avoid unpausable motion.
     video     optional. A YouTube/Vimeo link OR a local file. Any of:
                 "https://youtu.be/XXXXXXXXXXX"
                 "https://www.youtube.com/watch?v=XXXXXXXXXXX"
                 "https://vimeo.com/123456789"
                 "assets/vid/demo.mp4"   (drop the file in assets/vid/)
               Controlled playback, no autoplay. The cover is used as a poster.
     summary   short plain-English blurb (used on cards + as fallback text)
     body      optional array of paragraphs — the full explanation for the
               detail page. Write as many as you like: ["para 1", "para 2"].
               Falls back to `summary` if omitted.
     highlights bullet list of concrete work / outcomes
     stack     technologies used (detail page)
     links     optional [{label, href}] (repo, demo, writeup)
   Do not invent numbers/specs — leave blank if unknown.
   ------------------------------------------------------------ */
const PROJECTS = [
  {
    slug: "solaris-telemetry",
    title: "Solaris Telemetry — Data Logger & Graph",
    oneLiner:
      "A solar race team's ground-station app: it reads telemetry from a USB-connected LoRa receiver, displays live readings, and saves them for later analysis.",
    tags: ["C#", "LoRa", "UART / USB"],
    status: "Shipped",
    year: "2022",
    // Static image — used for the row on the homepage / projects list.
    cover: "assets/img/solaris-telemetry.png",
    // Screen recording with playback controls on the detail page.
    video: "assets/vid/solaris-telemetry.mp4",
    summary:
      "A C# telemetry application for a solar-powered race car. It reads UART serial data from a USB-connected LoRa receiver, parses and validates packets, displays live graphs with LiveCharts, and saves the parsed readings to CSV.",
    body: [
      "A real-time telemetry ground station for Solaris, a university solar car team that competes in international solar-car races. This is the software the crew watches in the pit while the car is on track — battery health, motor load, orientation, and GPS position at a glance.",
      "The data path starts with a LoRa module on the car, which sends telemetry wirelessly to a second LoRa module at the ground station. That receiving module connects to the computer by USB. The C# interface reads its UART serial stream through the USB COM port, then parses the packets into categorized readings for the dashboard.",
      "I used HTerm to analyse the incoming telemetry frames and developed the C# Windows Forms application around the decoded packet structure. Packet checksum validation rejects corrupt frames before their values are displayed or logged.",
      "LiveCharts plots the incoming readings in real time, and the application records the parsed telemetry in CSV files for post-race analysis. I operated it during an actual race for more than one hour without observed crashes or freezes.",
      "As part of the same team's electronics work, I also developed CAN communication software in C on an STM32 microcontroller and built circuitry to test and validate that communication.",
    ],
    highlights: [
      "Analysed telemetry frames with HTerm and parsed them into categorized readings",
      "Read UART serial data from the ground-side LoRa receiver through its USB COM port",
      "Validated packet checksums before displaying or logging telemetry",
      "Built live graphs with LiveCharts and saved parsed data to CSV",
      "Used during an actual race for more than one hour without observed crashes or freezes",
      "Developed STM32 CAN communication software and built validation circuitry for the team",
    ],
    stack: [
      "C# / .NET Framework 4.7.2",
      "Windows Forms",
      "LiveCharts (WPF-hosted)",
      "UART serial / USB COM port (SerialPort)",
      "LoRa radio link between vehicle and ground receiver",
      "CsvHelper",
    ],
    links: [
      {
        label: "repo",
        href: "https://github.com/Robottur/Telemetri-Data-Logger-and-Graph",
      },
    ],
  },
  {
    slug: "ble-ecg-motion-sensor",
    title: "Smart Sportswear — BLE ECG & Motion Sensor Node",
    oneLiner:
      "A wearable prototype that measures heart activity and movement through sensors integrated into a shirt, then sends the readings wirelessly to a phone.",
    tags: ["BLE", "RSL10", "Embedded C"],
    status: "Prototype",
    year: "2023",
    cover: "assets/img/ble-ecg-pcba.jpg",
    summary:
      "A wearable ECG and motion-sensing prototype developed for a TÜBİTAK 1001 project. My work combined KiCad PCB design and bring-up, RSL10 application firmware in C for ECG sampling and MPU-6050 acquisition over I2C, and data transmission through BLE GATT notifications. Host-side C and MATLAB tools decode BLE logs into CSV files and estimate heart rate from ECG peaks.",
    body: [
      "My graduation thesis: sportswear with the electronics knitted in. Instead of gel pads and wires, the ECG electrodes are conductive yarn worked into a t-shirt, so the sensors sit against the body without restricting how the athlete moves. The goal was a garment that stays light and comfortable while continuously reporting heart activity, motion and breathing.",
      "The heart of it is an ON Semiconductor RSL10 — an ultra-low-power ARM Cortex-M3 with an integrated BLE radio, chosen so the whole thing runs off a coin cell without an external DC/DC converter. An AD8232 analog front-end conditions the faint ECG signal picked up by the conductive-yarn electrodes; an MPU-6050 IMU (read over I2C) provides 3-axis motion; and an ICS-43434 MEMS microphone captures breath sounds over I2S for respiration-rate work.",
      "On the firmware side I wrote the application layer on top of ON Semi's RSL10 CMSIS-Pack: ADC sampling of the ECG on DIO2 with moving-average filtering, IMU communication and the main loop, and two custom 128-bit GATT services that carry the sensor data as BLE Notify characteristics. ECG samples use 32-bit IEEE-11073-style encoding; accelerometer axes go out as scaled ASCII. The underlying BLE stack, FOTA infrastructure and pairing implementation are vendor-provided components; my contribution was the sensor application firmware.",
      "The custom PCB was designed in KiCad and kept deliberately tiny for ergonomics, with hole pads so the conductive yarns from the AD8232 could be heat-fixed to the fabric. Bringing it up surfaced a real hardware bug: the RSL10 inputs only tolerate ~2.2 V, so the AD8232 output needed a voltage divider that the first board lacked — I patched the first revision by scraping the board and soldering SMD resistors, then respun a cleaner second PCB with rounded corners, proper programming-header placement and a spot for the MEMS mic.",
      "To make sense of the data off the device, I wrote a standalone C tool that parses nRF Connect BLE logs, demultiplexes the payload by characteristic UUID, decodes both wire formats (ASCII and IEEE-11073), and writes timestamped CSVs per signal. A MATLAB script then runs findpeaks() on per-activity ECG (rest / walking / squat) for R-wave detection and heart-rate estimation, and a 200–800 Hz Butterworth + envelope + peak-detection pipeline turned the mic recording into a respiration rate — about 14 breaths per minute in testing.",
    ],
    highlights: [
      "ECG measured through conductive-yarn electrodes knitted into the shirt — no gel pads or skin-side wires",
      "RSL10 (Cortex-M3 + BLE) firmware streaming ECG + 3-axis motion to a phone as GATT Notify characteristics",
      "ECG samples use 32-bit IEEE-11073-style encoding; accelerometer axes use scaled ASCII",
      "Application firmware for ECG sampling, MPU-6050 acquisition over I2C and BLE GATT notifications",
      "Custom KiCad PCB, coin-cell powered; found and fixed a missing AD8232 voltage divider against the RSL10's 2.2 V input limit",
      "Host-side C log-decoder and MATLAB analysis: R-peak heart-rate detection and about 14 breaths/minute respiration rate from a MEMS mic",
    ],
    stack: [
      "ON Semiconductor RSL10 (ARM Cortex-M3 + BLE)",
      "Embedded C / RSL10 CMSIS-Pack",
      "AD8232 ECG front-end",
      "MPU-6050 IMU (I2C)",
      "ICS-43434 MEMS mic (I2S)",
      "BLE / GATT notifications",
      "32-bit IEEE-11073-style encoding",
      "KiCad (PCB & schematic)",
      "C & MATLAB (host-side decode + analysis)",
    ],
    links: [
      {
        label: "repo",
        href: "https://github.com/Robottur/ble-ecg-motion-sensor",
      },
    ],
  },
  {
    slug: "quadruped-spider-robot",
    title: "Quadruped Spider Robot — Webots Gait Simulation",
    oneLiner:
      "A four-legged walking robot I modelled and simulated in Webots for a robotics course — a Python controller coordinates the leg movements through a state machine.",
    tags: ["Webots", "Python", "Robotics"],
    status: "Completed course project",
    year: "2023",
    cover: "assets/img/quadruped-spider.jpg",
    video: "assets/vid/quadruped-spider.mp4",
    summary:
      "A quadruped 'spider' robot designed and simulated in Webots for a Fundamentals of Robotics course. Twelve motors (three per leg) are driven from a Python controller that walks the robot with a creep gait — keeping its centre of mass inside the triangle of grounded feet so it stays balanced while moving.",
    body: [
      "A university Fundamentals of Robotics (ETE3007) project: a four-legged 'spider' robot built and walked entirely in the Webots simulator. The goal was to take a legged robot from a 3D model to a statically balanced creep gait driven by code.",
      "The custom robot has four legs of three segments each — 12 joints in total: eight rotary hinge joints and four linear slider joints, one motor apiece. The sliders on the feet push and pull the body along while walking, and the legs sit near the body's corners for balance. The whole thing is described as a URDF model and runs in a Webots R2023a world.",
      "Walking uses a creep gait. At any moment three feet stay planted and the robot keeps its centre of mass inside the triangle those three feet make — if it drifts outside that triangle for too long, the robot tips over. So the legs move one at a time: lift, swing forward, plant, then shift the body. I worked out the per-leg joint angles from the target foot position using the standard inverse-kinematics relations (coxa / femur / tibia).",
      "The Python controller drives it as a 12-step state machine: the robot_constant_pos() routine first sets every motor to a known balanced pose, then each simulation tick advances one step of the cycle — raise the front-right leg, reach it forward, pull the body across with the front leg while pushing with the opposite back leg, reset, and mirror the whole sequence on the other side. Each motor is commanded with a target position and a deliberately low velocity so the shifts stay smooth and balanced.",
      "An earlier attempt reused a pre-made robot model from the course, but its joints were coupled in a way that turned all four legs whenever one leg was commanded — impossible to gait cleanly. Rebuilding a custom robot from scratch, where every joint was known and independently controllable, is what made the balanced creep walk work.",
    ],
    highlights: [
      "Custom quadruped built as a URDF model and simulated in Webots R2023a",
      "12 motors — 8 rotary hinge joints + 4 linear sliders, three per leg",
      "Creep gait: three feet always grounded, centre of mass kept inside their support triangle",
      "Per-leg joint angles solved with coxa/femur/tibia inverse kinematics",
      "Python controller as a 12-step state machine driving a smooth, balanced walk",
      "Rebuilt the robot from scratch after a pre-made model's coupled joints made gaiting impossible",
    ],
    stack: [
      "Webots R2023a",
      "Python (Webots controller API)",
      "URDF robot modelling",
      "Inverse kinematics",
      "Creep-gait / static-balance control",
    ],
    links: [],
  },
  {
    slug: "rangefinder",
    title: "Discrete-Logic Rangefinder — No Microcontroller",
    oneLiner:
      "A distance meter that shows how far away something is on a two-digit display — built entirely from basic logic chips, with no microcontroller or code anywhere in it.",
    tags: ["Ultrasonic", "Digital Logic", "555"],
    status: "Completed course project",
    year: "2023",
    cover: "assets/img/rangefinder.png",
    summary:
      "An ultrasonic rangefinder prototype with a two-digit seven-segment display and a red over-range LED, built from discrete logic without a microcontroller or firmware. A 555 timer, an AND gate, decade counters and a D flip-flop convert the HC-SR04's echo pulse into a displayed distance.",
    body: [
      "A course project with one deliberate constraint: measure distance and display it without a single line of code — no microcontroller anywhere. Everything is done with off-the-shelf analog and digital logic chips wired together, which meant reading a lot of datasheets and getting each sub-circuit working on its own before joining them.",
      "It measures with an HC-SR04 ultrasonic sensor: fire a pulse, and the sensor's ECHO pin stays high for as long as the sound takes to travel to the object and back. The trick is turning that time into a number without a processor. A 555 timer runs as an astable oscillator with a period of about 58.5 µs. Approximately 58 µs of echo time corresponds to 1 cm of target distance, accounting for both outward and return travel. Gating the clock against the ECHO pulse with an AND gate therefore produces approximately one count per centimetre of target distance.",
      "Those pulses feed decade counters that drive two seven-segment displays directly, representing counts from 00 to 99. The carry beyond two digits clocks a CD4013 D flip-flop, which latches high and lights a red over-range LED. A push-button triggers a reading and a switch resets the counters.",
      "The whole system was designed and simulated in Proteus first (the schematic shown here), then built and tested on a breadboard. The first build was noisy and inaccurate, which turned out to be the cost of too many jumpers and ICs on a breadboard — so I simplified: triggering the HC-SR04 from a button instead of a second 555, and collapsing the counting/display driving into fewer parts. The simpler circuit measured far more reliably — a good lesson that fewer components beat a clever-but-fragile design.",
    ],
    highlights: [
      "Measures and displays distance with zero microcontroller and zero firmware — pure analog + digital logic",
      "555 astable tuned to about 58.5 µs for approximately one count per centimetre of target distance",
      "AND-gates the HC-SR04 ECHO against the 555 clock to convert echo time into a pulse train",
      "Decade counters drive a two-digit seven-segment display",
      "CD4013 D flip-flop latches counter overflow beyond the two display digits and lights a red LED",
      "Prototyped in Proteus, then simplified on the bench for far more reliable readings",
    ],
    stack: [
      "HC-SR04 ultrasonic sensor",
      "NE555 timer (astable)",
      "74LS08 AND gate",
      "Decade counters + 7-segment displays",
      "CD4013 D flip-flop (over-range latch)",
      "Proteus (schematic capture & simulation)",
    ],
    links: [],
  },
];

/* ---- Blog posts (optional; empty state handled) ------------ */
const POSTS = [
  // {
  //   slug: "example-post",
  //   title: "Bringing up a mixed-signal board",
  //   date: "2026-01-01",
  //   excerpt: "Notes from taking a board from bare PCB to working hardware.",
  //   href: "#",
  // },
];
