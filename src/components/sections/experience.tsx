import { SectionTitle } from '@/components/sections/section-title'

export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <SectionTitle className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl">Experience</SectionTitle>
          <p className="mt-4 text-base sm:text-lg leading-7 text-muted-foreground">
            Highlights from recent roles and internships.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-8">
          <div className="flex flex-col gap-3 border-b border-border pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Software Development Engineer Intern</h3>
                <p className="text-sm text-muted-foreground">Amazon Web Services (AWS)</p>
              </div>
              <p className="text-sm text-muted-foreground">May 2025 – Aug 2025 • Vancouver, BC</p>
            </div>
            <p className="text-sm sm:text-base leading-7 text-muted-foreground">
              Contributed to the AWS Toolkit for VS Code by migrating Step Functions console capabilities into the
              extension, enabling developers to start local executions and inspect state machine details directly inside
              VS Code. This work materially improved the developer workflow and was associated with a 4× increase in
              hourly usage. Built a communication layer between TypeScript/React bundles deployed to S3/CDN, shipped
              features end-to-end with CI/CD and 95%+ test coverage, and presented results to the AWS Lambda org, which
              committed to launching the feature and expanding Lambda service integrations within the Toolkit. Open-source
              contributions: {" "}
              <a
                href="https://github.com/aws/aws-toolkit-vscode/pulls?q=is%3Apr+is%3Aclosed+author%3Al0minous"
                className="underline underline-offset-4 hover:text-primary"
                target="_blank"
                rel="noreferrer noopener"
              >
                PRs on aws-toolkit-vscode
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col gap-3 border-b border-border pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Analyst Intern</h3>
                <p className="text-sm text-muted-foreground">Transform Venture Capital</p>
              </div>
              <p className="text-sm text-muted-foreground">May 2024 – Aug 2024 • San Francisco, CA</p>
            </div>
            <p className="text-sm sm:text-base leading-7 text-muted-foreground">
              Worked closely with founders across sectors, leading due diligence through founder interviews, market sizing,
              competitive analysis, and product reviews (pitch decks, MVPs). Automated parts of deal evaluation with
              Python/SQL and refreshed the website with React and Figma, improving conversions by ~30%. Supported Fund II
              fundraising conversations and contributed to growing AUM to ~$35M alongside commitments across seven
              portfolio companies. Built and improved internal tools to streamline deal flow from sourcing through
              evaluation, leveraging technical skills to speed up tracking and scoring.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Software Developer</h3>
                <p className="text-sm text-muted-foreground">Sports Up</p>
              </div>
              <p className="text-sm text-muted-foreground">Aug 2024 – Sept 2024 • Toronto, ON</p>
            </div>
            <p className="text-sm sm:text-base leading-7 text-muted-foreground">
              Helped launch a tournament‑organizing iOS app using React Native and Firebase. Integrated DUPR ratings and
              built core features: match booking and results, messaging, and real‑time data sync. Refactored backend and
              UI/UX to reduce crashes by ~35% and increase weekly active users by ~20%, while supporting ~50 req/sec at
              99% availability through targeted performance improvements and testing cycles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}