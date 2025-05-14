'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contract Assessment</h1>
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Home
              </Link>
              <Link href="/about" className="text-blue-600 dark:text-blue-400 font-medium">
                About
              </Link>
              <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Pricing
              </Link>
            </nav>
            <ThemeToggle />
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Us</h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Contract Assessment is a comprehensive platform designed to help businesses evaluate, manage, and optimize their vendor contracts. Our mission is to provide organizations with the tools they need to make informed decisions about renewals, terminations, and renegotiations.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Story</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Founded in 2023, Contract Assessment was born out of the frustration experienced by our founders when managing complex vendor relationships across multiple departments. We recognized the need for a centralized platform that could provide visibility into contract terms, usage metrics, and strategic recommendations.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Approach</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We believe that effective contract management requires both quantitative analysis and qualitative assessment. Our platform combines powerful data analytics with expert-driven evaluation frameworks to provide a holistic view of your vendor relationships.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Team</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Our team consists of experienced professionals from the fields of procurement, legal, finance, and software development. This diverse expertise allows us to understand the multifaceted nature of contract management and build solutions that address real-world challenges.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We'd love to hear from you! Whether you have questions about our platform, want to request a demo, or are interested in joining our team, please don't hesitate to reach out.
              </p>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mt-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Get in Touch</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Email: <a href="mailto:info@contractassessment.com" className="text-blue-600 dark:text-blue-400">info@contractassessment.com</a>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Phone: +1 (555) 123-4567
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Address: 123 Business Ave, Suite 456, San Francisco, CA 94107
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contract Assessment</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Helping businesses make informed decisions about their vendor contracts.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Contract Assessment. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
