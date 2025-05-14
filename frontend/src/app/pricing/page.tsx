'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Check } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$49',
      period: 'per month',
      description: 'Perfect for small businesses just getting started with contract management.',
      features: [
        'Up to 25 contracts',
        '2 user accounts',
        'Basic analytics',
        'Email support',
        '5GB document storage',
        'Standard reporting'
      ],
      cta: 'Start Free Trial',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'per month',
      description: 'Ideal for growing businesses with more complex contract needs.',
      features: [
        'Up to 100 contracts',
        '10 user accounts',
        'Advanced analytics',
        'Priority email support',
        '25GB document storage',
        'Custom reporting',
        'API access',
        'Contract templates'
      ],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact for pricing',
      description: 'Tailored solutions for large organizations with complex requirements.',
      features: [
        'Unlimited contracts',
        'Unlimited user accounts',
        'Enterprise analytics',
        'Dedicated support manager',
        'Unlimited document storage',
        'Advanced reporting',
        'Full API access',
        'Custom integrations',
        'On-premise deployment option',
        'SLA guarantees'
      ],
      cta: 'Contact Sales',
      highlighted: false
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
              <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Features
              </Link>
              <Link href="/pricing" className="text-blue-600 dark:text-blue-400 font-medium">
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
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
              Choose the plan that's right for your business. All plans include a 14-day free trial.
            </p>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`bg-white dark:bg-gray-800 rounded-xl border ${
                    plan.highlighted 
                      ? 'border-blue-500 dark:border-blue-400 shadow-lg ring-2 ring-blue-500 dark:ring-blue-400' 
                      : 'border-gray-200 dark:border-gray-700 shadow-sm'
                  } overflow-hidden transition-all hover:shadow-md`}
                >
                  <div className={`p-6 ${plan.highlighted ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                      <span className="ml-2 text-gray-500 dark:text-gray-400">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                    <Link
                      href={plan.highlighted ? '/register' : '/contact'}
                      className={`block w-full py-3 px-4 rounded-md text-center font-medium ${
                        plan.highlighted
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                      } transition-colors`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-16 px-6 bg-white dark:bg-gray-900">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Can I change plans later?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be prorated.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Do you offer discounts for annual billing?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, we offer a 20% discount when you choose annual billing for any of our plans.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We accept all major credit cards, PayPal, and bank transfers for annual plans.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Is there a setup fee?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No, there are no setup fees for our Starter and Professional plans. Enterprise plans may include custom setup services.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Can I cancel my subscription?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 px-6 bg-blue-600 dark:bg-blue-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to get started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start your 14-day free trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-6 py-3 rounded-md bg-white text-blue-600 font-medium hover:bg-gray-100 transition-colors"
              >
                Start Free Trial
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
