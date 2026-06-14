import React, { useEffect } from 'react'
import { BsSave } from 'react-icons/bs'
import { RiTelegramFill, RiTwitterFill, RiWhatsappFill } from 'react-icons/ri'
// import iphoneBg from "./iphone.png"
import { useContext } from 'react'
// import { UserContext } from 'layouts/admin'

function MobilePreview({className, name, showForm, formContent, children}: MobilePreviewInterface) {

  // const context = useContext<{profile: any, setProfile: any} | {}>(UserContext)

  // const { profile, setProfile, totalSocials } = context as {profile: any, setProfile: any, totalSocials: any[]}

  // useEffect(()=>{
  //   console.log("Sending", profile)
  // }, [profile])

  return (
    <div className={`flex flex-col m-1 relative rounded bg-transparent bg-top bg-cover p-5 max-w-[256px] w-64 min-w-64 overflow-x-hidden ${className}`} style={{backgroundImage: `url('/iphone.png')`}}>
          {/* mobile view business card preview in card */}
          {/* <span className="text-xs self-center font-medium text-primary-700 mt-7 -mb-7 -ml-1">DIGITAL CARD PREVIEW</span> */}

          {
            showForm ? (
              // <div className="w-full  self-center rounded-[44px] rounded-b-none h-full absolute z-40 top-0 left-0 bg-[#000] bg-opacity-50 flex items-center justify-center">
              //   <div className="!rounded-[20px] max-w-[80%] bg-white p-5 px-6 flex flex-col items-center gap-1">
              //     <span className="text-sm font-bold text-black mb-1">{"header" in formContent ? formContent.header : "Your Header !"}</span>
              //     <div className="flex flex-col gap-2 mt-2">
              //       {
              //         "formFields" in formContent ? formContent.formFields.map((field: {id: number, title: string, required: boolean}) => (
              //           <input required={field.required} type="text" placeholder={field.title} className="p-2 px-3 rounded border text-sm border-gray-300 placeholder-gray-600" />
              //         )) : null
              //       }
              //     </div>
              //     <span className="text-xs text-gray-700 mt-3">{"footer" in formContent ? formContent.footer : "Your Footer !"}</span>
              //     <button type="submit" className="p-2 px-4 text-sm font-bold w-fit bg-primary-900 hover:bg-[#000] text-white rounded-xl flex items-center justify-center gap-1 self-center mt-2">
              //       Connect
              //     </button>
              //   </div>
              // </div>
              <div></div>
            ) : (
              null
            )
          }
          <div className="-z-10 mt-6"></div>
          <div className="max-w-full flex-wrap">
          {
            children
          }

          </div>
          <div className="!rounded-[24px] mt-8">
            <div className="flex flex-col items-center justify-center rounded-2xl py-5 pt-0 px-1">
              {/* <Banner
                showStats={false}
                name={ Object.keys(profile)?.length>0 && profile.name}
                leads={ Object.keys(profile)?.length>0 && profile.leads?.length}
                position={ Object.keys(profile)?.length>0 && profile.role}
                views={ Object.keys(profile)?.length>0 && profile.views}
                socials={  Object.keys(profile)?.length>0 && profile.socialsCount }
                profileImage={ (Object.keys(profile)?.length>0 && profile.profilePhoto) && profile.profilePhoto}
                companyImage={ Object.keys(profile)?.length>0 && profile.companyLogo && profile.companyLogo}
              /> */}
              {/* <button className="p-2 w-[75%] bg-primary-900 text-white rounded-full flex items-center justify-center gap-1">
                Save Contact
                <BsSave className="w-4 h-4 ml-2" />
              </button> */}
              <div className="grid grid-cols-3 gap-5 m-5 w-[80%] z-10">
                
              </div>
            </div>
          </div>
        </div>
  )
}

export interface MobilePreviewInterface {
  className?: string,
  name?: string,
  showForm?: boolean,
  children?: any,
  formContent?: {
    header: string,
    formFields: {
      id: number,
      title: string,
      required: boolean
    }[],
    footer: string
  } | {}
}

MobilePreview.defaultProps = {
  className: "",
  name: "Connor Sidwell",
  showForm: false,
  formContent: {
    header: "Make it ease to contact you",
    formFields: [
      {
        id: 1,
        name: "Name",
        required: true
      },
      {
        id: 2,
        name: "Designation",
        required: true
      },
      {
        id: 3,
        name: "Email",
        required: true
      }
    ],
    footer: "We will get back to you as soon as possible"
  }
}

export default MobilePreview