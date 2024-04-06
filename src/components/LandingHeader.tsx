import NextImage from "@/components/NextImage";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { IoMdSearch, IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogin, MdLogout, MdOutlineAdminPanelSettings } from "react-icons/md";
import useLocalStorage from "use-local-storage";

export default function Passport({ passport }: { passport: { authData: any } }) {
  const supabase = createClientComponentClient();
  const [authData, setAuthData] = useLocalStorage<any>("authdata", {})
  const [session, setSession] = useLocalStorage("session", "");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    }
  })

  return (
    <>
      {!loaded ?
        <header className='px-4 flex h-[56px] items-center justify-between'>
          <a className='hidden lg:flex items-end translation-transform hover:scale-105 text-lg gap-2' href='/'><div className='w-14 h-14 bg-dark4 animate-pulse rounded-2xl' /></a>
          <div className='flex gap-4 justify-center w-full sm:w-fit sm:justify-start items-center select-none'>
            <div className='bg-dark4 animate-pulse rounded-2xl w-10 h-10 flex justify-center items-center'></div>
          </div>
        </header>
        :
        <header className='px-4 flex h-[56px] items-center justify-between'>
          <div className='hidden lg:flex items-end text-lg gap-2'><img src='/AvinesiaFlag.png' className='w-14' /> <span className='font-bold bg-gray-500 rounded-md px-[5px] py-[1px]'>Хаустония</span></div>
          <div className="flex gap-2 items-center">
            <img src='/HoustoniaFlag.png' className='w-14' />
            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f386/512.gif" width={56} className="rounded-2xl hidden" />
          </div>
        </header>
      }
    </>
  )
}