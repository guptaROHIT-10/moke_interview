import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InteviewCard'

const page = () => {
  return (
    <>
      <section className="card-cta">
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview-Ready with AI-powered Practice & Feedback</h2>
          <p className='text-lg'>Practice with AI-powered mock interviews and receive instant feedback to improve your skills.</p>

          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href="./Interview">  Start an Interview  </Link>
          </Button>

        </div>
        <img src="./robot.png" alt="robot" width={400} height={400} className="max-sm:hidden" />
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h3>Your Past Interviews</h3>
        <div className='interview-section'>
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id}/>
          ))}

          {/* <p>You haven't taken any interviews yet.</p> */}

        </div>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>

        <div className="interview-sectrion">
          <div className='interview-section'>
            {dummyInterviews.map((interview) => (
              <InterviewCard {...interview}key={interview.id} />
            ))}
          </div>
        </div>

      </section>

    </>
  )

}

export default page

