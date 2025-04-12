/**
 * Services Page Component
 * Displays information about all available services with navigation
 */

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/**
 * Services Component
 * Renders a page that showcases all available services with:
 * - Service descriptions
 * - Navigation buttons to each service
 * - Visual elements for better UX
 */
const Services = () => {
  // Service data with descriptions and links
  const services = [
    {
      title: "AI Interview Practice",
      description:
        "Practice your interview skills with our AI-powered mock interviews. Get real-time feedback and improve your performance.",
      icon: "💼",
      link: "/generate",
      buttonText: "Start Interview",
      color: "bg-blue-50",
      borderColor: "border-blue-200",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Resume Builder",
      description:
        "Create a professional resume in minutes with our easy-to-use resume builder. Choose from multiple templates and export in various formats.",
      icon: "📄",
      link: "/resume",
      buttonText: "Build Resume",
      color: "bg-emerald-50",
      borderColor: "border-emerald-200",
      buttonColor: "bg-emerald-500 hover:bg-emerald-600",
    },
    {
      title: "AI Chatbot",
      description:
        "Get instant answers to your career questions and personalized guidance with our AI career assistant.",
      icon: "🤖",
      link: "/chatbot",
      buttonText: "Chat Now",
      color: "bg-purple-50",
      borderColor: "border-purple-200",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  return (
    <Container className="py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive tools to help you succeed in your job search and career
          advancement
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.title}
            className={`rounded-lg border ${service.borderColor} p-6 ${service.color} transition-all duration-300 hover:shadow-md flex flex-col min-h-[350px]`}
          >
            <div>
              {/* Service Icon */}
              <div className="text-4xl mb-4">{service.icon}</div>

              {/* Service Title */}
              <h2 className="text-2xl font-semibold mb-3">{service.title}</h2>

              {/* Service Description */}
              <p className="text-gray-700">{service.description}</p>
            </div>

            {/* Navigation Button - Fixed position at bottom */}
            <div className="mt-auto pt-6">
              <Link to={service.link} className="block">
                <Button
                  className={`w-full ${service.buttonColor} text-white h-10`}
                >
                  {service.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Start Your Career Journey Today
        </h2>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
          Our tools are designed to help you at every stage of your job search,
          from resume creation to interview preparation.
        </p>
        <Link to="/">
          <Button variant="outline" className="mx-auto">
            Learn More
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Services;
