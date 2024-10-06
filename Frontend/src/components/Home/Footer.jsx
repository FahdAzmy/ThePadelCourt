import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              About Padel Finder
            </h3>
            <p className="text-gray-400 mb-4">
              Your go-to platform for finding and booking the best padel courts
              in your area. Join the fastest-growing racquet sport community
              today!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Find Courts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Book a Session
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tournaments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Coaching
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Equipment Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>+20 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a
                  href="mailto:info@padelfinder.com"
                  className="hover:text-white transition-colors"
                >
                  info@padelfinder.com
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>123 Padel Street, Nasr City, Cairo</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on new courts and special offers!
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 Padel Finder. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="mx-2 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="mx-2 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="mx-2 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
