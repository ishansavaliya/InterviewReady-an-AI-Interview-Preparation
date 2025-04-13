import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Initialize Gemini AI with API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

// Configure the AI model - Use the latest available Gemini model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Updated to a valid model name
});

/**
 * Generation Configuration
 * Controls how the AI model generates responses
 */
const generationConfig = {
  temperature: 0.8, // Slightly lower for more focused career advice
  topP: 0.95, // Nucleus sampling parameter
  topK: 40, // Top-k sampling parameter
  maxOutputTokens: 8192, // Maximum length of generated response
  responseMimeType: "text/plain", // Response format
};

/**
 * Safety Settings
 * Configures content filtering and safety thresholds
 */
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Define system prompt for better formatting
const systemPrompt = `You are an AI career counselor specialized in technology careers. 
Format all responses according to these exact specifications:

**MAIN TITLE IN BOLD CAPS**

1. **Numbered Main Point**: Clear description of the point
   • Bullet subpoint without italics
   • Bullet subpoint without italics
   • Bullet subpoint without italics

2. **Numbered Main Point**: Clear description of the point
   • Bullet subpoint without italics
   • Bullet subpoint without italics
   • Bullet subpoint without italics

3. **Numbered Main Point**: Clear description of the point
   • Bullet subpoint without italics
   • Bullet subpoint without italics
   • Bullet subpoint without italics

---

**NEXT SECTION TITLE IN BOLD CAPS**

1. **First Item**: Description of the first item
   • Key detail about this item
   • Another important detail
   • Third critical detail

2. **Second Item**: Description of the second item
   • Key detail about this item
   • Another important detail
   • Third critical detail

3. **Third Item**: Description of the third item
   • Key detail about this item
   • Another important detail
   • Third critical detail

For all content:
• Use **bold** for all titles and key terms
• Use numbered points (1, 2, 3) for main categories
• Use bullet points (•) for subcategories 
• Never use italics in bullet points
• Maintain consistent spacing between sections
• Keep clear visual hierarchy with proper indentation`;

// Create chat session
export const careerChatSession = model.startChat({
  generationConfig,
  safetySettings,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "I need help with career counseling regarding my tech career.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Hello! I'm your AI career counselor, here to help you navigate your tech career journey. I can provide guidance on various aspects such as:\n\n• Career roadmaps for different tech roles\n• Skills you need to develop\n• Learning resources and recommendations\n• Interview preparation advice\n• Industry trends and insights\n\nWhat specific area of your tech career would you like to discuss today?",
        },
      ],
    },
    {
      role: "user",
      parts: [{ text: systemPrompt }],
    },
    {
      role: "model",
      parts: [
        {
          text: "I understand! I'll format my responses to be concise, scannable, and visually organized with clear headings, bullet points, and highlighting of key information. I'll focus on giving practical career advice in a clean, easy-to-read format. How can I help with your tech career today?",
        },
      ],
    },
  ],
});

