"use client";

import React from "react";
import Link from "next/link";
import { SiOpenbugbounty } from "react-icons/si";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" }
  ];

  return (
    <nav className='border-b mb-5 px-5 py-4'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <SiOpenbugbounty />
            </Link>

            <ul className='flex space-x-6'>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classnames({
                      "text-zinc-900": link.href === currentPath,
                      "text-zinc-500": link.href !== currentPath,
                      "hover:text-zinc-800 transition-colors": true
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href='/api/auth/signout'>Log out</Link>
            )}
            {status === "unauthenticated" && (
              <Link href='/api/auth/signin'>Log in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
