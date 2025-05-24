"use client";

import { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Shield,
  Users,
  AlertTriangle,
  Server,
  Wifi,
  BarChart3,
  Clock,
  UserCheck,
  UserX,
  Maximize2,
  X,
  RefreshCw,
  Camera,
  Search,
  User,
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
      "80/tcp  open  http        Apache httpd 2.4.52",
      "443/tcp open  https       Apache httpd 2.4.52",
      "445/tcp open  netbios-ssn Samba smbd 4.6.2",
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
  {
    command: "binwalk -e suspicious_firmware.bin",
    response: [
      "DECIMAL       HEXADECIMAL     DESCRIPTION",
      "--------------------------------------------------------------------------------",
      "0             0x0             ELF, 32-bit LSB executable, ARM, version 1 (SYSV)",
      "1204          0x4B4           Certificate in DER format (x509 v3), header length: 4, sequence length: 64",
      "2780          0xADC           gzip compressed data, maximum compression, from Unix, last modified: 2025-04-15 08:32:11",
      "15732         0x3D74          JFIF (JPEG) image data, JFIF standard 1.01",
      '47392         0xB920          XML document, version: "1.0"',
      "68204         0x10A6C         Unix path: /usr/share/firmware/config/default_settings.xml",
      "89122         0x15C32         Zip archive data, at least v2.0 to extract, compressed size: 8932, uncompressed size: 23091, name: hidden_data.txt",
      "98054         0x17F36         End of Zip archive, footer length: 22",
      "98076         0x17F4C         PNG image, 320 x 240, 8-bit/color RGB, non-interlaced",
      "102394        0x1901A         Unix path: /etc/shadow",
      "120832        0x1D820         Certificate in DER format (x509 v3), header length: 4, sequence length: 929",
      "145920        0x23A00         Linux kernel version 5.15.0",
      "167936        0x29000         CRC32 polynomial table, little endian",
      "262144        0x40000         LZMA compressed data, properties: 0x5D, dictionary size: 8388608 bytes, uncompressed size: 3932160 bytes",
      "",
      "Scan completed. Extracting 7 identified signatures...",
      "",
      'Extracting gzip compressed data to "_suspicious_firmware.bin.extracted/ADC.gz"...',
      'Extracting JFIF image to "_suspicious_firmware.bin.extracted/3D74.jpg"...',
      'Extracting Zip archive to "_suspicious_firmware.bin.extracted/15C32.zip"...',
      'Extracting PNG image to "_suspicious_firmware.bin.extracted/17F4C.png"...',
      'Extracting LZMA compressed data to "_suspicious_firmware.bin.extracted/40000.lzma"...',
      "",
      "Extraction completed. Found hidden data in multiple formats.",
    ],
  },
  {
    command: "zsteg -a suspicious_image.png",
    response: [
      'imagedata           .. text: "CREATOR: gd-jpeg v1.0 (using IJG JPEG v62), quality = 75"',
      'b1,rgb,lsb,xy       .. text: "Coordinates: 34.0522° N, 118.2437° W"',
      'b1,rgba,lsb,xy      .. text: "Operation Blackout: Phase 2 begins at 02:30 UTC"',
      "b2,r,msb,xy         .. file: PGP Secret Key -",
      'b2,g,msb,xy         .. text: "Contact: shadow@darkweb.onion"',
      'b2,b,msb,xy         .. text: "Password: 7Hj9k2L5pQ8rT3x"',
      "b3,rgb,msb,xy       .. file: Zip archive data, at least v1.0 to extract",
      'b4,r,msb,xy         .. text: "EXIF metadata contains additional information"',
      "b4,g,msb,xy         .. text: \"Check steghide with passphrase 'bluehawk'\"",
      'b4,b,msb,xy         .. text: "[REDACTED]"',
      "",
      "Analyzing metadata...",
      "Creation Time: 2025-05-10 03:14:22",
      "Software: Adobe Photoshop CC 2025 (Windows)",
      "GPS Information: Present (see coordinates above)",
      "",
      "Checking for additional LSB data...",
      "Found hidden binary data (possible encrypted container)",
      "Found hidden text in alpha channel",
      "",
      "Analyzing color histogram for anomalies...",
      "Unusual color distribution detected in lower right quadrant",
      "Possible steganographic payload: 2.3 KB",
      "",
      "Analysis complete. Multiple hidden payloads detected.",
    ],
  },
  {
    command: "dirb http://10.0.14.32/",
    response: [
      "DIRB v2.22",
      "By The Dark Raver",
      "-----------------",
      "",
      "START_TIME: Thu May 22 13:24:01 2025",
      "URL_BASE: http://10.0.14.32/",
      "WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt",
      "",
      "-----------------",
      "",
      "GENERATED WORDS: 4612",
      "",
      "---- Scanning URL: http://10.0.14.32/ ----",
      "+ http://10.0.14.32/admin (CODE:301|SIZE:0)",
      "+ http://10.0.14.32/assets (CODE:301|SIZE:0)",
      "+ http://10.0.14.32/backup (CODE:301|SIZE:0)",
      "+ http://10.0.14.32/css (CODE:301|SIZE:0)",
      "+ http://10.0.14.32/dashboard (CODE:301|SIZE:0)",
      "+ http://10.0.14.32/images (CODE:301|SIZE:0)",
      "+ http://10.0.14.32/index.php (CODE:200|SIZE:7345)",
      "+ http://10.0.14.32/js (CODE:301|SIZE:0)",
      "+ http://10.0.14.32/login.php (CODE:200|SIZE:1255)",
      "+ http://10.0.14.32/logout.php (CODE:302|SIZE:0)",
      "+ http://10.0.14.32/phpinfo.php (CODE:200|SIZE:94842)",
      "+ http://10.0.14.32/robots.txt (CODE:200|SIZE:26)",
      "+ http://10.0.14.32/server-status (CODE:403|SIZE:277)",
      "+ http://10.0.14.32/uploads (CODE:301|SIZE:0)",
      "",
      "-----------------",
      "END_TIME: Thu May 22 13:24:32 2025",
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
    id: 2,
    level: "high",
    message: "Unusual outbound data transfer detected on server SRV-DB-03",
    timestamp: "12:47:15",
    source: "Network Monitor",
  },
  {
    id: 3,
    level: "medium",
    message: "New vulnerability detected: CVE-2025-1234 on web server",
    timestamp: "11:32:08",
    source: "Vulnerability Scanner",
  },
  {
    id: 4,
    level: "low",
    message: "Certificate expiring in 15 days for domain lms.eng.ruh.ac.lk",
    timestamp: "10:15:30",
    source: "Certificate Monitor",
  },
  {
    id: 5,
    level: "high",
    message: "Malware signature detected: Trojan.Emotet variant",
    timestamp: "09:23:47",
    source: "Endpoint Protection",
  },
];

// Network traffic data for visualization
const networkTrafficData = [
  { time: "13:00", inbound: 42, outbound: 28 },
  { time: "13:05", inbound: 45, outbound: 30 },
  { time: "13:10", inbound: 50, outbound: 35 },
  { time: "13:15", inbound: 48, outbound: 32 },
  { time: "13:20", inbound: 52, outbound: 38 },
];

// System status data
const systemStatus = [
  { name: "Firewall", status: "operational", uptime: "45d 12h 37m", load: 42 },
  { name: "IDS/IPS", status: "operational", uptime: "30d 05h 12m", load: 38 },
  {
    name: "Web Server",
    status: "operational",
    uptime: "15d 22h 45m",
    load: 65,
  },
  { name: "Database", status: "operational", uptime: "15d 22h 45m", load: 58 },
  { name: "Auth Server", status: "degraded", uptime: "5d 14h 22m", load: 87 },
  {
    name: "Backup System",
    status: "operational",
    uptime: "10d 08h 15m",
    load: 25,
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
    image: "/wanted.png",
    notes:
      "Known for sophisticated attacks on financial institutions. Extremely dangerous.",
  },
];

// CCTV camera feeds
const cctvFeeds = [
  {
    id: 1,
    location: "IS Department Entrance",
    status: "online",
    lastMotion: "13:24:05",
    recording: true,
    image: "/cctv-2.jpg",
  },
  {
    id: 1,
    location: "FOE Entrance",
    status: "online",
    lastMotion: "13:24:05",
    recording: true,
    image: "/cctv-1.png",
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

  // Terminal typing effect - Continuously running
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Process each terminal
    for (let terminalIndex = 0; terminalIndex < 4; terminalIndex++) {
      const currentCommand = terminalCommands[commandIndex[terminalIndex]];

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
                    (commandIndex[terminalIndex] + 1) % terminalCommands.length;
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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-mono">
      {/* Header */}
      <header className="bg-black border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-green-400">
                Faculty of Engineering
              </h1>
              <p className="text-sm text-gray-400">
                Intelligence and Cybersecurity Unit
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
                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                <span className="text-yellow-400">
                  {criticalAlerts + highAlerts}
                </span>
              </div>
              <div className="flex items-center bg-gray-800 px-3 py-1 rounded-md">
                <Camera className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-blue-400">{onlineCameras}</span>
              </div>
            </div>
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
              {[0].map((index) => (
                <div
                  key={`terminal-${index}`}
                  className={`bg-black border border-gray-800 rounded-md overflow-hidden ${
                    expandedWindow === index ? "fixed inset-4 z-50" : ""
                  }`}
                >
                  <div className="bg-gray-900 px-3 py-2 flex justify-between items-center border-b border-gray-800">
                    <div className="flex items-center">
                      <Terminal className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-300">
                        Terminal {index + 1}
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
                    className="p-3 h-64 overflow-y-auto font-mono text-sm text-green-400 bg-black"
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
              {/* CCTV Footage Section */}
              <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
                <div className="bg-gray-900 px-4 py-3 flex justify-between items-center border-b border-gray-700">
                  <div className="flex items-center">
                    <Camera className="h-5 w-5 text-blue-500 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-200">
                      CCTV Surveillance
                    </h2>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-blue-400 font-bold">
                      {onlineCameras}
                    </span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="text-gray-300">{cctvFeeds.length}</span>
                    <span className="text-gray-400 ml-1">Online</span>
                  </div>
                </div>

                {/* Active camera feed (expanded view) */}
                {activeCameraFeed !== null && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-black/80 z-10 flex items-center justify-center p-4">
                      <div className="w-full max-w-full">
                        <div className="bg-gray-900 border border-gray-700 rounded-md overflow-hidden">
                          <div className="bg-gray-800 px-3 py-2 flex justify-between items-center">
                            <div className="flex items-center">
                              <Camera className="h-4 w-4 text-blue-500 mr-2" />
                              <span className="text-gray-300">
                                {
                                  cctvFeeds.find(
                                    (feed) => feed.id === activeCameraFeed
                                  )?.location
                                }
                              </span>
                              <span
                                className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                  cctvFeeds.find(
                                    (feed) => feed.id === activeCameraFeed
                                  )?.status === "online"
                                    ? "bg-green-900/50 text-green-400"
                                    : "bg-red-900/50 text-red-400"
                                }`}
                              >
                                {
                                  cctvFeeds.find(
                                    (feed) => feed.id === activeCameraFeed
                                  )?.status
                                }
                              </span>
                            </div>
                            <button
                              onClick={() => setActiveCameraFeed(null)}
                              className="text-gray-400 hover:text-gray-200"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="relative">
                            <Image
                              src={
                                cctvFeeds.find(
                                  (feed) => feed.id === activeCameraFeed
                                )?.image || "/placeholder.svg"
                              }
                              alt="CCTV Feed"
                              width={900}
                              height={450}
                              className="w-full h-auto"
                            />
                            {/* Camera overlay elements */}
                            <div className="absolute top-0 left-0 w-full p-2 flex justify-between text-xs text-white/70">
                              <div>CAM-{activeCameraFeed}</div>
                              <div className="flex items-center">
                                <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                                <span>REC</span>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-2 flex justify-between text-xs text-white/70">
                              <div>{formatTime(currentTime)}</div>
                              <div>FPS: 30</div>
                            </div>
                            {/* Grid overlay */}
                            <div className="absolute inset-0 pointer-events-none">
                              <div className="w-full h-full border border-white/10"></div>
                              <div className="absolute left-1/3 top-0 w-px h-full bg-white/10"></div>
                              <div className="absolute left-2/3 top-0 w-px h-full bg-white/10"></div>
                              <div className="absolute top-1/3 left-0 h-px w-full bg-white/10"></div>
                              <div className="absolute top-2/3 left-0 h-px w-full bg-white/10"></div>
                            </div>
                          </div>
                          <div className="bg-gray-900 p-3 flex justify-between items-center">
                            <div className="text-sm text-gray-400">
                              Last motion detected:{" "}
                              {
                                cctvFeeds.find(
                                  (feed) => feed.id === activeCameraFeed
                                )?.lastMotion
                              }
                            </div>
                            <div className="flex space-x-2">
                              <button className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 hover:bg-gray-700">
                                Playback
                              </button>
                              <button className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 hover:bg-gray-700">
                                Export
                              </button>
                              <button className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 hover:bg-gray-700">
                                Settings
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {cctvFeeds.map((feed) => (
                      <div
                        key={feed.id}
                        className={`bg-gray-900 border border-gray-700 rounded-md overflow-hidden cursor-pointer hover:border-blue-500 transition-colors ${
                          feed.status === "offline" ? "opacity-60" : ""
                        }`}
                        onClick={() =>
                          feed.status === "online" && expandCameraFeed(feed.id)
                        }
                      >
                        <div className="relative">
                          <Image
                            src={feed.image || "/placeholder.svg"}
                            alt={feed.location}
                            width={320}
                            height={180}
                            className="w-full h-auto"
                          />
                          {/* Camera overlay elements */}
                          <div className="absolute top-0 left-0 w-full p-2 flex justify-between text-xs text-white/70">
                            <div>CAM-{feed.id}</div>
                            {feed.recording && feed.status === "online" && (
                              <div className="flex items-center">
                                <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                                <span>REC</span>
                              </div>
                            )}
                          </div>
                          <div className="absolute bottom-0 left-0 w-full p-2 flex justify-between text-xs text-white/70">
                            <div>{formatTime(currentTime)}</div>
                            {feed.status === "online" && <div>FPS: 30</div>}
                          </div>
                          {/* Status indicator */}
                          <div
                            className={`absolute top-2 right-2 px-2 py-0.5 text-xs rounded-full ${
                              feed.status === "online"
                                ? "bg-green-900/50 text-green-400"
                                : "bg-red-900/50 text-red-400"
                            }`}
                          >
                            {feed.status}
                          </div>
                        </div>
                        <div className="p-2">
                          <div className="font-medium text-gray-300">
                            {feed.location}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Last motion:{" "}
                            {feed.status === "online" ? feed.lastMotion : "N/A"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Security Alerts */}
            <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
              <div className="bg-gray-900 px-4 py-3 flex justify-between items-center border-b border-gray-700">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-200">
                    Security Alerts
                  </h2>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-red-500 font-bold">
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
                      }`}
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
            {/* Wanted Persons Section */}
            <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
              <div className="bg-gray-900 px-4 py-3 flex justify-between items-center border-b border-gray-700">
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
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-gray-300 text-sm focus:outline-none focus:border-blue-500"
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

            {/* System Status */}
            <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
              <div className="bg-gray-900 px-4 py-3 flex justify-between items-center border-b border-gray-700">
                <div className="flex items-center">
                  <Server className="h-5 w-5 text-purple-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-200">
                    System Status
                  </h2>
                </div>
                <div className="text-sm text-gray-400">
                  Last updated: {formatTime(currentTime)}
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
                              : "bg-red-500"
                          }`}
                        ></div>
                        <span className="text-gray-300">{system.name}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-700 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              system.load < 50
                                ? "bg-green-500"
                                : system.load < 80
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${system.load}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400 w-10">
                          {system.load}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance metrics */}
            <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
              <div className="bg-gray-900 px-4 py-3 flex justify-between items-center border-b border-gray-700">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-green-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-200">
                    Performance Metrics
                  </h2>
                </div>
                <button className="text-gray-400 hover:text-gray-200">
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">CPU Usage</span>
                      <span className="text-gray-300">67%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "67%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Memory Usage</span>
                      <span className="text-gray-300">8.2 GB / 16 GB</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "51%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Network Bandwidth</span>
                      <span className="text-gray-300">42.5 Mbps</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: "35%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Disk I/O</span>
                      <span className="text-gray-300">15.2 MB/s</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "28%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-700">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>System Uptime</span>
                      <span>45d 12h 37m</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                      <span>Last Reboot</span>
                      <span>2025-04-07 02:45:12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Team Members */}
            <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
              <div className="bg-gray-900 px-4 py-3 flex justify-between items-center border-b border-gray-700">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-200">
                    Team Members
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                    <span className="text-xs text-gray-400">
                      {activeMembers}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full mr-1"></div>
                    <span className="text-xs text-gray-400">{idleMembers}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-gray-500 rounded-full mr-1"></div>
                    <span className="text-xs text-gray-400">
                      {offlineMembers}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 max-h-80 overflow-y-auto">
                <div className="space-y-2">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className={`h-2 w-2 rounded-full mr-2 ${
                            member.status === "active"
                              ? "bg-green-500"
                              : member.status === "idle"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                          }`}
                        ></div>
                        <span className="text-gray-300">{member.name}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {member.lastActive}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hidden CTF Flag */}
            <div
              className="hidden"
              data-flag="FLAG{DASHBOARD_HIDDEN_FLAG_2025}"
            ></div>
          </div>
        </div>

        {/* Bottom row */}
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 p-4 mt-4">
        <div className="container mx-auto flex justify-between items-center text-xs text-gray-500">
          <div>
            © 2025 Faculty of Engineering - Intelligence and Cybersecurity Unit
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
            <span>SYSTEM SECURE</span>
            <span className="mx-2">|</span>
            <span>
              FLAG
              <span className="text-black bg-black hover:bg-transparent">
                {"{D4SH_S3CUR1TY_1NT3L}"}
              </span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