// Function to get career advice
export async function getCareerAdvice(topic: string): Promise<string> {
  try {
    const promptTemplate = `Provide a formal, comprehensive analysis on: ${topic}

**CAREER ANALYSIS: ${topic.toUpperCase()}**

**KEY INSIGHTS**

1. **Critical Insight**: Detailed professional analysis with supporting evidence
   • Supporting factor: Specific contextual detail
   • Supporting factor: Specific contextual detail
   • Industry impact: How this affects professional trajectories

2. **Critical Insight**: Detailed professional analysis with supporting evidence
   • Supporting factor: Specific contextual detail
   • Supporting factor: Specific contextual detail
   • Industry impact: How this affects professional trajectories

3. **Critical Insight**: Detailed professional analysis with supporting evidence
   • Supporting factor: Specific contextual detail
   • Supporting factor: Specific contextual detail
   • Industry impact: How this affects professional trajectories

---

**STRATEGIC ACTION FRAMEWORK**

1. **Primary Action Initiative**: Formal explanation with implementation methodology
   • Strategic rationale: Business and career justification
   • Implementation protocol: Step-by-step execution framework
   • Success metrics: Quantifiable outcome measurements

2. **Secondary Action Initiative**: Formal explanation with implementation methodology
   • Strategic rationale: Business and career justification
   • Implementation protocol: Step-by-step execution framework
   • Success metrics: Quantifiable outcome measurements

3. **Tertiary Action Initiative**: Formal explanation with implementation methodology
   • Strategic rationale: Business and career justification
   • Implementation protocol: Step-by-step execution framework
   • Success metrics: Quantifiable outcome measurements

4. **Quaternary Action Initiative**: Formal explanation with implementation methodology
   • Strategic rationale: Business and career justification
   • Implementation protocol: Step-by-step execution framework
   • Success metrics: Quantifiable outcome measurements

---

**PROFESSIONAL RECOMMENDATIONS**

1. **Strategic Directive**: Comprehensive professional guidance
   • Application context: Specific implementation scenarios
   • Risk mitigation: Critical factors to monitor and address
   • Performance indicators: Measurement framework for success evaluation

2. **Strategic Directive**: Comprehensive professional guidance
   • Application context: Specific implementation scenarios
   • Risk mitigation: Critical factors to monitor and address
   • Performance indicators: Measurement framework for success evaluation

3. **Strategic Directive**: Comprehensive professional guidance
   • Application context: Specific implementation scenarios
   • Risk mitigation: Critical factors to monitor and address
   • Performance indicators: Measurement framework for success evaluation

---

**INDUSTRY RESOURCES**

1. **Professional Resource**: Formal assessment of utility and applications
   • Value proposition: Specific organizational and career benefits
   • Implementation methodology: How to leverage effectively
   • Selection criteria: How to evaluate quality and relevance

2. **Professional Resource**: Formal assessment of utility and applications
   • Value proposition: Specific organizational and career benefits
   • Implementation methodology: How to leverage effectively
   • Selection criteria: How to evaluate quality and relevance

3. **Professional Resource**: Formal assessment of utility and applications
   • Value proposition: Specific organizational and career benefits
   • Implementation methodology: How to leverage effectively
   • Selection criteria: How to evaluate quality and relevance`;

    const result = await careerChatSession.sendMessage(promptTemplate);
    return result.response.text();
  } catch (error) {
    console.error("Error generating career advice:", error);
    return `**CAREER ANALYSIS: ${topic.toUpperCase()}**\n\nSorry, I'm having trouble generating career advice. Please try again.`;
  }
}

// Function to get career roadmap
export async function getRoadmap(career: string): Promise<string> {
  try {
    const promptTemplate = `Create a formal, meticulously structured career progression roadmap for a ${career} professional.

**PROFESSIONAL ROADMAP: ${career.toUpperCase()}**

**CAREER OVERVIEW & MARKET ANALYSIS**

1. **Role Definition**: Comprehensive explanation of ${career} position and responsibilities
   • Core function: Primary professional purpose
   • Industry context: Where this role fits in organizations
   • Value delivery: How this position contributes to business objectives

2. **Market Outlook**: Evidence-based projections with statistical support
   • Growth trajectory: Quantified demand forecast (2024-2030)
   • Geographic distribution: Regions with highest demand
   • Compensation analysis: Detailed salary ranges by experience level
     - Entry level: $XX,XXX - $XX,XXX
     - Mid-career: $XX,XXX - $XX,XXX
     - Senior level: $XX,XXX - $XX,XXX
     - Executive level: $XX,XXX+

---

**REQUISITE PROFESSIONAL COMPETENCIES**

1. **Technical Expertise Requirements**
   • Core Competency: Detailed explanation with practical applications
   • Core Competency: Detailed explanation with practical applications
   • Core Competency: Detailed explanation with practical applications
   • Core Competency: Detailed explanation with practical applications
   • Core Competency: Detailed explanation with practical applications

2. **Professional Soft Skills**
   • Essential Soft Skill: Detailed context for this professional role
   • Essential Soft Skill: Detailed context for this professional role
   • Essential Soft Skill: Detailed context for this professional role
   • Essential Soft Skill: Detailed context for this professional role

---

**ACADEMIC & CREDENTIAL REQUIREMENTS**

1. **Formal Education**: Comprehensive analysis of degree requirements
   • Degree relevance: Specific educational backgrounds and their value
   • Academic specializations: Optimal focus areas
   • Continuing education: Requirements for staying current

2. **Alternative Qualification Pathways**: Non-traditional routes to competency
   • Self-directed learning: Structured approach
   • Professional bootcamps: Selection criteria and outcomes
   • Experiential learning: Building equivalent expertise

3. **Foundational Prerequisites**: Essential baseline knowledge
   • Conceptual foundations: Fundamental principles
   • Technical prerequisites: Necessary prior skills
   • Preparatory resources: Materials for building foundations

---

**PROFESSIONAL PROGRESSION FRAMEWORK**

1. **Entry-Level Career Phase (0-2 years)**
   • Position Titles: Formal role designations
   • Core Responsibilities: Detailed description of duties
   • Performance Metrics: How success is measured
   • Portfolio Development Strategy: Projects to build

2. **Mid-Career Development Phase (3-5 years)**
   • Position Titles: Formal role designations
   • Core Responsibilities: Detailed description of duties
   • Advanced Competency Development: Skills to focus on
   • Career Advancement Strategies: How to move up

3. **Senior Professional Phase (5-8 years)**
   • Position Titles: Formal role designations
   • Core Responsibilities: Detailed description of duties
   • Specialization Pathways: Areas for deep expertise
   • Leadership Development Trajectory: Management skills

4. **Executive/Expert Phase (8+ years)**
   • Position Titles: Formal role designations
   • Strategic Responsibilities: Detailed description of duties
   • Industry Leadership Indicators: Thought leadership

---

**PROFESSIONAL DEVELOPMENT ROADMAP**

1. **Foundation Building Phase (Months 0-6)**
   • Core Knowledge Acquisition: What to learn first
   • Recommended Learning Resources: Best materials

2. **Professional Competency Development (Months 6-18)**
   • Applied Skill Development: Practical applications
   • Portfolio Development Strategy: Projects to build

3. **Advanced Expertise Cultivation (Years 2-4)**
   • Specialized Knowledge Development: Deep expertise areas
   • Professional Network Development: Community engagement

4. **Leadership & Innovation Phase (Years 4+)**
   • Strategic Competency Development: Business skills
   • Industry Contribution Framework: Giving back

---

**PROFESSIONAL RESOURCES & CREDENTIALS**

1. **Industry Certifications**
   • Certification: Detailed value assessment and requirements
   • Certification: Detailed value assessment and requirements
   • Certification: Detailed value assessment and requirements

2. **Professional Associations**
   • Organization: Specific membership benefits
   • Organization: Specific membership benefits
   • Organization: Specific membership benefits

3. **Educational Resources**
   • Learning platform: Specific curriculum advantages
   • Learning platform: Specific curriculum advantages
   • Learning platform: Specific curriculum advantages`;

    const result = await careerChatSession.sendMessage(promptTemplate);
    return result.response.text();
  } catch (error) {
    console.error("Error getting roadmap:", error);
    return `**PROFESSIONAL ROADMAP: ${career.toUpperCase()}**\n\nSorry, I'm having trouble generating the career roadmap. Please try again.`;
  }
}

