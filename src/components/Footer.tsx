import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">CVG</h3>
            <p className="text-primary-foreground/80">
              Building perfect resumes with AI-powered technology. 
              Your career success is our mission.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <a href="mailto:contact@cvg.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  contact@cvg.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <a href="tel:+1234567890" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span className="text-primary-foreground/80">
                  123 Business Ave, Tech City, TC 12345
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/create-resume" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Create Resume
                </a>
              </li>
              <li>
                <a href="/history" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  History
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © {new Date().getFullYear()} CVG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
