import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white dark:bg-gray-900 border-b">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Contract Assessment</h1>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Register
            </Link>
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

      <footer className="bg-white dark:bg-gray-900 border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} Contract Assessment Application. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
