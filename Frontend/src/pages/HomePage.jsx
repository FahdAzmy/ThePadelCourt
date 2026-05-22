import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Flame,
  Plus,
  Star,
} from "lucide-react";
import { getCourts } from "../api/api";

const fallbackCourtImage = "/FirstCourt.jpg";

function getCourtStatus(court) {
  const firstAvailability = court.availability?.[0];
  const firstSlot = firstAvailability?.timeSlots?.[0];

  if (!firstSlot) {
    return "Check Schedule";
  }

  return `${firstSlot.start}`;
}

function getCourtMeta(court) {
  const slotCount =
    court.availability?.reduce(
      (total, day) => total + (day.timeSlots?.length || 0),
      0
    ) || 0;

  if (court.location) {
    return `${court.location} - ${slotCount} slots`;
  }

  return `${court.location} • ${slotCount} slots`;
}

export default function Home() {
  const sliderRef = useRef(null);
  const [text, setText] = useState("");
  const [courts, setCourts] = useState([]);
  const [courtsStatus, setCourtsStatus] = useState("loading");
  const fullText = "Elevate Your Game.";

  useEffect(() => {
    let index = 0;
    let timeoutId;

    const typeWriter = () => {
      if (index < fullText.length) {
        const nextCharacter = fullText.charAt(index);
        setText((currentText) => currentText + nextCharacter);
        index += 1;
        timeoutId = window.setTimeout(typeWriter, 100);
        return;
      }

      timeoutId = window.setTimeout(() => {
        setText("");
        index = 0;
        typeWriter();
      }, 3000);
    };

    setText("");
    timeoutId = window.setTimeout(typeWriter, 100);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        setCourtsStatus("loading");
        const data = await getCourts();
        setCourts((data.courts || []).slice(0, 10));
        setCourtsStatus("ready");
      } catch (error) {
        console.error("Error Fetching Courts:", error);
        setCourtsStatus("error");
      }
    };

    fetchCourts();
  }, []);

  const scrollFeaturedCourts = (direction) => {
    if (!sliderRef.current) {
      return;
    }

    const firstCard = sliderRef.current.querySelector(".arena-card");
    const cardWidth = firstCard?.offsetWidth || 340;
    const gap = 18;

    sliderRef.current.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <main className="home-shell">
      <div className="ambient-lime ambient-lime-one" />
      <div className="ambient-lime ambient-lime-two" />
      <div className="ambient-lime ambient-lime-three" />

      <section className="hero-stage">
        <div className="hero-court" aria-hidden="true">
          <div className="court-fence fence-left" />
          <div className="court-fence fence-right" />
          <div className="court-light light-left" />
          <div className="court-light light-right" />
          <div className="court-floor" />
        </div>

        <div className="hero-panel glass-panel">
          <p className="hero-kicker">Welcome to</p>
          <h1 className="hero-title">
            <span className="neon-text">{text}</span>
            <span className="typing-caret" />
          </h1>
          <p className="hero-copy">
            Experience the high-octane energy of premium padel under the night
            lights. Precision, speed, and exclusivity await.
          </p>
          <div className="hero-actions">
            <a className="primary-pill" href="/courts">Book a Court</a>
            <a className="ghost-pill" href="/memberships">Explore Memberships</a>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <h2>Featured Arenas</h2>
            <p>Select your stage for tonight&apos;s match.</p>
          </div>
          <div className="featured-heading-actions">
            <div className="slider-controls" aria-label="Featured arenas slider controls">
              <button
                aria-label="Previous featured courts"
                type="button"
                onClick={() => scrollFeaturedCourts(-1)}
              >
                <ChevronLeft size={20} strokeWidth={2.4} />
              </button>
              <button
                aria-label="Next featured courts"
                type="button"
                onClick={() => scrollFeaturedCourts(1)}
              >
                <ChevronRight size={20} strokeWidth={2.4} />
              </button>
            </div>
            <a href="/courts">
              View All <ArrowRight size={17} strokeWidth={2.4} />
            </a>
          </div>
        </div>

        {courtsStatus === "loading" && (
          <div className="courts-message glass-panel">Loading courts from database...</div>
        )}

        {courtsStatus === "error" && (
          <div className="courts-message glass-panel">
            Courts could not be loaded. Please make sure the backend is running.
          </div>
        )}

        {courtsStatus === "ready" && courts.length === 0 && (
          <div className="courts-message glass-panel">
            No courts found in the database yet.
          </div>
        )}

        {courtsStatus === "ready" && courts.length > 0 && (
          <div className="arena-grid arena-slider" ref={sliderRef}>
            {courts.map((court, index) => (
              <article className="arena-card glass-panel" key={court._id || court.name}>
                <div className="arena-visual arena-photo">
                  <img
                    src={court.courtImg?.url || fallbackCourtImage}
                    alt={court.name}
                    loading={index > 2 ? "lazy" : "eager"}
                  />
                  <span className={`arena-badge ${index === 0 ? "live" : ""}`}>
                    {getCourtStatus(court)}
                  </span>
                </div>
                <div className="arena-content">
                  <h3>{court.name}</h3>
                  <div className="arena-meta">
                    <span>
                      <Star size={14} fill="#c3f400" strokeWidth={0} /> 4.{9 - (index % 3)} ({82 + index * 7} reviews)
                    </span>
                    <span>{getCourtMeta(court)}</span>
                  </div>
                  <div className="arena-price-row">
                    <p>
                      ${court.pricePerHour}<span> / hr</span>
                    </p>
                    <a aria-label={`Book ${court.name}`} href={`/court/${court._id}`}>
                      <Plus size={21} strokeWidth={2.2} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="dominance-section">
        <h2>Track Your Dominance</h2>
        <div className="dominance-grid">
          <article className="win-card glass-panel">
            <div className="stat-topline">
              <BarChart3 size={34} strokeWidth={2.3} />
              <span>+12% this month</span>
            </div>
            <div>
              <p>Win Rate</p>
              <strong>68<span>%</span></strong>
            </div>
          </article>
          <article className="mini-stat glass-panel">
            <p>Matches Played</p>
            <strong>42</strong>
          </article>
          <article className="mini-stat glass-panel">
            <p>Current Streak</p>
            <strong className="streak-value">
              5 <Flame size={24} fill="#ff8a1c" stroke="#ff8a1c" />
            </strong>
          </article>
          <article className="next-match glass-panel">
            <div>
              <p>Next Match</p>
              <strong>Tonight, 20:00</strong>
            </div>
            <a aria-label="View next match" href="/profile/reservations">
              <ArrowRight size={23} strokeWidth={2} />
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
