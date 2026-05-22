import { Share2 } from "lucide-react";
import Logo from "../Logo";

export default function Footer() {
  return (
    <footer className="premium-footer">
      <div className="premium-footer-grid">
        <div>
          <div className="footer-brand">
            <Logo width={34} height={34} />
            <span>ThePadelCourt</span>
          </div>
          <p>Premium Performance.</p>
        </div>
        <nav>
          <a href="/courts">Courts</a>
          <a href="/memberships">Memberships</a>
          <a href="/#coaching">Coaching</a>
          <a href="/#privacy">Privacy</a>
        </nav>
        <div>
          <h3>Contact</h3>
          <p>info@thepadelcourt.com</p>
        </div>
        <div>
          <h3>Follow Us</h3>
          <a className="footer-icon-link" href="/" aria-label="Share ThePadelCourt">
            <Share2 size={20} strokeWidth={2} />
          </a>
        </div>
      </div>
      <p className="footer-copy">© 2024 ThePadelCourt. Premium Performance.</p>
    </footer>
  );
}
