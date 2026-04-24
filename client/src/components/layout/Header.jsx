export default function Header() {
  return (
    <header className="h-[52px] border-b border-border bg-[#0d0d12] flex items-center justify-between px-5 shrink-0">
      <div className="flex items-center gap-10 h-full">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-[17px] font-extrabold tracking-tight">
            <span className="text-white">ReactPerf</span> <span className="text-[#c084fc]">Analyzer</span>
          </span>
        </div>

        {/* Nav Tabs */}
        <nav className="hidden md:flex items-center h-full gap-6">
          <NavItem label="Dashboard" />
          <NavItem label="Benchmarks" active />
          <NavItem label="Reports" />
          <NavItem label="Settings" />
        </nav>
      </div>

      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="hidden lg:flex items-center bg-[#15151a] border border-[#2a2a35] rounded-md px-3 py-1.5 w-56">
          <svg className="w-3.5 h-3.5 text-[#71717a] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input type="text" placeholder="Quick find..." className="bg-transparent text-[11px] text-white outline-none w-full placeholder:text-[#71717a]" />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-[#71717a]">
          <button className="hover:text-white transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></button>
          <button className="hover:text-white transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>
          <button className="hover:text-white transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></button>
        </div>

        <button className="ml-1 px-5 py-1.5 bg-[#a855f7] hover:bg-[#b16cf8] text-white text-[11px] font-bold tracking-wide rounded-sm transition-colors">
          Analyze Now
        </button>
      </div>
    </header>
  );
}

function NavItem({ label, active = false }) {
  return (
    <div className={`h-full flex items-center border-b-2 transition-colors cursor-pointer pt-0.5 ${
      active ? "border-[#c084fc] text-white" : "border-transparent text-[#a1a1aa] hover:text-white"
    }`}>
      <span className="text-[12px] font-medium">{label}</span>
    </div>
  );
}
