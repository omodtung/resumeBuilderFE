"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLoginModal } from "@/context/LoginModalContext";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { useRouter } from 'next/navigation';
import ResumePreview from "@/components/ResumePreview";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import Link from "next/link";
import { useRef } from "react";
import Theme1 from "./theme1";
import Theme2 from "./theme2";

const themes = [
  {
    id: "FPT",
    name: "FPT",
    component: Theme1,
  },
  {
    id: "VNG",
    name: "VNG",
    component: Theme2,
  },
];

export default function ThemePage() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [resumeData, setResumeData] = useState({
    "id": 1,
    "title": "Senior Software Engineer At Google Quancom",
    "description": "A highly motivated and experienced software engineer with a passion for building scalable and robust applications.",
    "photo": "",
    "colorHex": "#3498db",
    "borderStyle": "solid 2px #2980b9",
    "summary": "Results-oriented senior software engineer with over 8 years of experience in designing, developing, and deploying enterprise-level software solutions. Proven ability to lead and mentor teams, and a strong advocate for best practices and code quality.",
    "firstName": "Alice ,michela",
    "lastName": "Smith",
    "jobTitle": "Lead Developer",
    "city": "Ho Chi Minh City",
    "country": "Vietnam",
    "phone": "0901234567",
    "email": "alice.smith@example.com",
    "workExperiences": [
      {
        "id": 5,
        "position": "Senior Software Engineer",
        "company": "Tech Solutions Inc.",
        "startDate": "2023-01-15",
        "endDate": "2025-04-11",
        "description": "Led the development of a new microservices architecture for the company's flagship product, resulting in a 20% improvement in performance and scalability. Mentored junior developers and implemented CI/CD pipelines."
        
      },
      {
        "id": 6,
        "position": "Software Engineer",
        "company": "Innovate Software Ltd.",
        "startDate": "2020-06-01",
        "endDate": "2022-12-31",
        "description": "Developed and maintained key features for a large-scale web application using Java, Spring, and React. Contributed to the design and implementation of RESTful APIs."
      
      }
    ],
    "educations": [
      {
        "id": 5,
        "degree": "Master of Science in Computer Science",
        "school": "Stanford University",
        "startDate": "2018-09-05",
        "endDate": "2020-05-20"
       
      },
      {
        "id": 6,
        "degree": "Bachelor of Science in Software Engineering",
        "school": "University of California, Berkeley",
        "startDate": "2014-09-01",
        "endDate": "2018-05-15"
        
      }
    ],
    "skills": [
      "Java",
      "Spring Framework",
      "React",
      "Microservices",
      "RESTful APIs",
      "Agile Methodologies",
      "Git",
      "Docker",
      "Kubernetes"
    ]
   
  });
  const { token } = useAuth();
  const { setIsLoginModalOpen } = useLoginModal();
  const router = useRouter();

  useEffect(() => {
    const fetchResumeData = async () => {
      const data = {
        "id": 1,
        "title": "Senior Software Engineer At Google Quancom",
        "description": "A highly motivated and experienced software engineer with a passion for building scalable and robust applications.",
        "photo": "",
        "colorHex": "#3498db",
        "borderStyle": "solid 2px #2980b9",
        "summary": "Results-oriented senior software engineer with over 8 years of experience in designing, developing, and deploying enterprise-level software solutions. Proven ability to lead and mentor teams, and a strong advocate for best practices and code quality.",
        "firstName": "Alice ,michela",
        "lastName": "Smith",
        "jobTitle": "Lead Developer",
        "city": "Ho Chi Minh City",
        "country": "Vietnam",
        "phone": "0901234567",
        "email": "alice.smith@example.com",
        "workExperiences": [
          {
            "id": 5,
            "position": "Senior Software Engineer",
            "company": "Tech Solutions Inc.",
            "startDate": "2023-01-15",
            "endDate": "2025-04-11",
            "description": "Led the development of a new microservices architecture for the company's flagship product, resulting in a 20% improvement in performance and scalability. Mentored junior developers and implemented CI/CD pipelines."
            
          },
          {
            "id": 6,
            "position": "Software Engineer",
            "company": "Innovate Software Ltd.",
            "startDate": "2020-06-01",
            "endDate": "2022-12-31",
            "description": "Developed and maintained key features for a large-scale web application using Java, Spring, and React. Contributed to the design and implementation of RESTful APIs."
          
          }
        ],
        "educations": [
          {
            "id": 5,
            "degree": "Master of Science in Computer Science",
            "school": "Stanford University",
            "startDate": "2018-09-05",
            "endDate": "2020-05-20"
           
          },
          {
            "id": 6,
            "degree": "Bachelor of Science in Software Engineering",
            "school": "University of California, Berkeley",
            "startDate": "2014-09-01",
            "endDate": "2018-05-15"
            
          }
        ],
        "skills": [
          "Java",
          "Spring Framework",
          "React",
          "Microservices",
          "RESTful APIs",
          "Agile Methodologies",
          "Git",
          "Docker",
          "Kubernetes"
        ]
       
      };
      setResumeData(data);
    };

    fetchResumeData();
  }, []);

  const createResume = async (token: string | null, themeId: string) => {
    try {
      const response = await fetch("http://localhost:8080/admin/resumes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: null, //JSON.stringify({ themeId: themeId })
      });

      if (!response.ok) {
        throw new Error("Failed to create resume");
      }

      const data = await response.json();
      return data.resume.id; // Assuming the backend returns the new resume ID
    } catch (error) {
      console.error("Error creating resume:", error);
      return null;
    }
  };


  const handleThemeClick = async (theme) => {
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }
    const resumeId = await createResume(token, theme.id);
    if (resumeId) {
      router.push(`/editor?resumeId=${resumeId}`);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Choose a Resume Theme</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <div key={theme.id} className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border" onClick={() => handleThemeClick(theme)}>
            <div className="space-y-3">
              <div className="inline-block w-full text-center">
                <p className="line-clamp-1 font-semibold">
                  {theme.name}
                </p>
              </div>
              <div className="relative inline-block w-full">
                {resumeData && (
                  <theme.component
                    resumeData={resumeData}
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
