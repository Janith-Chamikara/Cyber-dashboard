"use client";

import { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Shield,
  AlertTriangle,
  Server,
  Clock,
  UserCheck,
  UserX,
  Maximize2,
  X,
  Camera,
  Search,
  User,
  FileText,
  Database,
  Skull,
} from "lucide-react";
import Image from "next/image";

// Terminal commands and responses
const terminalCommands = [
  {
    command: "nmap -sV -p 1-1000 10.0.14.32",
    response: [
      "Starting Nmap 7.94 ( https://nmap.org ) at 2025-05-22 13:22 UTC",
      "Nmap scan report for target-server.local (10.0.14.32)",
      "Host is up (0.0042s latency).",
      "Not shown: 994 closed ports",
      "PORT    STATE SERVICE     VERSION",
      "22/tcp  open  ssh         OpenSSH 8.9p1 Ubuntu 3ubuntu0.4",
      "80/tcp  open  http        RED_CYPHER{37 48 33 5f 43 48 34 35 33}",
      "443/tcp open  https       Apache httpd 2.4.52",
      "445/tcp open  netbios-ssn Hint: Convert from hex to ascii",
      "3306/tcp open  mysql      MySQL 8.0.33-0ubuntu0.22.04.2",
      "8080/tcp open  http-proxy",
      "Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .",
      "Nmap done: 1 IP address (1 host) up, scanned in 14.62 seconds",
    ],
  },
  {
    command: "sudo tcpdump -i eth0 -n port 80",
    response: [
      "tcpdump: verbose output suppressed, use -v[v]... for full protocol decode",
      "listening on eth0, link-type EN10MB (Ethernet), snapshot length 262144 bytes",
      "13:22:45.234567 IP 192.168.1.105.52431 > 10.0.14.32.80: Flags [S], seq 1742056430, win 64240, options [mss 1460,sackOK,TS val 3604376953 ecr 0,nop,wscale 7], length 0",
      "13:22:45.234604 IP 10.0.14.32.80 > 192.168.1.105.52431: Flags [S.], seq 2887045934, ack 1742056431, win 65160, options [mss 1460,sackOK,TS val 2564332112 ecr 3604376953,nop,wscale 7], length 0",
      "13:22:45.234621 IP 192.168.1.105.52431 > 10.0.14.32.80: Flags [.], ack 1, win 502, options [nop,nop,TS val 3604376953 ecr 2564332112], length 0",
      "13:22:45.234838 IP 192.168.1.105.52431 > 10.0.14.32.80: Flags [P.], seq 1:74, ack 1, win 502, options [nop,nop,TS val 3604376953 ecr 2564332112], length 73: HTTP: GET / HTTP/1.1",
      "13:22:45.234871 IP 10.0.14.32.80 > 192.168.1.105.52431: Flags [.], ack 74, win 509, options [nop,nop,TS val 2564332112 ecr 3604376953], length 0",
    ],
  },
];

