import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white shadow mt-8">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <p className="text-gray-600">
            &copy; 2023 E-Commerce. All rights reserved.
          </p>
          <div className="space-x-4">
            <Link to={"/policy"} className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link to={"/terms"} className="text-gray-600 hover:text-gray-900">
              Terms of Service
            </Link>
            <Link to={"/contact"} className="text-gray-600 hover:text-gray-900">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
