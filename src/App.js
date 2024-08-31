import React, { useState, useRef, useEffect } from "react";
import {
  Cpu,
  Wifi,
  Bell,
  Server,
  GitBranch,
  Shield,
  MessageSquare,
  Zap,
  Clock,
  Link,
} from "lucide-react";
import "./App.css";

const slides = [
  {
    title: "โครงการ Burner91",
    content: "ระบบตรวจสอบหัวเผาอุตสาหกรรมด้วย IoT",
    backgroundImage:
      "https://images.pexels.com/photos/25473948/pexels-photo-25473948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "ภาพรวมโครงการ",
    content: [
      { icon: Cpu, text: "ใช้ ESP8266 ในการตรวจสอบสถานะหัวเผา" },
      { icon: Shield, text: "ตรวจจับแก๊สและควัน" },
      { icon: Bell, text: "ส่งการแจ้งเตือนผ่าน Microsoft Teams แบบทันที" },
      { icon: Server, text: "มีอินเตอร์เฟซการตั้งค่าผ่านเว็บที่ใช้งานง่าย" },
    ],
    backgroundImage:
      "https://images.pexels.com/photos/27773766/pexels-photo-27773766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "คุณสมบัติหลัก",
    content: [
      { icon: Cpu, text: "ประมวลผลด้วย ESP8266 ประสิทธิภาพสูง" },
      { icon: Wifi, text: "เชื่อมต่อ Wi-Fi เพื่อส่งข้อมูลแบบไร้สาย" },
      { icon: Bell, text: "แจ้งเตือนแบบเรียลไทม์ผ่าน Microsoft Teams" },
      { icon: Server, text: "ตั้งค่าผ่านเว็บอินเตอร์เฟซที่ใช้งานง่าย" },
      { icon: GitBranch, text: "อัปเดตเฟิร์มแวร์แบบ OTA (Over-The-Air)" },
    ],
    backgroundImage:
      "https://images.unsplash.com/photo-1551892589-865f69869476?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Webhook คืออะไร?",
    content: [
      {
        icon: MessageSquare,
        text: "เทคโนโลยีการส่งข้อมูลแบบอัตโนมัติระหว่างแอปพลิเคชัน",
      },
      { icon: Zap, text: "ส่งข้อมูลทันทีที่มีเหตุการณ์เกิดขึ้น (Real-time)" },
      {
        icon: Clock,
        text: "ลดความล่าช้าในการส่งข้อมูล เมื่อเทียบกับการ polling",
      },
      { icon: Link, text: "ใช้ HTTP POST เพื่อส่งข้อมูลไปยัง URL ที่กำหนด" },
    ],
    backgroundImage:
      "https://images.pexels.com/photos/22610370/pexels-photo-22610370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "ประโยชน์ของ Webhook ใน Burner91",
    content: [
      { icon: Bell, text: "แจ้งเตือนสถานะหัวเผาและการตรวจจับแก๊สแบบทันที" },
      { icon: Zap, text: "ลดเวลาตอบสนองต่อเหตุการณ์ฉุกเฉิน" },
      {
        icon: Server,
        text: "ลดภาระของเซิร์ฟเวอร์ เพราะไม่ต้องตรวจสอบสถานะบ่อยๆ",
      },
      { icon: Link, text: "ผสานรวมกับ Microsoft Teams ได้อย่างราบรื่น" },
    ],
    backgroundImage:
      "https://images.pexels.com/photos/18509543/pexels-photo-18509543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const Slide = ({ slide, isActive }) => (
  <div
    className={`slide ${isActive ? "active" : ""}`}
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.backgroundImage})`,
    }}
  >
    <div className="slide-content">
      <h2>{slide.title}</h2>
      {typeof slide.content === "string" ? (
        <p>{slide.content}</p>
      ) : (
        <ul>
          {slide.content.map((item, index) => (
            <li key={index}>
              <item.icon size={24} />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      // ต้องลากนิ้วอย่างน้อย 50px
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="presentation"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <Slide key={index} slide={slide} isActive={index === currentSlide} />
      ))}
      <div className="slide-indicator">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}

export default App;
