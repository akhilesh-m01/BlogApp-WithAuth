import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div>
        <section className="w-full bg-gray-50 py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Discover the Latest Insights</h1>
          <p className="text-muted-foreground md:text-xl">
            Explore our collection of thought-provoking blog posts and stay ahead of the curve.
          </p>
          <Link
            href="#"
            className="inline-flex bg-black text-white h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            View Latest Posts
          </Link>
        </div>
        <img
            src="https://images.unsplash.com/photo-1657638323016-b9b802f1756b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxvZ3N8ZW58MHx8MHx8fDI%3D"
            alt="Hero Image"
            className="mx-auto aspect-[16/9] w-full overflow-hidden rounded-xl object-cover"
            width="800"
            height="600"
            />

      </div>
    </section>
      
    </div>
  )
}

export default Hero
