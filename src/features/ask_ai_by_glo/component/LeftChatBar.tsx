import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { QuestionsResponse, usePostGetQuestionsAsked } from '../api';
import { SmallSpinner } from '@/components/elements';

const LeftChatBar = () => {
  const router = useRouter();
  const phoneNumber = router.query.phoneNumber as string;

  const [questionsAsked, setQuestionsAsked] = useState<QuestionsResponse>([]);

  const { mutate: postGetQuestions, isLoading } = usePostGetQuestionsAsked();

  useEffect(() => {
    //
    postGetQuestions(
      { phone_number: phoneNumber },
      {
        onSuccess: data => {
          console.log(data);
          setQuestionsAsked(data.data);
          //   openModal();
        },

        onError: () => {
          return;
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNumber]);

  console.log({ questionsAsked, isLoading });

  return (
    <div className="leftbar-shadow relative hidden w-full max-w-[250px] shrink-0 overflow-y-auto bg-[#002414] px-6 py-16 md:flex md:flex-col md:gap-8 2xl:max-w-[350px]">
      <Link href="/">
        <a className="inline flex-1 overflow-visible">
          <div className="flex items-center gap-x-4">
            <Image src={'/images/gloLogo.png'} width={50} height={50} alt="glo" />
            <p className="text-2xl font-semibold text-white">Ask Ai by Glo</p>
          </div>
        </a>
      </Link>

      <div className="h-[.1px] w-full bg-white/40"></div>

      <div className="h-full">
        <h2 className="mb-4 text-base font-[700] text-white">Questions asked...</h2>

        {!isLoading ? (
          <div className="relative !z-[999] h-[40rem] overflow-y-scroll">
            {Array.isArray(questionsAsked) && questionsAsked.length > 0 ? (
              questionsAsked.map(message => {
                return (
                  <div className="mb-4 w-full bg-white/[0.08] px-4 py-4" key={message.created_at}>
                    <h2 className="text-sm font-[600]">{message.prompt}</h2>
                    <div className="my-4 h-[1px] w-full bg-white/40"></div>
                    <p className="text-xs text-white">{message.response}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-xs italic text-white">No Questions asked yet.</p>
            )}
          </div>
        ) : (
          <SmallSpinner />
        )}

        <div className="mt-4 h-[.1px] w-full bg-white/40"></div>
        <div className="absolute -bottom-40 z-[99]">
          <Image
            src={'/images/ask-ai-by-glo/bulb.svg'}
            alt={'bulb'}
            width={200}
            height={200}
            className=""
            //
          />
        </div>
      </div>
    </div>
  );
};

export default LeftChatBar;
