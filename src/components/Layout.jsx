import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import { PATHS } from "../lib/constants";
import cross from "../icons/cross.svg";
import hamburger from "../icons/hamburger.svg";
import chevronDoubleLeft from "../icons/chevronDoubleLeft.svg";
import chevronDoubleRight from "../icons/chevronDoubleRight.svg";
import SocialMedia from "./SocialMedia";
import { handlePageview } from "../lib/ga4";

const routes = ["/", "/findings", "/about", "/future"];
const routeNames = ["00 Introduction", "01 Findings", "02 About", "03 Future"];

const tableOfContents = [
  "Chart 1",
  "Chart 2",
  "Chart 3",
  "Chart 4",
  "Chart 5",
  "Chart 6",
];

export default function Layout() {
  const { pathname, state } = useLocation();

  // MOBILE NAV
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // FOOTER
  const [prevPageIndex, setPrevPageIndex] = useState(undefined);
  const [nextPageIndex, setNextPageIndex] = useState(undefined);
  const [currPathIndex, setCurrPathIndex] = useState(undefined);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const getCurrPathIndex = (currPath) => routes.indexOf(currPath);

  const getPreviousPage = (currPath) => {
    const currIndex = routes.indexOf(currPath);
    if (currIndex === 0) return -1;
    else return currIndex - 1;
  };

  const getNextPage = (currPath) => {
    const currIndex = routes.indexOf(currPath);
    if (currIndex === routes.length - 1) return -1;
    else return currIndex + 1;
  };

  useEffect(() => {
    setPrevPageIndex(getPreviousPage(pathname));
    setNextPageIndex(getNextPage(pathname));
    setCurrPathIndex(getCurrPathIndex(pathname));

    handlePageview(pathname);

    if (!state) {
      document
        .getElementsByClassName("top")[0]
        .scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname, state]);

  return (
    <div className="h-full bg-black text-gray-100 font-mono">
      {/* HEADER */}
      <div className="hidden lg:block z-50 absolute top-0 w-full p-4 bg-black border-b border-dashed">
        <h1 className="text-2xl text-center font-bold">
          DATA VISUALIZATION PROJECT 2023
        </h1>
      </div>
      {/* MOBILE HEADER */}
      <div className="block lg:hidden h-full">
        <div className="z-50 fixed top-0 w-full flex items-center border-b border-dashed bg-black">
          <button
            className="p-3 border-r border-dashed"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <img src={cross} alt="Close menu" className="w-8 h-8" />
            ) : (
              <img src={hamburger} alt="Menu" className="w-8 h-8" />
            )}
          </button>
          <h1 className="w-full text-sm text-center font-bold">
          DSV PROJECT 2023
          </h1>
        </div>
        {isMobileMenuOpen && (
          <MobileNav
            tableOfContents={tableOfContents}
            closeMobileMenu={closeMobileMenu}
          />
        )}
      </div>
      {/* CONTENT */}
      <div className="h-screen py-[57px] lg:pb-0 lg:pt-[65px] flex">
        <div className="hidden lg:block lg:w-1/5 px-10 py-2 text-sm">
          <div className="h-full flex flex-col justify-between">
            <Nav tableOfContents={tableOfContents} />
            
          </div>
        </div>
        <div className="w-full lg:w-4/5 overflow-y-scroll px-5 md:px-8 lg:pr-10">
          <Outlet />
        </div>
      </div>
      {/* FOOTER */}
      <div className="z-40 flex lg:hidden fixed bottom-0 h-[57px] w-full divide-x divide-dashed border-t border-dashed bg-black">
        {prevPageIndex !== undefined && prevPageIndex !== -1 && (
          <Link to={routes[prevPageIndex]}>
            <div className="w-14 p-3 flex items-center justify-center">
              <img
                src={chevronDoubleLeft}
                className="h-8 w-8"
                alt="Previous page"
              />
            </div>
          </Link>
        )}
        <p className="z-50 w-full flex items-center justify-center text-lg text-white font-semibold">
          <span className="text-gradient">{routeNames[currPathIndex]}</span>
        </p>
        {nextPageIndex !== undefined && nextPageIndex !== -1 && (
          <Link to={routes[nextPageIndex]}>
            <div className="w-14 p-3 flex items-center justify-center">
              <img
                src={chevronDoubleRight}
                className="h-8 w-8"
                alt="Next page"
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

const NavItem = ({ path, pathname }) => (
  <NavLink to={path}>
    {({ isActive }) => (
      <p className={`py-2 font-semibold ${isActive ? "text-gradient" : ""}`}>
        {pathname}
      </p>
    )}
  </NavLink>
);

const Nav = ({ tableOfContents }) => (
  <div>
    <NavItem path={PATHS.Introduction} pathname="00 Introduction" />
    <NavItem path={PATHS.Findings} pathname="01 Data Visualization" />
    {tableOfContents.map((item, index) => (
      <NavLink
        key={index}
        to={PATHS.Findings}
        state={{
          id: item.toLowerCase(),
        }}
      >
        <p className="block pl-7 py-2 font-semibold">
          {">"} {item}
        </p>
      </NavLink>
    ))}
    <NavItem path={PATHS.About} pathname="02 Conclusion" />
    <NavItem path={PATHS.Future} pathname="" />
  </div>
);

const MobileNav = ({ tableOfContents, closeMobileMenu }) => (
  <div className="z-20 fixed inset-y-[57px] w-full px-6 py-2 flex flex-col justify-between bg-black border-b border-dashed">
    <div>
      <NavItem path={PATHS.Introduction} pathname="00 Introduction" />
      <NavItem path={PATHS.Findings} pathname="01 Findings" />
      {tableOfContents.map((item, index) => (
        <NavLink
          key={index}
          to={PATHS.Findings}
          state={{
            id: item.toLowerCase(),
          }}
          onClick={closeMobileMenu}
        >
          <p className="block pl-7 py-2 font-semibold">
            {">"} {item}
          </p>
        </NavLink>
      ))}
      <NavItem path={PATHS.About} pathname="02 About" />
      <NavItem path={PATHS.Future} pathname="03 Future" />
    </div>
    <SocialMedia className="py-2" />
  </div>
);
