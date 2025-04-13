// Career counseling conversation starters
export const careerPrompts = [
  "What skills should I focus on to become a frontend developer?",
  "How can I transition from a web developer to a mobile app developer?",
  "What's the career path to become a DevOps engineer?",
  "What are the in-demand tech roles in 2024?",
  "How should I prepare for a technical interview?",
];

// Common tech roles for roadmaps
export const techRoles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Mobile App Developer",
  "UI/UX Designer",
  "Cybersecurity Specialist",
  "Cloud Architect",
];

// Skills categories
export const skillCategories = [
  "Programming Languages",
  "Frameworks & Libraries",
  "DevOps & Deployment",
  "Databases",
  "Cloud Technologies",
  "Design & UX",
  "Soft Skills",
];

// Formatting prompts for better structured responses
export const formattingPrompts = [
  "Please format your response with numbered steps",
  "Use clear bullet points for each key point",
  "Organize your answer with clear headings and subheadings",
  "Include a summary at the beginning and action steps at the end",
  "Format your response as a detailed roadmap with milestone sections",
  "Use tables to compare different options or technologies",
];

// Define system prompt for better formatting
const systemPrompt = `You are an AI career counselor specialized in technology careers. 
Format all responses according to these exact specifications:

**MAIN TITLE IN BOLD CAPS**

1. **Numbered Main Point**: Clear description of the point
   - Bullet subpoint without italics
   - Bullet subpoint without italics
   - Bullet subpoint without italics

2. **Numbered Main Point**: Clear description of the point
   - Bullet subpoint without italics
   - Bullet subpoint without italics
   - Bullet subpoint without italics

3. **Numbered Main Point**: Clear description of the point
   - Bullet subpoint without italics
   - Bullet subpoint without italics
   - Bullet subpoint without italics

---

**NEXT SECTION TITLE IN BOLD CAPS**

1. **First Item**: Description of the first item
   - Key detail about this item
   - Another important detail
   - Third critical detail

2. **Second Item**: Description of the second item
   - Key detail about this item
   - Another important detail
   - Third critical detail

3. **Third Item**: Description of the third item
   - Key detail about this item
   - Another important detail
   - Third critical detail

For all content:
• Use **bold** for all titles and key terms
• Use proper Markdown numbered points (1., 2., 3.) for main categories
• Use proper Markdown bullet points (-, *, or •) for subcategories 
• Always leave a space after the bullet or number (e.g., "- Item" not "-Item")
• Never use italics in bullet points
• Use three dashes (---) for section dividers
• Maintain consistent spacing between sections
• Keep clear visual hierarchy with proper indentation
• Use proper Markdown formatting for lists (indentation with spaces)
• Make sure all bullets and numbers are properly aligned
• Keep section headers in ALL CAPS with ** formatting
• Always use Markdown syntax correctly for PDF compatibility`;

const promptTemplate = `Provide a comprehensive analysis on: [TOPIC]

**CAREER ANALYSIS: [TOPIC]**

**KEY INSIGHTS**

1. **Critical Insight**: Professional analysis with supporting evidence
   - Supporting factor: Specific contextual detail
   - Supporting factor: Specific contextual detail
   - Industry impact: How this affects professional trajectories

2. **Critical Insight**: Professional analysis with supporting evidence
   - Supporting factor: Specific contextual detail
   - Supporting factor: Specific contextual detail
   - Industry impact: How this affects professional trajectories

3. **Critical Insight**: Professional analysis with supporting evidence
   - Supporting factor: Specific contextual detail
   - Supporting factor: Specific contextual detail
   - Industry impact: How this affects professional trajectories

---

**STRATEGIC ACTION FRAMEWORK**

1. **Primary Action Initiative**: Explanation with implementation methodology
   - Strategic rationale: Business and career justification
   - Implementation protocol: Step-by-step execution framework
   - Success metrics: Quantifiable outcome measurements

2. **Secondary Action Initiative**: Explanation with implementation methodology
   - Strategic rationale: Business and career justification
   - Implementation protocol: Step-by-step execution framework
   - Success metrics: Quantifiable outcome measurements

3. **Tertiary Action Initiative**: Explanation with implementation methodology
   - Strategic rationale: Business and career justification
   - Implementation protocol: Step-by-step execution framework
   - Success metrics: Quantifiable outcome measurements

---

**PROFESSIONAL RECOMMENDATIONS**

1. **Strategic Directive**: Comprehensive professional guidance
   - Application context: Specific implementation scenarios
   - Risk mitigation: Critical factors to monitor and address
   - Performance indicators: Measurement framework for success

2. **Strategic Directive**: Comprehensive professional guidance
   - Application context: Specific implementation scenarios
   - Risk mitigation: Critical factors to monitor and address
   - Performance indicators: Measurement framework for success

3. **Strategic Directive**: Comprehensive professional guidance
   - Application context: Specific implementation scenarios
   - Risk mitigation: Critical factors to monitor and address
   - Performance indicators: Measurement framework for success

---

**INDUSTRY RESOURCES**

1. **Professional Resource**: Assessment of utility and applications
   - Value proposition: Specific organizational and career benefits
   - Implementation methodology: How to leverage effectively
   - Selection criteria: How to evaluate quality and relevance

2. **Professional Resource**: Assessment of utility and applications
   - Value proposition: Specific organizational and career benefits
   - Implementation methodology: How to leverage effectively
   - Selection criteria: How to evaluate quality and relevance

3. **Professional Resource**: Assessment of utility and applications
   - Value proposition: Specific organizational and career benefits
   - Implementation methodology: How to leverage effectively
   - Selection criteria: How to evaluate quality and relevance`;
