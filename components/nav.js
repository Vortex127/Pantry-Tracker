import { IoStatsChart } from "react-icons/io5";
function Nav() {
    return  <header className="container max-w-2xl px-6 py-6 mx-auto">
    <div className="flex items-center justify-between">
    {/*User info */}
    <div className="flex items-center gap-2">
      {/*user img */}
      <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
        <img src="https://picsum.photos/200/300" alt="user img" />
      </div>
      {/* username */}
      <small>Hi, Asfand</small>
    </div>

{/* Right side of navigation */}
<nav className="flex items-center gap-4 py-2">
<div className="hover btn">
  <a href="#charts-section">
  <IoStatsChart size={24}/>
  </a>
</div>
</nav>
</div>
  </header>;
}
export default Nav;