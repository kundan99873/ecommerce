import React from "react";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          If you have any questions, suggestions, or feedback, please feel free
          to reach out to us.
        </p>

        <h2 className="text-2xl font-bold">Customer Support</h2>
        <p>
          For customer support inquiries, please email us at{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-500 hover:underline"
          >
            support@example.com
          </a>
          .
        </p>

        <h2 className="text-2xl font-bold">Feedback</h2>
        <p>
          We value your feedback! Send us your thoughts or suggestions at{" "}
          <a
            href="mailto:feedback@example.com"
            className="text-blue-500 hover:underline"
          >
            feedback@example.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Contact;
