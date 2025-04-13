/**
 * ResumePreview Component - Improved for better PDF rendering
 */

import { useResumeContext, ResumeTemplate } from "../context/ResumeContext";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Building,
  GraduationCap,
  Github,
  Linkedin,
  Globe,
  Link,
  Award,
  Code,
  ExternalLink,
} from "lucide-react";

export const ResumePreview = () => {
  // Get data directly from context
  const { resumeData } = useResumeContext();

  const {
    template,
    personalInfo,
    summary,
    skills,
    workExperience,
    projects,
    education,
    certificates,
  } = resumeData;

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    } catch {
      return dateString;
    }
  };

  // Get experience duration text
  const getDuration = (
    startDate: string,
    endDate: string,
    current: boolean
  ) => {
    if (!startDate) return "";

    const start = formatDate(startDate);
    const end = current ? "Present" : formatDate(endDate);

    return `${start} - ${end}`;
  };

  // Get skill level bars
  const getSkillLevelBars = (level: number) => {
    const maxBars = 5;
    const bars = [];

    for (let i = 0; i < maxBars; i++) {
      bars.push(
        <div
          key={i}
          className={`h-2 w-full rounded-full ${
            i < level ? "bg-emerald-500" : "bg-gray-200"
          }`}
        />
      );
    }

    return <div className="flex gap-1">{bars}</div>;
  };

  // Render Professional Template with fixed styling for better PDF export
  const renderProfessionalTemplate = () => (
    <div className="text-sm p-4 max-w-full overflow-hidden print:p-0">
      {/* Header with Personal Info */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {personalInfo.photo && (
            <img
              src={personalInfo.photo}
              alt="Profile"
              className="w-28 h-28 rounded-md object-cover flex-shrink-0 mb-4 sm:mb-0"
            />
          )}

          <div className="w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-lg text-gray-600 mb-4">
                {personalInfo.jobTitle}
              </p>
            )}

            {/* Contact Info - Single column layout for better spacing */}
            <div className="flex flex-col space-y-2 mb-2">
              {(personalInfo.city || personalInfo.country) && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="flex-shrink-0 text-gray-600" />
                  <span>
                    {[personalInfo.city, personalInfo.country]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
              )}

              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} className="flex-shrink-0 text-gray-600" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}

              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} className="flex-shrink-0 text-gray-600" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
            </div>

            {/* Links in a separate section with improved layout */}
            <div className="flex flex-wrap gap-4 mt-2">
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin size={16} className="flex-shrink-0 text-gray-600" />
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    LinkedIn
                  </a>
                </div>
              )}

              {personalInfo.github && (
                <div className="flex items-center gap-1">
                  <Github size={16} className="flex-shrink-0 text-gray-600" />
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    GitHub
                  </a>
                </div>
              )}

              {personalInfo.website && (
                <div className="flex items-center gap-1">
                  <Globe size={16} className="flex-shrink-0 text-gray-600" />
                  <a
                    href={personalInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    Website
                  </a>
                </div>
              )}

              {personalInfo.additionalLinks &&
                personalInfo.additionalLinks.map((link) => (
                  <div key={link.id} className="flex items-center gap-1">
                    <Link size={16} className="flex-shrink-0 text-gray-600" />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      {link.label}
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      {summary && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 whitespace-pre-line">{summary}</p>
        </div>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-3">
            Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div key={skill.id || index}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">{skill.name}</span>
                </div>
                {getSkillLevelBars(skill.level)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience Section */}
      {workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-3">
            Work Experience
          </h2>

          <div className="space-y-5">
            {workExperience.map((exp, index) => (
              <div key={exp.id || index}>
                <div className="flex justify-between items-start">
                  <div className="max-w-[70%]">
                    {" "}
                    {/* Added max-width control */}
                    <h3 className="font-medium text-gray-900">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-700">
                      <Building size={14} className="flex-shrink-0" />
                      <span className="truncate">{exp.company}</span>
                      {exp.location && (
                        <>
                          <span className="mx-1">•</span>
                          <span className="truncate">{exp.location}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600 whitespace-nowrap">
                    <Calendar size={14} className="flex-shrink-0" />
                    <span>
                      {getDuration(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                </div>

                {exp.description && (
                  <p className="mt-2 text-gray-700 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-3">
            Projects
          </h2>

          <div className="space-y-5">
            {projects.map((project, index) => (
              <div key={project.id || index}>
                <div className="flex justify-between items-start">
                  <div className="max-w-[70%]">
                    {" "}
                    {/* Added max-width control */}
                    <h3 className="font-medium text-gray-900">
                      {project.title}
                    </h3>
                    {project.technologies && (
                      <div className="flex items-center gap-1 text-gray-700">
                        <Code size={14} className="flex-shrink-0" />
                        <span className="truncate">{project.technologies}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-gray-600 whitespace-nowrap">
                    <Calendar size={14} className="flex-shrink-0" />
                    <span>
                      {getDuration(
                        project.startDate,
                        project.endDate,
                        project.current
                      )}
                    </span>
                  </div>
                </div>

                {project.description && (
                  <p className="mt-2 text-gray-700 whitespace-pre-line">
                    {project.description}
                  </p>
                )}

                <div className="mt-2 flex gap-3">
                  {project.githubUrl && (
                    <div className="text-blue-600 flex items-center gap-1 text-xs">
                      <Github size={12} className="flex-shrink-0" />
                      <span>GitHub</span>
                    </div>
                  )}
                  {project.liveUrl && (
                    <div className="text-blue-600 flex items-center gap-1 text-xs">
                      <ExternalLink size={12} className="flex-shrink-0" />
                      <span>Live Demo</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section - Fixed visibility issues */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-3">
            Education
          </h2>

          <div className="space-y-5">
            {education.map((edu, index) => (
              <div key={edu.id || index}>
                <div className="flex justify-between items-start">
                  <div className="max-w-[70%]">
                    {" "}
                    {/* Added max-width control */}
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <div className="flex items-center gap-1 text-gray-700">
                      <GraduationCap size={14} className="flex-shrink-0" />
                      <span className="truncate">{edu.institution}</span>
                      {edu.location && (
                        <>
                          <span className="mx-1">•</span>
                          <span className="truncate">{edu.location}</span>
                        </>
                      )}
                    </div>
                    {(edu.grade || edu.percentage || edu.percentileRank) && (
                      <div className="text-gray-700 text-sm mt-2 flex flex-wrap gap-3">
                        {edu.grade && <span>Grade: {edu.grade}</span>}
                        {edu.percentage && (
                          <span>Percentage: {edu.percentage}</span>
                        )}
                        {edu.percentileRank && (
                          <span>Percentile: {edu.percentileRank}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-gray-600 whitespace-nowrap">
                    <Calendar size={14} className="flex-shrink-0" />
                    <span>
                      {getDuration(edu.startDate, edu.endDate, edu.current)}
                    </span>
                  </div>
                </div>

                {edu.description && (
                  <p className="mt-2 text-gray-700 whitespace-pre-line">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificates Section - Fixed visibility issues */}
      {certificates.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-3">
            Certificates
          </h2>

          <div className="space-y-4">
            {certificates.map((cert, index) => (
              <div key={cert.id || index} className="flex items-start">
                <Award
                  size={16}
                  className="text-gray-600 mr-2 mt-0.5 flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{cert.name}</h3>
                    {cert.date && (
                      <span className="text-gray-500 text-xs whitespace-nowrap">
                        ({formatDate(cert.date)})
                      </span>
                    )}
                  </div>
                  {cert.issuer && (
                    <p className="text-gray-700 text-sm">
                      Issued by {cert.issuer}
                    </p>
                  )}
                  {cert.url && (
                    <div className="text-blue-600 text-xs flex items-center gap-1 mt-1">
                      <ExternalLink size={10} className="flex-shrink-0" />
                      <span>View Certificate</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Render Modern Template
  const renderModernTemplate = () => (
    <div className="text-sm max-w-full overflow-hidden flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <div className="bg-gray-100 p-4 md:w-1/3">
        {/* Photo and Personal Info */}
        <div className="flex flex-col items-center mb-6">
          {personalInfo.photo && (
            <img
              src={personalInfo.photo}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-4"
            />
          )}
          <h1 className="text-xl font-bold text-center">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-gray-600 text-center">{personalInfo.jobTitle}</p>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-2">
            Contact
          </h2>

          {(personalInfo.city || personalInfo.country) && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gray-600 flex-shrink-0" />
              <span className="text-gray-700 truncate">
                {[personalInfo.city, personalInfo.country]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
          )}

          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-gray-600 flex-shrink-0" />
              <span className="text-gray-700 truncate">
                {personalInfo.phone}
              </span>
            </div>
          )}

          {personalInfo.email && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gray-600 flex-shrink-0" />
                <span className="text-gray-700 break-all">
                  {personalInfo.email}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">
              Skills
            </h2>
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <div key={skill.id || index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 text-sm truncate">
                      {skill.name}
                    </span>
                  </div>
                  {getSkillLevelBars(skill.level)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">
            Links
          </h2>
          <div className="space-y-2 overflow-hidden">
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2 overflow-hidden">
                <Linkedin size={14} className="text-gray-600 flex-shrink-0" />
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm truncate"
                  title={personalInfo.linkedin}
                >
                  LinkedIn
                </a>
              </div>
            )}

            {personalInfo.github && (
              <div className="flex items-center gap-2 overflow-hidden">
                <Github size={14} className="text-gray-600 flex-shrink-0" />
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm truncate"
                  title={personalInfo.github}
                >
                  GitHub
                </a>
              </div>
            )}

            {personalInfo.website && (
              <div className="flex items-center gap-2 overflow-hidden">
                <Globe size={14} className="text-gray-600 flex-shrink-0" />
                <a
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm truncate"
                  title={personalInfo.website}
                >
                  Website
                </a>
              </div>
            )}

            {personalInfo.additionalLinks &&
              personalInfo.additionalLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center gap-2 overflow-hidden"
                >
                  <Link size={14} className="text-gray-600 flex-shrink-0" />
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm truncate"
                    title={link.label}
                  >
                    {link.label}
                  </a>
                </div>
              ))}
          </div>
        </div>

        {/* Document Links - New Section */}
        {certificates.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">
              Documents
            </h2>
            <div className="space-y-2">
              {certificates
                .filter((cert) => cert.url)
                .map((cert) => (
                  <div
                    key={cert.id}
                    className="flex items-center gap-2 overflow-hidden"
                  >
                    <Award size={14} className="text-gray-600 flex-shrink-0" />
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm truncate"
                      title={cert.name}
                    >
                      {cert.name}
                    </a>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-4 md:w-2/3">
        {/* Summary Section */}
        {summary && (
          <div className="mb-6">
            <h2 className="text-base font-semibold border-b border-gray-300 pb-1 mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{summary}</p>
          </div>
        )}

        {/* Work Experience Section */}
        {workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-base font-semibold border-b border-gray-300 pb-1 mb-3">
              Work Experience
            </h2>

            <div className="space-y-4">
              {workExperience.map((exp, index) => (
                <div key={exp.id || index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {exp.position}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-700">
                        <Building size={14} />
                        <span>{exp.company}</span>
                        {exp.location && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{exp.location}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-gray-600 whitespace-nowrap">
                      <Calendar size={14} />
                      <span>
                        {getDuration(exp.startDate, exp.endDate, exp.current)}
                      </span>
                    </div>
                  </div>

                  {exp.description && (
                    <p className="mt-2 text-gray-700 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-base font-semibold border-b border-gray-300 pb-1 mb-3">
              Projects
            </h2>

            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={project.id || index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {project.title}
                      </h3>
                      {project.technologies && (
                        <div className="flex items-center gap-1 text-gray-700">
                          <Code size={14} />
                          <span>{project.technologies}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-gray-600 whitespace-nowrap">
                      <Calendar size={14} />
                      <span>
                        {getDuration(
                          project.startDate,
                          project.endDate,
                          project.current
                        )}
                      </span>
                    </div>
                  </div>

                  {project.description && (
                    <p className="mt-2 text-gray-700 whitespace-pre-line">
                      {project.description}
                    </p>
                  )}

                  <div className="mt-2 flex gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1 text-xs"
                      >
                        <Github size={12} />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1 text-xs"
                      >
                        <ExternalLink size={12} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-base font-semibold border-b border-gray-300 pb-1 mb-3">
              Education
            </h2>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={edu.id || index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {edu.degree}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-700">
                        <GraduationCap size={14} />
                        <span>{edu.institution}</span>
                        {edu.location && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{edu.location}</span>
                          </>
                        )}
                      </div>
                      {(edu.grade || edu.percentage || edu.percentileRank) && (
                        <div className="text-gray-700 text-sm mt-1">
                          {edu.grade && (
                            <span className="mr-2">Grade: {edu.grade}</span>
                          )}
                          {edu.percentage && (
                            <span className="mr-2">
                              Percentage: {edu.percentage}
                            </span>
                          )}
                          {edu.percentileRank && (
                            <span>Percentile: {edu.percentileRank}</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-gray-600 whitespace-nowrap">
                      <Calendar size={14} />
                      <span>
                        {getDuration(edu.startDate, edu.endDate, edu.current)}
                      </span>
                    </div>
                  </div>

                  {edu.description && (
                    <p className="mt-2 text-gray-700 whitespace-pre-line">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates Section */}
        {certificates.length > 0 && (
          <div className="mb-6">
            <h2 className="text-base font-semibold border-b border-gray-300 pb-1 mb-3">
              Certificates
            </h2>

            <div className="space-y-3">
              {certificates.map((cert, index) => (
                <div key={cert.id || index} className="flex items-start">
                  <Award size={16} className="text-gray-600 mr-2 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{cert.name}</h3>
                      {cert.date && (
                        <span className="text-gray-500 text-xs">
                          ({formatDate(cert.date)})
                        </span>
                      )}
                    </div>
                    {cert.issuer && (
                      <p className="text-gray-700 text-sm">
                        Issued by {cert.issuer}
                      </p>
                    )}
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs inline-flex items-center gap-1 mt-1"
                      >
                        <ExternalLink size={10} />
                        <span>View Certificate</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="print:m-0 print:shadow-none">
      {template === ResumeTemplate.MODERN
        ? renderModernTemplate()
        : renderProfessionalTemplate()}
    </div>
  );
};
