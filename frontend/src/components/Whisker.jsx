import React, { useState, useEffect } from 'react';
import { useSession } from '../context/SessionContext';
import axios from 'axios';



const Whisker = () => {
  const [whiskerVisible, setWhiskerVisible] = useState(true);
  const { user, whiskerUpdateTrigger } = useSession();
  const [points, setPoints] = useState(0);
  const MAX_POINTS = 500;

  useEffect(() => {
    const fetchWhiskerPoints = async () => {
      if (!user?.user_id) return;
      try {
        const response = await axios.get(`http://localhost:5000/whisker/whiskermeter/${user.user_id}`);
        setPoints(response.data.points);
        

      } catch (err) {
        console.error('Failed to fetch whisker points:', err);
      }
    };

    fetchWhiskerPoints();
  }, [user, whiskerUpdateTrigger]);


  const handleWhiskerVisibility = () => {
    setWhiskerVisible((prev) => !prev);
  };

  const progressHeightPercent = Math.min((points / MAX_POINTS) * 100, 100);

  return (
    <div
      onClick={handleWhiskerVisibility}
      className={`fixed left-5 bottom-5 z-999 flex flex-col ${whiskerVisible ? 'items-start' : 'items-center'}  bg-[#F9F7DC] p-3 border-dashed border-2 border-[#DC8801] rounded-[30px] transition-all duration-300
        ${whiskerVisible ? 'w-[70px]' : 'w-[250px] '}`}
    >
      

    
      <div className={`flex w-full rounded-br-[25px]  gap-4 ${whiskerVisible ? 'h-[0px]' : 'flex h-auto p-3'} transition-all duration-200`}>
          <div className={`flex relative min-w-3 h-60 bg-[#FFF] border-4 border-[#FFF] rounded-full overflow-hidden ${whiskerVisible ? 'h-0 hidden' : 'min-h-auto flex'} shadow-lg`}>
            <div className='flex flex-col items-center justify-evenly h-full'>
              <div className='w-[15px] object-fit'>
                <img src="/src/assets/icons/divider_line.png" alt="" className='w-full object-cover'/>
              </div>
              <div className='w-[15px] object-fit'>
                <img src="/src/assets/icons/divider_line.png" alt="" className='w-full object-cover'/>
              </div>
              <div className='w-[15px] object-fit'>
                <img src="/src/assets/icons/divider_line.png" alt="" className='w-full object-cover'/>
              </div>
              <div className='w-[15px] object-fit'>
                <img src="/src/assets/icons/divider_line.png" alt="" className='w-full object-cover'/>
              </div>
            </div>

            <div
              className={`absolute bottom-0 w-full bg-[#B5C04A] rounded-full ${whiskerVisible ? 'hidden' : 'flex'}`}
              style={{ height: `${progressHeightPercent}%` }}
            ></div>
          </div>
        

        {!whiskerVisible && (
          <div className={"grid grid-rows-5 justiy-items-start w-full text-[#2F2F2F] text-[14px] font-bold overflow-hidden whitespace-nowrap"}>
            <label className={`flex items-center gap-5 `}>
                <div className="w-[15px] h-[15px] object-contain">
                    <img src="/src/assets/icons/whisker_arrow.png" alt="Arrow icon" className="w-full h-full object-cover rotate-180" />
                </div>
                The Catnip Captain
            </label>
            <label className={`flex items-center gap-5 `}>
                <div className="w-[15px] h-[15px] object-contain">
                    <img src="/src/assets/icons/whisker_arrow.png" alt="Arrow icon" className="w-full h-full object-cover rotate-180" />
                </div>
                Meowtain Mover
            </label>
            <label className={`flex items-center gap-5`}>
                <div className="w-[15px] h-[15px] object-contain">
                    <img src="/src/assets/icons/whisker_arrow.png" alt="Arrow icon" className="w-full h-full object-cover rotate-180" />
                </div>
                Furmidable Friend
            </label>
            <label className={`flex items-center gap-5`}>
                <div className="w-[15px] h-[15px] object-contain">
                    <img src="/src/assets/icons/whisker_arrow.png" alt="Arrow icon" className="w-full h-full object-cover rotate-180" />
                </div>
                Snuggle Scout
            </label>
            <label className={`flex items-center gap-5`}>
                <div className="w-[15px] h-[15px] object-contain">
                    <img src="/src/assets/icons/whisker_arrow.png" alt="Arrow icon" className="w-full h-full object-cover rotate-180" />
                </div>
                Toe Bean Trainee
            </label>
          </div>
        )}
      </div>

      <div className={`flex items-center justify-between bg-[#DC8801] p-2 h-auto rounded-[50px] transition-all duration-200 overflow-hidden
        ${whiskerVisible ? 'w-fit h-auto rounded-[50px]' : 'w-full rounded-[50px]'}`}>
        <label  className={`font-bold text-[14px] text-[#FFF] overflow-hidden ${whiskerVisible ? 'opacity-0 hidden' : 'opacity-100'}`}>
          WhiskerMeter
        </label>
        <div className="size-6 object-contain">
          <img src="/src/assets/paw2.png" alt="Paw icon" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Whisker;



