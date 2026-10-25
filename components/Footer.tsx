import { InstagramIcon, YoutubeIcon, XIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer" id="kontak">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.svg" alt="Logo SMK BAGIT" />
          </div>
          <div>
            <div className="footer-name">SMK BAGIT BALIKPAPAN</div>
            <div className="footer-sub">SPMB Online</div>
          </div>
        </div>

        <div className="footer-right">
          <div className="socials">
            <a href="#" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="YouTube">
              <YoutubeIcon />
            </a>
            <a href="#" aria-label="X">
              <XIcon />
            </a>
          </div>
          <div className="copyright">
            2026 SMK BAGIT BALIKPAPAN, All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
