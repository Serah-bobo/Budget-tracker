import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  { title: "Manage Groups", desc: "Create or join groups and manage budgets together." },
  { title: "Track Expenses", desc: "Log every expense & income, and see where money goes." },
  { title: "Set Goals", desc: "Define financial goals and track progress easily." },
  { title: "Gain Insights", desc: "View charts, trends, and make better decisions." },
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">Shared Budget</h1>
        <nav className="space-x-4">
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:underline focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl text-4xl font-extrabold text-gray-900 md:text-5xl"
        >
          Take Control of Your <span className="text-indigo-600">Shared Budget</span>
        </motion.h2>
        <p className="max-w-xl mt-4 text-lg text-gray-600">
          Track group expenses, set financial goals, and gain insights — all in one collaborative platform.
        </p>
        <div className="mt-6 space-x-4">
          <Link
            to="/signup"
            className="px-6 py-3 text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:underline focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Already have an account?
          </Link>
        </div>

        {/* Hero Illustration */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          src="https://img.freepik.com/free-vector/characters-business-people-performance-growth-icons_53876-43128.jpg?semt=ais_hybrid&w=740"
          alt="Team managing budget"
          className="w-full max-w-md mt-10"
        />
      </main>

      {/* Features */}
      <section className="px-4 py-16 bg-indigo-50">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800">
            Why use Shared Budget?
          </h3>
          <div className="grid gap-8 mt-10 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 transition bg-white rounded-lg shadow hover:shadow-md"
              >
                <h4 className="font-semibold text-indigo-600">{f.title}</h4>
                <p className="mt-2 text-gray-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center text-white bg-indigo-600">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-2xl font-bold md:text-3xl">
            Ready to take control of your finances?
          </h4>
          <p className="mt-2">Join Shared Budget today — it’s free!</p>
          <Link
            to="/signup"
            className="inline-block px-6 py-3 mt-6 text-indigo-600 bg-white rounded-lg shadow hover:bg-gray-100 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-4 text-sm text-center text-gray-500 bg-white shadow-inner">
        &copy; {new Date().getFullYear()} Shared Budget. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
