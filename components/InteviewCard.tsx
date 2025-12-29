import React from 'react'
import dayjs from 'dayjs';
import { getRandomInterviewCover } from '@/lib/utils';

const InteviewCard = ({interviewID, userID, role, type, techstack, createdAt} : InterviewCardProps) => {
   const feedback = null as Feedback | null;
   const normalizesType = /mix/gi.test(type) ? "Mixed" : type;
   const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format("DD MMM YYYY");
  return (
    <div className="card-border w-100 max-sm:w-full min-h-96 mb-4">
      <div className='card-interview'>
        <div>
          <div className='absolute top-0 right-0 px-4 py-2 w-fit rounded-bl-lg bg-light-600'>
            <p className='badge-text'>{normalizesType}</p>
          </div>

          <img src={getRandomInterviewCover()} alt="cover image" width={80} height={80} className='rounded-full object-fit size-14.5' />

          <h3 className='mt-5 capitalize'>
            {role} Interview
          </h3>

          <div className='flex flex-row justify-between mt-3'>
            <div className='flex flex-row gap-2'>
                <img src="/calendar.svg" alt="calender" width={22} height={22}/>
                <p>{formattedDate}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <img src="/star.svg" alt="star" width={22} height={22}/>
              <p className='font-medium'>{feedback?.totalscore || '---'}/100</p>
            </div>
          </div>

          <p className='line-clamp-2 mt-5'>
            { "No feedback available yet. Please complete the interview to receive detailed feedback on your performance."}
          </p>

          <div className='flex flex-row justify-around'>
            <div className='flex flex-row gap-1 mt-5'>
              <img src="/react.svg" alt="react_logo" />
              <img src="/tailwind.svg" alt="tailwind_logo" />
            </div>
            <div className='flex flex-row gap-1 mt-3'>
              
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default InteviewCard
