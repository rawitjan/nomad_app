import React from 'react';
import { motion } from 'framer-motion';
import { Star, Send } from 'lucide-react';
import { useStore } from '../store/useStore';
import { TRANSLATIONS } from '../constants';

const Tours: React.FC = () => {
    const { language } = useStore();
    const t = TRANSLATIONS[language];

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 text-center relative overflow-hidden"
            >
                {/* Decorative blob */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-neo-lime blur-[80px] opacity-20"></div>

                <div className="inline-flex items-center gap-2 bg-neo-lime/10 px-4 py-1 rounded-full text-neo-lime text-sm font-bold mb-6">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{t.tours.comingSoon}</span>
                </div>

                <h1 className="text-4xl font-display font-black text-white mb-4 leading-none">
                    {t.tours.collab}
                </h1>

                <p className="text-white/60 mb-8">
                    We are partnering with local guides to bring you authentic nomadic experiences. Stay tuned.
                </p>

                <div className="flex gap-2">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-neo-lime/50 transition-colors placeholder:text-white/30"
                    />
                    <button className="bg-neo-lime text-neo-dark rounded-xl px-4 flex items-center justify-center hover:bg-white transition-colors">
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Tours;