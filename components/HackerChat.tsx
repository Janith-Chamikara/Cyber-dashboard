"use client"

import { useState, useEffect, useRef } from "react"
import { Terminal, Skull, Users, Shield, AlertTriangle, Clock, Fingerprint } from "lucide-react"
import Image from "next/image"

// Money Heist characters data with status
const characters = [
  { id: 1, name: "Professor", codeName: "Salvador", status: "alive", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 2, name: "Tokyo", codeName: "TOKYO_0x1", status: "dead", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 3, name: "Berlin", codeName: "BERLIN_0x2", status: "dead", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 4, name: "Nairobi", codeName: "NAIROBI_0x3", status: "dead", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 5, name: "Rio", codeName: "RIO_0x4", status: "alive", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 6, name: "Denver", codeName: "DENVER_0x5", status: "alive", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 7, name: "Helsinki", codeName: "HELSINKI_0x6", status: "alive", avatar: "/placeholder.svg?height=50&width=50" },
  {
    id: 8,
    name: "Stockholm",
    codeName: "STOCKHOLM_0x7",
    status: "alive",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  { id: 9, name: "Lisbon", codeName: "LISBON_0x8", status: "alive", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 10, name: "Palermo", codeName: "PALERMO_0x9", status: "alive", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 11, name: "Bogotá", codeName: "BOGOTA_0xA", status: "alive", avatar: "/placeholder.svg?height=50&width=50" },
  {
    id: 12,
    name: "Marseille",
    codeName: "MARSEILLE_0xB",
    status: "alive",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  { id: 13, name: "Manila", codeName: "MANILA_0xC", status: "alive", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 14, name: "Oslo", codeName: "OSLO_0xD", status: "dead", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 15, name: "Moscow", codeName: "MOSCOW_0xE", status: "dead", avatar: "/placeholder.svg?height=50&width=50" },
]

// Message type definition
interface Message {
  id: number
  sender: string
  codeName: string
  content: string
  timestamp: string
  encrypted: boolean
  image?: string
  imageCaption?: string
  imageClassification?: string
}

// Pre-coded messages
const messages: Message[] = [
  {
    id: 1,
    sender: "Professor",
    codeName: "Salvador",
    content: "Initiating Operation Bella Ciao. All units confirm status.",
    timestamp: "14:30:22",
    encrypted: false,
  },
  {
    id: 2,
    sender: "Rio",
    codeName: "RIO_0x4",
    content: "Systems online. Firewall breach successful. Bank security protocols identified.",
    timestamp: "14:31:05",
    encrypted: false,
  },
  {
    id: 3,
    sender: "Denver",
    codeName: "DENVER_0x5",
    content: "Perimeter secured. Hostages contained in sector B. No resistance.",
    timestamp: "14:32:17",
    encrypted: false,
  },
  {
    id: 4,
    sender: "Professor",
    codeName: "Salvador",
    content: "FLAG{M0n3y_H3ist_CTF_1s_0n}",
    timestamp: "14:33:42",
    encrypted: true,
  },
  {
    id: 5,
    sender: "Lisbon",
    codeName: "LISBON_0x8",
    content: "Police response time estimated at 8 minutes. Countermeasures in place.",
    timestamp: "14:34:30",
    encrypted: false,
  },
  {
    id: 6,
    sender: "Helsinki",
    codeName: "HELSINKI_0x6",
    content: "Vault access codes: 34-26-17-58. Decryption in progress...",
    timestamp: "14:35:12",
    encrypted: false,
  },
  {
    id: 7,
    sender: "Palermo",
    codeName: "PALERMO_0x9",
    content: "Executing protocol DALÍ. All units switch to secure channel.",
    timestamp: "14:36:05",
    encrypted: false,
  },
  {
    id: 8,
    sender: "Professor",
    codeName: "Salvador",
    content:
      "01001000 01101001 01100100 01100100 01100101 01101110 00100000 01100110 01101100 01100001 01100111 00111010 00100000 01000110 01001100 01000001 01000111 01111011 01000010 01101001 01101110 01100001 01110010 01111001 01011111 01001000 01100101 01101001 01110011 01110100 01111101",
    timestamp: "14:37:22",
    encrypted: true,
  },
  {
    id: 9,
    sender: "Stockholm",
    codeName: "STOCKHOLM_0x7",
    content: "Hostage psychological profiles analyzed. No immediate threats detected.",
    timestamp: "14:38:45",
    encrypted: false,
  },
  {
    id: 10,
    sender: "Bogotá",
    codeName: "BOGOTA_0xA",
    content: "Gold reserves located. Estimated value: €973,000,000. Beginning extraction sequence.",
    timestamp: "14:39:33",
    encrypted: false,
  },
  {
    id: 11,
    sender: "Marseille",
    codeName: "MARSEILLE_0xB",
    content: "Aerial surveillance detected. Implementing countermeasures. ETA to extraction: 42 minutes.",
    timestamp: "14:40:17",
    encrypted: false,
  },
  {
    id: 12,
    sender: "Professor",
    codeName: "Salvador",
    content: "Attention all units. Police negotiator making contact. Prepare for Plan Paris.",
    timestamp: "14:41:05",
    encrypted: false,
  },
  {
    id: 13,
    sender: "Manila",
    codeName: "MANILA_0xC",
    content: "Internal surveillance operational. Monitoring all sectors. FLAG{H1dd3n_1n_Pl41n_S1ght}",
    timestamp: "14:42:30",
    encrypted: false,
  },
  {
    id: 14,
    sender: "Professor",
    codeName: "Salvador",
    content: "Bank security blueprint acquired. Analyzing entry points.",
    timestamp: "14:43:15",
    encrypted: false,
    image: "/placeholder.svg?height=400&width=600&text=Bank+Blueprint",
    imageCaption: "Royal Mint of Spain - Security Layout",
    imageClassification: "CONFIDENTIAL",
  },
  {
    id: 15,
    sender: "Lisbon",
    codeName: "LISBON_0x8",
    content: "Police tactical positions identified. Countermeasures in place.",
    timestamp: "14:44:30",
    encrypted: false,
    image: "/placeholder.svg?height=400&width=600&text=Police+Positions",
    imageCaption: "Police Tactical Formation - Live Feed",
    imageClassification: "RESTRICTED",
  },
  {
    id: 16,
    sender: "Rio",
    codeName: "RIO_0x4",
    content: "Facial recognition bypass successful. Identity shields operational.",
    timestamp: "14:45:22",
    encrypted: false,
    image: "/placeholder.svg?height=400&width=600&text=Facial+Recognition+Bypass",
    imageCaption: "Facial Recognition System - Compromised",
    imageClassification: "TOP SECRET",
  },
  {
    id: 17,
    sender: "Denver",
    codeName: "DENVER_0x5",
    content: "Hostage psychological profiles. Identifying potential threats.",
    timestamp: "14:46:10",
    encrypted: false,
    image: "/placeholder.svg?height=400&width=600&text=Hostage+Profiles",
    imageCaption: "Hostage Behavioral Analysis",
    imageClassification: "SENSITIVE",
  },
  {
    id: 18,
    sender: "Professor",
    codeName: "Salvador",
    content: "FLAG{1m4g3_3mb3dd3d_d4t4}",
    timestamp: "14:47:05",
    encrypted: true,
    image: "/placeholder.svg?height=400&width=600&text=Hidden+Data",
    imageCaption: "Steganographic Data Transfer",
    imageClassification: "EYES ONLY",
  },
]

export default function HackerChat() {
  const [displayedMessages, setDisplayedMessages] = useState<typeof messages>([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [typing, setTyping] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const aliveCount = characters.filter((char) => char.status === "alive").length
  const deadCount = characters.filter((char) => char.status === "dead").length

  // Simulate typing effect for new messages
  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const timer = setTimeout(
        () => {
          setTyping(true)
          const currentMessage = messages[currentMessageIndex]

          if (currentCharIndex < currentMessage.content.length) {
            setCurrentText((prev) => prev + currentMessage.content[currentCharIndex])
            setCurrentCharIndex((prev) => prev + 1)
          } else {
            setTyping(false)
            setDisplayedMessages((prev) => [...prev, currentMessage])
            setCurrentMessageIndex((prev) => prev + 1)
            setCurrentText("")
            setCurrentCharIndex(0)
          }
        },
        typing ? Math.random() * 50 + 10 : Math.random() * 2000 + 1000,
      ) // Random delay between messages and characters

      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex, currentCharIndex, typing])

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [displayedMessages, currentText])

  // Get sender details
  const getSender = (codeName: string) => {
    return characters.find((char) => char.codeName === codeName) || characters[0]
  }

  return (
    <div className="flex flex-col h-screen bg-black text-green-500 font-mono overflow-hidden">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-red-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-red-600 h-10 w-10 rounded-full flex items-center justify-center mr-3">
            <Terminal className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-red-500 text-xl font-bold">BELLA CIAO SECURE TERMINAL</h1>
            <div className="text-xs text-gray-400">ENCRYPTED CHANNEL: 0xDC29A8F3</div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-[#2a2a2a] px-3 py-1 rounded-md">
            <Users className="h-4 w-4 text-green-400 mr-2" />
            <span className="text-green-400 text-sm">{aliveCount}</span>
            <span className="text-gray-500 mx-1">|</span>
            <Skull className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-red-500 text-sm">{deadCount}</span>
          </div>
          <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#0a0a0a] scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-900">
        <div className="space-y-4">
          {/* System message */}
          <div className="bg-red-900/20 border border-red-800/50 p-3 rounded-md text-center">
            <AlertTriangle className="h-5 w-5 text-red-500 inline-block mr-2" />
            <span className="text-red-400 text-sm">SECURE CONNECTION ESTABLISHED - OPERATION BELLA CIAO ACTIVE</span>
          </div>

          {/* Messages */}
          {displayedMessages.map((message) => {
            const sender = getSender(message.codeName)
            return (
              <div
                key={message.id}
                className={`flex items-start mb-4 ${
                  message.encrypted ? "bg-[#1a1a1a]/30 border border-yellow-900/30 rounded-md p-2" : ""
                }`}
              >
                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-800 flex-shrink-0 mr-3">
                  <Image
                    src={sender.avatar || "/placeholder.svg"}
                    alt={sender.name}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className={`font-bold ${sender.status === "alive" ? "text-green-500" : "text-red-500"}`}>
                      {sender.name}
                    </span>
                    <span className="text-gray-500 text-xs ml-2">[{message.codeName}]</span>
                    {message.encrypted && (
                      <span className="ml-2 bg-yellow-900/30 text-yellow-500 text-xs px-2 py-0.5 rounded-sm flex items-center">
                        <Shield className="h-3 w-3 mr-1" /> ENCRYPTED
                      </span>
                    )}
                    <span className="ml-auto text-gray-500 text-xs flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {message.timestamp}
                    </span>
                  </div>
                  <div className={`mt-1 ${message.encrypted ? "text-yellow-400" : "text-gray-300"}`}>
                    {message.content}
                  </div>

                  {/* Image message */}
                  {message.image && (
                    <div className="mt-3 relative">
                      <div className="border border-gray-700 rounded-md overflow-hidden bg-black/50">
                        <div className="bg-[#1a1a1a] text-xs text-red-400 px-2 py-1 flex justify-between items-center border-b border-gray-700">
                          <span className="flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            {message.imageClassification}
                          </span>
                          <span className="text-gray-500">
                            #
                            {Math.floor(Math.random() * 1000000)
                              .toString(16)
                              .padStart(6, "0")}
                          </span>
                        </div>
                        <div className="relative">
                          <Image
                            src={message.image || "/placeholder.svg"}
                            alt={message.imageCaption || "Encrypted image"}
                            width={500}
                            height={300}
                            className="max-w-full h-auto"
                          />
                          <div className="absolute inset-0 border-4 border-red-500/20 pointer-events-none"></div>

                          {/* Scanning effect */}
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="h-1 bg-red-500/30 w-full absolute animate-[scan_2s_ease-in-out_infinite]"></div>
                          </div>

                          {/* Corner markers */}
                          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500"></div>
                          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-500"></div>
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-500"></div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500"></div>
                        </div>
                        <div className="bg-[#1a1a1a] text-xs text-gray-400 px-2 py-1 border-t border-gray-700">
                          {message.imageCaption}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {/* Currently typing message */}
          {typing && currentMessageIndex < messages.length && (
            <div className="flex items-start mb-4">
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-800 flex-shrink-0 mr-3">
                <Image
                  src={getSender(messages[currentMessageIndex].codeName).avatar || "/placeholder.svg"}
                  alt={messages[currentMessageIndex].sender}
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <span
                    className={`font-bold ${
                      getSender(messages[currentMessageIndex].codeName).status === "alive"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {messages[currentMessageIndex].sender}
                  </span>
                  <span className="text-gray-500 text-xs ml-2">[{messages[currentMessageIndex].codeName}]</span>
                  <span className="ml-auto text-gray-500 text-xs flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> {messages[currentMessageIndex].timestamp}
                  </span>
                </div>
                <div className="mt-1 text-gray-300">
                  {currentText}
                  <span className="inline-block h-4 w-2 bg-green-500 ml-1 animate-pulse"></span>
                </div>

                {/* Show image placeholder while typing if message has an image */}
                {messages[currentMessageIndex].image &&
                  currentCharIndex >= messages[currentMessageIndex].content.length && (
                    <div className="mt-3 relative">
                      <div className="border border-gray-700 rounded-md overflow-hidden bg-black/50">
                        <div className="bg-[#1a1a1a] text-xs text-red-400 px-2 py-1 flex justify-between items-center border-b border-gray-700">
                          <span className="flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            LOADING...
                          </span>
                          <span className="text-gray-500">
                            #
                            {Math.floor(Math.random() * 1000000)
                              .toString(16)
                              .padStart(6, "0")}
                          </span>
                        </div>
                        <div className="h-[200px] bg-[#0a0a0a] flex items-center justify-center">
                          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area (fake) */}
      <div className="bg-[#1a1a1a] border-t border-red-800 p-4">
        <div className="flex items-center">
          <div className="flex-1 bg-[#0a0a0a] border border-gray-800 rounded-md p-3 text-gray-500">
            Message is encrypted... <span className="inline-block h-4 w-2 bg-green-500 ml-1 animate-pulse"></span>
          </div>
          <button className="ml-3 bg-red-900 hover:bg-red-800 text-white px-4 py-3 rounded-md flex items-center">
            <Fingerprint className="h-5 w-5 mr-2" />
            TRANSMIT
          </button>
        </div>

        {/* Hidden CTF flag in HTML comment */}
        {/* FLAG{HTML_C0MM3NT_H1DD3N_FL4G} */}

        <div className="mt-2 text-xs text-gray-600 flex items-center justify-between">
          <div>ENCRYPTION: AES-256 | CHANNEL: SECURE | PROTOCOL: DALÍ-PROTOCOL</div>
          <div className="flex items-center">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
            <span>CONNECTED</span>
          </div>
        </div>
      </div>

      {/* Hidden element with CTF flag */}
      <div className="hidden" data-flag="FLAG{CSS_H1DD3N_3L3M3NT}"></div>
    </div>
  )
}
