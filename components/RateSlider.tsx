'use client';
import { useState, useEffect } from "react";
import { calculateCost, modelPricingINR } from "../lib/costCalculator";
import { motion } from "framer-motion";
import { useRouter } from 'next/router';

function Slider({ label, value, onChange, max, accentColor }: { label: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, max: number, accentColor: string }) {
  return (
    <motion.div
      className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-rose-200 shadow-xl w-full hover:shadow-2xl transition"
      whileHover={{ scale: 1.02 }}
    >
      <label className={`block mb-2 text-sm font-medium text-${accentColor}-600`}>{label}</label>
      <input type="range" min="0" max={max} step="100" value={value} onChange={onChange} className={`w-full accent-${accentColor}-600`} />
      <p className="text-xs mt-2 text-center text-gray-500">{value} tokens</p>
    </motion.div>
  );
}

function ModelSelector({ value, onChange }: { value: keyof typeof modelPricingINR, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
  return (
    <motion.div
      className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-orange-300 shadow-xl w-full hover:shadow-2xl transition"
      whileHover={{ scale: 1.02 }}
    >
      <label className="block mb-2 text-sm font-medium text-orange-600">Choose Model</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-orange-300 rounded-lg p-3 font-semibold text-orange-700 shadow-sm"
      >
        {Object.keys(modelPricingINR).map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </motion.div>
  );
}

function CostDisplay({ cost, messages, inputTokens, outputTokens }: { cost: number, messages: number, inputTokens: number, outputTokens: number }) {
  const formattedCost = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(cost * messages);
  return (
    <motion.div
      className="bg-gradient-to-br from-yellow-100 via-rose-50 to-orange-100 border border-amber-300 py-10 px-6 rounded-3xl shadow-[0_5px_30px_rgba(255,182,193,0.3)] text-center mt-8"
    >
      <h3 className="text-xl font-semibold text-gray-800">Your Estimated Monthly API Cost</h3>
      <p className="text-5xl font-extrabold text-orange-600 mt-4">{formattedCost}</p>
      <p className="text-sm text-gray-500 mt-2">Based on {messages} messages</p>
    </motion.div>
  );
}

export default function RateSlider() {
  const router = useRouter();
  const [inputTokens, setInputTokens] = useState(500);
  const [outputTokens, setOutputTokens] = useState(500);
  const [model, setModel] = useState<keyof typeof modelPricingINR>("gpt-4o-mini");
  const [messages, setMessages] = useState(1000);

  useEffect(() => {
    if (router.isReady) {
      const { input, output, model, msgs } = router.query;
      if (input) setInputTokens(Number(input));
      if (output) setOutputTokens(Number(output));
      if (model && modelPricingINR[model as keyof typeof modelPricingINR]) {
        setModel(model as keyof typeof modelPricingINR);
      }
      if(msgs) setMessages(Number(msgs));
    }
  }, [router.isReady, router.query]);

  const cost = calculateCost(model, inputTokens, outputTokens);

  return (
    <section className="bg-gradient-to-b from-pink-50 via-rose-100 to-orange-50 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-400 drop-shadow-sm">
          Predict Your AI Costs Like Magic
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Slide. Select. Watch your monthly cost estimate update in real-time as you sculpt your customer journey.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Slider label="Input Tokens" value={inputTokens} onChange={(e) => setInputTokens(Number(e.target.value))} max={16000} accentColor="pink" />
        <Slider label="Output Tokens" value={outputTokens} onChange={(e) => setOutputTokens(Number(e.target.value))} max={16000} accentColor="yellow" />
        <ModelSelector value={model} onChange={(e) => setModel(e.target.value as keyof typeof modelPricingINR)} />
      </div>

      <CostDisplay cost={cost} messages={messages} inputTokens={inputTokens} outputTokens={outputTokens} />

      <div className="mt-12 text-center">
        <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300">
          Included in Plan X / Upgrade to Plan Y
        </button>
      </div>
    </section>
  );
}
