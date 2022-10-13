import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <section className="flex flex-col items-center">
      <img src="/TeachSpaceLogo.png" alt="Teach Space" className="w-screen" />
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              alt="Party"
              src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <p className="mt-4 text-gray-600">
              A one stop app for your teaching admin.
            </p>
            <p className="mt-4 text-gray-600">
              SubmitWat to help you track homework and organise the notes from
              your marking.
            </p>
            <p className="mt-4 text-gray-600">
              A Kanban board to help you organise the tasks from the various
              projects and events of the year. (coming soon!)
            </p>

            <Link
              to="/login"
              className="mt-8 inline-flex items-center rounded border border-blue-800 bg-blue-800 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            >
              <span className="text-sm font-medium"> Get Started </span>

              <svg
                className="ml-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
