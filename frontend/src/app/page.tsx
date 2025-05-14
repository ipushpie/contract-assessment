"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white dark:bg-gray-900 border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              MultiStrat
            </h1>
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-blue-600 dark:text-blue-400 font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                About
              </Link>
              <Link
                href="/features"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
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

      <main className="flex-1 bg-gray-50 dark:bg-gray-950">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Comprehensive Contract Assessment
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Evaluate vendor contracts, track product utilization, and make
                informed decisions about renewals, terminations, and
                renegotiations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-semibold mb-3">
                  Contract Metadata Review
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Review and validate key contract fields including end dates,
                  values, termination notices, and more.
                </p>
                <Link
                  href="/login"
                  className="text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                >
                  Get started <ArrowRight size={16} />
                </Link>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Usage Evaluation</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Track product usage analytics, active users, feature
                  utilization, and identify optimization opportunities.
                </p>
                <Link
                  href="/login"
                  className="text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                >
                  Get started <ArrowRight size={16} />
                </Link>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Strategic Review</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Forecast volume changes, identify redundant products, and
                  evaluate vendor relationships.
                </p>
                <Link
                  href="/login"
                  className="text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                >
                  Get started <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contract Assessment
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Helping businesses make informed decisions about their vendor
                contracts.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Contract Assessment. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