// Function to get skills advice
export async function getSkillsAdvice(category: string): Promise<string> {
  try {
    const promptTemplate = `Provide comprehensive, detailed guidance on essential ${category} skills for tech professionals.

**${category.toUpperCase()} SKILLS ASSESSMENT**

**CRITICAL COMPETENCIES**

1. **Essential Skill**: Comprehensive explanation of importance and application
   • Technical context: Where and how this skill is used
   • Proficiency levels: What beginner to expert looks like
   • Learning resources: Best ways to develop this skill

2. **Essential Skill**: Comprehensive explanation of importance and application
   • Technical context: Where and how this skill is used
   • Proficiency levels: What beginner to expert looks like
   • Learning resources: Best ways to develop this skill

3. **Essential Skill**: Comprehensive explanation of importance and application
   • Technical context: Where and how this skill is used
   • Proficiency levels: What beginner to expert looks like
   • Learning resources: Best ways to develop this skill

4. **Essential Skill**: Comprehensive explanation of importance and application
   • Technical context: Where and how this skill is used
   • Proficiency levels: What beginner to expert looks like
   • Learning resources: Best ways to develop this skill

---

**SKILL DEVELOPMENT FRAMEWORK**

1. **Foundational Level**: What beginners should focus on
   • Core concepts: Fundamental knowledge areas
   • Learning objectives: Specific skills to develop
   • Practice projects: Hands-on applications to build

2. **Intermediate Level**: Mid-career progression focus
   • Advanced concepts: More complex knowledge areas
   • Integration skills: Connecting with other competencies
   • Real-world applications: Professional implementation

3. **Advanced Level**: Expert-level mastery targets
   • Specialized expertise: Cutting-edge techniques
   • Leadership applications: Teaching and mentoring
   • Innovation opportunities: Contributing to the field

---

**INDUSTRY APPLICATIONS**

1. **Role Relevance**: How these skills apply to specific positions
   • Entry-level positions: Applications and expectations
   • Mid-level roles: Advanced applications
   • Senior positions: Strategic implementations

2. **Industry Trends**: Current and emerging developments
   • Market demand: Hiring patterns and priorities
   • Technology evolution: How the field is changing
   • Compensation impact: Salary effects of mastery

3. **Career Advancement**: Leveraging skills for progression
   • Portfolio building: Demonstrating capabilities
   • Professional branding: Establishing expertise
   • Leadership pathways: Growing beyond technical work

---

**PRACTICAL SKILL-BUILDING RESOURCES**

1. **Learning Platforms**: Best educational resources
   • Online courses: Recommended specific programs
   • Books and publications: Essential reading materials
   • Community resources: Forums and discussion groups

2. **Practice Opportunities**: Hands-on experience building
   • Project ideas: Specific implementation examples
   • Open source contributions: Collaborative learning
   • Portfolio development: Showcasing your abilities

3. **Assessment Methods**: Measuring and validating skills
   • Self-evaluation: Tracking your progress
   • Certifications: Formal validation options
   • Peer review: Community feedback mechanisms`;

    const result = await careerChatSession.sendMessage(promptTemplate);
    return result.response.text();
  } catch (error) {
    console.error("Error getting skills advice:", error);
    return `**${category.toUpperCase()} SKILLS ASSESSMENT**\n\nSorry, I'm having trouble generating skills advice. Please try again.`;
  }
}

