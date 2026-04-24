import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-[240px] border-r border-border bg-[#0d0d12] flex flex-col shrink-0 h-full">
      {/* Project Info */}
      <div className="h-16 flex items-center px-5 border-b border-border hover:bg-surface-hover cursor-pointer transition-colors shrink-0">
        <div className="w-8 h-8 bg-[#c084fc] text-[#4c1d95] rounded flex items-center justify-center mr-3 shrink-0 font-bold text-[13px]">
          PA
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[13px] font-semibold text-white truncate">Project Alpha</span>
          <span className="text-[9px] font-bold text-text-muted uppercase tracking-[0.1em] truncate">Production Build</span>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 py-6 flex flex-col gap-1.5 overflow-y-auto">
        <div className="px-5 text-[9px] font-bold text-text-muted uppercase tracking-[0.1em] mb-2">Workspace</div>
        <SidebarItem icon={<FolderIcon />} label="Explorer" />
        <SidebarItem icon={<CloudIcon />} label="Profiler" active />
        <SidebarItem icon={<NetworkIcon />} label="Network" />
        <SidebarItem icon={<HistoryIcon />} label="History" />

        <div className="mt-6 px-5">
          <button className="w-full py-2 bg-[#1a1a24] border border-[#2a2a35] rounded text-[11px] font-semibold text-[#a1a1aa] hover:text-white hover:bg-[#272732] transition-colors flex items-center justify-center gap-1.5">
            <span className="text-sm leading-none">+</span> New Comparison
          </button>
        </div>
      </div>

      {/* Bottom Menu */}
      <div className="py-4 border-t border-border flex flex-col gap-1 shrink-0">
        <SidebarItem icon={<DocsIcon />} label="Docs" />
        <SidebarItem icon={<LogoutIcon />} label="Logout" />
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <div className={`flex items-center gap-3 px-5 py-2 cursor-pointer transition-colors border-l-2 ${
      active 
        ? "bg-[#1e1b4b] text-[#c084fc] border-[#c084fc]" 
        : "border-transparent text-[#71717a] hover:text-white hover:bg-surface-hover"
    }`}>
      <span className={`flex items-center justify-center w-4 h-4 ${active ? "text-[#c084fc]" : "text-[#52525b]"}`}>
        {icon}
      </span>
      <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
    </div>
  );
}

function FolderIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>; }
function CloudIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.36 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z"/></svg>; }
function NetworkIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>; }
function HistoryIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>; }
function DocsIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>; }
function LogoutIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>; }
