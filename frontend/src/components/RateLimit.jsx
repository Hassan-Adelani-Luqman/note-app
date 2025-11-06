import { ZapIcon } from "lucide-react";

export default function RateLimit() {
  return (
    <div className="flex gap-4 max-w-5xl mx-auto px-4 py-5 mt-8 rounded-lg font-mono tracking-tighter border border-green-400">
      <div className="bg-green-400 text-green-300 rounded-full size-14 flex justify-center items-center">
        <ZapIcon
          size={35}
        />
      </div>
      <div className="flex flex-col text-white">
        <h1 className="text-xl font-bold">Rate Limit Reached</h1>
        <p className="font-light">You've made too many requests in a short period. Please wait a moment.</p>
        <p className="text-sm">Try again in few seconds for the best experience</p>
      </div>
    </div>
  );
}
