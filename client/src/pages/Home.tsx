import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useDarkMode } from "../hooks/DarkMode";

const features = [
  { title: "Collaborative Groups", desc: "Create groups, invite members, and manage shared finances seamlessly." },
  { title: "Expense Tracking", desc: "Log all income and expenses, keep everyone on the same page." },
  { title: "Smart Goals", desc: "Set savings goals as a team and track progress effortlessly." },
  { title: "Insights & Reports", desc: "Beautiful charts and trends help you make smarter decisions." },
];

const Home = () => {
  const [dark, setDark] = useDarkMode();

  return (
    <div className="flex flex-col min-h-screen text-gray-800 bg-white dark:bg-black dark:text-white">
      <Helmet>
        <title>Shared Budget — Manage Group Finances Effortlessly</title>
        <meta name="description" content="Collaboratively track expenses, set goals, and gain insights." />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white shadow-sm dark:bg-gray-900">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">SharedBudget</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDark(!dark)}
            className="px-2 py-1 text-sm bg-gray-200 rounded dark:bg-gray-700"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
          <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
          <Link to="/signup" className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-between px-8 py-20 md:flex-row bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-gray-900 dark:to-black">
        <div className="max-w-lg space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold leading-tight md:text-5xl"
          >
            Take Control of Your <span className="text-indigo-600 dark:text-indigo-400">Shared Finances</span>
          </motion.h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Collaborate with your team, track spending, achieve goals. All in one platform.
          </p>
          <div className="space-x-4">
            <Link to="/signup" className="px-6 py-3 text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700">
              Get Started Free
            </Link>
            <Link to="/login" className="text-indigo-600 hover:underline dark:text-indigo-400">
              Already have an account?
            </Link>
          </div>
        </div>
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          src="/app-mockup.png"
          alt="App Mockup"
          className="w-full max-w-md mt-10 rounded-lg shadow-lg md:mt-0"
        />
      </section>

      {/* Trusted By */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="mb-6 text-lg text-gray-500 dark:text-gray-400">Trusted by teams at</h3>
          <div className="flex justify-center space-x-8 opacity-70">
            <img src="/logo1.svg" alt="logo1" className="h-6" />
            <img src="/logo2.svg" alt="logo2" className="h-6" />
            <img src="/logo3.svg" alt="logo3" className="h-6" />
            <img src="/logo4.svg" alt="logo4" className="h-6" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-6xl px-4 mx-auto">
          <h3 className="mb-12 text-3xl font-bold text-center">Features You’ll Love</h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-lg shadow bg-gray-50 dark:bg-gray-900"
              >
                <h4 className="font-semibold text-indigo-600 dark:text-indigo-400">{f.title}</h4>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 text-white bg-indigo-600">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <h3 className="text-3xl font-bold">What Our Users Say</h3>
          <blockquote className="italic">
            “Shared Budget completely changed how my friends and I track group expenses. No more confusion, just clarity.”
          </blockquote>
          <p className="font-semibold">— Jane D., Startup Founder</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 text-center bg-gray-100 dark:bg-gray-800">
        <h4 className="text-2xl font-bold">Ready to take control?</h4>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Join thousands of happy users today. Free forever.</p>
        <Link
          to="/signup"
          className="inline-block px-6 py-3 mt-6 text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700"
        >
          Get Started Free
        </Link>
      </section>

      <footer className="py-6 text-sm text-center text-gray-400 dark:text-gray-600">
        © {new Date().getFullYear()} SharedBudget. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