// Hacked terminal commands
const hackedTerminalCommands = [
  {
    command: "cat /var/log/auth.log | grep 'Failed password'",
    response: [
      "May 22 12:01:23 server sshd[12345]: Failed password for root from 185.143.223.45 port 43150 ssh2",
      "May 22 12:01:25 server sshd[12345]: Failed password for root from 185.143.223.45 port 43151 ssh2",
      "May 22 12:01:28 server sshd[12345]: Failed password for root from 185.143.223.45 port 43152 ssh2",
      "May 22 12:01:30 server sshd[12346]: Failed password for admin from 185.143.223.45 port 43153 ssh2",
      "May 22 12:01:33 server sshd[12346]: Failed password for admin from 185.143.223.45 port 43154 ssh2",
      "May 22 12:01:35 server sshd[12347]: Failed password for sysadmin from 185.143.223.45 port 43155 ssh2",
      "May 22 12:01:38 server sshd[12347]: Failed password for sysadmin from 185.143.223.45 port 43156 ssh2",
      "May 22 12:01:40 server sshd[12348]: Failed password for webadmin from 185.143.223.45 port 43157 ssh2",
      "May 22 12:01:43 server sshd[12348]: Failed password for webadmin from 185.143.223.45 port 43158 ssh2",
      "May 22 12:01:45 server sshd[12349]: Accepted password for webadmin from 185.143.223.45 port 43159 ssh2",
      "May 22 12:01:45 server sshd[12349]: pam_unix(sshd:session): session opened for user webadmin by (uid=0)",
    ],
  },
  {
    command: "ls -la /var/www/html/admin/",
    response: [
      "total 56",
      "drwxr-xr-x 3 www-data www-data 4096 May 22 12:15 .",
      "drwxr-xr-x 8 www-data www-data 4096 May 22 12:15 ..",
      "-rw-r--r-- 1 www-data www-data 2458 May 22 12:15 config.php",
      "-rw-r--r-- 1 www-data www-data 3521 May 22 12:15 dashboard.php",
      "-rw-r--r-- 1 www-data www-data 1245 May 22 12:15 db_connect.php",
      "-rw-r--r-- 1 www-data www-data 4521 May 22 12:15 exam_results.php",
      "-rw-r--r-- 1 www-data www-data 3254 May 22 12:15 faculty_data.php",
      "-rw-r--r-- 1 www-data www-data 2145 May 22 12:15 index.php",
      "-rw-r--r-- 1 www-data www-data 1854 May 22 12:15 login.php",
      "-rw-r--r-- 1 www-data www-data  845 May 22 12:15 logout.php",
      "-rw-r--r-- 1 www-data www-data 3254 May 22 12:15 student_records.php",
      "-rw-r--r-- 1 www-data www-data 2541 May 22 12:15 upload.php",
      "drwxr-xr-x 2 www-data www-data 4096 May 22 12:15 uploads",
    ],
  },
  {
    command: "cat /var/www/html/admin/db_connect.php",
    response: [
      "<?php",
      "// Database connection settings",
      "$db_host = 'localhost';",
      "$db_name = 'university_records';",
      "$db_user = 'dbadmin';",
      "$db_pass = 'Eng1n33r1ng@2025!';",
      "",
      "// Create connection",
      "$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);",
      "",
      "// Check connection",
      "if ($conn->connect_error) {",
      '    die("Connection failed: " . $conn->connect_error);',
      "}",
      "?>",
    ],
  },
  {
    command:
      "mysql -u dbadmin -p'Eng1n33r1ng@2025!' -e 'SHOW TABLES FROM university_records;'",
    response: [
      "Tables_in_university_records",
      "admin_users",
      "course_materials",
      "courses",
      "departments",
      "exam_results",
      "faculty",
      "grades",
      "research_papers",
      "staff",
      "student_records",
      "thesis_documents",
      "users",
    ],
  },
  {
    command:
      "mysql -u dbadmin -p'Eng1n33r1ng@2025!' -e 'SELECT id, student_id, name, course_id, grade, semester FROM exam_results LIMIT 10;'",
    response: [
      "id\tstudent_id\tname\tcourse_id\tgrade\tsemester",
      "1\tS10045\tAhmed Khan\tCS401\t92\tSpring 2025",
      "2\tS10062\tSarah Johnson\tCS401\t88\tSpring 2025",
      "3\tS10078\tRavi Patel\tCS401\t76\tSpring 2025",
      "4\tS10103\tMaria Rodriguez\tCS401\t95\tSpring 2025",
      "5\tS10124\tJohn Smith\tCS401\t81\tSpring 2025",
      "6\tS10045\tAhmed Khan\tEE305\t85\tSpring 2025",
      "7\tS10062\tSarah Johnson\tEE305\t91\tSpring 2025",
      "8\tS10078\tRavi Patel\tEE305\t79\tSpring 2025",
      "9\tS10103\tMaria Rodriguez\tEE305\t88\tSpring 2025",
      "10\tS10124\tJohn Smith\tEE305\t72\tSpring 2025",
    ],
  },
  {
    command: 'find /var/www -name "*.zip" -type f',
    response: [
      "/var/www/html/admin/uploads/backup_2025-05-20.zip",
      "/var/www/html/admin/uploads/exam_papers_spring2025.zip",
      "/var/www/html/admin/uploads/faculty_research_2025.zip",
      "/var/www/html/admin/uploads/student_thesis_archive.zip",
      "/var/www/html/admin/uploads/financial_records_2024-2025.zip",
      "/var/www/html/admin/uploads/admission_records_2025.zip",
    ],
  },
];

