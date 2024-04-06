'use client';

import Head from 'next/head';
import * as React from 'react';

import useLocalStorage from "use-local-storage";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import NextImage from '@/components/NextImage';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { FaCircleCheck, FaCrown, FaLink, FaStar, FaTicketSimple, FaUser } from 'react-icons/fa6';
import { MdPublic } from 'react-icons/md';

export default function HomePage({ params }: { params: { id: string } }) {
  const pollId = params.id;
  const [session, setSession] = useLocalStorage("session", "");
  const [authData, setAuthData] = useLocalStorage<any>("authdata", {});
  const supabase = createClientComponentClient();
  const [loaded, setLoaded] = React.useState(false);

  const [vote, setVote] = React.useState<any>(-1);
  const [voteData, setVoteData] = React.useState<any>([]);
  const [pollData, setPollData] = React.useState<any>({ id: 0 });

  React.useEffect(() => {
    if (!loaded) {
      loadAllData();
      setLoaded(true);
    }
  })

  async function loadAllData() {
    const { data: data1 } = await supabase
      .from('polls')
      .select('*')
      .eq("id", pollId)
      .single();
    if (data1 != null) {
      setPollData(data1);
    }
    const { data: data2 } = await supabase
      .from('votes')
      .select('*')
      .eq("pollid", pollId)
      .eq("passid", authData?.passid)
      .single();
    if (data2 != null) {
      setVote(data2?.option);
    } else {
      setVote(0);
    }

    if (data1?.status == 2) {
      let voteDataT: any = [];
      for (let a = 0; a < data1?.options?.length; a++) {
        const { data: data3 } = await supabase
          .from('votes')
          .select('pollid, option, options')
          .eq("pollid", pollId)
          .eq('option', a + 1);
        if (data3 != null) {
          voteDataT.push(data3.length);
        } else {
          voteDataT.push(0);
        }
      }
      setVoteData(voteDataT);
      console.log(voteDataT);
    }
  }

  async function voteF(optionP: any) {
    const { data: data1 } = await supabase
      .from('polls')
      .select('*')
      .eq("id", pollId)
      .single();
    if (data1?.status == 2) {
      alert("Голосование уже закончилось!")
      return;
    }
    if (data1?.status < 1) {
      alert("Голосование еще не началось!")
      return;
    }
    if (data1?.access?.includes(0)) {
      if (authData?.status != 1) {
        alert("Голосование доступно только для граждан Авинесии")
        return;
      }
    }
    if (data1?.access?.includes(4)) {
      if (authData.status == null) {
        alert("Голосование доступно только для авторизованных пользователей")
        return;
      }
    }
    if (data1?.access?.includes(5)) {
      if (!authData?.roles?.includes(1) || !authData?.roles?.includes(2)) {
        alert("Голосование доступно только для Правительства")
        return;
      }
    }
    const { error: a1 } = await supabase
      .from('votes')
      .delete()
      .eq('passid', authData?.passid)
      .eq('pollid', pollId)
    const { error } = await supabase
      .from('votes')
      .insert({ pollid: pollId, passid: authData?.passid, option: optionP })
    setVote(optionP);
  }

  async function voteF2() {
    const { data: data1 } = await supabase
      .from('polls')
      .select('*')
      .eq("id", pollId)
      .single();
    if (data1?.status == 2) {
      alert("Голосование уже закончилось!")
      return;
    }
    if (data1?.status < 1) {
      alert("Голосование еще не началось!")
      return;
    }
    const { error: a1 } = await supabase
      .from('votes')
      .delete()
      .eq('passid', authData?.passid)
      .eq('pollid', pollId)
    setVote(0);
  }

  function renderResult(index: any) {
    if (voteData.length == 0) {
      return 0;
    }
    const sumOfNumbers = voteData.reduce((acc: any, number: any) => acc + number);
    return (voteData[index] / sumOfNumbers) * 100 + "%";
  }

  async function openPoll() {
    const { error } = await supabase
      .from('polls')
      .update({ status: 1 })
      .eq('id', pollId)
    loadAllData();
  }

  async function closePoll() {
    const { error } = await supabase
      .from('polls')
      .update({ status: 2 })
      .eq('id', pollId)
    loadAllData();
  }



  return (
    <main className='bg-dark'>
      <Head>
        <title>Hi</title>
      </Head>
      {!loaded ? <div className='flex justify-center items-center overflow-hidden text-white h-screen text-2xl font-bold'>Загрузка голосования...</div> :
        <section className='overflow-x-hidden bg-dark w-screen md:h-screen flex flex-col gap-4 justify-center text-white items-center'>
          <div className='flex flex-col bg-dark2 rounded-2xl px-6 py-4 md:w-1/3'>
            <div className='flex gap-2 bg-dark4 items-center p-2 rounded-2xl justify-between select-none mb-2'>
              {authData.status != null ?
                <>
                  <div className=''>Вы голосуете от лица <span className='font-bold'>{loaded ? authData?.nickname : "..."}</span></div>
                  <div className='bg-red-500 hover:bg-red-600 px-2 py-1 rounded-2xl cursor-pointer' onClick={() => {
                    setSession("");
                    setAuthData({});
                    alert("Выход успешно выполнен!")
                    window.open("/", "_self")
                  }}>Выйти</div></> :
                <><div className='bg-red-500 px-2 py-1 rounded-2xl'>Вы не авторизованы!</div>
                  <div className='bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-2xl cursor-pointer' onClick={() => {
                    window.open("/auth?voteID=" + pollId, "_self")
                  }}>Войти</div></>}
            </div>
            {pollData?.status == 0 && <div className='bg-yellow-500 p-2 rounded-2xl text-center font-bold mb-2'>Голосование еще не началось</div>}
            {pollData?.status == 2 && <div className='bg-red-500 p-2 rounded-2xl text-center font-bold mb-2'>Голосование закончилось</div>}
            {(authData?.roles?.includes(1) || authData?.roles?.includes(2)) && loaded && <div className='flex select-none justify-between gap-2 mb-2'>
              {(pollData?.status == 2 || pollData?.status == 0) && <div onClick={() => { openPoll() }} className='bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-2xl p-2 w-full text-center'>Открыть</div>}
              {pollData?.status == 1 && <div onClick={() => { closePoll() }} className='bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-2xl p-2 w-full text-center'>Закрыть</div>}
            </div>}
            <div className='text-2xl font-bold mb-2'>{pollData?.name}</div>
            <div className='text-lg mb-6'>{pollData?.desc}</div>
            <div className='flex flex-col gap-1 mb-2'>
              {pollData?.type == 1 &&
                <div>· Проголосовать можно только за один вариант</div>}
              {pollData?.type == 3 &&
                <div>· Проголосовать можно только за один вариант</div>}
              {pollData?.type == 2 &&
                <div>· Проголосовать можно за несколько вариантов</div>}
              {pollData?.type == 3 &&
                <div>· Переголосовать нельзя</div>}
              <div>· Результаты будут опубликованы после заверешния голосования</div>
              <div>· Ваш голос не будет опубликован</div>
            </div>
            <div className='flex flex-col gap-1'>
              {pollData?.access?.includes(0) && <div className='flex items-center gap-2'><FaUser />Доступен только для граждан</div>}
              <div className='hidden items-center gap-2'><FaStar className='text-red-500' />Доступен только для героев Авинесии</div>
              <div className='hidden items-center gap-2'><FaStar className='text-yellow-500' />Доступен только для граждан с 2021г.</div>
              <div className='hidden items-center gap-2'><FaTicketSimple className='text-blue-500' />Доступен только для лиц с турвизой</div>
              {pollData?.access?.includes(4) && <div className='flex items-center gap-2'><MdPublic />Доступен для всех</div>}
              {pollData?.access?.includes(5) && <div className='flex items-center gap-2'><FaCrown color='gold' />Доступен только для Правительства</div>}
              <div className='hidden items-center gap-2'><FaCrown color='silver' />Доступен только для Народной коалиции</div>
              <div className='hidden items-center gap-2'><FaLink />Доступен только по ссылке</div>
            </div>
          </div>
          {pollData?.status < 2 &&
            <div className='flex flex-col bg-dark2 rounded-2xl w-full md:w-1/3 p-4 gap-2 select-none'>
              {pollData?.id == 0 ?
                <div className='flex justify-center w-full font-bold text-xl'>Загрузка голосов...</div> :
                <>
                  {(pollData?.type == 1 || pollData?.type == 2) && <>
                    {pollData?.options?.map((e: any, index: any) =>
                      <>
                        {
                          vote == (index + 1) ?
                            <div onClick={() => {
                              voteF2();
                            }} className='px-6 py-4 hover:bg-green-600 bg-green-500 cursor-pointer border border-dark4 rounded-2xl w-full flex justify-between items-center'>
                              <div className='text-xl font-semibold'>{e}</div>
                              <div className=''><FaCircleCheck size={24} /></div>
                            </div> : <div onClick={() => {
                              voteF((index + 1));
                            }} className='px-6 py-4 hover:bg-dark4 cursor-pointer border border-dark4 rounded-2xl w-full flex justify-between items-center'>
                              <div className='text-xl font-semibold'>{e}</div>
                            </div>
                        }
                      </>
                    )}
                  </>}
                  {pollData?.type == 3 && <>
                    {vote > 0 ? <div className='flex flex-col items-center w-full font-bold text-xl'>
                      <div>Вы уже проголосовали!</div>
                      <div>Ваш голос: {pollData?.options[vote - 1]}</div>
                    </div>
                      :
                      <>
                        {pollData?.options?.map((e: any, index: any) =>
                          <>
                            {
                              vote == (index + 1) ?
                                <div onClick={() => {
                                  voteF2();
                                }} className='px-6 py-4 hover:bg-green-600 bg-green-500 cursor-pointer border border-dark4 rounded-2xl w-full flex justify-between items-center'>
                                  <div className='text-xl font-semibold'>{e}</div>
                                  <div className=''><FaCircleCheck size={24} /></div>
                                </div> : <div onClick={() => {
                                  voteF((index + 1));
                                }} className='px-6 py-4 hover:bg-dark4 cursor-pointer border border-dark4 rounded-2xl w-full flex justify-between items-center'>
                                  <div className='text-xl font-semibold'>{e}</div>
                                </div>
                            }
                          </>
                        )}</>
                    }
                  </>}
                </>}
            </div>
          }
          {pollData?.status == 2 &&
            <div className='flex flex-col bg-dark2 rounded-2xl w-full md:w-1/3 p-4 gap-2 select-none'>
              {pollData?.id == 0 ?
                <div className='flex justify-center w-full font-bold text-xl'>Загрузка голосов...</div> :
                <>
                  {pollData?.options?.map((e: any, index: any) =>
                    <>
                      <div className='px-6 py-4 bg-green-500 bg-opacity-20 relative border border-dark4 rounded-2xl w-full flex justify-between items-center'>
                        <div className='z-[2] text-xl font-semibold'>{e}</div>
                        {vote == index + 1 ? <div className='z-[2] flex items-center gap-2 text-lg font-bold'><FaCircleCheck size={24} /> {voteData[index]}</div> : <div className='z-[2] text-lg font-bold flex justify-center'>{voteData[index]}</div>}
                        <div style={{ width: renderResult(index) }} className='absolute left-0 top-0 h-full bg-green-500 rounded-2xl z-[1]'></div>
                      </div>
                    </>
                  )}
                </>}
            </div>
          }
        </section>
      }
    </main >
  );
}
