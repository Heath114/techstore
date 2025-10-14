import ButtonTest from "./buttontest";

export default function Subscribe() {
  return (

<div className="mb-20 py-16 flex items-center flex-col border-t border-b border-gray-100">
          <div className="text-center max-w-2xl mx-auto px-6">
            <h1 className="text-6xl font-serif text-gray-900 mb-6 leading-tight">
              Early access to our<br />
              <em className="font-light">exclusive collections</em>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-md mx-auto">
              Join our private list and receive 10% off your first purchase
            </p>
            <form className="max-w-sm mx-auto">
              <div className="relative mb-6">
                <label htmlFor="phone" className="block text-sm text-gray-700 mb-2 font-medium">
                  Phone number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    🇯🇴 +962
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength={9}
                    pattern="[7-9][0-9]{8}"
                    className="w-full pl-20 pr-4 py-3 border border-gray-200 rounded-none focus:border-gray-400 focus:outline-none text-base transition-colors bg-white"
                    placeholder="7X XXX XXXX"
                    title="Please enter a valid Jordanian phone number (9 digits starting with 7, 8, or 9)"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-none text-base font-medium hover:bg-gray-800 transition-colors"
              >
                Join waitlist
              </button>
            </form>
          </div>
                <ButtonTest />
        </div>

    );
}