// Team members data
const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Unit Director",
    status: "active",
    lastActive: "Now",
  },
  {
    id: 2,
    name: "Prof. James Wilson",
    role: "Senior Researcher",
    status: "active",
    lastActive: "5m ago",
  },
  {
    id: 3,
    name: "Arun Perera",
    role: "Lead Security Analyst",
    status: "active",
    lastActive: "Now",
  },
  {
    id: 4,
    name: "Melissa Rodriguez",
    role: "Penetration Tester",
    status: "active",
    lastActive: "2m ago",
  },
  {
    id: 5,
    name: "David Kim",
    role: "Malware Analyst",
    status: "idle",
    lastActive: "15m ago",
  },
  {
    id: 6,
    name: "Fatima Al-Farsi",
    role: "Network Security Specialist",
    status: "active",
    lastActive: "Now",
  },
  {
    id: 7,
    name: "Raj Patel",
    role: "Cryptography Expert",
    status: "offline",
    lastActive: "2h ago",
  },
  {
    id: 8,
    name: "Emma Thompson",
    role: "Digital Forensics Analyst",
    status: "idle",
    lastActive: "30m ago",
  },
  {
    id: 9,
    name: "Liu Wei",
    role: "Security Researcher",
    status: "active",
    lastActive: "1m ago",
  },
  {
    id: 10,
    name: "Carlos Mendez",
    role: "Vulnerability Analyst",
    status: "offline",
    lastActive: "1d ago",
  },
  {
    id: 11,
    name: "Sophia Nakamura",
    role: "Threat Intelligence Analyst",
    status: "active",
    lastActive: "3m ago",
  },
  {
    id: 12,
    name: "Ibrahim Hassan",
    role: "Security Engineer",
    status: "idle",
    lastActive: "45m ago",
  },
];

// Security alerts data
const securityAlerts = [
  {
    id: 1,
    level: "critical",
    message: "SYSTEM BREACH DETECTED - Multiple admin accounts compromised",
    timestamp: "13:15:22",
    source: "Authentication System",
  },
  {
    id: 2,
    level: "critical",
    message: "Unusual data exfiltration: 2.3GB transferred to external IP",
    timestamp: "13:22:47",
    source: "Network Monitor",
  },
  {
    id: 3,
    level: "high",
    message: "Database credentials exposed in public repository",
    timestamp: "13:05:18",
    source: "Vulnerability Scanner",
  },
  {
    id: 4,
    level: "high",
    message: "Unauthorized access to exam results database",
    timestamp: "12:58:30",
    source: "Database Monitor",
  },
  {
    id: 5,
    level: "high",
    message: "Malware signature detected: Ransomware variant",
    timestamp: "12:45:47",
    source: "Endpoint Protection",
  },
];

// System status data
const systemStatus = [
  { name: "Firewall", status: "compromised", uptime: "45d 12h 37m", load: 92 },
  { name: "IDS/IPS", status: "offline", uptime: "0h 15m", load: 0 },
  {
    name: "Web Server",
    status: "compromised",
    uptime: "15d 22h 45m",
    load: 95,
  },
  { name: "Database", status: "compromised", uptime: "15d 22h 45m", load: 88 },
  {
    name: "Auth Server",
    status: "compromised",
    uptime: "5d 14h 22m",
    load: 97,
  },
  {
    name: "Backup System",
    status: "operational",
    uptime: "10d 08h 15m",
    load: 25,
  },
];

// Stolen data categories
const stolenDataCategories = [
  {
    name: "Exam Results",
    files: 145,
    size: "1.2 GB",
    status: "Exfiltrated",
    timestamp: "13:05:22",
  },
  {
    name: "Student Records",
    files: 2458,
    size: "3.5 GB",
    status: "Exfiltrating",
    timestamp: "13:22:15",
  },
  {
    name: "Research Papers",
    files: 87,
    size: "750 MB",
    status: "Exfiltrated",
    timestamp: "13:10:47",
  },
  {
    name: "Financial Records",
    files: 56,
    size: "420 MB",
    status: "Queued",
    timestamp: "Pending",
  },
  {
    name: "Faculty Data",
    files: 124,
    size: "890 MB",
    status: "Exfiltrated",
    timestamp: "13:15:33",
  },
  {
    name: "Admin Credentials",
    files: 12,
    size: "5 MB",
    status: "Exfiltrated",
    timestamp: "12:58:10",
  },
];

// CCTV camera feeds
const cctvFeeds = [
  {
    id: 1,
    location: "IS Department Entrance",
    status: "offline",
    lastMotion: "13:24:05",
    recording: false,
    image: "/placeholder.svg?height=180&width=320",
  },
  {
    id: 2,
    location: "FOE Entrance",
    status: "offline",
    lastMotion: "13:24:05",
    recording: false,
    image: "/placeholder.svg?height=180&width=320",
  },
];