// Function to get skills guidance
export async function getSkillsGuidance(skill: string): Promise<string> {
  try {
    const promptTemplate = `Develop a comprehensive, formally structured development framework for mastering the ${skill} competency in technology careers.

Format your response according to these precise specifications:

# ${skill.toUpperCase()}: PROFESSIONAL COMPETENCY DEVELOPMENT FRAMEWORK

---

## STRATEGIC IMPORTANCE ANALYSIS

• **Industry Relevance Assessment**: Comprehensive evaluation of ${skill} in technology careers
  » Business value proposition: Quantifiable organizational benefits
  » Market differentiation: Competitive advantages provided
  » Strategic positioning: How this competency affects career trajectories

• **Career Advancement Impact**: Evidence-based analysis of professional outcomes
  » Promotion metrics: How this competency influences advancement
  » Compensation effect: Salary differential analysis
  » Leadership correlation: Impact on management opportunities

• **Current Market Dynamics**: Data-driven industry demand assessment
  » Demand quantification: Current and projected hiring metrics
  » Geographic distribution: Regional demand patterns
  » Industry sector analysis: Vertical-specific relevance assessment

---

## COMPREHENSIVE DEVELOPMENT ROADMAP

1. **Foundational Proficiency Level**
   
   • **Core Knowledge Requirements**:
     » Conceptual foundation 1: Detailed explanation and context
     » Conceptual foundation 2: Detailed explanation and context
     » Conceptual foundation 3: Detailed explanation and context
   
   • **Initial Skill Development Resources**:
     » Resource category 1: Specific recommendation with rationale
     » Resource category 2: Specific recommendation with rationale
     » Implementation methodology: Structured learning approach
   
   • **Entry-Level Implementation Projects**:
     » Project specification 1: Technical parameters and learning objectives
     » Project specification 2: Technical parameters and learning objectives
     » Assessment methodology: Measuring successful skill acquisition

2. **Intermediate Proficiency Level**
   
   • **Advanced Conceptual Framework**:
     » Advanced concept 1: Technical specifications and applications
     » Advanced concept 2: Technical specifications and applications
     » Advanced concept 3: Technical specifications and applications
   
   • **Professional Application Methodologies**:
     » Application context 1: Implementation requirements and outcomes
     » Application context 2: Implementation requirements and outcomes
     » Integration strategy: Combining with complementary competencies
   
   • **Demonstrable Expertise Projects**:
     » Project specification 1: Technical requirements and professional outcomes
     » Project specification 2: Technical requirements and professional outcomes
     » Evaluation framework: Standards for assessing implementation quality

3. **Advanced Proficiency Level**
   
   • **Specialized Knowledge Domains**:
     » Specialization pathway 1: Technical focus and market positioning
     » Specialization pathway 2: Technical focus and market positioning
     » Specialization selection criteria: How to determine optimal focus
   
   • **Domain Mastery Indicators**:
     » Performance metric 1: Quantifiable measurement of expertise
     » Performance metric 2: Quantifiable measurement of expertise
     » Benchmarking methodology: Industry standards comparison
   
   • **Professional Contribution Frameworks**:
     » Contribution category 1: How to advance the field
     » Contribution category 2: How to advance the field
     » Impact assessment: Measuring professional influence

---

## EDUCATIONAL RESOURCE FRAMEWORK

### Professional Learning Platforms

• **Platform 1**: Comprehensive assessment of curriculum and effectiveness
  » Content quality: Specific advantages and limitations
  » Practical application: Implementation opportunities
  » Investment analysis: Cost/benefit evaluation

• **Platform 2**: Comprehensive assessment of curriculum and effectiveness
  » Content quality: Specific advantages and limitations
  » Practical application: Implementation opportunities
  » Investment analysis: Cost/benefit evaluation

• **Platform 3**: Comprehensive assessment of curriculum and effectiveness
  » Content quality: Specific advantages and limitations
  » Practical application: Implementation opportunities
  » Investment analysis: Cost/benefit evaluation

### Authoritative Publications

• **Publication 1**: Detailed content analysis and application context
  » Knowledge domain coverage: Specific technical areas addressed
  » Practical implementation: How to apply theoretical concepts
  » Target audience: Appropriate experience level

• **Publication 2**: Detailed content analysis and application context
  » Knowledge domain coverage: Specific technical areas addressed
  » Practical implementation: How to apply theoretical concepts
  » Target audience: Appropriate experience level

• **Publication 3**: Detailed content analysis and application context
  » Knowledge domain coverage: Specific technical areas addressed
  » Practical implementation: How to apply theoretical concepts
  » Target audience: Appropriate experience level

### Professional Communities

• **Community 1**: Membership value assessment and engagement strategy
  » Networking benefits: Professional connection opportunities
  » Knowledge acquisition: Learning and development resources
  » Contribution opportunities: How to establish reputation

• **Community 2**: Membership value assessment and engagement strategy
  » Networking benefits: Professional connection opportunities
  » Knowledge acquisition: Learning and development resources
  » Contribution opportunities: How to establish reputation

• **Community 3**: Membership value assessment and engagement strategy
  » Networking benefits: Professional connection opportunities
  » Knowledge acquisition: Learning and development resources
  » Contribution opportunities: How to establish reputation

---

## PRACTICAL IMPLEMENTATION PROJECTS

• **Project Category 1**: Comprehensive technical specifications
  » Implementation methodology: Step-by-step development approach
  » Skill demonstration: What competencies this showcases
  » Portfolio impact: How this enhances professional credibility

• **Project Category 2**: Comprehensive technical specifications
  » Implementation methodology: Step-by-step development approach
  » Skill demonstration: What competencies this showcases
  » Portfolio impact: How this enhances professional credibility

• **Project Category 3**: Comprehensive technical specifications
  » Implementation methodology: Step-by-step development approach
  » Skill demonstration: What competencies this showcases
  » Portfolio impact: How this enhances professional credibility

• **Project Category 4**: Comprehensive technical specifications
  » Implementation methodology: Step-by-step development approach
  » Skill demonstration: What competencies this showcases
  » Portfolio impact: How this enhances professional credibility

---

## PROFESSIONAL CERTIFICATION & CREDENTIAL ANALYSIS

• **Certification Program 1**: Detailed value assessment for career advancement
  » Industry recognition: Market perception and acceptance
  » Technical coverage: Competencies validated
  » Procurement methodology: Requirements and preparation strategy

• **Certification Program 2**: Detailed value assessment for career advancement
  » Industry recognition: Market perception and acceptance
  » Technical coverage: Competencies validated
  » Procurement methodology: Requirements and preparation strategy

• **Alternative Credential Framework**: Non-certification validation methods
  » Portfolio development: Structured approach to demonstrating expertise
  » Professional references: Building credible endorsements
  » Public contributions: Open-source and community engagement strategy

---

## PROFESSIONAL INTEGRATION METHODOLOGY

• **Resume Presentation Framework**: Optimal representation strategy
  » Language specification: Precise terminology and keywords
  » Achievement quantification: Metrics for demonstrating impact
  » Experience articulation: How to present practical application

• **Interview Demonstration Strategy**: Evidence-based approach to validation
  » Question preparation: Anticipated assessment areas
  » Response methodology: Structured approach to answers
  » Practical demonstration: Technical assessment navigation

---`;

    const result = await careerChatSession.sendMessage(promptTemplate);
    return result.response.text();
  } catch (error) {
    console.error("Error generating skills guidance:", error);
    return `# ${skill.toUpperCase()}: PROFESSIONAL COMPETENCY DEVELOPMENT FRAMEWORK\n\nSorry, I'm having trouble generating skills guidance. Please try again.`;
  }
}
