import React from "react";
import Link from "next/link";
import { SiOpenbugbounty } from "react-icons/si";
import { linkSync } from "fs";

const NavBar = () => {
  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <SiOpenbugbounty />
      </Link>

      <ul className='flex space-x-6'>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            className='text-zinc-500 hover:text-zinc-800 transition-colors'
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