// Wanted persons data
const wantedPersons = [
  {
    id: 1,
    name: "Unknown",
    alias: "The Professor",
    age: "Unknown",
    nationality: "Unknown",
    charges: "Cyber Terrorism, Data Theft, Critical Infrastructure Attacks",
    threat: "high",
    lastSeen: "Near Electrical Department",
    image: "/placeholder.svg?height=200&width=150",
    notes:
      "Known for sophisticated attacks on financial institutions. Extremely dangerous.",
  },
];

export default function CyberDashboard() {
  const [terminalOutput, setTerminalOutput] = useState<string[][]>(
    Array(4)
      .fill(null)
      .map(() => ["> _"]) // Initialize 4 terminals
  );
  const [currentLine, setCurrentLine] = useState<number[]>(Array(4).fill(0));
  const [currentChar, setCurrentChar] = useState<number[]>(Array(4).fill(0));
  const [isTyping, setIsTyping] = useState<boolean[]>(Array(4).fill(false));
  const [commandIndex, setCommandIndex] = useState<number[]>(Array(4).fill(0));
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expandedWindow, setExpandedWindow] = useState<number | null>(null);
  const [activeCameraFeed, setActiveCameraFeed] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [showHackedMessage, setShowHackedMessage] = useState(false);
  const [showDataTheft, setShowDataTheft] = useState(false);
  const [hackProgress, setHackProgress] = useState(0);
  const [encryptionProgress, setEncryptionProgress] = useState(0);

  const terminalRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Active counts
  const activeMembers = teamMembers.filter(
    (member) => member.status === "active"
  ).length;
  const idleMembers = teamMembers.filter(
    (member) => member.status === "idle"
  ).length;
  const offlineMembers = teamMembers.filter(
    (member) => member.status === "offline"
  ).length;
  const criticalAlerts = securityAlerts.filter(
    (alert) => alert.level === "critical"
  ).length;
  const highAlerts = securityAlerts.filter(
    (alert) => alert.level === "high"
  ).length;
  const onlineCameras = cctvFeeds.filter(
    (feed) => feed.status === "online"
  ).length;

  // Filter wanted persons based on search query
  const filteredWantedPersons = wantedPersons.filter(
    (person) =>
      searchQuery === "" ||
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.charges.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Glitch effect
  useEffect(() => {
    // Start with low glitch
    setGlitchIntensity(1);

    // Increase glitch over time
    const glitchTimer = setTimeout(() => {
      setGlitchIntensity(2);

      // Show hacked message after a delay
      setTimeout(() => {
        setShowHackedMessage(true);

        // Show data theft message after another delay
        setTimeout(() => {
          setShowDataTheft(true);
        }, 3000);
      }, 2000);
    }, 1000);

    // Start hack progress animation
    const hackProgressInterval = setInterval(() => {
      setHackProgress((prev) => {
        if (prev >= 100) {
          clearInterval(hackProgressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 150);

    // Start encryption progress animation after a delay
    setTimeout(() => {
      const encryptionInterval = setInterval(() => {
        setEncryptionProgress((prev) => {
          if (prev >= 100) {
            clearInterval(encryptionInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 200);
    }, 5000);

    return () => {
      clearTimeout(glitchTimer);
      clearInterval(hackProgressInterval);
    };
  }, []);

  // Terminal typing effect - Continuously running
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Process each terminal
    for (let terminalIndex = 0; terminalIndex < 4; terminalIndex++) {
      // Use hacked commands for terminals 1-3
      const commandsToUse =
        terminalIndex === 0 ? terminalCommands : hackedTerminalCommands;

      const currentCommand =
        commandsToUse[commandIndex[terminalIndex] % commandsToUse.length];

      if (!isTyping[terminalIndex]) {
        // Start typing after a random delay
        const timer = setTimeout(
          () => {
            const newIsTyping = [...isTyping];
            newIsTyping[terminalIndex] = true;
            setIsTyping(newIsTyping);

            // Show command first
            const newOutput = [...terminalOutput];
            newOutput[terminalIndex] = [`> ${currentCommand.command}`, "> _"];
            setTerminalOutput(newOutput);

            // Set up for response after command is shown
            setTimeout(() => {
              const newCurrentLine = [...currentLine];
              newCurrentLine[terminalIndex] = 1;
              setCurrentLine(newCurrentLine);

              const newCurrentChar = [...currentChar];
              newCurrentChar[terminalIndex] = 0;
              setCurrentChar(newCurrentChar);
            }, 1000);
          },
          terminalIndex === 0 ? 500 : Math.random() * 1000 + 500 // Immediate start for first terminal, staggered for others
        );

        timers.push(timer);
      } else {
        // Continue typing response
        const timer = setTimeout(
          () => {
            const line = currentLine[terminalIndex];
            const char = currentChar[terminalIndex];

            if (line <= currentCommand.response.length) {
              if (line < currentCommand.response.length) {
                const responseLine = currentCommand.response[line];

                if (char < responseLine.length) {
                  // Type next character
                  const newOutput = [...terminalOutput];
                  const currentOutput = [...newOutput[terminalIndex]];
                  currentOutput[line] = responseLine.substring(0, char + 1);
                  if (currentOutput.length <= line + 1) {
                    currentOutput[line + 1] = "> _"; // Cursor
                  }
                  newOutput[terminalIndex] = currentOutput;
                  setTerminalOutput(newOutput);

                  const newCurrentChar = [...currentChar];
                  newCurrentChar[terminalIndex] = char + 1;
                  setCurrentChar(newCurrentChar);
                } else {
                  // Move to next line
                  const newOutput = [...terminalOutput];
                  const currentOutput = [...newOutput[terminalIndex]];
                  if (currentOutput.length <= line + 1) {
                    currentOutput[line + 1] = "> _"; // Cursor on next line
                  }
                  newOutput[terminalIndex] = currentOutput;
                  setTerminalOutput(newOutput);

                  const newCurrentLine = [...currentLine];
                  newCurrentLine[terminalIndex] = line + 1;
                  setCurrentLine(newCurrentLine);

                  const newCurrentChar = [...currentChar];
                  newCurrentChar[terminalIndex] = 0;
                  setCurrentChar(newCurrentChar);
                }
              } else {
                // Finished typing all response lines, immediately start next command
                setTimeout(() => {
                  // Clear terminal and start next command immediately
                  const newOutput = [...terminalOutput];
                  newOutput[terminalIndex] = ["> _"]; // Reset terminal
                  setTerminalOutput(newOutput);

                  const newIsTyping = [...isTyping];
                  newIsTyping[terminalIndex] = false;
                  setIsTyping(newIsTyping);

                  const newCommandIndex = [...commandIndex];
                  newCommandIndex[terminalIndex] =
                    (commandIndex[terminalIndex] + 1) %
                    (terminalIndex === 0
                      ? terminalCommands.length
                      : hackedTerminalCommands.length);
                  setCommandIndex(newCommandIndex);

                  const newCurrentLine = [...currentLine];
                  newCurrentLine[terminalIndex] = 0;
                  setCurrentLine(newCurrentLine);

                  const newCurrentChar = [...currentChar];
                  newCurrentChar[terminalIndex] = 0;
                  setCurrentChar(newCurrentChar);
                }, 2000); // 2 second pause before next command
              }
            }
          },
          Math.random() * 30 + 10 // Faster typing speed
        );

        timers.push(timer);
      }
    }

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [isTyping, currentLine, currentChar, terminalOutput, commandIndex]);

  // Auto-scroll terminals
  useEffect(() => {
    terminalRefs.current.forEach((ref) => {
      if (ref) {
        ref.scrollTop = ref.scrollHeight;
      }
    });
  }, [terminalOutput]);

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  // Toggle window expansion
  const toggleExpand = (index: number) => {
    if (expandedWindow === index) {
      setExpandedWindow(null);
    } else {
      setExpandedWindow(index);
    }
  };

  // Expand camera feed
  const expandCameraFeed = (id: number) => {
    setActiveCameraFeed(activeCameraFeed === id ? null : id);
  };

  // Glitch text effect
  const glitchText = (text: string) => {
    if (glitchIntensity === 0) return text;

    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`";
    let result = "";

    for (let i = 0; i < text.length; i++) {
      if (Math.random() < 0.05 * glitchIntensity) {
        result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      } else {
        result += text[i];
      }
    }

    return result;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-mono relative">
      {/* Glitch overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-10 bg-red-900/5 overflow-hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.03) 3px, transparent 3px)",
        }}
      >
        {/* Random glitch lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-red-500/20"
            style={{
              height: `${Math.random() * 2}px`,
              width: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* Hacked message overlay */}
      {showHackedMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-black/80 p-8 rounded-lg border-2 border-red-500 max-w-2xl w-full text-center">
            <h1 className="text-red-500 text-4xl font-bold mb-4 animate-pulse">
              SYSTEM COMPROMISED
            </h1>
            <p className="text-red-400 text-xl mb-6">
              Faculty of Engineering Cybersecurity Unit has been breached
            </p>

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">System Takeover Progress</span>
                <span className="text-red-400">{hackProgress}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{ width: `${hackProgress}%` }}
                ></div>
              </div>
            </div>

            {showDataTheft && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">
                    Data Encryption Progress
                  </span>
                  <span className="text-red-400">{encryptionProgress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: `${encryptionProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="text-yellow-500 text-lg">
              {encryptionProgress >= 100 ? (
                <span className="animate-pulse">
                  ALL YOUR DATA HAS BEEN ENCRYPTED
                </span>
              ) : (
                <span>Encrypting university data...</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-black border-b border-gray-800 p-4 relative overflow-hidden">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-red-400">
                {glitchText("Faculty of Engineering")}
              </h1>
              <p className="text-sm text-gray-400">
                {glitchText("Intelligence and Cybersecurity Unit")}{" "}
                <span className="text-red-500 animate-pulse">
                  [COMPROMISED]
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="flex items-center bg-gray-800 px-3 py-1 rounded-md">
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-300">{formatTime(currentTime)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-gray-800 px-3 py-1 rounded-md">
                <UserCheck className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-green-400">{activeMembers}</span>
              </div>
              <div className="flex items-center bg-gray-800 px-3 py-1 rounded-md">
                <UserX className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-red-400">{offlineMembers}</span>
              </div>
              <div className="flex items-center bg-gray-800 px-3 py-1 rounded-md">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-red-400">
                  {criticalAlerts + highAlerts}
                </span>
              </div>
              <div className="flex items-center bg-gray-800 px-3 py-1 rounded-md">
                <Camera className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-red-400">{onlineCameras}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alert banner */}
        <div className="absolute bottom-0 left-0 w-full bg-red-900/80 text-white py-1 px-4 text-sm flex justify-between items-center">
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 animate-pulse" />
            <span>CRITICAL SECURITY BREACH DETECTED</span>
          </div>
          <div>
            <span className="text-xs">Incident ID: #25052-RED-ALERT</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Terminal windows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={`terminal-${index}`}
                  className={`bg-black border ${
                    index === 0 ? "border-gray-800" : "border-red-900"
                  } rounded-md overflow-hidden ${
                    expandedWindow === index ? "fixed inset-4 z-50" : ""
                  }`}
                >
                  <div
                    className={`${
                      index === 0 ? "bg-gray-900" : "bg-red-900/30"
                    } px-3 py-2 flex justify-between items-center border-b ${
                      index === 0 ? "border-gray-800" : "border-red-800"
                    }`}
                  >
                    <div className="flex items-center">
                      <Terminal
                        className={`h-4 w-4 ${
                          index === 0 ? "text-green-500" : "text-red-500"
                        } mr-2`}
                      />
                      <span className="text-sm text-gray-300">
                        {index === 0
                          ? `Terminal ${index + 1}`
                          : `Hacked Terminal ${index}`}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleExpand(index)}
                        className="text-gray-400 hover:text-gray-200"
                        aria-label={
                          expandedWindow === index ? "Minimize" : "Maximize"
                        }
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-gray-200"
                        aria-label="Close"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div
                    ref={(el) => (terminalRefs.current[index] = el)}
                    className={`p-3 h-64 overflow-y-auto font-mono text-sm ${
                      index === 0 ? "text-green-400" : "text-red-400"
                    } bg-black`}
                    style={{
                      height:
                        expandedWindow === index
                          ? "calc(100% - 36px)"
                          : "300px",
                    }}
                  >
                    {terminalOutput[index]?.map((line, lineIndex) => (
                      <div
                        key={`term-${index}-line-${lineIndex}`}
                        className="whitespace-pre-wrap"
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Data Theft Progress */}
            <div className="bg-gray-800 border border-red-900 rounded-md overflow-hidden">
              <div className="bg-red-900/30 px-4 py-3 flex justify-between items-center border-b border-red-800">
                <div className="flex items-center">
                  <Database className="h-5 w-5 text-red-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-200">
                    Data Exfiltration Status
                  </h2>
                </div>
                <div className="text-sm text-red-400 animate-pulse">
                  ACTIVE THEFT IN PROGRESS
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {stolenDataCategories.map((category) => (
                    <div
                      key={category.name}
                      className="bg-gray-900 border border-gray-800 rounded-md p-3"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="font-medium text-gray-300">
                            {category.name}
                          </span>
                        </div>
                        <div
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            category.status === "Exfiltrated"
                              ? "bg-red-900/50 text-red-400"
                              : category.status === "Exfiltrating"
                              ? "bg-yellow-900/50 text-yellow-400 animate-pulse"
                              : "bg-gray-800 text-gray-400"
                          }`}
                        >
                          {category.status}
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>
                          {category.files} files ({category.size})
                        </span>
                        <span>{category.timestamp}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            category.status === "Exfiltrated"
                              ? "bg-red-600"
                              : category.status === "Exfiltrating"
                              ? "bg-yellow-600"
                              : "bg-gray-600"
                          }`}
                          style={{
                            width:
                              category.status === "Exfiltrated"
                                ? "100%"
                                : category.status === "Exfiltrating"
                                ? "65%"
                                : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Security Alerts */}
            <div className="bg-gray-800 border border-red-900 rounded-md overflow-hidden">
              <div className="bg-red-900/30 px-4 py-3 flex justify-between items-center border-b border-red-800">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 animate-pulse" />
                  <h2 className="text-lg font-semibold text-gray-200">
                    Security Alerts
                  </h2>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-red-500 font-bold animate-pulse">
                    {criticalAlerts}
                  </span>
                  <span className="text-gray-400 mx-1">critical</span>
                  <span className="text-yellow-500 font-bold ml-2">
                    {highAlerts}
                  </span>
                  <span className="text-gray-400 mx-1">high</span>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {securityAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-md border ${
                        alert.level === "critical"
                          ? "bg-red-900/20 border-red-800"
                          : alert.level === "high"
                          ? "bg-yellow-900/20 border-yellow-800"
                          : alert.level === "medium"
                          ? "bg-orange-900/20 border-orange-800"
                          : "bg-blue-900/20 border-blue-800"
                      } ${alert.level === "critical" ? "animate-pulse" : ""}`}
                    >
                      <div className="flex justify-between items-start">
                        <div
                          className={`text-sm font-semibold ${
                            alert.level === "critical"
                              ? "text-red-400"
                              : alert.level === "high"
                              ? "text-yellow-400"
                              : alert.level === "medium"
                              ? "text-orange-400"
                              : "text-blue-400"
                          }`}
                        >
                          {alert.level.toUpperCase()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {alert.timestamp}
                        </div>
                      </div>
                      <div className="mt-1 text-gray-300">{alert.message}</div>
                      <div className="mt-1 text-xs text-gray-400">
                        Source: {alert.source}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Ransom Message */}
            <div className="bg-black border-2 border-red-600 rounded-md overflow-hidden">
              <div className="bg-red-900/30 px-4 py-3 flex justify-between items-center border-b border-red-800">
                <div className="flex items-center">
                  <Skull className="h-5 w-5 text-red-500 mr-2" />
                  <h2 className="text-lg font-semibold text-red-400">
                    RANSOM DEMAND
                  </h2>
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="text-red-500 text-2xl font-bold mb-4 animate-pulse">
                  YOUR UNIVERSITY DATA IS ENCRYPTED
                </div>
                <div className="text-gray-300 mb-4">
                  We have successfully exfiltrated and encrypted all your
                  sensitive data:
                </div>
                <ul className="text-left text-gray-300 mb-4 space-y-1">
                  <li>• Student records and personal information</li>
                  <li>• Exam results and question papers</li>
                  <li>• Financial records and payment details</li>
                  <li>• Research papers and intellectual property</li>
                  <li>• Faculty personal data and credentials</li>
                </ul>
                <div className="text-yellow-500 mb-4">
                  Pay <span className="font-bold">50 Bitcoin</span> within 48
                  hours or all data will be published
                </div>
                <div className="bg-gray-900 p-3 rounded text-gray-400 font-mono text-sm mb-4">
                  bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                </div>
                <div className="text-xs text-gray-500">
                  Time remaining: 47:22:15
                </div>
              </div>
            </div>

            {/* CCTV Footage - Compromised */}
            <div className="bg-gray-800 border border-red-900 rounded-md overflow-hidden">
              <div className="bg-red-900/30 px-4 py-3 flex justify-between items-center border-b border-red-800">
                <div className="flex items-center">
                  <Camera className="h-5 w-5 text-red-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-200">
                    CCTV Surveillance
                  </h2>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-red-400 font-bold">
                    {onlineCameras}
                  </span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-gray-300">{cctvFeeds.length}</span>
                  <span className="text-gray-400 ml-1">Online</span>
                </div>
              </div>
              <div className="p-4 bg-black/50">
                <div className="text-center p-8 text-red-500 font-bold">
                  CAMERA FEEDS DISABLED
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cctvFeeds.map((feed) => (
                    <div
                      key={feed.id}
                      className="bg-gray-900 border border-gray-700 rounded-md overflow-hidden opacity-60"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <div className="text-red-500 font-bold">
                            NO SIGNAL
                          </div>
                        </div>
                        <Image
                          src={feed.image || "/placeholder.svg"}
                          alt={feed.location}
                          width={320}
                          height={180}
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="p-2">
                        <div className="font-medium text-gray-300">
                          {feed.location}
                        </div>
                        <div className="text-xs text-red-400 mt-1">
                          Status: Disabled by attacker
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gray-800 border border-red-900 rounded-md overflow-hidden">
              <div className="bg-red-900/30 px-4 py-3 flex justify-between items-center border-b border-red-800">
                <div className="flex items-center">
                  <Server className="h-5 w-5 text-red-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-200">
                    System Status
                  </h2>
                </div>
                <div className="text-sm text-red-400 animate-pulse">
                  CRITICAL FAILURE
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {systemStatus.map((system) => (
                    <div
                      key={system.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className={`h-3 w-3 rounded-full mr-2 ${
                            system.status === "operational"
                              ? "bg-green-500"
                              : system.status === "degraded"
                              ? "bg-yellow-500"
                              : system.status === "compromised"
                              ? "bg-red-500 animate-pulse"
                              : "bg-gray-500"
                          }`}
                        ></div>
                        <span className="text-gray-300">{system.name}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-700 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              system.status === "compromised"
                                ? "bg-red-500"
                                : system.status === "offline"
                                ? "bg-gray-600"
                                : system.load < 50
                                ? "bg-green-500"
                                : system.load < 80
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${system.load}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400 w-10">
                          {system.status === "offline"
                            ? "0%"
                            : `${system.load}%`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Wanted Persons Section */}
            <div className="bg-gray-800 border border-red-900 rounded-md overflow-hidden">
              <div className="bg-red-900/30 px-4 py-3 flex justify-between items-center border-b border-red-800">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-red-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-200">
                    Wanted Persons
                  </h2>
                </div>
                <div className="text-sm text-gray-400">
                  Total: {wantedPersons.length}
                </div>
              </div>
              <div className="p-4">
                {/* Search bar */}
                <div className="mb-4 relative">
                  <input
                    type="text"
                    placeholder="Search by name, alias, or charges..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-gray-300 text-sm focus:outline-none focus:border-red-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                  {filteredWantedPersons.length > 0 ? (
                    filteredWantedPersons.map((person) => (
                      <div
                        key={person.id}
                        className="bg-gray-900 border border-gray-700 rounded-md overflow-hidden"
                      >
                        <div className="flex">
                          <div className="w-1/3">
                            <div className="relative h-full">
                              <Image
                                src={person.image || "/placeholder.svg"}
                                alt={person.name}
                                width={150}
                                height={200}
                                className="w-full h-full object-cover"
                              />
                              <div
                                className={`absolute top-2 right-2 px-2 py-0.5 text-xs rounded-full ${
                                  person.threat === "high"
                                    ? "bg-red-900/50 text-red-400"
                                    : "bg-yellow-900/50 text-yellow-400"
                                }`}
                              >
                                {person.threat.toUpperCase()}
                              </div>
                            </div>
                          </div>
                          <div className="w-2/3 p-3">
                            <h3 className="font-bold text-gray-200">
                              {person.name}
                            </h3>
                            <div className="text-sm text-gray-400">
                              Alias: {person.alias}
                            </div>
                            <div className="text-sm text-gray-400">
                              Age: {person.age}
                            </div>
                            <div className="mt-2 text-xs text-red-400 font-medium">
                              CHARGES:
                            </div>
                            <div className="text-sm text-gray-300">
                              {person.charges}
                            </div>
                            <div className="mt-2 text-xs text-gray-400">
                              Last seen: {person.lastSeen}
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-800 p-2 text-xs text-gray-400 border-t border-gray-700">
                          <strong>Notes:</strong> {person.notes}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-red-800 p-4 mt-4">
        <div className="container mx-auto flex justify-between items-center text-xs text-gray-500">
          <div>
            © 2025 Faculty of Engineering - Intelligence and Cybersecurity Unit
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
            <span className="text-red-500">SYSTEM COMPROMISED</span>
            <span className="mx-2">|</span>
            <span>
              FLAG
              <span className="text-black bg-black hover:bg-transparent">
                {"{H4CK3D_UN1V3RS1TY_D4T4}"}
              </span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
