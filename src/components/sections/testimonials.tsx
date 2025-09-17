import React from 'react';

const testimonials = [
  {
    quote: "Working with them has been a transformative experience for our product. Their proficiency in modern web technologies and dedication to quality is evident in every commit. A true professional.",
    name: "Alex Johnson",
    title: "Head of Product, FutureWorks",
    initials: "AJ",
  },
  {
    quote: "Their contribution was pivotal in achieving our project goals ahead of schedule. An incredibly skilled developer with a strategic mindset and a collaborative spirit that boosts the entire team.",
    name: "Samantha Lee",
    title: "Engineering Manager, DataStream",
    initials: "SL",
  },
  {
    quote: "I was consistently impressed by their ability to tackle complex challenges with elegant and performant solutions. Their expertise in frontend development is top-tier. Highly recommend.",
    name: "Michael Chen",
    title: "Senior Software Engineer, QuantumLeap",
    initials: "MC",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            Recommendations
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Discover what colleagues and collaborators say about my work ethic and technical expertise.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="flex flex-col rounded-lg border border-border bg-card p-8 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg">
              <div className="flex-1">
                <blockquote className="text-foreground">
                  <p className="text-base leading-relaxed">"{testimonial.quote}"</p>
                </blockquote>
              </div>
              <footer className="mt-8">
                <div className="flex items-center gap-x-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                    <span className="text-lg font-medium text-secondary-foreground">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{testimonial.title}</div>
                  </div>
                </div>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;