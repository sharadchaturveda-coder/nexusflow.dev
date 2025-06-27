export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-eggshell">
      <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-center mb-12 pb-4">Get started in minutes</h2>
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <div className="border-l-2 border-dashed border-pink absolute h-full top-0 left-4"></div>
          <div className="mb-8 flex items-center w-full">
            <div className="bg-magenta rounded-full h-8 w-8 z-10"></div>
            <div className="pl-8">
              <h3 className="font-bold text-2xl pb-4">1. Connect your channels</h3>
              <p className="text-gray-600">Link your WhatsApp, Instagram, and Facebook accounts in a few clicks.</p>
            </div>
          </div>
          <div className="mb-8 flex items-center w-full">
            <div className="bg-magenta rounded-full h-8 w-8 z-10"></div>
            <div className="pl-8">
              <h3 className="font-bold text-2xl pb-4">2. Set up auto-replies</h3>
              <p className="text-gray-600">Use our templates or create your own custom replies with the bot flow editor.</p>
            </div>
          </div>
          <div className="mb-8 flex items-center w-full">
            <div className="bg-magenta rounded-full h-8 w-8 z-10"></div>
            <div className="pl-8">
              <h3 className="font-bold text-2xl pb-4">3. Watch Nexus Flow<br />handle your DMs</h3>
              <p className="text-gray-600">Sit back and relax as the AI takes care of your customer conversations.</p>
            </div>
          </div>
          <div className="flex items-center w-full">
            <div className="bg-magenta rounded-full h-8 w-8 z-10"></div>
            <div className="pl-8">
              <h3 className="font-bold text-2xl pb-4">4. See tokens and cost update in real time</h3>
              <p className="text-gray-600">Monitor your usage and costs from your dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
