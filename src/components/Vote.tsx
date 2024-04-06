import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaVoteYea } from "react-icons/fa";

export default function Vote({ polldata }: { polldata: { data: any } }) {
  const [loaded, setLoaded] = React.useState(false);
  const [votes, setVotes] = React.useState<any>([]);
  const supabase = createClientComponentClient();

  React.useEffect(() => {
    if (!loaded) {
      loadVotes();
      setLoaded(true);
    }
  });

  async function loadVotes() {
    const { data: data1 } = await supabase
      .from('votes')
      .select('*')
      .eq("pollid", polldata.data?.id);
    if (data1 != null) {
      setVotes(data1);
    }
  }

  return (
    <div className='flex flex-col bg-dark2 rounded-2xl'>
      {polldata.data?.important && <div className="bg-red-500 rounded-t-2xl px-4 py-2 font-bold text-center text-2xl">ВАЖНО</div>}
      <div className="flex flex-col px-4 md:px-8 py-4 md:py-6">
        <div className='text-xl font-bold mb-4'>{polldata.data?.name}</div>
        <div className='text-lg mb-2'>{polldata.data?.desc}</div>
        <div className='flex justify-between items-center'>
          <div onClick={() => {
            window.open("/vote/" + polldata.data?.id, "_self")
          }} className='p-2 rounded-2xl select-none bg-blue-500 hover:bg-blue-600 cursor-pointer'>Проголосовать</div>
          <div className='flex items-center gap-2 text-lg font-bold'><FaVoteYea size={28} /> {!loaded ? "..." : votes.length}</div>
        </div>
      </div>
    </div>
  )
}