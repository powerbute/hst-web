'use client';

import Head from 'next/head';
import * as React from 'react';
import dynamic from 'next/dynamic';
import useLocalStorage from 'use-local-storage';
import RealtimeStatus from '../components/RealtimeStatus';
import IDCardLanding from '@/components/IDCardLanding';
import PassportLanding from '@/components/PassportLanding';
import RatingLanding from '@/components/RatingLanding';
import LandingHeader from '@/components/LandingHeader';
import { FaCrown, FaLink, FaQuestionCircle, FaStar, FaUser, FaVoteYea } from 'react-icons/fa';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Vote from '@/components/Vote';
import { MdAdd, MdCancel, MdPublic } from 'react-icons/md';
import { FaArrowDown, FaGamepad, FaNewspaper, FaTelegram, FaTicketSimple } from 'react-icons/fa6';
import map from '../../public/map.svg'
import Link from 'next/link';

export default function HomePage() {
  const [authData, setAuthData] = useLocalStorage<any>("authdata", {});
  const [session, setSession] = useLocalStorage<any>("session", "");
  const supabase = createClientComponentClient();
  const [loaded, setLoaded] = React.useState(false);

  return (
    <main className='bg-dark'>
      <RealtimeStatus />
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-dark min-w-screen min-h-screen pt-4 mx-auto text-white xl:w-[1280px]'>
        <LandingHeader passport={{ authData }} />
        <section className='px-4 mt-4'>
          <div className='p-4 rounded-2xl bg-purple-500 mb-2 text-2xl font-bold hidden justify-center items-center gap-10'>
            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f6a9/512.gif" alt="🚩" width="64" height="64" />
            <div className='flex flex-col text-center'>
              <div>ХАУСТОНИЯ <span className=''>ВЕРНУЛАСЬ В РОДНУЮ ГАВАНЬ</span></div>
              <div className='text-xl'>ДОБРО ПОЖАЛОВАТЬ В АВИНЕСИЮ</div>
            </div>
            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f6a9/512.gif" alt="🚩" width="64" height="64" />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 justify-between gap-2 bg-dark5 rounded-2xl p-4 md:p-8'>
            <div className='flex flex-col'>
              <div className='text-3xl md:text-4xl font-black text-white pb-2' style={{ textShadow: "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000" }}><span className='rounded-l-2xl pb-1 pl-2' style={{ backgroundColor: "#FED83D" }}>Хау</span><span className='pb-1 bg-white'>сто</span><span className='pb-1 rounded-r-2xl pr-2' style={{ backgroundColor: "#80C71F" }}>ния</span></div>
              <div className='text-3xl md:text-4xl font-black'>Главный торговый регион</div>
              <div className='text-lg md:text-xl mt-8'>Хаустония - это новый регион в Авинесии, который специализируется на торговле и шахтерстве. Этот регион должен стать самой большой и главной торговой точкой в Авинесии.</div>
              <div className='flex flex-col w-fit gap-2 mt-4 select-none'>
                <Link href={'#faq'}><div className='bg-blue-500 hover:bg-blue-600 cursor-pointer py-2 px-4 rounded-2xl flex gap-2 items-center'><FaQuestionCircle />Ответы на вопросы</div></Link>
                <Link href={'https://t.me/av_hst'}><div className='bg-blue-500 hover:bg-blue-600 cursor-pointer py-2 px-4 rounded-2xl flex gap-2 items-center'><FaNewspaper />Канал администрации</div></Link>
                <Link href={'https://t.me/Mini_Peka2006'}><div className='bg-blue-500 hover:bg-blue-600 cursor-pointer py-2 px-4 rounded-2xl flex gap-2 items-center'><FaTelegram />Связаться</div></Link>
                <Link href={'https://t.me/avinesianunion'}><div className='bg-purple-500 hover:bg-purple-600 cursor-pointer py-2 px-4 rounded-2xl flex gap-2 items-center'><FaGamepad />Сервер</div></Link>
              </div>
            </div>
            <div className='flex flex-col'>
              <img src="map.svg" className='hidden rounded-2xl' />
              <div className='bg-dark2 rounded-2xl'>
                <div className='border-b border-dark4 px-4 py-4 flex flex-col gap-2'>
                  <div>Этап 1. Сбор подписей</div>
                  <div>Необходимо 50% от количества населения, минимум 10</div>
                  <div className='bg-yellow-500 rounded-2xl w-fit px-2 py-1'>Сбор начнется 07.07.2024 в 6:00 по МСК</div>
                </div>
                <div className='border-b border-dark4 px-4 py-4 flex flex-col gap-2'>
                  <div>Этап 2. Разрешение НК</div>
                  <div>Необходимо получить разрешение от 100% участников народной коалиции</div>
                  <div className='bg-red-500 rounded-2xl w-fit px-2 py-1'>Требуется пройти первый этап</div>
                </div>
                <div className='border-b border-dark4 px-4 py-4 flex flex-col gap-2'>
                  <div>Этап 3. Договор с Правительством</div>
                  <div>Должны быть обговорены все условия и подписан договор</div>
                  <div className='bg-red-500 rounded-2xl w-fit px-2 py-1'>Требуется пройти второй этап</div>
                </div>
                <div className='px-4 py-4 flex flex-col gap-2'>
                  <div>Финальный этап. Регион в составе Авинесии</div>
                  <div>После подписания договора, регион входит в состав Авинесии и Правительство начинает всячески помогать региону развиваться</div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full gap-8 mt-12'>
            <div className='grid md:grid-cols-2'>
              <div className='flex justify-center items-center select-none'>
                <div className='bg-dark5 rounded-2xl p-4 text-6xl'>🎨</div>
              </div>
              <div className='flex flex-col gap-4'>
                <h3>Поставка красителей и цветных блоков</h3>
                <p className='text-lg'>Поставка красителей и цветных блоков в Хаустонии является одним из ключевых видов деятельности в городе. Эта отрасль обеспечивает всю страну необходимыми материалами для создания различных проектов</p>
              </div>
            </div>
            <div className='grid md:grid-cols-2'>
              <div className='flex md:hidden justify-center items-center select-none'>
                <div className='bg-dark5 rounded-2xl p-4 text-6xl'>⛏️</div>
              </div>
              <div className='flex flex-col gap-4'>
                <h3>Шахтерный центр</h3>
                <p className='text-lg'>Шахтерный центр Хаустонии играет важную роль в добыче полезных ископаемых и обеспечении страны всем необходимым. Он способствует экономическому развитию региона и страны</p>
              </div>
              <div className='hidden md:flex justify-center items-center select-none'>
                <div className='bg-dark5 rounded-2xl p-4 text-6xl'>⛏️</div>
              </div>
            </div>
            <div className='grid md:grid-cols-2'>
              <div className='flex justify-center items-center select-none'>
                <div className='bg-dark5 rounded-2xl p-4 text-6xl'>🛍️</div>
              </div>
              <div className='flex flex-col gap-4'>
                <h3>Большая торговая зона</h3>
                <p className='text-lg'>Большая торговая зона Хаустонии привлекает множество покупателей своим разнообразием магазинов, ресторанов и развлекательных заведений. Это место, где можно совершить покупки, провести время с друзьями, а также насладиться атмосферой города.</p>
              </div>
            </div>
            <div className='grid md:grid-cols-2'>
              <div className='flex md:hidden justify-center items-center select-none'>
                <div className='bg-dark5 rounded-2xl p-4 text-6xl'>🌳</div>
              </div>
              <div className='flex flex-col gap-4'>
                <h3>Лесопилка</h3>
                <p className='text-lg'>Лесопилка вблизи Хаустонии является ключевым звеном лесопромышленного комплекса региона. Здесь проводится рубка древесины, ее переработка и поставка на рынок для дальнейшего использования в строительстве и производстве</p>
              </div>
              <div className='hidden md:flex justify-center items-center select-none'>
                <div className='bg-dark5 rounded-2xl p-4 text-6xl'>🌳</div>
              </div>
            </div>
            <div className='grid md:grid-cols-2'>
              <div className='flex justify-center items-center select-none'>
                <div className='bg-dark5 rounded-2xl p-4 text-6xl'>📽️</div>
              </div>
              <div className='flex flex-col gap-4'>
                <h3>Кинотеатр</h3>
                <p className='text-lg'>Кино в Хаустонии представляет собой важное развлекательное направление, которое приносит горожанам и посетителям массу удовольствия. Открытие кинотеатра поможет расширить культурные возможности города и предложить новые формы досуга для всех желающих</p>
              </div>
            </div>
            <div className='grid md:grid-cols-2' id='faq'>
              <div className='flex flex-col rounded-2xl gap-2'>
                <div className='bg-dark2 hover:bg-dark4 cursor-pointer p-4 rounded-2xl flex items-center justify-between'>
                  <h3 className='flex justify-between items-center w-full'>Как стать жителем Хаустонии? <FaArrowDown /></h3>
                </div>
                <p className='px-4'>В данный момент это невозможно в связи с ограничениями, наложенными Правительством Авинесии</p>
                <div className='bg-dark2 hover:bg-dark4 cursor-pointer p-4 rounded-2xl flex items-center justify-between mt-4'>
                  <h3 className='flex justify-between items-center w-full'>Какие текущие ограничения действуют на Хаустонию? <FaArrowDown /></h3>
                </div>
                <ul className='pl-8 pr-4 list-disc'>
                  <li>Ограничение на прием новых жителей</li>
                  <li>Дом, построенный в этом регионе не будет считаться в законе "Об обязательном доме"</li>
                  <li>Отсутствует собственная полиция и армия</li>
                </ul>
              </div>
              <div className='items-center justify-center flex'>
                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4b8/512.gif" alt="💸" className='w-64' />
              </div>
            </div>
          </div>
          <div className='mt-12 bg-dark5 rounded-t-2xl p-2'>
            <div className='text-dark3'>Официальный сайт региона Авинесии Хаустония. Хаустония - исконно Авинесийские земли</div>
          </div>
        </section>
      </section>
    </main>
  );
}
