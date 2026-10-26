"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const initials = (name: string) => name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

/**
 * In-app call room. Without a video provider configured nothing is transmitted; the user's own camera
 * preview starts only when they turn the camera on.
 */
export default function VideoCall({ otherName, agenda, onEnd }: { otherName: string; agenda?: string; onEnd: () => void }) {
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(false);
  const [screen, setScreen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [seconds, setSeconds] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const endButton = useRef<HTMLButtonElement>(null);
  const items = (agenda || "Introductions, Review the brief, Agree next steps").split(/\n|,|;/).map((s) => s.trim()).filter(Boolean);

  useEffect(() => {
    endButton.current?.focus();
    const timer = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onEnd(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      stream.current?.getTracks().forEach((t) => t.stop());
    };
  }, [onEnd]);

  const toggleCamera = async () => {
    setCameraError("");
    if (camera) {
      stream.current?.getTracks().forEach((t) => t.stop());
      stream.current = null;
      setCamera(false);
      return;
    }
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      stream.current = media;
      setCamera(true);
      requestAnimationFrame(() => { if (video.current) video.current.srcObject = media; });
    } catch {
      setCameraError("Camera unavailable — check your browser permissions.");
    }
  };

  const clock = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="call" role="dialog" aria-modal="true" aria-label={`Video call with ${otherName}`}>
      <div className="call-stage">
        <div className="row-between">
          <div><b>Call with {otherName}</b><div className="small" style={{ color: "#cbb7ef" }}>{clock} · Preview mode — connect a video provider to go live</div></div>
          <span className="badge" style={{ background: "#2e1b4b", color: "#e6dbf7" }}><Icon name="lock" size={12} /> Encrypted call</span>
        </div>
        <div className="call-video">
          <div className="call-big" aria-hidden="true">{screen ? <Icon name="monitor" size={40} /> : initials(otherName)}</div>
          <span className="call-name"><Icon name="mic" size={12} /> {otherName}{screen ? " · viewing your screen" : ""}</span>
          <div className="call-self">
            {camera ? <video ref={video} autoPlay muted playsInline aria-label="Your camera preview" /> : <span className="small">You{mic ? "" : " · muted"}</span>}
          </div>
        </div>
        {cameraError && <p className="small center" role="alert" style={{ color: "#ffb4b4" }}>{cameraError}</p>}
        <div className="call-controls">
          <button type="button" aria-pressed={mic} aria-label={mic ? "Mute microphone" : "Unmute microphone"} onClick={() => setMic((v) => !v)}><Icon name="mic" /></button>
          <button type="button" aria-pressed={camera} aria-label={camera ? "Turn camera off" : "Turn camera on"} onClick={() => void toggleCamera()}><Icon name="video" /></button>
          <button type="button" aria-pressed={screen} aria-label={screen ? "Stop sharing screen" : "Share screen"} onClick={() => setScreen((v) => !v)}><Icon name="monitor" /></button>
          <button ref={endButton} type="button" className="end" onClick={onEnd}><Icon name="phoneOff" size={18} /> End call</button>
        </div>
      </div>
      <aside className="call-side" aria-label="Meeting agenda and notes">
        <b>Agenda</b>
        {items.map((item) => <label key={item}><input type="checkbox" /> {item}</label>)}
        <b>Shared notes</b>
        <textarea className="input" style={{ background: "#1d1129", color: "#fff", borderColor: "#3d2566" }} placeholder="Jot down notes for this call…" aria-label="Shared notes" />
      </aside>
    </div>
  );
}
