
import { useEffect, useState } from "react";

export default function AttendForm({ whenFormSubmitted,setIndex,certificate }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    whenFormSubmitted(firstName, lastName, date, email);
  };

  useEffect(() => {
    if(certificate === 0) {
      setIndex(2);
    }
  }, [])
  

  return (
    <>
      <section className=" flex w-[700px] justify-center gap-8 rounded-xl p-5">
        <div className="w-3/4">
          <form onSubmit={handleSubmit} className="space-y-8">
            <h1 className="text-center text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Enter your name to be printed on the Certificate
            </h1>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500        "
                placeholder="Enter First Name"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500        "
                placeholder="Enter Last Name"
                required
              />
            </div>
            {/* <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5        " placeholder="Enter Email" required />
                        </div> */}
            {/* <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5        " placeholder="Enter Date" required />
                        </div> */}
            <div className="m-auto flex">
              <button
                type="submit"
                className="ml-auto  mr-4 rounded-lg bg-primary-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 sm:w-fit   "
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
