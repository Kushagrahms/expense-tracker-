/**@type{import('tailwindcss').config} */
export default{
  content:[
    "./index.html",
    "./src/**/*.{js,jsx}",
    ],
    theme:{
      extend:{
        colors:{
        bgMain:"#0F172A",
        bgSider:"#131A2A",
        bgCard:"#1E293B",
        
        accent:"#22D3EE",
        accentSecondary:"#6366F1",
        
        success:"#22C55E",
        danger:"#EF4444",

        textPrimary:"#E2E8F0",
        textSecondary:"#94A3B8",
        textMuted:"#64748B",
      }
    }
  },
  plugins:[],
}