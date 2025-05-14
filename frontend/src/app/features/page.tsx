'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CheckCircle, BarChart2, FileText, Users, Shield, Zap } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Contract Metadata Management',
      description: 'Centralize and organize all your contract information including terms, dates, values, and obligations in one secure location.'
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Usage Analytics',
      description: 'Track and analyze product utilization metrics to understand the actual value you\'re getting from your vendor relationships.'
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Strategic Forecasting',
      description: 'Leverage AI-powered insights to forecast future needs and identify opportunities for optimization and cost savings.'
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Role-Based Access Control',
      description: 'Ensure the right people have the right level of access with customizable roles for administrators, reviewers, and viewers.'
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Compliance Monitoring',
      description: 'Stay on top of contractual obligations and regulatory requirements with automated compliance tracking and alerts.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: 'Assessment Workflows',
      description: 'Streamline the contract review process with customizable assessment workflows and approval chains.'
    }
  ];

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
              <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                About
              </Link>
              <Link href="/features" className="text-blue-600 dark:text-blue-400 font-medium">
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
        {/* Hero section */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Features for Contract Management
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools you need to evaluate, manage, and optimize your vendor contracts.
            </p>
          </div>
        </section>

        {/* Features grid */}
        <section className="py-12 px-6 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 px-6 bg-blue-600 dark:bg-blue-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to optimize your contract management?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that are saving time and money with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-6 py-3 rounded-md bg-white text-blue-600 font-medium hover:bg-gray-100 transition-colors"
              >
                Get Started for Free
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-md bg-transparent text-white border border-white font-medium hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
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
