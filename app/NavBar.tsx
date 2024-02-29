"use client";

import React from "react";
import { Skeleton } from "@/app/components";
import Link from "next/link";
import { SiOpenbugbounty } from "react-icons/si";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text
} from "@radix-ui/themes";

const NavBar = () => {
  return (
    <nav className='border-b mb-5 px-5 py-4'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <SiOpenbugbounty />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};
const NavLinks = () => {
  const currentPath = usePathname();

  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" }
  ];

  return (
    <ul className='flex space-x-6'>
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <Skeleton width='3rem' />;
  }

  // if (status === "unauthenticated") {
  //   return <Link href='/api/auth/signin'>Log in</Link>;
  // }

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session!.user!.image!}
              fallback='?'
              size='2'
              radius='full'
              className='cursor-pointer'
            ></Avatar>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size='2'>{session.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href='/api/auth/signout'>Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      {status === "unauthenticated" && (
        <Link className='nav-link' href='/api/auth/signin'>
          Log in
        </Link>
      )}
    </Box>
  );
};

export default NavBar;
