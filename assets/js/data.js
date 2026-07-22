/* =============================================================
   data.js — single source of truth for the whole site.
   Edit THIS file to update content. No other file should need
   to change to add a project, skill, or update contact details.
   ============================================================= */

/* ---- Site owner / contact ---------------------------------- */
const SITE = {
  name: "Emin Erkan YILDIRIM",
  role: "Electronic Engineer",
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
  { name: "PCB Design", detail: "KiCad — mixed-signal, schematic to bring-up" },
  { name: "Embedded C", detail: "RSL10, STM32, bare-metal firmware" },
  { name: "BLE / RF", detail: "RSL10 BLE, LoRa link bring-up" },
  { name: "CAN bus", detail: "Automotive networking, signal modelling & layout" },
  { name: "Buses & Protocols", detail: "SPI, I2C, UART, MIL-STD-1553, TCP/UDP" },
  { name: "Digital / RTL", detail: "SystemVerilog, discrete-logic design" },
  { name: "C# / .NET", detail: "Real-time desktop UIs & data logging" },
  { name: "Python", detail: "Automation, robotics (Webots), data tooling" },
  { name: "Signal Processing", detail: "Filtering, protocol reverse-engineering, MATLAB" },
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
      "Verify the electronic control boards used in tumble dryers for functionality, performance, and IEC 60335 compliance.",
      "Prepare engineering requirements and technical specification documents.",
      "Run benchmark studies and competitor teardowns to find components suitable for integration.",
      "Make design decisions for product safety and regulatory compliance.",
      "Work with new component suppliers to win advantages in cost and quality.",
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
      "Designed and built a C# interface to retrieve and display a solar racing car's real-time data.",
      "Implemented the CAN bus protocol in C on an STM32, and designed and built the testing and validation circuitry for it.",
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
   Data-driven. Add a project = add one object here.
   Fields:
     slug      unique id, used in the URL (project.html?p=<slug>)
     title     display name
     oneLiner  plain-English: what it does / who it's for  (HR-readable)
     tags      short tech tags (engineer signal)
     status    "Shipped" | "In progress" | "Prototype" | "Archived"
     year      string
     cover     static image path (assets/img/<file>). This is what shows in
               the project ROW on the homepage / projects list.
     gif       optional animated gif (assets/img/<file>.gif) — a screen
               recording of the thing actually running. Shown on the DETAIL
               page only; rows keep using `cover` so the list stays calm.
               Media order on the detail page: video > gif > cover.
     gifAlt    optional alt text for the gif (defaults to "<title> in action")
     video     optional. A YouTube/Vimeo link OR a local file. Any of:
                 "https://youtu.be/XXXXXXXXXXX"
                 "https://www.youtube.com/watch?v=XXXXXXXXXXX"
                 "https://vimeo.com/123456789"
                 "assets/vid/demo.mp4"   (drop the file in assets/vid/)
               If set, the video shows instead of the cover image.
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
      "The ground-station app a solar race team watches in the pit — it receives the car's live data over radio, shows every reading on one dashboard, and logs it all for later.",
    tags: ["C#", "LoRa"],
    status: "Shipped",
    year: "2022",
    // Static image — used for the row on the homepage / projects list.
    cover: "assets/img/solaris-telemetry.png",
    // Animated screen recording — shown on the detail page only.
    gif: "assets/img/solaris-telemetry.gif",
    gifAlt: "The Solaris telemetry dashboard updating live as the car sends data",
    video: "",
    summary:
      "A real-time telemetry ground station for a solar-powered race car. It receives live data over a LoRa radio link, decodes a custom binary protocol, displays 90 channels on a single dashboard, plots live graphs, and logs everything to disk for later analysis.",
    body: [
      "A real-time telemetry ground station for Solaris, a university solar car team that competes in international solar-car races. This is the software the crew watches in the pit while the car is on track — battery health, motor load, orientation, and GPS position at a glance.",
      "It receives the car's live data over a LoRa radio link on a serial port, decodes it, and displays 90 telemetry channels on a single auto-scaling dashboard: 32 cell voltages across four BMS banks, 30 pack temperatures, battery and PV energy, speed, motor current, IMU orientation, and GPS position. Motor speed and current are plotted as scrolling live graphs with selectable time windows.",
      "The car's radio firmware wasn't documented, so I reverse-engineered the wire format from the raw byte stream. Each frame is a fixed binary packet with a ':' start marker, little-endian 16-bit payload values, and a simple modulo-256 additive checksum. The receiver realigns to the start marker, validates the checksum, and only applies a packet to the UI once it matches — so corrupted radio frames are dropped rather than displayed.",
      "While connected, every channel is logged to a timestamped CSV file at 500 ms intervals — 91 columns with invariant formatting, so the files open cleanly in Excel or pandas for post-race analysis.",
      "I did not know C# when I started. I picked up the language, WinForms, and the .NET ecosystem while building this, under real constraints: a live radio link, an undocumented protocol, and a dashboard that had to be readable at a glance during a race.",
    ],
    highlights: [
      "Reverse-engineered an undocumented LoRa binary protocol from the raw byte stream",
      "90 telemetry channels decoded and displayed live on one auto-scaling dashboard",
      "Custom checksum validation — corrupted radio frames are dropped, not displayed",
      "CSV logging of every channel at 500 ms for post-race analysis",
      "Scrolling live graphs with selectable time windows (1 / 5 / 10 / 15 min)",
      "Python emulator included, so the interface can be demoed without the car",
    ],
    stack: [
      "C# / .NET Framework 4.7.2",
      "Windows Forms",
      "LiveCharts (WPF-hosted)",
      "SerialPort / LoRa",
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
      "A sports t-shirt with the heart-rate and motion sensors knitted into the fabric — it reads your ECG and movement off conductive-thread electrodes and streams them to your phone over Bluetooth, with no wires against the skin.",
    tags: ["BLE", "RSL10", "Embedded C"],
    status: "Prototype",
    year: "2023",
    cover: "assets/img/ble-ecg-pcba.jpg",
    summary:
      "Graduation thesis: a wearable e-textile that measures ECG, body motion and respiration from sensors integrated into a sports t-shirt. Firmware on an ON Semiconductor RSL10 (Cortex-M3 + BLE) samples the sensors, encodes the readings, and streams them to a phone over Bluetooth Low Energy — including over-the-air firmware updates. Host-side C and MATLAB tools decode the BLE logs and run R-peak / breath detection offline.",
    body: [
      "My graduation thesis: sportswear with the electronics knitted in. Instead of gel pads and wires, the ECG electrodes are conductive yarn worked into a t-shirt, so the sensors sit against the body without restricting how the athlete moves. The goal was a garment that stays light and comfortable while continuously reporting heart activity, motion and breathing.",
      "The heart of it is an ON Semiconductor RSL10 — an ultra-low-power ARM Cortex-M3 with an integrated BLE radio, chosen so the whole thing runs off a coin cell without an external DC/DC converter. An AD8232 analog front-end conditions the faint ECG signal picked up by the conductive-yarn electrodes; an MPU-6050 IMU (read over I2C) provides 3-axis motion; and an ICS-43434 MEMS microphone captures breath sounds over I2S for respiration-rate work.",
      "On the firmware side I wrote the application layer on top of ON Semi's RSL10 CMSIS-Pack: ADC sampling of the ECG on DIO2 with moving-average filtering, IMU communication and the main loop, and two custom 128-bit GATT services that carry the sensor data as BLE Notify characteristics. ECG samples are encoded in the IEEE-11073 SFLOAT format Bluetooth expects for medical data; accelerometer axes go out as scaled ASCII. The build also supports Firmware-Over-The-Air (FOTA) updates over BLE and LE Secure Connections pairing.",
      "The custom PCB was designed in KiCad and kept deliberately tiny for ergonomics, with hole pads so the conductive yarns from the AD8232 could be heat-fixed to the fabric. Bringing it up surfaced a real hardware bug: the RSL10 inputs only tolerate ~2.2 V, so the AD8232 output needed a voltage divider that the first board lacked — I patched the first revision by scraping the board and soldering SMD resistors, then respun a cleaner second PCB with rounded corners, proper programming-header placement and a spot for the MEMS mic.",
      "To make sense of the data off the device, I wrote a standalone C tool that parses nRF Connect BLE logs, demultiplexes the payload by characteristic UUID, decodes both wire formats (ASCII and IEEE-11073), and writes timestamped CSVs per signal. A MATLAB script then runs findpeaks() on per-activity ECG (rest / walking / squat) for R-wave detection and heart-rate estimation, and a 200–800 Hz Butterworth + envelope + peak-detection pipeline turned the mic recording into a respiration rate — about 14 breaths per minute in testing.",
    ],
    highlights: [
      "ECG measured through conductive-yarn electrodes knitted into the shirt — no gel pads or skin-side wires",
      "RSL10 (Cortex-M3 + BLE) firmware streaming ECG + 3-axis motion to a phone as GATT Notify characteristics",
      "ECG encoded in IEEE-11073 SFLOAT (the Bluetooth standard for medical data); accelerometer axes as scaled ASCII",
      "Two custom 128-bit BLE services plus Firmware-Over-The-Air (FOTA) updates and LE Secure Connections pairing",
      "Custom KiCad PCB, coin-cell powered; found and fixed a missing AD8232 voltage divider against the RSL10's 2.2 V input limit",
      "Host-side C log-decoder and MATLAB analysis: R-peak heart-rate detection and ~14 bpm respiration rate from a MEMS mic",
    ],
    stack: [
      "ON Semiconductor RSL10 (ARM Cortex-M3 + BLE)",
      "Embedded C / RSL10 CMSIS-Pack",
      "AD8232 ECG · MPU-6050 IMU (I2C) · ICS-43434 MEMS mic (I2S)",
      "BLE / GATT · IEEE-11073 · FOTA",
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
      "A four-legged walking robot I built and simulated for a robotics course — the code lifts and swings each leg in turn so the body creeps forward without tipping over.",
    tags: ["Webots", "Python", "Robotics"],
    status: "Archived",
    year: "2023",
    cover: "assets/img/quadruped-spider.jpg",
    video: "assets/vid/quadruped-spider.mp4",
    summary:
      "A quadruped 'spider' robot designed and simulated in Webots for a Fundamentals of Robotics course. Twelve motors (three per leg) are driven from a Python controller that walks the robot with a creep gait — keeping its centre of mass inside the triangle of grounded feet so it stays balanced while moving.",
    body: [
      "A university Fundamentals of Robotics (ETE3007) project: a four-legged 'spider' robot built and walked entirely in the Webots simulator. The goal was to take a legged robot from a 3D model to a stable, self-balancing walk driven by code.",
      "The custom robot has four legs of three segments each — 12 joints in total: eight rotary hinge joints and four linear slider joints, one motor apiece. The sliders on the feet push and pull the body along while walking, and the legs sit near the body's corners for balance. The whole thing is described as a URDF model and runs in a Webots R2023a world.",
      "Walking uses a creep gait. At any moment three feet stay planted and the robot keeps its centre of mass inside the triangle those three feet make — if it drifts outside that triangle for too long, the robot tips over. So the legs move one at a time: lift, swing forward, plant, then shift the body. I worked out the per-leg joint angles from the target foot position using the standard inverse-kinematics relations (coxa / femur / tibia).",
      "The Python controller drives it as a 12-step state machine: a `robot_constant_pos()` routine first sets every motor to a known balanced pose, then each simulation tick advances one step of the cycle — raise the front-right leg, reach it forward, pull the body across with the front leg while pushing with the opposite back leg, reset, and mirror the whole sequence on the other side. Each motor is commanded with a target position and a deliberately low velocity so the shifts stay smooth and balanced.",
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
    status: "Archived",
    year: "2023",
    cover: "assets/img/rangefinder.png",
    summary:
      "An ultrasonic rangefinder that measures distance (0–99 cm) and shows it on a two-digit seven-segment display — with a red LED for the over-range case — built from discrete logic only: no MCU, no firmware. A 555 timer, an AND gate, decade counters and a D flip-flop turn the HC-SR04's echo pulse directly into a number.",
    body: [
      "A course project with one deliberate constraint: measure distance and display it without a single line of code — no microcontroller anywhere. Everything is done with off-the-shelf analog and digital logic chips wired together, which meant reading a lot of datasheets and getting each sub-circuit working on its own before joining them.",
      "It measures with an HC-SR04 ultrasonic sensor: fire a pulse, and the sensor's ECHO pin stays high for as long as the sound takes to travel to the object and back. The trick is turning that time into a number without a processor. A 555 timer runs as an astable oscillator with a period of ~58.5 µs — chosen because sound covers exactly 1 cm of round-trip distance in ~58.3 µs. So gating the 555's clock against the ECHO pulse with an AND gate produces one pulse per centimetre.",
      "Those pulses feed decade counters that drive two seven-segment displays directly, giving a live 0–99 cm readout. The carry from the tens digit marks the 99→100 cm boundary; that over-range signal clocks a CD4013 D flip-flop, which latches high and lights a red LED so the display doesn't just silently roll over. A push-button triggers a reading and a switch resets the counters.",
      "The whole system was designed and simulated in Proteus first (the schematic shown here), then built and tested on a breadboard. The first build was noisy and inaccurate, which turned out to be the cost of too many jumpers and ICs on a breadboard — so I simplified: triggering the HC-SR04 from a button instead of a second 555, and collapsing the counting/display driving into fewer parts. The simpler circuit measured far more reliably — a good lesson that fewer components beat a clever-but-fragile design.",
    ],
    highlights: [
      "Measures and displays distance with zero microcontroller and zero firmware — pure analog + digital logic",
      "555 astable tuned to ~58.5 µs so each clock pulse equals 1 cm of round-trip travel",
      "AND-gates the HC-SR04 ECHO against the 555 clock to convert echo time into a pulse train",
      "Decade counters drive two seven-segment displays for a live 0–99 cm readout",
      "CD4013 D flip-flop latches the >99 cm over-range condition to light a red LED",
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
