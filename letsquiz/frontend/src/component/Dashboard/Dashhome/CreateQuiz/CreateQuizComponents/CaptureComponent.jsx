import React, { useEffect, useState } from 'react';
import originallogo from "../../../../../../public/logo.png";
import certificatelogo from "../../../../../../public/certificatelogo.png"; 
import swal from 'sweetalert';


import 'react-resizable/css/styles.css';

const CaptureComponent = ({
  setorgiName,
  certificatetempimage,
  setpostiononcertificate,
  setdiscriptionofcertificate,
  ownersignature,
  setcustomlogo,
  setownersignature,
  setCustomCertificate,
  setShowimgeditor,
  setcompetitionName,
  customdesign,
  customlogo,
  postiononcertificate,
  discriptionofcertificate,
  competitionName,
}) => {
  const maxDescriptionLength = 160;

  const [orgiName, updateOrgiName] = useState('');
  const [positionOnCertificate, updatePositionOnCertificate] = useState('');
  const [descriptionOfCertificate, updateDescriptionOfCertificate] = useState('');
  const [localCompetitionName, updateCompetitionName] = useState('');
  const [tempownersignature, settempownersignature] = useState('');
  const [logo, setlogo] = useState(null);
  const [showdisc, setshowdisc] = useState(true);
  

 

  

  // Sync local state with props only when props change
  useEffect(() => {
    if (competitionName) updateCompetitionName(competitionName);
    if (postiononcertificate) updatePositionOnCertificate(postiononcertificate);
    if (discriptionofcertificate) updateDescriptionOfCertificate(discriptionofcertificate);
    if (customlogo) setlogo(customlogo);
    if(ownersignature) settempownersignature(ownersignature);
  }, [competitionName, postiononcertificate, discriptionofcertificate, customlogo , ownersignature]);

  // Update external state when local state changes
  useEffect(() => {
    setorgiName(orgiName);
    setpostiononcertificate(positionOnCertificate);
    setdiscriptionofcertificate(descriptionOfCertificate);
    setcompetitionName(localCompetitionName);
    setcustomlogo(logo);
    setownersignature(tempownersignature);
  }, [orgiName, positionOnCertificate, descriptionOfCertificate, localCompetitionName , logo , tempownersignature]);


  const handleSave = (e) => {
    e.preventDefault();
    setownersignature(tempownersignature);
    if(tempownersignature){
      swal({ title: "Saved", icon: "success" });
      setCustomCertificate(certificatetempimage);
      
      setShowimgeditor(false);
    }else{
      swal({ title: "Please Upload Signature", icon: "error" });
    }
  }

  return (
    <div className="fixed bg-white flex gap-6 justify-center items-center p-8 rounded-3xl border shadow-lg top-[55%] h-full left-[55%] transform -translate-x-1/2 -translate-y-1/2 space-y-8 w-[80vw] z-50">
      <div className="w-full flex justify-center mb-5 relative">
        <img src={logo || originallogo} alt="Logo" className="w-[100px] top-8 h-[50px] object-contain absolute" />
        <h1 className="absolute text-[14px] font-semibold text-black top-[35%]">This certificate is proudly presented to...</h1>
        <h1 className="absolute text-[20px] font-semibold text-black top-[22%]">{localCompetitionName.toUpperCase()}</h1>
        <h2 className="absolute font-['Allura'] text-bold text-xl top-[45%]">Candidate name goes here</h2>
        <textarea 
          rows={3}
          className="resize-none absolute top-[55%] text-sm w-[60%] text-center h-fit bg-transparent outline-none"
          readOnly
          value={descriptionOfCertificate}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= maxDescriptionLength) updateDescriptionOfCertificate(value);
          }}
        />
        
        <span className="absolute top-[70%] left-10 w-[100px] flex items-center flex-col">
          <img src={tempownersignature} className="mt-3 w-[80px] h-[30px]" alt="Signature" />
          <div className="w-full border-t rounded-3xl border-black" />
          <h5 className="font-semibold text-base">{positionOnCertificate}</h5>
        </span>
        <span className="mt-1 absolute top-[75%] left-[73%] w-[100px] flex items-center flex-col pr-4">
          <div className="w-[80px] text-sm text-black pl-2"  alt="">
            {new Date().toLocaleDateString({
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <div className="w-full border-t rounded-3xl border-black" />
          <h5 className="font-semibold text-base">Date</h5>
        </span>
        <img src={certificatelogo} alt="Certificate Logo" className="w-[60px] top-[80%] left-1/2 -translate-x-1/2 h-auto absolute" />
        <img src={certificatetempimage} alt="Certificate Template" className="w-[650px] h-auto rounded-lg shadow-md" />
      </div>
      
      <form onSubmit={(e) => handleSave(e)} className="w-full space-y-6">
        <div className="w-full">
          <label className="block text-[#1D4ED8] font-semibold mb-1">Competition Name</label>
          <input
            type="text"
            maxLength={60}
            required
            value={localCompetitionName.toUpperCase()}
            onChange={(e) => updateCompetitionName(e.target.value)}
            placeholder="Enter Competition Name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full ">
          <label className={`${showdisc ? 'block text-[#1D4ED8] font-semibold mb-1' : 'block text-zinc-400 font-semibold mb-1'}`}>Description of Certificate</label>
          <textarea
            type="text"
            value={descriptionOfCertificate}
            onChange={(e) => updateDescriptionOfCertificate(e.target.value)}
            maxLength={maxDescriptionLength}
            rows={2}
            
            placeholder="Enter Description of the Certificate"
            className={`${showdisc ? 'w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none' : 'cursor-not-allowed  w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none opacity-45 ' } `}
          />
          <div className='flex justify-between items-center'>
          <button
            type="button"
            onClick={() => setshowdisc(!showdisc)}
            className="text-[#1D4ED8] text-xs font-semibold"
          >
            {showdisc ? 'Hide Description' : 'Add Description'}
          </button>
          <span className="text-gray-500 text-xs">
            {maxDescriptionLength - descriptionOfCertificate.length} characters left
          </span>
          </div>
        </div>
        <div className="w-full">
          <label className="block text-[#1D4ED8] font-semibold mb-1">Who is the Organizer ?</label>
          <input
            type="text"
            value={positionOnCertificate}
            maxLength={12}
            required
            onChange={(e) => updatePositionOnCertificate(e.target.value)}
            placeholder="Eg. Director"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            
            
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                if (file.size > 1024 * 1024) {
                  swal({ title: "File size should be less than 1 MB", icon: "error" });
                  return;
                }
                const reader = new FileReader();
                reader.onload = () => {
                  settempownersignature(reader.result); // Set data URL as state
                };
                reader.readAsDataURL(file);
              }
            }}
            id="file"
            className="hidden"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                if (file.size > 1024 * 1024) {
                  swal({ title: "File size should be less than 1 MB", icon: "error" });
                  return;
                }
                const reader = new FileReader();
                reader.onload = () => {
                  setlogo(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
            id="logo"
            className="hidden"
          />
          <div className='flex w-full justify-evenly items-center'>
            {customdesign && (
              <div className='flex flex-col h-fit'>
                <label htmlFor="logo" className="block text-[#1D4ED8] font-semibold mb-1">Upload logo</label>
                <button
                  type="button"
                  onClick={() => document.getElementById('logo').click()}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#1D4ED8]"
                >
                  Upload logo
                </button>
              </div>
            )}
            <div className='flex flex-col h-fit'> 
              <label htmlFor="file" className="block text-[#1D4ED8] font-semibold mb-1">Upload Signature</label>
              <button
                type="button"

                
                onClick={() => document.getElementById('file').click()}
                className="font-semibold w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-[#1D4ED8]"
              >
                Upload Signature
              </button>
            </div>
          </div>
        </div>
        <div className='flex gap-7 '>
        <button
          type="submit"
          className="bg-[#1D4ED8] text-white py-2 px-4 rounded-md font-semibold text-lg w-fit"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setShowimgeditor(false)}
          className="text-[#1D4ED8] text-lg font-semibold"
        >
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
};

export default CaptureComponent;
