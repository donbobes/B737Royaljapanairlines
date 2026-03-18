import { ArrowRight, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const careerPositions = [
  {
    title: "Pilot",
    description:
      "Join our world-class flight operations team and command some of the most advanced aircraft in aviation. From regional turboprops to wide-body jets, fly diverse routes across our global network.",
    requirements: ["ATPL license", "Type rating preferred", "Excellent communication skills"],
  },
  {
    title: "First Officer",
    description:
      "Support our captains in safe and efficient flight operations. Gain experience across our fleet and advance your aviation career with comprehensive training and development opportunities.",
    requirements: ["CPL or ATPL license", "Multi-engine rating", "Team-oriented mindset"],
  },
  {
    title: "Flight Attendant",
    description:
      "Deliver exceptional service and safety to our passengers across short island hops and long-haul international flights. Represent Royal Japan Airlines' commitment to hospitality and excellence.",
    requirements: ["Customer service experience", "Fluency in Japanese and English", "Professional demeanor"],
  },
  {
    title: "Aircraft Maintenance Engineer",
    description:
      "Ensure the highest standards of safety and reliability across our diverse fleet of 15 aircraft types. Work with cutting-edge technology from regional aircraft to supersonic jets.",
    requirements: ["AME license or equivalent", "Experience with modern aircraft systems", "Detail-oriented"],
  },
  {
    title: "Ground Operations Agent",
    description:
      "Manage passenger check-in, boarding, and ground coordination at our hub airports. Ensure smooth operations for flights ranging from 20-minute island hops to 20-hour transcontinental journeys.",
    requirements: ["Airport operations experience preferred", "Strong organizational skills", "Multilingual ability"],
  },
  {
    title: "Customer Service Representative",
    description:
      "Provide world-class support to our passengers before, during, and after their journey. Handle inquiries, resolve issues, and uphold Royal Japan Airlines' reputation for exceptional service.",
    requirements: ["Customer service background", "Problem-solving skills", "Patience and empathy"],
  },
  {
    title: "Dispatcher / Operations Controller",
    description:
      "Coordinate flight planning, weather monitoring, and operational decisions for our extensive route network. Work closely with pilots and ground teams to ensure safe and efficient operations.",
    requirements: ["Flight dispatch license preferred", "Strong analytical skills", "Ability to work under pressure"],
  },
  {
    title: "Network Planning Analyst",
    description:
      "Optimize our route network, analyze market demand, and develop strategic plans for fleet deployment. Help shape Royal Japan Airlines' growth across domestic and international markets.",
    requirements: ["Aviation or business degree", "Data analysis experience", "Strategic thinking ability"],
  },
  {
    title: "Revenue Management Specialist",
    description:
      "Maximize profitability through pricing strategies, demand forecasting, and inventory management. Analyze booking patterns across our diverse network from regional to ultra-long-haul routes.",
    requirements: ["Economics or analytics background", "Proficiency in data tools", "Revenue management experience"],
  },
  {
    title: "Safety & Quality Assurance Officer",
    description:
      "Monitor and enhance our safety management systems, conduct audits, and ensure compliance with international aviation standards. Uphold our commitment to industry-leading safety.",
    requirements: ["Aviation safety background", "Attention to detail", "Regulatory knowledge"],
  },
  {
    title: "Cargo Operations Coordinator",
    description:
      "Manage freight and cargo operations across our network. Coordinate loading, documentation, and logistics for time-sensitive and special cargo shipments on passenger and dedicated cargo flights.",
    requirements: ["Logistics experience", "Knowledge of cargo regulations", "Organizational skills"],
  },
  {
    title: "IT Systems Administrator",
    description:
      "Maintain and optimize our airline's critical IT infrastructure including reservation systems, operations software, and passenger-facing technology. Ensure 24/7 system reliability.",
    requirements: ["IT degree or equivalent", "Systems administration experience", "Problem-solving ability"],
  },
  {
    title: "Marketing Manager",
    description:
      "Develop and execute marketing campaigns to promote Royal Japan Airlines across diverse markets. Enhance brand awareness and drive customer engagement for our growing international network.",
    requirements: ["Marketing degree", "Creative thinking", "Experience with digital campaigns"],
  },
  {
    title: "Human Resources Business Partner",
    description:
      "Support our diverse workforce across flight operations, ground services, and corporate teams. Manage recruitment, training, and employee relations for a growing international airline.",
    requirements: ["HR degree or certification", "People management skills", "Understanding of labor regulations"],
  },
  {
    title: "Finance Analyst",
    description:
      "Provide financial analysis, budgeting, and reporting to support business decisions. Work with complex airline economics including fuel hedging, currency management, and route profitability.",
    requirements: ["Finance or accounting degree", "Analytical skills", "Experience with financial modeling"],
  },
  {
    title: "Catering Services Manager",
    description:
      "Oversee our premium inflight dining program, coordinating with culinary teams to deliver exceptional meals across all cabin classes. Manage catering logistics for routes from 20 minutes to 20 hours.",
    requirements: ["Food service management experience", "Quality control background", "Vendor management skills"],
  },
  {
    title: "Airport Lounge Supervisor",
    description:
      "Manage our Diamond Lounge facilities, ensuring premium passengers receive exceptional pre-flight experiences. Coordinate staff, maintain high service standards, and manage lounge operations.",
    requirements: ["Hospitality management experience", "Leadership skills", "Customer-focused mindset"],
  },
  {
    title: "Flight Operations Officer",
    description:
      "Support flight dispatch and operations coordination from our 24/7 operations center. Monitor flights in real-time, coordinate with pilots, and ensure compliance with operational procedures.",
    requirements: ["Aviation operations background", "Strong communication skills", "Ability to multitask"],
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-6">
            <Briefcase className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Careers at Royal Japan Airlines</h1>
          <p className="text-lg text-muted-foreground">
            Join our team and be part of a premier international airline connecting Japan to the world. We're looking
            for passionate professionals to help us deliver exceptional service and operational excellence.
          </p>
        </div>

        {/* Career Positions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {careerPositions.map((position, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{position.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{position.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Key Requirements:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {position.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button variant="outline" size="sm" className="w-full group bg-transparent">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Don't see the right position?</h2>
              <p className="mb-6">
                We're always looking for talented individuals to join our team. Send us your resume and let us know how
                you can contribute to Royal Japan Airlines.
              </p>
              <Button variant="secondary" size="lg">
                Submit General Application
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
